---
title:  ansible 安装
date: 2021-10-16
tags:
 - ansible
categories:
 - 运维
---

[参考链接]: https://www.cnblogs.com/keerya/p/7987886.html
[参考链接]: https://www.cnblogs.com/keerya/p/8004566.html

## ansible 简介

### ansible 是什么？

ansible是新出现的自动化运维工具，基于Python开发，集合了众多运维工具（puppet、chef、func、fabric）的优点，实现了批量系统配置、批量程序部署、批量运行命令等功能。
ansible是基于 paramiko 开发的,并且基于模块化工作，本身没有批量部署的能力。真正具有批量部署的是ansible所运行的模块，ansible只是提供一种框架。ansible不需要在远程主机上安装client/agents，因为它们是基于ssh来和远
程主机通讯的。ansible目前已经已经被红帽官方收购，是自动化运维工具中大家认可度最高的，并且上手容易，学习简单。是每位运维工程师必须掌握的技能之一。

### ansible 特点

1. 部署简单，只需在主控端部署Ansible环境，被控端无需做任何操作；
2. 默认使用SSH协议对设备进行管理；
3. 有大量常规运维操作模块，可实现日常绝大部分操作；
4. 配置简单、功能强大、扩展性强；
5. 支持API及自定义模块，可通过Python轻松扩展；
6. 通过Playbooks来定制强大的配置、状态管理；
7. 轻量级，无需在客户端安装agent，更新时，只需在操作机上进行一次更新即可；
8. 提供一个功能强大、操作性强的Web管理界面和REST API接口——AWX平台。

### ansible 架构图

