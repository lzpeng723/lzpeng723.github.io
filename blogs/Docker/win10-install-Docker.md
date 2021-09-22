---
title:  win10家庭版安装Docker for Windows
date: 2021-09-21
tags:
 - Docker
categories:
 - 运维
---

## 开启Hyper-V

新建hyperv.cmd文件，内容如下：

```cmd
pushd "%~dp0"

dir /b %SystemRoot%\servicing\Packages\*Hyper-V*.mum >hyper-v.txt

for /f %%i in ('findstr /i . hyper-v.txt 2^>nul') do dism /online /norestart /add-package:"%SystemRoot%\servicing\Packages\%%i"

del hyper-v.txt

Dism /online /enable-feature /featurename:Microsoft-Hyper-V-All /LimitAccess /ALL
```

以管理员身份执行```hyperv.cmd```文件。
如果系统要你重启，便重启。
在控制面板->程序和功能->启用或关闭Windows功能打开Hyper-V。

## 伪装成win10专业版

以管理员身份打开cmd。
执行如下命令：

```
REG ADD "HKEY_LOCAL_MACHINE\software\Microsoft\Windows NT\CurrentVersion" /v EditionId /T REG_EXPAND_SZ /d Professional /F
```

## 下载Docker Desktop

[下载地址](https://www.docker.com/products/docker-desktop)

下载后直接安装，安装时注意取消勾选window容器（默认不会勾选）。
Docker安装成功后，执行cmd命令```docker version```。

#### docker for windows could not read CA certificate问题

问题原因: 之前安装过 docker toolbox。

解决步骤: 
- 删掉四个docker 的环境变量
- 执行cmd命令```docker-machine rm default```
- 以管理员身份执行cmd命令```@FOR /f "tokens=*" %i IN ('docker-machine env -u') DO @%i```
