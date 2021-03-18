---
title: "Jellyfin Release - v10.7.0"
subtitle: "It never stops"
author: "Jellyfin Team"
githubusername: "jellyfin"
date: 2020-12-19T11:42:00+01:00
justify: "center"
---

We are proud to announce the release of Jellyfin 10.7.0, another huge release from more X contributors.

<!--more-->

<a href="/downloads/" class="button button__accent">Download Jellyfin 10.7.0</a> <a href="https://github.com/jellyfin/jellyfin/releases/tag/v10.7.0" class="button hero__button">Read the full release notes</a>

For our second anniversary, we bring you HDR tonemapping, SyncPlay improvements, a ton of bug fixes, and more modern frameworks.

# HDR Tonemapping

This is a long awaited feature and we're happy to finally be able to deliver proper, high quality HDR tone mapping. This essentially allows you to play HDR content on any SDR screen. No more washed out picture and no more need to keep multiple versions of your movies because one of your screens isn't HDR-compatible.

Because a picture is worth more than a thousand words, here is an example of what it can achieve:

<div class="juxtapose">
    <img data-label="No tonemapping" src="/images/posts/jellyfin-10-7-0/hdr-10-6.png" name="" />
    <img data-label="With tonemapping" src="/images/posts/jellyfin-10-7-0/hdr-10-7.jpg" name="" />
</div>

While we are planning to support more configurations with time, this feature currently requires a server with access to a GPU with support for hardware transcoding. Here is a handy table to help you figure out if your system is compatible or not:

| OS/Platform | NVIDIA NVENC | AMD AMF  | Intel VAAPI | AMD VAAPI | Intel QSV | Software |
| :---------- | :----------- | :------- | :---------- | :-------- | :-------- | :------- |
| Linux       | OK           | OK       | OK          | Planned   | Planned   | Planned  |
| Windows     | OK           | OK       | N/A         | N/A       | Planned   | Planned  |
| Docker      | OK           | Untested | OK          | Planned   | Planned   | Planned  |

# Migration to Entity Framework Core

It's been on our plate for a while, but thanks to new [barronpm](https://github.com/barronpm), we can finally say that the rewrite of our database model is progressing at a steady pace!

Previously, Jellyfin used a combination of SQLite databases (yes, multiple ones), XML files and C# spaghetti to perform database operations. Information was split in multiple places, sometimes even duplicated and generally filtered in C# instead of using the database engine's faster processing.

