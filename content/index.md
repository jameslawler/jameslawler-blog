---
layout: layouts/home.njk
eleventyNavigation:
  key: Home
  order: 1
numberOfLatestPostsToShow: 3
---

## 👋 About Me

<div class="flex flex-col items-center md:hidden">
  <img src="/img/james-lawler.jpg" class="size-28 rounded-full" />
</div>

My name is James Lawler and I am a full stack software developer. I currently focus on the JavaScript tech stack and micro-service architecture. This is my personal website which I use to keep track of things I have done over time and write down my [notes](/notes) on various topics. It is easy to lose track of what you have learnt and accomplished, and this site will be a record of my time as a developer.

## 🖊️ Recent articles

{% set postslist = collections.articles | head(-1 * numberOfLatestPostsToShow) %}

<ul reversed>
{% for post in postslist | reverse %}
	<li>
		<a href="{{ post.url }}">{{ post.data.title }}</a>
	</li>
{% endfor %}
</ul>

See [all articles](/articles/).

## ⛏️ Things I've Done

### September 2024

- Converted my domain [jameslawler.com](https://www.jameslawler.com) from a self hosted Ghost instance to an 11ty static web site using TailwindCSS.

### August 2024

- [Published](https://www.amazon.es/dp/B0DBG56SL9) my first physical book as a collaboration with my wife. The book is a 200 page book to help students of the Portuguese language practice the most common verbs.

### March 2022

- Created a Raspberry Pi based infrastructure project to keep a redundant offline backup of my Internet "life".

### May 2018

- Launched [Portuguese from Portugal](https://portuguesefromportugal.com/) website and podcast. A website with listening and reading material for students of the Portuguese language.

### September 2014

- Senior Developer and team lead for large Germany IT company.

### January 2012

- IT consultant in London.

### April 2011

- 6-month solo adventure from overland using only buses, trains, and cars to travel half way around the world.

### April 2010

- Bought my personal domain jameslawler.com

### August 2007

- Published [Screenlets](https://en.wikipedia.org/wiki/Screenlets) widget called WhatsOnTV which could parse [XMLTV](https://wiki.xmltv.org/index.php/Main_Page) format and render a simple TV Guide. I found a [website](https://store.kde.org/p/1005975) from kde where someone saved the widget. It has a nice simple screenshot which shows how it looked.

### 2006

- Graduated university with a Bachelor degree in Information Technology.

### 2004

- Started my first professional IT job working in VB.Net on web applications for a federal government office.

### 2003

- Received a [DVB-T tuner card](https://en.wikipedia.org/wiki/DVB-T) for my computer and spent a lot of time learning and writing code for Microsoft DirectX to be able to receive the DVB-T data, analyse it, and place timestamp markers at the TV commercials.

### 2001

- Built my first [PC](https://en.wikipedia.org/wiki/Pentium) after saving money earned from an after school job.

### 2000

- Started to learn to write VB6 and Java code.
- Created a small program that could recursively crawl a website to look for dead links.

### 1998

- First steps into creating projects on the Internet by learning HTML / CSS / [CGI](https://en.wikipedia.org/wiki/Common_Gateway_Interface)
- Published my first 90s styled website on [Angelfire.com](https://www.angelfire.lycos.com/). I've searched for it on [archive.org](https://archive.org/) but have never been able to find it again.
