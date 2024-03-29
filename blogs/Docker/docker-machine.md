---
title:  Docker Machine 入门
date: 2021-10-03
tags:
 - Docker
categories:
 - 运维
---

[官网]: https://github.com/docker/machine/releases/
[菜鸟教程]: https://www.runoob.com/docker/docker-machine.html
[博客园]: https://www.cnblogs.com/csnd/p/12061830.html

# Docker Machine

## 简介

Docker Machine 是一种可以让您在虚拟主机上安装 Docker 的工具，并可以使用 docker-machine 命令来管理主机。

Docker Machine 也可以集中管理所有的 docker 主机，比如快速的给 100 台服务器安装上 docker。

![img](https://www.runoob.com/wp-content/uploads/2019/11/68747470733a2f2f646f63732e646f636b65722e636f6d2f6d616368696e652f696d672f6c6f676f2e706e67.png)

Docker Machine 管理的虚拟主机可以是机上的，也可以是云供应商，如阿里云，腾讯云，AWS，或 DigitalOcean。

使用 docker-machine 命令，您可以启动，检查，停止和重新启动托管主机，也可以升级 Docker 客户端和守护程序，以及配置 Docker 客户端与您的主机进行通信。

![img](https://www.runoob.com/wp-content/uploads/2019/11/machine.png)

最新版本查询 [https://api.github.com/repos/docker/machine/releases/latest](https://api.github.com/repos/docker/machine/releases/latest)

## 安装

安装 Docker Machine 之前你需要先安装 Docker。

Docker Machine 可以在多种平台上安装使用，包括 Linux 、MacOS 以及 windows。

### Linux 安装命令

```
$ base=https://github.com/docker/machine/releases/download/v0.16.2 &&
  curl -L $base/docker-machine-$(uname -s)-$(uname -m) >/tmp/docker-machine &&
  sudo mv /tmp/docker-machine /usr/local/bin/docker-machine &&
  chmod +x /usr/local/bin/docker-machine
```

### macOS 安装命令

```
$ base=https://github.com/docker/machine/releases/download/v0.16.2 &&
  curl -L $base/docker-machine-$(uname -s)-$(uname -m) >/usr/local/bin/docker-machine &&
  chmod +x /usr/local/bin/docker-machine
```

### Windows 安装命令

如果你是 Windows 平台，可以使用 [Git BASH](https://git-for-windows.github.io/)，并输入以下命令：

```
$ if [[ ! -d "$HOME/bin" ]]; then mkdir -p "$HOME/bin"; fi && \
curl -L https://github.com/docker/machine/releases/download/v0.16.2/docker-machine-Windows-x86_64.exe > "$HOME/bin/docker-machine.exe" && \
chmod +x "$HOME/bin/docker-machine.exe"
```
将 `$HOME/bin/docker-machine.exe` 拷贝到 `C:\Program Files\Docker\Docker\resources\bin` 中

查看是否安装成功：

```
$ docker-machine version
docker-machine version 0.16.2, build bd45ab13
```
## 配置虚拟机保存位置

### Windows

- 添加系统环境
 在Windows的系统环境添加`MACHINE_STORAGE_PATH`，指向虚拟机的位置（例如：`D:\wsl2\docker\vm`）
 复制`boot2docker.iso`
 复制`C:\Users\<User>\.docker\machine\cache\boot2docker.iso`到虚拟机的位置同级目录`cache`上（例如：`D:\wsl2\docker\vm\cache`），如果不是最新的话需要下载[最新](https://api.github.com/repos/boot2docker/boot2docker/releases/latest)。
 ```
 setx /m MACHINE_STORAGE_PATH "D:\wsl2\docker\vm\machines"
 ```

## 使用

本章通过 virtualbox 来介绍 docker-machine 的使用方法。其他云服务商操作与此基本一致。具体可以参考每家服务商的指导文档。

### 1、列出可用的机器

可以看到目前只有这里默认的 default 虚拟机。

```
$ docker-machine ls
```

[![img](https://www.runoob.com/wp-content/uploads/2019/11/docker-machine1.png)](https://www.runoob.com/wp-content/uploads/2019/11/docker-machine1.png)

### 2、创建机器

创建一台名为 test 的机器。

```
$ docker-machine create --driver virtualbox test
```

- **--driver**：指定用来创建机器的驱动类型，这里是 virtualbox。

[![img](https://www.runoob.com/wp-content/uploads/2019/11/docker-machine2.png)](https://www.runoob.com/wp-content/uploads/2019/11/docker-machine2.png)

### 3、查看机器的 ip

```
$ docker-machine ip test
```

[![img](https://www.runoob.com/wp-content/uploads/2019/11/docker-machine3.png)](https://www.runoob.com/wp-content/uploads/2019/11/docker-machine3.png)

### 4、停止机器

```
$ docker-machine stop test
```

[![img](https://www.runoob.com/wp-content/uploads/2019/11/docker-machine4.png)](https://www.runoob.com/wp-content/uploads/2019/11/docker-machine4.png)

### 5、启动机器

```
$ docker-machine start test
```

[![img](https://www.runoob.com/wp-content/uploads/2019/11/docker-machine5.png)](https://www.runoob.com/wp-content/uploads/2019/11/docker-machine5.png)

### 6、进入机器

```
$ docker-machine ssh test
```

[![img](https://www.runoob.com/wp-content/uploads/2019/11/docker-machine6.png)](https://www.runoob.com/wp-content/uploads/2019/11/docker-machine6.png)

### docker-machine 命令参数说明

- **docker-machine active**：查看当前激活状态的 Docker 主机。

  ```
  $ docker-machine ls
  
  NAME      ACTIVE   DRIVER         STATE     URL
  dev       -        virtualbox     Running   tcp://192.168.99.103:2376
  staging   *        digitalocean   Running   tcp://203.0.113.81:2376
  
  $ echo $DOCKER_HOST
  tcp://203.0.113.81:2376
  
  $ docker-machine active
  staging
  ```

- **config**：查看当前激活状态 Docker 主机的连接信息。

- **create**：创建 Docker 主机

- **env**：显示连接到某个主机需要的环境变量

- **inspect**： 以 json 格式输出指定Docker的详细信息

- **ip**： 获取指定 Docker 主机的地址

- **kill**： 直接杀死指定的 Docker 主机

- **ls**： 列出所有的管理主机

- **provision**： 重新配置指定主机

- **regenerate-certs**： 为某个主机重新生成 TLS 信息

- **restart**： 重启指定的主机

- **rm**： 删除某台 Docker 主机，对应的虚拟机也会被删除

- **ssh**： 通过 SSH 连接到主机上，执行命令

- **scp**： 在 Docker 主机之间以及 Docker 主机和本地主机之间通过 scp 远程复制数据

- **mount**： 使用 SSHFS 从计算机装载或卸载目录

- **start**： 启动一个指定的 Docker 主机，如果对象是个虚拟机，该虚拟机将被启动

- **status**： 获取指定 Docker 主机的状态(包括：Running、Paused、Saved、Stopped、Stopping、Starting、Error)等

- **stop**： 停止一个指定的 Docker 主机

- **upgrade**： 将一个指定主机的 Docker 版本更新为最新

- **url**： 获取指定 Docker 主机的监听 URL

- **version**： 显示 Docker Machine 的版本或者主机 Docker 版本

- **help**： 显示帮助信息


## docker-machine 常用命令

|命令|说明|
|:---:|:---:|
|docker-machine create|创建一个 Docker 主机（常用`-d virtualbox`）|
|docker-machine ls|查看所有的 Docker 主机|
|docker-machine ssh|SSH 到主机上执行命令|
|docker-machine env|显示连接到某个主机需要的环境变量|
|docker-machine inspect|输出主机更多信息|
|docker-machine kill|停止某个主机|
|docker-machine restart|重启某台主机|
|docker-machine rm|删除某台主机|
|docker-machine scp|在主机之间复制文件|
|docker-machine start|启动一个主机|
|docker-machine status|查看主机状态|
|docker-machine stop|停止一个主机|