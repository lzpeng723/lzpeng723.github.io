(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{356:function(t,a,s){"use strict";s.r(a);var n=s(43),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"后端手册"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#后端手册"}},[t._v("#")]),t._v(" 后端手册")]),t._v(" "),s("h2",{attrs:{id:"项目模块"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#项目模块"}},[t._v("#")]),t._v(" 项目模块")]),t._v(" "),s("p",[t._v("这里演示使用 IDEA 创建一个新的子模块")]),t._v(" "),s("h3",{attrs:{id:"新建模块"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#新建模块"}},[t._v("#")]),t._v(" 新建模块")]),t._v(" "),s("p",[t._v("点击 File -> New -> Module...")]),t._v(" "),s("p",[s("img",{attrs:{src:"/create-module-1.png",alt:"新建模块"}})]),t._v(" "),s("p",[t._v("点击Next")]),t._v(" "),s("p",[s("img",{attrs:{src:"/create-module-2.png",alt:"点击Next"}})]),t._v(" "),s("p",[t._v("父模块选择 minimal-modules, 给本模块命名, 点击 Finish")]),t._v(" "),s("p",[s("img",{attrs:{src:"/create-module-3.png",alt:"选择父模块,命名子模块"}})]),t._v(" "),s("p",[t._v("给本模块写上中文名和中文介绍,并将 minimal-system 的依赖拷贝到本模块")]),t._v(" "),s("p",[s("img",{attrs:{src:"/create-module-4.png",alt:"pom"}})]),t._v(" "),s("p",[t._v("将 minimal-system 的配置文件 application.yml 拷贝到本模块, 并修改端口")]),t._v(" "),s("p",[s("img",{attrs:{src:"/create-module-5.png",alt:"application"}})]),t._v(" "),s("p",[t._v("新建 Spring Boot 启动类")]),t._v(" "),s("p",[s("img",{attrs:{src:"/create-module-6.png",alt:"new class"}}),t._v(" "),s("img",{attrs:{src:"/create-module-7.png",alt:"new class"}})]),t._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("package")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("com"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("lzpeng"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("minimal"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("demo")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("org"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("springframework"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("boot")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("SpringApplication")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("org"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("springframework"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("boot"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("autoconfigure")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("SpringBootApplication")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n * Demo模块 启动类\n * @author : Lzpeng\n */")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@SpringBootApplication")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("DemoApplication")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("main")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" args"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("SpringApplication")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("run")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("DemoApplication")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" args"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("新建数据库")]),t._v(" "),s("div",{staticClass:"language-sql extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sql"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("create")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("DATABASE")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("`")]),t._v("你的模块名"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("`")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("DEFAULT")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("CHARACTER")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("SET")]),t._v(" utf8 "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("COLLATE")]),t._v(" utf8_general_ci"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h3",{attrs:{id:"新增实体"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#新增实体"}},[t._v("#")]),t._v(" 新增实体")]),t._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),s("p",[t._v("实体类必须放到 .domain.entity 包下")])]),t._v(" "),s("p",[t._v("新增实体 DemoEntity")]),t._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("package")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("com"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("lzpeng"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("minimal"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("demo"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("domain"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("entity")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("com"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("lzpeng"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("minimal"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("common"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("core"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("annotation")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Excel")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("com"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("lzpeng"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("minimal"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("common"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("core"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("annotation")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("GenerateCode")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("com"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("lzpeng"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("minimal"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("common"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("jpa"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("domain"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("entity")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("BaseEntity")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("io"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("swagger"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("annotations")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ApiModel")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("io"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("swagger"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("annotations")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ApiModelProperty")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" lombok"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Data")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" lombok"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("EqualsAndHashCode")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" lombok"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ToString")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("org"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("hibernate"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("annotations")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("DynamicInsert")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("org"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("hibernate"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("annotations")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("DynamicUpdate")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("javax"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("persistence")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Column")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("javax"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("persistence")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Entity")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("javax"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("validation"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("constraints")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("NotBlank")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("javax"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("validation"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("constraints")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Size")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n * @author : Lzpeng\n */")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Data")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Entity")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@ApiModel")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"测试实体"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@DynamicInsert")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@DynamicUpdate")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@ToString")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("callSuper "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@EqualsAndHashCode")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("callSuper "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@GenerateCode")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("editPage "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("GenerateCode")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("PageType")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("DIALOG"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("DemoEntity")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("extends")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("BaseEntity")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n     * 名称\n     */")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@NotBlank")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Excel")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("name "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"名称"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@ApiModelProperty")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"名称"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Column")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("columnDefinition "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("\"varchar(255) COMMENT '名称'\"")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n     * 编码\n     */")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Size")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("min "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("6")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" max "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("16")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" message "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"编码必须为6-16位之间"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@ApiModelProperty")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"编码"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Column")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("columnDefinition "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("\"varchar(255) COMMENT '编码'\"")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" unique "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" number"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h3",{attrs:{id:"生成代码"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#生成代码"}},[t._v("#")]),t._v(" 生成代码")]),t._v(" "),s("p",[t._v("在 DemoApplication 类上按 Alt + Enter 选择 Create Test")]),t._v(" "),s("p",[s("img",{attrs:{src:"/generate-code-1.png",alt:"new generate"}})]),t._v(" "),s("p",[s("img",{attrs:{src:"/generate-code-2.png",alt:"new generate"}})]),t._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("package")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("com"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("lzpeng"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("minimal"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("demo")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("com"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("lzpeng"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("minimal"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("generate"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("core")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("AbstractCodeGenerator")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("com"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("lzpeng"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("minimal"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("generate"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("jpa")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("JpaCodeGenerator")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("org"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("junit"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("jupiter"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("api")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Test")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("org"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("junit"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("jupiter"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("api")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Assertions")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("*"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n * @author : Lzpeng\n */")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("DemoApplicationTest")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Test")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("testGenFile")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("AbstractCodeGenerator")]),t._v(" generator "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("JpaCodeGenerator")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        generator"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("generateAllCode")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("运行测试用例,生成代码")]),t._v(" "),s("p",[s("img",{attrs:{src:"/run-generator-1.png",alt:"run-generator"}})]),t._v(" "),s("p",[t._v("运行完毕后会生成 Controller, Service, Dao, 测试用例和前端页面,如下图所示")]),t._v(" "),s("p",[s("img",{attrs:{src:"/run-generator-2.png",alt:"run-generator"}})]),t._v(" "),s("p",[t._v("运行测试用例")]),t._v(" "),s("p",[s("img",{attrs:{src:"/run-controller-test-1.png",alt:"run-controller-test"}})]),t._v(" "),s("p",[t._v("可能会出现 "),s("code",[t._v("nested exception is java.lang.IllegalArgumentException: Did not find a query class com.lzpeng.minimal.demo.domain.entity.QDemoEntity for domain class com.lzpeng.minimal.demo.domain.entity.DemoEntity!")]),t._v(",是因为没有生成QueryDSL的类, 可以"),s("code",[t._v("mvn compile")]),t._v("一下。")]),t._v(" "),s("p",[s("img",{attrs:{src:"/mvn-compile.png",alt:"mvn-compile"}})]),t._v(" "),s("p",[t._v("再次运行测试用例就会运行成功,说明后端代码没有问题")]),t._v(" "),s("p",[s("img",{attrs:{src:"/run-controller-test-2.png",alt:"run-controller-test"}})]),t._v(" "),s("p",[t._v("将生成的前端文件放置前端项目中")]),t._v(" "),s("p",[s("img",{attrs:{src:"/copy-vue-code.png",alt:"copy-vue-code"}})]),t._v(" "),s("p",[t._v("在网关模块配置文件(./minimal-gateway/src/main/resources/application-gateway.yml)添加如下配置")]),t._v(" "),s("div",{staticClass:"language-yaml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yaml"}},[s("code",[t._v("        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("id")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" minimal"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("demo\n          "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("uri")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" lb"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("//minimal"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("demo\n          "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("predicates")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" Path=/demo/"),s("span",{pre:!0,attrs:{class:"token important"}},[t._v("**")]),t._v("\n")])])]),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),s("p",[t._v("注意缩进空格(TAB),缩进不对会导致项目启动失败")])]),t._v(" "),s("p",[t._v("配置完成之后如下图所示")]),t._v(" "),s("p",[s("img",{attrs:{src:"/config-gateway.png",alt:"config-gateway"}})]),t._v(" "),s("h3",{attrs:{id:"发布菜单"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#发布菜单"}},[t._v("#")]),t._v(" 发布菜单")]),t._v(" "),s("p",[t._v("启动 Nacos, Sentinel, Zipkin")]),t._v(" "),s("p",[s("RouterLink",{attrs:{to:"/guide/quick-start.html#后端运行idea"}},[t._v("启动所有微服务")]),t._v("和"),s("RouterLink",{attrs:{to:"/guide/quick-start.html#前端运行webstorm"}},[t._v("前端项目")]),t._v(",然后使用系统管理员登录系统")],1),t._v(" "),s("p",[s("img",{attrs:{src:"/login-page.png",alt:"登录页面"}})]),t._v(" "),s("p",[s("img",{attrs:{src:"/home-page.png",alt:"首页"}}),t._v("\n选择 系统管理 -> 菜单管理 -> 新增菜单")]),t._v(" "),s("p",[t._v("新增菜单组")]),t._v(" "),s("p",[s("img",{attrs:{src:"/create-menu-1.png",alt:"新增菜单组"}})]),t._v(" "),s("p",[s("img",{attrs:{src:"/create-menu-2.png",alt:"新增菜单组"}})]),t._v(" "),s("p",[t._v("新增菜单项")]),t._v(" "),s("p",[s("img",{attrs:{src:"/create-menu-3.png",alt:"新增菜单项"}})]),t._v(" "),s("p",[s("img",{attrs:{src:"/create-menu-4.png",alt:"新增菜单项"}})]),t._v(" "),s("p",[s("img",{attrs:{src:"/create-menu-5.png",alt:"新增菜单项"}})]),t._v(" "),s("p",[t._v("新增权限项")]),t._v(" "),s("p",[s("img",{attrs:{src:"/create-menu-6.png",alt:"新增权限项"}})]),t._v(" "),s("p",[s("img",{attrs:{src:"/create-menu-7.png",alt:"新增权限项"}})]),t._v(" "),s("p",[t._v("最终效果:")]),t._v(" "),s("p",[s("img",{attrs:{src:"/create-menu-8.png",alt:"新增权限项"}})]),t._v(" "),s("p",[t._v("分配权限")]),t._v(" "),s("p",[s("img",{attrs:{src:"/authorization-1.png",alt:"分配权限"}})]),t._v(" "),s("p",[s("img",{attrs:{src:"/authorization-2.png",alt:"分配权限"}})]),t._v(" "),s("p",[t._v("退出系统,重新登录,测试新模块")]),t._v(" "),s("p",[s("img",{attrs:{src:"/logout-page.png",alt:"退出登录"}})]),t._v(" "),s("p",[t._v("测试增删改查均无问题")]),t._v(" "),s("p",[s("img",{attrs:{src:"/test-crud-1.png",alt:"测试新模块"}})]),t._v(" "),s("h2",{attrs:{id:"权限控制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#权限控制"}},[t._v("#")]),t._v(" 权限控制")]),t._v(" "),s("p",[t._v("权限控制采用Spring Security,待补充")]),t._v(" "),s("h3",{attrs:{id:"权限控制-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#权限控制-2"}},[t._v("#")]),t._v(" 权限控制")]),t._v(" "),s("p",[t._v("权限控制采用Spring Security,待补充")]),t._v(" "),s("h3",{attrs:{id:"数据交互"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#数据交互"}},[t._v("#")]),t._v(" 数据交互")]),t._v(" "),s("p",[t._v("权限控制采用Spring Security,待补充")]),t._v(" "),s("h3",{attrs:{id:"权限注解"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#权限注解"}},[t._v("#")]),t._v(" 权限注解")]),t._v(" "),s("p",[t._v("权限控制采用Spring Security,待补充")]),t._v(" "),s("h3",{attrs:{id:"接口放行"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#接口放行"}},[t._v("#")]),t._v(" 接口放行")]),t._v(" "),s("p",[t._v("权限控制采用Spring Security,待补充")]),t._v(" "),s("h2",{attrs:{id:"通用查询"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#通用查询"}},[t._v("#")]),t._v(" 通用查询")]),t._v(" "),s("p",[t._v("ORM框架采用Spring Data JPA,待补充")]),t._v(" "),s("h3",{attrs:{id:"jpa查询"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#jpa查询"}},[t._v("#")]),t._v(" JPA查询")]),t._v(" "),s("p",[t._v("ORM框架采用Spring Data JPA,待补充")]),t._v(" "),s("h3",{attrs:{id:"query-dsl查询"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#query-dsl查询"}},[t._v("#")]),t._v(" Query DSL查询")]),t._v(" "),s("p",[t._v("ORM框架采用Spring Data JPA,待补充")]),t._v(" "),s("h2",{attrs:{id:"系统缓存"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#系统缓存"}},[t._v("#")]),t._v(" 系统缓存")]),t._v(" "),s("p",[t._v("缓存采用Spring Cache,待补充")]),t._v(" "),s("h3",{attrs:{id:"配置缓存"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置缓存"}},[t._v("#")]),t._v(" 配置缓存")]),t._v(" "),s("p",[t._v("缓存采用Spring Cache,待补充")]),t._v(" "),s("h3",{attrs:{id:"缓存注解"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#缓存注解"}},[t._v("#")]),t._v(" 缓存注解")]),t._v(" "),s("p",[t._v("缓存采用Spring Cache,待补充")]),t._v(" "),s("h3",{attrs:{id:"使用建议"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用建议"}},[t._v("#")]),t._v(" 使用建议")]),t._v(" "),s("p",[t._v("缓存采用Spring Cache,待补充")])])}),[],!1,null,null,null);a.default=e.exports}}]);