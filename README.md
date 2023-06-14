
### RankYourWaifu - ranking & chart website 
> website used for ranking character in anime created with React and vite.js

## Table of contents
*   [General info](#general-info)
*   [Technologies](#technologies)
*   [Setup](#setup)
*   [Features](#features)

## General info
> This project is using client-side rendering only (frond-end), no back end is required. 
> The website allows users to choose the character they like the most by selecting one of two options
> Ranking score and give result as table chart data displays to users.

## Technologies
Project is created with:
*   [React with Vite.js](https://vitejs.dev/) 
*   [Tailwindcss](https://tailwindcss.com/)
*   [NextUI](https://nextui.org/)   
*   [Framer motion](https://www.framer.com/motion/)

## Setup
To run this project, install it locally using yarn:
```
$ cd ../Rankyourwaifu
$ yarn install
$ yarn start
```

## Features
> This project is using Round Robin scheduling for scheduling two characters to be selected ahead for performance
> And ranking character with Tournament Algorithms by using schedules that are scheduled before
> If Ranking score have characters that have same score point, Website will add tie breaker round automatically
