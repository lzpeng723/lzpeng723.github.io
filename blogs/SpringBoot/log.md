---
title: SpringBoot 日志
date: 2021-09-21
tags:
 - SpringBoot
categories:
 -  后端
---
[参考链接]: https://juejin.cn/post/6877473104403759118

## 前言

日志通常不会在需求阶段作为一个功能单独提出来，也不会在产品方案中看到它的细节。但是，这丝毫不影响它在任何一个系统中的重要的地位。

今天就来介绍一下Spring Boot中的日志如何配置。

## 日志级别

几种常见的日志级别由低到高分为：TRACE < DEBUG < INFO < WARN < ERROR < FATAL。
如何理解这个日志级别呢？很简单，如果项目中的日志级别设置为INFO，那么比它更低级别的日志信息就看不到了，即是TRACE、DEBUG日志将会不显示。

## 日志框架有哪些？

常见的日志框架有log4j、logback、log4j2。
log4j这个日志框架显示是耳熟能详了，在Spring开发中是经常使用，但是据说log4j官方已经不再更新了，而且在性能上比logback、log4j2差了很多。
logback是由log4j创始人设计的另外一个开源日志框架，logback相比之于log4j性能提升了10以上，初始化内存加载也更小了。作为的Spring Boot默认的日志框架肯定是有着不小的优势。
log4j2晚于logback推出，官网介绍性能比logback高，但谁知道是不是王婆卖瓜自卖自夸，坊间流传，log4j2在很多思想理念上都是照抄logback，因此即便log4j2是Apache官方项目，Spring等许多框架项目没有将它纳入主流。此处完全是作者道听途说，不必当真，题外话而已。
日志框架很多，究竟如何选择能够适应现在的项目开发，当然不是普通程序员考虑的，但是为了更高的追求，至少应该了解一下，哈哈。

## Spring Boot 日志框架

Spring Boot默认的日志框架是logback，既然Spring Boot能够将其纳入的默认的日志系统，肯定是有一定的考量的，因此实际开发过程中还是不要更换。
原则上需要使用logback,需要添加以下依赖，但是既然是默认的日志框架，当然不用重新引入依赖了。


```xml
<groupId>org.springframework.boot</groupId>
<artifactId>spring-boot-starter-logging</artifactId>
```

Spring Boot中默认的日志级别是INFO，启动项目日志打印如下：

![log](./img/start-log.jpg)

从上图可以看出，输出的日志的默认元素如下：

- 时间日期：精确到毫秒
- 日志级别：ERROR, WARN, INFO, DEBUG , TRACE
- 进程ID
- 分隔符：— 标识实际日志的开始
- 线程名：方括号括起来（可能会截断控制台输出）
- Logger名：通常使用源代码的类名
- 日志内容

### 代码中如何使用日志？

在业务中肯定需要追溯日志，那么如何在自己的业务中输出日志呢？其实常用的有两种方式，下面一一介绍。
第一种其实也是很早之前常用的一种方式，只需要在代码添加如下：

```java
private final Logger logger= LoggerFactory.getLogger(DemoApplicationTests.class);
```

复制代码
这种方式显然比较鸡肋，如果每个类中都添加一下岂不是很low。别着急，lombok为我们解决了这个难题。

```xml
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
```

使用也是很简单，只需要在类上标注一个注解@Slf4j即可，如下：

```java
@Slf4j
class DemoApplicationTests {
  @Test
  public void test(){
    log.debug("输出DEBUG日志.......");
  }
}
```

### 如何定制日志级别？

Spring Boot中默认的日志级别是INFO，但是可以自己定制日志级别，如下：

```properties
logging.level.root=DEBUG
```

上面是将所有的日志的级别都改成了DEBUG，Spring Boot还支持package级别的日志级别调整，格式为：logging.level.xxx=xxx，如下：

```properties
logging.level.com.example.demo=INFO
```

那么完整的配置如下：

```properties
logging.level.root=DEBUG
logging.level.com.example.demo=INFO
```

### 日志如何输出到文件中？

Spring Boot中日志默认是输出到控制台的，但是在生产环境中显示不可行的，因此需要配置日志输出到日志文件中。
其中有两个重要配置如下：

```properties
logging.file.path：指定日志文件的路径
logging.file.name：日志的文件名，默认为spring.log
```

注意：官方文档说这两个属性不能同时配置，否则不生效，因此只需要配置一个即可。
指定输出的文件为当前项目路径的logs文件下，默认生成的日志文件为spring.log，如下：

```properties
logging.file.path=./logs
```

日志文件中还有一些其他的属性，比如日志文件的最大size，保留几天的日志等等，下面会介绍到。

### 如何定制日志格式？

默认的日志格式在第一张图已经看到了，有时我们需要定制自己需要的日志输出格式，这样在排查日志的时候能够一目了然。
定制日志格式有两个配置，分别是控制台的输出格式和文件中的日志输出格式，如下：

