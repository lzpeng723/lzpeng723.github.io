---
title:  Linux 安装 Docker
date: 2021-09-25
tags:
 - Docker
categories:
 - 运维
---

## Docker 安装

```
# 安装 yum-utils
yum install -y yum-utils
# 配置 yum 源
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
# 下载安装
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
也可以使用国内 daocloud 一键安装命令：
curl -sSL https://get.daocloud.io/docker | sh
# 查看版本
docker version
# 启动服务
service docker start
# 查看版本
docker version
# 允许非root用户使用docker
sudo groupadd docker
sudo usermod -aG docker your_username
# 运行HelloWorld
docker run hello-world
```

## 配置镜像加速

阿里云的加速器：https://<你的ID>.mirror.aliyuncs.com [申请地址](https://help.aliyun.com/document_detail/60750.html)

网易加速器：http://hub-mirror.c.163.com

官方中国加速器：https://registry.docker-cn.com

七牛云加速器：https://reg-mirror.qiniu.com

科大镜像(ustc) 的镜像：https://docker.mirrors.ustc.edu.cn

daocloud：https://www.daocloud.io/mirror#accelerator-doc（注册后使用）

### vim方式修改

```
sudo vim /etc/docker/daemon.json

{
    "registry-mirrors":  [
        "http://hub-mirror.c.163.com",
        "https://docker.mirrors.ustc.edu.cn",
        "https://registry.docker-cn.com",
        "https://reg-mirror.qiniu.com",
        "https://dockerhub.azk8s.cn"
    ]
}
```

### tee方式修改

```
mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'

{
    "registry-mirrors":  [
        "http://hub-mirror.c.163.com",
        "https://docker.mirrors.ustc.edu.cn",
        "https://registry.docker-cn.com",
        "https://reg-mirror.qiniu.com",
        "https://dockerhub.azk8s.cn"
    ]
}
```

### 重新加载镜像源

```
systemctl daemon-reload
systemctl restart docker
docker info
```

## 遇到的问题

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

## 最后

好了，Docker 安装完毕，开始愉快的学习 Docker 吧，[Docker学习教程](https://www.runoob.com/docker)。
