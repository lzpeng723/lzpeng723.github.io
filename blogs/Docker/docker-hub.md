---
title:  Docker 私有镜像仓库搭建
date: 2021-09-25
tags:
 - Docker
categories:
 - 运维
---


## 私有仓库搭建

### 启动私有仓库镜像

```
docker run -di --name registry -p 5000:5000 registry
```

打开浏览器 输入地址 [http://127.0.0.1:5000/v2/_catalog](http://127.0.0.1:5000/v2/_catalog) ，看到 ```{"repositories":[]}``` 表示私有仓库搭建成功并且内容为空


### 配置私有仓库地址

修改daemon.json，让 docker信任私有仓库地址

```
vi /etc/docker/daemon.json
```

添加以下内容

```json
{
    "insecure-registries": [
        "127.0.0.1:5000"
    ]
}
```

保存退出后重启docker服务

```
systemctl restart docker
```

### 上传镜像

将镜像上传至私有仓库

```
# 标记此镜像为私有仓库的镜像
docker tag hello-world:latest 127.0.0.1:5000/hello-world
# 上传已标记的镜像
docker push 127.0.0.1:5000/hello-world
```

### 拉取镜像

```
docker pull 127.0.0.1:5000/hello-world
```