---
title: OpenSSL 生成证书
date: 2022-07-19
tags:
 - http
categories:
 - 网络
---

## OpenSSL 生成证书

## OpenSSL 下载

步骤：
1. 安装 OpenSSL
   下载地址：[http://slproweb.com/products/Win32OpenSSL.html](http://slproweb.com/products/Win32OpenSSL.html) （根据系统选择32位或者64位版本下载安装）。
   下载完成后，进行安装，我安装在了 ```D:\Program Files\OpenSSL-Win64```文件夹中。
2. 配置环境变量
   在环境变量中添加环境变量
   变量名： ```OPENSSL_HOME ```,变量值：```D:\Program Files\OpenSSL-Win64``` 变量值为 OpenSSL 安装位置）
   在```Path``` 变量结尾添加如下  ```%OPENSSL_HOME%\bin;```

## 生成证书

1. 创建私钥
   在命令行中执行命令： ```openssl genrsa -des3 -out integrator.key 1024```（integrator文件名可以自定义）
   输入密码后，再次重复输入确认密码。记住此密码，后面会用到。
2. 创建csr证书
   在命令行中执行命令：```openssl req -new -key integrator.key -out integrator.csr```（key文件为刚才生成的文件，integrator为自定义文件名）
   
   会提示输入server.key的密码
   
   开始输入Country Name：CN
   
   State or Province Name：SH
   
   Locality Name：shanghai
   
   Organization Name：这个可以忽略
   
   Organizational Unit Name：这个可以忽略
   
   Common Name：这个可以忽略
   
   Email Address：填写一个非QQ的邮箱地址

   以上步骤完成后，ssl文件夹内出现两个文件
   
3. 去除密码。
   在加载SSL支持的Nginx并使用上述私钥时除去必须的口令，否则会在启动nginx的时候需要输入密码。
   复制```integrator.key```并重命名为```integrator.key.org```
   可以使用此命令行，也可以使用鼠标操作 ```copy integrator.key integrator.key.org```
   去除口令，在命令行中执行此命令： ```openssl rsa -in integrator.key.org -out integrator.key``` （integrator为自定义文件名）
4. 生成crt证书
   在命令行中执行此命令： ```openssl x509 -req -days 3650 -in integrator.csr -signkey integrator.key -out integrator.crt```  （integrator为自定义文件名）
   证书生成完毕，ssl文件夹中一共生成如下4个文件，我们需要使用到的是```integrator.crt```和```integrator.key```。
