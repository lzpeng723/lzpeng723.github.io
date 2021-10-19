---
title:  ansible 高级语法
date: 2021-10-19
tags:
 - ansible
categories:
 - 运维
---


## ansible 高级语法


### 默认 ansible 在遇到 error 会立刻停止 playbook

```yml
---
- hosts: test
  ignore_errors: true # 全局忽略错误
  tasks:
    - name: 启动一个不存在的服务
      ignore_errors: true # 此任务是否忽略错误
      service:
        name: hehe
        state: started
    - name: 创建一个文件
      file:
        path: ~/tmp/test.txt
        state: touch
```

### handlers

当某个任务需要依赖其他任务怎么办?

- 可以通过handlers定义一组任务
- 仅当某个任务触发(notify)handlers时才执行相应的任务
- 如果有多个notify触发执行handlers任务，也仅执行一次
- 仅当任务的执行状态为changed时handlers任务才执行
- handlers任务在所有其他任务都执行后才执行

```yml
---
- hosts: test
  tasks:
    - name: 创建文件夹 # 多次执行playbook该任务状态不再是changed
      file:
        path: ~/tmp/
        state: directory
      notify: 创建一个文件 # notify后面的名称必须和handlers中的任务名称一致
  handlers:
    - name: 创建一个文件
      file:
        path: ~/tmp/test.txt
        state: touch
```

### when 条件判断

- when可以定义判断条件，条件为真时才执行某个任务
- 常见条件操作符如下:
  ==、!=、>、>=、<、<=
- 多个条件可以使用and或or分割
- when表达式中调用变量不要使用{{ }}

```yml
---
- hosts: test
  tasks:
    - name: 若剩余内存小于 700 mb，则关闭 NetworkManager 服务
      service:
        name: NetworkManager
        state: stopped
      when: ansible_memfree_mb < 700
```

### block 任务组

- 使用 block 可以将多个任务合并为一个组

```yml
---
- hosts: test
  tasks:
    - name: 定义任务组
      block:
        - name: 安装 httpd
          yum:
            name: httpd
            state: present
        - name: 启动 httpd
          service:
            name: httpd
            state: started
      when: >
        ansible_memfree_mb > 700
        and
        ansible_distribution == "CentOS"
```


- rescue 定义 block 任务执行失败时要执行的其他任务
- always 定义无论 block 任务是否成功，都要执行的任务

```yml
---
- hosts: test
  tasks:
    - name: 任务块测试
      block:
        - name: 创建 test1.txt
          file:
            path: ~/tmp/test1.txt
            state: touch
      rescue:
        - name: 创建 test1.txt 失败，则创建 test2.txt
          file:
            path: ~/tmp/test2.txt
            state: touch
      always:
        - name: 无论创建 test1.txt 成功失败，都创建 test3.txt
          file:
            path: ~/tmp/test3.txt
            state: touch
```

### loop 循环

```yml
---
- hosts: test
  tasks:
    - name: 批量创建文件夹
      file:
        path: ~/tmp/{{item}} # 循环变量必须是 item
        state: directory
      loop:
        - School
        - Legend
        - Life
```

```yml
---
- hosts: test
  tasks:
    - name: 批量创建用户
      user:
        name: "{{item.iname}}"
        state: "{{item.ipass | password_hash('sha512')}}"
      loop:
        - {iname: 'tom', ipass: '123456'}
        - {iname: 'jerry', ipass: '123456'}
        - {iname: 'mary', ipass: '123456'}
```

## ansible-vault

- Ansible 有时需要访问一些敏感数据，如密码、Key等
- 使用 ansible-vault 可以加密和解密数据
  - encrypt 加密
  - decrypt 解密
  - view 查看

```bash
# 需要加密的敏感数据
echo 123456 > data.txt
# 加密文件
ansible-vault encrypt data.txt
# 查看文件
ansible-vault view data.txt
# 解密文件
ansible-vault decrypt data.txt
# 修改密码
ansible-vault rekey data.txt
```

加密、解密每次都输入密码很麻烦，可以将密码写入文件