![ansible 架构图](https://images2017.cnblogs.com/blog/1204916/201712/1204916-20171205163000628-69838828.png)

　　上图中我们看到的主要模块如下：

> `Ansible`：Ansible核心程序。
> `HostInventory`：记录由Ansible管理的主机信息，包括端口、密码、ip等。
> `Playbooks`：“剧本”YAML格式文件，多个任务定义在一个文件中，定义主机需要调用哪些模块来完成的功能。
> `CoreModules`：**核心模块**，主要操作是通过调用核心模块来完成管理任务。
> `CustomModules`：自定义模块，完成核心模块无法完成的功能，支持多种语言。
> `ConnectionPlugins`：连接插件，Ansible和Host通信使用

## ansible 任务执行

### ansible 任务执行模式

Ansible 系统由控制主机对被管节点的操作方式可分为两类，即`adhoc`和`playbook`：

- ad-hoc模式(点对点模式)
  使用单个模块，支持批量执行单条命令。ad-hoc 命令是一种可以快速输入的命令，而且不需要保存起来的命令。**就相当于bash中的一句话shell。**
- playbook模式(剧本模式)
  是Ansible主要管理方式，也是Ansible功能强大的关键所在。**playbook通过多个task集合完成一类功能**，如Web服务的安装部署、数据库服务器的批量备份等。可以简单地把playbook理解为通过组合多条ad-hoc操作的配置文件。


### ansible 执行流程

![ansible 执行流程](https://images2017.cnblogs.com/blog/1204916/201712/1204916-20171205162615738-1292598736.png)
简单理解就是Ansible在运行时， 首先读取`ansible.cfg`中的配置， 根据规则获取`Inventory`中的管理主机列表， 并行的在这些主机中执行配置的任务， 最后等待执行返回的结果。



### ansible 命令执行过程

1. 加载自己的配置文件，默认`/etc/ansible/ansible.cfg`；
2. 查找对应的主机配置文件，找到要执行的主机或者组；
3. 加载自己对应的模块文件，如 command；
4. 通过ansible将模块或命令生成对应的临时py文件(python脚本)， 并将该文件传输至远程服务器；
5. 对应执行用户的家目录的`.ansible/tmp/XXX/XXX.PY`文件；
6. 给文件 +x 执行权限；
7. 执行并返回结果；
8. 删除临时py文件，`sleep 0`退出；

## ansible 配置详解

### ansible 安装方式

ansible安装常用两种方式，`yum安装`和`pip程序安装`。下面我们来详细介绍一下这两种安装方式。

#### 使用 pip（python的包管理模块）安装

首先，我们需要安装一个`python-pip`包，安装完成以后，则直接使用`pip`命令来安装我们的包，具体操作过程如下：

```
yum install python-pip
pip install ansible
```



#### 使用 yum 安装

yum 安装是我们很熟悉的安装方式了。我们需要先安装一个`epel-release`包，然后再安装我们的 ansible 即可。

```
yum install epel-release -y
yum install ansible –y
```

### ansible 程序结构

安装目录如下(yum安装)：

- 配置文件目录：`/etc/ansible/`
- 执行文件目录：`/usr/bin/`
- Lib库依赖目录：`/usr/lib/pythonX.X/site-packages/ansible/`
- Help文档目录：`/usr/share/doc/ansible-X.X.X/`
- Man文档目录：`/usr/share/man/man1/`


### ansible配置文件查找顺序

ansible与我们其他的服务在这一点上有很大不同，这里的配置文件查找是从多个地方找的，顺序如下：

1. 检查环境变量`ANSIBLE_CONFIG`指向的路径文件(export ANSIBLE_CONFIG=/etc/ansible.cfg)；
2. `./ansible.cfg`，检查当前目录下的ansible.cfg配置文件；
3. `~/ansible.cfg`，检查当前用户家目录下的ansible.cfg配置文件；
4. `/etc/ansible/ansible.cfg`检查etc目录的配置文件。



### ansible 配置文件

ansible 的配置文件为`/etc/ansible/ansible.cfg`，ansible 有许多参数，下面我们列出一些常见的参数：

```yml
[defaults]
# 这个参数表示资源清单inventory文件的位置
inventory = /etc/ansible/hosts
# 指向存放Ansible模块的目录，支持多个目录方式，只要用冒号（：）隔开就可以
library = /usr/share/ansible
# 以什么用户远程被管理主机
remote_user = lzpeng
# 是否校验密钥
host_key_checking = False
# 并发连接数，默认为5
forks = 5
# 设置默认执行命令的用户
sudo_user = root
# 使用密钥还是密码远程
ask_pass = True
#指定连接被管节点的管理端口，默认为22端口，建议修改，能够更加安全
remote_port = 22
# 设置是否检查SSH主机的密钥，值为True/False。关闭后第一次连接不会提示配置实例
host_key_checking = False
# 设置SSH连接的超时时间，单位为秒
timeout = 60
# 指定一个存储ansible日志的文件（默认不记录日志）
log_path = /var/log/ansible.log

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

### ansible 主机清单

在配置文件中，我们提到了资源清单，这个清单就是我们的主机清单，里面保存的是一些 ansible 需要连接管理的主机列表。我们可以来看看他的定义方式：

```yml
# 添加以下内容
[test] # 组名
CentOS7-Node1 ansible_ssh_port=220 # 自定义远程ssh端口
[proxy]
CentOS7-Node2 ansible_ssh_user=lzpeng # 自定义远程连接的账户名
[webserver]
CentOS7-Node[3:4] ansible_ssh_pass=123456 # 自定义远程连接的账户名
[database]
CentOS7-Node5 ansible_ssh_private_key_file=220 # 自定义远程连接的账户名
[cluster:children] # 嵌套组
webserver
database
```

需要注意的是，这里的组成员可以使用通配符来匹配，这样对于一些标准化的管理来说就很轻松方便了。

我们可以根据实际情况来配置我们的主机列表，具体操作如下：

```bash
vim ~/ansible/hosts

# 添加以下内容
[test] # 组名
CentOS7-Node1 # 主机名
[proxy]
CentOS7-Node2
[webserver]
CentOS7-Node[3:4] # 连续主机名
[database]
CentOS7-Node5
[cluster:children] # 嵌套组
webserver
database
```

## ansible 常用命令

### ansible 命令集

> `/usr/bin/ansible`　　Ansibe AD-Hoc 临时命令执行工具，常用于临时命令的执行
> `/usr/bin/ansible-doc` 　Ansible 模块功能查看工具
> `/usr/bin/ansible-galaxy`　　下载/上传优秀代码或Roles模块 的官网平台，基于网络的
> `/usr/bin/ansible-playbook`　　Ansible 定制自动化的任务集编排工具
> `/usr/bin/ansible-pull`　　Ansible远程执行命令的工具，拉取配置而非推送配置（使用较少，海量机器时使用，对运维的架构能力要求较高）
> `/usr/bin/ansible-vault`　　Ansible 文件加密工具
> `/usr/bin/ansible-console`　　Ansible基于Linux Consoble界面可与用户交互的命令执行工具

其中，我们比较常用的是`/usr/bin/ansible`和`/usr/bin/ansible-playbook`。



### ansible-doc 命令

ansible-doc 命令常用于获取模块信息及其使用帮助，一般用法如下：

```bash
ansible-doc -l				#获取全部模块的信息
ansible-doc -s MOD_NAME		#获取指定模块的使用帮助
ansible-doc -s | wc -l		#统计有多少模块
```

我们也可以查看一下ansible-doc的全部用法：

```bash
ansible-doc
Usage: ansible-doc [options] [module...]

Options:
  -h, --help            show this help message and exit　　# 显示命令参数API文档
  -l, --list            List available modules　　#列出可用的模块
  -M MODULE_PATH, --module-path=MODULE_PATH　　#指定模块的路径
                        specify path(s) to module library (default=None)
  -s, --snippet         Show playbook snippet for specified module(s)　　#显示playbook制定模块的用法
  -v, --verbose         verbose mode (-vvv for more, -vvvv to enable　　# 显示ansible-doc的版本号查看模块列表：
                        connection debugging)
  --version             show program's version number and exit
```

我们可以来看一下，以yum相关的为例：

```bash
ansible-doc -l | grep yum

yum                                                           Manages packages with the `yum' package manager                                                      
yum_repository                                                Add or remove YUM repositories      
ansible-doc -s yum
```

### ansible 命令详解

命令的具体格式如下：

```bash
ansible <host-pattern> [-f forks] [-m module_name] [-a args]
```

也可以通过`ansible -h`来查看帮助，下面我们列出一些比较常用的选项，并解释其含义：

> `-a MODULE_ARGS`　　　#模块的参数，如果执行默认COMMAND的模块，即是命令参数，如： “date”，“pwd”等等
> `-k`，`--ask-pass` #ask for SSH password。登录密码，提示输入SSH密码而不是假设基于密钥的验证
> `--ask-su-pass` #ask for su password。su切换密码
> `-K`，`--ask-sudo-pass` #ask for sudo password。提示密码使用sudo，sudo表示提权操作
> `--ask-vault-pass` #ask for vault password。假设我们设定了加密的密码，则用该选项进行访问
> `-B SECONDS` #后台运行超时时间
> `-C` #模拟运行环境并进行预运行，可以进行查错测试
> `-c CONNECTION` #连接类型使用
> `-f FORKS` #并行任务数，默认为5
> `-i INVENTORY` #指定主机清单的路径，默认为`/etc/ansible/hosts`
> `--list-hosts` #查看有哪些主机组
> `-m MODULE_NAME` #执行模块的名字，默认使用 command 模块，所以如果是只执行单一命令可以不用 -m参数
> `-o` #压缩输出，尝试将所有结果在一行输出，一般针对收集工具使用
> `-S` #用 su 命令
> `-R SU_USER` #指定 su 的用户，默认为 root 用户
> `-s` #用 sudo 命令
> `-U SUDO_USER` #指定 sudo 到哪个用户，默认为 root 用户
> `-T TIMEOUT` #指定 ssh 默认超时时间，默认为10s，也可在配置文件中修改
> `-u REMOTE_USER` #远程用户，默认为 root 用户
> `-v` #查看详细信息，同时支持`-vvv`，`-vvvv`可查看更详细信息



### ansible 配置公私钥

上面我们已经提到过 ansible 是基于 ssh 协议实现的，所以其配置公私钥的方式与 ssh 协议的方式相同，具体操作步骤如下：

```bash
# 1.生成私钥
ssh-keygen -f ~/.ssh/id_rsa -N ''
# 2.向主机分发私钥
for i in CentOS7-Node1 CentOS7-Node2 CentOS7-Node3 CentOS7-Node4 CentOS7-Node5
do
    ssh-copy-id $i
done
```

这样的话，就可以实现无密码登录，我们的实验过程也会顺畅很多。
注意，如果出现了一下报错：

```
-bash: ssh-copy-id: command not found
```

那么就证明我们需要安装一个包：

```bash
yum -y install openssh-clientsansible
```

把包安装上即可。