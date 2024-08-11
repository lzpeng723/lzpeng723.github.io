import{_ as a,r as d,o as l,c as r,b as n,d as e,e as i,a as s}from"./app-m_Ib8w5j.js";const c={},o=n("h2",{id:"_1-下载node",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-下载node","aria-hidden":"true"},"#"),e(" 1 下载node")],-1),m={href:"https://nodejs.org/",target:"_blank",rel:"noopener noreferrer"},v=n("code",null,"Path",-1),p=s(`<p>验证是否安装成功</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>node -v
npm -v
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-初始化npm" tabindex="-1"><a class="header-anchor" href="#_2-初始化npm" aria-hidden="true">#</a> 2 初始化npm</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 更改使用指定镜像（淘宝）
npm config set registry https://registry.npm.taobao.org
# 设置npm下载包路径并手动将设置的路径添加到环境变量Path中
npm config set prefix &quot;E:\\libs\\nodejs\\npm&quot;
# 设置npm缓存包路径
npm config set cache &quot;E:\\libs\\nodejs\\npm\\cache&quot;
# 全局安装 cnpm, yarn, @vue/cli 和 windows-build-tools
# 使用淘宝cnpm代替原生npm
npm install -g cnpm
# 使用yarn代替原生npm
npm install -g yarn
# 开发vue项目的脚手架
npm install -g @vue/cli
# Node.js 在安装模块的时候可能会报缺少python环境的错
npm install --global --production windows-build-tools
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="yarn-与-npm" tabindex="-1"><a class="header-anchor" href="#yarn-与-npm" aria-hidden="true">#</a> yarn 与 npm</h2><table><thead><tr><th style="text-align:center;">npm</th><th style="text-align:center;">yarn</th></tr></thead><tbody><tr><td style="text-align:center;">npm install</td><td style="text-align:center;">yarn</td></tr><tr><td style="text-align:center;">npm install react --save</td><td style="text-align:center;">yarn add react</td></tr><tr><td style="text-align:center;">npm uninstall react --save</td><td style="text-align:center;">yarn remove react</td></tr><tr><td style="text-align:center;">npm install react --save-dev</td><td style="text-align:center;">yarn add react --dev</td></tr><tr><td style="text-align:center;">npm update --save</td><td style="text-align:center;">yarn upgrade</td></tr><tr><td style="text-align:center;">npm run dev</td><td style="text-align:center;">yarn dev</td></tr><tr><td style="text-align:center;">npm run build</td><td style="text-align:center;">yarn build</td></tr></tbody></table>`,6);function u(h,b){const t=d("ExternalLinkIcon");return l(),r("div",null,[o,n("p",null,[e("进入"),n("a",m,[e("官网"),i(t)]),e(",下载LTS(长期维护版)，安装完后会自动将安装目录添加到环境变量"),v,e("中，即可使用```npm``命令。")]),p])}const y=a(c,[["render",u],["__file","nodejs-install.html.vue"]]);export{y as default};
