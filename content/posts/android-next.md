---
title: 'Android Developers Rejoice'
subtitle: 'We have a brand new web wrapper for Android sans Cordova!'
author: 'dkanada'
githubusername: 'dkanada'
date: 2020-08-28T04:16:09-04:00
justify: 'center'
---

This will be a net benefit for users and developers alike!
Everyone will enjoy the native video player spearheaded by [Stampede10343](https://github.com/Stampede10343) and [vitorsemeano](https://github.com/vitorsemeano) over the course of several months.
[Maxr1998](https://github.com/Maxr1998) valiantly ported the Cordova portions to Kotlin (and a bit of Java) which means Android developers will feel right at home with the new codebase!

<!--more-->

### Migration

The new release will be a drop-in replacement for the deprecated Cordova client, meaning you can just update from GitHub or F-Droid as you would have previously.
Azure has also been updated so the releases will be automatically built, and Weblate now points to the new codebase.
Older versions will remain on [our repository](https://repo.jellyfin.org) for the time being but don't expect them to stay forever, so if you have some reason to stash the older APKs download them soon!
Anyone who happened to be using the alpha builds will need to reinstall since we decremented the build version for the official release.

> Please note that this client has a new set of translations, so if you speak more than one language head on over to Weblate to help out the new client!

### ExoPlayer

The key feature for this release is ExoPlayer, so we've reserved a whole section for news regarding the player and its functionality.
It's currently disabled by default since there may be small issues, but it works quite well in our experience.
The main feature missing at the moment is a bitrate limit, but it should get added eventually.

There will be a new section in the user settings for native clients from which you can enable ExoPlayer, among other options.
A toggle for the notification dismissal was also added for customization.
Of course, ExoPlayer support means better support for codecs during video playback as well!
H265 should be working without transcodes, and several other problematic codecs are now much less troublesome with the new update.

### Future

The goal is to use a mobile-first interface for ExoPlayer so we can focus more on desktop for the normal web player.
Things like double tap to seek, volume and brightness sliders, and larger controls are all things that would fit with that plan.
As usual, since this is a volunteer project we don't actually have set milestones, so if you want something done, the quickest method is to add it yourself!
Head over to Matrix or Freenode and get in touch with the Android developers if you'd like to talk about adding a new feature.
GitHub is also an excellent place to discuss long term changes for the new client now that native Java and Kotlin are available.
