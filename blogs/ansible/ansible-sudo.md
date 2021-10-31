---
title:  ansible sudo授权
date: 2021-10-16
tags:
 - ansible
categories:
 - 运维
---

# ansible sudo授权

## 基本概念

### sudo

- superuser or another do
- 以超级管理员或其他人身份执行命令

### 基本流程

- 管理员需要先授权(修改`/etc/sudoers`文件)
- 普通用户以sudo的形式执行命令
- 可以通过`sudo -l`查看授权情况

### 修改`/etc/sudoers`的方法

- visudo (带语法检查，默认没有颜色提示)
- vim /etc/sudoers (不带语法检查，默认有颜色提示)

### 授权格式如下

- 用户或组 主机列表=(提权身份) [NOPASSWD]:命令列表
- 命令需要写绝对路径（支持*）

### 例子


创建并切换到lzpeng用户执行systemctl命令

```bash
useradd lzpeng
passwd lzpeng
su - lzpeng
systemctl restart network
```

可以发现提示
```
==== AUTHENTICATING FOR org.freedesktop.systemd1.manage-units ===
Authentication is required to manage system services or units.
Authenticating as: root
Password:
```
表示我们不能执行 `systemctl restart network` 命令,下面我们使用root用户修改sudo文件

```bash
which systemctl
which nmcli
vim /etc/sudoers
# 将下面这行文件添加至文件中
lzpeng ALL=(root) /usr/bin/systemctl,/usr/bin/nmcli
# 如果是这样配置可以使对应用户使用sudo执行命令时,无需修改密码
lzpeng ALL=(root) NOPASSWD:/usr/bin/systemctl,/usr/bin/nmcli
```

使用lzpeng用户执行systemctl命令

```bash
su - lzpeng
# 以root身份执行systemctl命令
sudo systemctl restart network
# 查看自己可以以谁的身份执行什么命令
sudo -l
```

最后切换为root删除lzpeng用户

```
userdel -r lzpeng
```

## 实战创建用户使其可以使用sudo执行任何命令

```bash
# 在test主机创建 lzpeng 用户,并设置密码为 123456
ansible test -m user -a "name=lzpeng password={{'123456' | password_hash('sha512')}}"
# 在test被管理主机配置sudo,让lzpeng可以执行任何命令，且无需输入密码
ansible test -m lineinfile -a "path=/etc/sudoers line='lzpeng ALL=(ALL) NOPASSWD:ALL'"

# 测试
ssh lzpeng@CentOS7-Node1
sudo -l
sudo systemctl restart chronyd

# 删除test主机的 lzpeng 用户
ansible test -m user -a 'name=lzpeng state=absent remove=true'
# 删除 /etc/sudoers 文件刚添加的一行
ansible test -m lineinfile -a "path=/etc/sudoers line='lzpeng ALL=(ALL) NOPASSWD:ALL' state=absent"
```


## 向所有主机分发密钥

```bash
for i in CentOS7-Node1 CentOS7-Node2 CentOS7-Node3 CentOS7-Node4 CentOS7-Node5
do
    ssh-copy-id lzpeng@$i
done
```

## 修改 ansible 配置文件

```yaml
[defaults]
# 主机清单配置文件
inventory      = ./hosts
# 配置用户
remote_user = lzpeng
[privilege_escalation]
# 是否需要切换用户
become = True
# 如何切换用户
become_method = sudo
# 切换成什么用户
become_user = root
# sudo 是否需要输入密码
become_ask_pass = False

```
