---
title: WhatsOnTV Screenlet
pattern: pattern-vertical-lines
date: 2007-08-01
stack:
  - python
---

This WhatsOnTV screenlet that I built was a very old project that I happened to remember while searching Google and Archive.org for old projects of mine. Unfortunately a lof them were lost as at the time they were just me messing around and Git wasn't around to help me keep track of them.

First of all, what is a Screenlet. Back in 2007 or so, I was using Linux day to day and following the [Compiz](https://en.wikipedia.org/wiki/Compiz) scene to create really nice user interfaces. [Screenlets](https://en.wikipedia.org/wiki/Screenlets) were a way to add widgets to the desktop, kind of like how it is for mobile phones now.

## WhatsOnTV

I was building a lot of TV related projects back around this time as I had a TV Tuner card in my computer and enjoyed learning how to write code that could interact with it and get the raw data out of the DVB-T stream.

This Screenlet that I built was effectively a TV Guide widget that could display what is currently on TV and what is upcoming. This was back when we only had a few channels to watch and nothing was "on-demand".

## How it worked

The Screenlet was able to download on a schedule and parse [XMLTV](https://en.wikipedia.org/wiki/XMLTV) format XML files and display the data into a simple widget layout. It could also handle the logos of the TV channels and display them in line.

{% image "./screenlet.jpg", "WhatsOnTV Screenlet" %}

## Where is it now

I found the project hosted on [kde.org](https://store.kde.org/p/1005975)

I saved a copy of the source code to a [GitHub repository](https://github.com/jameslawler/whatsontv-screenlet).

The project is no longer active.
