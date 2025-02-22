---
title: How I created a daily game
description: Information about constructing a daily game
date: 2025-02-22
tags:
  - game
  - portuguese
stack:
  - nextjs
  - tailwindcss
  - github_pages
  - github_actions
---

To help me learn European Portuguese and the genders of the vocabulary I set myself a goal of creating some web-based games. The games would ideally follow a daily concept, in the style of Wordle. Each day the game will reset to a new set of words, and everyone playing the game would see the same set of words.

{% image "./game.png", "Daily Game" %}

## Project Structure

The [project](https://github.com/jameslawler/daily-pfp) is a standard NextJs website, built into static files and hosted on GitHub Pages. It is using ReactJs, TypeScript and TailwindCSS.

## Daily Game Alogirthm

The method of randomizing the game each day is through the use of a hash on today's date. The has is then fed into an algorithm which sorts the array of questions in a predictable order based on the hash.

```ts
const shuffleArray = (array: GameData[], seed: number): GameData[] => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  seed = seed || 1;

  const random = function () {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  while (0 !== currentIndex) {
    randomIndex = Math.floor(random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};
```

The date is fed into the above function as a number by using the `date.getTime()` function and the algorithm performs a `Math.sin()` call using the seed value provided. The array is then shuffled item by item using the index randomizer until all items have been moved.

The benefit of this algorithm is that as long as the length of the array stays the same, the array can be predictably sorted based on any date. This allows looking back in time to see the different games that were played without needing to store them.

In case additional words are added to the game in the future, this can still be maintained by creating separate arrays which are date based, and only dates after the date based array are concatenated together.

## Statistics Storage

The browser's local storage is used to store previous game information. Current two items are stored in the local storage;

1. `gender-game`: This key stores

- the date of last game
- the question index of the current question in the current game
- the game state of the current game

2. `gender-game-stats`: This key stores

- the overall top score
- past games array containing the date of the game and score achieved

By combining all of this information from the local storage, the statistics page within the game can display the player their;

- number of days played
- highest score
- longest streak of days played in a row
- a nice GitHub style heatmap of their score progression over time

{% image "./statistics.png", "Daily Game Statistics", [400] %}

## Project Future

I would like to keep the same game structure, but switch the content so I can train myself on other Portuguese grammar topics, like verb conjugations.
