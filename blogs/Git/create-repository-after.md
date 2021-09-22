---
title: 新建仓库后
date: 2021-09-21
tags:
 - Git
categories:
 - 开发
---

## 全局配置 git 用户名邮箱

Git global setup
```
git config --global user.name "lzpeng723"
git config --global user.email "1500913306@qq.com"
```

## 克隆仓库

Create a new repository
```
git clone ssh://git@myliving.top:58022/lzpeng723/visitor-system-vue.git
cd visitor-system-vue
touch README.md
git add README.md
git commit -m "add README"
git push -u origin master
```

## 将仓库与已有文件夹绑定

Push an existing folder
```
cd existing_folder
#初始化git仓库
git init  
#添加所有文件
git add .  
#添加提交信息
git commit -m '提交信息' 
#添加远程仓库地址
git remote add origin ssh://git@github.com:lzpeng723/lzpeng723.github.io.git 
OR
git remote add origin https://github.com/lzpeng723/lzpeng723.github.io.git
# 若本地文件夹非空， 拉取远程仓库所有内容,并将所有非空文件提交
git pull --rebase origin master 
# 若有冲突 修改文件后 解决冲突，知道冲突全部解决完成
git rebase --continue
#将此次提交推送至远程仓库
git push -u origin master 
```

## 已有git源地址的文件夹切换新的地址源

Push an existing Git repository
```
cd existing_repo
git remote rename origin old-origin
git remote add origin ssh://git@github.com:lzpeng723/lzpeng723.github.io.git 
OR
git remote add origin https://github.com/lzpeng723/lzpeng723.github.io.git
git push -u origin --all
git push -u origin --tags
```