```bash
# 需要加密的敏感数据
echo "I'm secret data" > data.txt
# 加密的密码
echo 123456 > pass.txt
# 加密文件
ansible-vault encrypt --vault-id=pass.txt data.txt
# 解密文件
ansible-vault decrypt --vault-id=pass.txt data.txt
```

传输加密文件时应该使用

```bash
ansible test -m copy  --vault-id=pass.txt -a "src=data.txt dest=/tmp/ mode=0600" 
```

加密变量文件

```yml
---
- hosts: test
  vars_files: variables.yml
  tasks:
    - name: 打印变量
      debug:
        msg: "用户名: {{iname}}, 密码: {{ipassword}}"
```
```bash
# 输入密码
ansible-vault encrypt variables.yml
ansible-playbook --ask-vault-pass test.yml
# 或指定密码文件
ansible-vault encrypt --vault-id=pass.txt variables.yml
ansible-playbook --vault-id=pass.txt test.yml
```

## ansible roles

- 在实际生产环境中，为了实现不同的功能，我们会编写大量的playbook文件
- 而且，每个playbook还可能会调用其他文件(如变量文件)
- 对于海量的、无规律的文件，管理起来非常痛苦!
- Ansible从1.2版本开始支持Roles
- Roles是管理ansible文件的一种规范(目录结构)
- Roles会按照标准的规范，自动到特定的目录和文件中读取数据

### Roles 规范的目录结构

> role-name
> ├── defaults
> │   └── main.yml  # 定义变量的缺省值，优先级较低
> ├── files # 存储静态文件的目录
> ├── handlers
> │   └── main.yml # 定义 handlers
> ├── meta
> │   └── main.yml # 写作者、 版本等描述信息
> ├── README.md # 整个角色(role)的描述信息
> ├── tasks
> │   └── main.yml # 定义任务的地方
> ├── templates # 存放动态数据文件的地方(模板文件)
> ├── tests
> │   ├── inventory
> │   └── test.yml
> └── vars
>     └── main.yml # 定义变量，优先级高


### 创建 Role

```bash
mkdir ~/ansible/roles
# 创建一个Role,该Role的目的是使用模板修改远程主机的/tmp/issue文件
ansible-galaxy init ~/ansible/roles/issue
# 查看目录结构
tree ~/ansible/roles/issue
```

### 修改 Role

```bash
# 定义模板文件
cat ./templates/issue.j2
This is the system: {{ansible_hostname}}
Today'date is: {{ansible_date_time.date}}
Contract to {{admin}}
# 定义变量文件
cat ./vars/main.yml
---
# vars file for /root/ansible/roles/issue
admin: lzpeng723@163.com
# 修改任务文件,任务文件中不需要使用 tasks 关键字
cat ./tasks/main.yml
---
# vars file for /root/ansible/tasks/main.yml
- name: 传输模板文件
  template:
    src: issue.j2
    dest: /tmp/issue
```

### 在Playbook中调用Role

- 方法一: 在role相同目录下创建一个playbook调用
- 方法二: 在ansible.cfg设置role_path=路径

```yml
---
- hosts: test
  roles:
   - issue
```

## ansible-galaxy

Ansible Galaxy是官方提供的一个共享roles的平台
公用Roles仓库[https://galaxy.ansible.com](https://galaxy.ansible.com)

```bash
# 联网搜索roles
ansible-galaxy search 'httpd'
# 查看roles基本信息
ansible-galaxy info acandid.httpd
# 下载roles到特定目录
ansible-galaxy install acandid.httpd -p ~/ansible/roles/
# 列出本地有哪些roles
ansible-galaxy list -p ./roles/
```

### 下载Roles的方法

使用 ansible-galaxy install 或者编写 requirements.yml 文件

```yml
---
# 直接从 Ansible Galaxy 官网下载
- src: acandid.httpd
# 从某个 git 服务器下载
- src: http://gitlab.com/xxx/xxx.git
  scm: git
  version: 56e00a54
  name: nginx-acme
# 下载 tar 包, 支持 http、https、file
- src: http://examle.com/myrole.tar
  name: myrole
```

```bash
ansible-galaxy install -r requirements.yml -p ./roles
```