```properties
logging.pattern.console：控制台的输出格式
logging.pattern.file：日志文件的输出格式
```

例如配置如下
：
```properties
logging.pattern.console=%d{yyyy/MM/dd-HH:mm:ss} [%thread] %-5level %logger- %msg%n
logging.pattern.file=%d{yyyy/MM/dd-HH:mm} [%thread] %-5level %logger- %msg%n
```

上面的配置编码的含义如下：

```
%d{HH:mm:ss.SSS}——日志输出时间
%thread——输出日志的进程名字，这在Web应用以及异步任务处理中很有用
%-5level——日志级别，并且使用5个字符靠左对齐
%logger- ——日志输出者的名字
%msg——日志消息
%n——平台的换行符
```

## 如何自定义日志配置？

Spring Boot官方文档指出，根据不同的日志系统，可以按照如下的日志配置文件名就能够被正确加载，如下：

- Logback：logback-spring.xml, logback-spring.groovy, logback.xml, logback.groovy
- Log4j：log4j-spring.properties, log4j-spring.xml, log4j.properties, log4j.xml
- Log4j2：log4j2-spring.xml, log4j2.xml
- JDK (Java Util Logging)：logging.properties

Spring Boot官方推荐优先使用带有-spring的文件名作为你的日志配置。因此只需要在src/main/resources文件夹下创建logback-spring.xml即可，配置文件内容如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration scan="true" scanPeriod="60 seconds" debug="false">
    <!-- 定义日志存放目录 -->
    <property name="logPath" value="logs"/>
    <!--    日志输出的格式-->
    <property name="PATTERN" value="%d{yyyy-MM-dd HH:mm:ss.SSS} [%t-%L] %-5level %logger{36} %L %M - %msg%xEx%n"/>
    <contextName>logback</contextName>

    <!--输出到控制台 ConsoleAppender-->
    <appender name="consoleLog" class="ch.qos.logback.core.ConsoleAppender">
        <!--展示格式 layout-->
        <layout class="ch.qos.logback.classic.PatternLayout">
            <pattern>${PATTERN}</pattern>
        </layout>
            <!--过滤器，只有过滤到指定级别的日志信息才会输出，如果level为ERROR，那么控制台只会输出ERROR日志-->
<!--        <filter class="ch.qos.logback.classic.filter.ThresholdFilter">-->
<!--            <level>ERROR</level>-->
<!--        </filter>-->
    </appender>

    <!--正常的日志文件，输出到文件中-->
    <appender name="fileDEBUGLog" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!--如果只是想要 Info 级别的日志，只是过滤 info 还是会输出 Error 日志，因为 Error 的级别高，
        所以我们使用下面的策略，可以避免输出 Error 的日志-->
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <!--过滤 Error-->
            <level>Error</level>
            <!--匹配到就禁止-->
            <onMatch>DENY</onMatch>
            <!--没有匹配到就允许-->
            <onMismatch>ACCEPT</onMismatch>
        </filter>

        <!--日志名称，如果没有File 属性，那么只会使用FileNamePattern的文件路径规则
            如果同时有<File>和<FileNamePattern>，那么当天日志是<File>，明天会自动把今天
            的日志改名为今天的日期。即，<File> 的日志都是当天的。
        -->
        <File>${logPath}/log_demo.log</File>
        <!--滚动策略，按照时间滚动 TimeBasedRollingPolicy-->
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!--文件路径,定义了日志的切分方式——把每一天的日志归档到一个文件中,以防止日志填满整个磁盘空间-->
            <FileNamePattern>${logPath}/log_demo_%d{yyyy-MM-dd}.log</FileNamePattern>
            <!--只保留最近90天的日志-->
            <maxHistory>90</maxHistory>
            <!--用来指定日志文件的上限大小，那么到了这个值，就会删除旧的日志-->
            <!--<totalSizeCap>1GB</totalSizeCap>-->
        </rollingPolicy>
        <!--日志输出编码格式化-->
        <encoder>
            <charset>UTF-8</charset>
            <pattern>${PATTERN}</pattern>
        </encoder>
    </appender>

    <!--输出ERROR日志到指定的文件中-->
    <appender name="fileErrorLog" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!--如果只是想要 Error 级别的日志，那么需要过滤一下，默认是 info 级别的，ThresholdFilter-->
        <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
            <level>Error</level>
        </filter>
        <!--日志名称，如果没有File 属性，那么只会使用FileNamePattern的文件路径规则
            如果同时有<File>和<FileNamePattern>，那么当天日志是<File>，明天会自动把今天
            的日志改名为今天的日期。即，<File> 的日志都是当天的。
        -->
        <File>${logPath}/error.log</File>
        <!--滚动策略，按照时间滚动 TimeBasedRollingPolicy-->
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!--文件路径,定义了日志的切分方式——把每一天的日志归档到一个文件中,以防止日志填满整个磁盘空间-->
            <FileNamePattern>${logPath}/error_%d{yyyy-MM-dd}.log</FileNamePattern>
            <!--只保留最近90天的日志-->
            <maxHistory>90</maxHistory>
            <!--用来指定日志文件的上限大小，那么到了这个值，就会删除旧的日志-->
            <!--<totalSizeCap>1GB</totalSizeCap>-->
        </rollingPolicy>
        <!--日志输出编码格式化-->
        <encoder>
            <charset>UTF-8</charset>
            <pattern>${PATTERN}</pattern>
        </encoder>
    </appender>


    <!--指定最基础的日志输出级别-->
    <root level="DEBUG">
        <!--appender将会添加到这个loger-->
        <appender-ref ref="consoleLog"/>
        <appender-ref ref="fileDEBUGLog"/>
        <appender-ref ref="fileErrorLog"/>
    </root>

    <!--    定义指定package的日志级别-->
    <logger name="org.springframework" level="DEBUG"></logger>
    <logger name="org.mybatis" level="DEBUG"></logger>
    <logger name="java.sql.Connection" level="DEBUG"></logger>
    <logger name="java.sql.Statement" level="DEBUG"></logger>
    <logger name="java.sql.PreparedStatement" level="DEBUG"></logger>
    <logger name="io.lettuce.*" level="INFO"></logger>
    <logger name="io.netty.*" level="ERROR"></logger>
    <logger name="com.rabbitmq.*" level="DEBUG"></logger>
    <logger name="org.springframework.amqp.*" level="DEBUG"></logger>
    <logger name="org.springframework.scheduling.*" level="DEBUG"></logger>
    <!--定义com.xxx..xx..xx包下的日志信息不上传，直接输出到fileDEBUGLog和fileErrorLog这个两个appender中，日志级别为DEBUG-->
    <logger name="com.xxx.xxx.xx"  additivity="false" level="DEBUG">
        <appender-ref ref="fileDEBUGLog"/>
        <appender-ref ref="fileErrorLog"/>
    </logger>

