---
title:  ansible 给多台主机安装 docker
date: 2021-10-19
tags:
 - ansible
 - docker
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

```
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

vars/main.yml

```yml
---
# vars file for install-docker
INSTALL_DOCKER_COMPOSE: true
DOCKER_COMPOSE_VERSION: v2.0.1
INSTALL_DOCKER_MACHINE: false
DOCKER_MACHINE_VERSION: v0.16.2
DOCKER_DATA_ROOT: /opt/data/docker
UNINSTALL_OLD_DOCKER: false
```

templates/daemon.json

```json
{
    "exec-opts": ["native.cgroupdriver=systemd"],
    "data-root": "{{DOCKER_DATA_ROOT}}",
    "registry-mirrors":  [
        "http://hub-mirror.c.163.com",
        "https://docker.mirrors.ustc.edu.cn",
        "https://registry.docker-cn.com",
        "https://reg-mirror.qiniu.com",
        "https://dockerhub.azk8s.cn"
    ]
}
```

## 编写 任务

```yml
---
# tasks file for install-docker
- name: 卸载旧 Docker
  when: UNINSTALL_OLD_DOCKER
  block:
    - name: 停止 Docker
      ignore_errors: true
      service: 
        name: docker
        state: stopped
    - name: 卸载旧版本 Docker
      yum:
        name:
          - docker
          - docker-client
          - docker-client-latest
          - docker-common
          - docker-latest
          - docker-latest-logrotate
          - docker-logrotate
          - docker-engine
          - docker-ce
          - docker-ce-cli
          - containerd.io   
        state: absent
    - name: 删除旧版本 Docker 数据文件夹
      file:
        path: "{{DOCKER_DATA_ROOT}}"
        state: absent
    - name: 删除 /etc/docker 文件夹
      file:
        path: /etc/docker
        state: absent
- name: 安装 yum-utils
  yum:
    name:
      - yum-utils
    state: present
- name: 设置 yum 源
  command: yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
- name: 安装 Docker
  yum:
    name:
      - docker-ce
      - docker-ce-cli
      - containerd.io   
    state: present
- name: 创建 /etc/docker 文件夹
  file:
    path: /etc/docker/
    state: directory
- name: 拷贝 docker 配置文件
  template:
    src: daemon.json
    dest: /etc/docker/daemon.json
- name: 重新加载配置文件
  command: systemctl daemon-reload
- name: 重新启动 Docker
  service: 
    name: docker
    state: restarted
- name: 开机自启 Docker
  command: systemctl enable docker
- name: 安装 docker-compose
  when: INSTALL_DOCKER_COMPOSE
  ignore_errors: true
  get_url:
    url: https://github.com/docker/compose/releases/download/{{DOCKER_COMPOSE_VERSION}}/docker-compose-{{ansible_system}}-{{ansible_architecture}}
    dest: /usr/local/bin/docker-compose
    mode: '0755'
- name: 安装 docker-machine
  when: INSTALL_DOCKER_MACHINE
  ignore_errors: true
  get_url:
    url: https://github.com/docker/machine/releases/download/{{DOCKER_MACHINE_VERSION}}/docker-machine-{{ansible_system}}-{{ansible_architecture}}
    dest: /usr/local/bin/docker-machine
    mode: '0755'
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