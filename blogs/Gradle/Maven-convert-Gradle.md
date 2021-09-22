---
title:  Maven Gradle 互转
date: 2021-09-21
tags:
 - Gradle
 - Maven
categories:
 -  后端
---

## Maven转Gradle

然后在命令行中执行以下命令，生成.gradle文件

```bash
gradlew init --type pom
```
## Gradle转Maven

在build.gradle中添加maven插件

```bash
apply plugin: 'maven'
```

然后在命令行中执行以下命令，生成.pom文件

```bash
gradlew install
```