---
title:  ansible playbook
date: 2021-10-18
tags:
 - ansible
categories:
 - 运维
---


## Ansible playbook 简介

playbook 是 ansible 用于配置，部署，和管理被控节点的剧本。
通过 playbook 的详细描述，执行其中的一系列 tasks ，可以让远端主机达到预期的状态。playbook 就像 Ansible 控制器给被控节点列出的的一系列 to-do-list ，而被控节点必须要完成。
也可以这么理解，playbook 字面意思，即剧本，现实中由演员按照剧本表演，在Ansible中，这次由计算机进行表演，由计算机安装，部署应用，提供对外服务，以及组织计算机处理各种各样的事情。

### Ansible playbook使用场景

执行一些简单的任务，使用ad-hoc命令可以方便的解决问题，但是有时一个设施过于复杂，需要大量的操作时候，执行的ad-hoc命令是不适合的，这时最好使用playbook。
就像执行shell命令与写shell脚本一样，也可以理解为批处理任务，不过playbook有自己的语法格式。
使用playbook你可以方便的重用这些代码，可以移植到不同的机器上面，像函数一样，最大化的利用代码。在你使用Ansible的过程中，你也会发现，你所处理的大部分操作都是编写playbook。可以把常见的应用都编写成playbook，之后管理服务器会变得十分简单。

- Ansible ad-hoc可以通过命令行形式远程管理其他主机
  - v适合执行一些临时性简单任务
- Ansible playbook中文名称叫剧本
  - 将经常需要执行的任务写入一个文件(剧本)
  - 剧本中可以包含多个任务
  - 剧本写后，我们随时调用剧本，执行相关的任务命令
  - playbook剧本要求按照YAML格式编写
  - 适合执行周期性经常执行的复杂任务


### Ansible playbook格式简介

playbook由YMAL语言编写。YAML( /ˈjæməl/ )参考了其他多种语言，包括：XML、C语言、Python、Perl以及电子邮件格式RFC2822，Clark Evans在2001年5月在首次发表了这种语言，另外Ingy döt Net与OrenBen-Kiki也是这语言的共同设计者。

YMAL格式是类似于JSON的文件格式，便于人理解和阅读，同时便于书写。首先学习了解一下YMAL的格式，对我们后面书写playbook很有帮助。以下为playbook常用到的YMAL格式：

- "#"代表注释，-般第一行为三个横杠
- 键值对使用":"表示，数组使用"-"表示
- 缩进必须由两个或以上空格组成
- 相同层级的缩进必须对齐
- 全文不可以使用tab键
- 区分大小写、扩展名为yml或者yaml
- 跨行数据需要使用>或者| (|会保留换行符)

下面是一个举例：

```yaml
---
#安装与运行mysql服务
- hosts: CentOS7-Node1
  remote_user: lzpeng
  tasks:
    - name: 安装mysql
      yum: name=mysql-server state=present
    - name: 启动mysqld服务
      service: name=mysql state=started
```

我们的文件名称应该以`.yml`结尾，像我们上面的例子就是`mysql.yml`。其中，有三个部分组成：

> `host部分`：使用 hosts 指示使用哪个主机或主机组来运行下面的 tasks ，每个 playbook 都必须指定 hosts ，hosts也**可以使用通配符格式**。主机或主机组在 inventory 清单中指定，可以使用系统默认的`/etc/ansible/hosts`，也可以自己编辑，在运行的时候加上`-i`选项，指定清单的位置即可。在运行清单文件的时候，`–list-hosts`选项会显示那些主机将会参与执行 task 的过程中。
> `remote_user`：指定远端主机中的哪个用户来登录远端系统，在远端系统执行 task 的用户，可以任意指定，也可以使用 sudo，但是用户必须要有执行相应 task 的权限。
> `tasks`：指定远端主机将要执行的一系列动作。tasks 的核心为 ansible 的模块，前面已经提到模块的用法。tasks 包含 `name` 和`要执行的模块`，name 是可选的，只是为了便于用户阅读，不过还是建议加上去，模块是必须的，同时也要给予模块相应的参数。

使用ansible-playbook运行playbook文件，得到如下输出信息，输出内容为JSON格式。并且由不同颜色组成，便于识别。一般而言

- 绿色代表执行成功，系统保持原样
- 黄色代表系统代表系统状态发生改变
- 红色代表执行失败，显示错误输出

执行有三个步骤：
1、收集facts 
2、执行tasks 
3、报告结果

下面我们修改vim配置,在使用vim编辑yml文件时，使用2个空格自动替换tab键(`tabstop=2 expandtab`),开启自动缩进对齐，缩进宽度为2个空格`(shiftwidth=2`)。

```bash
vim ~/.vimrc

# 添加以下内容
autocmd FileType yaml setlocal ai ts=2 sw=2 et
autocmd FileType yml setlocal ai ts=2 sw=2 et
```

## 举例

### 网络连通性测试

```bash
cd ~/ansible
vim ping.yml
```

编写如下配置文件

```yaml
---
- hosts: test
  tasks:
    - name: 网络连通性测试
      ping:
```

测试运行结果

