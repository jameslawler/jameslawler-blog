---
title: Portuguese AI - Cloudflare / Hono / HTMX
description: Using Hono and HTMX on Cloudflare
date: 2025-12-26
tags:
  - cloudflare
  - portuguese-ai
stack:
  - cloudflare
  - hono
  - htmx
---

As part of the first steps in my plan for the Portuguese AI project, this post is about my experiences of setting up a simple Cloudflare workers project with Hono and HTMX.

The GitHub repository can be found here - [https://github.com/jameslawler/cf-hono-htmx](https://github.com/jameslawler/cf-hono-htmx)

A running version can be found here - [https://cf-hono-htmx.services-15b.workers.dev/](https://cf-hono-htmx.services-15b.workers.dev/)

## Setup

To setup a new project, I first created a new repository in GitHub and gave my Cloudflare integration access to the repository.

After cloning the empty project to my local machine I ran the following `wrangler` command to start a new project.

```shell
npm create cloudflare@latest -- .
```

Then I gave the following answers to the interactive questions

```shell
╭ Create an application with Cloudflare Step 1 of 3
│
├ In which directory do you want to create your application?
│ dir ./.
│
├ What would you like to start with?
│ category Framework Starter
│
├ Which development framework do you want to use?
│ framework Hono
│
├ Select your deployment platform
│ platform Workers with Assets

```

## Project Structure

In order to make a clear separation of the client side code and server side code, I created two top level folders `client` and `server`.

The `client` folder will contain `tsx` files that render pages and components for what will be shown in the browser when rendered to HTML.

The `server` folder will contain any logic that will execute in the Cloudflare Worker. In this example project it contains a simple routing structure of providing a `api` and `web` routes. The routes return either partial HTML or full pages.

## HTMX

As part of this new project I wanted to integrate HTMX to see how it differs from using a full SPA library like React. HTMX simplifies the project by removing the need to minify / bundle the project with tools like Vite.

In this example project, the `package.json` only has three dependecies.

```json
"dependencies": {
	"hono": "^4.11.2",
  "htmx.org": "^2.0.8"
},
"devDependencies": {
  "wrangler": "^4.54.0"
}`
```

Currently the `htmx.min.js` is copied manually from the `node_modules` folder into the `public` folder and then referenced in the top level HTML file.

## Next Steps

The next step in my new project is to add [better-auth](https://www.better-auth.com/) authentication so I can create features that are public and private. The authentication framework will use the Cloudflare D1 resource to store user and session information. At first I will keep it simple and just use email/password authentication without any kind of email verification. I will intentially disable new account sign up until the project is ready and use it for myself to protect AI features.
