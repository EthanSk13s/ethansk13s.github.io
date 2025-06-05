# Pryncess
> A Python REST API wrapper for a Japanese mobile game, also used in MirionDB.

[Repository](https://github.com/EthanSk13s/pryncess)

A Python API wrapper for the [Princess](https://api.matsurihi.me/docs/) API.
Specifically, this wrapper covers the Mirishita part of the API. The wrapper
also includes a english translation for skill descriptions and character names.
It's a simple wrapper with an Object-Oriented approach. I maintain it
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