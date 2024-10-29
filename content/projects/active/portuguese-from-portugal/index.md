---
title: Portuguese from Portugal
pattern: pattern-vertical-lines
date: 2018-05-01
stack:
  - ghost
  - github_pages
  - github_actions
---

[Portuguese from Portugal](https://www.portuguesefromportugal.com) is one of the first bigger projects that I feel was completed successfully and received positivie feedback and usage. The purpose of the web site was to provide a resource for Portuguese content that was using the European Portuguese language and not the Brazilian variant.

The website content has not been updated since 2020, but the old content is still available for learners of the langauge. I hope we can add more content in the future.

## Website

{% image "./portuguese-from-portugal.png", "Portuguese from Portugal article" %}

The website was originally created as a custom React website in a micro-service architecture. I built a customer facing part and an admin part. I also had services to provide content, a MongoDB database, a RSS feed service and so on. It worked quite well, but became a time consuming burden to maintain all the services and versions.

A few years after launching the original version, I converted the site to be a statically hosted [Ghost](https://www.ghost.org) website. The Ghost platform provided to me the customer facing and admin portions of the website. I could also replace all of the services and use some trickery in the Ghost setup to mimick the same functionality.

## Content

The hardest part of this project was coming up with content for the website. As this was just a side hobby, it was hard to keep finding resources. In the end we settled on using Wikipedia articles and converting them into content with audio, grammar highlights, questions, and a podcast.

## Postcast

In addition to the website, we also provided a discussion based podcast where we discussed the content and explored the grammar and vocabulary in more detail. As part of this process, I learnt how to use [Audacity](https://www.audacityteam.org/) to build a podcast audio file and clean up the audio quality.
