---
title: Meal Planner
pattern: pattern-rhombus
date: 2025-06-20
stack:
  - react
  - tailwindcss
  - typescript
  - cloudflare
---

The [Meal Planner](https://meals.jameslawler.com/) project is a side project I wanted to build for the purpose of reducing the weekly spend on food shopping.

{% image "./home.png", "Meal Planner" %}

## The Problem

I have a set of meals that are regularly cooked at home, but it was time consuming to remember exactly what I needed to buy each week to ensure I had enough food to cook all of the meals. For me, this lead to going to the supermarket multiple times a week and spending more money.

## My Solution

What I ended up building was a react web site where I could create a list of my regular meals and their ingredients, then each week I could place those meals onto a week plan and the web site generates a calculated shopping list. Each week I only need to update the meal plan for the week and it reclaculates the ingredients list.

I published the web site on my domain and if anyone has a similar problem to mine, they can also make use of it.

## Tech Stack

This was my first project built on top of the [Cloudflare Developer Platform](https://www.cloudflare.com/developer-platform/products/), and I used the `wrangler` command line tool to generate a Cloudflare Workers project that uses; [Vite](https://vite.dev/), [React](https://react.dev/), and [Hono](https://hono.dev/). I also added [Tailwindcss](https://tailwindcss.com/) for the styling and set it up to use TypeScript.

The front end is a standard react website with a simple react router for navigation and Tailwind for styling.

The back end is using Hono instead of Express to manage the api routes of the server side. This was my first time using Hono and it is very light weight, so it is hardly noticeable, which is a good thing. I added some GET, POST, and PUT routes and it was very simple and easy.

Behind the back end server code is a Cloudflare D1 database. This is essentially a SQL lite database running in the cloudflare cloud, with the advantage of being at the edge near to the client to reduce latency. It is also serverless so there is no software to manage or keep up to date.

{% image "./architecture.png", "Meal Planner - architecture" %}

## How it works

### Creating a new Plan

For a project like this, I didn't want any account registration or complexity which bring data privacy concerns. Instead I opted for a unique id approach. Anyone can create a free meal plan from the `Home` page. Clicking the button will generate a GUID on the server side and insert a new entry into the database. If the user wants to keep their meal plan, they keed to bookmark or save their unique link so they can open it again or share it with friends.

From the `Home` page they can also load an existing meal plan by providing the unique ID.

No names or emails are needed for using this tool. If you lose your unique link, you will need to dig through your browser history or just start again.

### Using a Plan

{% image "./meals.png", "Meal Planner - Meals tab" %}

Once a meal plan entry is in the database, a user can add their regular meals in the `Meals` tab. This generates a meals array which is persisted as a JSON string in the D1 database for your unique id. The ingredients list of a meal is open to type anything, but once you type an ingredient once, it is used as an autocomplete for future meals, to save you time typing and to avoid different spelling variations.

Once all of the regular meals are saved, the `Plan` tab can be used to add meals to different days of the week.

{% image "./plan.png", "Meal Planner - Plan tab" %}

Finally, once the plan is made the `Shopping List` tab will display a list of all of the aggregated ingredients. From the meals chosen in the week plan, a loop is done to aggregate all of the unit counts as long as the ingredient name is the same and the unit is the same. If the units are not the same then the ingredient it listed again for each variation of unit.

{% image "./shopping-list.png", "Meal Planner - Shopping List tab" %}

When the names and units match:
`potatoes 1kg + potatoes 2kg = potatoes 3kg`

When the names match but the units don't:
`potatoes 1kg + potatoes 4 pack = potatoes 1kg, potatoes 4 pack`

To keep track of purchases when doing the shopping, clicking / tapping on the ingredient on the `Shopping List` will cross it off.

## Costs

This project is running in the `Cloudlfare Worker` part of the platform and in the free tier it can have 100,000 requests per day, so around 3 million requests per month. Static pages are not included in these limits, so the react site itself is hosted for unlimited requests and only when a server side endpoint is called is it counted towards the request limit.

The project also uses a `Cloudflare D1 Database` which also has a large free tier of 5 million reads per day and 100,000 writes per day. The database can also hold up to 5GB for free.

In the case of a hobby project like this one, the limits are plenty without having to pay anything.

## Next Steps

Some improvement ideas:

- I would like to add better ingredient management with default standard ingredients and units.
- I would like to persist to the database when items are crossed off the `Shopping List`.
- I would like to have a history of the plan, so you can start a fresh week, and also look at previous weeks.