Over the course of this cycle, [barronpm](https://github.com/barronpm) has been deciphering and untangling this mess, and managed to successfully migrate the ActivityDB ([jf#2970](https://github.com/jellyfin/jellyfin/pull/2970)) and the UserDB ([jf3148](https://github.com/jellyfin/jellyfin/pull/3148)) to EF Core.

While there is still a ways to go, EF Core should bring faster database queries, support for multiple database engines, cleaner code, and significantly reduced memory usage. Currently, there is still a bridge to make the link between the new EF Core databases and the existing code, which will be cleaned up down the line.

Part of the improved memory usage is due to our current inherited custom ORM caching everything in memory to make up for its slowness. For large databases, this could result in hundreds of megabytes of memory lost to caching. With EF Core, however, we leave the heavy lifting to the database engine, leading to better response times and less memory usage overall.

Your databases will be automatically migrated when you first launch Jellyfin 10.6. While the migration process has been well tested over the past few months, issues may arise during the migration process. To prevent any data loss, please **backup your existing data files** before starting the migration process.

# A more modern web client

Our web client has long suffered of a massive amount of technical debt, due to the project we forked from only providing minified versions of the source and using antiquated web technologies. Some of these old technologies have, until recently, prevented us from being able to use modern JavaScript tooling, which would allow us to significantly clean the source.

Thankfully, this is now behind us, as [MrTimscampi](https://github.com/MrTimscampi) worked on improving the way we build the web client by using Gulp to perform various tasks necessary for building our current code structure with modern tools. ([jf-web#862](https://github.com/jellyfin/jellyfin-web/pull/862)). This allows us to use bleeding edge JavaScript thanks to Babel, but also simplifies greatly our support for legacy clients (Most notably early WebOS and Tizen versions).

Among the benefits of this move to Gulp for building the client, we have started moving away from [RequireJS](https://requirejs.org/) and towards using standard [EcmaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), thanks to [Camc314](https://github.com/Camc314), [cromefire](https://github.com/cromefire/), [Delgan](https://github.com/delgan), [dkanada](https://github.com/dkanada/), [grafixeyehero](https://github.com/grafixeyehero/), [MrTimscampi](https://github.com/MrTimscampi), and [sarab97](https://github.com/sarab97/).

This massive change, once it is complete, will allow us to simplify the web client build process, which will in turn allow us to start our migration to [Vue](https://vuejs.org/) and significantly clean up our code. This should also bring some noticeable performance improvements to the web client down the line, as we tackle technical debt and remove deprecated practices and libraries from the code.

# Server performance, bug fixes and better networking

Our resident C# performance wizard, [Bond-009](https://github.com/Bond-009) continues his quest to rid the server source of warnings and generally improve server performance, fixing multiple bugs in the process.

[mark-monteiro](https://github.com/mark-monteiro) worked on multiple fixes for 10.6, including reworking the network settings accessible through the administration dashboard ([jf#2774](https://github.com/jellyfin/jellyfin/pull/2774), [jf-web#1140](https://github.com/jellyfin/jellyfin-web/pull/[nyanmisaka](https://github.com/nyanmisaka), with some help from [artiume](https://github.com/artiume/), brings a number of improvements to transcoding ([jf#2809](https://github.com/jellyfin/jellyfin/pull/2809), [jf-web#1046](https://github.com/jellyfin/jellyfin-web/pull/1046), [jf#2821](https://github.com/jellyfin/jellyfin/pull/2821), [jf#2715](https://github.com/jellyfin/jellyfin/pull/2715)), with format toggles, options for toggling transcoding for HEVC and 10-bit VP9 videos off for older GPUs, providing support for the VP8/VP9 QSV and NVDEC decoders in FFmpeg 4.3, better support for UTF-16 subtitles and a host of other improvements.

Further changes to the server include fixes for collection metadata issues ([jf#3117](https://github.com/jellyfin/jellyfin/pull/3117)), improvements to the metadata providers ([jf#3071](https://github.com/jellyfin/jellyfin/pull/3071), [jf#3056](https://github.com/jellyfin/jellyfin/pull/3056), [jf#3289](https://github.com/jellyfin/jellyfin/pull/3289)), and more core providers moved to plugins ([jf#3208](https://github.com/jellyfin/jellyfin/pull/3208)).

# More web client improvements

[Itegulov](https://github.com/itegulov) and [dkanada](https://github.com/dkanada/) have improved support for ebooks by adding an EPUB reader based on [epub.js](https://github.com/futurepress/epub.js/) ([jf-web#1263](https://github.com/jellyfin/jellyfin-web/pull/1263)). Reader support for more formats is in progress for future versions, including CBZ/CBR and PDF.

As we used the new 10.5 details screen over the last few months, we noticed some improvements we could make to the experience. [MrTimscampi](https://github.com/MrTimscampi), along with input from the rest of the web team and some of our users, did a second pass on that screen ([jf-web#949](https://github.com/jellyfin/jellyfin-web/pull/949), [jf-web#1206](https://github.com/jellyfin/jellyfin-web/pull/1206)), tightening the design and cleaning some visual issues along the way. [Delgan](https://github.com/jellyfin/jellyfin-web/pull/1406) put in the final touches to the page by avoiding a jump in the content when rendering the track selectors on the page ([jf-web#1406](https://github.com/jellyfin/jellyfin-web/pull/1406))

<div class="juxtapose">
    <img data-label="10.5.5" src="/images/posts/jellyfin-10-6-0/details-10-5.png" name="" />
    <img data-label="10.6.0" src="/images/posts/jellyfin-10-6-0/details-10-6.png" name="" />
</div>

[ferferga](https://github.com/ferferga) and [samuel9554](https://github.com/samuel9554) have been working on redesigning our music experience. For 10.6, they overhauled our mobile music player interface and made significant changes to the mini player and the remote player UI ([jf-web#1056](https://github.com/jellyfin/jellyfin-web/pull/1056), [jf-web#1430](https://github.com/jellyfin/jellyfin-web/pull/1430)).

<div class="juxtapose">
    <img data-label="10.5.5" src="/images/posts/jellyfin-10-6-0/player-10-5.png" name="" />
    <img data-label="10.6.0" src="/images/posts/jellyfin-10-6-0/player-10-6.png" name="" />
</div>

[MrTimscampi](https://github.com/MrTimscampi) also reworked the image loading system ([jf-web#1065](https://github.com/jellyfin/jellyfin-web/pull/1065)), fixing some visual issues and improving memory usage by unloading out of view images. Along with this improvement, [ferferga](https://github.com/ferferga), [GranPC](https://github.com/GranPC), [JustAMan](https://github.com/JustAMan) and [Bond-009](https://github.com/Bond-009) have implemented [Blurhash](https://blurha.sh/) placeholder support on both the server and the web client, which brings further visual refinement to the user interface.

[JustAMan](https://github.com/JustAMan) went back over our new SSA/ASS subtitle rendering system and significantly improved performance for subtitles with heavy effects ([jf-web#1144](https://github.com/jellyfin/jellyfin-web/pull/1144), [jf-web#1095](https://github.com/jellyfin/jellyfin-web/pull/1095), [jf-web#1048](https://github.com/jellyfin/jellyfin-web/pull/1048), [jf-web#1005](https://github.com/jellyfin/jellyfin-web/pull/1005)). While we still consider the feature experimental, it should now be able to render most subtitles accurately and with correct performance.

Other improvements to the web client include a rewritten image viewer ([jf-web#967](https://github.com/jellyfin/jellyfin-web/pull/967)), a configuration option for the number of items per page in libraries ([jf-web#983](https://github.com/jellyfin/jellyfin-web/pull/983)), a toggle for the nightly version of the Chromecast client ([jf-web#1242](https://github.com/jellyfin/jellyfin-web/pull/1242)), and support for multiple plugin repositories ([jf-web#1393](https://github.com/jellyfin/jellyfin-web/pull/1393), [jf#3244](https://github.com/jellyfin/jellyfin/pull/3244)).

# Patreons and Github Sponsors

With the increased amount of activity on the project, we would like to give a signal boost to some ways to support the people working daily on Jellyfin.

We want to stress that, while some of our contributors individually accept financial donations, Jellyfin and its features will **never** be hidden behind a paywall. Supporting the developers financially is entirely voluntary and won't give you any exclusive access to features or support, nor will it change the priority of your feature requests or issues.

[anthonylavado](https://github.com/anthonylavado), our wonderful PR and developer relation person, accepts donations through [Github Sponsors](https://github.com/sponsors/anthonylavado).

[barronpm](https://github.com/barronpm), whose main work is on the server portion of Jellyfin and who has been spearheading the migration to EF Core has recently opened [a Patreon page](https://www.patreon.com/barronpm).

[dkanada](https://github.com/dkanada/), whose work spreads from server to web client, accepts donations through [Github Sponsors](https://github.com/sponsors/dkanada)

[ferferga](https://github.com/ferferga), web client contributor, localization aficionado and all-around awesome person accepts donations through [Github Sponsors](https://github.com/sponsors/ferferga).

[nielsvanvelzen](https://github.com/nielsvanvelzen), who has been working hard on the Android TV client, can be supported on [Github Sponsors](https://github.com/sponsors/nielsvanvelzen).

[MrTimscampi](https://github.com/MrTimscampi), whose main work has been cleaning up and modernizing the web client, also recently opened [a Patreon page](https://www.patreon.com/mrtimscampi).

[oddstr13](https://github.com/oddstr13), one of the developers of Jellyfin for Kodi also accepts donations on [Github Sponsors](https://github.com/sponsors/oddstr13).

[thornbill](https://github.com/thornbill) who handles the iOS and Android clients, and also contributes to the Android TV client, can be supported on [Github Sponsors](https://github.com/sponsors/thornbill)

# Contributors

As an final note, we would like to thank all the contributors who worked on making Jellyfin 10.6 a reality:

- [adavier](https://github.com/adavier/)
- [aled](https://github.com/aled/)
- [alset333](https://github.com/alset333/)
- [anthonylavado](https://github.com/anthonylavado/)
- [Artiume](https://github.com/Artiume/)
- [balu92](https://github.com/balu92/)
- [BaronGreenback](https://github.com/BaronGreenback/)
- [barronpm](https://github.com/barronpm/)
- [bendardenne](https://github.com/bendardenne/)
- [Bond-009](https://github.com/Bond-009)
- [Brissot](https://github.com/Brissot/)
- [Camc314](https://github.com/Camc314/)
- [ConfusedPolarBear](https://github.com/ConfusedPolarBear/)
- [crobibero](https://github.com/crobibero/)
- [cromefire](https://github.com/cromefire/)
- [cvium](https://github.com/cvium/)
- [dafo90](https://github.com/dafo90/)
- [danieladov](https://github.com/danieladov/)
- [Delgan](https://github.com/Delgan/)
- [dkanada](https://github.com/dkanada/)
- [dmitrylyzo](https://github.com/dmitrylyzo/)
- [dtparr](https://github.com/dtparr/)
- [EraYaN](https://github.com/EraYaN/)
- [ferferga](https://github.com/ferferga/)
- [fhriley](https://github.com/fhriley/)
- [grafixeyehero](https://github.com/grafixeyehero/)
- [GranPC](https://github.com/GranPC/)
- [h1nk](https://github.com/h1nk/)
- [hauntingEcho](https://github.com/hauntingEcho/)
- [itegulov](https://github.com/itegulov/)
- [iwalton3](https://github.com/iwalton3/)
- [jairbubbles](https://github.com/jairbubbles/)
- [joshuaboniface](https://github.com/joshuaboniface/)
- [JustAMan](https://github.com/JustAMan/)
- [kesslern](https://github.com/kesslern/)
- [KGT1](https://github.com/KGT1/)
- [KristupasSavickas](https://github.com/KristupasSavickas/)
- [KucharczykL](https://github.com/KucharczykL/)
- [lfoust](https://github.com/lfoust/)
- [lyonzy](https://github.com/lyonzy/)
- [macr](https://github.com/macr/)
- [mark-monteiro](https://github.com/mark-monteiro)
- [masterkoppa](https://github.com/masterkoppa/)
- [mijofa](https://github.com/mijofa/)
- [MrTimscampi](https://github.com/MrTimscampi/)
- [Nazar78](https://github.com/Nazar78/)
- [neilsb](https://github.com/neilsb/)
- [Nickbert7](https://github.com/Nickbert7/)
- [nielsvanvelzen](https://github.com/nielsvanvelzen/)
- [nyanmisaka](https://github.com/nyanmisaka/)
- [OancaAndrei](https://github.com/OancaAndrei/)
- [oddstr13](https://github.com/oddstr13)
- [ox0spy](https://github.com/ox0spy/)
- [Polpetta](https://github.com/Polpetta/)
- [PrplHaz4](https://github.com/PrplHaz4/)
- [puschie286](https://github.com/puschie286/)
- [pusta](https://github.com/pusta/)
- [randrey](https://github.com/randrey/)
- [redSpoutnik](https://github.com/redSpoutnik/)
- [rexbron](https://github.com/rexbron/)
- [rigtorp](https://github.com/rigtorp/)
- [rotvel](https://github.com/rotvel/)
- [samuel9554](https://github.com/samuel9554/)
- [sarab97](https://github.com/sarab97/)
- [Shawmon](https://github.com/Shawmon/)
- [shayaantx](https://github.com/shayaantx/)
- [sparky8251](https://github.com/sparky8251/)
- [Stampede10343](https://github.com/Stampede10343/)
- [telans](https://github.com/telans/)
- [ThibaultNocchi](https://github.com/ThibaultNocchi/)
- [thornbill](https://github.com/thornbill/)
- [twinkybot](https://github.com/twinkybot/)
- [Ullmie02](https://github.com/Ullmie02/)
- [viaregio](https://github.com/viaregio/)
- [villagra](https://github.com/villagra/)
- [whooo](https://github.com/whooo/)
- [xumix](https://github.com/xumix/)
- [YouKnowBlom](https://github.com/YouKnowBlom/)
- [ZadenRB](https://github.com/ZadenRB/)
