---
title:  Maven 常用命令和常见问题
date: 2021-09-21
tags:
 -  Maven
categories:
 -  后端
---

## 常用命令

```
mvn clean 清理缓存
mvn compile 编译
mvn package 打包
mvn test 测试
mvn install 上传到私服
mvn deploy 部署到服务器
```

### 跳过单元测试

在使用mvn package进行编译、打包时，Maven会执行src/test/java中的JUnit测试用例，有时为了跳过测试，会使用参数```-DskipTests```和```-Dmaven.test.skip=true```，这两个参数的主要区别是：

- ```-DskipTests```，不执行测试用例，但编译测试用例类生成相应的class文件至target/test-classes下。
- ```-Dmaven.test.skip=true```，不执行测试用例，也不编译测试用例类
- ```-Dmaven.javadoc.skip=true``` 跳过javadoc

## 常见问题

packaging 默认为 jar, ```<packaging>jar</packaging>```可不写

### mvn compile 时: 

问题: 出现 SLF4J: Failed to load class "org.slf4j.impl.StaticLoggerBinder". 
解决方式: 重装maven

### 下载maven依赖到指定目录

添加插件

```xml

    <!-- maven相关下载插件 -->
    <plugin>
        <artifactId>maven-dependency-plugin</artifactId>
        <configuration>
            <!-- 是否排除间接依赖。默认false，不排除 -->
            <excludeTransitive>false</excludeTransitive>
            <!-- 是否消除依赖jar包后缀的版本信息。默认是false，不取消版本信息 -->
            <stripVersion>false</stripVersion>
            <!-- 输出文件路径 -->
            <outputDirectory>./lib</outputDirectory>
        </configuration>
    </plugin>
```

执行命令

```bash
mvn dependency:copy-dependencies
```
## Maven 私服介绍

搭建JFrog Artifactory OOS 开源版

### 容器版

```
docker pull docker.bintray.io/jfrog/artifactory-oss

docker run --name artifactory-oss-6.18.1 -d -v /Users/qing/JFROG_HOME/artifactory-oss-618:/var/opt/jfrog/artifactory  -p 8083:8081 docker.bintray.io/jfrog/artifactory-oss:6.18.1
```

### 安装版

https://www.jfrogchina.com/open-source/

### 创建Maven仓库

### 配置Maven连接到Artifactory