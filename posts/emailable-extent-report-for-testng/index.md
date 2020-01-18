---
title: 'Emailable Extent Report for TestNG'
date: 2016-12-24
---

If you were following my blog, do you remember few days before I've announced a new java library called `TestNG Extent Reporter`?
Now I've released a new feature called `Emailable Report` which I believe many of us eagerly needed from the extent report.

In case you are new to my blog, and wanted to have a look at TestNG Extent Reporter, head [here](../testng-extent-report/) for more details.

## How to generate emailable report?

Follow [here](../testng-extent-report/) to setup. That is all you have to do to generate the `emailable-report.html` in the TestNG's default output folder.

In case you want to overwrite the output folder location, then pass the jvm parameter as follows:

```bash
mvn clean test -DreportPath=output
```

The above will generate `report.html` and `emailable-report.html` in the `${project directory}/output` directory.

This is the initial version of emailable report and there could be more features added. So feature requests are always welcome. To request for features, kindly log it [here](https://github.com/email2vimalraj/TestNGExtentsReport/issues).
