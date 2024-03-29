---
title:  2. Kubernetes详细教程-kubernetes集群环境搭建
date: 2021-10-21
tags:
 - Kubernetes
categories:
 - 运维
---

[原文链接](https://gitee.com/yooome/golang/blob/main/k8s详细教程/Kubernetes详细教程.md#2-kubernetes集群环境搭建) [视频教程](https://www.bilibili.com/video/BV1Qv41167ck?p=5)


# 2. kubernetes集群环境搭建

## 2.1 前置知识点

目前生产部署Kubernetes 集群主要有两种方式：

**kubeadm**

Kubeadm 是一个K8s 部署工具，提供`kubeadm init` 和`kubeadm join`，用于快速部署Kubernetes 集群。

官方地址：[https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm/](https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm/)

**二进制包**

从github 下载发行版的二进制包，手动部署每个组件，组成Kubernetes 集群。

Kubeadm 降低部署门槛，但屏蔽了很多细节，遇到问题很难排查。如果想更容易可控，推荐使用二进制包部署Kubernetes 集群，虽然手动部署麻烦点，期间可以学习很多工作原理，也利于后期维护。

![image-20200404094800622](./Kubenetes.assets/image-20200404094800622.png)

## 2.2 kubeadm 部署方式介绍

kubeadm 是官方社区推出的一个用于快速部署kubernetes 集群的工具，这个工具能通过两条指令完成一个kubernetes 集群的部署：

- 创建一个Master 节点`kubeadm init`
- 将Node 节点加入到当前集群中`kubeadm join <Master 节点的IP 和端口>`

## 2.3 安装要求

在开始之前，部署Kubernetes 集群机器需要满足以下几个条件：

- 一台或多台机器，操作系统CentOS7.x-86_x64
- 硬件配置：2GB 或更多RAM，2 个CPU 或更多CPU，硬盘30GB 或更多
- 集群中所有机器之间网络互通
- 可以访问外网，需要拉取镜像
- 禁止swap 分区

## 2.4 最终目标

- 在所有节点上安装 Docker 和 kubeadm
- 部署 Kubernetes Master
- 部署容器网络插件
- 部署 Kubernetes Node，将节点加入Kubernetes 集群中
- 部署 Dashboard Web 页面，可视化查看Kubernetes 资源

## 2.5 准备环境

![image-20210609000002940](./Kubenetes.assets/image-20210609000002940.png)

| 角色     | IP地址      | 组件                              |
| :------- | :---------- | :-------------------------------- |
| CentOS7-Node1 | 192.168.85.131 | docker，kubectl，kubeadm，kubelet |
| CentOS7-Node2 | 192.168.85.132 | docker，kubectl，kubeadm，kubelet |
| CentOS7-Node3 | 192.168.85.133 | docker，kubectl，kubeadm，kubelet |
| CentOS7-Node4 | 192.168.85.134 | docker，kubectl，kubeadm，kubelet |
| CentOS7-Node5 | 192.168.85.135 | docker，kubectl，kubeadm，kubelet |

## 2.6 环境初始化

### 2.6.1 检查操作系统的版本

```bash
# 此方式下安装kubernetes集群要求Centos版本要在7.5或之上
cat /etc/redhat-release
CentOS Linux release 7.9.2009 (Core)
```

### 2.6.2 主机名解析

为了方便集群节点间的直接调用，在这个配置一下主机名解析，企业中推荐使用内部DNS服务器

```bash
# 主机名成解析 编所使用台服务器的/etc/hosts文件，添加下面内容
192.168.85.130 CentOS7-Node0
192.168.85.131 CentOS7-Node1
192.168.85.132 CentOS7-Node2
192.168.85.133 CentOS7-Node3
192.168.85.134 CentOS7-Node4
192.168.85.135 CentOS7-Node5
192.168.85.136 CentOS7-Node6
192.168.85.137 CentOS7-Node7
192.168.85.138 CentOS7-Node8
192.168.85.139 CentOS7-Node9
```

### 2.6.3 时间同步

kubernetes要求集群中的节点时间必须精确一直，这里使用chronyd服务从网络同步时间

企业中建议配置内部的时间同步服务器

```bash
# 启动chronyd服务
systemctl start chronyd
systemctl enable chronyd
date
```

### 2.6.4 禁用 iptable 和 firewalld 服务

kubernetes和docker 在运行的中会产生大量的iptables规则，为了不让系统规则跟它们混淆，直接关闭系统的规则

```bash
# 1 关闭firewalld服务
systemctl stop firewalld
systemctl disable firewalld
# 2 关闭iptables服务
systemctl stop iptables
systemctl disable iptables
```

### 2.6.5 禁用 selinux

selinux是linux系统一下的一个安全服务，如果不关闭它，在安装集群中会产生各种各样的奇葩问题

```bash
# 将 SELinux 设置为 permissive 模式（相当于将其禁用）
# 临时设置
sudo setenforce 0
# 永久设置
# 1 编辑 /etc/selinux/config 文件，修改SELINUX的值为permissive
SELINUX=permissive
# 2 使用 sed 命令
sed -i 's/^SELINUX=enforcing$/SELINUX=permissive/' /etc/selinux/config
# 注意修改完毕之后需要重启linux服务
```

### 2.6.6 禁用swap分区

swap分区值的是虚拟内存分区，它的作用是物理内存使用完，之后将磁盘空间虚拟成内存来使用，启用swap设备会对系统的性能产生非常负面的影响，因此kubernetes要求每个节点都要禁用swap设备，但是如果因为某些原因确实不能关闭swap分区，就需要在集群安装过程中通过明确的参数进行配置说明

```bash
# 编辑分区配置文件/etc/fstab，注释掉swap分区一行
# 注意修改完毕之后需要重启linux服务
vim /etc/fstab
# 注释掉 /dev/mapper/centos-swap swap
# /dev/mapper/centos-swap swap
```

### 2.6.7 修改linux的内核参数

```bash
# 修改linux的内核采纳数，添加网桥过滤和地址转发功能
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF
# 重新加载配置
sudo sysctl -p
# 加载网桥过滤模块
modprobe br_netfilter
# 查看网桥过滤模块是否加载成功
lsmod | grep br_netfilter
```

### 2.6.8 配置ipvs功能

在Kubernetes中Service有两种带来模型，一种是基于iptables的，一种是基于ipvs的两者比较的话，ipvs的性能明显要高一些，但是如果要使用它，需要手动载入ipvs模块

```bash
# 1.安装ipset和ipvsadm
yum install ipset ipvsadm -y
# 2.添加需要加载的模块写入脚本文件
cat <<EOF /etc/sysconfig/modules/ipvs.modules
#!/bin/bash
modprobe br_netfilter
modprobe -- ip_vs
modprobe -- ip_vs_rr
modprobe -- ip_vs_wrr
modprobe -- ip_vs_sh
modprobe -- nf_conntrack_ipv4
EOF
# 3.为脚本添加执行权限
chmod +x /etc/sysconfig/modules/ipvs.modules
# 4.执行脚本文件
/bin/bash /etc/sysconfig/modeules/ipvs.modules
# 5.查看对应的模块是否加载成功
lsmod | grep -e -ip_vs -e nf_conntrack_ipv4
```
此时开始重启服务器

### 2.6.9 安装docker


~~1、切换镜像源~~
~~`wget https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo -O /etc/yum.repos.d.docker-ce.repo`~~

~~2、查看当前镜像源中支持的docker版本~~
~~`yum list docker-ce --showduplicates`~~

~~3、安装特定版本的docker-ce~~
~~必须制定--setopt=obsoletes=0，否则yum会自动安装更高版本~~
~~`yum install --setopt=obsoletes=0 docker-ce-18.06.3.ce-3.e17 -y`~~

```bash
# 1、下载安装Docker
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
# 2、添加一个配置文件
#Docker 在默认情况下使用Vgroup Driver为cgroupfs，而Kubernetes推荐使用systemd来替代cgroupfs
mkdir /etc/docker
# 3、编辑Docker配置文件
cat <<EOF /etc/docker/daemon.json
{
    "exec-opts": ["native.cgroupdriver=systemd"],
    "data-root": "/opt/data/docker",
    "registry-mirrors":  [
        "http://hub-mirror.c.163.com",
        "https://docker.mirrors.ustc.edu.cn",
        "https://registry.docker-cn.com",
        "https://reg-mirror.qiniu.com",
        "https://dockerhub.azk8s.cn"
    ]
}
EOF
# 5、启动dokcer
systemctl restart docker
systemctl enable docker
```

### 2.6.10 安装Kubernetes组件

[参考链接](https://developer.aliyun.com/mirror/kubernetes)
```bash
# 1、由于kubernetes的镜像在国外，速度比较慢，这里切换成国内的镜像源
# 2、编辑/etc/yum.repos.d/kubernetes.repo,添加下面的配置
[kubernetes]       
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
exclude=kubelet kubeadm kubectl

# 3、安装kubeadm、kubelet和kubectl
yum install kubeadm kubelet kubectl -y

# 4、配置kubelet的cgroup
# 编辑/etc/sysconfig/kubelet, 添加下面的配置
KUBELET_CGROUP_ARGS="--cgroup-driver=systemd"
KUBE_PROXY_MODE="ipvs"

# 5、设置kubelet开机自启
systemctl enable kubelet
```

### 2.6.11 准备集群镜像

```bash
# 在安装kubernetes集群之前，必须要提前准备好集群需要的镜像，所需镜像可以通过下面命令查看
kubeadm config images list
# 拉取镜像
kubeadm config images pull --image-repository=registry.aliyuncs.com/google_containers
# 保存镜像
docker save -o k8s-base-images.tar `docker images | grep google_containers | awk 'BEGIN{OFS=":";ORS=" "}{print $1,$2}'`
```

### 2.6.11 集群初始化

>下面的操作只需要在master节点上执行即可

```bash
# 创建集群
kubeadm init --apiserver-advertise-address=192.168.85.131 --image-repository registry.aliyuncs.com/google_containers --service-cidr=10.96.0.0/12 --pod-network-cidr=10.244.0.0/16
# 创建必要文件
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

> 下面的操作只需要在node节点上执行即可

```bash
kubeadm join 192.168.85.131:6443 --token awk15p.t6bamck54w69u4s8 \
    --discovery-token-ca-cert-hash sha256:a94fa09562466d32d29523ab6cff122186f1127599fa4dcd5fa0152694f17117 
```

在master上查看节点信息

```bash
kubectl get nodes
NAME            STATUS     ROLES                  AGE   VERSION
centos7-node1   NotReady   control-plane,master   9h    v1.22.3
centos7-node3   NotReady   <none>                 9h    v1.22.3
centos7-node4   NotReady   <none>                 9h    v1.22.3
```

### 2.6.13 安装网络插件，只在master节点操作即可

```bash
wget https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
```

由于外网不好访问，如果出现无法访问的情况，可以直接用下面的 记得文件名是kube-flannel.yml，位置：/root/kube-flannel.yml内容：

```bash
https://github.com/flannel-io/flannel/tree/master/Documentation/kube-flannel.yml
```

~~下载完成`kube-flannel.yml`后,将文件中的`quay.io`替换为`quay-mirror.qiniu.com`~~

下载完成`kube-flannel.yml`后,将文件中的`quay.io`替换为`quay.mirrors.ustc.edu.cn`

准备镜像
```bash
# 拉取镜像
docker pull rancher/mirrored-flannelcni-flannel-cni-plugin:v1.2
docker pull quay.mirrors.ustc.edu.cn/coreos/flannel:v0.15.0
# 保存镜像
docker save -o k8s-network-flannel-images.tar `docker images | grep flannel | awk 'BEGIN{OFS=":";ORS=" "}{print $1,$2}'`
```

### 2.6.14 重启kubelet和docker

```bash
# 重启kubelet
systemctl restart kubelet
# 重启docker
systemctl restart docker
```

使用配置文件启动fannel

```bash
kubectl apply -f kube-flannel.yml
```

等待它安装完毕 发现已经是 集群的状态已经是Ready

```bash
NAME            STATUS     ROLES                  AGE     VERSION
centos7-node1   Ready      control-plane,master   10m     v1.22.3
centos7-node2   Ready      <none>                 73s     v1.22.3
centos7-node3   Ready      <none>                 84s     v1.22.3
centos7-node4   Ready      <none>                 2m22s   v1.22.3
centos7-node5   Ready      <none>                 2m23s   v1.22.3
```

若没有变成Ready,可以检查 kube-system 的 pod 是否正常

```bash
kubectl get pods -n kube-system

NAME                                    READY   STATUS                  RESTARTS      AGE
coredns-7f6cbbb7b8-6lbzt                0/1     Pending                 0             9h
coredns-7f6cbbb7b8-flwg8                0/1     Pending                 0             9h
etcd-centos7-node1                      1/1     Running                 1 (9h ago)    9h
kube-apiserver-centos7-node1            1/1     Running                 1 (9h ago)    9h
kube-controller-manager-centos7-node1   1/1     Running                 1 (9h ago)    9h
kube-flannel-ds-5nk4h                   0/1     Init:0/2                0             3m39s
kube-flannel-ds-5rf6h                   0/1     Init:0/2                0             3m39s
kube-flannel-ds-t6dv7                   0/1     Init:ImagePullBackOff   0             3m39s
kube-proxy-pwprt                        1/1     Running                 1 (9h ago)    9h
kube-proxy-v68fz                        1/1     Running                 1 (31m ago)   9h
kube-proxy-vbwb8                        1/1     Running                 1 (9h ago)    9h
kube-scheduler-centos7-node1            1/1     Running                 1 (9h ago)    9h

# 发现有镜像是 Init:ImagePullBackOff
# 然后重新拉取镜像解决
```

### 2.6.16 kubeadm中的命令

```bash
# 生成 新的token
kubeadm token create --print-join-command
```

## 2.7 集群测试

### 2.7.1 创建一个nginx服务

```bash
kubectl create deployment nginx --image=nginx
```

### 2.7.2 暴露端口

```bash
kubectl expose deploy nginx --port=80 --target-port=80 --type=NodePort
```

### 2.7.3 查看服务

```bash
kubectl get pod,svc
```
```bash
NAME                         READY   STATUS    RESTARTS   AGE
pod/nginx-6799fc88d8-qd2nm   1/1     Running   0          2m4s

NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)        AGE
service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP        20m
service/nginx        NodePort    10.99.20.8   <none>        80:32200/TCP   113s
```

浏览器可以打开 http://192.168.85.131:32200 访问 nginx 服务