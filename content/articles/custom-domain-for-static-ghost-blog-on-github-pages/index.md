---
title: Custom Domain for Static Ghost Blog on GitHub Pages
description: Run a self hosted Ghost blog on GitHub Pages with a custom domain
date: 2021-12-04
tags:
  - ghost
stack:
  - ghost
  - docker
  - github_pages
  - github_actions
---

In this post I will share how I run this static Ghost blog for free using GitHub Pages and a custom domain. This is a continuation from my previous post about starting a static Ghost blog on GitHub Pages.

## GitHub Workflow

The only change needed for the GitHub Workflow file is to generate the static ghost site using the **--url** parameter pointing to your custom domain.

```yaml
- name: Generate Static Site
  run: gssg --url https://www.jameslawler.com
```

## GitHub Pages Settings

On the GitHub Pages settings page you need to specify your custom domain, for example **www.jameslawler.com**

{% image "./github-pages-custom-domain.png", "Custom domain configuration example" %}

## Domain DNS Settings

The final step is to configure your domain name registry to point your domain name to GitHub Pages IP addresses. Depending on the domain registry they will have different interfaces to change the settings.

```yaml
        A record for @ pointing to 185.199.108.153
        A record for @ pointing to 185.199.109.153
        A record for @ pointing to 185.199.110.153
        A record for @ pointing to 185.199.111.153
        CNAME record for www pointing to your username.github.io (the username should be replaced with your actual GitHub account username):
```

A lot of registrars have pages showing how to setup GitHub Pages on your domain. For example with Namecheap, you can see the information here. [https://www.namecheap.com/support/knowledgebase/article.aspx/9645/2208/how-do-i-link-my-domain-to-github-pages/](https://www.namecheap.com/support/knowledgebase/article.aspx/9645/2208/how-do-i-link-my-domain-to-github-pages/)

## Summary

It can take some time (minutes to hours) for DNS records to update and for you to see your GitHub Page running on your custom domain. When it is up and running, check to make sure all the links work on your page, so you can confirm the **gssg** generation worked successfully.
