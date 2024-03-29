---
title: SpringBoot 读取配置
date: 2021-09-21
tags:
 - SpringBoot
categories:
 -  后端
---
[参考链接]: https://juejin.im/post/6876791526412779528

## 前言

自从用了Spring Boot，个人最喜欢的就是Spring Boot的配置文件了，和Spring比起，Spring Boot更加灵活，修改的某些配置也是更加得心应手。
Spring Boot 官方提供了两种常用的配置文件格式，分别是```properties```、```yaml```格式。相比于```properties```来说，```yaml```更加年轻，层级也是更加分明。
今天这篇文章就来介绍一下Spring Boot的配置文件的语法以及如何从配置文件中取值。

## properties格式简介

常见的一种配置文件格式，Spring中也是用这种格式，语法结构很简单，结构为：```key=value```。具体如下：

```properties
userinfo.name=myjszl
userinfo.age=25
userinfo.active=true
userinfo.created-date=2018/03/31 16:54:30
userinfo.map.k1=v1
userinfo.map.k2=v2
```

上述配置文件中对应的实体类如下：

```java
@Data
@ToString
public class UserInfo {
    private String name;
    private Integer age;
    private Boolean active;
    private Map<String,Object> map;
    private Date createdDate;
    private List<String> hobbies;
}
```

结构很简单，无非就是```key=value```这种形式，也是在开发中用的比较多的一种格式。

## YML格式简介

以空格的缩进程度来控制层级关系。空格的个数并不重要，只要左边空格对齐则视为同一个层级。注意不能用```tab```代替空格。且大小写敏感。支持字面值，对象，数组三种数据结构，也支持复合结构。
字面值：字符串，布尔类型，数值，日期。字符串默认不加引号，单引号会转义特殊字符。日期格式支持```yyyy/MM/dd HH:mm:ss```
对象：由键值对组成，形如 key:(空格)value 的数据组成。冒号后面的空格是必须要有的，每组键值对占用一行，且缩进的程度要一致，也可以使用行内写法：```{k1: v1, ....kn: vn}```
数组：由形如 -(空格)value 的数据组成。短横线后面的空格是必须要有的，每组数据占用一行，且缩进的程度要一致，也可以使用行内写法：```[1,2,...n]```
复合结构：上面三种数据结构任意组合

### 如何使用
在src/resources文件夹下创建一个```application.yml```文件。支持的类型主要有字符串，带特殊字符的字符串，布尔类型，数值，集合，行内集合，行内对象，集合对象这几种常用的数据格式。

具体的示例如下：

```yaml
userinfo:
    age: 25
    name: myjszl
    active: true
    created-date: 2018/03/31 16:54:30
    map: {k1: v1,k2: v2}
    hobbies:
      - one
      - two
      - three
```

上述配置文件对应的实体类如下：

```java
@Data
@ToString
public class UserInfo {
    private String name;
    private Integer age;
    private Boolean active;
    private Map<String,Object> map;
    private Date createdDate;
    private List<String> hobbies;
}
```

### 总结

YML是一种新式的格式，层级鲜明，个人比较喜欢使用的一种格式，注意如下：

- 字符串可以不加引号，若加双引号则输出特殊字符，若不加或加单引号则转义特殊字符
- 数组类型，短横线后面要有空格；对象类型，冒号后面要有空格
- YAML是以空格缩进的程度来控制层级关系，但不能用tab键代替空格，大小写敏感

## 如何从配置文件取值？

一切的配置都是为了取值，Spring Boot也是提供了几种取值的方式，下面一一介绍。

### @ConfigurationProperties

@ConfigurationProperties注解能够很轻松的从配置文件中取值，优点如下：

#### 标注在实体类上

这种方式用于从实体类上取值，并且赋值到对应的属性。使用如下：

```java
/**
 * @Component ：注入到IOC容器中
 * @ConfigurationProperties：从配置文件中读取文件
 */
@Component
@ConfigurationProperties(prefix = "userinfo")
@Data
@ToString
public class UserInfo {
    private String name;
    private Integer age;
    private Boolean active;
    private Map<String,Object> map;
    private Date createdDate;
    private List<String> hobbies;
}
```

#### 标注在配置类中的方法上

