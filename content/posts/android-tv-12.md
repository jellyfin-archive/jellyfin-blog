---
title: Android TV v0.12
subtitle: Our biggest app update to date.
author: Niels van Velzen
githubusername: nielsvanvelzen
date: 2021-09-30
justify: center
---

<!-- markdownlint-disable MD033 MD036 -->

Today we're bringing the Android TV app to 2021 with a modern design and tons of other changes.

<!--more-->

Over 400 [^project] pull requests containing 2400+ commits, 750+ changed files with 54000+ changed lines of code by roughly 50 contributors[^git-diff]. This is the biggest update to the app we ever worked on. I'll talk a bit about why it is this big and why it took so long later in the post. But let's start with the part you probably came for: **new features!**

[^project]: [v0.12.0 project filtered by merged pull requests](https://github.com/jellyfin/jellyfin-androidtv/projects/2?card_filter_query=is%3Apr+is%3Amerged)
[^git-diff]: [Git comparison between v0.11.5 and v0.12.0-beta.7](https://github.com/jellyfin/jellyfin-androidtv/compare/v0.11.5...v0.12.0-beta.7)

## New authentication flow

We got a lot of complaints about our authentication flow. It wasn't obvious how to enable the auto-login option and managing multiple servers or users was not an easy task. We also didn't like this part of the app, and decided to completely revamp it! The rewritten sign-in screen looks more modern and is much easier to use. There is a new help section that links to our documentation to help new users get started with Jellyfin. The auto-discovery feature of the app now shows all servers instead of the first one, you can select one of those or manually enter your server address to connect. You can then proceed to add a user and start using the app. Users are automatically saved now with auto-login enabled by default.

<div class="juxtapose">
    <img data-label="0.11" src="/images/posts/androidtv-0-12-0/11-user-select.png" />
    <img data-label="0.12" src="/images/posts/androidtv-0-12-0/12-user-select.png" />
</div>

## Updated user interface design

After logging in you will be presented with a modern look and feel in our refreshed user interface. A new toolbar is added to the top-right corner of the screen to open the search page, settings or to switch to a different user. No need to scroll down to the bottom of the home screen anymore.
Beneath this new toolbar is your media, like it always was, but the cards got a new look with the debatable colored backgrounds removed.

<div class="juxtapose">
    <img data-label="0.11" src="/images/posts/androidtv-0-12-0/11-home.png" />
    <img data-label="0.12" src="/images/posts/androidtv-0-12-0/12-home.png" />
</div>

The settings screen got a refresh too. It allows you to more easily change settings. Some new settings got added to customize the app to your own taste.

<div class="juxtapose">
    <img data-label="0.11" src="/images/posts/androidtv-0-12-0/11-settings.png" />
    <img data-label="0.12" src="/images/posts/androidtv-0-12-0/12-settings.png" />
</div>

The user interface when browsing inside libraries got some slight changes too. We're hoping to completely revamp this part of the app at some point, but that didn't stop us from making it slightly better now.

<div class="juxtapose">
    <img data-label="0.11" src="/images/posts/androidtv-0-12-0/11-browse.png" />
    <img data-label="0.12" src="/images/posts/androidtv-0-12-0/12-browse.png" />
</div>

<div class="juxtapose">
    <img data-label="0.11" src="/images/posts/androidtv-0-12-0/11-details.png" />
    <img data-label="0.12" src="/images/posts/androidtv-0-12-0/12-details.png" />
</div>

### Themes

The web client supported theming since forever but the Android TV app did not. That changes today with the introduction of three themes: Muted Purple together with Dark (Default) and Classic Emerald are now available in the app to supports basic theming. We're planning to expand this feature in the future with more themes and more variety between them. _Maybe we should add a light theme?_

### New video player design

The video player was completely redesigned to remove a lot of clutter and make it easier to use. The new design is bigger so you can more easily see the information on a television.

<div class="juxtapose">
    <img data-label="0.11" src="/images/posts/androidtv-0-12-0/11-player.png" />
    <img data-label="0.12" src="/images/posts/androidtv-0-12-0/12-player.png" />
</div>

The new video player design is just the beginning. A project to rewrite the playback code behind it is already in the works. This rewrite should help with the crashes and unnecessary transcoding that happens sometimes. It will also give us the opportunity to add new features like SyncPlay. But this doesn't mean the current code isn't being worked on anymore! We did fix some issues with the current video player code. Notable are changes for Fire TV to direct play more often and a lot of crashes got fixed.

## Fixed that bug

Together with all the visible changes we've made tons of fixes to the code. We're now using [Kotlin] as our primary language to help us writing type-safe code, migrated completely to [AndroidX] for better device compatibility and made a brand new [SDK] that is slowly being integrated for a more secure and stable connetion with your server. All of these modernizations in the code allow us to more frequently release updates.

A complete list of all the fixed bugs can be found in our changelog linked below. It's a big list!

[kotlin]: https://kotlinlang.org
[androidx]: https://developer.android.com/jetpack/androidx/
[sdk]: https://github.com/jellyfin/jellyfin-sdk-kotlin

## Going forward

It took some time to get this release out. We didn't feel like the state of the app was good enough for a release for a while.
Fortunately we've worked hard to make sure we did feel confident and here we are! Starting from this release we're changing some things
to make sure the next release won't take this long. Our brand new SDK that is already used in our Android app and third party apps is one of the tools helping us with faster releases. By having a more type-safe base we can prevent tons of crashes, allowing us to focus on actual features and bugs.

We're already working on some new stuff like the earlier mentioned rewrite of the playback code. We're using feature flags for this so we can work on this code while still being able to publish new versions. Other changes that we're looking into are more improvements to the user interface, better Live TV, better music support and more bugfixes!

## Contributors

Like all releases, we couldn't do it without our contributors and your donations! Jellyfin is made entirely by volunteers that don't get paid for their work. A big shout-out to the following contributors that made this release possible:

**Jellyfin Team**

- [@nielsvanvelzen](https://github.com/nielsvanvelzen) - Donate via [GitHub sponsors](https://github.com/sponsors/nielsvanvelzen)
- [@thornbill](https://github.com/thornbill) - Donate via [GitHub sponsors](https://github.com/sponsors/thornbill)
- [@MrChip53](https://github.com/MrChip53)
- [@AndreasGB](https://github.com/AndreasGB)

**Other contributors**

- [@linetrimmer](https://github.com/linetrimmer)
- [@Froghut](https://github.com/Froghut)
- [@koying](https://github.com/koying)
- [@Florianisme](https://github.com/Florianisme)
- [@jassycliq](https://github.com/jassycliq)
- [@tukilo](https://github.com/tukilo)
- [@vnidens](https://github.com/vnidens)
- [@Vardex](https://github.com/Vardex)
- [@MrLemur](https://github.com/MrLemur)
- [@willtrking](https://github.com/willtrking)
- [@sachk](https://github.com/sachk)
- [@PalAditya](https://github.com/PalAditya)
- [@okan35](https://github.com/okan35)
- [@jemlule](https://github.com/jemlule)
- [@jsquyres](https://github.com/jsquyres)
- [@ferferga](https://github.com/ferferga)
- [@Aerion](https://github.com/Aerion)
- [@dhiaayachi](https://github.com/dhiaayachi)
- [@jakeapp](https://github.com/jakeapp)
- [@GodTamIt](https://github.com/GodTamIt)
- [@JannikHoelling](https://github.com/JannikHoelling)

## Changelog

Full changelog with all pull requests available on [GitHub](https://github.com/jellyfin/jellyfin-androidtv/releases/tag/v0.12.0).

## Download Now

<a class="NoLinkLook" href="https://play.google.com/store/apps/details?id=org.jellyfin.androidtv">
  <img width="153" alt='Jellyfin for Android TV on Google Play' src="/images/store-icons/google-play.png" />
</a>

<a class="NoLinkLook" href="https://www.amazon.com/gp/product/B07TX7Z725">
  <img width="153" alt="Jellyfin for Fire TV at Amazon App Store" src="/images/store-icons/amazon.png" />
</a>

Direct downloads are always available from [our repository](https://repo.jellyfin.org/releases/client/androidtv/).
You can also join our [beta program on Google Play](https://play.google.com/apps/testing/org.jellyfin.androidtv) to test new versions.
