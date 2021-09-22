---
title: git分支操作
date: 2021-09-22
tags:
 - Git
categories:
 - 开发
---

[参考链接]: https://www.cnblogs.com/ydxblog/p/7988317.html

分支(branch)操作相关命令
查看本地分支：```$ git branch```
查看远程分支：```$ git branch -r```
创建本地分支：```$ git branch [name]``` ----注意新分支创建后不会自动切换为当前分支
切换分支：```$ git checkout [name]```
创建新分支并立即切换到新分支：```$ git checkout -b [name]```
删除分支：```$ git branch -d [name]``` ---- -d选项只能删除已经参与了合并的分支，对于未有合并的分支是无法删除的。如果想强制删除一个分支，可以使用-D选项
合并分支：```$ git merge [name]``` ----将名称为[name]的分支与当前分支合并
创建远程分支(本地分支push到远程)：```$ git push origin [name]```
删除远程分支：```$ git push origin :heads/[name]```
我从master分支创建了一个```issue5560```分支，做了一些修改后，使用```git push origin master```提交，但是显示的结果却是```'Everything up-to-date'```，发生问题的原因是```git push origin master``` 在没有track远程分支的本地分支中默认提交的```master```分支，因为```master```分支默认指向了```origin master``` 分支，这里要使用```git push origin issue5560：master``` 就可以把issue5560推送到远程的```master```分支了。

    如果想把本地的某个分支test提交到远程仓库，并作为远程仓库的master分支，或者作为另外一个名叫test的分支，那么可以这么做。

```$ git push origin test:master```         // 提交本地test分支作为远程的master分支 //好像只写这一句，远程的github就会自动创建一个test分支
```$ git push origin test:test```              // 提交本地test分支作为远程的test分支

如果想删除远程的分支呢？类似于上面，如果:左边的分支为空，那么将删除:右边的远程的分支。

```$ git push origin :test```              // 刚提交到远程的test将被删除，但是本地还会保存的，不用担心