---
title: Portuguese AI - Lessons Modal
description: Markdown lessons and resources
date: 2026-01-26
tags:
  - cloudflare
  - portuguese-ai
stack:
  - cloudflare
  - hono
  - htmx
  - alpinejs
  - markdown
---

Now that I have a node map builder and viewer in the project, the next step I wanted to add was the content that opens when clicking on a node. Initially, the modal content will contain;

- Lesson information
- Resources lists

I added a modal which has two tabs inside; resources and lesson information.

## Markdown Editor / Viewer

In order to show a dynamic and clean learning and resources page I chose to use markdown with a simple editor page to provide the markdown text, and then a markdown viewer using the [marked npm package](https://www.npmjs.com/package/marked) to render the markdown to HTML. All of this was done using Hono, D1 database, HTMX and TailwindCSS.

### Database Schema

I added two new tables to the database `lessons` and `resources`. Each is simply made up of a title and markdown text field. In the resources schema I added a links field which stores an array of links that will be rendered under the markdown text.

```js
export type ResourceItem = {
  group: "free" | "premium";
  name: string;
  url: string;
  type: "article" | "video";
};

export const resources = sqliteTable("resources", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  markdown: text("markdown").notNull(),
  links: text("links", { mode: "json" }).$type<ResourceItem[]>(),
  createdAt: integer("createdAt").notNull(),
  updatedAt: integer("updatedAt").notNull(),
});

export const lessons = sqliteTable("lessons", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  markdown: text("markdown").notNull(),
  createdAt: integer("createdAt").notNull(),
  updatedAt: integer("updatedAt").notNull(),
});
```

## Database Repositories

As part of this stage of the project I took the opportunity to clean up the code architecture and implement a repository pattern for the database logic. I moved all the database logic out of the REST api layer and moved it to repository functions. Each database table has its own repository file with business relevant functions, which are mostly following the CRUD structure of create, read, update, and delete.

Example from the lessons repository file.

```js
import { DrizzleClient } from "..";
import { eq } from "drizzle-orm";

import * as schema from "../schema";
import { Lesson } from "../../../types/lesson";

export const getLessons = async (db: DrizzleClient) =>
  db.select().from(schema.lessons).all();

export const getLesson = async (db: DrizzleClient, id: string) =>
  db.select().from(schema.lessons).where(eq(schema.lessons.id, id)).get();

export const createLesson = async (
  db: DrizzleClient,
  lesson: Omit<Lesson, "id">
) =>
  db
    .insert(schema.lessons)
    .values({
      id: crypto.randomUUID(),
      title: lesson.title,
      markdown: lesson.markdown,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
    .returning({ id: schema.lessons.id });

export const updateLesson = async (db: DrizzleClient, lesson: Lesson) =>
  db
    .update(schema.lessons)
    .set({
      title: lesson.title,
      markdown: lesson.markdown,
      updatedAt: Date.now(),
    })
    .where(eq(schema.lessons.id, lesson.id))
    .returning({ id: schema.lessons.id });
```

## Next Steps

I have been adding the functionality so far without a good UI plan and I want to tackle this topic later on once I have a feature complete first version.

Next I plan to add the first AI integrations using OpenAI APIs. The first integration will be as simple as possible - a chat window that is contextual based on the contents of the lesson / resource tab that is open.
