---
title: 'SpielList'
date: 2026-09-01
tagline: 'A planner for every new game at SPIEL Essen'
role: 'Personal project'
tech: 'Next.js, Figma, Firebase, Vercel'
website: 'https://spiellist.com'
featuredImg: '/spiellist/preview.png'
backgroundColor: "#0F61C0"
---
SpielList is an unofficial guide to SPIEL Essen, the world's biggest board game fair. It puts every new game at the fair in one list, with BoardGameGeek scores, prices and booth locations, built mobile first for walking the halls.

Visitors mark games as interested, to buy or bought, sort by hall to plan a route, and sync their list with friends to see what everyone is after. Hall maps show every marked stand on the official plans, in the colours of the marks. Marks can be sent to the official SPIEL app, and the whole list can be saved for offline use.

Under the hood it's a statically exported Next.js site. Each build merges the official novelties list with BoardGameGeek's preview into about 2,500 games, and a Vercel cron checks both sources every five minutes, rebuilding through GitHub Actions when either changes. A service worker keeps the list and box art available offline in the halls, and Firebase handles sign-in and syncs marks between devices and friends.

From launch on 12 October to the end of the fair on 25 October 2026, it had about 7,200 visitors and over 70,000 page views. During the four fair days about 3,500 people used it, 89% of them on phones, and marked games 5,387 times.

I go to SPIEL every year and built SpielList to make those visits easier.