标注在配置类上的方法上，同样是从配置文件中取值赋值到返回值的属性中。使用如下：

```java
/**
 * @Bean : 将返回的结果注入到IOC容器中
 * @ConfigurationProperties ：从配置文件中取值
 * @return
 */
@ConfigurationProperties(prefix = "userinfo")
@Bean
public UserInfo userInfo(){
    return new UserInfo();
}
```

#### 总结

```@ConfigurationProperties```注解能够很轻松的从配置文件中取值，优点如下：

- 支持批量的注入属性，只需要指定一个前缀prefix
- 支持复杂的数据类型，比如List、Map
- 对属性名匹配的要求较低，比如user-name，user_name，userName，USER_NAME都可以取值
- 支持JAVA的JSR303数据校验

注意：```@ConfigurationProperties```这个注解仅仅是支持从Spring Boot的默认配置文件中取值，比如```application.properties```、```application.yml```。

### @Value

@Value这个注解估计很熟悉了，Spring中从属性取值的注解，支持SPEL表达式，不支持复杂的数据类型，比如List。使用如下：

```java
    @Value("${userinfo.name}")
    private String UserName;
```

## 如何从自定义配置文件中取值？

Spring Boot在启动的时候会自动加载```application.xxx```和```bootsrap.xxx```，但是为了区分，有时候需要自定义一个配置文件，那么如何从自定义的配置文件中取值呢？此时就需要配合```@PropertySource```这个注解使用了。

### @PropertySource

只需要在配置类上标注```@PropertySource```并指定你自定义的配置文件即可完成。如下：

```java
@SpringBootApplication
@PropertySource(value = {"classpath:custom.properties"})
public class DemoApplication {
}
```

value属性是一个数组，可以指定多个配置文件同时引入。
```@PropertySourc```e默认加载```xxx.properties```类型的配置文件，不能加载YML格式的配置文件，怎么破？？？

### 如何加载自定义YML格式的配置文件？

只需要在配置类上标注@PropertySource并指定你自定义的配置文件即可完成。
value属性是一个数组，可以指定多个配置文件同时引入。

```@PropertySource```注解有一个属性```factory```，默认值是```PropertySourceFactory.class```，这个就是用来加载properties格式的配置文件，我们可以自定义一个用来加载YML格式的配置文件，如下：

```java
import org.springframework.beans.factory.config.YamlPropertiesFactoryBean;
import org.springframework.core.env.PropertiesPropertySource;
import org.springframework.core.env.PropertySource;
import org.springframework.core.io.support.DefaultPropertySourceFactory;
import org.springframework.core.io.support.EncodedResource;

import java.io.IOException;
import java.util.Properties;

public class YmlConfigFactory extends DefaultPropertySourceFactory {
    @Override
    public PropertySource<?> createPropertySource(String name, EncodedResource resource) throws IOException {
        String sourceName = name != null ? name : resource.getResource().getFilename();
        if (!resource.getResource().exists()) {
            return new PropertiesPropertySource(sourceName, new Properties());
        } else if (sourceName.endsWith(".yml") || sourceName.endsWith(".yaml")) {
            Properties propertiesFromYaml = loadYml(resource);
            return new PropertiesPropertySource(sourceName, propertiesFromYaml);
        } else {
            return super.createPropertySource(name, resource);
        }
    }

    private Properties loadYml(EncodedResource resource) throws IOException {
        YamlPropertiesFactoryBean factory = new YamlPropertiesFactoryBean();
        factory.setResources(resource.getResource());
        factory.afterPropertiesSet();
        return factory.getObject();
    }

}
```

此时只需要将factory属性指定为YmlConfigFactory即可，如下：

```java
@SpringBootApplication
@PropertySource(value = {"classpath:custom.yml"},factory = YmlConfigFactory.class)
public class DemoApplication {
}
```

### 总结

```@PropertySource```指定加载自定义的配置文件，默认只能加载```properties```格式，但是可以指定```factory```属性来加载```yaml```格式的配置文件。

## 总结

以上内容介绍了Spring Boot中的配置文件的语法以及如何从配置文件中取值，这个内容很重要，作者也是尽可能讲的通俗易懂，希望读者能够有所收获。
