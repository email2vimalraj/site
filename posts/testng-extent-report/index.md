---
title: 'TestNG Extent Report - v1.3.x'
date: 2016-11-28
---

**Update:** Updated to _v1.3.1_ - Now emailable report will also be generated **Update:** Updated to _v1.2.0_

The TestNG Extents report is a listener plugin which you can add it as a listener to your TestNG suite to generate a nice Extent report.

This listener uses the [ExtentReports v3.0.0](http://extentreports.relevantcodes.com/), a library developed by [Anshoo Arora](https://github.com/anshooarora) for reporting.

## Why another library?

You don't have to spend time in re-inventing on how to define what. Just add this as a listener or [service loader](http://testng.org/doc/documentation-main.html#listeners-service-loader). You will get the nice looking report generated at the end of your test execution.

Also, you will get the **emailable report** out-of-the box.

## Usage

For maven, add the following as dependency:

```xml
<dependency>
  <groupId>com.vimalselvam</groupId>
  <artifactId>testng-extentsreport</artifactId>
  <version>1.3.1</version>
</dependency>
```

Either in your **testng.xml**, add the listener:

```xml
<listeners>
  <listener class-name="com.vimalselvam.testng.listener.ExtentTestNgFormatter" />
</listeners>
```

or add as a [service loader](http://testng.org/doc/documentation-main.html#listeners-service-loader) (recommended).

By default, the report will be generated at TestNG's output directory. i.e., **test-output/report.html** and the emailable report at **test-output/emailable-report.html**.

In case you want to generate the report in a different location, make sure you pass the JVM argument called **reportPath** with the absolute directory path.

**For example**: I run my maven test as: _mvn clean test -DreportPath=output_. This will generate both the reports in my **\{project directory}/output**.

### Adding custom reporter config

You can customize the report using a XML file. The XML file should follow as given here: [ExtentReports Configuration](http://extentreports.relevantcodes.com/java/#configuration).

The XML file should be referred as parameter in your suite xml. The parameter name should be _report.config_. For instance, the parameter in the suite xml should be as follows:

```xml
<parameter name="report.config" value="src/test/resources/extent-config.xml" />
```

The value should be the config XML file path.

### Adding System Information

In case you want to add system information, you will have to implement an interface _com.vimalselvam.testng.SystemInfo_. This interface contains a method with return type as _Map<String, String>_. Construct your system information with the map and return that map. After you have implemented, the custom implementation should be referred in your TestNG Suite xml as a parameter at the suite level.

For instance add the following parameter at your suite level in the TestNG suite xml:

```xml
<parameter name="system.info" value="test.MySystemInfo" />
```

The parameter name should be _system.info_ and the value should be your fully qualified custom implementation class name. For example my custom implementation look like this:

```java
package test;

import com.vimalselvam.testng.SystemInfo; import org.testng.collections.Maps;

import java.util.Map;

// This is a small utility class to prepare the system information
public class MySystemInfo implements SystemInfo {
  @Override
  public Map<String, String> getSystemInfo() {
    Map<String, String> systemInfo = Maps.newHashMap();
    systemInfo.put("Test Env", "QA");
    systemInfo.put("Browser", "firefox");
    return systemInfo;
  }
}
```

### Instance of the Listener

At any point in time, you can get the instance of the listener as _ExtentTestNgFormatter.getInstance()_

### Adding Screenshot

To add the screenshot, you have two options. \* If the screenshot can be added from the test method, then

```java
ExtentTestNgFormatter.getInstance().addScreenCaptureFromPath(filePath);
```

- If the screenshot can be added from the configuration method, then for example:

```java
@AfterMethod
public void afterMethod(ITestResult iTestResult) throws IOException {
  // The ITestResult is a mandatory parameter
  ExtentTestNgFormatter.getInstance().addScreenCaptureFromPath(iTestResult, filePath);
}
```

### Adding info log

If any case, you want to attach the _info_ log on your test method, you simply call TestNg's _Reporter.log_ method which will be added to your test log. For example:

```java
@Test
public void testMethod() {
  Reporter.log("Custom log");
}
```

### Adding test runner output

To add the test runner output, simply call from anywhere:

```java
ExtentTestNgFormatter.getInstance().setTestRunnerOutput("My output");
```

### Adding new node

Sometimes you may have to add new node under your test. This situation arises when you have iteration in the test method and considering each iteration as a separate node in the report. This could be solved by using _addNewNodeToTest()_ method.

Refer [DemoTestClass](https://github.com/email2vimalraj/TestNGExtentsReport/blob/master/src/test/java/test/DemoTestClass.java) on how to add new nodes and in case of failure, how to fail the added node.

## Cucumber?

Refer my another library which generates the same report for the cucumber based BDD tests: [CucumberExtentReporter](https://github.com/email2vimalraj/CucumberExtentReporter)
