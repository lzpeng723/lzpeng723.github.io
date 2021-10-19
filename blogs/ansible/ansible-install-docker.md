---
title:  ansible 给多台主机安装 docker
date: 2021-10-19
tags:
 - ansible
categories:
 - 运维
---

# ansible 给多台主机安装 docker

## 编写 ansible.cfg 文件

```yml
---
[defaults]
# 主机清单配置文件
inventory = ./hosts
# 配置用户
remote_user = lzpeng
# 配置Roles文件路径
role_path = ./roles
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

## 编写 hosts 文件

```yml
[docker] # 组名
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

## 创建 role

```bash
mkdir ./roles
cd ./roles
ansible-galaxy init install-docker
tree ./install-docker
```

## 编写配置文件

daemon.json

```json
{
    "registry-mirrors":  [
        "http://hub-mirror.c.163.com",
        "https://docker.mirrors.ustc.edu.cn",
        "https://registry.docker-cn.com",
        "https://reg-mirror.qiniu.com",
        "https://dockerhub.azk8s.cn"
    ],
    "data-root": "/opt/data/docker"
}
```

## 编写 任务

```yml
---
# tasks file for install-docker
- name: 安装 curl
  yum:
    name: curl
    state: present
- name: 安装 docker
  shell: curl https://get.docker.com | sh
  args:
    creates: /usr/bin/docker
- name: 拷贝 docker 配置文件
  copy:
    src: daemon.json
    dest: /etc/docker/daemon.json
- name: 重新加载配置文件
  command: systemctl daemon-reload
- name: 重新启动 docker
  service: 
    name: docker
    state: restarted
```

## 创建剧本

```yml
---
- hosts: all
  roles:
   - install-docker
```

## 执行剧本

```bash
ansible-playbook install-docker.yml -f 5
```