---
title: Portuguese AI - Better Auth
description: Adding better-auth to the project
date: 2025-12-28
tags:
  - cloudflare
  - portuguese-ai
stack:
  - cloudflare
  - hono
  - htmx
  - better-auth
---

Better Auth is a typescript based framework for adding authentication to an application. As I will be using Cloudflare Workers to run this project with a D1 Database, I spent some time making `better-auth` work with this "unusual" configuration.

At first I followed this [guide](https://hono.dev/examples/better-auth-on-cloudflare) from the Hono website, but they don't use the Cloudflare D1 database, so I had to adapt that part.

If you checkout my [repository](https://github.com/jameslawler/portuguese-ai-app) at commit [6815d84](https://github.com/jameslawler/portuguese-ai-app/commit/6815d84fcbfc7d12cdcff78276154c4e7f9c7e62) it has the `better-auth` functioning with Cloudflare D1 and with a very basic frontend.

## Add new Dependencies

To make `better-auth` work in the project, I added the following packages.

- drizzle-orm
- better-auth
- drizzle-kit (devDependency only)

## Integration

These were the steps I followed to integrate the `better-auth` framework.

1. Create a Cloudflare D1 database for the project that will contain the `better-auth` tables.

```shell
wrangler d1 create <project-name>
```

2. Create a `drizzle.config.ts` file in the top level folder.

```ts
import type { Config } from "drizzle-kit";

export default {
  schema: "./server/db/better-auth-schema.ts",
  out: "./migrations",
  driver: "d1-http",
  dialect: "sqlite",
} satisfies Config;
```

The `schema` location tells drizzle where to find the schema file for the generation of the migration file.

3. Add `db` folder to server code to contain the better-auth schema and a index to load the database

To generate the `better-auth` schema, you need to use the following command.

```shell
npx @better-auth/cli generate
```

Unfortunately, because of the way the Cloudflare D1 database works, it is only accessible during a server side request. You can't call it directly and for the generation of the schema to work, it needs to be able to point to the `auth.ts` file that directly exposes a `better-auth` instance. I was able to work around this by pointing it directly to the sqllite file found in the `.wrangler` file. After generating this file, it can be copied between future projects as the schema is fairly static.

This is the code I added to `./server/db/better-auth-schema.ts`.

```ts
import { relations, sql } from "drizzle-orm";
import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .default(false)
    .notNull(),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = sqliteTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
    token: text("token").notNull().unique(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = sqliteTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: integer("access_token_expires_at", {
      mode: "timestamp_ms",
    }),
    refreshTokenExpiresAt: integer("refresh_token_expires_at", {
      mode: "timestamp_ms",
    }),
    scope: text("scope"),
    password: text("password"),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = sqliteTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));
```

Add `index.ts` file that can load a D1 database into a Drizzle instance.

```ts
import { drizzle as drizzleD1 } from "drizzle-orm/d1";
import * as schema from "./better-auth-schema";

export function getDb(db?: D1Database) {
    if (db) {
        return drizzleD1(db, { schema });
    }

    throw new Error("No database configuration found");
}

export type DrizzleClient = ReturnType<typeof getDb>;
```

4. Add the `./server/auth.ts` file on the server side. This file is used to create an instance of `better-auth` that can be used to sign up new users, sign in users, sign out users, and get current session information for users.

```ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import type { DrizzleClient } from "./db"

export function getAuth(db: DrizzleClient) {
    return betterAuth({
        database: drizzleAdapter(db, {
            provider: "sqlite",
        }),
        emailAndPassword: { 
            enabled: true, 
        }
    });
};

export type BetterAuth = ReturnType<typeof getAuth>;
export type AuthUser = BetterAuth["$Infer"]["Session"]["user"];
export type AuthSession = BetterAuth["$Infer"]["Session"]["session"];
```

In this example, only the `emailAndPassword` provider has been enabled, but it is possible here to enable other providers, like Google, GitHub, etc.

## Routes

With the steps above, the project now has a `better-auth` integration using a D1 database. Now I want to use it in my HTMX project.

The main architecture of this project is to maintain all state on the server side and the browser just uses HTMX to get full and partial pages from routes on the server side. With each call to the server, any authentication cookies are passed automatically, so the server side can determine the logged in state.

1. Add `/api/auth` routes.

The `better-auth` framework provides built in auth endpoints, but they expect JSON payloads in the request body. Due to the way HTMX works, by default data is sent as form data, which means that to use the default handlers the HTMX would need to be adapted to change the payloads before sending to the server. This requires extensions to be installed and more complex HTMX code. To minimise this I instead decided to handle it on the server side and keep the HTMX simple.

The sign up route was added using the code below, which receives the POST request, converts the body, and then calls the `better-auth` api directly.

Important to note is that with HTMX, you can influence how the page will respond with reponse headers. For example the sign up route responds with the `HX-Redirect` header, which tells the page to redirect to another url.

```ts
auth.post("/sign-up/email", async (c) => {
  const db = getDb(c.env.DB);
  const auth = getAuth(db);

  const formData = await c.req.formData();
  const body = Object.fromEntries(formData.entries()) as {
    name: string;
    email: string;
    password: string;
  };

  try {
    await auth.api.signUpEmail({ body });

    return c.body(null, 200, {
      "HX-Redirect": "/signin",
    });
  } catch (err: any) {
    return c.html(
      <AuthSignup
        errorMessage={err.message}
        defaultName={body.name}
        defaultEmail={body.email}
      />
    );
  }
});
```

## Middleware

In order to allow routes to get access to the logged in state and user data I create a middleware which is injected to every route.

```ts
app.use("*", authMiddleware());
```

`./server/middleware/auth.ts`

```ts
import type { Context, Next } from "hono";
import { getDb } from "../db";
import { getAuth } from "../auth";
import type { AuthUser, AuthSession } from "../auth";

export const authMiddleware = () => {
  return async (c: Context, next: Next) => {
    const db = getDb(c.env.DB);
    const auth = getAuth(db);

    // Get session from request headers
    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    if (!session) {
      c.set("user", null);
      c.set("session", null);
      await next();
      return;
    }

    // Set user/session on context
    c.set("user", session.user as AuthUser);
    c.set("session", session.session as AuthSession);

    await next();
  };
};
```

With this middleware, any route can access the `user` or `session` data with the following code.

```ts
const web = new Hono<{
  Bindings: CloudflareBindings;
  Variables: {
    user: AuthUser | null;
    session: AuthSession | null;
  };
}>();

web.get("/", async (c) => {
  const user = c.get("user");
  const session = c.get("session");

  return c.html(<HomePage userName={user?.name} />);
});
```

## Next Steps

For the next steps of this project, I will focus on adding a way to generate the roadmap for learning Portuguese. I will be trying to build a very simple SVG builder that builds up SVG nodes and exports the structure like node positions, to a json and the database.
