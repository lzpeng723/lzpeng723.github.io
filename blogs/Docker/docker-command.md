---
title:  Docker 命令大全
date: 2021-09-25
tags:
 - Docker
categories:
 - 运维
---

# Docker 命令大全

## 容器生命周期管理

### run

docker run ：创建一个新的容器并运行一个命令

#### 语法

```
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```
#### OPTIONS说明：

- -a stdin: 指定标准输入输出内容类型，可选 STDIN/STDOUT/STDERR 三项；
- -d: 后台运行容器，并返回容器ID；
- -i: 以交互模式运行容器，通常与 -t 同时使用；
- -P: 随机端口映射，容器内部端口随机映射到主机的端口
- -p: 指定端口映射，格式为：主机(宿主)端口:容器端口
- -t: 为容器重新分配一个伪输入终端，通常与 -i 同时使用；
- --name : 为容器指定一个名称；
- --dns 8.8.8.8: 指定容器使用的DNS服务器，默认和宿主一致；
- --dns-search example.com: 指定容器DNS搜索域名，默认和宿主一致；
- -h "mars": 指定容器的hostname；
- -e username="ritchie": 设置环境变量；
- --env-file=[]: 从指定文件读入环境变量；
- --cpuset="0-2" or --cpuset="0,1,2": 绑定容器到指定CPU运行；
- -m :设置容器使用内存最大值；
- --net="bridge": 指定容器的网络连接类型，支持 bridge/host/none/container: 四种类型；
- --link=[]: 添加链接到另一个容器；
- --expose=[]: 开放一个端口或一组端口；
- --volume , -v: 绑定一个卷

#### 实例

使用docker镜像nginx:latest以后台模式启动一个容器,并将容器命名为mynginx。
```
docker run --name mynginx -d nginx:latest
```
使用镜像nginx:latest以后台模式启动一个容器,并将容器的80端口映射到主机随机端口。
```
docker run -P -d nginx:latest
```
使用镜像 nginx:latest，以后台模式启动一个容器,将容器的 80 端口映射到主机的 80 端口,主机的目录 /www/data 映射到容器的 /data。
```
docker run -p 80:80 -v /www/data:/data -d nginx:latest
```
绑定容器的 8080 端口，并将其映射到本地主机 127.0.0.1 的 80 端口上。
```
$ docker run -p 127.0.0.1:80:8080/tcp ubuntu bash
```
使用镜像nginx:latest以交互模式启动一个容器,在容器内执行/bin/bash命令。
```
docker run -it nginx:latest /bin/bash
root@b8573233d675:/# 
```

### start/stop/restart

docker start :启动一个或多个已经被停止的容器
docker stop :停止一个运行中的容器
docker restart :重启容器

#### 语法

```
docker start [OPTIONS] CONTAINER [CONTAINER...]
docker stop [OPTIONS] CONTAINER [CONTAINER...]
docker restart [OPTIONS] CONTAINER [CONTAINER...]
```

#### 实例

启动已被停止的容器 mynginx
```
docker start mynginx
```

停止运行中的容器 mynginx
```
docker stop mynginx
```

重启容器 mynginx
```
docker restart mynginx
```

停止所有容器
```
docker stop $(docker ps -q)
```

### kill

docker kill :杀掉一个运行中的容器。

#### 语法

```
docker kill [OPTIONS] CONTAINER [CONTAINER...]
```
#### OPTIONS说明：

- -s :向容器发送一个信号

#### 实例

杀掉运行中的容器mynginx
```
docker kill -s KILL mynginx
mynginx
```
杀死所有正在运行的容器
```
docker kill $(docker ps -a -q)
```

### rm

docker rm ：删除一个或多个容器。

#### 语法

```
docker rm [OPTIONS] CONTAINER [CONTAINER...]
```

#### OPTIONS说明：

- -f :通过 SIGKILL 信号强制删除一个运行中的容器。
- -l :移除容器间的网络连接，而非容器本身。
- -v :删除与容器关联的卷。

