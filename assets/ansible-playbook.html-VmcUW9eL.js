import{_ as a,o as e,c as t,b as n,d as l,t as p,a as s}from"./app-Alqy9ioH.js";const i={},c=s(`<h2 id="ansible-playbook-简介" tabindex="-1"><a class="header-anchor" href="#ansible-playbook-简介" aria-hidden="true">#</a> Ansible playbook 简介</h2><p>playbook 是 ansible 用于配置，部署，和管理被控节点的剧本。 通过 playbook 的详细描述，执行其中的一系列 tasks ，可以让远端主机达到预期的状态。playbook 就像 Ansible 控制器给被控节点列出的的一系列 to-do-list ，而被控节点必须要完成。 也可以这么理解，playbook 字面意思，即剧本，现实中由演员按照剧本表演，在Ansible中，这次由计算机进行表演，由计算机安装，部署应用，提供对外服务，以及组织计算机处理各种各样的事情。</p><h3 id="ansible-playbook使用场景" tabindex="-1"><a class="header-anchor" href="#ansible-playbook使用场景" aria-hidden="true">#</a> Ansible playbook使用场景</h3><p>执行一些简单的任务，使用ad-hoc命令可以方便的解决问题，但是有时一个设施过于复杂，需要大量的操作时候，执行的ad-hoc命令是不适合的，这时最好使用playbook。 就像执行shell命令与写shell脚本一样，也可以理解为批处理任务，不过playbook有自己的语法格式。 使用playbook你可以方便的重用这些代码，可以移植到不同的机器上面，像函数一样，最大化的利用代码。在你使用Ansible的过程中，你也会发现，你所处理的大部分操作都是编写playbook。可以把常见的应用都编写成playbook，之后管理服务器会变得十分简单。</p><ul><li>Ansible ad-hoc可以通过命令行形式远程管理其他主机 <ul><li>v适合执行一些临时性简单任务</li></ul></li><li>Ansible playbook中文名称叫剧本 <ul><li>将经常需要执行的任务写入一个文件(剧本)</li><li>剧本中可以包含多个任务</li><li>剧本写后，我们随时调用剧本，执行相关的任务命令</li><li>playbook剧本要求按照YAML格式编写</li><li>适合执行周期性经常执行的复杂任务</li></ul></li></ul><h3 id="ansible-playbook格式简介" tabindex="-1"><a class="header-anchor" href="#ansible-playbook格式简介" aria-hidden="true">#</a> Ansible playbook格式简介</h3><p>playbook由YMAL语言编写。YAML( /ˈjæməl/ )参考了其他多种语言，包括：XML、C语言、Python、Perl以及电子邮件格式RFC2822，Clark Evans在2001年5月在首次发表了这种语言，另外Ingy döt Net与OrenBen-Kiki也是这语言的共同设计者。</p><p>YMAL格式是类似于JSON的文件格式，便于人理解和阅读，同时便于书写。首先学习了解一下YMAL的格式，对我们后面书写playbook很有帮助。以下为playbook常用到的YMAL格式：</p><ul><li>&quot;#&quot;代表注释，-般第一行为三个横杠</li><li>键值对使用&quot;:&quot;表示，数组使用&quot;-&quot;表示</li><li>缩进必须由两个或以上空格组成</li><li>相同层级的缩进必须对齐</li><li>全文不可以使用tab键</li><li>区分大小写、扩展名为yml或者yaml</li><li>跨行数据需要使用&gt;或者| (|会保留换行符)</li></ul><p>下面是一个举例：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token comment">#安装与运行mysql服务</span>
<span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span> CentOS7<span class="token punctuation">-</span>Node1
  <span class="token key atrule">remote_user</span><span class="token punctuation">:</span> lzpeng
  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 安装mysql
      <span class="token key atrule">yum</span><span class="token punctuation">:</span> name=mysql<span class="token punctuation">-</span>server state=present
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 启动mysqld服务
      <span class="token key atrule">service</span><span class="token punctuation">:</span> name=mysql state=started
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的文件名称应该以<code>.yml</code>结尾，像我们上面的例子就是<code>mysql.yml</code>。其中，有三个部分组成：</p><blockquote><p><code>host部分</code>：使用 hosts 指示使用哪个主机或主机组来运行下面的 tasks ，每个 playbook 都必须指定 hosts ，hosts也<strong>可以使用通配符格式</strong>。主机或主机组在 inventory 清单中指定，可以使用系统默认的<code>/etc/ansible/hosts</code>，也可以自己编辑，在运行的时候加上<code>-i</code>选项，指定清单的位置即可。在运行清单文件的时候，<code>–list-hosts</code>选项会显示那些主机将会参与执行 task 的过程中。 <code>remote_user</code>：指定远端主机中的哪个用户来登录远端系统，在远端系统执行 task 的用户，可以任意指定，也可以使用 sudo，但是用户必须要有执行相应 task 的权限。 <code>tasks</code>：指定远端主机将要执行的一系列动作。tasks 的核心为 ansible 的模块，前面已经提到模块的用法。tasks 包含 <code>name</code> 和<code>要执行的模块</code>，name 是可选的，只是为了便于用户阅读，不过还是建议加上去，模块是必须的，同时也要给予模块相应的参数。</p></blockquote><p>使用ansible-playbook运行playbook文件，得到如下输出信息，输出内容为JSON格式。并且由不同颜色组成，便于识别。一般而言</p><ul><li>绿色代表执行成功，系统保持原样</li><li>黄色代表系统代表系统状态发生改变</li><li>红色代表执行失败，显示错误输出</li></ul><p>执行有三个步骤： 1、收集facts 2、执行tasks 3、报告结果</p><p>下面我们修改vim配置,在使用vim编辑yml文件时，使用2个空格自动替换tab键(<code>tabstop=2 expandtab</code>),开启自动缩进对齐，缩进宽度为2个空格<code>(shiftwidth=2</code>)。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> ~/.vimrc

<span class="token comment"># 添加以下内容</span>
autocmd FileType yaml setlocal ai <span class="token assign-left variable">ts</span><span class="token operator">=</span><span class="token number">2</span> <span class="token assign-left variable">sw</span><span class="token operator">=</span><span class="token number">2</span> et
autocmd FileType yml setlocal ai <span class="token assign-left variable">ts</span><span class="token operator">=</span><span class="token number">2</span> <span class="token assign-left variable">sw</span><span class="token operator">=</span><span class="token number">2</span> et
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="举例" tabindex="-1"><a class="header-anchor" href="#举例" aria-hidden="true">#</a> 举例</h2><h3 id="网络连通性测试" tabindex="-1"><a class="header-anchor" href="#网络连通性测试" aria-hidden="true">#</a> 网络连通性测试</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> ~/ansible
<span class="token function">vim</span> ping.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>编写如下配置文件</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span> test
  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 网络连通性测试
      <span class="token key atrule">ping</span><span class="token punctuation">:</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试运行结果</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 指定并发连接 5 台主机</span>
ansible-playbook ~/ansible/ping.yml <span class="token parameter variable">-f</span> <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建系统用户、账户属性、设置密码" tabindex="-1"><a class="header-anchor" href="#创建系统用户、账户属性、设置密码" aria-hidden="true">#</a> 创建系统用户、账户属性、设置密码</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span> test
  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 创建用户 lzpeng 设置密码 123456
      <span class="token key atrule">user</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> lzpeng
        <span class="token key atrule">uid</span><span class="token punctuation">:</span> <span class="token number">1040</span>
        <span class="token key atrule">group</span><span class="token punctuation">:</span> daemon
        <span class="token key atrule">shell</span><span class="token punctuation">:</span> /bin/bash
        <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token string">&quot;{{&#39;123456&#39; | password_hash(&#39;sha512&#39;)}}&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除用户" tabindex="-1"><a class="header-anchor" href="#删除用户" aria-hidden="true">#</a> 删除用户</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span> test
  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 删除用户 lzpeng
      <span class="token key atrule">user</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> lzpeng
        <span class="token key atrule">state</span><span class="token punctuation">:</span> absent
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用vdb创建卷组和逻辑卷-手动添加磁盘sdb" tabindex="-1"><a class="header-anchor" href="#使用vdb创建卷组和逻辑卷-手动添加磁盘sdb" aria-hidden="true">#</a> 使用vdb创建卷组和逻辑卷(手动添加磁盘sdb)</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span> test
  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 创建第一个主分区
      <span class="token key atrule">parted</span><span class="token punctuation">:</span>
        <span class="token key atrule">device</span><span class="token punctuation">:</span> /dev/sdb
        <span class="token key atrule">number</span><span class="token punctuation">:</span> <span class="token number">1</span>
        <span class="token key atrule">state</span><span class="token punctuation">:</span> present
        <span class="token key atrule">part_end</span><span class="token punctuation">:</span> 1GiB
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 创建第二个主分区
      <span class="token key atrule">parted</span><span class="token punctuation">:</span>
        <span class="token key atrule">device</span><span class="token punctuation">:</span> /dev/sdb
        <span class="token key atrule">number</span><span class="token punctuation">:</span> <span class="token number">2</span>
        <span class="token key atrule">state</span><span class="token punctuation">:</span> present
        <span class="token key atrule">part_start</span><span class="token punctuation">:</span> 1GiB
        <span class="token key atrule">part_end</span><span class="token punctuation">:</span> 3GiB
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 创建一个卷组
      <span class="token key atrule">lvg</span><span class="token punctuation">:</span>
        <span class="token key atrule">vg</span><span class="token punctuation">:</span> my_vg
        <span class="token key atrule">pvs</span><span class="token punctuation">:</span> /dev/sdb1
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 创建一个逻辑卷
      <span class="token key atrule">lvol</span><span class="token punctuation">:</span>
        <span class="token key atrule">vg</span><span class="token punctuation">:</span> my_vg
        <span class="token key atrule">lv</span><span class="token punctuation">:</span> my_lv
        <span class="token key atrule">size</span><span class="token punctuation">:</span> 512m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装软件、升级软件、安装组包" tabindex="-1"><a class="header-anchor" href="#安装软件、升级软件、安装组包" aria-hidden="true">#</a> 安装软件、升级软件、安装组包</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span> test
  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 安装软件包
      <span class="token key atrule">yum</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> httpd
          <span class="token punctuation">-</span> mariadb
          <span class="token punctuation">-</span> mariadb<span class="token punctuation">-</span>server
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 安装组包
      <span class="token key atrule">yum</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;@Development tools&quot;</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 升级软件
      <span class="token key atrule">yum</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;*&quot;</span>
        <span class="token key atrule">state</span><span class="token punctuation">:</span> latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="debug-显示变量值" tabindex="-1"><a class="header-anchor" href="#debug-显示变量值" aria-hidden="true">#</a> debug 显示变量值</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span> test
  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">debug</span><span class="token punctuation">:</span>
        <span class="token key atrule">var</span><span class="token punctuation">:</span> ansible_all_ipv4.addresses
    <span class="token punctuation">-</span> <span class="token key atrule">debug</span><span class="token punctuation">:</span>
        <span class="token key atrule">msg</span><span class="token punctuation">:</span> <span class="token string">&quot;主机名称是 {{ansible_hostname}}&quot;</span>
    <span class="token punctuation">-</span> <span class="token key atrule">debug</span><span class="token punctuation">:</span>
        <span class="token key atrule">var</span><span class="token punctuation">:</span> ansible_devices.sda.partitions.sda1.size
    <span class="token punctuation">-</span> <span class="token key atrule">debug</span><span class="token punctuation">:</span>
        <span class="token key atrule">msg</span><span class="token punctuation">:</span> <span class="token string">&quot;总内存大小 {{ansible_memtotal_mb}} MB&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-variables-部分" tabindex="-1"><a class="header-anchor" href="#_4-variables-部分" aria-hidden="true">#</a> 4）variables 部分</h2><p>Ansible支持十几种定义变量的方式 这里我们只介绍其中一部分变量，根据优先级排序</p><h4 id="inventory变量" tabindex="-1"><a class="header-anchor" href="#inventory变量" aria-hidden="true">#</a> Inventory变量</h4><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">[</span>test<span class="token punctuation">]</span>
CentOS7<span class="token punctuation">-</span>Node1 myvar1=&quot;hello&quot; myvar2=&quot;h.txt&quot; <span class="token comment"># 主机变量</span>
<span class="token punctuation">[</span>test<span class="token punctuation">:</span>vars<span class="token punctuation">]</span>
yourname=&quot;lzpeng&quot; <span class="token comment">#组变量</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="host-facts变量" tabindex="-1"><a class="header-anchor" href="#host-facts变量" aria-hidden="true">#</a> Host Facts变量</h4><p>无需定义直接在剧本中使用</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span> test
  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 使用 Facts 信息
      <span class="token key atrule">copy</span><span class="token punctuation">:</span>
        <span class="token key atrule">content</span><span class="token punctuation">:</span> <span class="token string">&quot;{{ansible_hostname}}: {{ansible_bios_version}}&quot;</span>
        <span class="token key atrule">dest</span><span class="token punctuation">:</span> /tmp/facts.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="register变量" tabindex="-1"><a class="header-anchor" href="#register变量" aria-hidden="true">#</a> Register变量</h4><p>register语句可以将某个命令的执行结果保存到变量中</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span> test
  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 保存变量
      <span class="token key atrule">shell</span><span class="token punctuation">:</span> hostname
      <span class="token key atrule">register</span><span class="token punctuation">:</span> myvar
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 打印变量
      <span class="token key atrule">debug</span><span class="token punctuation">:</span>
        <span class="token key atrule">var</span><span class="token punctuation">:</span> myvar.stdout
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="playbook变量" tabindex="-1"><a class="header-anchor" href="#playbook变量" aria-hidden="true">#</a> Playbook变量</h4><p>使用 vars 在 playbook 内定义变量</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span> test
  <span class="token key atrule">vars</span><span class="token punctuation">:</span> 
    <span class="token key atrule">iname</span><span class="token punctuation">:</span> lzpneg723
  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 打印变量
      <span class="token key atrule">debug</span><span class="token punctuation">:</span>
        <span class="token key atrule">var</span><span class="token punctuation">:</span> iname
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="playbook提示变量" tabindex="-1"><a class="header-anchor" href="#playbook提示变量" aria-hidden="true">#</a> Playbook提示变量</h3><p>根据提示输入变量的值</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span> test
  <span class="token key atrule">vars_prompt</span><span class="token punctuation">:</span> 
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> iname
      <span class="token key atrule">prompt</span><span class="token punctuation">:</span> 请输入用户名
      <span class="token key atrule">private</span><span class="token punctuation">:</span> no <span class="token comment"># 回显用户名</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> ipassword
      <span class="token key atrule">prompt</span><span class="token punctuation">:</span> 请输入密码
      <span class="token key atrule">private</span><span class="token punctuation">:</span> yes <span class="token comment"># 不显示密码</span>
  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 打印变量
      <span class="token key atrule">debug</span><span class="token punctuation">:</span>
        <span class="token key atrule">msg</span><span class="token punctuation">:</span> <span class="token string">&quot;用户名: {{iname}}, 密码: {{ipassword}}&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="变量文件" tabindex="-1"><a class="header-anchor" href="#变量文件" aria-hidden="true">#</a> 变量文件</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">iname</span><span class="token punctuation">:</span> lzpeng
<span class="token key atrule">ipassword</span><span class="token punctuation">:</span> <span class="token number">123456</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span> test
  <span class="token key atrule">vars_files</span><span class="token punctuation">:</span> variables.yml
  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 打印变量
      <span class="token key atrule">debug</span><span class="token punctuation">:</span>
        <span class="token key atrule">msg</span><span class="token punctuation">:</span> <span class="token string">&quot;用户名: {{iname}}, 密码: {{ipassword}}&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="命令行变量" tabindex="-1"><a class="header-anchor" href="#命令行变量" aria-hidden="true">#</a> 命令行变量</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span> test
  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 打印变量
      <span class="token key atrule">debug</span><span class="token punctuation">:</span>
        <span class="token key atrule">msg</span><span class="token punctuation">:</span> <span class="token string">&quot;用户名: {{iname}}, 密码: {{ipassword}}&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ansible-playbook command_var.yml <span class="token parameter variable">-e</span> <span class="token assign-left variable">iname</span><span class="token operator">=</span>lzpeng <span class="token assign-left variable">ipassword</span><span class="token operator">=</span><span class="token number">123456</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="firewalld-模块-配置防火墙策略" tabindex="-1"><a class="header-anchor" href="#firewalld-模块-配置防火墙策略" aria-hidden="true">#</a> firewalld 模块 配置防火墙策略</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span> test
  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 安装防火墙
      <span class="token key atrule">yum</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> firewalld
        <span class="token key atrule">state</span><span class="token punctuation">:</span> present
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 运行防火墙
      <span class="token key atrule">service</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> firewalld
        <span class="token key atrule">state</span><span class="token punctuation">:</span> started
        <span class="token key atrule">enabled</span><span class="token punctuation">:</span> yes
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 设置防火墙策略
      <span class="token key atrule">firewalld</span><span class="token punctuation">:</span>
        <span class="token key atrule">port</span><span class="token punctuation">:</span> 80/tcp
        <span class="token key atrule">permanent</span><span class="token punctuation">:</span> yes
        <span class="token key atrule">immediate</span><span class="token punctuation">:</span> yes
        <span class="token key atrule">state</span><span class="token punctuation">:</span> enabled
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="template-模块" tabindex="-1"><a class="header-anchor" href="#template-模块" aria-hidden="true">#</a> template 模块</h3>`,60),u=n("li",null,"copy模块 可以将一个文件拷贝给远程主机",-1),o=n("li",null,"但是如果希望每个拷贝的文件内容都不一样呢?",-1),d=n("li",null,"如何给所有web主机拷贝index.html内容是各自的IP地址",-1),r=n("li",null,"之前在playbook中调用变量，也是Jinja2的功能",-1),k=s(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> ~/ansible/template/index.html
Welcome to <span class="token punctuation">{</span><span class="token punctuation">{</span>ansible_hostname<span class="token punctuation">}</span><span class="token punctuation">}</span> on <span class="token punctuation">{</span><span class="token punctuation">{</span>ansible_ens33.ipv4.address<span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span> test
  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 安装防火墙
      <span class="token key atrule">template</span><span class="token punctuation">:</span>
        <span class="token key atrule">src</span><span class="token punctuation">:</span> ~/ansible/template/index.html
        <span class="token key atrule">dest</span><span class="token punctuation">:</span> ~/tmp/index.html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function v(m,b){return e(),t("div",null,[c,n("ul",null,[u,o,d,n("li",null,[l("Ansible 可以利用Jinja2模板引擎读取变量 "),n("ul",null,[r,n("li",null,'Jinja2模块的表达式包含在分隔符"'+p()+'"内',1)])])]),k])}const h=a(i,[["render",v],["__file","ansible-playbook.html.vue"]]);export{h as default};
