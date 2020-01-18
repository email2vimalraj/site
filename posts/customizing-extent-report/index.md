---
title: 'Customizing Extent Report'
date: 2016-12-13
---

I've been receiving some queries related to how we customize the extent report that has been generated. Queries like:

1. How do I change the title?
2. How do I default to dark theme?
3. In the dashboard view, how do I default to Child Tests only or Parent Tests only mode?
4. Due to some organization policy, when executed through Jenkins, the **https** protocol of style sheets and script files are blocked. How do we resolve this?

Let's see one by one. Before diving in, let's create a xml file called **extent-config.xml** (you can name it whatever you want) in the **src/test/resources/** directory. The following suggestions should be done on this file only.

### How do I change the title?

Open **extent-config.xml** file and add the following code:

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<extentreports>
  <configuration>
    <encoding>UTF-8</encoding>
    <documentTitle>My Custom Browser Title</documentTitle> <!-- This title will be displayed as browser title for the page -->
    <reportName>My Custom Report Title</reportName> <!-- This will be your report heading -->
    <reportHeadline>A small headline</reportHeadline>
  </configuration>
</extentreports>
```

### How do I default to dark theme?

Add the following in your xml file under the **configuration** node:

```xml
<theme>dark</theme>
```

### In the dashboard view, how do I default to Child Tests only or Parent Tests only mode?

Add the following in your xml file under the **configuration** node to default the **Parent Tests only** mode:

```xml
<scripts>
<![CDATA[
$(document).ready(function() {
            $('#parentWithoutNodes').prop("checked", true).click();
\$('#test-count-setting > div.modal-footer > a')[0].click();
});
]]>
</scripts>
```

To default to **Child Tests only** mode, replace **#parentWithoutNodes** to **#childNodes**.

### How to resolve https protocol error?

Add the following in your xml file under the **configuration** node:

```xml
<protocol>http</protocol>
```

This will make sure that all the stylesheets and scripts will follow the http protocol.

## Hook the custom config

Now once you have created your custom config xml file, you will have to load that.

If you are using **CucumberExtentReporter**, add the following line of code in your runner.

```java
ExtentCucumberFormatter.loadConfig(new File("src/test/resources/extent-config.xml"));
```

Now re-run and open the generated report to see the customized extent report.

Update: Updated the xml config to select the Parent Tests only and click on Save button. Thanks to Alexei who pointed out.
