---
title: Gut, an alternative git CLI
description: Gut is an alternative git CLI for Windows, macOS, and Linux. I’ve built it using Golang.
started: 22-12-2022
layout: "../../layouts/article.astro"
image: "header/gut.png"
project_url: https://gut-cli.dev

---

Gut is an alternative git CLI for Windows, macOS, and Linux. I’ve built it using Golang.
## Trending on Hacker News
On March 30, 2023, gut reached the front page of Hacker News : [https://hnrankings.info/35371469/](https://hnrankings.info/35371469/)
It was a great help for showing the project capabilities. You can find the post here: [https://news.ycombinator.com/item?id=35371469](https://news.ycombinator.com/item?id=35371469)

![](/images/articles/gut/hn.png)

## Main issue with git
Git is a simple tool by design but not an easy one to use. Even if you understand the internals, it still can be hard to use because the CLI isn’t consistent in naming. Only muscle memory can fix it.
To remediate this issue, I built gut. It works seamlessly on an existing git repository and simplify working with code versioning.
Reading the principles of gut is a great introduction to the philosophy of the project:
[https://github.com/julien040/gut#principles](https://github.com/julien040/gut#principles)
## Example
```bash
cd my-awesome-project

# Init a new git repo
gut init

# Do some changes
touch my-billion-dollar-idea.txt

# Commit your new file
gut save # Alias of gut commit

# Sync your changes with the upstream
gut sync

```
## Features
- Built-in credentials manager
- Consistent naming of commands
- Integration with cloud platforms (merge and diff opens in the web UI)
- gut fix command helps you fix your mistakes with git
- .gitignore template downloader
- Simplified authentication with GitHub
## Main Useful Commands
- gut save - Commits changes using gitmoji
- gut sync - Syncs changes with your remote repository
- gut goto - Lets you rewind the state of your project to a particular commit by temporarily modifying the working tree
- gut fix - Helps you fix your mistakes with git
- gut revert - Reverts your project to a previous state to fix a bug introduced n commits ago
- gut undo - Discards changes made since the last commit
- gut ignore - Downloads templates of .gitignore
- gut whereami - Shows where your HEAD points to (no more rev-parse)
- gut switch - Creates a new branch or switches to an existing one
## Technical stack
The CLI is built using Golang. To go faster, I’ve used the [cobra framework](https://cobra.dev/). And to interact with git, gut uses a mix of shell command and [go-git](https://github.com/go-git/go-git).