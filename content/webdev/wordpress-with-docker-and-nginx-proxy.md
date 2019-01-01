---
title: "WordPress with Docker and nginx-proxy"
date: 2018-12-30T10:41:05+11:00
draft: false
---

This article assumes you're at least slightly familiar with Docker and Docker Compose. If you're not sure of what Docker is, or you'd like to get started with Docker, I would check out the following links.

- [Why Docker?](https://www.docker.com/why-docker)
- [Get Started with Docker](https://www.docker.com/get-started)

I am by no way a Docker expert, so if you see something in this article that you disagree with or you think could be improved upon, feel free to shoot me a tweet at [@_sean_gilmore](https://twitter.com/_sean_gilmore).

With that said, lets dive into exactly what I want to get out of my development environment when working on WordPress projects.

## My desired development environment

There's several features I want from my development environment:

- Consistency: I want my environment set up to be consistent between machines. to thermore it shouldn't change depending on the operating system I'm running.
- Ease of setup: I only want to run a couple of commands on a new computer to be up and running.
- Multi-project: I want to access all of my projects via local virtual host domains (i.e. my-project-1.test, my-project-2.test).
- Software version control (PHP, mysql, apache): I want to be able to run PHP 5.6 for an old legacy project (while I move it to a new version - [5.6 has hit EOL](http://php.net/supported-versions.php)), and PHP 7.x for all of my new projects.

Having all these features in one development environment is a tall order when considering traditional options like running apache or XAMPP. Fortunately for us this is where Docker comes in - bringing with it the ability to run all of our projects in containers, a command line tool that's easy to get started with, and the ability to managing configs on a per project basis. Combined with a proxy service we can achieve all our listed objectives and more!

## Prerequisites

1. [Docker](https://www.docker.com/get-started) installed.
2. [docker-compose](https://docs.docker.com/compose/) installed.
3. A WordPress project.

## Setting up JWilder's nginx-proxy

JWilders nginx-proxy is a super useful Docker container that will enable us to run all our projects under their own virtual host names. The command to get the nginx-proxy up and running is as follows:

```shell
$ docker run -d -p 80:80 -v /var/run/docker.sock:/tmp/docker.sock:ro jwilder/nginx-proxy
```

To confirm that the nginx-proxy is running successfully, we can run the following command to list out all the currently running containers:

```shell
$ docker ps
```

If successful, we should see `nginx-proxy` listed in our terminal output. Note: If you're having difficulty getting the nginx-proxy to run, try disabling any running nginx or apache services on your machine.

With our nginx-proxy running successfully we can move on to running our WordPress project through Docker and giving it a virtual host name.

## Running WordPress with Docker

To get our WordPress project running via Docker we need to do a couple of things:

1. Add a `Dockerfile`
2. Add a `docker-compose.yml` file
3. Add a development environment file (which we will name `.development.env`)

Adding our Dockerfile is the easiest of these steps. For my WordPress sites I use the official WordPress Docker image, [which you can find here](https://hub.docker.com/_/wordpress/). If you're not sure which image version you should be using, just run with the `latest` tag. With that in mind, your `Dockerfile` should be looking something like this:

```
FROM wordpress:latest
ADD . /var/www/html
```

The first line is telling Docker to run the latest version of the WordPress Docker image, while the second is telling Docker to mount the entire contents of our project into the `/var/www/html` folder inside our WordPress Docker container.

Next up, we need to create a `docker-compose.yml` file, as well as tell it a set of environment variables to load, which we're going to keep in a file called `.development.env`.

Create your `docker-compose.yml` file as follows:

```
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

```
VIRTUAL_HOST=myproject1.test

# WP DB
DB_NAME=SOMEDATABASENAME
DB_USER=SOMEDBUSER
DB_PASSWORD=SOMEPASSWORD
DB_HOST=db:3306
```

Together these two files will allow us to run a mysql Docker container along side our WordPress container, and link the two together.

In our `.development.env` file we've set a couple of values. First the VIRTUAL_HOST value is going to allow us to visit the Docker container at the web address myproject1.test. Next, the set of `DB_` values are going to allow us to tell our WordPress site how to connect to our mysql instance.

Going back to our `docker-compose.yml` file, we can see that we use the same mysql password and username as specified in our `.development.env` file. These values are the ones that will be used to set up mysql Docker instance when the container starts.

We can now proceed to edit our `wp-config.php` file to use our new environment variables. Modify the `wp-config.php` file as follows:

```php
$DB_NAME = getenv('DB_NAME') == false ?  '' : getenv('DB_NAME');
$DB_USER = getenv('DB_USER') == false ? '' : getenv('DB_USER');
$DB_PASSWORD = getenv('DB_PASSWORD') == false ? '' : getenv('DB_PASSWORD');
$DB_HOST = getenv('DB_HOST') == false ? '' : getenv('DB_HOST');

define('DB_NAME', $DB_NAME);

/** MySQL database username */
define('DB_USER', $DB_USER);

/** MySQL database password */
define('DB_PASSWORD', $DB_PASSWORD);

/** MySQL hostname */
define('DB_HOST', $DB_HOST);
```

With with WordPress now reading our environment variables, we can start our two containers simultaneously using the following command:

```shell
$ docker-compose up
```

Note: If you make any changes to your `Dockerfile` or `docker-compose.yml` file, pass through the `--build` flag when running the above command to make sure your new changes are included in the build.

If you command was successful you should see Docker begin to start up the WordPress and mysql Docker containers. Once both are set up you should also be able to see the access and error logs output from the WordPress container.

You might also feel like running the `docker ps` command in another terminal window, just to verify the steps we've taken. You should be able to see our three containers - wordpress, nginx-proxy and mysql all running.

## Editing our Hosts file

The final change required to get our virtual host name working correctly is to edit the hosts file on our computer, located at `/etc/hosts`. To modify this file run the following command:

```shell
$ sudo vim /etc/hosts
```

Once in our vim view, add in a new entry at the end of the file. You'll want to use the same IP address as the one that appears at the top of the file, followed by the hostname you specified in you `.development.env` file. It should look something like as follows:

```
127.0.0.1   myhostname1.test
```

With that change made you should now be able to exit vim and visit our custom domain in our browser.

If everything worked correctly you should be able to see the Welcome screen for our wordpress project. Happy developing!