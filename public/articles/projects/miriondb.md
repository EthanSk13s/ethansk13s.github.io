# MirionDB
> A simple translated card database for a Japanese mobile game built with Python, Rust, and Typescript

![Home Page](/imgs/miriondb-home.png)

[chupa.miriondb.com](https://chupa.miriondb.com) | [Repository](https://github.com/EthanSk13s/miriondb)

This site has been up and running since 2021.

A simple translated card database from the game 
[*THE IDOLM@STER MILLION LIVE! THEATER DAYS*](https://www.project-imas.wiki/THE_iDOLM@STER_MILLION_LIVE!_THEATER_DAYS) 
or mirishita for short (or in katakana, *ミリシタ*). The website uses the [Princess](https://api.matsurihi.me/docs/) API to obtain the many card's
information. For the cards' images it downloads from [matsurihi.me](https://mltd.matsurihi.me/) itself, so the website can be self-sufficient
and not rely on their services aside from occasionally updating cards and images.

The website is ran with: a PostgreSQL database to store data, a Flask backend coupled with a VueJS frontend styled with tailwindcss for the UI,
and a Rust server built with Rocket to serve image assets to the Flask server.
The website is ran inside a Docker container.

To note: It's currently under maintenance mode and new features are frozen.

![Home Page](/imgs/miriondb-preview.png)