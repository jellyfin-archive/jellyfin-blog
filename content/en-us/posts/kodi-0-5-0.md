+++
title = "Jellyfin for Kodi Release - v0.5.0"
subtitle = "Gotta Go Fast"
author = "Matt Carlton"
githubusername = "mcarlton00"
date = "2020-03-04"
justify = "center"
+++

Announcing Kodi 19 support, Python 3, and more!

<!--more-->

> Please make sure you are either upgrading from version 0.4.1, or restart Kodi after upgrading to 0.5.0.  There are some incompatibilities with new libraries that can't be resolved at runtime and require either the previous version or a restart to initialize properly.

## Highlights

 - Kodi 19 support
 - Significantly faster sync speed
 - Less noisy logs

## Overview

Kodi 19 (code named 'Matrix') is right around the corner and we're ready for its arrival.  Matrix is currently in a pre-release state and alpha releases are available in Team Kodi's [nightly download repo](https://mirrors.kodi.tv/nightlies/).  This is a big release in that Matrix introduces Python 3 support into the Kodi addon ecosystem.

Other exciting news is that we have some significant speed increases within the addon, particularly surrounding the initial library sync.  In some cases we're seeing sync times well below half of their previous values.  This is largely due to new contributor [druscoe](https://github.com/druscoe), so there's some well deserved shout outs there.

## Release Notes

Full release notes available on [GitHub](https://github.com/jellyfin/jellyfin-kodi/releases/tag/v0.5.0).

## Download Now

If you have the Jellyfin for Kodi addon repository installed and updates enabled, this version will automatically be installed for you.

If you have installed the addon manually, the new zip file is available [here](https://repo.jellyfin.org/releases/client/kodi/plugin.video.jellyfin/plugin.video.jellyfin-0.5.0.zip).