</configuration>
```

当然，如果就不想用Spring Boot推荐的名字，想自己定制也行，只需要在配置文件中指定配置文件名即可，如下：

```properties
logging.config=classpath:logging-config.xml
```

懵逼了，一堆配置什么意思？别着急，下面一一介绍。

### configuration节点

这是一个根节点，其中的各个属性如下：

- scan：当此属性设置为true时，配置文件如果发生改变，将会被重新加载，默认值为true。
- scanPeriod：设置监测配置文件是否有修改的时间间隔，如果没有给出时间单位，默认单位是毫秒。当scan为true时，此属性生效。默认的时间间隔为1分钟。
- debug：当此属性设置为true时，将打印出logback内部日志信息，实时查看logback运行状态。默认值为false。

### root节点

这是一个必须节点，用来指定基础的日志级别，只有一个level属性，默认值是DEBUG。
该节点可以包含零个或者多个元素，子节点是appender-ref，标记这个appender将会添加到这个logger中。

### contextName节点

标识一个上下文名称，默认为default，一般用不到

### property节点

标记一个上下文变量，属性有name和value，定义变量之后可以使用${}来获取。

### appender节点

用来格式化日志输出节点，有两个属性name和class，class用来指定哪种输出策略，常用就是控制台输出策略和文件输出策略。
这个节点很重要，通常的日志文件需要定义三个appender，分别是控制台输出，常规日志文件输出，异常日志文件输出。
该节点有几个重要的子节点，如下：

- filter：日志输出拦截器，没有特殊定制一般使用系统自带的即可，但是如果要将日志分开，比如将ERROR级别的日志输出到一个文件中，将除了ERROR级别的日志输出到另外一个文件中，此时就要拦截ERROR级别的日志了。
- encoder： 和pattern节点组合用于具体输出的日志格式和编码方式。
- file: 节点用来指明日志文件的输出位置，可以是绝对路径也可以是相对路径
- rollingPolicy: 日志回滚策略，在这里我们用了TimeBasedRollingPolicy，基于时间的回滚策略,有以下子节点fileNamePattern，必要节点，可以用来设置指定时间的日志归档。
- maxHistory : 可选节点，控制保留的归档文件的最大数量，超出数量就删除旧文件,，例如设置为30的话，则30天之后，旧的日志就会被删除
- totalSizeCap: 可选节点，用来指定日志文件的上限大小，例如设置为3GB的话，那么到了这个值，就会删除旧的日志

### logger节点

可选节点，用来具体指明包的日志输出级别，它将会覆盖root的输出级别。
该节点有几个重要的属性如下：

- name：指定的包名
- level：可选，日志的级别
- addtivity：可选，默认为true，将此logger的信息向上级传递，将有root节点定义日志打印。如果设置为false，将不会上传，此时需要定义一个appender-ref 节点才会输出。
