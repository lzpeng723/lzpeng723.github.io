---
title: Node.js 安装与初始化
date: 2021-09-21
tags:
 - node
categories:
 - 前端
---

## 1 下载node

进入[官网](https://nodejs.org/),下载LTS(长期维护版)，安装完后会自动将安装目录添加到环境变量```Path```中，即可使用```npm``命令。

验证是否安装成功
```
node -v
npm -v
```

## 2 初始化npm

```
# 更改使用指定镜像（淘宝）
npm config set registry https://registry.npm.taobao.org
# 设置npm下载包路径并手动将设置的路径添加到环境变量Path中
npm config set prefix "E:\libs\nodejs\npm"
# 设置npm缓存包路径
npm config set cache "E:\libs\nodejs\npm\cache"
# 全局安装 cnpm, yarn, @vue/cli 和 windows-build-tools
# 使用淘宝cnpm代替原生npm
npm install -g cnpm
# 使用yarn代替原生npm
npm install -g yarn
# 开发vue项目的脚手架
npm install -g @vue/cli
# Node.js 在安装模块的时候可能会报缺少python环境的错
npm install --global --production windows-build-tools
```

## yarn 与 npm

|npm|yarn|
|:---:|:---:|
|npm install|yarn|
|npm install react --save|yarn add react|
|npm uninstall react --save|yarn remove react|
|npm install react --save-dev	|yarn add react --dev|
|npm update --save|yarn upgrade|
|npm run dev|yarn dev|
|npm run build|yarn build|