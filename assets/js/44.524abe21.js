(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{604:function(s,a,n){"use strict";n.r(a);var e=n(7),t=Object(e.a)({},(function(){var s=this,a=s.$createElement,n=s._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h2",{attrs:{id:"ansible-简介"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#ansible-简介"}},[s._v("#")]),s._v(" ansible 简介")]),s._v(" "),n("h3",{attrs:{id:"ansible-是什么"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#ansible-是什么"}},[s._v("#")]),s._v(" ansible 是什么？")]),s._v(" "),n("p",[s._v("ansible是新出现的自动化运维工具，基于Python开发，集合了众多运维工具（puppet、chef、func、fabric）的优点，实现了批量系统配置、批量程序部署、批量运行命令等功能。\nansible是基于 paramiko 开发的,并且基于模块化工作，本身没有批量部署的能力。真正具有批量部署的是ansible所运行的模块，ansible只是提供一种框架。ansible不需要在远程主机上安装client/agents，因为它们是基于ssh来和远\n程主机通讯的。ansible目前已经已经被红帽官方收购，是自动化运维工具中大家认可度最高的，并且上手容易，学习简单。是每位运维工程师必须掌握的技能之一。")]),s._v(" "),n("h3",{attrs:{id:"ansible-特点"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#ansible-特点"}},[s._v("#")]),s._v(" ansible 特点")]),s._v(" "),n("ol",[n("li",[s._v("部署简单，只需在主控端部署Ansible环境，被控端无需做任何操作；")]),s._v(" "),n("li",[s._v("默认使用SSH协议对设备进行管理；")]),s._v(" "),n("li",[s._v("有大量常规运维操作模块，可实现日常绝大部分操作；")]),s._v(" "),n("li",[s._v("配置简单、功能强大、扩展性强；")]),s._v(" "),n("li",[s._v("支持API及自定义模块，可通过Python轻松扩展；")]),s._v(" "),n("li",[s._v("通过Playbooks来定制强大的配置、状态管理；")]),s._v(" "),n("li",[s._v("轻量级，无需在客户端安装agent，更新时，只需在操作机上进行一次更新即可；")]),s._v(" "),n("li",[s._v("提供一个功能强大、操作性强的Web管理界面和REST API接口——AWX平台。")])]),s._v(" "),n("h3",{attrs:{id:"ansible-架构图"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#ansible-架构图"}},[s._v("#")]),s._v(" ansible 架构图")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://images2017.cnblogs.com/blog/1204916/201712/1204916-20171205163000628-69838828.png",alt:"ansible 架构图"}})]),s._v(" "),n("p",[s._v("上图中我们看到的主要模块如下：")]),s._v(" "),n("blockquote",[n("p",[n("code",[s._v("Ansible")]),s._v("：Ansible核心程序。\n"),n("code",[s._v("HostInventory")]),s._v("：记录由Ansible管理的主机信息，包括端口、密码、ip等。\n"),n("code",[s._v("Playbooks")]),s._v("：“剧本”YAML格式文件，多个任务定义在一个文件中，定义主机需要调用哪些模块来完成的功能。\n"),n("code",[s._v("CoreModules")]),s._v("："),n("strong",[s._v("核心模块")]),s._v("，主要操作是通过调用核心模块来完成管理任务。\n"),n("code",[s._v("CustomModules")]),s._v("：自定义模块，完成核心模块无法完成的功能，支持多种语言。\n"),n("code",[s._v("ConnectionPlugins")]),s._v("：连接插件，Ansible和Host通信使用")])]),s._v(" "),n("h2",{attrs:{id:"ansible-任务执行"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#ansible-任务执行"}},[s._v("#")]),s._v(" ansible 任务执行")]),s._v(" "),n("h3",{attrs:{id:"ansible-任务执行模式"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#ansible-任务执行模式"}},[s._v("#")]),s._v(" ansible 任务执行模式")]),s._v(" "),n("p",[s._v("Ansible 系统由控制主机对被管节点的操作方式可分为两类，即"),n("code",[s._v("adhoc")]),s._v("和"),n("code",[s._v("playbook")]),s._v("：")]),s._v(" "),n("ul",[n("li",[s._v("ad-hoc模式(点对点模式)\n使用单个模块，支持批量执行单条命令。ad-hoc 命令是一种可以快速输入的命令，而且不需要保存起来的命令。"),n("strong",[s._v("就相当于bash中的一句话shell。")])]),s._v(" "),n("li",[s._v("playbook模式(剧本模式)\n是Ansible主要管理方式，也是Ansible功能强大的关键所在。"),n("strong",[s._v("playbook通过多个task集合完成一类功能")]),s._v("，如Web服务的安装部署、数据库服务器的批量备份等。可以简单地把playbook理解为通过组合多条ad-hoc操作的配置文件。")])]),s._v(" "),n("h3",{attrs:{id:"ansible-执行流程"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#ansible-执行流程"}},[s._v("#")]),s._v(" ansible 执行流程")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://images2017.cnblogs.com/blog/1204916/201712/1204916-20171205162615738-1292598736.png",alt:"ansible 执行流程"}}),s._v("\n简单理解就是Ansible在运行时， 首先读取"),n("code",[s._v("ansible.cfg")]),s._v("中的配置， 根据规则获取"),n("code",[s._v("Inventory")]),s._v("中的管理主机列表， 并行的在这些主机中执行配置的任务， 最后等待执行返回的结果。")]),s._v(" "),n("h3",{attrs:{id:"ansible-命令执行过程"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#ansible-命令执行过程"}},[s._v("#")]),s._v(" ansible 命令执行过程")]),s._v(" "),n("ol",[n("li",[s._v("加载自己的配置文件，默认"),n("code",[s._v("/etc/ansible/ansible.cfg")]),s._v("；")]),s._v(" "),n("li",[s._v("查找对应的主机配置文件，找到要执行的主机或者组；")]),s._v(" "),n("li",[s._v("加载自己对应的模块文件，如 command；")]),s._v(" "),n("li",[s._v("通过ansible将模块或命令生成对应的临时py文件(python脚本)， 并将该文件传输至远程服务器；")]),s._v(" "),n("li",[s._v("对应执行用户的家目录的"),n("code",[s._v(".ansible/tmp/XXX/XXX.PY")]),s._v("文件；")]),s._v(" "),n("li",[s._v("给文件 +x 执行权限；")]),s._v(" "),n("li",[s._v("执行并返回结果；")]),s._v(" "),n("li",[s._v("删除临时py文件，"),n("code",[s._v("sleep 0")]),s._v("退出；")])]),s._v(" "),n("h2",{attrs:{id:"ansible-配置详解"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#ansible-配置详解"}},[s._v("#")]),s._v(" ansible 配置详解")]),s._v(" "),n("h3",{attrs:{id:"ansible-安装方式"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#ansible-安装方式"}},[s._v("#")]),s._v(" ansible 安装方式")]),s._v(" "),n("p",[s._v("ansible安装常用两种方式，"),n("code",[s._v("yum安装")]),s._v("和"),n("code",[s._v("pip程序安装")]),s._v("。下面我们来详细介绍一下这两种安装方式。")]),s._v(" "),n("h4",{attrs:{id:"使用-pip-python的包管理模块-安装"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#使用-pip-python的包管理模块-安装"}},[s._v("#")]),s._v(" 使用 pip（python的包管理模块）安装")]),s._v(" "),n("p",[s._v("首先，我们需要安装一个"),n("code",[s._v("python-pip")]),s._v("包，安装完成以后，则直接使用"),n("code",[s._v("pip")]),s._v("命令来安装我们的包，具体操作过程如下：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("yum install python-pip\npip install ansible\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br")])]),n("h4",{attrs:{id:"使用-yum-安装"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#使用-yum-安装"}},[s._v("#")]),s._v(" 使用 yum 安装")]),s._v(" "),n("p",[s._v("yum 安装是我们很熟悉的安装方式了。我们需要先安装一个"),n("code",[s._v("epel-release")]),s._v("包，然后再安装我们的 ansible 即可。")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("yum install epel-release -y\nyum install ansible –y\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br")])]),n("h3",{attrs:{id:"ansible-程序结构"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#ansible-程序结构"}},[s._v("#")]),s._v(" ansible 程序结构")]),s._v(" "),n("p",[s._v("安装目录如下(yum安装)：")]),s._v(" "),n("ul",[n("li",[s._v("配置文件目录："),n("code",[s._v("/etc/ansible/")])]),s._v(" "),n("li",[s._v("执行文件目录："),n("code",[s._v("/usr/bin/")])]),s._v(" "),n("li",[s._v("Lib库依赖目录："),n("code",[s._v("/usr/lib/pythonX.X/site-packages/ansible/")])]),s._v(" "),n("li",[s._v("Help文档目录："),n("code",[s._v("/usr/share/doc/ansible-X.X.X/")])]),s._v(" "),n("li",[s._v("Man文档目录："),n("code",[s._v("/usr/share/man/man1/")])])]),s._v(" "),n("h3",{attrs:{id:"ansible配置文件查找顺序"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#ansible配置文件查找顺序"}},[s._v("#")]),s._v(" ansible配置文件查找顺序")]),s._v(" "),n("p",[s._v("ansible与我们其他的服务在这一点上有很大不同，这里的配置文件查找是从多个地方找的，顺序如下：")]),s._v(" "),n("ol",[n("li",[s._v("检查环境变量"),n("code",[s._v("ANSIBLE_CONFIG")]),s._v("指向的路径文件(export ANSIBLE_CONFIG=/etc/ansible.cfg)；")]),s._v(" "),n("li",[n("code",[s._v("./ansible.cfg")]),s._v("，检查当前目录下的ansible.cfg配置文件；")]),s._v(" "),n("li",[n("code",[s._v("~/ansible.cfg")]),s._v("，检查当前用户家目录下的ansible.cfg配置文件；")]),s._v(" "),n("li",[n("code",[s._v("/etc/ansible/ansible.cfg")]),s._v("检查etc目录的配置文件。")])]),s._v(" "),n("h3",{attrs:{id:"ansible-配置文件"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#ansible-配置文件"}},[s._v("#")]),s._v(" ansible 配置文件")]),s._v(" "),n("p",[s._v("ansible 的配置文件为"),n("code",[s._v("/etc/ansible/ansible.cfg")]),s._v("，ansible 有许多参数，下面我们列出一些常见的参数：")]),s._v(" "),n("div",{staticClass:"language-yml line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-yml"}},[n("code",[n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("defaults"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 这个参数表示资源清单inventory文件的位置")]),s._v("\ninventory = /etc/ansible/hosts\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 指向存放Ansible模块的目录，支持多个目录方式，只要用冒号（：）隔开就可以")]),s._v("\nlibrary = /usr/share/ansible\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 以什么用户远程被管理主机")]),s._v("\nremote_user = lzpeng\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 是否校验密钥")]),s._v("\nhost_key_checking = False\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 并发连接数，默认为5")]),s._v("\nforks = 5\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 设置默认执行命令的用户")]),s._v("\nsudo_user = root\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 使用密钥还是密码远程")]),s._v("\nask_pass = True\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#指定连接被管节点的管理端口，默认为22端口，建议修改，能够更加安全")]),s._v("\nremote_port = 22\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 设置是否检查SSH主机的密钥，值为True/False。关闭后第一次连接不会提示配置实例")]),s._v("\nhost_key_checking = False\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 设置SSH连接的超时时间，单位为秒")]),s._v("\ntimeout = 60\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 指定一个存储ansible日志的文件（默认不记录日志）")]),s._v("\nlog_path = /var/log/ansible.log\n\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("privilege_escalation"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 是否需要切换用户")]),s._v("\nbecome = True\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 如何切换用户")]),s._v("\nbecome_method = sudo\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 切换成什么用户")]),s._v("\nbecome_user = root\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# sudo 是否需要输入密码")]),s._v("\nbecome_ask_pass = False\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br"),n("span",{staticClass:"line-number"},[s._v("25")]),n("br"),n("span",{staticClass:"line-number"},[s._v("26")]),n("br"),n("span",{staticClass:"line-number"},[s._v("27")]),n("br"),n("span",{staticClass:"line-number"},[s._v("28")]),n("br"),n("span",{staticClass:"line-number"},[s._v("29")]),n("br"),n("span",{staticClass:"line-number"},[s._v("30")]),n("br"),n("span",{staticClass:"line-number"},[s._v("31")]),n("br"),n("span",{staticClass:"line-number"},[s._v("32")]),n("br"),n("span",{staticClass:"line-number"},[s._v("33")]),n("br")])]),n("h3",{attrs:{id:"ansible-主机清单"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#ansible-主机清单"}},[s._v("#")]),s._v(" ansible 主机清单")]),s._v(" "),n("p",[s._v("在配置文件中，我们提到了资源清单，这个清单就是我们的主机清单，里面保存的是一些 ansible 需要连接管理的主机列表。我们可以来看看他的定义方式：")]),s._v(" "),n("div",{staticClass:"language-yml line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-yml"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 添加以下内容")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("test"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 组名")]),s._v("\nCentOS7"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("Node1 ansible_ssh_port=220 "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 自定义远程ssh端口")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("proxy"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\nCentOS7"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("Node2 ansible_ssh_user=lzpeng "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 自定义远程连接的账户名")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("webserver"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\nCentOS7"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("Node"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("3"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" ansible_ssh_pass=123456 "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 自定义远程连接的账户名")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("database"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\nCentOS7"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("Node5 ansible_ssh_private_key_file=220 "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 自定义远程连接的账户名")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("cluster"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("children"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 嵌套组")]),s._v("\nwebserver\ndatabase\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br")])]),n("p",[s._v("需要注意的是，这里的组成员可以使用通配符来匹配，这样对于一些标准化的管理来说就很轻松方便了。")]),s._v(" "),n("p",[s._v("我们可以根据实际情况来配置我们的主机列表，具体操作如下：")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[s._v("vim")]),s._v(" ~/ansible/hosts\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 添加以下内容")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("test"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 组名")]),s._v("\nCentOS7-Node1 "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 主机名")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("proxy"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\nCentOS7-Node2\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("webserver"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\nCentOS7-Node"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v(":4"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 连续主机名")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("database"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\nCentOS7-Node5\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("cluster:children"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 嵌套组")]),s._v("\nwebserver\ndatabase\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br")])]),n("h2",{attrs:{id:"ansible-常用命令"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#ansible-常用命令"}},[s._v("#")]),s._v(" ansible 常用命令")]),s._v(" "),n("h3",{attrs:{id:"ansible-命令集"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#ansible-命令集"}},[s._v("#")]),s._v(" ansible 命令集")]),s._v(" "),n("blockquote",[n("p",[n("code",[s._v("/usr/bin/ansible")]),s._v("　　Ansibe AD-Hoc 临时命令执行工具，常用于临时命令的执行\n"),n("code",[s._v("/usr/bin/ansible-doc")]),s._v(" 　Ansible 模块功能查看工具\n"),n("code",[s._v("/usr/bin/ansible-galaxy")]),s._v("　　下载/上传优秀代码或Roles模块 的官网平台，基于网络的\n"),n("code",[s._v("/usr/bin/ansible-playbook")]),s._v("　　Ansible 定制自动化的任务集编排工具\n"),n("code",[s._v("/usr/bin/ansible-pull")]),s._v("　　Ansible远程执行命令的工具，拉取配置而非推送配置（使用较少，海量机器时使用，对运维的架构能力要求较高）\n"),n("code",[s._v("/usr/bin/ansible-vault")]),s._v("　　Ansible 文件加密工具\n"),n("code",[s._v("/usr/bin/ansible-console")]),s._v("　　Ansible基于Linux Consoble界面可与用户交互的命令执行工具")])]),s._v(" "),n("p",[s._v("其中，我们比较常用的是"),n("code",[s._v("/usr/bin/ansible")]),s._v("和"),n("code",[s._v("/usr/bin/ansible-playbook")]),s._v("。")]),s._v(" "),n("h3",{attrs:{id:"ansible-doc-命令"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#ansible-doc-命令"}},[s._v("#")]),s._v(" ansible-doc 命令")]),s._v(" "),n("p",[s._v("ansible-doc 命令常用于获取模块信息及其使用帮助，一般用法如下：")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("ansible-doc -l\t\t\t\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#获取全部模块的信息")]),s._v("\nansible-doc -s MOD_NAME\t\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#获取指定模块的使用帮助")]),s._v("\nansible-doc -s "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("wc")]),s._v(" -l\t\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#统计有多少模块")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br")])]),n("p",[s._v("我们也可以查看一下ansible-doc的全部用法：")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("ansible-doc\nUsage: ansible-doc "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("options"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("module"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("."),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n\nOptions:\n  -h, --help            show this "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("help")]),s._v(" message and "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("exit")]),s._v("　　"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 显示命令参数API文档")]),s._v("\n  -l, --list            List available modules　　"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#列出可用的模块")]),s._v("\n  -M MODULE_PATH, --module-path"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("MODULE_PATH　　"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#指定模块的路径")]),s._v("\n                        specify path"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("s"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" to module library "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("default"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("None"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  -s, --snippet         Show playbook snippet "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" specified module"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("s"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("　　"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#显示playbook制定模块的用法")]),s._v("\n  -v, --verbose         verbose mode "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("-vvv "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" more, -vvvv to "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("enable")]),s._v("　　"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 显示ansible-doc的版本号查看模块列表：")]),s._v("\n                        connection debugging"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  --version             show program's version number and "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("exit")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br")])]),n("p",[s._v("我们可以来看一下，以yum相关的为例：")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("ansible-doc -l "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("grep")]),s._v(" yum\n\nyum                                                           Manages packages with the `yum' package manager                                                      \nyum_repository                                                Add or remove YUM repositories      \nansible-doc -s yum\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br")])]),n("h3",{attrs:{id:"ansible-命令详解"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#ansible-命令详解"}},[s._v("#")]),s._v(" ansible 命令详解")]),s._v(" "),n("p",[s._v("命令的具体格式如下：")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("ansible "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("host-pattern"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("-f forks"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("-m module_name"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("-a args"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("p",[s._v("也可以通过"),n("code",[s._v("ansible -h")]),s._v("来查看帮助，下面我们列出一些比较常用的选项，并解释其含义：")]),s._v(" "),n("blockquote",[n("p",[n("code",[s._v("-a MODULE_ARGS")]),s._v("　　　#模块的参数，如果执行默认COMMAND的模块，即是命令参数，如： “date”，“pwd”等等\n"),n("code",[s._v("-k")]),s._v("，"),n("code",[s._v("--ask-pass")]),s._v(" #ask for SSH password。登录密码，提示输入SSH密码而不是假设基于密钥的验证\n"),n("code",[s._v("--ask-su-pass")]),s._v(" #ask for su password。su切换密码\n"),n("code",[s._v("-K")]),s._v("，"),n("code",[s._v("--ask-sudo-pass")]),s._v(" #ask for sudo password。提示密码使用sudo，sudo表示提权操作\n"),n("code",[s._v("--ask-vault-pass")]),s._v(" #ask for vault password。假设我们设定了加密的密码，则用该选项进行访问\n"),n("code",[s._v("-B SECONDS")]),s._v(" #后台运行超时时间\n"),n("code",[s._v("-C")]),s._v(" #模拟运行环境并进行预运行，可以进行查错测试\n"),n("code",[s._v("-c CONNECTION")]),s._v(" #连接类型使用\n"),n("code",[s._v("-f FORKS")]),s._v(" #并行任务数，默认为5\n"),n("code",[s._v("-i INVENTORY")]),s._v(" #指定主机清单的路径，默认为"),n("code",[s._v("/etc/ansible/hosts")]),s._v(" "),n("code",[s._v("--list-hosts")]),s._v(" #查看有哪些主机组\n"),n("code",[s._v("-m MODULE_NAME")]),s._v(" #执行模块的名字，默认使用 command 模块，所以如果是只执行单一命令可以不用 -m参数\n"),n("code",[s._v("-o")]),s._v(" #压缩输出，尝试将所有结果在一行输出，一般针对收集工具使用\n"),n("code",[s._v("-S")]),s._v(" #用 su 命令\n"),n("code",[s._v("-R SU_USER")]),s._v(" #指定 su 的用户，默认为 root 用户\n"),n("code",[s._v("-s")]),s._v(" #用 sudo 命令\n"),n("code",[s._v("-U SUDO_USER")]),s._v(" #指定 sudo 到哪个用户，默认为 root 用户\n"),n("code",[s._v("-T TIMEOUT")]),s._v(" #指定 ssh 默认超时时间，默认为10s，也可在配置文件中修改\n"),n("code",[s._v("-u REMOTE_USER")]),s._v(" #远程用户，默认为 root 用户\n"),n("code",[s._v("-v")]),s._v(" #查看详细信息，同时支持"),n("code",[s._v("-vvv")]),s._v("，"),n("code",[s._v("-vvvv")]),s._v("可查看更详细信息")])]),s._v(" "),n("h3",{attrs:{id:"ansible-配置公私钥"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#ansible-配置公私钥"}},[s._v("#")]),s._v(" ansible 配置公私钥")]),s._v(" "),n("p",[s._v("上面我们已经提到过 ansible 是基于 ssh 协议实现的，所以其配置公私钥的方式与 ssh 协议的方式相同，具体操作步骤如下：")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 1.生成私钥")]),s._v("\nssh-keygen -f ~/.ssh/id_rsa -N "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("''")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 2.向主机分发私钥")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token for-or-select variable"}},[s._v("i")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" CentOS7-Node1 CentOS7-Node2 CentOS7-Node3 CentOS7-Node4 CentOS7-Node5\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("do")]),s._v("\n    ssh-copy-id "),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$i")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("done")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br")])]),n("p",[s._v("这样的话，就可以实现无密码登录，我们的实验过程也会顺畅很多。\n注意，如果出现了一下报错：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("-bash: ssh-copy-id: command not found\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("p",[s._v("那么就证明我们需要安装一个包：")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("yum -y "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" openssh-clientsansible\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("p",[s._v("把包安装上即可。")])])}),[],!1,null,null,null);a.default=t.exports}}]);