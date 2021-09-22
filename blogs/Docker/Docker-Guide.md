---
title:  Docker常用命令
date: 2021-09-21
tags:
 - Docker
categories:
 - 运维
---

## Docker介绍

Docker是一个装应用的容器

[官网](https://www.docker.com)
[阮一峰的 Docker 入门教程](http://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html)
[镜像仓库官网](https://hub.docker.com/)
[慕课网的一篇文章](https://www.imooc.com/article/25618)
[docker全流程教学](https://beltxman.com/2417.html)

### Docker 安装

```
# 下载安装
curl -s https://get.docker.com | sh
# 查看版本
docker version
# 启动服务
service docker start
# 查看版本
docker version
# 允许非root用户使用docker
sudo groupadd docker
sudo usermod -aG docker your_username
# 运行一个简单容器
docker run ubuntu echo hello docker
```

### 镜像操作

```
# 拉取镜像
docker pull [OPTIONS] NAME[:TAG]
# 运行镜像
docker run [OPTIONS] IMAGE[:TAG] [COMMAND] [ARG...]
# 查看所有镜像
docker images [OPTIONS] [REPOSITORY[:TAG]]
# 拉取 helloword 镜像
docker pull hello-world
# 运行 helloword
docker run hello-world
# 拉取 nginx 镜像
docker pull nginx
# 运行nginx
docker run nginx
# 查看run参数
docker run --help
# 后台运行nginx
docker run -d nginx
# 删除镜像
docker rmi 镜像id...

# 搜索镜像
docker search whalesay
# 拉取镜像
docker pull whalesay
# 推送镜像
docker push myname/whalesay
# 运行镜像
docker run docker/whalesay cowsay Docker很好玩!
# 复制镜像并打标签
docker tag docker/whalesay lzpeng/whalesay
# 登录
docker login
# 推送镜像
docker push lzpeng/whalesay
# 删除所有镜像
docker stop $(docker ps -q)
docker rm $(docker ps -a -q)
```

### 容器

```
# 查看运行的容器
docker ps
# 查看所有容器
docker ps -a
# 进入运行的容器
docker exec -it 容器id bash
# 退出容器
exit
# 停止运行容器
docker stop 容器id
# 重启运行容器
docker restart 容器id
# 将文件拷贝至容器
docker cp index.html 容器id://user/share/nginx/html
# 提交容器改变创建新的image
docker commit -m 'fun' 容器id nginx-fun
# 删除容器
docker rm 容器id...
# 宿主机文件挂载虚拟机
docker run -P -d -v /usr/share/nginx/html nginx
docker inspect nginx

docker run -P -d -v $PWD/html:/usr/share/nginx/html nginx
docker create -v $PWD/html:/usr/share/nginx/html -name nginx2 nginx
docker run -it --volumes-from nginx2 nginx bash
```

### Docker 网络

Bridge HOST NONE

Bridge(docker->网桥->主机)
```
# 容器80映射主机8080
docker run -d -p 8080:80 nginx
# 查看端口是否运行
netstat -na | grep 8080
# 映射所有监听端口
docker run -d -P nginx
# 查看端口映射情况
docker ps
```

### 制作自己的镜像

制作自己的镜像

编写 Dockerfile文件

```docker
# Docker image for springboot file run
# VERSION 0.0.1
# Author: lzpeng
# 基础镜像使用java
FROM java:8
# 作者
MAINTAINER lzpeng <lzpeng723@gmail.com>
# VOLUME 指定了临时文件目录为/tmp。
# 其效果是在主机 /var/lib/docker 目录下创建了一个临时文件，并链接到容器的/tmp
VOLUME /tmp
# 将jar包添加到容器中并更名为app.jar
ADD notebook-0.0.1-SNAPSHOT.jar notebook.jar
# 运行jar包
RUN bash -c 'touch /notebook.jar'
EXPOSE 8080
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/notebook.jar"]
```

编写 .dockerignore 文件，如需要

```
.github
.git
build
node_modules
npm-debug.log
```

生成镜像

```
docker build -t notebook:latest .
```

Dockerfile 文件支持命令

|命令|用途|
|:---:|:---:|
|FROM|基础镜像|
|RUN|执行命令|
|ADD|添加文件(支持远程ftp拷贝文件)|
|COPY|拷贝文件|
|CMD|执行命令|
|EXPOSE|暴露端口|
|WORKDIR|指定路径|
|MAINTAINER|维护者|
|ENV|设定环境变量|
|ENTRYPOINT|容器入口|
|USER|指定用户|
|VOLUME|挂载点|

### Docker Compose

[介绍](https://www.cnblogs.com/minseo/p/11548177.html)
[安装](https://www.cnblogs.com/caidingyu/p/11320021.html)
[安装](https://docs.docker.com/compose/install/)
[教程](https://www.runoob.com/docker/docker-compose.html)

运行此命令以下载Docker Compose的当前稳定版本
```
curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
换成国内的
```
curl -L "https://get.daocloud.io/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
对二进制文件应用可执行权限：
```
chmod +x /usr/local/bin/docker-compose
```
安装完成后，可测试 ```docker-compose --version```

常见问题：安装后提示```docker-compose```找不到

解决方法：编辑配置全局环境变量，再末尾添加以下内容
```
vim /etc/profile
export PATH=/usr/local/bin:$PATH
 ```
执行```source /etc/profile```使配置立即生效

### 常用镜像

```
# Zipkin
docker run --name zipkin -d -p 9411:9411 openzipkin/zipkin

# Maven私服
docker pull docker.bintray.io/jfrog/artifactory-oss

docker run --name artifactory-oss-6.18.1 -d -v /Users/qing/JFROG_HOME/artifactory-oss-618:/var/opt/jfrog/artifactory  -p 8083:8081 docker.bintray.io/jfrog/artifactory-oss:6.18.1

#Mysql
docker run -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7

docker run -p 3306:3306 --name mysql -v /opt/mysql-5.7/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7
```

### 修改镜像源为国内

daocloud,阿里云,时速云

vim方式修改

```
sudo vim /etc/docker/daemon.json

{
    "registry-mirrors": ["https://registry.docker-cn.com","https://docker.mirrors.ustc.edu.cn","http://hub-mirror.c.163.com"]
}
```

tee方式修改

```
mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://registry.docker-cn.com","https://docker.mirrors.ustc.edu.cn","http://hub-mirror.c.163.com"]
}
```

重新加载镜像源

```
systemctl daemon-reload
systemctl restart docker
docker info
```

### 遇到的问题

ubuntu-20.04.1-live-server-amd64 安装docker出错

```
root@ubuntu-node:~# curl -s https://get.docker.com|sh
# Executing docker install script, commit: 3d8fe77c2c46c5b7571f94b42793905e5b3e42e4
+ sh -c apt-get update -qq >/dev/null
+ sh -c DEBIAN_FRONTEND=noninteractive apt-get install -y -qq apt-transport-https ca-certificates curl >/dev/null
E: Unable to correct problems, you have held broken packages.
```

排查是安装apt-transport-https时出错

```
root@ubuntu-node:~# apt-get install -y apt-transport-https
Reading package lists... Done
Building dependency tree       
Reading state information... Done
Some packages could not be installed. This may mean that you have
requested an impossible situation or if you are using the unstable
distribution that some required packages have not yet been created
or been moved out of Incoming.
The following information may help to resolve the situation:

The following packages have unmet dependencies:
 apt-transport-https : Depends: libapt-pkg5.0 (>= 1.1~exp15) but it is not going to be installed
E: Unable to correct problems, you have held broken packages.
```
意思是libapt-pkg5.0版本没法安装，经过检查后发现是提前修改了apt源,将apt源设为默认即可

