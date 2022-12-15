---
title: "Vilebrequinator"
description: A simple website to search subtitles of Vilebrequin's YouTube channel
started: 22-08-2022
finished: 29-08-2022
projectLink: https://vilebrequin.julienc.me
layout: "../../layouts/Article.astro"
image: "header/vilebrequin.png"

---

###  What is it about ?

Months ago, I was remembering a phrase Sylvain (a member of the **Vilebrequin** team) said in a video. I wanted to find the video but I didn't remember the exact words. I thought it would be nice to have a website where you can search for subtitles of Vilebrequin's videos. So I made one.

### What did I learn ?

I learned how to use the **YouTube API** to get the subtitles of a video. I also learned how to use [MeiliSearch](https://www.meilisearch.com/) to index the subtitles and search for them.

### What did I use ?

Tools I used to make this project:

 - [Next.js](https://nextjs.org/)
 - [MeiliSearch](https://www.meilisearch.com/)
 - [Next UI](https://nextui.org/)

<br>

I created a Jupyter Notebook to get the subtitles of the videos. It then transforms the subtitles into a format that I can index with MeiliSearch. I then created a Next.js app to search for the subtitles using MeiliSearch API.

### View the result

See the result on [vilebrequin.julienc.me](https://vilebrequin.julienc.me)
