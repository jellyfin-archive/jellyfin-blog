---
title: 'The Jellyfin CDN: Mirrorbits for the masses'
subtitle: 'How Jellyfin distributes binary packages'
author: 'Joshua Boniface'
githubusername: 'joshuaboniface'
date: '2021-04-12'
justify: 'center'
---

For many projects, distrbuting binary assets is easy: put the files on GitHub and you're done. It's not something many think about. But at Jellyfin, we needed something more robust, something able to handle our needs more elegantly than GitHub could. And both for those interested, and for those supporting other similar projects, we'd like to share how we do it.

## Prelude - Pre-10.6.0

Before our 10.6.0 release, we had a fairly simple repository setup: everything would build on a VPS, running Debian, called `build1`, in response to a GitHub webhook. This server, located on Digital Ocean in the Toronto zone, housed both the build process as well as our main repository, served directly via NGiNX. All in all, it was a fairly standard setup.

But this release was the first where we noticed a problem. Jellyfin is a global project, and while I personally am located in Ontario, Canada, the very vast majority of our users are not. And users, especially users in Europe and Asia, were having trouble downloading our releases. The main complaint was abysmally slow download speed, and occasionally even full-on timeouts. We had to come up with a better solution.

As a DIYer at heart, and leading a project built by and for DIYers, I wasn't content to simply throw CloudFlare in front of our side - my concerns with that provider notwithstanding. So I went looking for a solution - how to effectively create a CDN for downloads.

## Enter Mirrorbits

Luckily, I wasn't alone. Many years before, another FLOSS project had encountered the same problem. VideoLAN, creators of the fantastic VLC Media Player, had the same issue. So their talented developers created a solution: Mirrorbits.

