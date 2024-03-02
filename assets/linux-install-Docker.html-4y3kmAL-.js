import{_ as d,r as a,o as t,c as l,b as n,d as e,e as r,a as s}from"./app-CTlNizBn.js";const c={},o=s(`<h2 id="docker-安装" tabindex="-1"><a class="header-anchor" href="#docker-安装" aria-hidden="true">#</a> Docker 安装</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 安装 yum-utils
yum install -y yum-utils
# 配置 yum 源
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
# 下载安装
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
也可以使用国内 daocloud 一键安装命令：
curl -sSL https://get.daocloud.io/docker | sh
# 查看版本
docker version
# 启动服务
service docker start
# 查看版本
docker version
# 允许非root用户使用docker
sudo groupadd docker
sudo usermod -aG docker your_username
# 运行HelloWorld
docker run hello-world
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置镜像加速" tabindex="-1"><a class="header-anchor" href="#配置镜像加速" aria-hidden="true">#</a> 配置镜像加速</h2>`,3),u={href:"https://help.aliyun.com/document_detail/60750.html",target:"_blank",rel:"noopener noreferrer"},v=s(`<p>网易加速器：http://hub-mirror.c.163.com</p><p>官方中国加速器：https://registry.docker-cn.com</p><p>七牛云加速器：https://reg-mirror.qiniu.com</p><p>科大镜像(ustc) 的镜像：https://docker.mirrors.ustc.edu.cn</p><p>daocloud：https://www.daocloud.io/mirror#accelerator-doc（注册后使用）</p><h3 id="vim方式修改" tabindex="-1"><a class="header-anchor" href="#vim方式修改" aria-hidden="true">#</a> vim方式修改</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sudo vim /etc/docker/daemon.json

{
    &quot;registry-mirrors&quot;:  [
        &quot;http://hub-mirror.c.163.com&quot;,
        &quot;https://docker.mirrors.ustc.edu.cn&quot;,
        &quot;https://registry.docker-cn.com&quot;,
        &quot;https://reg-mirror.qiniu.com&quot;,
        &quot;https://dockerhub.azk8s.cn&quot;
    ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="tee方式修改" tabindex="-1"><a class="header-anchor" href="#tee方式修改" aria-hidden="true">#</a> tee方式修改</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json &lt;&lt;-&#39;EOF&#39;

{
    &quot;registry-mirrors&quot;:  [
        &quot;http://hub-mirror.c.163.com&quot;,
        &quot;https://docker.mirrors.ustc.edu.cn&quot;,
        &quot;https://registry.docker-cn.com&quot;,
        &quot;https://reg-mirror.qiniu.com&quot;,
        &quot;https://dockerhub.azk8s.cn&quot;
    ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="重新加载镜像源" tabindex="-1"><a class="header-anchor" href="#重新加载镜像源" aria-hidden="true">#</a> 重新加载镜像源</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl daemon-reload
systemctl restart docker
docker info
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="遇到的问题" tabindex="-1"><a class="header-anchor" href="#遇到的问题" aria-hidden="true">#</a> 遇到的问题</h2><p>ubuntu-20.04.1-live-server-amd64 安装docker出错</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@ubuntu-node:~# curl -s https://get.docker.com|sh
# Executing docker install script, commit: 3d8fe77c2c46c5b7571f94b42793905e5b3e42e4
+ sh -c apt-get update -qq &gt;/dev/null
+ sh -c DEBIAN_FRONTEND=noninteractive apt-get install -y -qq apt-transport-https ca-certificates curl &gt;/dev/null
E: Unable to correct problems, you have held broken packages.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>排查是安装apt-transport-https时出错</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@ubuntu-node:~# apt-get install -y apt-transport-https
Reading package lists... Done
Building dependency tree       
Reading state information... Done
Some packages could not be installed. This may mean that you have
requested an impossible situation or if you are using the unstable
distribution that some required packages have not yet been created
or been moved out of Incoming.
The following information may help to resolve the situation:

The following packages have unmet dependencies:
 apt-transport-https : Depends: libapt-pkg5.0 (&gt;= 1.1~exp15) but it is not going to be installed
E: Unable to correct problems, you have held broken packages.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>意思是libapt-pkg5.0版本没法安装，经过检查后发现是提前修改了apt源,将apt源设为默认即可</p><h2 id="最后" tabindex="-1"><a class="header-anchor" href="#最后" aria-hidden="true">#</a> 最后</h2>`,18),m={href:"https://www.runoob.com/docker",target:"_blank",rel:"noopener noreferrer"};function b(h,p){const i=a("ExternalLinkIcon");return t(),l("div",null,[o,n("p",null,[e("阿里云的加速器：https://<你的ID>.mirror.aliyuncs.com "),n("a",u,[e("申请地址"),r(i)])]),v,n("p",null,[e("好了，Docker 安装完毕，开始愉快的学习 Docker 吧，"),n("a",m,[e("Docker学习教程"),r(i)]),e("。")])])}const k=d(c,[["render",b],["__file","linux-install-Docker.html.vue"]]);export{k as default};
