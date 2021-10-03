---
title:  Docker file 编写
date: 2021-09-25
tags:
 - Docker
categories:
 - 运维
---

## Dockerfile 文件支持命令

|命令|用途|
|:---:|:---:|
|FROM|基础镜像|
|RUN|执行命令|
|ADD|添加文件(支持远程ftp拷贝文件)|
|COPY|拷贝文件|
|CMD|执行命令|
|EXPOSE|暴露端口|
|WORKDIR|指定路径|
|LABEL|添加键值对|
|~~~MAINTAINER (deprecated)~~~|维护者|
|ENV|设定环境变量|
|ENTRYPOINT|容器入口|
|USER|指定用户|
|VOLUME|挂载点|

## 实例 npm 编译打包构建项目

### 编写 Dockerfile 文件

```Dockerfile
# 基础镜像使用node:alpine
FROM node:alpine AS build
# 工作目录
WORKDIR /app
# 复制文件
COPY . /app
# 安装依赖 打包
RUN npm install --registry=https://registry.npm.taobao.org && npm run build
# 使用nginx镜像
FROM nginx:alpine
# 复制文件
COPY --from=build /app/dest /usr/share/nginx/html
# 暴漏端口
EXPOSE 80
# 运行nginx
CMD ["nginx", "-g", "daemon off;"]
```

### 编写 .dockerignore 文件

```
.github
.vscode
.gitignore
dest
node_modules
npm-debug.log
```

### 构建镜像

```
docker build -t lzpeng723-blog:latest .
```
