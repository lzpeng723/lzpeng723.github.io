(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{594:function(s,e,n){"use strict";n.r(e);var t=n(7),a=Object(t.a)({},(function(){var s=this,e=s.$createElement,n=s._self._c||e;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h2",{attrs:{id:"docker-安装"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#docker-安装"}},[s._v("#")]),s._v(" Docker 安装")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("# 安装 yum-utils\nyum install -y yum-utils\n# 配置 yum 源\nyum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo\n# 下载安装\ncurl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun\n也可以使用国内 daocloud 一键安装命令：\ncurl -sSL https://get.daocloud.io/docker | sh\n# 查看版本\ndocker version\n# 启动服务\nservice docker start\n# 查看版本\ndocker version\n# 允许非root用户使用docker\nsudo groupadd docker\nsudo usermod -aG docker your_username\n# 运行HelloWorld\ndocker run hello-world\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br")])]),n("h2",{attrs:{id:"配置镜像加速"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#配置镜像加速"}},[s._v("#")]),s._v(" 配置镜像加速")]),s._v(" "),n("p",[s._v("阿里云的加速器：https://<你的ID>.mirror.aliyuncs.com "),n("a",{attrs:{href:"https://help.aliyun.com/document_detail/60750.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("申请地址"),n("OutboundLink")],1)]),s._v(" "),n("p",[s._v("网易加速器：http://hub-mirror.c.163.com")]),s._v(" "),n("p",[s._v("官方中国加速器：https://registry.docker-cn.com")]),s._v(" "),n("p",[s._v("七牛云加速器：https://reg-mirror.qiniu.com")]),s._v(" "),n("p",[s._v("科大镜像(ustc) 的镜像：https://docker.mirrors.ustc.edu.cn")]),s._v(" "),n("p",[s._v("daocloud：https://www.daocloud.io/mirror#accelerator-doc（注册后使用）")]),s._v(" "),n("h3",{attrs:{id:"vim方式修改"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#vim方式修改"}},[s._v("#")]),s._v(" vim方式修改")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('sudo vim /etc/docker/daemon.json\n\n{\n    "registry-mirrors":  [\n        "http://hub-mirror.c.163.com",\n        "https://docker.mirrors.ustc.edu.cn",\n        "https://registry.docker-cn.com",\n        "https://reg-mirror.qiniu.com",\n        "https://dockerhub.azk8s.cn"\n    ]\n}\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br")])]),n("h3",{attrs:{id:"tee方式修改"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#tee方式修改"}},[s._v("#")]),s._v(" tee方式修改")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('mkdir -p /etc/docker\nsudo tee /etc/docker/daemon.json <<-\'EOF\'\n\n{\n    "registry-mirrors":  [\n        "http://hub-mirror.c.163.com",\n        "https://docker.mirrors.ustc.edu.cn",\n        "https://registry.docker-cn.com",\n        "https://reg-mirror.qiniu.com",\n        "https://dockerhub.azk8s.cn"\n    ]\n}\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br")])]),n("h3",{attrs:{id:"重新加载镜像源"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#重新加载镜像源"}},[s._v("#")]),s._v(" 重新加载镜像源")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("systemctl daemon-reload\nsystemctl restart docker\ndocker info\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br")])]),n("h2",{attrs:{id:"遇到的问题"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#遇到的问题"}},[s._v("#")]),s._v(" 遇到的问题")]),s._v(" "),n("p",[s._v("ubuntu-20.04.1-live-server-amd64 安装docker出错")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("root@ubuntu-node:~# curl -s https://get.docker.com|sh\n# Executing docker install script, commit: 3d8fe77c2c46c5b7571f94b42793905e5b3e42e4\n+ sh -c apt-get update -qq >/dev/null\n+ sh -c DEBIAN_FRONTEND=noninteractive apt-get install -y -qq apt-transport-https ca-certificates curl >/dev/null\nE: Unable to correct problems, you have held broken packages.\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br")])]),n("p",[s._v("排查是安装apt-transport-https时出错")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("root@ubuntu-node:~# apt-get install -y apt-transport-https\nReading package lists... Done\nBuilding dependency tree       \nReading state information... Done\nSome packages could not be installed. This may mean that you have\nrequested an impossible situation or if you are using the unstable\ndistribution that some required packages have not yet been created\nor been moved out of Incoming.\nThe following information may help to resolve the situation:\n\nThe following packages have unmet dependencies:\n apt-transport-https : Depends: libapt-pkg5.0 (>= 1.1~exp15) but it is not going to be installed\nE: Unable to correct problems, you have held broken packages.\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br")])]),n("p",[s._v("意思是libapt-pkg5.0版本没法安装，经过检查后发现是提前修改了apt源,将apt源设为默认即可")]),s._v(" "),n("h2",{attrs:{id:"最后"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#最后"}},[s._v("#")]),s._v(" 最后")]),s._v(" "),n("p",[s._v("好了，Docker 安装完毕，开始愉快的学习 Docker 吧，"),n("a",{attrs:{href:"https://www.runoob.com/docker",target:"_blank",rel:"noopener noreferrer"}},[s._v("Docker学习教程"),n("OutboundLink")],1),s._v("。")])])}),[],!1,null,null,null);e.default=a.exports}}]);