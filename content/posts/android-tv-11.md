+++
title = "New Android TV Release - v0.11.0"
subtitle = "Improved Video Playback That Goes up to 11"
author = "Niels van Velzen"
githubusername = "NielsvanVelzen"
date = "2020-02-04"
justify = "center"
+++

Thank you for using Jellyfin! This is a major update for the Android TV client.

<!--more-->

> ⚠️
  We have added crash reporting. Read the notes below for more information.


## Highlights
 - Upgraded ExoPlayer to version 2
   This means video playback should be a lot smoother now!
 - New home screen
   The newly made home screen now looks more or less the same as the webclient. It will display the sections you have chosen under your "Home" preferences.  
   *Note: changing sections is only available in the web version for now*
 - Integration with "Next Up" section on Android TV devices

## Crash Reporting

Providing logs on Android TV devices can be challenging for users as it requires Android developer tools. Issues can be challenging to replicate for developers and crash logs help a lot with this.

We don't want to force users to report their logs to a third-party and therefore we won't report anything by default. When a crash occured the app will show a dialog and ask to report the logs.

All crash reports are retained for 30 days and can only be reviewed by a small group of developers inside the Android TV team.

More information can be found in the [issue](https://github.com/jellyfin/jellyfin-androidtv/issues/193) about this change.

## Release Notes
Full release notes available on [GitHub](https://github.com/jellyfin/jellyfin-androidtv/releases/tag/v0.11.0).

## Download Now

<a class="NoLinkLook" href='https://play.google.com/store/apps/details?id=org.jellyfin.androidtv&utm_source=blog&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img width="153" alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/></a>

Amazon App Store link soon.

Direct downloads available from [our repo](https://repo.jellyfin.org/releases/client/androidtv/).
