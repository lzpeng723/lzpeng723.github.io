---
title: 快速了解
date: 2020-05-29
---

# 快速了解
# <div style="text-align: center;">MINIMAL-CLOUD 后台管理系统(微服务版)</div>
## 系统模块
~~~
com.lzpeng.minimal     
├── minimal-admin           // 监控中心 [端口]           
├── minimal-common          // 通用模块
│       └── minimal-common-core                         // 核心模块
│       └── minimal-common-jpa                          // JPA模块
│       └── minimal-common-log                          // 日志记录
│       └── minimal-common-security                     // 安全模块
│       └── minimal-common-swagger                      // 系统接口
├── minimal-gateway         // 网关模块 [8888]
├── minimal-generate        // 代码生成模块
│       └── minimal-generate-core                        // 代码生成核心模块
│       └── minimal-generate-jpa                         // 代码生成JPA模块
├── minimal-modules         // 业务模块
│       └── minimal-system                               // 系统管理模块 [9201]
│       └── minimal-tool                                 // 服务工具平台 [9202]
├──pom.xml                 // 公共依赖
~~~

## 架构图

<img src="#"/>

## 内置功能

- 登录 / 认证授权

- 系统管理
  - 用户管理(用户是系统的核心)
  - 角色管理(角色是连接用户和权限(菜单)的桥梁)
  - 菜单管理(树形结构展示菜单,支持菜单组、菜单、按钮级权限)
  - 部门管理(用户的组织架构)
  - 岗位管理(用户的职责)
  - ~~通知管理(发送通知,待办)~~

- 系统监控
  - 定时任务(支持Java类任务, Rhino脚本任务, Nashorn脚本任务,后续支持Rest请求，SQL脚本任务)
  - 数据监控(监控SQL语句执行时间,执行时长,找出性能瓶颈)
  - 服务监控(查看服务器的cpu,内存,jvm,硬盘等信息)
  - 日志管理
     - 请求日志(记录用户发送后台请求)
     - 方法日志(记录方法执行日志)
     - 后台日志(查看并下载服务器日志)

- 系统工具
  - 组件查看(可以在不配置路由的情况下预览自己新建的Vue组件)
  - 图标查看(查看项目内的所有图标)
  - 表单构建(快速构建Vue组件)
  - 数据字典(查看项目中所用到的实体,表以及字段详细信息)
  - 代码生成配置(生成代码所用的模板,在数据字典的详情界面进行代码生成操作)
  - 类加载信息(查看类或bean的加载信息)
  - 查询分析器(可执行sql,jpql,rhino,nashron,id查表名,实体查表名,显示表定义,显示所有表等)
  - 系统接口(查看系统所有API接口)