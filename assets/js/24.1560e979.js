(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{580:function(t,e,a){"use strict";a.r(e);var s=a(7),n=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"docker-网络模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#docker-网络模式"}},[t._v("#")]),t._v(" Docker 网络模式")]),t._v(" "),a("p",[t._v("当你安装完Docker时，它会自动创建三个网络。你可以使用以下docker network ls命令列出这些网络：")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("docker network ls\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[t._v("结果如下")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"center"}},[t._v("NETWORK ID")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("NAME")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("DRIVER")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("SCOPE")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("bc8c3c05e4ab")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("bridge")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("bridge")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("local")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("f8d96ed1b4cb")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("host")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("host")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("local")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("8871f5273fb0")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("none")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("null")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("local")])])])]),t._v(" "),a("p",[t._v("Docker内置这三个网络，运行容器时，你可以使用该来指定容器应连接到哪些网络。\n我们在使用"),a("code",[t._v("docker run")]),t._v("创建Docker容器时，可以用"),a("code",[t._v("--network")]),t._v("标志 选项指定容器的网络模式，Docker有以下4种网络模式：")]),t._v(" "),a("ul",[a("li",[t._v("host模式：使用 "),a("code",[t._v("--net=host")]),t._v(" 指定。")]),t._v(" "),a("li",[t._v("none模式：使用 "),a("code",[t._v("--net=none")]),t._v(" 指定。")]),t._v(" "),a("li",[t._v("bridge模式：使用 "),a("code",[t._v("--net=bridge")]),t._v(" 指定，默认设置。")]),t._v(" "),a("li",[t._v("container模式：使用 "),a("code",[t._v("--net=container:NAME_or_ID")]),t._v(" 指定。")])]),t._v(" "),a("h3",{attrs:{id:"_1-host模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-host模式"}},[t._v("#")]),t._v(" 1. host模式")]),t._v(" "),a("p",[t._v("众所周知，Docker使用了Linux的Namespaces技术来进行资源隔离，如PID Namespace隔离进程，Mount Namespace隔离文件系统，Network Namespace隔离网络等。一个Network Namespace提供了一份独立的网络环境，包括网卡、路由、Iptable规则等都与其他的Network Namespace隔离。一个Docker容器一般会分配一个独立的Network Namespace。但如果启动容器的时候使用host模式，那么这个容器将不会获得一个独立的Network Namespace，而是和宿主机共用一个Network Namespace。容器将不会虚拟出自己的网卡，配置自己的IP等，而是使用宿主机的IP和端口。\n例如，我们在10.10.101.105/24的机器上用host模式启动一个含有web应用的Docker容器，监听tcp80端口。当我们在容器中执行任何类似ifconfig命令查看网络环境时，看到的都是宿主机上的信息。而外界访问容器中的应用，则直接使用10.10.101.105:80即可，不用任何NAT转换，就如直接跑在宿主机中一样。但是，容器的其他方面，如文件系统、进程列表等还是和宿主机隔离的。")]),t._v(" "),a("h3",{attrs:{id:"_2-container模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-container模式"}},[t._v("#")]),t._v(" 2. container模式")]),t._v(" "),a("p",[t._v("在理解了host模式后，这个模式也就好理解了。这个模式指定新创建的容器和已经存在的一个容器共享一个Network Namespace，而不是和宿主机共享。新创建的容器不会创建自己的网卡，配置自己的IP，而是和一个指定的容器共享IP、端口范围等。同样，两个容器除了网络方面，其他的如文件系统、进程列表等还是隔离的。两个容器的进程可以通过lo网卡设备通信。")]),t._v(" "),a("h3",{attrs:{id:"_3-none模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-none模式"}},[t._v("#")]),t._v(" 3. none模式")]),t._v(" "),a("p",[t._v("这个模式和前两个不同。在这种模式下，Docker容器拥有自己的Network Namespace，但是，并不为Docker容器进行任何网络配置。也就是说，这个Docker容器没有网卡、IP、路由等信息。需要我们自己为Docker容器添加网卡、配置IP等。")]),t._v(" "),a("h3",{attrs:{id:"_4-bridge模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-bridge模式"}},[t._v("#")]),t._v(" 4. bridge模式")]),t._v(" "),a("p",[t._v("bridge模式是Docker默认的网络设置，此模式会为每一个容器分配Network Namespace、设置IP等，并将一个主机上的Docker容器连接到一个虚拟网桥上。下面着重介绍一下此模式。")]),t._v(" "),a("h3",{attrs:{id:"_5-相关命令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-相关命令"}},[t._v("#")]),t._v(" 5. 相关命令")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("# 连接网络\ndocker network connect custom_network bbox01\n# 断开连接网络\ndocker network disconnect custom_network bbox01\n# 删除网络\ndocker network rm custom_network\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br")])]),a("h2",{attrs:{id:"自定义网络"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#自定义网络"}},[t._v("#")]),t._v(" 自定义网络")]),t._v(" "),a("p",[t._v("使用 busybox 测试容器连通性")]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"title"}),a("p",[t._v("BusyBox 是一个集成了一百多个最常用 Linux 命令和工具（如 cat、echo、grep、mount、telnet 、ping、ifconfig 等）的精简工具箱，它只需要几 MB 的大小，很方便进行各种快速验证，被誉为“Linux 系统的瑞士军刀”。")])]),a("p",[t._v("启动 bbox01, bbox02")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("docker run -it --name bbox01 busybox\ndocker run -it --name bbox02 busybox\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("p",[t._v("发现通过 "),a("code",[t._v("ping ip")]),t._v(" 是可以通的，但是容器每次重启ip都会发生变化，此时就不能使用ip进行通信了，需要使用容器名称进行通信，下面开始自定义网络使用容器名称进行通信。")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("docker network --help\ndocker network create --help\ndocker network create custom_network\ndocker network ls\ndocker run -it --name bbox01 --network custom_network busybox\ndocker run -it --name bbox02 --network custom_network busybox\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br")])]),a("p",[t._v("此时通过ping容器名称就可以ping通了")])])}),[],!1,null,null,null);e.default=n.exports}}]);