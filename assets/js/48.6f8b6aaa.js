(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{639:function(s,t,a){"use strict";a.r(t);var n=a(10),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"ansible-给多台主机安装-docker"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ansible-给多台主机安装-docker"}},[s._v("#")]),s._v(" ansible 给多台主机安装 docker")]),s._v(" "),a("h2",{attrs:{id:"编写-ansible-cfg-文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#编写-ansible-cfg-文件"}},[s._v("#")]),s._v(" 编写 ansible.cfg 文件")]),s._v(" "),a("div",{staticClass:"language-yaml line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("---")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("defaults"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 主机清单配置文件")]),s._v("\ninventory = ./hosts\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 配置用户")]),s._v("\nremote_user = lzpeng\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 配置Roles文件路径")]),s._v("\nrole_path = ./roles\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("privilege_escalation"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 是否需要切换用户")]),s._v("\nbecome = True\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 如何切换用户")]),s._v("\nbecome_method = sudo\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 切换成什么用户")]),s._v("\nbecome_user = root\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# sudo 是否需要输入密码")]),s._v("\nbecome_ask_pass = False\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br")])]),a("h2",{attrs:{id:"编写-hosts-文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#编写-hosts-文件"}},[s._v("#")]),s._v(" 编写 hosts 文件")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("[docker] # 组名\nCentOS7-Node1 # 主机名\n[proxy]\nCentOS7-Node2\n[webserver]\nCentOS7-Node[3:4] # 连续主机名\n[database]\nCentOS7-Node5\n[cluster:children] # 嵌套组\nwebserver\ndatabase\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br")])]),a("h2",{attrs:{id:"创建-role"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#创建-role"}},[s._v("#")]),s._v(" 创建 role")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" ./roles\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" ./roles\nansible-galaxy init install-docker\ntree ./install-docker\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("h2",{attrs:{id:"编写配置文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#编写配置文件"}},[s._v("#")]),s._v(" 编写配置文件")]),s._v(" "),a("p",[s._v("vars/main.yml")]),s._v(" "),a("div",{staticClass:"language-yaml line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("---")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# vars file for install-docker")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("INSTALL_DOCKER_COMPOSE")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean important"}},[s._v("true")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("DOCKER_COMPOSE_VERSION")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" v2.0.1\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("INSTALL_DOCKER_MACHINE")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean important"}},[s._v("false")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("DOCKER_MACHINE_VERSION")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" v0.16.2\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("DOCKER_DATA_ROOT")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" /opt/data/docker\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("UNINSTALL_OLD_DOCKER")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean important"}},[s._v("false")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("p",[s._v("templates/daemon.json")]),s._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"exec-opts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"native.cgroupdriver=systemd"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"data-root"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"{{DOCKER_DATA_ROOT}}"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"registry-mirrors"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v("  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"http://hub-mirror.c.163.com"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"https://docker.mirrors.ustc.edu.cn"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"https://registry.docker-cn.com"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"https://reg-mirror.qiniu.com"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"https://dockerhub.azk8s.cn"')]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br")])]),a("h2",{attrs:{id:"编写-任务"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#编写-任务"}},[s._v("#")]),s._v(" 编写 任务")]),s._v(" "),a("div",{staticClass:"language-yaml line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("---")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# tasks file for install-docker")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 卸载旧 Docker\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("when")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" UNINSTALL_OLD_DOCKER\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("block")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 停止 Docker\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("ignore_errors")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean important"}},[s._v("true")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("service")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" \n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" docker\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("state")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" stopped\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 卸载旧版本 Docker\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("yum")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n          "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" docker\n          "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" docker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("client\n          "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" docker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("client"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("latest\n          "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" docker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("common\n          "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" docker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("latest\n          "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" docker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("latest"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("logrotate\n          "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" docker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("logrotate\n          "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" docker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("engine\n          "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" docker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("ce\n          "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" docker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("ce"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("cli\n          "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" containerd.io   \n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("state")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" absent\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 删除旧版本 Docker 数据文件夹\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("file")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("path")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"{{DOCKER_DATA_ROOT}}"')]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("state")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" absent\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 删除 /etc/docker 文件夹\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("file")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("path")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" /etc/docker\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("state")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" absent\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 安装 yum"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("utils\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("yum")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" yum"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("utils\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("state")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" present\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 设置 yum 源\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("command")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" yum"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("config"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("manager "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("add"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("repo http"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("//mirrors.aliyun.com/docker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("ce/linux/centos/docker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("ce.repo\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 安装 Docker\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("yum")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" docker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("ce\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" docker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("ce"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("cli\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" containerd.io   \n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("state")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" present\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 创建 /etc/docker 文件夹\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("file")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("path")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" /etc/docker/\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("state")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" directory\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 拷贝 docker 配置文件\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("template")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("src")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" daemon.json\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("dest")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" /etc/docker/daemon.json\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 重新加载配置文件\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("command")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" systemctl daemon"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("reload\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 重新启动 Docker\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("service")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" \n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" docker\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("state")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" restarted\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 开机自启 Docker\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("command")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" systemctl enable docker\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 安装 docker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("compose\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("when")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" INSTALL_DOCKER_COMPOSE\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("ignore_errors")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean important"}},[s._v("true")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("get_url")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("url")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" https"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("//github.com/docker/compose/releases/download/"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("DOCKER_COMPOSE_VERSION"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("/docker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("compose"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("ansible_system"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("ansible_architecture"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("dest")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" /usr/local/bin/docker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("compose\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("mode")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'0755'")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 安装 docker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("machine\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("when")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" INSTALL_DOCKER_MACHINE\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("ignore_errors")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean important"}},[s._v("true")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("get_url")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("url")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" https"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("//github.com/docker/machine/releases/download/"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("DOCKER_MACHINE_VERSION"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("/docker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("machine"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("ansible_system"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("ansible_architecture"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("dest")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" /usr/local/bin/docker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("machine\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("mode")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'0755'")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br"),a("span",{staticClass:"line-number"},[s._v("35")]),a("br"),a("span",{staticClass:"line-number"},[s._v("36")]),a("br"),a("span",{staticClass:"line-number"},[s._v("37")]),a("br"),a("span",{staticClass:"line-number"},[s._v("38")]),a("br"),a("span",{staticClass:"line-number"},[s._v("39")]),a("br"),a("span",{staticClass:"line-number"},[s._v("40")]),a("br"),a("span",{staticClass:"line-number"},[s._v("41")]),a("br"),a("span",{staticClass:"line-number"},[s._v("42")]),a("br"),a("span",{staticClass:"line-number"},[s._v("43")]),a("br"),a("span",{staticClass:"line-number"},[s._v("44")]),a("br"),a("span",{staticClass:"line-number"},[s._v("45")]),a("br"),a("span",{staticClass:"line-number"},[s._v("46")]),a("br"),a("span",{staticClass:"line-number"},[s._v("47")]),a("br"),a("span",{staticClass:"line-number"},[s._v("48")]),a("br"),a("span",{staticClass:"line-number"},[s._v("49")]),a("br"),a("span",{staticClass:"line-number"},[s._v("50")]),a("br"),a("span",{staticClass:"line-number"},[s._v("51")]),a("br"),a("span",{staticClass:"line-number"},[s._v("52")]),a("br"),a("span",{staticClass:"line-number"},[s._v("53")]),a("br"),a("span",{staticClass:"line-number"},[s._v("54")]),a("br"),a("span",{staticClass:"line-number"},[s._v("55")]),a("br"),a("span",{staticClass:"line-number"},[s._v("56")]),a("br"),a("span",{staticClass:"line-number"},[s._v("57")]),a("br"),a("span",{staticClass:"line-number"},[s._v("58")]),a("br"),a("span",{staticClass:"line-number"},[s._v("59")]),a("br"),a("span",{staticClass:"line-number"},[s._v("60")]),a("br"),a("span",{staticClass:"line-number"},[s._v("61")]),a("br"),a("span",{staticClass:"line-number"},[s._v("62")]),a("br"),a("span",{staticClass:"line-number"},[s._v("63")]),a("br"),a("span",{staticClass:"line-number"},[s._v("64")]),a("br"),a("span",{staticClass:"line-number"},[s._v("65")]),a("br"),a("span",{staticClass:"line-number"},[s._v("66")]),a("br"),a("span",{staticClass:"line-number"},[s._v("67")]),a("br"),a("span",{staticClass:"line-number"},[s._v("68")]),a("br"),a("span",{staticClass:"line-number"},[s._v("69")]),a("br"),a("span",{staticClass:"line-number"},[s._v("70")]),a("br"),a("span",{staticClass:"line-number"},[s._v("71")]),a("br"),a("span",{staticClass:"line-number"},[s._v("72")]),a("br"),a("span",{staticClass:"line-number"},[s._v("73")]),a("br"),a("span",{staticClass:"line-number"},[s._v("74")]),a("br"),a("span",{staticClass:"line-number"},[s._v("75")]),a("br"),a("span",{staticClass:"line-number"},[s._v("76")]),a("br"),a("span",{staticClass:"line-number"},[s._v("77")]),a("br")])]),a("h2",{attrs:{id:"创建剧本"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#创建剧本"}},[s._v("#")]),s._v(" 创建剧本")]),s._v(" "),a("div",{staticClass:"language-yaml line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("---")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("hosts")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" all\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("roles")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" install"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("docker\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("h2",{attrs:{id:"执行剧本"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#执行剧本"}},[s._v("#")]),s._v(" 执行剧本")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("ansible-playbook install-docker.yml -f "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])])])}),[],!1,null,null,null);t.default=e.exports}}]);