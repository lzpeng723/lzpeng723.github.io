---
title: 配置多个 ssh-key 文件
date: 2021-09-21
tags:
 - Git
categories:
 - 开发
---

## 配置多个 ssh-key 文件

打开```~/.ssh```目录

```bash
cd ~/.ssh
```

### 设置全局的用户名和邮箱
```bash
# 配置一下全局的用户名和邮箱
# 用户名为git仓库注册时用户名
# 邮箱为git仓库注册时邮箱
git config --global user.name "自定义用户名"
git config --global user.email "邮箱"

# 取消全局设置
git config --global --unset user.name
git config --global --unset user.email
```

### 管理Git生成的多个ssh key
```bash
ssh-keygen -t rsa -C "yourmail@qq.com" -f "自定义文件名1 如 github_id_rsa"
ssh-keygen -t rsa -C "yourmail@qq.com" -f "自定义文件名2 如 gitee_id_rsa"
```

### 添加私钥到秘匙管理器

执行···ssh-agent命令
ssh-agent是一个密钥管理器，运行ssh-agent以后，使用ssh-add将私钥交给ssh-agent保管，
其他程序需要身份验证的时候可以将验证申请交给ssh-agent来完成整个认证过程

```
$ ssh-agent
SSH_AUTH_SOCK=/tmp/ssh-vtu2Stw1WRUj/agent.10928; export SSH_AUTH_SOCK;
SSH_AGENT_PID=11716; export SSH_AGENT_PID;
echo Agent pid 11716;
```

### 添加私钥
```
$ ssh-add ~/.ssh/gitee_id_rsa
Could not open a connection to your authentication agent.
```

在执行上面的添加私钥命令时，如果你也出现Could not open a connection to your authentication agent.
解决方法如下：
```
# 输入如下命令查看已开启的ssh-agent线程
ps aux | grep ssh
11716       1   11716      11716  ?         197609 19:32:41 /usr/bin/ssh-agent
#  执行命令杀死线程：kill -9 线程号
$ kill -9 11716
# 在.ssh目录执行如下命令:
exec ssh-agent bash
eval ssh-agent -s
```

好了，现在我们可以成功添加私钥到秘匙管理器ssh-agent当中了，执行ssh-add命令
```
ssh-add ./gitee_id_rsa
Identity added: ./gitee_id_rsa (./gitee_id_rsa)

ssh-add ./gitlab_id_rsa
Identity added: ./gitlab_id_rsa (./gitlab_id_rsa)
```

###  新建配置文件

在.ssh目录下新建config文件，并添加配置信息
config文件内容如下：

```
# gitlab
Host gitlab.com
HostName gitlab.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/gitlab_id_rsa
User lzpeng723

# gitee
Host gitee.com
HostName gitee.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/gitee_id_rsa
User lzpeng723

# github
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/github_id_rsa
User lzpeng723

# kdgitlab
Host myliving.top
HostName myliving.top
PreferredAuthentications publickey
IdentityFile ~/.ssh/kd_gitlab_id_rsa
User lzpeng723
Port 58022
```

配置文件说明

```
# 这个是真实的域名地址
HostName 
# 这里是id_rsa的地址
IdentityFile 
# 配置登录时用什么权限认证--可设置publickey,password publickey,keyboard-interactive等
PreferredAuthentications 
# 配置使用用户名
User 
# 配置端口
Port
```

关于Host参数:
每个账号单独配置一个Host，每个Host要取一个别名，每个Host主要配置HostName和IdentityFile两个属性即可
Host的名字可以取为自己喜欢的名字，不过这个会影响git相关命令

例如：
```Host mygithub``` 这样定义的话，```git@```后面紧跟的名字将会变为```mygithub```，如下
```git clone git@mygithub:blog/AndroidRotateAnim.git```
就相当于你配置的HostName真正的域名映射成了Host后面的配置的名字

注意: 不要在配置文件中添加下面这样的注释,
这种注释在读取该配置文件时会导致报错，不被识别

```
HostName git.glanway.com //这里填你们公司的git网址即可
```


### 将公钥添加到对应的站点

### 测试连接

```
#测试连接github
ssh -T git@github.com
#测试连接gitlab
ssh -T git@gitlab.com
#测试连接码云
ssh -T git@gitee.com
#测试连接kdgitlab
ssh -T git@myliving.top
```

测试链接时可能会出现问题

```
 ssh -T git@github.com
The authenticity of host 'github.com (52.74.223.119)' can't be established.
RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```
这时要输入 ```yes``` 而不是直接按回车
输入 ```yes``` 后会自动生成 ```known_hosts``` 文件

```
Permanently added the RSA host key for IP address '20.205.243.166' to the list of known hosts.
``
手动将ip地址添加到 ```known_hosts``` 文件中， 格式如下
```
github.com,20.205.243.166 publickey
```