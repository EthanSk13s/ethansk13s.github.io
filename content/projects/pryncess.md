---
title: "Pryncess"
date: 2019-12-21
draft: false
---

[Repository](https://github.com/EthanSk13s/pryncess)

A Python API wrapper for the [Princess](https://api.matsurihi.me/docs/) API.
Specifically, this wrapper covers the Mirishita part of the API. The wrapper
also includes a english translation for skill descriptions and character names.
It is a rather simple wrapper with an Object-Oriented approach. I maintain it
whenever there are new skills to be translated, new event types or new characters
to add.

*Example Snippet:*
```py
import pryncess

# Pass versions of mirishita ("ja", "ko", "zh")
session = pryncess.Pryncess("ja")
card = session.get_card(704)

print(card.name) # Returns アウトサイダー[ダスク]　Kisaragi Chihaya
```

## Why is it not in PyPi?
~~I'm too lazy~~. I feel that the wrapper is not 'big enough' to be put in PyPi. Or
whenever I feel like it.