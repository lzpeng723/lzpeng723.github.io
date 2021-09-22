---
title: git常用命令
date: 2021-09-21
tags:
 - Git
categories:
 - 开发
---

### git 克隆指定分支

```bash
git clone -b 分支名 仓库地址
```

### add
 git add ./ 

### commit 

 git commit -m '提交信息'

### push

 git push

### 初始化仓库

 1、在三方代码托管平台创建自己的远程仓库。例如我们在gitee码云上创建自己的仓库，仓库名：SwiftDemo

2、在本地cd进入自己的项目文件夹，初始化git

3、git remote add origin "自己在三方代码托管平台上所创建仓库对应的地址"

4、git add . 将本地工程文件夹所有内容添加至缓存区

5、git commit - m "提交日志"

6、git push -u origin master (首次推代码至远程仓库)

     git push （非首次推代码至远程仓库）

### Github fork后与源项目保持同步

- Git 查看/添加/修改/删除源地址记录

```
# 查看源地址
git remote -v
# 修改源地址
git remote set-url origin [GIT URL]
# 添加源地址
git remote add [NAME] [GIT URL]
# 删除源地址
git remote remove [NAME]
```

- 显示远程对应的地址：

```
cd target-repo 
git remote -v
```

这行命令的目的是显示 在 我们github远程对应仓库的地址，一般会出现 origin: https://... 这里指的是远程origin对应的是后面的地址，一般这个地址是我们自己fork的。

- 增加源地址：

```
git remote add upstream <源项目url.git>
```

这行命令的结果会增加一个 upstream 命名的对应的源项目地址，为什么用upstream呢？直接，用其他名字也可以，这样我们再 ```git remote -v``` 就会显示

```
origin: https://... <自己的repo> 
upstream: https://... <源项目的repo>
```

- 抓取原仓库的修改文件：

```
git fetch upsrteam v5-dev
```

- 回到master分支，或者确定所在的分支是master：

```
git checkout master
```

这个时候，分支是origin/master

- 将更新的源项目分支合并到自己的项目上

```
git merge upstream/master
```

实际上，我们就是用更新后的 upstream/master 取代了 origin/master
这样，本封存已久的古董终于可以更新到当下了！
别急，还差一步，因为我们目前更新的是本地。

- 将本地仓库push到Github上：

```
git push origin master
```

至此，远程自己的Github也更新完毕了。开工吧！

```
git pull --rebase kd master
git pull kd master
git push kd master
```