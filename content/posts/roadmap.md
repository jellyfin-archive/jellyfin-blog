---
title: "The future of Jellyfin"
subtitle: "A look into what's to come"
author: "Julien Machiels"
githubusername: "MrTimscampi"
date: ""
justify: "center"
---

As we approach the end of a few big migrations, we thought it would be a good occasion to go over the next steps for Jellyfin, as well as answer some common questions.

<!--more-->

# Phase 1: A little catch-up

Since the beginning of the project, we have had a few clear goals that, while never listed out right, were well known of the contributors. Here they are:

* Reduce technical debt
* Reduce dependency vendoring
* Reduce custom implementations of parts of the code that can use standard or well-known libraries

Being primarily focused on cleaning up, the main goals were to make the source code we forked easier to maintain, less buggy and more inviting to new contributors.

When Jellyfin started, code was barely or badly documented, as well as unnecessarily complex. As such, it quickly became clear that any new feature or improvement we wanted to make would take far longer than needed, had the code been clean and well-designed.

Over a bit more than one and a half years have passed since then and, during the last few months, most of our long-term goals in what we will call "phase 1" have progressed at breakneck pace.

For the server, as of the time of writing, we have just finished [migrating the existing API to ASP.NET](https://github.com/jellyfin/jellyfin/issues/2872) and the move away from custom code on the database side is only 2 Pull Requests away from being finished. On the web client side, we are [in the final stages of removing RequireJS](https://github.com/jellyfin/jellyfin-web/issues/868).

# Phase 2: What is coming

Jellyfin will soon be entering what we call "phase 2". This is where the plans for the server and the web client start to diverge a bit.

## Server

Development of new features, as well as rewrites of existing ones, was heavily slowed down by the *heavy* use of bespoke re-implementation of standard libraries. From the code handling the database to talking with ffmpeg in order to get media transcoded, everything was either custom-made or taken from an existing library, but heavily modified.

This put a lot of burden on our C# contributors, who would have to spend a long time to learn the intricacies of Jellyfin's server code. This lead to new features or bug fixes taking much more time than needed.

For example, we recently had a feature request that piqued our interest: being able to navigate content by tags through the web client. A quick check through the code showed us that it would be about a half hour of work for our client contributors, but it would require days of work for the server team, due to needing to touch both the API and database code. What should have been a very minor feature was now potentially a week of work.

This is precisely why we have been so hesitant towards working on new features for much of phase one: every hour of developer time that is spent on features now, could be spent on making development down the line faster, thereby accelerating *future* feature development. As such, we have usually taken the path of investing into the future, instead of getting shiny things immediately.

Now that cleaning up the backbone of Jellyfin is easier to work with, Phase 2 will first focus on building up to a stable "Long Term Release". The main goals for the first part of this phase are as follow:

* Clean up the glue code between EF Core and ASP.NET
  This will make the API calls performed by different client faster, as well as making the code cleaner for our server developers
* Rewrite the media scanner
  Making scans take less time is important into providing a long term experience

This, along with more minor improvements, will lay the base for the next step. But more on that in a bit.

# Web Client

On the web client as well, much of the last year and a half has been spent on cleanup. Real development has only really picked up in the last few releases, mainly due to the source finally being in a good enough state to build upon.

However, it still suffers from a lot of drawback, among which:

* All the UI is custom-made
  The web client isn't using any UI framework currently, which means there is a lot of boilerplate code, and performance is far from optimal.
* The UI isn't suited for TVs and navigating with a remote
  The code currently responsible for handling navigation using a remote is far from perfect. It mainly tries to guess where the cursor should end up, but it doesn't have any hints and lacks a lot of options, making getting around frustrating and difficult
* A lot of parts of the client are derived from abandoned libraries that were forked and modified.
  An unfortunate side-effect of the way development was conducted before we forked is that a lot of the UI is built upon old libraries, which were copied and heavily modified over the years. We've managed to clear most of them out, but a few remain.

With phase 1 of the web client, we removed the biggest crutch to making the web client viable long-term: RequireJS.

RequireJS was very popular at a time, but has been eclipsed in the JavaScript ecosystem by other, better tools, for close to 8 years. It prevented us from using newer tooling like Webpack and Babel for a long time, as well as making code much harder to debug, since RequireJS likes to swallow errors instead of presenting them to developers.

With the web client now on the cusp of having completely removed RequireJS in favor of the standard EcmaScript 6 Modules, as well as a complete retooling of our build process with newer tools, we are now ready to start on the phase 2 of the web client: moving to a state-of-the-art UI framework.

A few months ago, we held an open discussion on Github with contributors in order to choose which major technology the web client of tomorrow would be based on. You can read the entire discussion and follow the decision process in [this Github issue](https://github.com/jellyfin/jellyfin-web/issues/889).

We ended up settling on Vue.js for a couple of reasons:

* It's fast
* It's easy to learn
* Its community is very active
* It has a great ecosystem

And, most of all, it's what the contributors settled on.

Phase 2 of the web client will, as such, be mostly spend rewriting the web client using Vue.js. But we're not making a brand new client: we are rewriting the current client, while keeping it usable.

The main reason for this is that most of the contributors aren't interested in a rewrite from scratch, as the React Native attempt proved in the past. With all its flaws and bad design decisions, the web client works, and it feels like a waste to abandon it for something that would have 1/10th of the features for a long time.

We're still getting ready for what that migration will look like exactly, but you can already expect further open discussions regarding which technologies we should use and how we proceed, as we get closer to starting that project.

# Phase 3: Jellyfin 11

As we are getting closer to the point where major changes make sense, we have started to think and talk about how to handle the major changes that will come with Jellyfin 11.

This is still a ways away, of course, so the following information is still subject to changes, but we have already a good idea of how the process will unfold.

Our first priority is to release a sort of "Long Term Release", in Jellyfin 10.8 or 10.9. The goal of this is to give user one last stable release with our major technical debts fixed and some improvements.

The reason for it is that we expect the development process of Jellyfin 11 to take a decent amount of time. As such, the current plan is to have this last stable version co-exist with what we call Jellyfin Next.

Jellyfin Next will receive a 10.9x.y version, but will contain a large amount of breaking changes. To prevent accidental updates, we expect to make these releases using a new package called `jellyfin-next`. These releases, happening every few months, have three objectives:

* Allowing us to spend some time on fixing bugs introduced by the major changes in progress
* Allowing users to test these breaking changes using a less unstable version of Jellyfin.
* Allowing our third party clients and tools to prepare for the change

There is, unfortunately, no timeline for when this will happen, but we expect 10.8 or 10.9 to be the last version of Jellyfin 10.

# Phase 4: To infinity and beyond

It's still very early to talk about what a post-Jellyfin 11 world will look like. However, there are some expectations that we can already share with you.

With the sources for both the server and the web client being a lot more modern and easy to work with, we expect development of nex features, both major and minor ones, to pick up considerably. If you remember that tab-based navigation I used as an example before, we expect that this kind of feature would take around half a day for someone to implement. Compared to the current week of work, it's a substantial improvement and, as such, we expect more contributors to appear and more features to see the light of day.

Along with that, a stable ABI for plugins will mean less maintenance efforts for plugin developers, hopefully leading to a larger ecosystem of third-party plugins to add features to Jellyfin.

And finally, with an easy to use and well documented API, we expect third party clients to flourish, meaning you should have more options to enjoy your media wherever you are.

# A few answers to common questions

We thought it would be a good idea to use this blog post to also address a few common questions that we see often in the community.

*TODO: Insert questions here*
