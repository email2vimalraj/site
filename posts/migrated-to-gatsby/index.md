---
title: Migrated to Gatsby
description: Announcement on migrating the blog from wordpress to gatsby
date: 2020-04-11
---

I would like to take this moment to announce to all my blog followers that I've successfully migrated my blog site entirely from [Wordpress](https://wordpress.org) to [Gatsby](https://www.gatsbyjs.org/). Also, I've changed my hosting provider from GoDaddy to [Zeit](https://zeit.co/) (including my domain).

## Why Gatsby?

Eventhough Wordpress provides many great features with tons of plugins, I always missed writing the posts in markdown. There were lots of plugins for markdown support, however each plugin I've tried so far had some or other side effects. For example, a new plugin overwrites the features of other plugins and due to this I had spent time in updating the old posts supporting the new plugin format. It's a huge pain.

And moreover, I love [React](https://reactjs.org/) and [GraphQL](https://graphql.org/). The [Gatsby](https://www.gatsbyjs.org) is a static site generator using React as a front-end framework and GraphQL for the content queries. After the code is built, we get the static files as output just like html and other supporting assets. Migrating to Gatsby improved my site's performance 10x, you can test the performance in [here](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fvimalselvam.com).

The best thing is, I write my post articles in simple markdown format. And there are many plugins available in [Gatsby Plugins Ecosystem](https://www.gatsbyjs.org/plugins/). So feature wise I'm covered.

## Why ZEIT Now?

> ZEIT Now is a cloud platform for static sites and Serverless Functions that fits perfectly with your workflow. It enables developers to host Jamstack websites and web services that deploy instantly, scale automatically, and requires no supervision, all with no configuration.

The ZEIT Now provides me a CLI based tool which integrated with my nodejs workflow. So the moment I execute my Gatsby build, the site will be built and published in a test site. Also, it is integrated with Git, so whenever I push to my master branch, my site will be built and available for Public. That's the developer experience I get out of it.

The best class feature is SSL by default. All the domains comes with the automatic SSL, so that means I don't have to spend money in buying the SSL and managing it. ZEIT takes care of it, read more about it [here](https://zeit.co/blog/automatic-ssl-with-now-lets-encrypt).

With ZEIT now, I own the following domains now:

- https://vimalselvam.com
- https://vimalraj.dev
- https://vimalrajselvam.com

The source code of my blog is open-sourced and anyone can access this from [Github](https://github.com/email2vimalraj/site). Please feel free to send a pull request for any new feature to be added in the site or raise an issue in case you want me to address anything or write something about specifically.