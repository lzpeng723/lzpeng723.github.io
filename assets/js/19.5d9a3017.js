(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{582:function(s,t,n){"use strict";n.r(t);var a=n(7),i=Object(a.a)({},(function(){var s=this,t=s.$createElement,n=s._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h2",{attrs:{id:"全局配置-git-用户名邮箱"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#全局配置-git-用户名邮箱"}},[s._v("#")]),s._v(" 全局配置 git 用户名邮箱")]),s._v(" "),n("p",[s._v("Git global setup")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('git config --global user.name "lzpeng723"\ngit config --global user.email "1500913306@qq.com"\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br")])]),n("h2",{attrs:{id:"克隆仓库"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#克隆仓库"}},[s._v("#")]),s._v(" 克隆仓库")]),s._v(" "),n("p",[s._v("Create a new repository")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('git clone ssh://git@myliving.top:58022/lzpeng723/visitor-system-vue.git\ncd visitor-system-vue\ntouch README.md\ngit add README.md\ngit commit -m "add README"\ngit push -u origin master\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br")])]),n("h2",{attrs:{id:"将仓库与已有文件夹绑定"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#将仓库与已有文件夹绑定"}},[s._v("#")]),s._v(" 将仓库与已有文件夹绑定")]),s._v(" "),n("p",[s._v("Push an existing folder")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("cd existing_folder\n#初始化git仓库\ngit init  \n#添加所有文件\ngit add .  \n#添加提交信息\ngit commit -m '提交信息' \n#添加远程仓库地址\ngit remote add origin ssh://git@github.com:lzpeng723/lzpeng723.github.io.git \nOR\ngit remote add origin https://github.com/lzpeng723/lzpeng723.github.io.git\n# 若本地文件夹非空， 拉取远程仓库所有内容,并将所有非空文件提交\ngit pull --rebase origin master \n# 若有冲突 修改文件后 解决冲突，知道冲突全部解决完成\ngit rebase --continue\n#将此次提交推送至远程仓库\ngit push -u origin master \n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br")])]),n("h2",{attrs:{id:"已有git源地址的文件夹切换新的地址源"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#已有git源地址的文件夹切换新的地址源"}},[s._v("#")]),s._v(" 已有git源地址的文件夹切换新的地址源")]),s._v(" "),n("p",[s._v("Push an existing Git repository")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("cd existing_repo\ngit remote rename origin old-origin\ngit remote add origin ssh://git@github.com:lzpeng723/lzpeng723.github.io.git \nOR\ngit remote add origin https://github.com/lzpeng723/lzpeng723.github.io.git\ngit push -u origin --all\ngit push -u origin --tags\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br")])])])}),[],!1,null,null,null);t.default=i.exports}}]);