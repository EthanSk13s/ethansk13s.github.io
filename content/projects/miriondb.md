---
title: "mirionDB"
date: 2021-06-21
draft: false
---
![Home Page](/imgs/miriondb-home.png)

[chupa.miriondb.com](https://chupa.miriondb.com) | [Repository](https://github.com/EthanSk13s/miriondb)

A simple translated card database from the game 
[*THE IDOLM@STER MILLION LIVE: THEATER DAYS*](https://www.project-imas.com/wiki/THE_iDOLM@STER_Million_Live!:_Theater_Days) 
or mirishita for short (or in katakana, *ミリシタ*). The website uses [Princess](https://api.matsurihi.me/docs/) to obtain the many card's
information. For the cards' images it downloads from [matsurihi.me](https://mltd.matsurihi.me/) itself, so the website can be self-sufficient
and not rely on their services aside from occasinally updating cards and images.

The website is ran with: a PostgreSQL database to store data, a Python Flask server for serving the frontend and the cards' information,
and a Rust server built with Rocket to serve image assets to the Flask server.
The website is ran inside a Docker container.

![Home Page](/imgs/miriondb-preview.png)