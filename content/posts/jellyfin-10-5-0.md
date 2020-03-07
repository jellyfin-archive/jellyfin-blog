---
title: "Jellyfin Release - v10.5.0"
subtitle: "Our biggest release yet"
author: "Julien Machiels"
githubusername: "MrTimscampi"
date: 2020-03-07T08:11:42+01:00
justify: "center"
---

A myriad of improvements, bugfixes and a look towards the future.

<!--more-->

With **over 200 contributions** and **over 500 issues closed**, this is our biggest release yet. While it is a few months behind the scheduled Christmas deadline, our anniversary release packs a lot of new features.

<a href="/downloads/" class="button button__accent">Download Jellyfin 10.5.0</a> <a href="https://github.com/jellyfin/jellyfin/releases/tag/v10.5.0" class="button hero__button">Read the full release notes</a>

This post will feature some of the main enhancements available in Jellyfin version 10.5.0. For an exhaustive list of all the changes, you can find a complete list on [GitHub](https://github.com/jellyfin/jellyfin/releases/tag/v10.5.0).

## Web client

This cycle, part of our focus was on improving the look and feel of the web client.

<div class="juxtapose">
    <img data-label="10.4.3" src="/images/posts/jellyfin-10-5-0/old-home.jpg" name="" />
    <img data-label="10.5.0" src="/images/posts/jellyfin-10-5-0/new-home.jpg" name="" />
</div>

The web client now uses the **Noto Sans** font for all the languages we ship with. This makes for a more consistent experience and ensures that **multilingual libraries look unified**.

Jellyfin 10.5.0 ships with the Latin, Greek, Chinese, Japanese, Korean, Arabic, Cyrillic, Hebrew, Vietnamese and Devanagari versions of the Noto font, optimized for the web.

<div class="juxtapose">
    <img data-label="10.4.3" src="/images/posts/jellyfin-10-5-0/old-details.png" name="" />
    <img data-label="10.5.0" src="/images/posts/jellyfin-10-5-0/new-details.png" name="" />
</div>

The most noticeable visual change is the **new details page layout**. It puts the artwork of your library front and center while looking more modern and polished.

We have also completely **overhauled SSA/ASS subtitle support**. Through the use of asm.js and Web Assembly, we now provide improved rendering for these formats, fixing some long-standing issues for anime lovers.

However, most of the new developments in the web client are not immediately visible. We spent a lot of time preparing and cleaning the code for future improvements.

<img data-label="10.5.0" src="/images/posts/jellyfin-10-5-0/webos-icons.png" name="" />

A few long-standing issues for WebOS have been fixed as well, bringing us a bit closer to the release of the WebOS app. Among these, icons are now properly working and the client has been reported to work on both WebOS 3 and WebOS 4. We also have plans for the next release that should improve compatibility with earlier WebOS versions and streamline the support of clients using older browser versions as a base. Navigation in the TV layout has also been substantially improved, paving the way for navigation using a remote.

Finally, several performance and responsiveness issues have been addressed. A rogue gamepad input loop is now properly handled, which prevents unnecessary repaintings by the browser and should improve performance. A previously-disabled fade-in effect for images has also been enabled, making loading into a new page look smoother. It is now also possible to upload artwork in WEBP format.

## Server

This cycle, our server team ported the code over to .NET Core 3.1. This move makes new features available to our developers, including support for ARM64 for Linux, compatibility with TLS v1.3 and better garbage collection on Docker, allowing for better memory usage when running in a container.

A lot of code cleanup and refactoring was done, fixing a number issues and bringing some speed improvements. Among these, the following table, while a little technical, shows the impressive speed improvement between the previous implementation of our hex decoder and the one shipped in Jellyfin 10.5.0.

<table style="width:100%">
<thead>
    <th>Method</th>
    <th>Mean</th>
    <th>Error</th>
    <th>StdDev</th>
    <th>Gen 0</th>
    <th>Allocated</th>
</thead>
<tbody>
<tr>
    <td><b>Jellyfin 10.5.0</b></td>
    <td style="text-align:right">10.81 μs</td>
    <td style="text-align:right">0.079 μs</td>
    <td style="text-align:right">0.074 μs</td>
    <td style="text-align:right">0.1068</td>
    <td style="text-align:right">336 B</td>
</tr>
<tr>
    <td><b>Jellyfin 10.4.3</b></td>
    <td style="text-align:right">23.57 μs</td>
    <td style="text-align:right">0.055 μs</td>
    <td style="text-align:right">0.051 μs</td>
    <td style="text-align:right">11.2305</td>
    <td style="text-align:right">35272 B</td>
</tr>
</tbody>
</table>

Another example of the speed improvements to the server this cycle is the following comparison between our previous alphanumeric comparator and the one shipped in Jellyfin 10.5.0, showing a reduction of the execution time of more than 50%!

<table style="width:100%">
<thead>
    <th>Method</th>
    <th>Mean</th>
    <th>Error</th>
    <th>StdDev</th>
    <th>Gen 0</th>
    <th>Allocated</th>
</thead>
<tbody>
<tr>
    <td><b>Jellyfin 10.5.0</b></td>
    <td style="text-align:right">10.81 μs</td>
    <td style="text-align:right">0.079 μs</td>
    <td style="text-align:right">0.074 μs</td>
    <td style="text-align:right">0.1068</td>
    <td style="text-align:right">336 B</td>
</tr>
<tr>
    <td><b>Jellyfin 10.4.3</b></td>
    <td style="text-align:right">23.57 μs</td>
    <td style="text-align:right">0.055 μs</td>
    <td style="text-align:right">0.051 μs</td>
    <td style="text-align:right">11.2305</td>
    <td style="text-align:right">35272 B</td>
</tr>
</tbody>
</table>

**Support for AMD AMF hardware encoding** is now available on Windows and Linux, as well as support for DVDs as folders, a provider for season images for TheMovieDB and various fixes to media scanning, base URLs and DLNA. **Raspberry Pi hardware acceleration** for older models is also now supported. For Raspeberry Pi 4, hardware-accelerated encoding for H264 is now supported on Raspbian, both using the LinuxServer.io Docker and the repository package.

As part of a project to move the core metadata providers to plugins, MusicBrainz is now a default plugin and allows you to configure the URL of the instance you want to pull data from, thereby allowing you to host an instance of MusicBrainz and sidestep the global rate limiting enforced by the main service.

Aside from all these improvements, more tests have been added on the server-side to help developers track down issues with new and existing code. This ensures a faster development time and prevents some breakages, which will be caught early through automated testing.

## Documentation

Our documentation team has also been hard at work improving both the user and developer documentation.

Of note recently are the overhauls to the [Networking](https://jellyfin.org/docs/general/networking/index.html) and [Hardware Acceleration](https://jellyfin.org/docs/general/administration/hardware-acceleration.html) sections.

We now provide an extensive [Codec Support](https://jellyfin.org/docs/general/clients/codec-support.html) list and help on [CSS Customization](https://jellyfin.org/docs/general/clients/css-customization.html), with examples of useful CSS customizations to apply to your server via the Administration dashboard.

## Looking towards the future

A lot is happening in the world of Jellyfin recently. Since the release of Jellyfin 10.4.0, we have seen a lot of new contributors joining the team and the speed of development has tremendously accelerated.

With that influx of contributors, we have a few large scale projects for both the server and the web client that should, in due time, bring a ton of improvements to Jellyfin. More information is already available on [GitHub](https://github.com/jellyfin/) if you want to take part in the discussion or implementation.

We'd like to thank all the contributors who worked on this release for their hard work and dedication to making the best FOSS media server possible.

* [Abbe98](https://github.com/Abbe98/)
* [anthonylavado](https://github.com/anthonylavado/)
* [Artiume](https://github.com/Artiume/)
* [Bond-009](https://github.com/Bond-009/)
* [bugfixin](https://github.com/bugfixin/)
* [cvium](https://github.com/cvium/)
* [dhartung](https://github.com/dhartung/)
* [dinki](https://github.com/dinki/)
* [dkanada](https://github.com/dkanada/)
* [dmitrylyzo](https://github.com/dmitrylyzo/)
* [DrPandemic](https://github.com/DrPandemic/)
* [EraYaN](https://github.com/EraYaN/)
* [ferferga](https://github.com/ferferga/)
* [grafixeyehero](https://github.com/grafixeyehero/)
* [joshuaboniface](https://github.com/joshuaboniface/)
* [JustAMan](https://github.com/JustAMan/)
* [LogicalPhallacy](https://github.com/LogicalPhallacy/)
* [mark-monteiro](https://github.com/mark-monteiro/)
* [MrTimscampi](https://github.com/MrTimscampi/)
* [Narfinger](https://github.com/Narfinger/)
* [Nickbert7](https://github.com/Nickbert7/)
* [nvllsvm](https://github.com/nvllsvm/)
* [nyanmisaka](https://github.com/nyanmisaka/)
* [oddstr13](https://github.com/oddstr13/)
* [ploughpuff](https://github.com/ploughpuff/)
* [redSpoutnik](https://github.com/redSpoutnik/)
* [sparky8251](https://github.com/sparky8251/)
* [thornbill](https://github.com/thornbill/)
* [vitorsemeano](https://github.com/vitorsemeano/)
* [Wunax](https://github.com/Wunax/)
* [YouKnowBlom](https://github.com/YouKnowBlom/)

If you'd like to take part in the development of Jellyfin, most of the contributors are available on [GitHub](https://github.com/jellyfin/) or on via [any of the ways on our contact page](/contact/).