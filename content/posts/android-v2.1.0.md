---
title: 'Android v2.1.0 - Jellyfin in your car!'
subtitle: 'Listen to your music while driving with the new Android update'
author: 'Niels van Velzen'
githubusername: 'nielsvanvelzen'
date: 2020-10-25T00:00:00-00:00
justify: 'center'
---

Jellyfin for Android version 2.1 is here with support for Android Auto.

<!--more-->

A new version of the Android app: version 2.1 has just been released! This update contains some quality of life improvements, some bugfixes and new features.
It's been only a few weeks since 2.0 but we couldn't wait to bring these new exiting changes to you. Let's start with the most awesome feature.

## Android Auto

Starting with this update we now support playing music in cars. This change was contributed by [@Spacetech](https://github.com/Spacetech) and we are excited to release it. Right now it supports browsing your music library in multiple categories: latest, albums, artists, songs and genres. It allows shuffling your albums and shows thumbnails when available.

<video controls loop autoplay muted playsinline class="inline justify" height="500">
	<source src="/images/posts/android-2-1-0/android-auto.webm" type="video/webm" />
</video>

___Note:__ since we do not have offline-support at this moment all music playback needs an active network connection to work. Be aware this may impact your mobile internet bundle._

## Connectivity issues

Some users reported issues when connecting to their server. We've made some improvements to hopefully fix these problems. When your server uses an outdated version a warning is shown. If the webui fails to load we now show a proper error allowing you to change the server address. Users with self-signed certificates should be able to use the app again now. And lastly, when your device name uses special characters they are now removed to fix the "endless loading" issue.

## Playback improvements

The native video player (ExoPlayer) now supports zooming using gestures so you can remove the black bars from the video. We made some changes to which video and audio codecs are supported to prevent unnecessary transcoding. We also made some big changes to the structure of the app to fix an issue where Picture-in-Picture windows were unable to open the app when going back.

There is a new option in the settings to select which external player to use. The listed players should also report playback status back to Jellyfin to track what you watch and allow the app to resume playback. Issues with subtitles (especially external subtitles) should now be less common.

## F-Droid

We have added the required metadata for F-Droid to our repository. We are currently working with the F-Droid team to get the app in their repository. We will make an announcement when this is ready.

## Contributors

We are grateful to all contributors this release:

- [@Maxr1998](https://github.com/Maxr1998) - [Sponsor](https://github.com/sponsors/Maxr1998)
- [@nielsvanvelzen](https://github.com/nielsvanvelzen) - [Sponsor](https://github.com/sponsors/nielsvanvelzen)
- [@vitorsemeano](https://github.com/vitorsemeano)
- [@ferferga](https://github.com/ferferga) - [Sponsor](https://github.com/sponsors/ferferga)
- [@CarlosOlivo](https://github.com/CarlosOlivo)
- [@Spacetech](https://github.com/Spacetech)
- [@h1dden-da3m0n](https://github.com/h1dden-da3m0n)
- [@IzzySoft](https://github.com/IzzySoft)
