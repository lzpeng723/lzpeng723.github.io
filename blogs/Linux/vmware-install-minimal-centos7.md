---
title:  VMWare 安装 CentOS7
date: 2021-10-16
tags:
 - Linux
categories:
 - 运维
---

# VMWare 安装 CentOS7

## 环境准备

### 安装VmWare 16

[VMWare最新版本唯一官方下载地址](https://www.vmware.com/go/getworkstation-win)

VMWare Workstation Pro 16 密钥：（随便输哪个）
`ZF3R0-FHED2-M80TY-8QYGC-NPKYF`
`YF390-0HF8P-M81RQ-2DXQE-M2UT6`
`ZF71R-DMX85-08DQY-8YMNC-PPHV8`

### 下载 CentOS 7

可以选择从[官网](https://www.centos.org/download)或者[阿里云镜像仓库](https://mirrors.aliyun.com/centos/7.9.2009/isos/x86_64/)下载

选择 `CentOS-7-x86_64-DVD-2009.iso`

### VMWare 装 CentOS7

一直下一步即可，[参考链接](https://blog.csdn.net/Mikli/article/details/108342867)

### [安装 VMTools](https://kb.vmware.com/s/article/1018414)

```
mkdir /mnt/cdrom
mount /dev/cdrom /mnt/cdrom
cp /mnt/cdrom/VMwareTools-version.tar.gz /tmp/
# Where version is the VMware Tools package version.
cd /tmp
tar -zxvf VMwareTools-version.tar.gz
cd vmware-tools-distrib
./vmware-install.pl
umount /mnt/cdrom
cd /
rm /tmp/VMwareTools-version.tar.gz
rm -rf /tmp/vmware-tools-distrib
```

安装过程出现 `-bash: ./vmware-install.pl: /usr/bin/perl: bad interpreter: No such file or directory`
安装相关的环境即可,输入命令 `yum -y install gcc gcc-c++ perl make kernel-headers kernel-devel`

### 配置网络

[參考链接](https://blog.csdn.net/zsg88/article/details/75095229)

配置固定ip
```
vim /etc/sysconfig/network-scripts/ifcfg-ens33

####################################################
TYPE="Ethernet"
PROXY_METHOD="none"
BROWSER_ONLY="no"
BOOTPROTO="static" #dhcp改为static 
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="ens33"
UUID="dc94394f-84ed-48b4-911f-c1e0f298c5ce"
DEVICE="ens33"
ONBOOT="yes" #开机启用本配置
IPADDR=192.168.85.130 #静态IP
GATEWAY=192.168.85.2 #默认网关
NETMASK=255.255.255.0 #子网掩码
DNS1=192.168.85.2 #DNS 配置
####################################################
systemctl restart network
ping baidu.com
```

### 配置 yum 源

```
yum install -y wget
cd /etc/yum.repos.d
cp ./CentOS-Base.repo ./CentOS-Base.repo.bak
cp ./epel-7.repo ./epel-7.repo.bak
wget http://mirrors.aliyun.com/repo/Centos-7.repo
wget https://mirrors.aliyun.com/repo/epel-7.repo
yum clean all
yum makecache
yum update
```

### 安装 ssh

CentOS7 DVD 默认已安装启动

```
yum install -y openssl openssh-server
vim /etc/ssh/sshd_config
# 将 PermitRootLogin，RSAAuthentication，PubkeyAuthentication 的设置打开。
systemctl start sshd
systemctl enable sshd
```

配置 ssh 免密登录

```
ssh-keygen -f ~/.ssh/id_rsa -N ''
for i in CentOS7-Node1 CentOS7-Node2 CentOS7-Node3 CentOS7-Node4 CentOS7-Node5
do
    ssh-copy-id $i
done
```

### 常用软件安装

```
# 安装命令行补全
yum install -y bash-completion
```