Hosted on https://yuuupie.xyz

# Stubook - Node/Express Back-end

This is a node/express based back-end for the Stubook website (student-book), a simple to-do application. The aim of this project is to practice and showcase my skills in node, express, sequelize, and docker.

## Build

#### First time setup
First install the packages with
> npm ci

Then create a `secrets.yml` file using the template `secrets.yml.default`, populating the keys with appropriate values.

### Local (non-docker)
First ensure that you have a running instance of mariadb locally listening on port 3306. Then run
> node server.js

### Local (docker)
To run the app in a container, run
> docker-compose up --build

This will map the container to the dockerhost's port 4000.

### Production (docker)
To run the app in a container with production env variables and SSL certificates, first ensure that the SSL certificates exists on the dockerhost in the directory `/etc/letsencrypt`. These can be generated with certbot. Then run
> docker-compose -f docker-compose.yml -f docker-compose.production.yml up --build
