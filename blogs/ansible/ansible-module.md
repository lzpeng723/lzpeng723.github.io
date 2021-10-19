---
title:  ansible 常用模块
date: 2021-10-17
tags:
 - ansible
categories:
 - 运维
---

## ansible 常用模块


### 1）主机连通性测试

我们使用`ansible test -m ping`命令来进行主机连通性测试，效果如下：

```bash
ansible test -m ping

CentOS7-Node1 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python"
    }, 
    "changed": false, 
    "ping": "pong"
}
```

这样就说明我们的主机是连通状态的。接下来的操作才可以正常进行。


### 2）command 模块

command 模块为默认模块，所以`-m command`可以不写
这个模块可以直接在远程主机上执行命令，并将结果返回本主机。
举例如下：

```bash
ansible test -m command -a 'uptime'

CentOS7-Node1 | CHANGED | rc=0 >>
 21:40:02 up  3:33,  1 user,  load average: 0.01, 0.02, 0.05
```

命令模块接受命令名称，后面是空格分隔的列表参数。给定的命令将在所有选定的节点上执行。它不会通过shell进行处理，比如$HOME和操作如"<"，">"，"|"，";"，"&" 工作（需要使用（shell）模块实现这些功能）。注意，该命令不支持`|` 管道命令。

下面来看一看该模块下常用的几个命令：

> chdir # 在执行命令之前，先切换到该目录
> executable # 切换shell来执行命令，需要使用命令的绝对路径
> free_form # 要执行的Linux指令，一般使用Ansible的-a参数代替。
> creates # 一个文件名，当这个文件存在，则该命令不执行
> removes # 一个文件名，当这个文件不存在，则该命令不执行

下面我们来看看这些命令的执行效果：

```bash
# 先切换到 /tmp/ 目录，再执行 touch a.txt b.txt c.txt 命令
ansible test -m command -a 'chdir=/tmp/ touch a.txt b.txt c.txt'

CentOS7-Node1 | CHANGED | rc=0 >>

#如果 /tmp/a.txt 存在，则不执行 touch d.txt 命令
ansible test -m command -a 'chdir=/tmp/ creates=/tmp/a.txt touch d.txt'

CentOS7-Node1 | SUCCESS | rc=0 >>
skipped, since /tmp/a.txt exists

#如果 /tmp/a.txt 存在，则执行 rm -rf a.txt b.txt c.txt d.txt 命令
ansible test -m command -a 'chdir=/tmp/ removes=/tmp/a.txt rm -rf a.txt b.txt c.txt d.txt'

CentOS7-Node1 | CHANGED | rc=0 >>

```

### 3）shell 模块

shell模块可以在远程主机上调用shell解释器运行命令，支持shell的各种功能，例如管道等。

```bash
#进程数量
ansible test -m shell -a 'ps -aux | wc -l'
# 如果密钥不存在则生成密钥
ansible test -m shell -a "ssh-keygen -f ~/.ssh/id_rsa -N '' creates=~/.ssh/id_rsa"
# 当存在 unzip 命令时才执行解压操作
ansible test -m shell -a "upzip xx.zip removes=/bin/unzip"
```

只要是我们的shell命令，都可以通过这个模块在远程主机上运行，这里就不一一举例了。

> 注: 使用`command`模块和`shell`模块必须执行非交互式命令，不可执行交互式命令，比如`vim`,`top`等。

### 4）copy 模块

　　这个模块用于将文件复制到远程主机，同时支持给定内容生成文件和修改权限等。
　　其相关选项如下：

> `src` # 被复制到远程主机的本地文件。可以是绝对路径，也可以是相对路径。如果路径是一个目录，则会递归复制，用法类似于"rsync"
> `content` # 用于替换"src"，可以直接指定文件的值
> `dest` # 必选项，将源文件复制到的远程主机的**绝对路径**
> `backup` # 当文件内容发生改变后，在覆盖之前把源文件备份，备份文件包含时间信息
> `directory_mode` # 递归设定目录的权限，默认为系统默认权限
> `force` # 当目标主机包含该文件，但内容不同时，设为"yes"，表示强制覆盖；设为"no"，表示目标主机的目标位置不存在该文件才复制。默认为"yes"
> `others` # 所有的 file 模块中的选项可以在这里使用

