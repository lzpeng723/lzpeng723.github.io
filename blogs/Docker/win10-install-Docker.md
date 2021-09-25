---
title:  win10家庭版安装Docker for Windows
date: 2021-09-25
tags:
 - Docker
categories:
 - 运维
---

## 伪装成win10专业版

以管理员身份打开cmd。
执行如下命令：

```batch
REG ADD "HKEY_LOCAL_MACHINE\software\Microsoft\Windows NT\CurrentVersion" /v EditionId /T REG_EXPAND_SZ /d Professional /F
```

## 开启Hyper-V

### 一、如果Hyper-V完全禁用或未安装

新建hyperv.cmd文件，内容如下：

```batch
pushd "%~dp0"

dir /b %SystemRoot%\servicing\Packages\*Hyper-V*.mum >hyper-v.txt

for /f %%i in ('findstr /i . hyper-v.txt 2^>nul') do dism /online /norestart /add-package:"%SystemRoot%\servicing\Packages\%%i"

del hyper-v.txt

Dism /online /enable-feature /featurename:Microsoft-Hyper-V-All /LimitAccess /ALL
```

以管理员身份执行```hyperv.cmd```文件。
如果系统要你重启，便重启。
在控制面板->程序和功能->启用或关闭Windows功能打开Hyper-V。

### 二、如果已启用Hyper-V功能但不起作用

使用Hypervisor启用

```batch
bcdedit /set hypervisorlaunchtype auto
```

现在重新启动系统，然后重试。

如果问题仍然存在，则系统上的Hyper-V可能已损坏，因此进入控制面板 - > [程序] - > [Windows功能]，完全取消选中所有与Hyper-V相关的组件，重启系统。
再次启用Hyper-V，重新开始。

## 注意


Hyper-V需要硬件虚拟化作为先决条件。确保您的PC支持它，如果是，但仍然无法正常工作，可能是您的BIOS未正确配置且此功能已禁用。在这种情况下，请检查，启用它并重试。根据所使用的平台，可以根据不同的名称报告虚拟化功能（例如，如果您没有看到明确使用虚拟化标签的任何选项，则必须在Intel上检查SVM功能状态，在VT-x功能状态下）。

Hyper-V 只能安装某些版本，例如：
Windows 10企业版; Windows 10专业版; Windows 10教育。
Hyper-V 无法安装在更便宜或移动的Windows版本上，例如：
Windows 10 Home; Windows 10移动版; Windows 10移动企业版。

## 安装Docker Desktop

[下载地址](https://www.docker.com/products/docker-desktop)

下载后直接安装，安装时注意取消勾选window容器（默认不会勾选）。
Docker安装成功后，执行cmd命令```docker version```。

### 配置镜像加速

阿里云的加速器：https://<你的ID>.mirror.aliyuncs.com [申请地址](https://help.aliyun.com/document_detail/60750.html)

网易加速器：http://hub-mirror.c.163.com

官方中国加速器：https://registry.docker-cn.com

七牛云加速器：https://reg-mirror.qiniu.com

科大镜像(ustc) 的镜像：https://docker.mirrors.ustc.edu.cn

daocloud：https://www.daocloud.io/mirror#accelerator-doc（注册后使用）


```json
"registry-mirrors":  [
    "http://hub-mirror.c.163.com",
    "https://docker.mirrors.ustc.edu.cn",
    "https://registry.docker-cn.com",
    "https://reg-mirror.qiniu.com"
]
```

### 运行个 Hello World 尝尝鲜

```
docker run hello-world
```

### docker for windows could not read CA certificate问题

问题原因: 之前安装过 docker toolbox。

解决步骤: 
- 删掉四个docker 的环境变量
- 执行cmd命令```docker-machine rm default```
- 以管理员身份执行cmd命令```@FOR /f "tokens=*" %i IN ('docker-machine env -u') DO @%i```

## 最后

好了，Docker 安装完毕，开始愉快的学习 Docker 吧，[Docker学习教程](https://www.runoob.com/docker)。
