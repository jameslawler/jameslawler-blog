---
title: Language Wallpapers
pattern: pattern-rhombus
date: 2018-03-01
stack:
  - nodejs
---

Language Wallpapers is a simple Node.js project I built which could combine images and words to help me to learn new Portuguese vocabulary.

## How it works

The project used the following.

- [unsplash](https://unsplash.com/) for free high-quality images
- [jimp](https://www.npmjs.com/package/jimp) npm package for combining the original image with a transparent banner and with text on top

The proccess was quite simple.

1. Read a json file which lists a set of vocabulary and an unsplash image id
2. Loop the list
3. Download the unsplash image
4. Resize the image
5. Attach the transparent banner to the image and place the vocabulary text on top
6. Save the resultant image

The JSON data looked like this.

```json
{
  "places": [
    {
      "filename": "estádio",
      "english": "stadium",
      "unsplashId": "m6OWr3OP4do",
      "word": "o estádio / os estádios",
      "sentence": "Hoje há um jogo no estádio"
    },
    {
      "filename": "universidade",
      "english": "university",
      "unsplashId": "d6ebY-faOO0",
      "word": "a universidade / as universidades",
      "sentence": "Eu estudo informática na universidade"
    }
  ]
}
```

The output wallpapers looked like this.

{% image "./example-wallpaper.jpg", "Example wallpapers" %}

## Where to use the wallpapers

I would save the wallpapers into a folder and set up my Windows machine to automatically rotate the wallpapers every hour. I used this as a kind of subliminal learning method.
