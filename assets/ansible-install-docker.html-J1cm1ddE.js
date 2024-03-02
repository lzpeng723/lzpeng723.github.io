import{_ as n,o as s,c as a,a as e}from"./app-CTlNizBn.js";const t={},p=e(`<h1 id="ansible-给多台主机安装-docker" tabindex="-1"><a class="header-anchor" href="#ansible-给多台主机安装-docker" aria-hidden="true">#</a> ansible 给多台主机安装 docker</h1><h2 id="编写-ansible-cfg-文件" tabindex="-1"><a class="header-anchor" href="#编写-ansible-cfg-文件" aria-hidden="true">#</a> 编写 ansible.cfg 文件</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token punctuation">[</span>defaults<span class="token punctuation">]</span>
<span class="token comment"># 主机清单配置文件</span>
inventory = ./hosts
<span class="token comment"># 配置用户</span>
remote_user = lzpeng
<span class="token comment"># 配置Roles文件路径</span>
role_path = ./roles
<span class="token punctuation">[</span>privilege_escalation<span class="token punctuation">]</span>
<span class="token comment"># 是否需要切换用户</span>
become = True
<span class="token comment"># 如何切换用户</span>
become_method = sudo
<span class="token comment"># 切换成什么用户</span>
become_user = root
<span class="token comment"># sudo 是否需要输入密码</span>
become_ask_pass = False
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="编写-hosts-文件" tabindex="-1"><a class="header-anchor" href="#编写-hosts-文件" aria-hidden="true">#</a> 编写 hosts 文件</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[docker] # 组名
CentOS7-Node1 # 主机名
[proxy]
CentOS7-Node2
[webserver]
CentOS7-Node[3:4] # 连续主机名
[database]
CentOS7-Node5
[cluster:children] # 嵌套组
webserver
database
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建-role" tabindex="-1"><a class="header-anchor" href="#创建-role" aria-hidden="true">#</a> 创建 role</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> ./roles
<span class="token builtin class-name">cd</span> ./roles
ansible-galaxy init install-docker
tree ./install-docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="编写配置文件" tabindex="-1"><a class="header-anchor" href="#编写配置文件" aria-hidden="true">#</a> 编写配置文件</h2><p>vars/main.yml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token comment"># vars file for install-docker</span>
<span class="token key atrule">INSTALL_DOCKER_COMPOSE</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">DOCKER_COMPOSE_VERSION</span><span class="token punctuation">:</span> v2.0.1
<span class="token key atrule">INSTALL_DOCKER_MACHINE</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
<span class="token key atrule">DOCKER_MACHINE_VERSION</span><span class="token punctuation">:</span> v0.16.2
<span class="token key atrule">DOCKER_DATA_ROOT</span><span class="token punctuation">:</span> /opt/data/docker
<span class="token key atrule">UNINSTALL_OLD_DOCKER</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>templates/daemon.json</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;exec-opts&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;native.cgroupdriver=systemd&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;data-root&quot;</span><span class="token operator">:</span> <span class="token string">&quot;{{DOCKER_DATA_ROOT}}&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;registry-mirrors&quot;</span><span class="token operator">:</span>  <span class="token punctuation">[</span>
        <span class="token string">&quot;http://hub-mirror.c.163.com&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;https://docker.mirrors.ustc.edu.cn&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;https://registry.docker-cn.com&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;https://reg-mirror.qiniu.com&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;https://dockerhub.azk8s.cn&quot;</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="编写-任务" tabindex="-1"><a class="header-anchor" href="#编写-任务" aria-hidden="true">#</a> 编写 任务</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token comment"># tasks file for install-docker</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 卸载旧 Docker
  <span class="token key atrule">when</span><span class="token punctuation">:</span> UNINSTALL_OLD_DOCKER
  <span class="token key atrule">block</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 停止 Docker
      <span class="token key atrule">ignore_errors</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
      <span class="token key atrule">service</span><span class="token punctuation">:</span> 
        <span class="token key atrule">name</span><span class="token punctuation">:</span> docker
        <span class="token key atrule">state</span><span class="token punctuation">:</span> stopped
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 卸载旧版本 Docker
      <span class="token key atrule">yum</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> docker
          <span class="token punctuation">-</span> docker<span class="token punctuation">-</span>client
          <span class="token punctuation">-</span> docker<span class="token punctuation">-</span>client<span class="token punctuation">-</span>latest
          <span class="token punctuation">-</span> docker<span class="token punctuation">-</span>common
          <span class="token punctuation">-</span> docker<span class="token punctuation">-</span>latest
          <span class="token punctuation">-</span> docker<span class="token punctuation">-</span>latest<span class="token punctuation">-</span>logrotate
          <span class="token punctuation">-</span> docker<span class="token punctuation">-</span>logrotate
          <span class="token punctuation">-</span> docker<span class="token punctuation">-</span>engine
          <span class="token punctuation">-</span> docker<span class="token punctuation">-</span>ce
          <span class="token punctuation">-</span> docker<span class="token punctuation">-</span>ce<span class="token punctuation">-</span>cli
          <span class="token punctuation">-</span> containerd.io   
        <span class="token key atrule">state</span><span class="token punctuation">:</span> absent
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 删除旧版本 Docker 数据文件夹
      <span class="token key atrule">file</span><span class="token punctuation">:</span>
        <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token string">&quot;{{DOCKER_DATA_ROOT}}&quot;</span>
        <span class="token key atrule">state</span><span class="token punctuation">:</span> absent
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 删除 /etc/docker 文件夹
      <span class="token key atrule">file</span><span class="token punctuation">:</span>
        <span class="token key atrule">path</span><span class="token punctuation">:</span> /etc/docker
        <span class="token key atrule">state</span><span class="token punctuation">:</span> absent
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 安装 yum<span class="token punctuation">-</span>utils
  <span class="token key atrule">yum</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> yum<span class="token punctuation">-</span>utils
    <span class="token key atrule">state</span><span class="token punctuation">:</span> present
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 设置 yum 源
  <span class="token key atrule">command</span><span class="token punctuation">:</span> yum<span class="token punctuation">-</span>config<span class="token punctuation">-</span>manager <span class="token punctuation">-</span><span class="token punctuation">-</span>add<span class="token punctuation">-</span>repo http<span class="token punctuation">:</span>//mirrors.aliyun.com/docker<span class="token punctuation">-</span>ce/linux/centos/docker<span class="token punctuation">-</span>ce.repo
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 安装 Docker
  <span class="token key atrule">yum</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> docker<span class="token punctuation">-</span>ce
      <span class="token punctuation">-</span> docker<span class="token punctuation">-</span>ce<span class="token punctuation">-</span>cli
      <span class="token punctuation">-</span> containerd.io   
    <span class="token key atrule">state</span><span class="token punctuation">:</span> present
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 创建 /etc/docker 文件夹
  <span class="token key atrule">file</span><span class="token punctuation">:</span>
    <span class="token key atrule">path</span><span class="token punctuation">:</span> /etc/docker/
    <span class="token key atrule">state</span><span class="token punctuation">:</span> directory
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 拷贝 docker 配置文件
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">src</span><span class="token punctuation">:</span> daemon.json
    <span class="token key atrule">dest</span><span class="token punctuation">:</span> /etc/docker/daemon.json
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 重新加载配置文件
  <span class="token key atrule">command</span><span class="token punctuation">:</span> systemctl daemon<span class="token punctuation">-</span>reload
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 重新启动 Docker
  <span class="token key atrule">service</span><span class="token punctuation">:</span> 
    <span class="token key atrule">name</span><span class="token punctuation">:</span> docker
    <span class="token key atrule">state</span><span class="token punctuation">:</span> restarted
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 开机自启 Docker
  <span class="token key atrule">command</span><span class="token punctuation">:</span> systemctl enable docker
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 安装 docker<span class="token punctuation">-</span>compose
  <span class="token key atrule">when</span><span class="token punctuation">:</span> INSTALL_DOCKER_COMPOSE
  <span class="token key atrule">ignore_errors</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">get_url</span><span class="token punctuation">:</span>
    <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//github.com/docker/compose/releases/download/<span class="token punctuation">{</span><span class="token punctuation">{</span>DOCKER_COMPOSE_VERSION<span class="token punctuation">}</span><span class="token punctuation">}</span>/docker<span class="token punctuation">-</span>compose<span class="token punctuation">-</span><span class="token punctuation">{</span><span class="token punctuation">{</span>ansible_system<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span><span class="token punctuation">{</span><span class="token punctuation">{</span>ansible_architecture<span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token key atrule">dest</span><span class="token punctuation">:</span> /usr/local/bin/docker<span class="token punctuation">-</span>compose
    <span class="token key atrule">mode</span><span class="token punctuation">:</span> <span class="token string">&#39;0755&#39;</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 安装 docker<span class="token punctuation">-</span>machine
  <span class="token key atrule">when</span><span class="token punctuation">:</span> INSTALL_DOCKER_MACHINE
  <span class="token key atrule">ignore_errors</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">get_url</span><span class="token punctuation">:</span>
    <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//github.com/docker/machine/releases/download/<span class="token punctuation">{</span><span class="token punctuation">{</span>DOCKER_MACHINE_VERSION<span class="token punctuation">}</span><span class="token punctuation">}</span>/docker<span class="token punctuation">-</span>machine<span class="token punctuation">-</span><span class="token punctuation">{</span><span class="token punctuation">{</span>ansible_system<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span><span class="token punctuation">{</span><span class="token punctuation">{</span>ansible_architecture<span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token key atrule">dest</span><span class="token punctuation">:</span> /usr/local/bin/docker<span class="token punctuation">-</span>machine
    <span class="token key atrule">mode</span><span class="token punctuation">:</span> <span class="token string">&#39;0755&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建剧本" tabindex="-1"><a class="header-anchor" href="#创建剧本" aria-hidden="true">#</a> 创建剧本</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span> all
  <span class="token key atrule">roles</span><span class="token punctuation">:</span>
   <span class="token punctuation">-</span> install<span class="token punctuation">-</span>docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="执行剧本" tabindex="-1"><a class="header-anchor" href="#执行剧本" aria-hidden="true">#</a> 执行剧本</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ansible-playbook install-docker.yml <span class="token parameter variable">-f</span> <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,18),c=[p];function l(i,o){return s(),a("div",null,c)}const r=n(t,[["render",l],["__file","ansible-install-docker.html.vue"]]);export{r as default};
