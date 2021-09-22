---
title: Java 安装
date: 2021-09-21
tags:
 - Java
categories:
 -  后端
---

Java 安装

[下载地址1](https://www.oracle.com/java/technologies/javase-downloads.html)
[下载地址2](https://www.java.com/zh-CN)

安装

配置环境变量

|Key|Value|
|:---:|:---:|
|JAVA8_HOME|D:\Program Files\Java\jdk1.8.0_271|
|JAVA_HOME|%JAVA8_HOME%|
|CLASSPATH|.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar|
|Path|%JAVA_HOME%\bin|

验证:

```
java -version
javac
```