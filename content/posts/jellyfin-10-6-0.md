---
title: "Jellyfin Release - v10.6.0"
subtitle: "Party together while social distancing"
author: "Julien Machiels"
githubusername: "MrTimscampi"
date: 2020-07-13T11:42:00+01:00
justify: "center"
---

After months of work, here comes a behemoth of a release, with over 30 major improvements.

<!--more-->

At **more than 500 pull requests** merged between the server and the web client, Jellyfin 10.6.0 brings an incredibly number of new features, improvements and bug fixes. It's a huge release and we have a lot to cover, so let's get to it!

# SyncPlay

Other services have recently launched various ways to view your content together with friends. With the current global situation, it makes a lot of sense, and Jellyfin isn't lagging behind.

We're proud to announce Jellyfin 10.6's headline feature: **SyncPlay**.

First-time contributor [OancaAndrei](https://github.com/OancaAndrei) submitted pull requests to the server and the web client to implement a way to share media with your friends ([jf#2733](https://github.com/jellyfin/jellyfin/pull/2733), [jf-web#1011](https://github.com/jellyfin/jellyfin-web/pull/1011)).

SyncPlay allows you to create rooms that other users or clients can join in order to share a common viewing experience. There is no limit on the number of users in a room and you are free to join the same room with the same user from multiple clients as well.

The feature is expected to be improved in future versions of Jellyfin, but has already been used by multiple users to enjoy a movie with friends and family, with delay between clients of only a couple of milliseconds.

# Migration to Entity Framework Core

It's been on our plate for a while, but thanks to new team member [barronpm](https://github.com/barronpm), we can finally say that the rewrite of our database model is progressing at a steady pace!

Previously, Jellyfin used a combination of SQLite databases (yes, multiple ones), XML files and C# spaghetti to perform database operations. Information was split in multiple places, sometimes even duplicated and generally filtered in C# instead of using the database engine's faster processing.

Over the course of this cycle, [barronpm](https://github.com/barronpm) has been deciphering and untangling this mess, and managed to successfully migrate the ActivityDB ([jf#2970](https://github.com/jellyfin/jellyfin/pull/2970)) and the UserDB ([jf3148](https://github.com/jellyfin/jellyfin/pull/3148)) to EF Core.

While there is still a ways to go, EF Core should bring faster database queries, support for multiple database engines, cleaner code, and significantly reduces memory usage. Currently, there is still a bridge to make the link between the new EF Core databases and the existing code, which should be cleaned down the line.

Part of the improved memory usage is due to our current ORM caching everything in memory to make up for its slowness. For large databases, this could result in hundreds of megabytes of memory lost to caching. With EF Core, however, we leave the heavy lifting to the database engine, leading to better response times and less memory usage overall.

Your databases will be automatically migrated when you first launch Jellyfin 10.6. While the migration process has been well tested over the past few months, **please backup your existing date files**.

# A more modern web client

Our web client has long suffered of a massive amount of technical debt, due to the project we forked from only providing minified versions of the source and using antiquated web technologies. Some of these old technologies have, until recently, prevented us from being able to use modern JavaScript tooling, which would allow us to significantly clean the source.

Thankfully, this is now behind us, as [MrTimscampi](https://github.com/MrTimscampi) worked on improving the way we build the web client ([jf-web#862](https://github.com/jellyfin/jellyfin-web/pull/862)). This allows us to use bleeding edge JavaScript thanks to Babel, but also simplifies greatly our support for legacy clients (Most notably early WebOS and Tizen versions).

Among the benefits of this move to Gulp for building the client, we have started moving away from [RequireJS](https://requirejs.org/) and towards using standard [EcmaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), thanks to [Camc314](https://github.com/Camc314), [cromefire](https://github.com/cromefire/), [Delgan](https://github.com/delgan), [dkanada](https://github.com/dkanada/), [grafixeyehero](https://github.com/grafixeyehero/), [MrTimscampi](https://github.com/MrTimscampi), and [sarab97](https://github.com/sarab97/).

This massive change, once it is complete, will allow us to simplify the web client build process, which will in turn allow us to start our migration to [Vue](https://vuejs.org/) and significantly clean up our code.

# Server performance, bug fixes and better networking

Our resident C# performance wizard, [Bond-009](https://github.com/Bond-009) continues his quest to rid the server source of warnings and generally improve performance, fixing multiple bugs in the process.

[mark-monteiro](https://github.com/mark-monteiro) worked on multiple fixes for 10.6, including reworking the network settings accessible through the administration dashboard ([jf#2774](https://github.com/jellyfin/jellyfin/pull/2774), [jf-web#1140](https://github.com/jellyfin/jellyfin-web/pull/1140)).

Team member [nyanmisaka](https://github.com/nyanmisaka), with some help from [artiume](https://github.com/artiume/), brings a number of improvements to transcoding ([jf#2809](https://github.com/jellyfin/jellyfin/pull/2809), [jf-web#1046](https://github.com/jellyfin/jellyfin-web/pull/1046), [jf#2821](https://github.com/jellyfin/jellyfin/pull/2821), [jf#2715](https://github.com/jellyfin/jellyfin/pull/2715)), with format toggles, options for toggling transcoding for HEVC an 10-bit VP9 videos off for older GPUs, providing support for the VP8/VP9 QSD and NVDEC decoders in FFmpeg 4.3, better support for UTF-16 subtitles and a host of other improvements.

Other improvements to the server include fixes for collection metadate ([jf#3117](https://github.com/jellyfin/jellyfin/pull/3117)), improvements to the metadata providers ([jf#3071](https://github.com/jellyfin/jellyfin/pull/3071), [jf#3056](https://github.com/jellyfin/jellyfin/pull/3056), [jf#3289](https://github.com/jellyfin/jellyfin/pull/3289)), and more core providers moved to plugins ([jf#3208](https://github.com/jellyfin/jellyfin/pull/3208)).

# More web client improvements

[Itegulov](https://github.com/itegulov) and [dkanada](https://github.com/dkanada/) have improved support for ebooks by adding an EPUB reader based on [epub.js](https://github.com/futurepress/epub.js/) ([jf-web#1263](https://github.com/jellyfin/jellyfin-web/pull/1263)). Reader support for more formats is in progress for future versions, including CBZ/CBR and PDF.

As we used the new 10.5 details screen over the last few months, we noticed some improvements we could make to the experience. Team member [MrTimscampi](https://github.com/MrTimscampi), along with input from the rest of the web team and some of our users, did a second pass on that screen ([jf-web#949](https://github.com/jellyfin/jellyfin-web/pull/949), [jf-web#1206](https://github.com/jellyfin/jellyfin-web/pull/1206)), tightening the design and cleaning some visual issues along the way.

<div class="juxtapose">
    <img data-label="10.5.5" src="/images/posts/jellyfin-10-6-0/details-10-5.png" name="" />
    <img data-label="10.6.0" src="/images/posts/jellyfin-10-6-0/details-10-6.png" name="" />
</div>

Team member [ferferga](https://github.com/ferferga) and contributor [samuel9554](https://github.com/samuel9554) have been working on redesigning our music experience. For 10.6, they overhauled our mobile music playeer interface and made significant changes to the mini player and the remote player UI ([jf-web#1056](https://github.com/jellyfin/jellyfin-web/pull/1056), [jf-web#1430](https://github.com/jellyfin/jellyfin-web/pull/1430)).

<div class="juxtapose">
    <img data-label="10.5.5" src="/images/posts/jellyfin-10-6-0/player-10-5.png" name="" />
    <img data-label="10.6.0" src="/images/posts/jellyfin-10-6-0/player-10-6.png" name="" />
</div>

[MrTimscampi](https://github.com/MrTimscampi) also reworked the image loading system ([jf-web#1065](https://github.com/jellyfin/jellyfin-web/pull/1065)), fixing some visual issues and improving memory usage by unloading out of view images. Along with this improvement, [ferferga](https://github.com/ferferga), [GranPC](https://github.com/GranPC), [JustAMan](https://github.com/JustAMan) and [Bond-009](https://github.com/Bond-009) have implemented [Blurhash](https://blurha.sh/) placeholder support on both the server and the web client.

Other improvements to the web client include a rewritten image viewer ([jf-web#967](https://github.com/jellyfin/jellyfin-web/pull/967)), a configuration option for the number of items per page in libraries ([jf-web#983](https://github.com/jellyfin/jellyfin-web/pull/983)), a toggle for the nightly version of the Chromecast client ([jf-web#1242](https://github.com/jellyfin/jellyfin-web/pull/1242)), support for multiple plugin repositories ([jf-web#1393](https://github.com/jellyfin/jellyfin-web/pull/1393), [jf#3244](https://github.com/jellyfin/jellyfin/pull/3244)), and improvements to SSA/ASS support ([jf-web#1144](https://github.com/jellyfin/jellyfin-web/pull/1144), [jf-web#1095](https://github.com/jellyfin/jellyfin-web/pull/1095), [jf-web#1048](https://github.com/jellyfin/jellyfin-web/pull/1048), [jf-web#1005](https://github.com/jellyfin/jellyfin-web/pull/1005)).

# Patreons and Github Sponsors

With the increased amount of activity on the project, we would like to give a signal boost to some ways to support the people working daily on Jellyfin. We want to stress that, while some of our contributors individually accept financial donations, Jellyfin and its features will **never** be hidden behind a paywall. Supporting the developers won't give give you any exclusive access to features, feature requests or support.

[anthonylavado](https://github.com/anthonylavado), our wonderful PR and developer relation person, has a Github Sponsors profile.

[barronpm](https://github.com/barronpm), whose main work is done on the server portion of Jellyfin and who has been spearheading the migration to EF Core has recently opened [a Patreon page](https://www.patreon.com/barronpm).

[ferferga](https://github.com/ferferga), web client contributor, localization aficionado and all-around awesome person accepts donations through Github Sponsors.

[MrTimscampi](https://github.com/MrTimscampi), whose main work has been cleaning up and modernizing the web client, also recently opened [a Patreon page](https://www.patreon.com/mrtimscampi).

[oddstr13](https://github.com/oddstr13), one of the developers of Jellyfin for Kodi is also on Github Sponsors and accepts donations.

[thornbill](https://github.com/thornbill) and [nielsvanvelzen](https://github.com/nielsvanvelzen), keepers of the Android clients, can also be supported on Github Sponsors.

# Contributors

We would like to thank all the contributors who worked on making Jellyfin 10.6 happen:

Insert full list of 10.6 contributors here.
