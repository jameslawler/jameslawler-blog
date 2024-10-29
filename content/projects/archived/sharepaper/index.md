---
title: SharePaper
pattern: pattern-dots
date: 2021-05-01
stack:
  - android
---

SharePaper was a project idea that I came up with while my wife was studying overseas and I wanted to create a way to be able to share what is going on day to day. Rather than just writing a message in something like WhatsApp, I wanted to create a way to have a more passive interaction.

## Idea

The idea was to create an Android application that two users could "connect" to each other. Once the users were connected, they could take a photo and share it to the other person. The other person's phone wallpaper would change automatically to the new photo. So during the day your phone wallpaper would randomly change to a nice photo from the other person.

## Abandoning the project

With a friend we developed a prototype of the idea, but eventually abandoned the idea once we became too concerned about handling private photos of users and the legalities and risk involved. In the end it was a fun project to work on and learn new skills in Java / Android development.

There was also the additional problem that iOS does not allow applications to programmatically change wallpapers on the phones. This meant that the application idea would only ever be able to work between two Android phones. While not terrible, it does severly limit the usre friendliness of the application.

## Architecture

Although the project was abandoned, we did achieve a functioning version.

The project used Java for the Android development and Firebase for the transferring of images from one phone to the other.

{% image "./architecture.png", "SharePaper architecture" %}

### Authentication

In order to minimise user overheads, no account creation was necessary in order to use the application. Instead when a user started the application for the first time, a random user id was created in Firebase and assigned to that user.

When the user wants to connect with another person, they could generate a token and a special link would be created which could then be shared via something like WhatsApp or any other messenger. When the recipient opened the link it would either ask them to install the application if they didn't already have it, or execute logic within the application if they already had it installed.

The logic would bind the two random user ids together in Firebase.

When the user would want to share a photo with the bound friend, they would simply take a photo / choose a photo and then click share. This feature would encrypt the photo and store it in the Firebase database with the read permissions set to only be readable by themselves, or their bound friend. A push notification would then be sent to the friend which would trigger their application to read the Firebase database and download the image / set it to the wallpaper.

## Future

It is unlikely this project will be continued in the future. At the time I never found any similar applications on the Play Store, but now there are quite a few [similar applications](https://play.google.com/store/apps/details?id=com.galew.widgetshare&hl=en&pli=1) in the Play Store, some with millions of downloads. Perhaps it was a lost opportunity, oh well.

Interesting to note is that the applications I found that now exist use widgets to share images to the home screen instead of changing the wallpaper. This idea would solve the issue of the iOS compatability.
