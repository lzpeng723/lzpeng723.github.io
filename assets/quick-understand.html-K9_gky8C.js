import{_ as i,o as l,c as e,a as n}from"./app-m_Ib8w5j.js";const a={},d=n(`<h1 id="快速了解" tabindex="-1"><a class="header-anchor" href="#快速了解" aria-hidden="true">#</a> 快速了解</h1><h1 id="minimal-cloud-后台管理系统-微服务版" tabindex="-1"><a class="header-anchor" href="#minimal-cloud-后台管理系统-微服务版" aria-hidden="true">#</a> <div style="text-align:center;">MINIMAL-CLOUD 后台管理系统(微服务版)</div></h1><h2 id="系统模块" tabindex="-1"><a class="header-anchor" href="#系统模块" aria-hidden="true">#</a> 系统模块</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>com.lzpeng.minimal     
├── minimal-admin           // 监控中心 [端口]           
├── minimal-common          // 通用模块
│       └── minimal-common-core                         // 核心模块
│       └── minimal-common-jpa                          // JPA模块
│       └── minimal-common-log                          // 日志记录
│       └── minimal-common-security                     // 安全模块
│       └── minimal-common-swagger                      // 系统接口
├── minimal-gateway         // 网关模块 [8888]
├── minimal-generate        // 代码生成模块
│       └── minimal-generate-core                        // 代码生成核心模块
│       └── minimal-generate-jpa                         // 代码生成JPA模块
├── minimal-modules         // 业务模块
│       └── minimal-system                               // 系统管理模块 [9201]
│       └── minimal-tool                                 // 服务工具平台 [9202]
├──pom.xml                 // 公共依赖
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="架构图" tabindex="-1"><a class="header-anchor" href="#架构图" aria-hidden="true">#</a> 架构图</h2><img src="#"><h2 id="内置功能" tabindex="-1"><a class="header-anchor" href="#内置功能" aria-hidden="true">#</a> 内置功能</h2><ul><li><p>登录 / 认证授权</p></li><li><p>系统管理</p><ul><li>用户管理(用户是系统的核心)</li><li>角色管理(角色是连接用户和权限(菜单)的桥梁)</li><li>菜单管理(树形结构展示菜单,支持菜单组、菜单、按钮级权限)</li><li>部门管理(用户的组织架构)</li><li>岗位管理(用户的职责)</li><li><s>通知管理(发送通知,待办)</s></li></ul></li><li><p>系统监控</p><ul><li>定时任务(支持Java类任务, Rhino脚本任务, Nashorn脚本任务,后续支持Rest请求，SQL脚本任务)</li><li>数据监控(监控SQL语句执行时间,执行时长,找出性能瓶颈)</li><li>服务监控(查看服务器的cpu,内存,jvm,硬盘等信息)</li><li>日志管理 <ul><li>请求日志(记录用户发送后台请求)</li><li>方法日志(记录方法执行日志)</li><li>后台日志(查看并下载服务器日志)</li></ul></li></ul></li><li><p>系统工具</p><ul><li>组件查看(可以在不配置路由的情况下预览自己新建的Vue组件)</li><li>图标查看(查看项目内的所有图标)</li><li>表单构建(快速构建Vue组件)</li><li>数据字典(查看项目中所用到的实体,表以及字段详细信息)</li><li>代码生成配置(生成代码所用的模板,在数据字典的详情界面进行代码生成操作)</li><li>类加载信息(查看类或bean的加载信息)</li><li>查询分析器(可执行sql,jpql,rhino,nashron,id查表名,实体查表名,显示表定义,显示所有表等)</li><li>系统接口(查看系统所有API接口)</li></ul></li></ul>`,8),m=[d];function s(r,c){return l(),e("div",null,m)}const u=i(a,[["render",s],["__file","quick-understand.html.vue"]]);export{u as default};
