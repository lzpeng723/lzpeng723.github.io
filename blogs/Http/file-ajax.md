---
title: file:// 协议真的不能发送 ajax 请求吗
date: 2022-01-06
tags:
  - http
categories:
  - 前端
---

通常情况下如果file://协议打开文件，在使用ajax请求时会出现如下错误

Access to XMLHttpRequest at 'file:///E:/JavaProject/imooc/src/main/resources/resources/json/mianfei.json' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome-extension, edge, https, chrome-untrusted.

那么如何解决呢？

## 1 修改浏览器启动参数

解决办法是给chrome添加启动参数：--allow-file-access-from-files ，这样本地ajax请求就不会报跨域错误了。（注意如果给chrome添加多个启动参数，每个启动参数“--”之前要有空格隔开，如"C:\ProgramFiles\Google\Chrome\Application\chrome.exe" --allow-file-access-from-files）

具体方法：在浏览器快捷方式上右键-属性-快捷方式-目标

比如我这里是

"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --allow-file-access-from-files -- "%1"

## ~~2 安装插件 Allow CORS: Access-Control-Allow-Origin~~

[Edge 版](https://microsoftedge.microsoft.com/addons/detail/allow-cors-accesscontro/bhjepjpgngghppolkjdhckmnfphffdag?hl=zh-CN)


[Chrome 版](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=zh-CN)

## 3 修改注册表

修改注册表：
`HKEY_CLASSES_ROOT\ChromeHTML\shell\open\command`
修改为：
`"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --allow-file-access-from-files -- "%1"`

