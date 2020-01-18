---
title: 'Appium Parallel Execution on OpenSTF'
date: 2016-08-07
---

In the last [post](../appium-parallel-execution-using-testng), we have seen how to execute appium tests in parallel using Selenium Grid. In this post, I'm going to show you how we can use [OpenSTF](http://openstf.io/), a Smartphone Test Farm - open source tool and execute our tests in parallel.

**First clone this repo**:

```
git clone https://github.com/email2vimalraj/appium-stf-example.git
```

**Now let's setup the required tools**:

1. [OpenSTF](https://github.com/openstf/stf) - Kindly follow the github instructions to install the openstf in your local machine
2. [Appium](http://appium.io) - Download and install as per the documentation
3. [Maven](https://maven.apache.org/)

**Running test**:

1. Make sure your `stf` is running.
2. Generate the Access Token from your `stf` settings page and copy it to your clipboard. (Settings > Keys > + > Give some title > Generate New Token).
3. Open `src/test/java/com/vimalselvam/stf/AndroidTest` and change the following:
4. `STF_SERVICE_URL` to your actual STF URL.
5. `ACCESS_TOKEN` to the copied access token from the step #2.
6. Update `parallelDp` data provider method to the list of device serial ids connected to your machine.
7. From terminal, `cd` to the cloned directory and run **mvn clean test**.

**Demo**:

[![Appium Parallel Execution on OpenSTF](http://img.youtube.com/vi/ZM1FZxokbZ4/0.jpg)](http://www.youtube.com/watch?v=ZM1FZxokbZ4 'Appium Parallel Execution on OpenSTF')
