---
title: PiVSMP
pattern: pattern-boxes
date: 2021-08-01
stack:
  - python
  - raspberry_pi
---

PiVSMP is the short name of a python project I built called Pi Very Slow Movie Player. There already existed such a concept of using an e-ink display attached to a raspberry pi to display frames from a movie, but I wanted to create a simple to use tool similar to [PiVPN](https://www.pivpn.io/) to replicate the functionality.

Unfortunately my e-ink display cable snapped and so I am unable to use it anymore, but the code is still available.

## Code

The project's code is available on my GitHub in the [PiVSMP repository](https://github.com/jameslawler/pivsmp). Written in Python, the project is a command line interface that sits on top of the [waveshare](https://www.waveshare.com/epaper) driver, which powers the e-ink display.

## Installation

By following the PiVPN approach, the project is installable via a single bash command

```bash
bash <(curl -s https://raw.githubusercontent.com/jameslawler/pivsmp/main/install.sh)
```

## Usage

Run `pivsmp` to see all commands provided by the program.

Copy a movie to your `~/.pivsmp/movies` folder. The movie must be inside a folder with the name of the movie. You can use a SFTP program on your main machine to copy the movie to the Pi.

In your Pi console run `pivsmp configure`.

- Select your e-paper display
- Select the movie to display
- Choose a frame to start on
- Choose a delay seconds between frames

- Start the movie by running `pivsmp start`
- Verify the status using `pivsmp status`

## Architecture

Within the project repository, the `src` folder contains a cleanly organised set of python scripts to run the program.

The program uses a few 3rd party libraries to make the project work.

- [`questionary`](https://pypi.org/project/questionary/) is used to provide a clean command line interface with a question and answer flow
- [`ffmpeg`](https://pypi.org/project/ffmpeg-python/) is used to extract frames from the video file

{% image "./architecture.png", "PiVSMP architecture" %}

## Future

This project is in a functioning state and works with a variety of different waveshare drivers to support different e-ink screen sizes. As I no longer have access to a working e-ink display it is unlikely I will be adding further features to the project.
