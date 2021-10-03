(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{581:function(s,a,e){"use strict";e.r(a);var n=e(7),t=Object(n.a)({},(function(){var s=this,a=s.$createElement,e=s._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h1",{attrs:{id:"docker-搭建-redis-cluster-集群环境"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#docker-搭建-redis-cluster-集群环境"}},[s._v("#")]),s._v(" Docker 搭建 Redis Cluster 集群环境")]),s._v(" "),e("p",[s._v("参考"),e("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/216211089",target:"_blank",rel:"noopener noreferrer"}},[s._v("Docker 搭建 Redis Cluster 集群环境"),e("OutboundLink")],1),s._v("，整体搭建步骤主要分为以下几步：")]),s._v(" "),e("ul",[e("li",[s._v("下载 Redis 镜像（其实这步可以省略，因为创建容器时，如果本地镜像不存在，就会去远程拉取）；")]),s._v(" "),e("li",[s._v("编写 Redis 配置文件；")]),s._v(" "),e("li",[s._v("创建 Redis 容器；")]),s._v(" "),e("li",[s._v("创建 Redis Cluster 集群。")])]),s._v(" "),e("h2",{attrs:{id:"编写-redis-配置文件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#编写-redis-配置文件"}},[s._v("#")]),s._v(" 编写 Redis 配置文件")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("# 创建目录\nmkdir -p /usr/local/docker-redis/redis-cluster\n# 切换至指定目录\ncd /usr/local/docker-redis/redis-cluster\n# 编写 redis-cluster.tmpl 文件\nvi redis-cluster.tmpl\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br")])]),e("p",[e("code",[s._v("redis-cluster.tmpl")]),s._v(" 文件内容如下：")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("port ${PORT}\nrequirepass 1234\nmasterauth 1234\nprotected-mode no\ndaemonize no\nappendonly yes\ncluster-enabled yes\ncluster-config-file nodes.conf\ncluster-node-timeout 15000\ncluster-announce-ip 127.0.0.1\ncluster-announce-port ${PORT}\ncluster-announce-bus-port 1${PORT}\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br")])]),e("ul",[e("li",[s._v("port：节点端口；")]),s._v(" "),e("li",[s._v("requirepass：添加访问认证；")]),s._v(" "),e("li",[s._v("masterauth：如果主节点开启了访问认证，从节点访问主节点需要认证；")]),s._v(" "),e("li",[s._v("protected-mode：保护模式，默认值 yes，即开启。开启保护模式以后，需配置 bind ip 或者设置访问密码；关闭保护模式，外部网络可以直接访问；")]),s._v(" "),e("li",[s._v("daemonize：是否以守护线程的方式启动（后台启动），默认 no；")]),s._v(" "),e("li",[s._v("appendonly：是否开启 AOF 持久化模式，默认 no；")]),s._v(" "),e("li",[s._v("cluster-enabled：是否开启集群模式，默认 no；")]),s._v(" "),e("li",[s._v("cluster-config-file：集群节点信息文件；")]),s._v(" "),e("li",[s._v("cluster-node-timeout：集群节点连接超时时间；")]),s._v(" "),e("li",[s._v("cluster-announce-ip：集群节点 IP，填写宿主机的 IP；")]),s._v(" "),e("li",[s._v("cluster-announce-port：集群节点映射端口；")]),s._v(" "),e("li",[s._v("cluster-announce-bus-port：集群节点总线端口")])]),s._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"title"}),e("p",[s._v("每个 Redis 集群节点都需要打开两个 TCP 连接。一个用于为客户端提供服务的正常 Redis TCP 端口，例如 6379。还有一个基于 6379 端口加 10000 的端口，比如 16379。\n第二个端口用于集群总线，这是一个使用二进制协议的节点到节点通信通道。节点使用集群总线进行故障检测、配置更新、故障转移授权等等。客户端永远不要尝试与集群总线端口通信，与正常的 Redis 命令端口通信即可，但是请确保防火墙中的这两个端口都已经打开，否则 Redis 集群节点将无法通信。")])]),e("p",[s._v("在 "),e("code",[s._v("/usr/local/docker-redis/redis-cluster")]),s._v(" 目录下执行以下命令：")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token for-or-select variable"}},[s._v("port")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token variable"}},[e("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("seq")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("6371")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("6376")]),e("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("do")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" -p "),e("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${port}")]),s._v("/conf "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("PORT")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),e("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${port}")]),s._v(" envsubst "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v(" redis-cluster.tmpl "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${port}")]),s._v("/conf/redis.conf "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" -p "),e("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${port}")]),s._v("/data"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("done")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br")])]),e("p",[s._v("上面两段 shell for 语句，意思就是循环创建 6371 ~ 6376 相关的目录及文件。")]),s._v(" "),e("p",[s._v("验证目录及文件是否创建成功")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[s._v("tree "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("cat")]),s._v(" /usr/local/docker-redis/redis-cluster/637"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("6")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("/conf/redis.conf\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])]),e("h2",{attrs:{id:"创建-redis-容器"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#创建-redis-容器"}},[s._v("#")]),s._v(" 创建 Redis 容器")]),s._v(" "),e("p",[s._v("将宿主机的 6371 ~ 6376 之间的端口与 6 个 Redis 容器映射，并将宿主机的目录与容器内的目录进行映射（目录挂载）。记得指定网络模式，使用 host 网络模式")]),s._v(" "),e("p",[s._v("执行以下命令")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token for-or-select variable"}},[s._v("port")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token variable"}},[e("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$(")]),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("seq")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("6371")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("6376")]),e("span",{pre:!0,attrs:{class:"token variable"}},[s._v(")")])]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("do")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  docker run -di --restart always --name redis-"),e("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${port}")]),s._v(" --net "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("host")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -v /usr/local/docker-redis/redis-cluster/"),e("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${port}")]),s._v("/conf/redis.conf:/usr/local/etc/redis/redis.conf "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -v /usr/local/docker-redis/redis-cluster/"),e("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${port}")]),s._v("/data:/data "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  redis redis-server /usr/local/etc/redis/redis.conf"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("done")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br")])]),e("p",[s._v("执行 "),e("code",[s._v("docker ps -n 6")]),s._v(" 查看容器是否创建成功。")]),s._v(" "),e("h2",{attrs:{id:"创建-redis-cluster-集群"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#创建-redis-cluster-集群"}},[s._v("#")]),s._v(" 创建 Redis Cluster 集群")]),s._v(" "),e("p",[s._v("随便进入一个容器节点，并进入 "),e("code",[s._v("/usr/local/bin/")]),s._v(" 目录：")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 进入容器")]),s._v("\ndocker "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("exec")]),s._v(" -it redis-6371 "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("bash")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 切换至指定目录")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /usr/local/bin/\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br")])]),e("p",[s._v("接下来我们就可以通过以下命令实现 Redis Cluster 集群的创建。")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[s._v("redis-cli -a "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1234")]),s._v(" --cluster create "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("127.0")]),s._v(".0.1:6371 "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("127.0")]),s._v(".0.1:6372 "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("127.0")]),s._v(".0.1:6373 "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("127.0")]),s._v(".0.1:6374 "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("127.0")]),s._v(".0.1:6375 "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("127.0")]),s._v(".0.1:6376 --cluster-replicas "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("出现选择提示信息，输入 yes.")]),s._v(" "),e("p",[s._v("集群创建成功如下：")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("root@docker-desktop:/usr/local/bin# redis-cli -a 1234 --cluster create 127.0.0.1:6371 127.0.0.1:6372 127.0.0.1:6373 127.0.0.1:6374 127.0.0.1:6375 127.0.0.1:6376 --cluster-replicas 1\nWarning: Using a password with '-a' or '-u' option on the command line interface may not be safe.\n>>> Performing hash slots allocation on 6 nodes...\nMaster[0] -> Slots 0 - 5460\nMaster[1] -> Slots 5461 - 10922\nMaster[2] -> Slots 10923 - 16383\nAdding replica 127.0.0.1:6375 to 127.0.0.1:6371\nAdding replica 127.0.0.1:6376 to 127.0.0.1:6372\nAdding replica 127.0.0.1:6374 to 127.0.0.1:6373\n>>> Trying to optimize slaves allocation for anti-affinity\n[WARNING] Some slaves are in the same host as their master\nM: f786c0520ca2bfe44edd7bc5ba6de0e41f3bfcf1 127.0.0.1:6371\n   slots:[0-5460] (5461 slots) master\nM: 0b92cb829db29b20a92c5673f877cfc8df74e321 127.0.0.1:6372\n   slots:[5461-10922] (5462 slots) master\nM: ed3832d22f8d898dafaa7f4ee5290bd7a6449a50 127.0.0.1:6373\n   slots:[10923-16383] (5461 slots) master\nS: 1a5b08d547a4ac5343ef85db50c3406ea051e36f 127.0.0.1:6374\n   replicates f786c0520ca2bfe44edd7bc5ba6de0e41f3bfcf1\nS: 4795ee8b1fe3db82c538391835de30680120fd65 127.0.0.1:6375\n   replicates 0b92cb829db29b20a92c5673f877cfc8df74e321\nS: 09af6ff673230f02cec5dc9ad5c255a5af2d7b8a 127.0.0.1:6376\n   replicates ed3832d22f8d898dafaa7f4ee5290bd7a6449a50\nCan I set the above configuration? (type 'yes' to accept): yes\n>>> Nodes configuration updated\n>>> Assign a different config epoch to each node\n>>> Sending CLUSTER MEET messages to join the cluster\nWaiting for the cluster to join\n.....\n>>> Performing Cluster Check (using node 127.0.0.1:6371)\nM: f786c0520ca2bfe44edd7bc5ba6de0e41f3bfcf1 127.0.0.1:6371\n   slots:[0-5460] (5461 slots) master\n   1 additional replica(s)\nS: 4795ee8b1fe3db82c538391835de30680120fd65 127.0.0.1:6375\n   slots: (0 slots) slave\n   replicates 0b92cb829db29b20a92c5673f877cfc8df74e321\nM: ed3832d22f8d898dafaa7f4ee5290bd7a6449a50 127.0.0.1:6373\n   slots:[10923-16383] (5461 slots) master\n   1 additional replica(s)\nM: 0b92cb829db29b20a92c5673f877cfc8df74e321 127.0.0.1:6372\n   slots:[5461-10922] (5462 slots) master\n   1 additional replica(s)\nS: 1a5b08d547a4ac5343ef85db50c3406ea051e36f 127.0.0.1:6374\n   slots: (0 slots) slave\n   replicates f786c0520ca2bfe44edd7bc5ba6de0e41f3bfcf1\nS: 09af6ff673230f02cec5dc9ad5c255a5af2d7b8a 127.0.0.1:6376\n   slots: (0 slots) slave\n   replicates ed3832d22f8d898dafaa7f4ee5290bd7a6449a50\n[OK] All nodes agree about slots configuration.\n>>> Check for open slots...\n>>> Check slots coverage...\n[OK] All 16384 slots covered.\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br"),e("span",{staticClass:"line-number"},[s._v("14")]),e("br"),e("span",{staticClass:"line-number"},[s._v("15")]),e("br"),e("span",{staticClass:"line-number"},[s._v("16")]),e("br"),e("span",{staticClass:"line-number"},[s._v("17")]),e("br"),e("span",{staticClass:"line-number"},[s._v("18")]),e("br"),e("span",{staticClass:"line-number"},[s._v("19")]),e("br"),e("span",{staticClass:"line-number"},[s._v("20")]),e("br"),e("span",{staticClass:"line-number"},[s._v("21")]),e("br"),e("span",{staticClass:"line-number"},[s._v("22")]),e("br"),e("span",{staticClass:"line-number"},[s._v("23")]),e("br"),e("span",{staticClass:"line-number"},[s._v("24")]),e("br"),e("span",{staticClass:"line-number"},[s._v("25")]),e("br"),e("span",{staticClass:"line-number"},[s._v("26")]),e("br"),e("span",{staticClass:"line-number"},[s._v("27")]),e("br"),e("span",{staticClass:"line-number"},[s._v("28")]),e("br"),e("span",{staticClass:"line-number"},[s._v("29")]),e("br"),e("span",{staticClass:"line-number"},[s._v("30")]),e("br"),e("span",{staticClass:"line-number"},[s._v("31")]),e("br"),e("span",{staticClass:"line-number"},[s._v("32")]),e("br"),e("span",{staticClass:"line-number"},[s._v("33")]),e("br"),e("span",{staticClass:"line-number"},[s._v("34")]),e("br"),e("span",{staticClass:"line-number"},[s._v("35")]),e("br"),e("span",{staticClass:"line-number"},[s._v("36")]),e("br"),e("span",{staticClass:"line-number"},[s._v("37")]),e("br"),e("span",{staticClass:"line-number"},[s._v("38")]),e("br"),e("span",{staticClass:"line-number"},[s._v("39")]),e("br"),e("span",{staticClass:"line-number"},[s._v("40")]),e("br"),e("span",{staticClass:"line-number"},[s._v("41")]),e("br"),e("span",{staticClass:"line-number"},[s._v("42")]),e("br"),e("span",{staticClass:"line-number"},[s._v("43")]),e("br"),e("span",{staticClass:"line-number"},[s._v("44")]),e("br"),e("span",{staticClass:"line-number"},[s._v("45")]),e("br"),e("span",{staticClass:"line-number"},[s._v("46")]),e("br"),e("span",{staticClass:"line-number"},[s._v("47")]),e("br"),e("span",{staticClass:"line-number"},[s._v("48")]),e("br"),e("span",{staticClass:"line-number"},[s._v("49")]),e("br"),e("span",{staticClass:"line-number"},[s._v("50")]),e("br"),e("span",{staticClass:"line-number"},[s._v("51")]),e("br"),e("span",{staticClass:"line-number"},[s._v("52")]),e("br")])]),e("p",[s._v("至此一个高可用的 Redis Cluster 集群搭建完成，如下图所示，该集群中包含 6 个 Redis 节点，3 主 3 从。三个主节点会分配槽，处理客户端的命令请求，而从节点可用在主节点故障后，顶替主节点。")]),s._v(" "),e("h2",{attrs:{id:"查看集群状态"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看集群状态"}},[s._v("#")]),s._v(" 查看集群状态")]),s._v(" "),e("p",[s._v("我们先进入容器，然后通过一些集群常用的命令查看一下集群的状态。")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("# 进入容器\ndocker exec -it redis-6371 bash\n# 切换至指定目录\ncd /usr/local/bin/\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br")])]),e("h3",{attrs:{id:"检查集群状态"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#检查集群状态"}},[s._v("#")]),s._v(" 检查集群状态")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("redis-cli -a 1234 --cluster check 127.0.0.1:6375\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h3",{attrs:{id:"查看集群信息和节点信息"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看集群信息和节点信息"}},[s._v("#")]),s._v(" 查看集群信息和节点信息")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("# 连接至集群某个节点\nredis-cli -c -a 1234 -h 127.0.0.1 -p 6376\n# 查看集群信息\ncluster info\n# 查看集群结点信息\ncluster nodes\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br")])]),e("h3",{attrs:{id:"set-get"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#set-get"}},[s._v("#")]),s._v(" SET/GET")]),s._v(" "),e("p",[s._v("在 6371 节点中执行写入和读取，命令如下：")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("# 进入容器并连接至集群某个节点\ndocker exec -it redis-6371 /usr/local/bin/redis-cli -c -a 1234 -h 127.0.0.1 -p 6371\n# 写入数据\nset name mrhelloworld\nset aaa 111\nset bbb 222\n# 读取数据\nget name\nget aaa\nget bbb\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br")])]),e("p",[s._v("返回结果如下")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v('127.0.0.1:6371> set name mrhelloworld\n-> Redirected to slot [5798] located at 127.0.0.1:6372\nOK\n127.0.0.1:6372> set aaa 111\nOK\n127.0.0.1:6372> set bbb 222\n-> Redirected to slot [5287] located at 127.0.0.1:6371\nOK\n127.0.0.1:6371> get name\n-> Redirected to slot [5798] located at 127.0.0.1:6372\n"mrhelloworld"\n127.0.0.1:6372> get aaa\n"111"\n127.0.0.1:6372> get bbb\n-> Redirected to slot [5287] located at 127.0.0.1:6371\n"222"\n127.0.0.1:6371>\n')])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br"),e("span",{staticClass:"line-number"},[s._v("14")]),e("br"),e("span",{staticClass:"line-number"},[s._v("15")]),e("br"),e("span",{staticClass:"line-number"},[s._v("16")]),e("br"),e("span",{staticClass:"line-number"},[s._v("17")]),e("br")])]),e("p",[s._v("别着急，让我来解释一下详细操作过程：")]),s._v(" "),e("p",[s._v("首先进入容器并连接至集群某个节点；\n然后执行第一个 set 命令 "),e("code",[s._v("set name mrhelloworld")]),s._v("，name 键根据哈希函数运算以后得到的值为 [5798]。当前集群环境的槽分配情况为：[0-5460] 6371节点，[5461-10922] 6374节点，[10923-16383] 6372节点，所以该键的存储就被分配到了 6374 节点上；\n再来看第二个 set 命令 "),e("code",[s._v("set aaa")]),s._v("，这里大家可能会有一些疑问，为什么看不到 aaa 键根据哈希函数运算以后得到的值？因为刚才重定向至 6374 节点插入了数据，此时如果还有数据插入，正好键根据哈希函数运算以后得到的值也还在该节点的范围内，那么直接插入数据即可；\n接着是第三个 set 命令 "),e("code",[s._v("set bbb")]),s._v("，bbb 键根据哈希函数运算以后得到的值为 [5287]，所以该键的存储就被分配到了 6371 节点上；\n然后是读取操作，第四个命令 "),e("code",[s._v("get name")]),s._v("，name 键根据哈希函数运算以后得到的值为 [5798]，被重定向至 6374 节点读取；\n第五个命令 "),e("code",[s._v("get aaa")]),s._v("，aaa 键根据哈希函数运算以后得到的值也在 6374 节点，直接读取；\n第六个命令 "),e("code",[s._v("get bbb")]),s._v("，bbb 键根据哈希函数运算以后得到的值为 [5287]，被重定向至 6371 节点读取。\n通过以上操作我们得知 name 键的存储被分配到了 6374 节点，如果直接连接 6374 节点并获取该值会怎么样？没错，不需要重定向节点，因为数据就在该节点，所以直接读取返回。")]),s._v(" "),e("h2",{attrs:{id:"客户端连接"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#客户端连接"}},[s._v("#")]),s._v(" 客户端连接")]),s._v(" "),e("p",[s._v("最后来一波客户端连接操作，随便哪个节点，看看可否通过外部访问 Redis Cluster 集群。")]),s._v(" "),e("p",[s._v("至此使用多机环境多个容器搭建 Redis Cluster 集群环境就到这里，其实整体搭建过程不算特别麻烦，因为：")]),s._v(" "),e("ul",[e("li",[s._v("创建 Redis 集群需要用到 Ruby，否则就得自己关联节点构建集群，自己分配槽；")]),s._v(" "),e("li",[s._v("如果使用 Ruby 构建 Redis 集群，就需要安装 Ruby 环境；")]),s._v(" "),e("li",[s._v("而 Redis 从 5 版本开始可以直接使用 redis-cli 命令创建集群了，就省去了很多麻烦事；")]),s._v(" "),e("li",[s._v("我们还使用了 shell for 循环语句简化了构建过程，否则那些语句一条条执行也够你闹心的。")])]),s._v(" "),e("p",[s._v("综上所述，有没有更简单的办法呢？当然有了，不然我在这跟你卖什么关子。")]),s._v(" "),e("p",[s._v("Docker Compose 就可以解决这个问题。后面我们先学习一下"),e("RouterLink",{attrs:{to:"/blogs/Docker/docker-compose.html"}},[s._v("什么是 Docker Compose")]),s._v("，然后"),e("RouterLink",{attrs:{to:"/blogs/Docker/docker-compose-redis-cluster.html"}},[s._v("使用 Docker Compose 再来搭建一遍 Redis Cluster 集群环境")]),s._v("，感受感受这前后的区别。")],1)])}),[],!1,null,null,null);a.default=t.exports}}]);