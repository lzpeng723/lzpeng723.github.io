import{_ as e,o as t,c as n,a as d}from"./app-U2nchfLp.js";const i={},l=d(`<h2 id="dockerfile-文件支持命令" tabindex="-1"><a class="header-anchor" href="#dockerfile-文件支持命令" aria-hidden="true">#</a> Dockerfile 文件支持命令</h2><table><thead><tr><th style="text-align:center;">命令</th><th style="text-align:center;">用途</th></tr></thead><tbody><tr><td style="text-align:center;">FROM</td><td style="text-align:center;">基础镜像</td></tr><tr><td style="text-align:center;">RUN</td><td style="text-align:center;">执行命令</td></tr><tr><td style="text-align:center;">ADD</td><td style="text-align:center;">添加文件(支持远程ftp拷贝文件)</td></tr><tr><td style="text-align:center;">COPY</td><td style="text-align:center;">拷贝文件</td></tr><tr><td style="text-align:center;">CMD</td><td style="text-align:center;">执行命令</td></tr><tr><td style="text-align:center;">EXPOSE</td><td style="text-align:center;">暴露端口</td></tr><tr><td style="text-align:center;">WORKDIR</td><td style="text-align:center;">指定路径</td></tr><tr><td style="text-align:center;">LABEL</td><td style="text-align:center;">添加键值对</td></tr><tr><td style="text-align:center;">~<s>MAINTAINER (deprecated)</s>~</td><td style="text-align:center;">维护者</td></tr><tr><td style="text-align:center;">ENV</td><td style="text-align:center;">设定环境变量</td></tr><tr><td style="text-align:center;">ENTRYPOINT</td><td style="text-align:center;">容器入口</td></tr><tr><td style="text-align:center;">USER</td><td style="text-align:center;">指定用户</td></tr><tr><td style="text-align:center;">VOLUME</td><td style="text-align:center;">挂载点</td></tr></tbody></table><h2 id="实例-npm-编译打包构建项目" tabindex="-1"><a class="header-anchor" href="#实例-npm-编译打包构建项目" aria-hidden="true">#</a> 实例 npm 编译打包构建项目</h2><h3 id="编写-dockerfile-文件" tabindex="-1"><a class="header-anchor" href="#编写-dockerfile-文件" aria-hidden="true">#</a> 编写 Dockerfile 文件</h3><div class="language-Dockerfile line-numbers-mode" data-ext="Dockerfile"><pre class="language-Dockerfile"><code># 基础镜像使用node:alpine
FROM node:alpine AS build
# 工作目录
WORKDIR /app
# 复制文件
COPY . /app
# 安装依赖 打包
RUN npm install --registry=https://registry.npm.taobao.org &amp;&amp; npm run build
# 使用nginx镜像
FROM nginx:alpine
# 复制文件
COPY --from=build /app/dest /usr/share/nginx/html
# 暴漏端口
EXPOSE 80
# 运行nginx
CMD [&quot;nginx&quot;, &quot;-g&quot;, &quot;daemon off;&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="编写-dockerignore-文件" tabindex="-1"><a class="header-anchor" href="#编写-dockerignore-文件" aria-hidden="true">#</a> 编写 .dockerignore 文件</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.github
.vscode
.gitignore
dest
node_modules
npm-debug.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="构建镜像" tabindex="-1"><a class="header-anchor" href="#构建镜像" aria-hidden="true">#</a> 构建镜像</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker build -t lzpeng723-blog:latest .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,9),r=[l];function a(s,c){return t(),n("div",null,r)}const u=e(i,[["render",a],["__file","docker-file.html.vue"]]);export{u as default};
