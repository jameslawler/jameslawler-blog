---
title: Personal Notes
pattern: pattern-zigzag
date: 2024-09-01
stack:
  - docusaurus
  - github_pages
  - github_actions
---

The [Personal Notes](https:notes.jameslawler.com/) project is essentially a personal wiki where I can keep my collection of notes, ideas, and guides. I wanted a simply to manage set of markdown files and settled on using Docusauraus as it has many features built in by default.

## Docusaurus

[Docusaurus](https://docusaurus.io) is a project created by Meta as a platform to document software projects. The main benefits it provides are;

- source control maintained (no database)
- markdown based documentation
- automatic generation of structure based on folder source code structure

## How I set up the project

Follow the [installation and setup instructions](https://docusaurus.io/docs/installation) on the Docusaurus website to see the most up to date instructions.

Once the project is working locally, I made it build and deploy using GitHub Actions to GutHub Pages. See below for the sample GitHub Actions yaml file that will build an deploy the project.

```yaml
name: Build and Deploy
on:
  push:
    branches:
      - main
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: "pages"
  cancel-in-progress: false
jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Install and Build
        run: |
          npm ci
          npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v3
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: "build"
      - name: Deploy to GitHub Pages 🚀
        id: deployment
        uses: actions/deploy-pages@v2
```

## Content

I am using the personal notes project not just to store notes about software development, but also topics like leanguages that I am learning, day to day situations like dealing with bureaucratic processes in a foreign country.