#### 实例

强制删除容器 db01、db02：
```
docker rm -f db01 db02
```
移除容器 nginx01 对容器 db01 的连接，连接名 db：
```
docker rm -l db 
```
删除容器 nginx01, 并删除容器挂载的数据卷：
```
docker rm -v nginx01
```
删除所有已经停止的容器：
```
docker rm $(docker ps -a -q)
```

### pause/unpause

docker pause :暂停容器中所有的进程。
docker unpause :恢复容器中所有的进程。

#### 语法

```
docker pause CONTAINER [CONTAINER...]
docker unpause CONTAINER [CONTAINER...]
```

#### 实例

暂停数据库容器db01提供服务。
```
docker pause db01
```
恢复数据库容器 db01 提供服务。
```
docker unpause db01
```

### create

docker create ：创建一个新的容器但不启动它
用法同 [docker run](#run)

#### 语法

```
docker create [OPTIONS] IMAGE [COMMAND] [ARG...]
```

语法同 [docker run](#run)

#### 实例

使用docker镜像nginx:latest创建一个容器,并将容器命名为mynginx

```
docker create  --name mynginx  nginx:latest      
09b93464c2f75b7b69f83d56a9cfc23ceb50a48a9db7652ee4c27e3e2cb1961f
```

### exec

docker exec ：在运行的容器中执行命令

#### 语法

```
docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
```

#### OPTIONS说明：

- -d :分离模式: 在后台运行
- -i :即使没有附加也保持STDIN 打开
- -t :分配一个伪终端

#### 实例

在容器 mynginx 中以交互模式执行容器内 /root/my.sh 脚本:
```
docker exec -it mynginx /bin/sh /root/my.sh
```

在容器 mynginx 中开启一个交互模式的终端:
```
docker exec -i -t  mynginx /bin/bash
root@b1a0703e41e7:/#
```

也可以通过 ```docker ps -a``` 命令查看已经在运行的容器，然后使用容器 ID 进入容器。
查看已经在运行的容器 ID：
```
docker ps -a 

9df70f9a0714        openjdk             "/usercode/script.sh…" 
```

第一列的 ```9df70f9a0714``` 就是容器 ID。
通过 exec 命令对指定的容器执行 bash:

```
docker exec -it 9df70f9a0714 /bin/bash
```

## 容器操作
### ps

docker ps : 列出容器

#### 语法

```
docker ps [OPTIONS]
```

#### OPTIONS说明：

- -a :显示所有的容器，包括未运行的。
- -f :根据条件过滤显示的内容。
- --format :指定返回值的模板文件。
- -l :显示最近创建的容器。
- -n :列出最近创建的n个容器。
- --no-trunc :不截断输出。
- -q :静默模式，只显示容器编号。
- -s :显示总的文件大小。

#### 实例

列出所有在运行的容器信息。

```
docker ps
CONTAINER ID   IMAGE          COMMAND                ...  PORTS                    NAMES
09b93464c2f7   nginx:latest   "nginx -g 'daemon off" ...  80/tcp, 443/tcp          mynginx
96f7f14e99ab   mysql:5.6      "docker-entrypoint.sh" ...  0.0.0.0:3306->3306/tcp   mymysql
```
输出详情介绍：

- CONTAINER ID: 容器 ID。
- IMAGE: 使用的镜像。
- COMMAND: 启动容器时运行的命令。
- CREATED: 容器的创建时间。
- STATUS: 容器状态。
    状态有7种：
    - created（已创建）
    - restarting（重启中）
    - running（运行中）
    - removing（迁移中）
    - paused（暂停）
    - exited（停止）
    - dead（死亡）
- PORTS: 容器的端口信息和使用的连接类型（tcp\udp）。
- NAMES: 自动分配的容器名称

列出最近创建的5个容器信息。
```
docker ps -n 5
```

列出所有创建的容器ID。
```
docker ps -a -q
```

根据标签过滤
```
docker run -d --name=test-nginx --label color=blue nginx
docker ps --filter "label=color"
docker ps --filter "label=color=blue"
```

根据名称过滤
```
docker ps --filter"name=test-nginx"
```

根据状态过滤
```
$ docker ps -a --filter 'exited=0'
$ docker ps --filter status=running
$ docker ps --filter status=paused
```

根据镜像过滤
```
#镜像名称
docker ps --filter ancestor=nginx
#镜像ID
docker ps --filter ancestor=d0e008c6cf02
```

根据启动顺序过滤
```
docker ps -f before=9c3527ed70ce
docker ps -f since=6e63f6ff38b0
```
### inspect

docker inspect : 获取容器/镜像的元数据。

#### 语法

```
docker inspect [OPTIONS] NAME|ID [NAME|ID...]
```

#### OPTIONS说明：

- -f :指定返回值的模板文件。
- -s :显示总的文件大小。
- --type :为指定类型返回JSON。

#### 实例

获取镜像mysql:5.6的元信息。
```
docker inspect mysql:5.6
```

获取正在运行的容器mymysql的 IP。
```
docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mymysql
```

### top

docker top :查看容器中运行的进程信息，支持 ps 命令参数。

#### 语法

```
docker top [OPTIONS] CONTAINER [ps OPTIONS]
```

容器运行时不一定有```/bin/bash```终端来交互执行```top```命令，而且容器还不一定有```top```命令，可以使用```docker top```来实现查看container中正在运行的进程。

#### 实例

查看容器mymysql的进程信息。
```
docker top mymysql
UID    PID    PPID    C      STIME   TTY  TIME       CMD
999    40347  40331   18     00:58   ?    00:00:02   mysqld
```

查看所有运行容器的进程信息。
```
for i in  `docker ps |grep Up|awk '{print $1}'`;do echo \ &&docker top $i; done
```

### attach

docker attach :连接到正在运行中的容器。

#### 语法

```
docker attach [OPTIONS] CONTAINER
```

要attach上去的容器必须正在运行，可以同时连接上同一个container来共享屏幕（与screen命令的attach类似）。
官方文档中说attach后可以通过CTRL-C来detach，但实际上经过我的测试，如果container当前在运行bash，CTRL-C自然是当前行的输入，没有退出；如果container当前正在前台运行进程，如输出nginx的access.log日志，CTRL-C不仅会导致退出容器，而且还stop了。这不是我们想要的，detach的意思按理应该是脱离容器终端，但容器依然运行。好在attach是可以带上```--sig-proxy=false```来确保CTRL-D或CTRL-C不会关闭容器。

#### 实例

容器mynginx将访问日志指到标准输出，连接到容器查看访问信息。
```
docker attach --sig-proxy=false mynginx
192.168.239.1 - - [10/Jul/2016:16:54:26 +0000] "GET / HTTP/1.1" 304 0 "-" "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.93 Safari/537.36" "-"
```

### events

docker events : 从服务器获取实时事件

#### 语法

```
docker events [OPTIONS]
```

#### OPTIONS说明：

- -f ：根据条件过滤事件；
- --since ：从指定的时间戳后显示所有事件;
- --until ：流水时间显示到指定的时间为止；

#### 实例

显示docker 2016年7月1日后的所有事件。
```
docker events  --since="1467302400"
```

显示docker 镜像为mysql:5.6 2016年7月1日后的相关事件。
```
docker events -f "image"="mysql:5.6" --since="1467302400" 
```

如果指定的时间是到秒级的，需要将时间转成时间戳。如果时间为日期的话，可以直接使用，如```--since="2016-07-01"```。

### logs

docker logs : 获取容器的日志

#### 语法

```
docker logs [OPTIONS] CONTAINER
```

#### OPTIONS说明：

- -f : 跟踪日志输出
- --since :显示某个开始时间的所有日志
- -t : 显示时间戳
- --tail :仅列出最新N条容器日志

#### 实例

跟踪查看容器mynginx的日志输出。
```
docker logs -f mynginx
```

查看容器mynginx从2016年7月1日后的最新10条日志。
```
docker logs --since="2016-07-01" --tail=10 mynginx
```

### wait

docker wait : 阻塞运行直到容器停止，然后打印出它的退出代码。

#### 语法

```
docker wait [OPTIONS] CONTAINER [CONTAINER...]
```

#### 实例

```
docker wait CONTAINER
```

### export

docker export :将文件系统作为一个tar归档文件导出到STDOUT。

#### 语法

```
docker export [OPTIONS] CONTAINER
```

#### OPTIONS说明：

- -o :将输入内容写到文件。

#### 实例

将id为a404c6c174a2的容器按日期保存为tar文件。
```
docker export a404c6c174a2 > mysql-`date +%Y%m%d`.tar
docker export -o mysql-`date +%Y%m%d`.tar a404c6c174a2
ls mysql-`date +%Y%m%d`.tar
```

### port

docker port :列出指定的容器的端口映射，或者查找将PRIVATE_PORT NAT到面向公众的端口。

#### 语法

```
docker port [OPTIONS] CONTAINER [PRIVATE_PORT[/PROTO]]
```

#### 实例

查看容器mynginx的端口映射情况。
```
docker port mynginx
```

## 容器rootfs命令

### commit

docker commit :从容器创建一个新的镜像。

#### 语法

```
docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]
```

#### OPTIONS说明：

- -a :提交的镜像作者；
- -c :使用Dockerfile指令来创建镜像；
- -m :提交时的说明文字；
- -p :在commit时，将容器暂停。

#### 实例

将容器a404c6c174a2 保存为新的镜像,并添加提交人信息和说明信息。
```
docker commit -a "lzpeng723" -m "temp data" a404c6c174a2  mymysql:v1
```

### cp

docker cp :用于容器与主机之间的数据拷贝。

#### 语法

```
docker cp [OPTIONS] CONTAINER:SRC_PATH DEST_PATH|-
docker cp [OPTIONS] SRC_PATH|- CONTAINER:DEST_PATH
```

#### OPTIONS说明：

- -L :保持源目标中的链接

#### 实例

将主机/www/pages目录拷贝到容器96f7f14e99ab的/www目录下。
```
docker cp /www/pages 96f7f14e99ab:/www/
```

将主机/www/pages目录拷贝到容器96f7f14e99ab中，目录重命名为www。
```
docker cp /www/pages 96f7f14e99ab:/www
```

将容器96f7f14e99ab的/www目录拷贝到主机的/tmp目录中。
```
docker cp  96f7f14e99ab:/www /tmp/
```

### diff

docker diff : 检查容器里文件结构的更改。

#### 语法

```
docker diff [OPTIONS] CONTAINER
```

#### 实例

查看容器mymysql的文件结构更改。
```
docker diff mymysql
```

## 镜像仓库

### login

docker login : 登陆到一个Docker镜像仓库，如果未指定镜像仓库地址，默认为官方仓库 Docker Hub
docker logout : 登出一个Docker镜像仓库，如果未指定镜像仓库地址，默认为官方仓库 Docker Hub

#### 语法

```
docker login [OPTIONS] [SERVER]
docker logout [OPTIONS] [SERVER]
```

#### OPTIONS说明：

- -u :登陆的用户名
- -p :登陆的密码

#### 实例

登陆到Docker Hub
```
docker login -u 用户名 -p 密码
```
登出Docker Hub
```
docker logout
```

### pull

docker pull : 从镜像仓库中拉取或者更新指定镜像

#### 语法

```
docker pull [OPTIONS] NAME[:TAG|@DIGEST]
```

#### OPTIONS说明：

- -a :拉取所有 tagged 镜像
- --disable-content-trust :忽略镜像的校验,默认开启

#### 实例

从Docker Hub下载java最新版镜像。
```
docker pull java
```

从Docker Hub下载REPOSITORY为java的所有镜像。
```
docker pull -a java
```

### push

docker push : 将本地的镜像上传到镜像仓库,要先登陆到镜像仓库

#### 语法

```
docker push [OPTIONS] NAME[:TAG]
```

#### OPTIONS说明：

- --disable-content-trust :忽略镜像的校验,默认开启

#### 实例

上传本地镜像myapache:v1到镜像仓库中。
```
docker push myapache:v1
```

### search

docker search : 从Docker Hub查找镜像

#### 语法

```
docker search [OPTIONS] TERM
```

#### OPTIONS说明：

- --automated :只列出 automated build类型的镜像；
- --no-trunc :显示完整的镜像描述；
- -f <过滤条件>:列出收藏数不小于指定值的镜像。

#### 实例

从 Docker Hub 查找所有镜像名包含 java，并且收藏数大于 10 的镜像
```
docker search -f stars=10 java
NAME                  DESCRIPTION                           STARS   OFFICIAL   AUTOMATED
java                  Java is a concurrent, class-based...   1037    [OK]       
anapsix/alpine-java   Oracle Java 8 (and 7) with GLIBC ...   115                [OK]
develar/java                                                 46                 [OK]
isuper/java-oracle    This repository contains all java...   38                 [OK]
lwieske/java-8        Oracle Java 8 Container - Full + ...   27                 [OK]
nimmis/java-centos    This is docker images of CentOS 7...   13                 [OK]
```

参数说明：
- NAME: 镜像仓库源的名称
- DESCRIPTION: 镜像的描述
- OFFICIAL: 是否 docker 官方发布
- stars: 类似 Github 里面的 star，表示点赞、喜欢的意思。
- AUTOMATED: 自动构建。

## 本地镜像管理
### images

docker images : 列出本地镜像。

#### 语法

```
docker images [OPTIONS] [REPOSITORY[:TAG]]
```

#### OPTIONS说明：

- -a :列出本地所有的镜像（含中间映像层，默认情况下，过滤掉中间映像层）；
- --digests :显示镜像的摘要信息；
- -f :显示满足条件的镜像；
- --format :指定返回值的模板文件；
- --no-trunc :显示完整的镜像信息；
- -q :只显示镜像ID。

#### 实例

查看本地镜像列表。
```
docker images
```

列出本地镜像中REPOSITORY为ubuntu的镜像列表。
```
docker images  ubuntu
```

### rmi

docker rmi : 删除本地一个或多个镜像。

#### 语法

```
docker rmi [OPTIONS] IMAGE [IMAGE...]
```

#### OPTIONS说明：

- -f :强制删除；
- --no-prune :不移除该镜像的过程镜像，默认移除；

#### 实例

强制删除本地镜像 ubuntu:v4。
```
docker rmi -f ubuntu:v4
```
删除所有未打 dangling 标签的镜像
```
docker rmi $(docker images -q -f dangling=true)
```
通过镜像的id来删除指定镜像
```
docker rmi <image id>
```
删除所有镜像
```
docker rmi $(docker images -q)
```

### tag

docker tag : 标记本地镜像，将其归入某一仓库。

#### 语法

```
docker tag [OPTIONS] IMAGE[:TAG] [REGISTRYHOST/][USERNAME/]NAME[:TAG]
```

#### 实例

将镜像ubuntu:15.10标记为 ubuntu:v3 镜像。
```
docker tag ubuntu:15.10 ubuntu:v3
```

### build

docker build 命令用于使用 Dockerfile 创建镜像。

#### 语法

```
docker build [OPTIONS] PATH | URL | -
```

#### OPTIONS说明：

- --build-arg=[] :设置镜像创建时的变量；
- --cpu-shares :设置 cpu 使用权重；
- --cpu-period :限制 CPU CFS周期；
- --cpu-quota :限制 CPU CFS配额；
- --cpuset-cpus :指定使用的CPU id；
- --cpuset-mems :指定使用的内存 id；
- --disable-content-trust :忽略校验，默认开启；
- -f :指定要使用的Dockerfile路径；
- --force-rm :设置镜像过程中删除中间容器；
- --isolation :使用容器隔离技术；
- --label=[] :设置镜像使用的元数据；
- -m :设置内存最大值；
- --memory-swap :设置Swap的最大值为内存+swap，"-1"表示不限swap；
- --no-cache :创建镜像的过程不使用缓存；
- --pull :尝试去更新镜像的新版本；
- --quiet, -q :安静模式，成功后只输出镜像 ID；
- --rm :设置镜像成功后删除中间容器；
- --shm-size :设置/dev/shm的大小，默认值是64M；
- --ulimit :Ulimit配置。
- --squash :将 Dockerfile 中所有的操作压缩为一层。
- --tag, -t: 镜像的名字及标签，通常 name:tag 或者 name 格式；可以在一次构建中为一个镜像设置多个标签。
- --network: 默认 default。在构建期间设置RUN指令的网络模式

#### 实例

使用当前目录的 Dockerfile 创建镜像，标签为 lzpeng723/blog:v1。
```
docker build -t lzpeng723/blog:v1 . 
```

使用URL github.com/creack/docker-firefox 的 Dockerfile 创建镜像。
```
docker build github.com/creack/docker-firefox
```

也可以通过 -f Dockerfile 文件的位置：
```
docker build -f /path/to/a/Dockerfile .
```

在 Docker 守护进程执行 Dockerfile 中的指令前，首先会对 Dockerfile 进行语法检查，有语法错误时会返回：
```
docker build -t test/myapp .
Sending build context to Docker daemon 2.048 kB
Error response from daemon: Unknown instruction: RUNCMD
```

### history

docker history : 查看指定镜像的创建历史。

#### 语法

```
docker history [OPTIONS] IMAGE
```

#### OPTIONS说明：

- -H :以可读的格式打印镜像大小和日期，默认为true；
- --no-trunc :显示完整的提交记录；
- -q :仅列出提交记录ID。

#### 实例

查看本地镜像ubuntu:v3的创建历史。
```
docker history ubuntu:v3
```

### save

docker save : 将指定镜像保存成 tar 归档文件。

#### 语法

```
docker save [OPTIONS] IMAGE [IMAGE...]
```

#### OPTIONS 说明：

```
-o :输出到的文件。
```

#### 实例

将镜像 mynginx 生成 mynginx.tar 文档
```
docker save -o mynginx.tar mynginx
```

### load

docker load : 导入使用 [docker save](#save) 命令导出的镜像。

#### 语法

```
docker load [OPTIONS]
```

#### OPTIONS 说明：

```
--input , -i : 指定导入的文件，代替 STDIN。

--quiet , -q : 精简输出信息。
```

#### 实例

导入镜像：
```
docker load < busybox.tar.gz
docker load --input fedora.tar
```

### import

docker import : 从归档文件中创建镜像。

#### 语法

```
docker import [OPTIONS] file|URL|- [REPOSITORY[:TAG]]
```

#### OPTIONS说明：

- -c :应用docker 指令创建镜像；
- -m :提交时的说明文字；

#### 实例

从镜像归档文件mynginx.tar创建镜像，命名为mynginx:v4
```
docker import  mynginx.tar mynginx:v4  
```

## info|version

### info

docker info : 显示 Docker 系统信息，包括镜像和容器数。。

#### 语法

```
docker info [OPTIONS]
```

#### 实例

查看docker系统信息。
```
docker info
```

### version

docker version :显示 Docker 版本信息。

#### 语法

```
docker version [OPTIONS]
```

#### OPTIONS说明：

- -f :指定返回值的模板文件。

#### 实例

显示 Docker 版本信息。
```
docker version
```