用法举例如下：

#### 复制文件：

```bash
echo AAA >> ./temp.txt
ansible test -m copy -a 'src=./temp.txt dest=/tmp/temp123.txt mode=666'
ansible test -a 'ls -l /tmp/temp123.txt'

rm -f ./temp.txt
ansible test -m file -a 'path=/tmp/temp123.txt state=absent'
```

#### 给定内容生成文件，并制定权限

```bash
ansible test -m copy -a 'content="I am Lzpeng" dest=/tmp/temp123.txt mode=666'
ansible test -a 'ls -l /tmp/temp123.txt'

ansible test -m file -a 'path=/tmp/temp123.txt state=absent'
```

### 5）file 模块

该模块主要用于设置文件的属性，比如创建文件、创建链接文件、删除文件等。
下面是一些常见的命令：

> `force` # 需要在两种情况下强制创建软链接，一种是源文件不存在，但之后会建立的情况下；另一种是目标软链接已存在，需要先取消之前的软链，然后创建新的软链，有两个选项：yes|no
> `group` # 定义文件/目录的属组。后面可以加上`mode`：定义文件/目录的权限
> `owner` # 定义文件/目录的属主。后面必须跟上`path`：定义文件/目录的路径
> `recurse` # 递归设置文件的属性，只对目录有效，后面跟上`src`：被链接的源文件路径，只应用于`state=link`的情况
> `dest` # 被链接到的路径，只应用于`state=link`的情况
> `state` # 状态，有以下选项：
>
> > `directory`： # 如果目录不存在，就创建目录
> > `file`： # 即使文件不存在，也不会被创建
> > `link`： # 创建软链接
> > `hard`： # 创建硬链接
> > `touch`： # 如果文件不存在，则会创建一个新的文件，如果文件或目录已存在，则更新其最后修改时间
> > `absent`： # 删除目录、文件或者取消链接文件

用法举例如下：

#### 创建目录

```bash
ansible test -m file -a 'path=/tmp/tmp-dir state=directory'
ansible test -m shell -a 'ls -l /tmp | grep tmp-dir'
```

#### 创建空文件

```bash
ansible test -m file -a 'path=/tmp/tmp-dir/b.txt state=touch'
ansible test -m shell -a 'ls -l /tmp/tmp-dir/b.txt'
```

#### 创建链接文件

```bash
ansible test -m file -a 'path=/tmp/tmp-dir/a.txt src=/tmp/tmp-dir/b.txt state=link'
ansible test -m shell -a 'ls -l /tmp/tmp-dir/a.txt'
```

#### 删除文件

```bash
ansible test -m file -a 'path=/tmp/tmp-dir state=absent'
ansible test -m shell -a 'ls -l /tmp/tmp-dir'
```

### 6）fetch 模块

该模块用于从远程某主机获取（复制）文件到本地。
有两个选项：

> `dest`：用来存放文件的目录
> `src`：在远程拉取的文件，并且必须是一个**file**，不能是**目录**

具体举例如下：

```bash
ansible test -m fetch -a 'src=/etc/hostname dest=./'
```

### 7）cron 模块

该模块适用于管理`cron`计划任务的。
其使用的语法跟我们的`crontab`文件中的语法一致，同时，可以指定以下选项：

> `day` # 日应该运行的工作( 1-31, *, */2, )
> `hour` # 小时 ( 0-23, *, */2, )
> `minute` #分钟( 0-59, *, */2, )
> `month` # 月( 1-12, *, /2, )
> `weekday` # 周 ( 0-6 for Sunday-Saturday,, )
> `job` # 指明运行的命令是什么
> `name` # 定时任务描述
> `reboot` # 任务在重启时运行，不建议使用，建议使用special_time
> `special_time` # 特殊的时间范围，参数：reboot（重启时），annually（每年），monthly（每月），weekly（每周），daily（每天），hourly（每小时）
> `state` # 指定状态，present表示添加定时任务，也是默认设置，absent表示删除定时任务
> `user` # 以哪个用户的身份执行

举例如下：

