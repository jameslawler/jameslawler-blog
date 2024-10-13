---
title: Scheduled Posts with Ghost and GitHub Actions
description: Automatically publish schedule post to a static Ghost blog instance running on GitHub Pages.
date: 2021-12-11
tags:
  - ghost
stack:
  - ghost
  - docker
  - github_pages
  - github_actions
---

Sometimes I want posts in my Ghost blog to only publish in the future on a set date. Ghost has the feature built in, but it is intended to be used with a dynamic Ghost blog that will instantly show the new post when the scheduled date is reached. As I run a static Ghost blog, I wanted to be able to have the same possibilities. To see how I setup a static Ghost blog on GitHub Pages you can see [my other posts](/tags/ghost/) on the topic.

## Scheduled Posts

In the Ghost editor when you save an article you have the option to **Set it live now** or **_Schedule it for later_**. When you want to publish later, you can choose the date and time of the scheduled post.

{% image "./ghost-publish-options.png", "Ghost publish options" %}

In order for the post to go live at the specified date and time, the Ghost server needs to be running. In order to achieve this, I have setup GitHub Actions to run automatically once a day on a fixed schedule. The workflow is the same as the previous posts with the addition of a [cron](https://crontab.guru/) schedule to the trigger section.

```yaml
on:
  push:
    branches: [main]
  schedule:
    - cron: "0 20 * * *"
```

This workflow will trigger on a push to the **main** branch, or everyday at 8pm UTC time. It is important to note that the cron schedule uses UTC time and so you will need to adjust it if you want it to match your local time. To have more granular post times, you would need to increase the frequency of the cron schedule.

## Perfect Streak

The only "negative" with this approach is that it automatically makes daily commits to one of your repositories and it makes your GitHub contributions graph look not so honest.

{% image "./github-streak-graph.png", "GitHub streak graph" %}

You can see that from December onwards is when I enabled the daily GitHub Action to build and deploy my static Ghost blog. But apart from that, the solution is simple and works.

## Summary

Using GitHub Actions with a cron schedule allows scheduled Ghost posts to go live within an acceptable timeframe of the publish date. I would say this is fine for a personal blog with infrequent posts. In the future I want to find a way to not publish to GitHub Pages if there were no updates. Perhaps checking if any new urls have been generated since the last time.
