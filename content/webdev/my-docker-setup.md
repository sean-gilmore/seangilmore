---
title: "My Docker Setup"
date: 2018-12-30T10:41:05+11:00
draft: true
---

This article assumes you're at least slightly familiar with docker and docker compose. If you're still only just getting started with docker I'd check out the following resources to learn a bit more about the purpose of using docker and how it works.

This article deals with what I want my development environment to look like, and how docker helps me achieve that, specifically for when I'm working on several WordPress sites at once.

## My desired development environment

There's several features I want from my development environment:

- Consistency: I want my development environment to stay the same across development machines (Home PC, Work PC, Laptop). Furthermore it shouldn't change depending on the operating system I'm running.
- Ease of setup: Ideally I only want to have to run a couple of commands on a new computer to get my environment up and running
- Multi-project: I want to be able to access all of my projects via local virtual host domains (i.e. my-project-1.test, my-project-2.test)
- Project-to-project PHP/Apache/NGINX version control: I want to be able to run php 5.6 for an old legacy project (while I move it to a new version - [5.6 has hit EOL](http://php.net/supported-versions.php)), and php 7.3 for all of my new projects.

Having all these features in one development environment is a tall order when considering traditional options like running apache or xampp, but by using docker we can achieve all this (and more).

## What we'll need

1. Docker and docker-compose installed
2. A WordPress project (you can easily set up a test one by downloading WordPress from here)
3. Your favourite editor of choice