---
title: "Honey-Parser"
date: 2021-10-14
draft: false
---

~~Repository~~ Soon.

A web scraper library for the website, [Honey Impact](https://genshin.honeyhunterworld.com/?lang=EN). 
Since there is no availabe *public* API *as far as I know*, I'm currently working on a python web scraper
that has full coverage to what the site can offer. To save having to access the website all the time, when
the user uses the wrapper. The html pages are stored in a cache and are served to them when needed.

*Example Snippet:*

```py
import hnypy

client = hnypy.Client()
chara = client.get_chara("amber")

print(chara.name) # Returns Amber
```