[Mirrorbits](https://github.com/etix/mirrorbits) is a fairly straightforard Go program with a single goal: provide a way to distribute requests from a single central repository to multiple georedundant repositories, based on the client's GeoIP information. It seemed to fit the bill exactly.

But there was a problem: documentation on how to actually run Mirrorbits was sparse, so it took quite a bit of trial-and-error to determine how to use it. I hope the following will help avoid this trouble for anyone else.

## File layout

The first thing to consider is the layout of the files. In Jellyfin's case, our repository is large and sprawling, constituting many different components including the server, clients, plugins, and various secondary files. Mirrorbits requires everything to be housed under one directory, and we needed a way to synchronize this whole directory easily. We also had a problem of our "archives", old stable releases that we did not need or want sychronized to all of our mirror servers wasting space.

The solution we came up with was the following directory structure:

```
/srv/repository
               /mirror
                      /releases
                               /client
                               /server
                               /plugin
                               etc.
                      /debian
                             /dists
                             /pool
                      /ubuntu
                             /dists
                             /pool
                      /archive
                      etc.
               /releases --symlink--> /mirror/releases
               /debian   --symlink--> /mirror/debian
               etc.
```

In effect, everything is under a `/mirror` directory, with external symlinks to provide the root links we wanted.

## Additional VPSes and Synchronization

The next step after crafting a usable file layout was to create some additional VPSes and determine how to synchronize the files.

Since our origin server is in Toronto, we wanted to ensure we had wide geographic coverage. And because of how Mirrorbits works (we'll get to that later), we also wanted a dedicated CDN for the same region as the origin server. Thus, we created 4 additional VPSes:

* `tor1.mirror.jellyfin.org`: Toronto, Ontario, Canada for North/South America East
* `sfo1.mirror.jellyfin.org`: San Francisco, California, USA for North/South America West
* `fra1.mirror.jellyfin.org`: Frankfurt, Germany (not France as commonly assumed!) for Europe and Africa
* `sgp1.mirror.jellyfin.org`: Singapore, Malaysia for Asia and Pacific

One worry when first setting up these 4 VPSes was that they would not be enough. But so far, through another major release and several minor releases, we've had the complaints about download speed completely stop, so they must be working. In future, as Digital Ocean expands, we'd also be able to add other locations as well, for instance Bangalore, India, Africa, and perhaps additional Europe and South America instances.

With the VPSes created, we then looked into file sychnonization, and there was only one program on my mind: `rsync`. But while most users know `rsync` for it's `scp`-replacement functionality over SSH, we wanted something more robust without the need for handling SSH keys, and able to be extended further in the future, perhaps to untrusted (and untrusting) 3rd-party mirrors.

I thus opted to use the `rsync` daemon mode. Listening on port 873, it's able to do everything `rsync`-over-SSH can do, only without encryption overhead or requiring SSH/shell authentication.

I first prepared the the local `/etc/rsyncd.conf` on the origin server (`build1`). By default, the Debian `rsync` package does not install the daemon service unless this file exists, but after adding it the daemon can be started.

I opted for a two-configuration model, to handle the aforementioned "archives". This would allow a given mirror server to pull either the entire archive, or just the current stable repositories. And once we started offering "unstable" builds that can be generated many dozens of times per day, we opted to include them in the "archive" setup as well.

Here is our configuration:

```
# /etc/rsyncd.conf
[mirror]
    path = /srv/repository/mirror
    comment = Jellyfin mirror (stable only)
    exclude = *unstable* *archive*

[mirror-full]
    path = /srv/repository/mirror
    comment = Jellyfin mirror (all)
```

In many cases, it would be prudent to secure this, but since as mentioned we wanted to open this up to anyone, we left the `rsync` endpoint completely exposed. Thus, if you wanted to host a local Jellyfin mirror - you can.

On the mirror nodes, we still needed to get the content however. Ultimately, I decided that every "official" mirror copying the *full* content (including archives and unstable builds) was more prudent, so all of them synchronize the `mirror-full` source.

Each node thus has a simple cron job, set to run every 15 minutes, that downloads an updated copy of the repository from the origin:

```
# /etc/cron.d/mirror-sync
12,27,42,57 *  * * *  root  rsync -au --delete rsync://build1.jellyfin.org/mirror-full/ /srv/repository/mirror/
```

The slightly odd times were chosen specifically - the goal for 3rd parties, if and when we officially support them, would be to synchronize every X minutes on even intervals, e.g. at `00`, `30`, etc., from these "official" mirrors directly. This therefore ensures they would always be up-to-date before that time comes around, ensuring no additional delays for 3rd party mirrors.

The `rsync` command should create the destination directory automatically, but to be prudent, we ensured it was created manually first. Thus, we now have 5 servers with exactly the same content, with the mirrors synchronizing from the origin every 15 minutes.

## Webserver Configuration

From the very beginning we have used NGiNX as the webserver. The reasons are simple: maximum configuration flexibility, and performance. Apache has its place, but we didn't need its additional features, and early on budget was tight. I've simply been so satisfied with it to not desire a change.

On the mirrors, the configuration is dead-simple. Only a single "site" is configured, providing full access to the repository directory. SSL is provided by Let's Encrypt.

```
# /etc/nginx/sites-enabled/jellyfin-mirror (from fra1.mirror.jellyfin.org)
server {
    listen [::]:80 default_server ipv6only=on;
    listen 80 default_server;
    listen [::]:443 ssl ipv6only=on;
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/fra1.mirror.jellyfin.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/fra1.mirror.jellyfin.org/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    server_name fra1.mirror.jellyfin.org _;
    root /srv/repository;
    index index.php index.html index.htm;

    access_log /var/log/nginx/access.log;

    aio threads;
    directio 1M;
    output_buffers 3 1M;

    sendfile on;
    sendfile_max_chunk 0;

    autoindex on;

    location ~ [^/]\.php(/|$) {
        fastcgi_split_path_info ^(.+?\.php)(/.*)$;
        fastcgi_param HTTP_PROXY "";
        fastcgi_pass unix:/run/php/php7.3-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
}
```

During our testing, we did notice one thing that might be of use to other admins. We were finding that performance when many requests for large files came in at once, would drop significantly. We ended up tracing the problem to the I/O stack within NGiNX, which appeared to be a bottleneck. Thus, make note of the `aio threads`, `directio`, `output_buffers`, and `sendfile` options above. These ensure NGiNX will use direct I/O for any file larger than 1M, and provide 3 output buffers with a maximum chunk size of 0, increasing performance.

On the origin, the NGiNX configuration is much more complicated. This is because of how Mirrorbits works, which I will discuss in the next section. Thus, any decisions about what file a user wants must be made on the origin, directed to the right file location, and the Mirrorbits directs *that* request to the mirrors.

```
# /etc/nginx/sites-enabled/jellyfin-origin (on build1.jellyfin.org)
server {
    listen 80 default_server proxy_protocol;
    listen [::]:80 default_server proxy_protocol;
    server_name repo.jellyfin.org build.jellyfin.org repo1.jellyfin.org build1.jellyfin.org _;

    access_log /var/log/nginx/access.log proxy;

    aio threads;
    directio 1M;
    output_buffers 3 1M;

    sendfile on;
    sendfile_max_chunk 0;

    autoindex on;

    root /srv/repository/mirror;
    index index.php index.html index.htm index.nginx-debian.html;

    location / {
        autoindex off;
    }

    #
    # Kodi Repository redirections
    #
    location ^~ /releases/client/kodi/py2 {
        index index.html index.php;
        autoindex on;
    }
    location ^~ /releases/client/kodi/py3 {
        index index.html index.php;
        autoindex on;
    }
    location ^~ /releases/client/kodi {
        # Kodi 20
        if ($http_user_agent ~* "(Kodi.*/20.*)") {
            rewrite ^/releases/client/kodi/(.*)$ /releases/client/kodi/py3/$1 last;
        }

        # Kodi 19
        if ($http_user_agent ~* "(Kodi.*/19.*)") {
            rewrite ^/releases/client/kodi/(.*)$ /releases/client/kodi/py3/$1 last;
        }

        # Kodi 18 and older
        if ($http_user_agent ~* "(Kodi.*)") {
            rewrite ^/releases/client/kodi/(.*)$ /releases/client/kodi/py2/$1 last;
        }

        index index.html index.php;
        autoindex on;
    }

    #
    # Main repository
    #

    # Main release directories
    location /releases {
        autoindex on;
    }

    # Main archive directories (not forwarded to mirrorbits)
    location ^~ /archive {
        try_files $uri $uri/ =404;
        autoindex on;
    }

    # Mirrorbits fallback
    location ^~ /master {
        try_files $uri $uri/ =404;
        autoindex on;
    }

    # Mirrorbits forwards for large file types
    location ~ ^/(?<fwd_path>.*)(?<fwd_file>\.apk|\.buildinfo|\.bz|\.changes|\.db|\.deb|\.dmg|\.dsc|\.exe|\.gz|\.md5|\.lzma|\.rpm|\.sha256sum|\.xml|\.xz|\.zip|\.css|\.ttf|\.woff2|\.json)$ {
        proxy_pass http://127.0.0.1:8080;
        proxy_buffering off;
    }
    location ~ ^/(?<fwd_path>.*)(/mirrorlist)$ {
        proxy_pass http://127.0.0.1:8080/$fwd_path?mirrorlist;
        proxy_buffering off;
    }
    location ~ ^/(?<fwd_path>.*)(/mirrorstats)$ {
        proxy_pass http://127.0.0.1:8080/$fwd_path?mirrorstats;
        proxy_buffering off;
    }
    location /mirrorstats {
        proxy_pass http://127.0.0.1:8080/?mirrorstats;
        proxy_buffering off;
    }

    #
    # PHP handling
    #
    location ~ \.php$ {
        fastcgi_split_path_info ^(.+?\.php)(/.*)$;
        fastcgi_param HTTP_PROXY "";
        fastcgi_pass unix:/run/php/php7.3-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
}
```

Some of the configuration here is worthy of describing in detail.

The Kodi selector is used due to the Kodi backend transition from Python 2 to Python 3. Thus, some versions require assets for Python 2, and newer versions for Python 3. This selector operates based on the sent user agent of the client, deciding which version of Kodi they are using, and thus directing them to the right location.

The main locations are `/archive`, `/releases`, and `/master`. The first contains archives and is not forwarded on to the Mirrobits process (despite the files being synced above). The second is the main location, and the third is a duplicate location that is used for fallback should Mirrorbits not find an acceptable mirror.

Finally, is the main Mirrorbits handler. The forwarding is based off the file extension of the requested file. Thus, when loading, e.g. the PHP index pages, the requests are not forwarded. Only requests for the listed file types are forwarded on to the Mirrorbits process to be distributed to mirrors. Thus, only the actual large file downloads go to mirrors, preventing split-brains and outdated content for very small or unchanging files.

The next 3 options are for Mirrorbits status pages, which provide information on the currently available mirrors. For any file (e.g. https://repo.jellyfin.org/releases/server/debian/stable/meta/jellyfin_10.7.2-1_all.deb), one can append the `/mirrorlist` or `/mirrorinfo` locations to show information about the available mirrors. Try it yourself: https://repo.jellyfin.org/releases/server/debian/stable/meta/jellyfin_10.7.2-1_all.deb/mirrorlist. Finally the `/mirrorstats` page, whether on a file or at the root of the domain (https://repo.jellyfin.org/mirrorstats) shows the current status of the mirrors in general, including if any are offline.

All together, these NGiNX configs provide the foundation for Mirrorbits to work. But we still have to configure that part.

## Mirrorbits - the workhorse

Installing mirrorbits is quite straightforward. We simply downloaded the latest binary from the Mirrorbits repository, installed the `mirrorbits` binary in `/usr/local/bin`, the sample configuration at `/etc/mirrorbits.conf`, and the templates under `/usr/local/share/mirrorbits`. Unfortunately, Mirrorbits development seems to have stalled since 2018, including documentation. [I opened an issue](https://github.com/etix/mirrorbits/issues/105) during my troubleshooting that is still unanswered, which is unfortunate, and I hope this blog post to be able to resolve that issue.

The basic configuration of Mirrorbits is quite simple. Most of the configuration options are explained well in the sample configuration file, and it was simply a matter of tuning them to our needs. Here is the file contents stripped of comments/explanations:

```
# /etc/mirrorbits.conf (on build1.jellyfin.org)
Repository: /srv/repository/mirror
Templates: /usr/local/share/mirrorbits/
LogDir: /var/log/mirrorbits
GeoipDatabasePath: /usr/local/share/GeoIP/
OutputMode: redirect
Gzip: false
ListenAddress: localhost:8080
RPCListenAddress: localhost:3390
RedisAddress: 127.0.0.1:6379
RedisDB: 0
TraceFileLocation: /mirrorsync
RepositoryScanInterval: 5
Hashes:
    SHA256: On
ConcurrentSync: 5
ScanInterval: 30
CheckInterval: 1
Fallbacks:
     - URL: https://repo.jellyfin.org/master/
       CountryCode: ca
       ContinentCode: na
```

A few options are worth mentioning as they differ from the obvious defaults.

`Repository` points towards the local repository path, the exact file(s) that are synchronized with `rsync` above.

`GeoipDatabasePath` is a path to a local copy of the GeoIP database; this will be discussed below.

`OutputMode` is set to `redirect` to give clients an HTTP 302 redirect to the file path. There are several options here, but the 302 is the most robust, prevents caching of the response, and has maximum compatibility.

`TraceFileLocation` points to a file which is used to judge the "health" of the mirrors. It should be a file which guarantees that the remote copies of the repository are in sync with the local instance, and must be under the `Repository` location.

`Hashes` provides several options, but we use SHA256 hashing for simplicity and to match our own provided hashes.

`RedisAddress` points to a local Redis instance that Mirrorbits uses to handle state.

`ConcurrentSync`, `RepositoryScanInterval`, `ScanInterval`, and `CheckInterval` are times in minutes that Mirrorbits *should* be checking, but we've found these to be unreliable; we use a cron task to do these tasks manually instead below.

Finally, `Fallbacks` provides a list of fallback mirrors. As mentioned above, the `/master` path provides the exact same content as `/releases`, only without being forwarded back to Mirrorbits and creating a loop. With this fallback, if all mirrors were unavailable, clients would not be able to download files at all. The fallback ensures there is still at least one source, that is not normally used, which can be used just in case.

The next step was creating a SystemD service for Mirrorbits. The process requires some special options for reloads and stopping, so these are included here. Note also that we run Mirrorbits as `www-data`, the same user as NGiNX itself:

```
# /etc/systemd/system/mirorrbits.service
[Unit]
Description=Mirrorbits redirector
Documentation=https://github.com/etix/mirrorbits
After=network.target

[Service]
Type=notify
DynamicUser=yes
LogsDirectory=mirrorbits
RuntimeDirectory=mirrorbits
User=www-data
PIDFile=/run/mirrorbits/mirrorbits.pid
ExecStart=/usr/local/bin/mirrorbits daemon -p /run/mirrorbits/mirrorbits.pid -debug
ExecReload=/bin/kill -HUP $MAINPID
ExecStop=-/bin/kill -QUIT $MAINPID
TimeoutStopSec=5
KillMode=mixed
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Finally, we need some cron jobs to ensure that the `TraceFileLocation` is updated regularly, and that the mirror is scanned and refreshed regularly. The trace file is always updated 1 minute before the sync happens, while the mirror scan happens one minute after; the local repository is refreshed every minute.

```
# /etc/cron.d/mirror-sync
11,26,41,56 *  * * *  root  /usr/bin/date +\%s | /usr/bin/tee /srv/repository/mirror/mirrorsync &>/dev/null
13,28,42,58 *  * * *  root  /usr/local/bin/mirrorbits scan -all
*           *  * * *  root  /usr/local/bin/mirrorbits refresh
```

## Adding Mirrors to Mirrorbits

Once all the setup is completed and Mirrorbits is running, we must add the mirrors to the Mirrorbits system. This is a straightforward process using the Mirrorbits binary:

```
mirrorbits add -http https://fra1.mirror.jellyfin.org -rsync rsync://fra1.mirror.jellyfin.org/mirror fra1
mirrorbits scan --enable fra1
mirrorbits refresh
```

Once scanned, enabled, and refreshed, the mirror should now be active and and visible in the `/mirrorstats` output or on the CLI, ready to serve requests.

```
joshua@build1.jellyfin.org ~ $ mirrorbits list
Identifier      STATE   SINCE
fra1            up      (Mon, 12 Apr 2021 07:15:29 UTC)
sgp1            up      (Mon, 12 Apr 2021 06:51:03 UTC)
tor1            up      (Sun, 11 Apr 2021 21:48:48 UTC)
sfo1            up      (Sun, 11 Apr 2021 17:43:27 UTC)
```

## GeoIP

One complication of using Mirrorbits is requiring a GeoIP database. It specifically requires the `GeoLite2` `mmdb` format to operate correctly. Unfortunately, this is no longer something that is provided freely. You must obtain this yourself.

This database is extracted to the `GeoipDatabasePath` location and is loaded by Mirrorbits at runtime.

We would like to use a freely available database, but it seems that with the current stall in Mirrorbits development, this is unlikely to happen. Such are the tradeoffs.

## Conclusion

All together, we hope this setup allows us to continue to scale our downloads for our users across the world. And I hope this post will help another admin of a small project who needs to distribute their downloads across many geodiverse servers. Good luck!
