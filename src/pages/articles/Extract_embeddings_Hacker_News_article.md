---
title: "Extracting embeddings from popular articles on Hacker News"
description: How have I extracted more than 100,000 embeddings of popular articles on Hacker News?
date: 11-06-2023
modified: 11-06-2023
layout: "../../layouts/article.astro"
image: "header/hn-embedding.png"
---

[Hacker News](https://news.ycombinator.com/) is one of my favourite communities. According to Apple’s screen time, I spend an average of 30 min per day on this website.
For the past weeks, I have been looking around the concept of embeddings. Even though I’m fairly new to it, I wanted to build a side project involving them.  
Here’s how I have extracted thousands of articles from Hacker News.

> Disclaimer: I have no background either in data science or professional software engineering, so if I make a mistake, please report it kindly in the comments.
> 
## What is an embedding?
An embedding is the representation of a real-word object (an image, an article, a word) into a vector of dimension n. By representing it mathematically, we can compare, group and classify these objects easily.

Let’s say we have 7 posts from [Hacker News](https://news.ycombinator.com/), and we are computing their embeddings using a fake model:
- [Banned C standard library functions in Git source code](https://news.ycombinator.com/item?id=20792938)
- [ Modern C++ for C Programmers++](https://news.ycombinator.com/item?id=19792066)
- [Startups in 13 Sentences](https://news.ycombinator.com/item?id=491196)
- [How to professionally say](https://news.ycombinator.com/item?id=31224996)
- [Cost of Health Care By Country, as Compared to Life Expectancy](https://news.ycombinator.com/item?id=1027785)
- [Stripe Is Now a $20B Company](https://news.ycombinator.com/item?id=18078640)
- [Snap commits $2B over 5 years for Google Cloud infrastructure](https://news.ycombinator.com/item?id=13556914)

Each post can be mapped to a vector (x, y). For example,« Stripe is Now a $20B Company » equals to (-10.5, -1.5).
![](/images/articles/hn-embedding/Illustration%201.png "Example of the embeddings of our posts")

### But what’s the point?
As we can see, related posts are next to each other. « Startups in 13 sentences » is closer to « How to professionally say » than to « Modern C++ for C Programmers ». Having related items grouped is very useful. We can do:
- Classification (To which group an item belongs?)
- Clustering (What are the main topics?)
- Recommendation (What are the most similar items of one)

![](/images/articles/hn-embedding/Illustration%202.png)
For instance, we can say that all vectors that are positive (in the top right end corner) are about programming. We have made a cluster of our embedding.
Furthermore, to get a recommendation system, we just have to get the closest item to « My new story ». In our example, the software could suggest the article « How to professionally say ».

> Note: While all examples have featured a vector of dimension 2, real-world vectors are more likely to have a dimension larger than 128.
### How do we compute them?
There are many models to do so:
- [Word2Vec](https://radimrehurek.com/gensim/models/word2vec.html)
- [Cohere](https://cohere.com/)
- [OpenAI](https://platform.openai.com/docs/guides/embeddings/what-are-embeddings)
You send a text, some black magic happens, and it gives you back a vector representing the text.
I have personally chosen [OpenAI](https://openai.com/) because I didn’t want the hassle of hosting the model by myself and [OpenAI](https://openai.com/) seemed to be cheaper than [Cohere](https://cohere.com/).

## How have I extracted +100 000 embedding?
I know I have over-engineered my solution. I could have made it much simpler and faster. Nevertheless, I have learned a lot during my journey, and I’m a student, so it’s no time wasted.

### How to get an article?
To start, we have to extract the text from the article. My first solution was to download the page, render it using a headless browser and extract the text. Yet, you still have many issues:
- How do you handle websites that prevent scraping? (CAPTCHAs)
- How do you extract text from raw HTML (there is no need to extract the navbar, any ads, etc.)
To tackle these concerns, I went to another path: Diffbot. It’s a service that provides many APIs, including article extracting. Thanks to their [Student program](https://www.diffbot.com/students/), I was able to register without any costs.
Now that I know how to extract the articles, I just have to compute the embeddings and save them somewhere.

### The whole architecture
![](/images/articles/hn-embedding/Illustration%203.png)
If you didn’t have a stroke, let me explain. I know all this schema could have been a simple Jupyter Notebook. But I wanted a system reliable, autonomous and fast.
As a result, I built all this :
- A scheduler, watches for new post. If so, it pushes a new job to the queue.
- Redis manages the job queues, the post metadata and the embeddings
- Workers extract text from article, compute embeddings and fetch metadata from the Hacker News API

On the other hand, this whole system isn’t performant. To demonstrate, at peak, only 110 articles per second were computed while having 8 [Digital Ocean droplets](https://www.digitalocean.com/products/droplets) (2 CPU, 2 GB RAM).
I learned the hard-way how much synchronous Python code can be blocking. I’m used to writing JavaScript using `async/await`. With this in mind, I didn’t think about the library`requests` blocking the script for an HTTP response. I had to spin up around 50 workers per server to have an acceptable rate.

Moreover, I might have miscalculated the size needed by Redis in RAM. At first, I thought 8 GB of RAM would be enough: I was wrong.
It should be noted that Hacker News has around 36 000 000 items (comments, stories, polls, etc.). Each job pushed to the queue is about 460 bytes. Some quick maths : 460B × 36 000 000 = 16.56 GB. 
Hi swap file 👋! It was very slow. Each snapshot of the database was at least taking an hour. Next time, I will think about twice before using Redis.

## Analysis
> Disclaimer: The following charts contain bias and might not be representative of the real-world. Indeed, the data has only stories with a score greater than 100 and articles  that are unavailable (image, some gated content,  etc.) were not included.

After waiting 96 hours for my inefficient system to finish its job, I finally have exactly 108 477 articles with their embeddings.
I wanted to plot them, but vectors from Open AI have a length of 1536 and my screen is only 2D, so we have to reduce the dimension. To do so, we’re going to use the t-SNE algorithm. I don’t understand its inner workings, but as far as I know, it helps reduce a vector of dimension N to a vector of dimension 2. Which is helpful to plot it.

### Scatter plot
Here is the result:
![](/images/articles/hn-embedding/projection-embeddings.png)
To colour the scatter plot, I have used the K-means algorithm from Scikit Learn. I made 9 clusters, labeled them one by one and plotted them using Plotly. You can find the interactive version [here](https://julienc.me/).
The main topics are:
- Data privacy, Security 
- Finance
- Hardware, Embedded systems
- Computer theory, Math, Deep Learning
- Open source, Software development
- Self-improvement, Advice, Essays, Guides
- Can’t tell (I couldn’t figure out what those articles were about)
- Health, Society, News
- Programming

> **Why aren’t the colours in the same place?** <br><br>Yes, it's a good question. I used the K-means algorithm to cluster the vector in dimension 1536. Due to the t-SNE dimensionality reduction, some items may not appear in the same spot when in dimension 2.

### Pie chart
I’ve made a pie chart using the previously made cluster. « Open source, Software development » is by far the most popular topic in terms of number of posts.
![](/images/articles/hn-embedding/pie-category.png)

### Bar chart
While in the previous chart, there were the more stories on « Open source, Software development », « Data privacy, Security » is a much more popular topics. 
It’s interesting to see the difference between the number of posts vs. the popularity of the posts.
![](/images/articles/hn-embedding/bar-category.png)

## Dataset
I love open source. Therefore, I’m releasing the dataset for the public. You can download it from:
- [Kaggle](https://www.kaggle.com/datasets/julien040/hacker-news-openai-embeddings)

In addition, you can find the notebook for data visualisation [here](https://colab.research.google.com/drive/1qhpDzaIq2b0cYWl6lTrx-ceIJbMxUsMX?usp=sharing).

## Thanks
I want to thank Diffbot, which allowed me to use their API for free. Without them, this project 