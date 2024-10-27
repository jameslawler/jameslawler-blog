---
title: Why I rewrote my blog into 11ty
description: Information about rewriting my blog from Ghost to 11ty
date: 2024-10-09
tags:
  - ghost
stack:
  - 11ty
  - tailwindcss
  - github_pages
  - github_actions
---

The website running at jameslawler.com has changed many times over the years. Most recently I was using Ghost as platform for managing my blog posts and using GitHub as the website host. I wrote a few [blog posts](/tags/ghost) about the process.

The Ghost platform was a nice simple web interface to work with and it could run completely in Docker, so it didn't need to mess up my host machine. However over time it became more of a burden for my simple website.

## Disadvantages

As I was running Ghost locally in a Docker container, I encountered the following issues;

- I frequently had problems logging in and had to remotely connect into the MySQL instance of Ghost within the Docker image to fix the credentials.
- I felt like I couldn't do much cutomization to the content of the pages / posts.
- I prefer the clean structure of a Markdown text file over a proprietry format provided by Ghost.

## What I wanted

For a while It was perfectly fine using Ghost, but as the issues above because more frequent I found myself reluctant to want to make updates to my website. What I really wanted was something that could do the following;

- Be a static website that I can host in many places for free without server maintenance
- Work with Markdown files
- Work with Frontmatter format in markdown files so I can have simple template data defined and render it to the page
- Support templating
- Work with [TailwindCSS](https://tailwindcss.com/) for design implementation

## What I changed to

In the past I have used [11ty](https://www.11ty.dev/) and found it to be a good solution to all of those issues above, and so I decided to switch my blog over to a simple 11ty blog structure.

By defualt 11ty provides everything on the list, except for TailwindCSS support.

## Adding TailwindCSS

To add TailwindCSS support, I followed a [simple guide](https://dev.to/psypher1/lets-learn-11ty-part-7-adding-tailwind-5cdh) I found and then completely stripped out any existing css files from the 11ty project to be sure everything was TailwindCSS driven for the front end design.

## Conclusion

At the moment I am really happy with the [outcome](https://github.com/jameslawler/jameslawler-blog). I have a very simple repository in GitHub that stores all of my content in markdown files. I only needed to create a few simple templates for generating the HTML files.

Any time I make an update to the repostiory, it automatically builds in GitHub Actions and publishes the updates to the GitHub Pages.

Overall the maintenance is light-weight and my content is fully portable if I want to move to another system in the future.