```bash
# 指定并发连接 5 台主机
ansible-playbook ~/ansible/ping.yml -f 5
```

### 创建系统用户、账户属性、设置密码

```yaml
---
- hosts: test
  tasks:
    - name: 创建用户 lzpeng 设置密码 123456
      user:
        name: lzpeng
        uid: 1040
        group: daemon
        shell: /bin/bash
        password: "{{'123456' | password_hash('sha512')}}"
```

### 删除用户

```yaml
---
- hosts: test
  tasks:
    - name: 删除用户 lzpeng
      user:
        name: lzpeng
        state: absent
```

### 使用vdb创建卷组和逻辑卷(手动添加磁盘sdb)

```yaml
---
- hosts: test
  tasks:
    - name: 创建第一个主分区
      parted:
        device: /dev/sdb
        number: 1
        state: present
        part_end: 1GiB
    - name: 创建第二个主分区
      parted:
        device: /dev/sdb
        number: 2
        state: present
        part_start: 1GiB
        part_end: 3GiB
    - name: 创建一个卷组
      lvg:
        vg: my_vg
        pvs: /dev/sdb1
    - name: 创建一个逻辑卷
      lvol:
        vg: my_vg
        lv: my_lv
        size: 512m
```

### 安装软件、升级软件、安装组包

```yaml
---
- hosts: test
  tasks:
    - name: 安装软件包
      yum:
        name:
          - httpd
          - mariadb
          - mariadb-server
    - name: 安装组包
      yum:
        name: "@Development tools"
    - name: 升级软件
      yum:
        name: "*"
        state: latest
```

### debug 显示变量值

```yaml
---
- hosts: test
  tasks:
    - debug:
        var: ansible_all_ipv4.addresses
    - debug:
        msg: "主机名称是 {{ansible_hostname}}"
    - debug:
        var: ansible_devices.sda.partitions.sda1.size
    - debug:
        msg: "总内存大小 {{ansible_memtotal_mb}} MB"
```

## 4）variables 部分

Ansible支持十几种定义变量的方式
这里我们只介绍其中一部分变量，根据优先级排序

#### Inventory变量

```yaml
[test]
CentOS7-Node1 myvar1="hello" myvar2="h.txt" # 主机变量
[test:vars]
yourname="lzpeng" #组变量
```

#### Host Facts变量

无需定义直接在剧本中使用

```yaml
---
- hosts: test
  tasks:
    - name: 使用 Facts 信息
      copy:
        content: "{{ansible_hostname}}: {{ansible_bios_version}}"
        dest: /tmp/facts.txt
```

#### Register变量

register语句可以将某个命令的执行结果保存到变量中

```yaml
---
- hosts: test
  tasks:
    - name: 保存变量
      shell: hostname
      register: myvar
    - name: 打印变量
      debug:
        var: myvar.stdout
```

#### Playbook变量

使用 vars 在 playbook 内定义变量

```yaml
---
- hosts: test
  vars: 
    iname: lzpneg723
  tasks:
    - name: 打印变量
      debug:
        var: iname
```

### Playbook提示变量

根据提示输入变量的值

```yaml
---
- hosts: test
  vars_prompt: 
    - name: iname
      prompt: 请输入用户名
      private: no # 回显用户名
    - name: ipassword
      prompt: 请输入密码
      private: yes # 不显示密码
  tasks:
    - name: 打印变量
      debug:
        msg: "用户名: {{iname}}, 密码: {{ipassword}}"
```

### 变量文件

```yaml
---
iname: lzpeng
ipassword: 123456
```

```yaml
---
- hosts: test
  vars_files: variables.yml
  tasks:
    - name: 打印变量
      debug:
        msg: "用户名: {{iname}}, 密码: {{ipassword}}"
```

### 命令行变量

```yaml
---
- hosts: test
  tasks:
    - name: 打印变量
      debug:
        msg: "用户名: {{iname}}, 密码: {{ipassword}}"
```

```bash
ansible-playbook command_var.yml -e iname=lzpeng ipassword=123456
```

### firewalld 模块 配置防火墙策略

```yaml
---
- hosts: test
  tasks:
    - name: 安装防火墙
      yum:
        name: firewalld
        state: present
    - name: 运行防火墙
      service:
        name: firewalld
        state: started
        enabled: yes
    - name: 设置防火墙策略
      firewalld:
        port: 80/tcp
        permanent: yes
        immediate: yes
        state: enabled
```

### template 模块

- copy模块 可以将一个文件拷贝给远程主机
- 但是如果希望每个拷贝的文件内容都不一样呢?
- 如何给所有web主机拷贝index.html内容是各自的IP地址
- Ansible 可以利用Jinja2模板引擎读取变量
  - 之前在playbook中调用变量，也是Jinja2的功能
  - Jinja2模块的表达式包含在分隔符"{{ }}"内


```bash
cat ~/ansible/template/index.html
Welcome to {{ansible_hostname}} on {{ansible_ens33.ipv4.address}}
```

```yaml
---
- hosts: test
  tasks:
    - name: 安装防火墙
      template:
        src: ~/ansible/template/index.html
        dest: ~/tmp/index.html
```
  
