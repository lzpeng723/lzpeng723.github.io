(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{599:function(s,a,e){"use strict";e.r(a);var t=e(10),r=Object(t.a)({},(function(){var s=this,a=s.$createElement,e=s._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h2",{attrs:{id:"私有仓库搭建"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#私有仓库搭建"}},[s._v("#")]),s._v(" 私有仓库搭建")]),s._v(" "),e("h3",{attrs:{id:"启动私有仓库镜像"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#启动私有仓库镜像"}},[s._v("#")]),s._v(" 启动私有仓库镜像")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("docker run -di --name registry -p 5000:5000 registry\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("打开浏览器 输入地址 "),e("a",{attrs:{href:"http://127.0.0.1:5000/v2/_catalog",target:"_blank",rel:"noopener noreferrer"}},[s._v("http://127.0.0.1:5000/v2/_catalog"),e("OutboundLink")],1),s._v(" ，看到 "),e("code",[s._v('{"repositories":[]}')]),s._v(" 表示私有仓库搭建成功并且内容为空")]),s._v(" "),e("h3",{attrs:{id:"配置私有仓库地址"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#配置私有仓库地址"}},[s._v("#")]),s._v(" 配置私有仓库地址")]),s._v(" "),e("p",[s._v("修改daemon.json，让 docker信任私有仓库地址")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("vi /etc/docker/daemon.json\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("添加以下内容")]),s._v(" "),e("div",{staticClass:"language-json line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[s._v('"insecure-registries"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n        "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"127.0.0.1:5000"')]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br")])]),e("p",[s._v("保存退出后重启docker服务")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("systemctl restart docker\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h3",{attrs:{id:"上传镜像"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#上传镜像"}},[s._v("#")]),s._v(" 上传镜像")]),s._v(" "),e("p",[s._v("将镜像上传至私有仓库")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("# 标记此镜像为私有仓库的镜像\ndocker tag hello-world:latest 127.0.0.1:5000/hello-world\n# 上传已标记的镜像\ndocker push 127.0.0.1:5000/hello-world\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br")])]),e("h3",{attrs:{id:"拉取镜像"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#拉取镜像"}},[s._v("#")]),s._v(" 拉取镜像")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("docker pull 127.0.0.1:5000/hello-world\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])])])}),[],!1,null,null,null);a.default=r.exports}}]);