---
title: Cloudflare Developer Platform experiences
description: My experiences using cloudflare developer platform
date: 2025-06-20
tags:
  - meals
  - cloudflare
stack:
  - react
  - tailwindcss
  - typescript
  - cloudflare
---

I recently published a new project called [Meal Planner](https:meals.jameslawler.com/). I did a [write up](/projects/meal-planner/) of the project and how I published it into the Cloudflare Developer Platform.

Overall I had a very positive experience because of the way Cloudflare integrates with GitHub. Rather than needed to setup GitHub actions to build and deploy the project, this is all handled on the Cloudflare side. I connected the project into Cloudflare by giving access to that specific respository. On any pushes to the `main` or other branches it triggers a build process and can even handle versioned environments if I want to keep `main` only for production, and `feature` branches for internal usage.

Each project could be connected to a different domain / sub domain and from the Cloudflare platform I have a nice overview of each project. This was much more difficuly before when I was running everything in a VPS under a docker host. Now I can have a quick overview of all logs, metrics, request durations, etc with minimal maintenance from my side. I can just focus on the project ideas and less on the infrastructure management.

Compared to other cloud providers, with Cloudflare, I did not need to provide any payment details as long as I stay within their free tier limits. For small hobby projects like mine, this is not a problem, and even with a small user base I still don't think I would reach their limits.
