---
layout: layouts/home.njk
eleventyNavigation:
  key: Home
  order: 1
numberOfLatestPostsToShow: 3
---

## 👋 About Me

My name is James Lawler and I am a full stack software developer. I currently focus on the JavaScript tech stack and micro service architecture. This is my personal website which I use to keep track of things I have done over time and write down my [notes](https://notes.jameslawler.com) on various topics. It is easy to lose track of what you have learnt and accomplished, and this site will be a record of my time as a developer.

## 🖊️ Recent articles

{% set postslist = collections.articles | head(-1 * numberOfLatestPostsToShow) %}

<ul reversed>
{% for post in postslist | reverse %}
	<li>
		<a href="{{ post.url }}">{{ post.data.title }}</a>
		<time datetime="{{ post.date | htmlDateString }}">{{ post.date | readableDate("LLLL yyyy") }}</time>
	</li>
{% endfor %}
</ul>

## ⛏️ Things I've Done

### September 2024

- Converted my domain [jameslawler.com](https://www.jameslawler.com) from a self hosted Ghost instance to an 11ty static web site using TailwindCSS.

### August 2024

- [Published](https://www.amazon.es/dp/B0DBG56SL9) my first physical book as a collaboration with my wife. The book is a 200 page book to help students of the Portuguese language practice the most common verbs.
