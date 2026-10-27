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
SpielList is an unofficial guide to SPIEL Essen, the world's biggest board game fair: every new game in one list, with BoardGameGeek scores, prices and booths, built mobile first for walking the halls.

Visitors mark games as interested, to buy or bought, see their marked stands on the hall maps, and share their lists with friends. It works offline, since the halls' signal is patchy.

It's a statically exported Next.js site. A Vercel cron watches the official novelties list and BGG's preview and rebuilds through GitHub Actions when either changes; Firebase handles sign-in and sync.

From launch on 12 October to the end of the fair it had about 7,200 visitors and over 70,000 page views. During the four fair days, 3,500 people marked games 5,387 times, 89% of them on phones.

I go to SPIEL every year and built SpielList to make those visits easier.
