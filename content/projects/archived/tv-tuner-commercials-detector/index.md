---
title: TV Tuner Commercials Detector
pattern: pattern-cross
date: 2004-10-01
---

One of the first big projects I created for fun was to learn how to write C++ code to use DirectX to read data from a DVB-T tuner card.

It is quite hard for me to remember most of the project details, but I try below to keep a record of the project.

## Idea

The project idea was to be able to record live TV streams from my DVB-T card, analyse the stream and try to predict where the TV commercials are.

## Record stream

The DirectX tool back in 2004 provided a GUI to be able to create a pipeline of filters from teh TV input to pass it through various filters.

{% image "./directx-filter.png", "DirectX Filter" %}

## Commercial detection

To try and detect commericals, I used various analysis techniques like.

- Check the amount of dark pixels as a percentage to try and detect the fading in and out of the video as the screen goes dark between the TV show and commercials.
- Detect when the sound goes quiet at the same time as the screen goes dark.
- Mark all of the locations with quiet sound and dark video and use analysis to detect the most likely commercial positions. For example, each commercial is usually 30 seconds long and a total commercial break was about 2.5 - 3 minutes.

## Results

I enjoyed building this project and learning C++, DirectX, video pixel anaylsis. I used the project personally for a while, but over time with streaming services like Netflix, the project became obsolete.
