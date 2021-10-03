---
title:  Docker 网络模式
date: 2021-09-27
tags:
 - Docker
categories:
 - 运维
---


## Docker 网络模式

当你安装完Docker时，它会自动创建三个网络。你可以使用以下docker network ls命令列出这些网络：

```
docker network ls
```

结果如下

|NETWORK ID|NAME|DRIVER|SCOPE|
|:---:|:---:|:---:|:---:|
|bc8c3c05e4ab|bridge|bridge|local|
|f8d96ed1b4cb|host|host|local|
|8871f5273fb0|none|null|local|

Docker内置这三个网络，运行容器时，你可以使用该来指定容器应连接到哪些网络。
我们在使用```docker run```创建Docker容器时，可以用```--network```标志 选项指定容器的网络模式，Docker有以下4种网络模式：
- host模式：使用 ```--net=host``` 指定。
- none模式：使用 ```--net=none``` 指定。
- bridge模式：使用 ```--net=bridge``` 指定，默认设置。
- container模式：使用 ```--net=container:NAME_or_ID``` 指定。


### 1. host模式

众所周知，Docker使用了Linux的Namespaces技术来进行资源隔离，如PID Namespace隔离进程，Mount Namespace隔离文件系统，Network Namespace隔离网络等。一个Network Namespace提供了一份独立的网络环境，包括网卡、路由、Iptable规则等都与其他的Network Namespace隔离。一个Docker容器一般会分配一个独立的Network Namespace。但如果启动容器的时候使用host模式，那么这个容器将不会获得一个独立的Network Namespace，而是和宿主机共用一个Network Namespace。容器将不会虚拟出自己的网卡，配置自己的IP等，而是使用宿主机的IP和端口。
例如，我们在10.10.101.105/24的机器上用host模式启动一个含有web应用的Docker容器，监听tcp80端口。当我们在容器中执行任何类似ifconfig命令查看网络环境时，看到的都是宿主机上的信息。而外界访问容器中的应用，则直接使用10.10.101.105:80即可，不用任何NAT转换，就如直接跑在宿主机中一样。但是，容器的其他方面，如文件系统、进程列表等还是和宿主机隔离的。

### 2. container模式

在理解了host模式后，这个模式也就好理解了。这个模式指定新创建的容器和已经存在的一个容器共享一个Network Namespace，而不是和宿主机共享。新创建的容器不会创建自己的网卡，配置自己的IP，而是和一个指定的容器共享IP、端口范围等。同样，两个容器除了网络方面，其他的如文件系统、进程列表等还是隔离的。两个容器的进程可以通过lo网卡设备通信。

### 3. none模式

这个模式和前两个不同。在这种模式下，Docker容器拥有自己的Network Namespace，但是，并不为Docker容器进行任何网络配置。也就是说，这个Docker容器没有网卡、IP、路由等信息。需要我们自己为Docker容器添加网卡、配置IP等。

### 4. bridge模式

bridge模式是Docker默认的网络设置，此模式会为每一个容器分配Network Namespace、设置IP等，并将一个主机上的Docker容器连接到一个虚拟网桥上。下面着重介绍一下此模式。


### 5. 相关命令

```
# 连接网络
docker network connect custom_network bbox01
# 断开连接网络
docker network disconnect custom_network bbox01
# 删除网络
docker network rm custom_network
```

## 自定义网络

使用 busybox 测试容器连通性

:::tip
BusyBox 是一个集成了一百多个最常用 Linux 命令和工具（如 cat、echo、grep、mount、telnet 、ping、ifconfig 等）的精简工具箱，它只需要几 MB 的大小，很方便进行各种快速验证，被誉为“Linux 系统的瑞士军刀”。
:::

启动 bbox01, bbox02

```
docker run -it --name bbox01 busybox
docker run -it --name bbox02 busybox
```

发现通过 ```ping ip``` 是可以通的，但是容器每次重启ip都会发生变化，此时就不能使用ip进行通信了，需要使用容器名称进行通信，下面开始自定义网络使用容器名称进行通信。

```
docker network --help
docker network create --help
docker network create custom_network
docker network ls
docker run -it --name bbox01 --network custom_network busybox
docker run -it --name bbox02 --network custom_network busybox
```

此时通过ping容器名称就可以ping通了