---
title: "TypeError: 'coroutine' object is not subscriptable"
description: How to resolve this error
date: 25-01-2024
modified: 25-01-2024
---

## The problem

You’re writing some async python code and you find this error.

```python
TypeError: 'coroutine' object is not subscriptable
```

Personally,  I have often encountered this error with my Jupyter Notebook

## The why

This error is occurring because you are trying to use square bracket notation to access a coroutine object, which is not allowed. Coroutines are not subscriptable, meaning you cannot use indexing on them. Await the coroutine and then access the field needed.
Therefore, to resolve the problem, surrender your `await` call with parenthesis.

### Example

```python
# ❌ Don't do that
await myfunction(myarg)[0]
await myfunction2(myarg).choices

# ✅
(await myfunction(myarg))[0]
(await myfunction2(myarg)).choices
```
