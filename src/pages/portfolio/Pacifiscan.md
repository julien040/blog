---
title: Pacifiscan
description: Help caledonians to recycle their waste thanks to a native mobile app and machine learning. 
started: 10-04-2021
projectLink: https://pacifiscan.org
layout: "../../layouts/article.astro"
image: "header/Pacifiscan.png"
project_url: https://pacifiscan.org

---

Pacifiscan is an app created to help New Caledonians sort their waste. The project is structured as a French non-profit (Association Loi 1901, 501c equivalent). Currently, we have raised more than $5000 in grants.
## How does it work ?
We wanted the app to be as intuitive as possible, so it is very simple. The user takes a picture of their waste, and the app uses Machine Learning to detect what type of waste it is and returns the nearest places to dispose of it.
## The technical stack
### Mobile app
Pacifiscan has **two native mobile apps** : iOS and Android. But because we didn’t had the ressources to work on two apps at the same time, I chose using React Native and Expo.
All the design and coding were done by me. You can download the app here:
[http://go.pacifiscan.org/app](http://go.pacifiscan.org/app)

![](/images/articles/pacifiscan/apps.png)
### Image classification
To classify the image, we used [CLIP](https://openai.com/research/clip) from OpenAI. Having a zero-shot classification system left us a lot of free time for other tasks.
The API uses Flask and connects the CLIP model to an HTTPS endpoint.
### Website
Pacifiscan is also available online [here](https://pacifiscan.org/). It’s a [NextJS](https://nextjs.org/) app.
![](/images/articles/pacifiscan/website.png)
### Design
All the design was done using [Figma](https://www.figma.com/)
## Grant collection
We received two grants totaling **550 000 XPF** ($5 025,11).
### Pew Bertarelli Ocean Legacy
The first grant of 250 000 XPF ($2 284,14) was given by Pew Bertarelli Ocean Legacy (a joint project of [The Pew Charitable trusts](https://en.wikipedia.org/wiki/The_Pew_Charitable_Trusts) and the [Bertarelli Foundation](https://en.wikipedia.org/wiki/Bertarelli_Foundation))
 We defended our project to a jury and we won the grant.
### Les nickels de l’initiative
The second grant of 300 000 XPF ($2 740,97) was given by Société Le Nickel, a subsidiary of [Eramet](https://en.wikipedia.org/wiki/Eramet).
## Links
- [Github](https://github.com/julien040/pacifiscan)
- [Website](https://pacifiscan.org/)

