---
title: 'Shipping ExtentX in a docker container'
date: '2017-04-13'
---

Dear Readers,

I'm happy to announce that I had successfully made an attempt and containerised the [ExtentX](https://github.com/anshooarora/extentx) in a docker. Now you can easily setup the entire infrastructure required for ExtentX in couple of seconds.

## Installation

1. Install [Docker](https://www.docker.com/)
2. Pull the **mongo** image from the docker hub:

```bash
docker pull mongo
```

1. Pull the **extentx** image from the docker hub:

```bash
docker pull email2vimalraj/extentx
```

## Usage

### Run Mongo server

```bash
docker run -p 27017:27017 -d --name extent-mongo mongo
```

### Run ExtentX

```bash
docker run --link extent-mongo:mongodb --name extent-app -p 1337:1337 -d email2vimalraj/extentx
```

Goto [http://localhost:1337](http://localhost:1337) in your browser to view the ExtentX dashboard.

**P.S**: Hit **Like** button if you found this useful.