#### 添加计划任务

```bash
ansible test -m cron -a 'name="ntp update every 5 min" minute=*/5 job="/sbin/ntpdate 172.17.0.1 &> /dev/null"'
ansible test -m shell -a 'crontab -l'
```

#### 删除计划任务

如果我们的计划任务添加错误，想要删除的话，则执行以下操作：
首先我们查看一下现有的计划任务：

```bash
ansible test -m shell -a 'crontab -l'
ansible test -m cron -a 'name="df everyday" hour=15 job="df -lh >> /tmp/disk_total &> /dev/null" state=absent'
ansible test -m shell -a 'crontab -l'
```

### 8）yum 模块

顾名思义，该模块主要用于软件的安装。
其选项如下：

> `name` # 所安装的包的名称
> `state=` # `present`--->安装， `latest`--->安装最新的(升级), `absent`---> 卸载软件。
> `update_cache` # 强制更新yum的缓存
> `conf_file` # 指定远程yum安装时所依赖的配置文件（安装本地已有的包）。
> `disable_pgp_check` # 是否禁止GPG checking，只用于`present`or `latest`。
> `disablerepo` # 临时禁止使用yum库。 只用于安装或更新时。
> `enablerepo` # 临时使用的yum库。只用于安装或更新时。

下面我们就来安装一个包试试看：

```bash
ansible test -m yum -a 'name=httpd state=present'
```

### 9）service 模块

该模块用于服务程序的管理。
其主要选项如下：

> `arguments` # 命令行提供额外的参数
> `enabled` # 设置开机启动。
> `name` #服务名称
> `runlevel` # 开机启动的级别，一般不用指定。
> `sleep` # 在重启服务的过程中，是否等待。如在服务关闭以后等待2秒再启动。(定义在剧本中。)
> `state` # 有四种状态，分别为：`started`--->启动服务， `stopped`--->停止服务， `restarted`--->重启服务， `reloaded`--->重载配置

下面是一些例子：

#### 开启服务并设置自启动

```bash
ansible test -m service -a 'name=nginx state=started enabled=true'
# 测试端口
ansible test -m shell -a 'ss -ntl'
```

#### 关闭服务

我们也可以通过该模块来关闭我们的服务：

```bash
ansible test -m service -a 'name=nginx state=stopped'
# 测试端口
ansible test -m shell -a 'ss -ntl'
```

### 10）user 模块

该模块主要是用来管理用户账号。
其主要选项如下：

> `comment` # 用户的描述信息
> `createhome` # 是否创建家目录
> `force` # 在使用state=absent时, 行为与userdel –force一致.
> `group` # 指定基本组
> `groups` # 指定附加组，如果指定为(groups=)表示删除所有组
> `home` # 指定用户家目录
> `move_home` # 如果设置为home=时, 试图将用户主目录移动到指定的目录
> `name` # 指定用户名
> `non_unique` # 该选项允许改变非唯一的用户ID值
> `password` # 指定用户密码
> `remove` # 在使用state=absent时, 行为是与userdel –remove一致
> `shell` # 指定默认shell
> `state` # 设置帐号状态，不指定为创建，指定值为absent表示删除
> `system` # 当创建一个用户，设置这个用户是系统用户。这个设置不能更改现有用户
> `uid` # 指定用户的uid

举例如下：

#### 添加一个用户并指定其 uid

```bash
ansible test -m user -a 'name=tuser1 uid=10001'
ansible test -m shell -a 'cat /etc/passwd | grep tuser1'
```

#### 添加一个用户并指定其 密码

```bash
ansible test -m user -a "name=tuser2 password={{'123456' | password_hash('sha512')}}"
ansible test -m shell -a 'cat /etc/passwd | grep tuser2'
```

#### 删除用户

```bash
# remove 控制是否删除家目录 邮箱
ansible test -m user -a 'name=tuser1 state=absent remove=true'
ansible test -m shell -a 'cat /etc/passwd | grep tuser1'
```



### 11）group 模块

该模块主要用于添加或删除组。
常用的选项如下：

> `gid` # 设置组的GID号
> `name` # 指定组的名称
> `state` # 指定组的状态，默认为创建，设置值为`absent`为删除
> `system` # 设置值为`yes`，表示创建为系统组

