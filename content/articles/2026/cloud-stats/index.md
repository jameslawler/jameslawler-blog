---
title: Cloud Stats
description: A simple Cloudflare based hit counter tracker
date: 2026-03-11
tags:
  - cloudflare
  - d1
stack:
  - cloudflare
  - hono
---

I needed to replace my usage of 3rd party page tracking software and since all of my projects are running in Cloudflare I wanted to setup a very basic Cloudflare worker that uses a single table in a D1 database.

I created a reusable [Cloud Stats](https://github.com/jameslawler/cloudstats-app) project that uses a single table and can do atomic updates to avoid losing visit counts. I wrote up a [project page](https://www.jameslawler.com/projects/cloud-stats/) for it with architecture information and explanations.
