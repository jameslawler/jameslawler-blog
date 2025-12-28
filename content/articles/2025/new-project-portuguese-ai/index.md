---
title: Portuguese AI
description: Planning a new project idea for assisting my learning of the Portuguese language
date: 2025-12-24
tags:
  - cloudflare
  - ai
  - portuguese-ai
stack:
  - cloudflare
---

I want to build a new project as an opportunity to learn some new technologies, solve some interesting problems, as hopefully end up with a product that will help me improve my Portuguese.

## Project

My goal is to build a web application that provides a similar learning experience to [roadmap.sh](https://roadmap.sh/) but for the Portuguese language. Users will be able to see a high level view of the language learning process for the various levels (A1, A2, etc) and open more specific information and links for each topic.

Rather than focusing on providing links to resources, the content provided on the site will guide the user through that unit.

## Technology

* Cloudflare Workers - server side APIs
* Cloudflare D1 - server side database
* Hono - server side framework
* better-auth - authentication framework
* HTMX - client side code
* Cloudflare AI - LLM resources

The tools Hono, better-auth, and HTMX are new to me and will have a learning curve to integrate them.

The technology list above is not fixed, and if any of them become too complicated to integrate, I may switch to a different set of technologies.

## Plan

I will work through this project in various stages to tackle each problem one at a time. Below is an initial list of the topics that will need to be solved.

1. Create the initial project and connect it to Cloudflare with a D1 database.
2. Create a simple home page in HTMX.
3. Add authentication (email/password) with a signup and login page.
4. Add a basic node map for the first few steps of learning Portuguese.
5. Add a overlay when a node is clicked and load the data in HTMX from the server side.
6. Add AI integrations to the learning overlay.
7. Create a first full node map with content.

## Costs

The project will run in Cloudflare which provides a decent free tier for workers, D1 database, and AI. If I am the only one using this project, then I imagine the costs will fall within the free tier. If I see a potential for opening up the project to the public in the future, I would need to determine some pricing to make sure it covers the overhead costs of Cloudflare.

## AI

Cloudflare provides many open source models, including the GPT open source models for text generation. I would like to make use of those AI models and once a simple text chat is working, I will experiment with the speech to text, and text to speech models. My end goal would be to see if it is possible to have a "professor" experience interacting with the content on the web page, so I can just talk to my browser and have it talk back.