举例如下：

#### 创建组

```bash
ansible test -m group -a 'name=sanguo gid=12222'
ansible test -m shell -a 'cat /etc/group | grep 12222'
```

#### 删除组

```bash
ansible test -m group -a 'name=sanguo state=absent'
ansible test -m shell -a 'cat /etc/group | grep 12222'
```

### 12）script 模块

该模块用于将本机的脚本在被管理端的机器上运行。
该模块直接指定脚本的路径即可，我们通过例子来看一看到底如何使用的：
首先，我们写一个脚本，并给其加上执行权限：

```bash
vim ./test.sh	

# 添加如下内容
#!/bin/bash	
date >> /tmp/current_date.log
df -lh >> /tmp/disk_total.log
cat /tmp/current_date.log
cat /tmp/disk_total.log
rm -rf /tmp/current_date.log /tmp/disk_total.log
```

然后，我们直接运行命令来实现在被管理端执行该脚本：

```bash
ansible test -m script -a './test.sh'

CentOS7-Node1 | CHANGED => {
    "changed": true, 
    "rc": 0, 
    "stderr": "Shared connection to centos7-node1 closed.\r\n", 
    "stderr_lines": [
        "Shared connection to centos7-node1 closed."
    ], 
    "stdout": "2021年 10月 17日 星期日 22:29:33 CST\r\n文件系统                 容量  已用  可用 已用% 挂载点\r\ndevtmpfs                 475M     0  475M    0% /dev\r\ntmpfs                    487M     0  487M    0% /dev/shm\r\ntmpfs                    487M  7.7M  479M    2% /run\r\ntmpfs                    487M     0  487M    0% /sys/fs/cgroup\r\n/dev/mapper/centos-root   17G  1.4G   16G    9% /\r\n/dev/sda1               1014M  138M  877M   14% /boot\r\ntmpfs                     98M     0   98M    0% /run/user/0\r\n", 
    "stdout_lines": [
        "2021年 10月 17日 星期日 22:29:33 CST", 
        "文件系统                 容量  已用  可用 已用% 挂载点", 
        "devtmpfs                 475M     0  475M    0% /dev", 
        "tmpfs                    487M     0  487M    0% /dev/shm", 
        "tmpfs                    487M  7.7M  479M    2% /run", 
        "tmpfs                    487M     0  487M    0% /sys/fs/cgroup", 
        "/dev/mapper/centos-root   17G  1.4G   16G    9% /", 
        "/dev/sda1               1014M  138M  877M   14% /boot", 
        "tmpfs                     98M     0   98M    0% /run/user/0"
    ]
}

```

可以看出已经执行成功了。


### 13）setup 模块

该模块主要用于收集信息，是通过调用facts组件来实现的。
facts组件是Ansible用于采集被管机器设备信息的一个功能，我们可以使用setup模块查机器的所有facts信息，可以使用filter来查看指定信息。整个facts信息被包装在一个JSON格式的数据结构中，ansible_facts是最上层的值。
facts就是变量，内建变量 。每个主机的各种信息，cpu颗数、内存大小等。会存在facts中的某个变量中。调用后返回很多对应主机的信息，在后面的操作中可以根据不同的信息来做不同的操作。如redhat系列用yum安装，而debian系列用apt来安装软件。

#### 查看信息

我们可以直接用命令获取到变量的值，具体我们来看看例子：

```bash
# 查看所有信息
ansible test -m setup
# 过滤 filter 支持*通配符
ansible test -m setup -a 'filter="*mem*"'
```

#### 保存信息

我们的setup模块还有一个很好用的功能就是可以保存我们所筛选的信息至我们的主机上，同时，文件名为我们被管制的主机的IP，这样方便我们知道是哪台机器出的问题。
我们可以看一看例子：

```bash
ansible test -m setup -a 'filter="*mem*"' --tree /tmp/facts
# 然后我们可以去查看一下：
cd /tmp/facts/
ls
```

### 其他模块

lineinfile
replace
yum_repository
lvg(依赖 yum lvm2)
lvol
parted
filesystem