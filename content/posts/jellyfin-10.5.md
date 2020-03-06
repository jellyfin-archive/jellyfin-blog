+++
title = "Jellyfin 10.5"
subtitle = "A step closer to the best experience with your media"
author = "Fernando"
githubusername = "ferferga"
date = "2020-03-06"
justify = "center"
+++

Hello Jellyfin users out there! Welcome back to our blog!

What would you think if I tell you that 10.5 is probably the biggest release we've done? Fasten your seat belts and get ready because the numbers are big:
**Over 200 contributions from the community were merged and over 500 issues were fixed** since 10.4.3 (the latest stable version), both in Jellyfin and Jellyfin Web,
the interface you access using your browser.

Although we tried hard, we are even unsure if we got covered everything that's new. We hope so. Anyway, you're advised to take some popcorn before continuing. Let's dive in!

We also want to apologise for the late release: We wanted to make 10.5 possible this Christmas, but we always found that something wasn't complete or finished yet.
We hope you will forgive us (*send everyone who contributed a cake if you do, please!*) after trying it!

# Key Features

## Let your content shine like never before

If you're like us, you probably want to have your content showcased as beautiful as possible, right? At least, everyone who contributed to the web interface were really comitted into this, so I it seems that, at least, they want to:

#### Jellyfin 10.4.3

<img src="/images/10.5-release/old.png" name="Old item details page" />

#### Jellyfin 10.5

<img src="/images/10.5-release/new.png" name="New item details page" />

*With 10.5, we wanted to reimagine Jellyfin's Web interface*

Posters are now as relevant as the description of the element and backgrounds introduce you to your content. In fact, I thought that I was the jungle when
I took that screenshot of the *Jungle's Book* wallpaper. Do you feel it like me?

Notice also that the header of the UI has been reworked a little bit in a *slightly* lighter color (instead of the plain color used by the theme)

Shoutout to all the Web team for their invaluable contributions in mking this happen, specially to *[Julien](https://github.com/mrtimscampi)* and 
*[grafixeyehero](https://github.com/grafixeyehero)*.

You can check the redesign in our [demo server](https://demo.jellyfin.org/stable)

## Faster than the sound and cleaner than a surgery room

As you already know, we're still a really young community that want to provide the best self-hosted media server out there. As with every release,
**we tried to clean up and optimize the old code** that we inherited when we forked Emby's code. And that's what we have been doing since
the day we released 10.4.3. A lot of this work will pass unnoticed to many of you, but they're not less important. I'll get to that in a moment.

Let's start with the frontend, as it's what you see everyday in the end. A lot of work has been done to simplify the code and ease the transition
to more modern frameworks, which will be really useful in the future for making more awesome things with the interface of the clients. While
all the benefits of this are not visible for you in the daily use just yet, it's a necessary step towards a better application. In fact, it already paid off in application speed. See this video:

<video autoplay muted loop preload="none" id="preview">
    <source src="/images/10.5-release/speed.mp4" type="video/mp4">
</video>

Not only you're seeing the speed differences, you're seeing the new animations! Images **will fade in** every time you move to another page. You **can** disable that in settings if you want to come back the old behaviour though.

The old-standing issue that many of you had (by the way, introduced by the *fellow writer* of this post 🙄) caused by the images has been fixed in this version
(although we want to keep improving in that matter, as we're still not completely happy with the current implementation) 

That's pretty much what you'll notice at first sight for web anyway. A lot of not-that-relevant improvements, translations and bug fixes have been added. Consider that they're easter eggs, so happy finding! Ah, and we also added keyboard support for TVs and improved the compatibility with old browsers (just in case)!

Okay, server time then! This time we focused heavily in migrating to .NET Core 3.0 (the framework we use for building the server's core).
Although this seems boring, let's see some benchmarks from the hex decoder (used in server's tasks):

```
|                         Method |     Mean |    Error |   StdDev |   Gen 0 | Gen 1 | Gen 2 | Allocated |
|------------------------------- |---------:|---------:|---------:|--------:|------:|------:|----------:|
|                New hex decoder | 10.81 us | 0.079 us | 0.074 us |  0.1068 |     - |     - |     336 B |
|                Old hex decoder | 23.57 us | 0.055 us | 0.051 us | 11.2305 |     - |     - |   35272 B |
```
*Shoutout to [Bond-009](https://github.com/Bond-009) for this!*

That's only a tiny example of what we have been cooking and the groundwork preparation we've been doing for upcoming versions.
However, there are some key improvements here, which are mostly focused in performance:

* Added support for embedded attachments in media files (#1838)
* Fixed Play To order for playlists
* Raspberry Pi should have now full hardware-acceleration capabilities when encoding and decoding (older models, not in 4 yet)
* General improvements to the transcoding speed and reliability
* Reliability improvements
* Tons of bug fixes

## Extra, Extra!

Along the way, we also updated a lot of our documentation. Specifically, the experts have been working hard in revamping the **network/reverse proxy**
and the **hardware acceleration** configuration guides. Not only improvements have been made, but also new sections have been added to the documentation, such
as the extensive **codec** and the **custom CSS branding** guides.

[Check it out!](https://jellyfin.org/docs/). With this new documentation you will probably end up with a setup we couldn't even match!

## Release Notes

All this blog post focused heavily in the server and the web client, as they're the most used ones. However, we also have a bunch of apps that will receive
this update as well, so [keep an eye](https://github.com/jellyfin) on our GitHub.

Detailed release notes available on the [GitHub's server repository](https://github.com/jellyfin/jellyfin/releases/tag/v10.5.0).

## We're not done yet

As [Joshua explained in his blog post](https://jellyfin.org/posts/jellyfin-in-2019/), we're really excited to see how our whole community is evolving,
and we're impressed by how far we got since we first started. Things are going really quick, and this release just proves that.

In this post, I mentioned some of the people that contributed a lot of making this version possible. However, it's completely unfair
if only they're mentioned, as this has been a community work. That's why I want to take advantage of this blog post to say thank you, in behalf of all the project
leaders, to every single one of you out there: Big thank you to everyone in the community - not just the contributors,
sponsors, translators, reddit/matrix/forum users, but everyone who helps Jellyfin by using, translating, and encouraging people to use it: **The fact that you took some of your precious time to take a look at what we do means that you care, and that mean a lot to us.**

We're so proud of our community. It's our reason to exist and why we're way beyond where we expected a while back.

Let's keep fuelling this rocket together!

With all that said, I wish you a happy weekend and enjoy *Jellyfin*!

PS: If you are planning something for this weekend, don't you think it's a great idea to invite some of your friends/family and watch your
(now shining) new content together? Just sayin'! 😋