(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{589:function(a,s,t){"use strict";t.r(s);var n=t(7),e=Object(n.a)({},(function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h2",{attrs:{id:"常用命令"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#常用命令"}},[a._v("#")]),a._v(" 常用命令")]),a._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("mvn clean 清理缓存\nmvn compile 编译\nmvn package 打包\nmvn test 测试\nmvn install 上传到私服\nmvn deploy 部署到服务器\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br"),t("span",{staticClass:"line-number"},[a._v("5")]),t("br"),t("span",{staticClass:"line-number"},[a._v("6")]),t("br")])]),t("h3",{attrs:{id:"跳过单元测试"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#跳过单元测试"}},[a._v("#")]),a._v(" 跳过单元测试")]),a._v(" "),t("p",[a._v("在使用mvn package进行编译、打包时，Maven会执行src/test/java中的JUnit测试用例，有时为了跳过测试，会使用参数"),t("code",[a._v("-DskipTests")]),a._v("和"),t("code",[a._v("-Dmaven.test.skip=true")]),a._v("，这两个参数的主要区别是：")]),a._v(" "),t("ul",[t("li",[t("code",[a._v("-DskipTests")]),a._v("，不执行测试用例，但编译测试用例类生成相应的class文件至target/test-classes下。")]),a._v(" "),t("li",[t("code",[a._v("-Dmaven.test.skip=true")]),a._v("，不执行测试用例，也不编译测试用例类")]),a._v(" "),t("li",[t("code",[a._v("-Dmaven.javadoc.skip=true")]),a._v(" 跳过javadoc")])]),a._v(" "),t("h2",{attrs:{id:"常见问题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#常见问题"}},[a._v("#")]),a._v(" 常见问题")]),a._v(" "),t("p",[a._v("packaging 默认为 jar, "),t("code",[a._v("<packaging>jar</packaging>")]),a._v("可不写")]),a._v(" "),t("h3",{attrs:{id:"mvn-compile-时"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mvn-compile-时"}},[a._v("#")]),a._v(" mvn compile 时:")]),a._v(" "),t("p",[a._v('问题: 出现 SLF4J: Failed to load class "org.slf4j.impl.StaticLoggerBinder".\n解决方式: 重装maven')]),a._v(" "),t("h3",{attrs:{id:"下载maven依赖到指定目录"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#下载maven依赖到指定目录"}},[a._v("#")]),a._v(" 下载maven依赖到指定目录")]),a._v(" "),t("p",[a._v("添加插件")]),a._v(" "),t("div",{staticClass:"language-xml line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-xml"}},[t("code",[a._v("\n    "),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("\x3c!-- maven相关下载插件 --\x3e")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),a._v("plugin")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("\n        "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),a._v("artifactId")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("maven-dependency-plugin"),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("</")]),a._v("artifactId")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("\n        "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),a._v("configuration")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("\n            "),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("\x3c!-- 是否排除间接依赖。默认false，不排除 --\x3e")]),a._v("\n            "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),a._v("excludeTransitive")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("false"),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("</")]),a._v("excludeTransitive")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("\n            "),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("\x3c!-- 是否消除依赖jar包后缀的版本信息。默认是false，不取消版本信息 --\x3e")]),a._v("\n            "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),a._v("stripVersion")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("false"),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("</")]),a._v("stripVersion")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("\n            "),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("\x3c!-- 输出文件路径 --\x3e")]),a._v("\n            "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),a._v("outputDirectory")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("./lib"),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("</")]),a._v("outputDirectory")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("\n        "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("</")]),a._v("configuration")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("</")]),a._v("plugin")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br"),t("span",{staticClass:"line-number"},[a._v("5")]),t("br"),t("span",{staticClass:"line-number"},[a._v("6")]),t("br"),t("span",{staticClass:"line-number"},[a._v("7")]),t("br"),t("span",{staticClass:"line-number"},[a._v("8")]),t("br"),t("span",{staticClass:"line-number"},[a._v("9")]),t("br"),t("span",{staticClass:"line-number"},[a._v("10")]),t("br"),t("span",{staticClass:"line-number"},[a._v("11")]),t("br"),t("span",{staticClass:"line-number"},[a._v("12")]),t("br"),t("span",{staticClass:"line-number"},[a._v("13")]),t("br")])]),t("p",[a._v("执行命令")]),a._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("mvn dependency:copy-dependencies\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br")])]),t("h2",{attrs:{id:"maven-私服介绍"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#maven-私服介绍"}},[a._v("#")]),a._v(" Maven 私服介绍")]),a._v(" "),t("p",[a._v("搭建JFrog Artifactory OOS 开源版")]),a._v(" "),t("h3",{attrs:{id:"容器版"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#容器版"}},[a._v("#")]),a._v(" 容器版")]),a._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("docker pull docker.bintray.io/jfrog/artifactory-oss\n\ndocker run --name artifactory-oss-6.18.1 -d -v /Users/qing/JFROG_HOME/artifactory-oss-618:/var/opt/jfrog/artifactory  -p 8083:8081 docker.bintray.io/jfrog/artifactory-oss:6.18.1\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br")])]),t("h3",{attrs:{id:"安装版"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装版"}},[a._v("#")]),a._v(" 安装版")]),a._v(" "),t("p",[a._v("https://www.jfrogchina.com/open-source/")]),a._v(" "),t("h3",{attrs:{id:"创建maven仓库"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#创建maven仓库"}},[a._v("#")]),a._v(" 创建Maven仓库")]),a._v(" "),t("h3",{attrs:{id:"配置maven连接到artifactory"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#配置maven连接到artifactory"}},[a._v("#")]),a._v(" 配置Maven连接到Artifactory")])])}),[],!1,null,null,null);s.default=e.exports}}]);