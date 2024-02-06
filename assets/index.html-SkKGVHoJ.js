import{_ as d,r as l,o as s,c as r,b as e,d as i,e as t,a as n}from"./app-rBywrD27.js";const c={},o=n('<h1 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h1><p>极简后台管理系统是一个后台管理系统的基础模板，定义好实体类即可自动生成其它所有前后端代码。采用前后端分离进行开发，全部使用Rest风格API进行数据传递。它的诞生初衷是为了快速开发，专注于业务代码编写。</p><p>首次启动项目会自动建表,并自动创建预置用户角色和菜单,另外预置了三种不同类型的定时任务提供测试,未来将会支持更多种类的定时任务(例如定时调用RestAPI等)</p><p>写好实体类后可使用单元测试自动生成 DAO 层, Service 层, Controller 层, 前端页面以及单元测试代码到项目目录下,然后将前端页面放置前端项目,增删改查,导入导出功能就已完成,然后开始真正业务代码的编写。</p><h2 id="开发工具及环境" tabindex="-1"><a class="header-anchor" href="#开发工具及环境" aria-hidden="true">#</a> 开发工具及环境</h2><h3 id="后端" tabindex="-1"><a class="header-anchor" href="#后端" aria-hidden="true">#</a> 后端</h3>',6),v=e("li",null,"jdk 1.8+",-1),u=e("li",null,"maven 3.6.1",-1),h={href:"https://www.github.com/lzpeng723",target:"_blank",rel:"noopener noreferrer"},m=e("li",null,"IDEA 2019.3.3 (安装lombok插件)",-1),b=e("li",null,"Redis",-1),p=e("li",null,"SpringBoot， Spring Security， Spring Security OAuth2， Spring Data JPA ...",-1),_=n(`<h3 id="前端" tabindex="-1"><a class="header-anchor" href="#前端" aria-hidden="true">#</a> 前端</h3><ul><li>node v12.14.0</li><li>npm 6.13.4</li><li>WebStorm 2018.2.8</li><li>Vue， vue-element-admin， ElementUI， axios ...</li></ul><h2 id="功能概览" tabindex="-1"><a class="header-anchor" href="#功能概览" aria-hidden="true">#</a> 功能概览</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>- 登录 / 认证授权

- 系统管理
  - 用户管理(在这里给用户分配角色)
  - 角色管理(在这里给角色分配菜单权限)
  - 菜单管理(在这里配置菜单权限)
  - 部门管理
  - 岗位管理
  - 通知管理

- 系统监控
  - 定时任务(支持Java类任务, Rhino脚本任务, Nashorn脚本任务)
  - 数据监控
  - 服务监控(查看服务器的cpu,内存,jvm,硬盘等信息)
  - 日志管理
     - 请求日志(列出用户请求日志及所使用设备)
     - 方法日志(列出方法执行日志及)
     - 后台日志(查看并下载服务器日志)

- 系统工具
  - 组件查看(可以在不配置路由的情况下预览自己新建的Vue组件)
  - 图标查看
  - 表单构建(快速构建Vue组件)
  - 单据构建(待开发,前端配置自动生成所有代码)
  - 数据字典(查看项目中所用到的表以及字段详细信息)
  - 代码生成配置(生成代码所用的模板,在数据字典的详情界面进行代码生成操作)
  - 类加载信息(查看类或bean的加载信息)
  - 查询分析器(可执行sql,jpql,rhino,nashron,id查表名,实体查表名,显示表定义,显示所有表等)
  - 系统接口(查看系统所有API接口)

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="todo" tabindex="-1"><a class="header-anchor" href="#todo" aria-hidden="true">#</a> Todo</h2><p>Lzpeng Boot 仍然处于开发中，这里有一些目前还不支持、但已经在计划中的功能：</p><ul><li>工作流</li><li>报表</li></ul><p>欢迎你为 Lzpeng Boot 的开发作出贡献。</p><h2 id="为什么不是" tabindex="-1"><a class="header-anchor" href="#为什么不是" aria-hidden="true">#</a> 为什么不是...?</h2><h3 id="mybatis" tabindex="-1"><a class="header-anchor" href="#mybatis" aria-hidden="true">#</a> Mybatis</h3><p>Mybatis 能做的事情，JPA 理论上确实能够胜任，但 Mybatis 必需要写 mapper 文件，而 JPA 是Spring官方提供，配合 QueryDSL 后也可以实现复杂查询，免去写 mapper 文件的烦恼。</p>`,11);function x(f,g){const a=l("ExternalLinkIcon");return s(),r("div",null,[o,e("ul",null,[v,u,e("li",null,[i("mysql 5.5+ "),e("a",h,[i("本人"),t(a)]),i("使用 mariadb, mariadb 是 mysql 的一个分支,安装包仅50多M,非常推荐")]),m,b,p]),_])}const y=d(c,[["render",x],["__file","index.html.vue"]]);export{y as default};
