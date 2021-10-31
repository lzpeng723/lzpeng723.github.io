---
title:  Docker Swarm 入门
date: 2021-10-03
tags:
 - Docker
categories:
 - 运维
---

[参考链接]: https://www.cnblogs.com/xishuai/p/docker-swarm.html
[参考链接]: https://www.jianshu.com/p/9eb9995884a5
[官网]: https://docs.docker.com/engine/swarm/

# Docker Swarm

[Docker Swarm](https://docs.docker.com/engine/swarm/) 和 Docker Compose 一样，都是 Docker 官方容器编排项目，但不同的是，Docker Compose 是一个在单个服务器或主机上创建多个容器的工具，而 Docker Swarm 则可以在多个服务器或主机上创建容器集群服务，对于微服务的部署，显然 Docker Swarm 会更加适合。

从 Docker 1.12.0 版本开始，Docker Swarm 已经包含在 Docker 引擎中（`docker swarm`），并且已经内置了服务发现工具，我们就不需要像之前一样，再配置 Etcd 或者 Consul 来进行服务发现配置了。

:::tip
注： 若是winows系统，本章节命令必须在管理员下运行
:::

## 1. Docker Machine 创建 Docker 主机

在进行 Docker Swarm 配置之前，我们还需要说下 Docker 另外一个官方工具 Docker Machine，其作用就是快速帮助我们搭建 Docker 主机环境，比如我们要使用 Docker Swarm，就必须有很多的 Docker 主机来进行操作，Docker Machine 就是最理想的工具。

首先进行[安装 Docker Machine](./docker-machine.html)。

我们先使用 Docker Machine 创建四个 Docker 主机，命令：

```
docker-machine create --driver hyperv --hyperv-virtual-switch=docker manager1 && \
docker-machine create --driver hyperv --hyperv-virtual-switch=docker manager2 && \
docker-machine create --driver hyperv --hyperv-virtual-switch=docker worker1 && \
docker-machine create --driver hyperv --hyperv-virtual-switch=docker worker2
```

执行上面命令，你会发现速度巨慢（如上），原因是从 GitHub 上下载一个`boot2docker.iso`文件（国内网络没办法），怎么解决呢？很简单，我们使用翻X的浏览器手动下载`boot2docker.iso`文件，然后拷贝到对应目录下（我电脑的目录`C:/Users/ThinkPad/.docker/machine/cache`），然后再执行上面的命令，发现速度快的一批。

我们可以查看下创建的 Docker 主机信息，命令：

```
docker-machine ls
NAME       ACTIVE   DRIVER   STATE     URL                       SWARM   DOCKER      ERRORS
manager1   -        hyperv   Running   tcp://192.168.1.10:2376           v19.03.12
manager2   -        hyperv   Running   tcp://192.168.1.11:2376           v19.03.12
worker1    -        hyperv   Running   tcp://192.168.1.12:2376           v19.03.12
worker2    -        hyperv   Running   tcp://192.168.1.13:2376           v19.03.12
```

可以看到，我们创建了四个 Docker 主机（两个 Manager 和两个 Worker），我们还可以连接到任何一台服务器进行操作，命令：

```
docker-machine ssh manager1
```

### 可能遇到的问题

#### 卡在 Waiting for SSH to be available...

```
Running pre-create checks...
(manager1) Unable to get the latest Boot2Docker ISO release version:  Get https://api.github.com/repos/boot2docker/boot2docker/releases/latest: dial tcp: lookup api.github.com: no such host
Creating machine...
(manager1) Unable to get the latest Boot2Docker ISO release version:  Get https://api.github.com/repos/boot2docker/boot2docker/releases/latest: dial tcp: lookup api.github.com: no such host
(manager1) Copying D:\wsl2\docker\vm\cache\boot2docker.iso to D:\wsl2\docker\vm\machines\manager1\boot2docker.iso...
(manager1) Creating SSH key...
(manager1) Creating VM...
(manager1) Using switch "docker"
(manager1) Creating VHD
(manager1) Starting VM...
(manager1) Waiting for host to start...
Waiting for machine to be running, this may take a few minutes...
Detecting operating system of created instance...
Waiting for SSH to be available...
```

解决方案见[StackOverflow](https://stackoverflow.com/questions/56792664/docker-desktop-windows-10-waiting-for-ssh-to-be-available-certificate-signe)
只需要在创建虚拟机时增加参数`--native-ssh`

```
docker-machine --native-ssh create --driver hyperv --hyperv-virtual-switch=docker manager1 && \
docker-machine --native-ssh create --driver hyperv --hyperv-virtual-switch=docker manager2 && \
docker-machine --native-ssh create --driver hyperv --hyperv-virtual-switch=docker worker1 && \
docker-machine --native-ssh create --driver hyperv --hyperv-virtual-switch=docker worker2
```

## 2. Docker Swarm 配置集群节点

我们执行下面命令：

```
$ docker-machine ssh manager1 "docker swarm init --advertise-addr 192.168.1.10"
Swarm initialized: current node (c6kj4t51l0nzoq3u29pqxiuv6) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-5irhzlufi8nmuj26f61wkuobo46t20uja1igmkbe1rsc9g1c9w-1ucldja96grjps4rxkevrwghb 192.168.1.10:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```

上面是在manager1主机上，创建一个 Docker Swarm 管理节点（初始化集群的时候，会自动把当前节点设置为管理节点）。

接着，我们在worker1和worker2主机上，创建两个工作节点，并加入到集群中，命令：

```
$ docker-machine ssh worker1 "docker swarm join --token SWMTKN-1-5irhzlufi8nmuj26f61wkuobo46t20uja1igmkbe1rsc9g1c9w-1ucldja96grjps4rxkevrwghb 192.168.1.10:2377"
This node joined a swarm as a worker.

$ docker-machine ssh worker2 "docker swarm join --token SWMTKN-1-5irhzlufi8nmuj26f61wkuobo46t20uja1igmkbe1rsc9g1c9w-1ucldja96grjps4rxkevrwghb 192.168.1.10:2377"
This node joined a swarm as a worker.
```

还有另外一个manager2主机，需要配置为管理节点，我们需要先在manager1主机上，获取管理节点对应的token，然后再配置为管理节点，命令：

```
$ docker-machine ssh manager1 "docker swarm join-token manager"
To add a manager to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-5irhzlufi8nmuj26f61wkuobo46t20uja1igmkbe1rsc9g1c9w-6y84dxjfk3oo38honys4sjmbr 192.168.1.10:2377

$ docker-machine ssh manager2 "docker swarm join --token SWMTKN-1-5irhzlufi8nmuj26f61wkuobo46t20uja1igmkbe1rsc9g1c9w-6y84dxjfk3oo38honys4sjmbr 192.168.1.10:2377"
This node joined a swarm as a manager.
```

配置好之后，我们进入manager1主机内（上面的命令也可以在主机内执行），然后查看集群节点的信息，命令：

```
$ docker-machine ssh manager1 "docker node ls"
ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
c6kj4t51l0nzoq3u29pqxiuv6 *   manager1            Ready               Active              Leader              19.03.12
aynl204ef7bwv8dwmaqfjhh12     manager2            Ready               Active              Reachable           19.03.12
zi0z09j4mm9ny727i8btqfh92     worker1             Ready               Active                                  19.03.12
j44vqncnpt8ztw4z379zgw5a5     worker2             Ready               Active                                  19.03.12
```

Leader表示当然集群的头，Reachable可以理解为头的候选人，头一挂掉它就顶上去了。

需要注意的是，我当天配置好之后，把所有的 Docker 主机都stop了，然后隔天重新start之后，出现了下面问题：

```
docker node ls
Error response from daemon: rpc error: code = Unknown desc = The swarm does not have a leader. It's possible that too few managers are online. Make sure more than half of the managers are online.
```

好像是集群节点丢失了头，相关问题：[如何处理 docker swarm 集群"The swarm does not have a leader"问题](https://q.cnblogs.com/q/96996/)，按照文章进行解决：

```
$ docker swarm init --force-new-cluster
Error response from daemon: could not choose an IP address to advertise since this system has multiple addresses on different interfaces (10.0.2.15 on eth0 and 192.168.1.10 on eth1) - specify one with --advertise-addr
$ docker swarm init --force-new-cluster --advertise-addr 192.168.1.10
Error response from daemon: This node is not a swarm manager. Worker nodes can't be used to view or modify cluster state. Please run this command on a manager node or promote the current node to a manager.
$ docker node ls
# 卡死
$ docker-machine restart manager1 
```

重启不了，一直转圈
没办法，后来我只能删掉四个 Docker 主机，重新进行创建了。

## 3. Docker Service 部署单个集群服务

上面比较啰嗦，我们接下来正式部署集群服务，拿nginx镜像做为示例，命令（`docker service create`命令[详细说明](https://docs.docker.com/engine/reference/commandline/service_create/)）:

```
docker service create --replicas 4 -p 8088:80 --name nginx nginx:alpine
```

需要注意的是，`--replicas 4`表示创建服务的实例个数（默认是一个），啥意思？比如4，就是在四个 Docker 主机上，分别创建一个nginx服务，如果是3，那就是三个 Docker 主机，或者你可以理解为 Docker 主机的个数，另外，REPLICAS会有进度显示，并且执行是异步的。

我们也可以手动设置实例个数，命令：

```
$ docker service scale nginx=4
```

部署好服务后，我们就可以进行查看了，命令：

```
$ docker service ls
ID                  NAME                MODE                REPLICAS            ID                  NAME                MODE                REPLICAS            IMAGE               PORTS
ucymevu7jvds        nginx               replicated          4/4                 nginx:alpine        *:8088->80/tcp

$ docker service ps nginx
ID                  NAME                IMAGE               NODE                DESIRED STATE       CURRENT STATE           ERROR               PORTS
wikk1lrjvb62        nginx.1             nginx:alpine        manager1            Running             Running 2 minutes ago
54a8tgw3q47y        nginx.2             nginx:alpine        worker1             Running             Running 2 minutes ago
eu4yk2n33zm4        nginx.3             nginx:alpine        worker2             Running             Running 2 minutes ago
8bdu0zwut54q        nginx.4             nginx:alpine        manager2            Running             Running 2 minutes ago
```

我们任意使用四个 Docker 主机中的一个 IP 地址，浏览器打开：[http://192.168.1.10:8088/](http://192.168.1.10:8088/),即可看到nginx服务正在运行

## 4. 集散集群

```
docker swarm leave --force
```

## 5. Docker Stack 部署多个集群服务，以及 GUI 管理页面

docker service部署的是单个服务，我们可以使用`docker stack`进行多服务编排部署，使用的同样是`docker-compose.yml`配置文件，示例：

```yaml
version: "3"

services:
  nginx:
    image: nginx:latest
    ports:
      - 8088:80
    deploy:
      mode: replicated
      replicas: 4

  visualizer:
    image: dockersamples/visualizer:latest
    ports:
      - "8080:8080"
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"
    deploy:
      replicas: 1
      placement:
        constraints: [node.role == manager]

  portainer:
    image: portainer/portainer:latest
    ports:
      - "9000:9000"
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"
    deploy:
      replicas: 1
      placement:
        constraints: [node.role == manager]
```

如上所示，我们总共需要部署三个服务，出了nginx服务作为示例之外，visualizer（[官方地址](https://github.com/dockersamples/docker-swarm-visualizer)）和portainer（[官方地址](https://portainer.io/)）都是集群 GUI 管理服务。

部署命令：

```
$ docker stack deploy -c docker-compose.yml deploy-demo
Creating service deploy-demo_nginx
Creating service deploy-demo_visualizer
Creating service deploy-demo_portainer
```

部署成功之后，我们可以查看具体详情，命令：

```
$ docker stack ls
NAME                SERVICES
deploy-demo         3
```

查看`visualizer` GUI 集群管理，浏览器打开：[http://192.168.1.10:8080/](http://192.168.1.10:8080/)
查看`portainer` GUI 集群管理，需要先配置账号信息，浏览器打开：[http://192.168.1.1:9000/](http://192.168.1.10:9000/)

可以看到，`portainer`比`visualizer`强大太多了，甚至我们所有的操作都可以在`portainer`上完成。

## 6. docker-machine、docker swarm、docker node、docker service 和 docker stack 常用命令

### docker-machine 常用命令

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

### docker swarm 常用命令

|命令|说明|
|:---:|:---:|
|docker swarm init|初始化集群|
|docker swarm join-token worker|查看工作节点的 token|
|docker swarm join-token manager|查看管理节点的 token|
|docker swarm join|加入集群中|

### docker node 常用命令

|命令|说明|
|:---:|:---:|
|docker node ls|查看所有集群节点|
|docker node rm|删除某个节点（`-f`强制删除）|
|docker node inspect|查看节点详情|
|docker node demote|节点降级，由管理节点降级为工作节点|
|docker node promote|节点升级，由工作节点升级为管理节点|
|docker node update|更新节点|
|docker node ps|查看节点中的 Task 任务|

### docker service 常用命令

|命令|说明|
|:---:|:---:|
|docker service create|部署服务|
|docker service inspect|查看服务详情|
|docker service logs|产看某个服务日志|
|docker service ls|查看所有服务详情|
|docker service rm|删除某个服务（`-f`强制删除）|
|docker service scale|设置某个服务个数|
|docker service update|更新某个服务|

### docker stack 常用命令

|命令|说明|
|:---:|:---:|
|docker stack deploy|部署新的堆栈或更新现有堆栈|
|docker stack ls|列出现有堆栈|
|docker stack ps|列出堆栈中的任务|
|docker stack rm|删除堆栈|
|docker stack services|列出堆栈中的服务|
|docker stack down|移除某个堆栈（不会删除数据）|