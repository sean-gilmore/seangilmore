---
title: "WordPress with Docker and nginx-proxy"
date: 2018-12-30T10:41:05+11:00
draft: false
---

This article assumes you're at least slightly familiar with docker and docker compose. If you're still only just getting started with docker I'd check out the following resources to get started with Docker.

- [Why Docker?](https://www.docker.com/why-docker)
- [Get Started with Docker](https://www.docker.com/get-started)

This article deals with what I want my development environment to look like, and how docker helps me achieve that - specifically for when I'm working on several WordPress sites at once.

## My desired development environment

There's several features I want from my development environment:

- Consistency: I want my development environment to stay the same across machines (Home PC, Work PC, Laptop). Furthermore it shouldn't change depending on the operating system I'm running.
- Ease of setup: Ideally I only want to have to run a couple of commands on a new computer to get my environment up and running.
- Multi-project: I want to be able to access all of my projects via local virtual host domains (i.e. my-project-1.test, my-project-2.test).
- Project-to-project PHP/Apache/NGINX version control: I want to be able to run PHP 5.6 for an old legacy project (while I move it to a new version - [5.6 has hit EOL](http://php.net/supported-versions.php)), and PHP 7.x for all of my new projects.

Having all these features in one development environment is a tall order when considering traditional options like running apache or XAMPP, but by using Docker we can achieve all this (and more).

## What we'll need

1. [Docker](https://www.docker.com/get-started)
2. [docker-compose](https://docs.docker.com/compose/)
3. A WordPress project

## Setting up JWilder's nginx-proxy

JWilders nginx-proxy is a super useful docker container that will enable us to run all our projects under their own virtual host names. The command to get the nginx-proxy up and running is as follows:

```shell
$ docker run -d -p 80:80 -v /var/run/docker.sock:/tmp/docker.sock:ro jwilder/nginx-proxy
```

To confirm that the nginx-proxy is running successfully, we can run the following command to list out all the currently running containers:

```shell
$ docker ps
```

If the above command was successful, we should see `nginx-proxy` listed in the output. Please note that you should ensure you have nginx or apache services stopped on your machine for the nginx-proxy to work correctly.

With our nginx-proxy running successfully we can move on to running our WordPress project through Docker and giving it a virtual host name.

## Running WordPress with Docker

To get our WordPress project running via docker we need to do a couple of things:

1. Add a `Dockerfile`
2. Add a `docker-compose.yml` file
3. Add a development environment file (which we will name `.development.env`)

Adding our Dockerfile is the easiest of these steps. For my WordPress sites I use the official WordPress docker image, [which can be found here] https://hub.docker.com/_/wordpress/. If you're not sure which version you should be using, just run with the `latest` tag. With that in mind, your `Dockerfile` should be looking something like this:

```Docker
FROM wordpress:latest
ADD . /var/www/html
```

The first line is telling Docker to run the latest version of the WordPress docker image, while the second is telling docker to mount the entire contents of our project into the `/var/www/html` folder inside our WordPress docker container. With the files inside of the Docker container, they are now being hosted in the same way to a regular apache or nginx server setup.

Next up, we need to create a `docker-compose.yml` file, as well as tell it a set of environment variables to load, which we're going to keep in a file called `.development.env`.

Create your `docker-compose.yml` file as follows:

```Docker
web:
  build: .
  ports:
    - "8080:80"
  links:
    - db
  env_file: .development.env
  volumes:
    - .:/var/www/html
db:
  image: mysql:5.6
  ports:
   - "9090:3306"
  environment:
    - MYSQL_ROOT_PASSWORD=SOMEPASSWORD
    - MYSQL_DATABASE=SOMEDATABASENAME
  volumes:
    - ./data/mysql/myprojectname:/var/lib/mysql
```

And in our `.development.env` file:

```Docker
VIRTUAL_HOST=myproject1.test

# WP DB
DB_NAME=SOMEDATABASENAME
DB_USER=SOMEDBUSER
DB_PASSWORD=SOMEPASSWORD
DB_HOST=db:3306
```

Together these two files will allow us to run a mysql docker container along side our WordPress container, and link the two together.

In our `.development.env` file we've set a couple of values. First the VIRTUAL_HOST value is going to allow us to visit the docker container at the web address myproject1.test. Next, the set of `DB_` values are going to allow us to tell our WordPress site how to connect to our mysql instance.

Going back to our `docker-compose.yml` file, we can see that we use the same mysql password and username as specified in our `.development.env` file. These values are the ones that will be used to set up mysql docker instance.

With all of that setup up you can now run the following command to start our WordPres and mysql instances together:

```shell
$ docker-compose up
```

Note: If you make any changes to your `Dockerfile` or `docker-compose.yml` file, pass through the `--build` flag when running the above command to make sure your new changes are included in the build.
