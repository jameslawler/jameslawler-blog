---
title: Private Repository to Build and Deploy Ghost Blog
description: How to setup a private and public repository system for hosting a static Ghost blog on GitHub Pages.
date: 2021-12-17
tags:
  - ghost
stack:
  - ghost
  - docker
  - github_pages
  - github_actions
---

This is a follow up from a previous post about setting up a Ghost Blog on GitHub pages using GitHub Actions. In that post I described using a public GitHub repository to host both the Ghost content folder and the generated static website. In this post I will show how to keep the Ghost content folder in a private repository and only host the generated static website in a public repository.

## What you need

- A public repository in GitHub that will hold the generated static website
- A private repository in GitHub that will hold your content folder and GitHub workflow

## Public Repository

Simply create a new repository in GitHub. You don't need to commit or push anything to it. This will happen automatically. The only thing you need to do is go to the repository settings and enable GitHub Pages on the **gh-pages** branch.

## Private Repository

Create a private repository in GitHub and setup your Ghost blog by following the guide from my previous post. The different is in the GitHub workflow file. Here you need to configure the **Deploy to GitHub Pages** step to deploy to a different repository within your account.

```yaml
- name: Deploy to GitHub Pages
  uses: JamesIves/github-pages-deploy-action@4.1.7
  with:
  branch: gh-pages
  folder: static
  token: ${{ secrets.repository_token }}
  repository-name: jameslawler/jameslawler-website
```

By default, your GitHub workflow won't have permission to manipulate another repository. In order to do this, you need to [create a Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). The token should have at least the **public_repo** permission.

Once you have the token you need to make it available to your GitHub workflow. Since this repository is private, you could just put it straight in the source code. But for better security practices, I would use a **secret** which can be [configured at the repository](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) and then is passed to the [GitHub workflow inside a secret context](https://docs.github.com/en/actions/security-guides/encrypted-secrets#using-encrypted-secrets-in-a-workflow).

## Testing it out

Once you have the public and private repositories setup, and you have the GitHub workflow modifications to connect the two repositories together, it is time to test it out. Trigger the GitHub workflow on the private repository. This will build the Ghost static site, and then push it to the **gh-pages** branch of the public repository. Within a few minutes, the blog will be available on your GitHub pages url.

## Summary

I set this up with a two repository approach myself because I wanted to keep the Ghost content folder and database secret. The content folder contains upcoming posts, theme code, and also anyone can connect to the database file directly and look inside the tables. This way, the only public potion is the generated static files which the user will be able to see anyway when browsing the blog.
