import{_ as t,r as i,o as c,c as o,b as e,d as s,e as n,w as l,a as d}from"./app-U2nchfLp.js";const u={},p=e("h1",{id:"docker-搭建-redis-cluster-集群环境",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#docker-搭建-redis-cluster-集群环境","aria-hidden":"true"},"#"),s(" Docker 搭建 Redis Cluster 集群环境")],-1),v={href:"https://zhuanlan.zhihu.com/p/216211089",target:"_blank",rel:"noopener noreferrer"},b=d(`<ul><li>下载 Redis 镜像（其实这步可以省略，因为创建容器时，如果本地镜像不存在，就会去远程拉取）；</li><li>编写 Redis 配置文件；</li><li>创建 Redis 容器；</li><li>创建 Redis Cluster 集群。</li></ul><h2 id="编写-redis-配置文件" tabindex="-1"><a class="header-anchor" href="#编写-redis-配置文件" aria-hidden="true">#</a> 编写 Redis 配置文件</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 创建目录
mkdir -p /usr/local/docker-redis/redis-cluster
# 切换至指定目录
cd /usr/local/docker-redis/redis-cluster
# 编写 redis-cluster.tmpl 文件
vi redis-cluster.tmpl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>redis-cluster.tmpl</code> 文件内容如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>port \${PORT}
requirepass 1234
masterauth 1234
protected-mode no
daemonize no
appendonly yes
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 15000
cluster-announce-ip 127.0.0.1
cluster-announce-port \${PORT}
cluster-announce-bus-port 1\${PORT}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>port：节点端口；</li><li>requirepass：添加访问认证；</li><li>masterauth：如果主节点开启了访问认证，从节点访问主节点需要认证；</li><li>protected-mode：保护模式，默认值 yes，即开启。开启保护模式以后，需配置 bind ip 或者设置访问密码；关闭保护模式，外部网络可以直接访问；</li><li>daemonize：是否以守护线程的方式启动（后台启动），默认 no；</li><li>appendonly：是否开启 AOF 持久化模式，默认 no；</li><li>cluster-enabled：是否开启集群模式，默认 no；</li><li>cluster-config-file：集群节点信息文件；</li><li>cluster-node-timeout：集群节点连接超时时间；</li><li>cluster-announce-ip：集群节点 IP，填写宿主机的 IP；</li><li>cluster-announce-port：集群节点映射端口；</li><li>cluster-announce-bus-port：集群节点总线端口</li></ul>`,6),m=e("div",{class:"custom-container tip"},[e("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[e("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[e("circle",{cx:"12",cy:"12",r:"9"}),e("path",{d:"M12 8h.01"}),e("path",{d:"M11 12h1v4h1"})])]),e("p",{class:"custom-container-title"},"TIP"),e("p",null,"每个 Redis 集群节点都需要打开两个 TCP 连接。一个用于为客户端提供服务的正常 Redis TCP 端口，例如 6379。还有一个基于 6379 端口加 10000 的端口，比如 16379。 第二个端口用于集群总线，这是一个使用二进制协议的节点到节点通信通道。节点使用集群总线进行故障检测、配置更新、故障转移授权等等。客户端永远不要尝试与集群总线端口通信，与正常的 Redis 命令端口通信即可，但是请确保防火墙中的这两个端口都已经打开，否则 Redis 集群节点将无法通信。")],-1),k=d(`<p>在 <code>/usr/local/docker-redis/redis-cluster</code> 目录下执行以下命令：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">for</span> <span class="token for-or-select variable">port</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">seq</span> <span class="token number">6371</span> <span class="token number">6376</span><span class="token variable">\`</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token punctuation">\\</span>
  <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token variable">\${port}</span>/conf <span class="token punctuation">\\</span>
  <span class="token operator">&amp;&amp;</span> <span class="token assign-left variable">PORT</span><span class="token operator">=</span><span class="token variable">\${port}</span> envsubst <span class="token operator">&lt;</span> redis-cluster.tmpl <span class="token operator">&gt;</span> <span class="token variable">\${port}</span>/conf/redis.conf <span class="token punctuation">\\</span>
  <span class="token operator">&amp;&amp;</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token variable">\${port}</span>/data<span class="token punctuation">;</span><span class="token punctuation">\\</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面两段 shell for 语句，意思就是循环创建 6371 ~ 6376 相关的目录及文件。</p><p>验证目录及文件是否创建成功</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>tree <span class="token builtin class-name">.</span>
<span class="token function">cat</span> /usr/local/docker-redis/redis-cluster/637<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">..</span><span class="token number">6</span><span class="token punctuation">}</span>/conf/redis.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建-redis-容器" tabindex="-1"><a class="header-anchor" href="#创建-redis-容器" aria-hidden="true">#</a> 创建 Redis 容器</h2><p>将宿主机的 6371 ~ 6376 之间的端口与 6 个 Redis 容器映射，并将宿主机的目录与容器内的目录进行映射（目录挂载）。记得指定网络模式，使用 host 网络模式</p><p>执行以下命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">for</span> <span class="token for-or-select variable">port</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">seq</span> <span class="token number">6371</span> <span class="token number">6376</span><span class="token variable">)</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token punctuation">\\</span>
  <span class="token function">docker</span> run <span class="token parameter variable">-di</span> <span class="token parameter variable">--restart</span> always <span class="token parameter variable">--name</span> redis-<span class="token variable">\${port}</span> <span class="token parameter variable">--net</span> <span class="token function">host</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> /usr/local/docker-redis/redis-cluster/<span class="token variable">\${port}</span>/conf/redis.conf:/usr/local/etc/redis/redis.conf <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> /usr/local/docker-redis/redis-cluster/<span class="token variable">\${port}</span>/data:/data <span class="token punctuation">\\</span>
  redis redis-server /usr/local/etc/redis/redis.conf<span class="token punctuation">;</span> <span class="token punctuation">\\</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行 <code>docker ps -n 6</code> 查看容器是否创建成功。</p><h2 id="创建-redis-cluster-集群" tabindex="-1"><a class="header-anchor" href="#创建-redis-cluster-集群" aria-hidden="true">#</a> 创建 Redis Cluster 集群</h2><p>随便进入一个容器节点，并进入 <code>/usr/local/bin/</code> 目录：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入容器</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> redis-6371 <span class="token function">bash</span>
<span class="token comment"># 切换至指定目录</span>
<span class="token builtin class-name">cd</span> /usr/local/bin/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来我们就可以通过以下命令实现 Redis Cluster 集群的创建。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>redis-cli <span class="token parameter variable">-a</span> <span class="token number">1234</span> <span class="token parameter variable">--cluster</span> create <span class="token number">127.0</span>.0.1:6371 <span class="token number">127.0</span>.0.1:6372 <span class="token number">127.0</span>.0.1:6373 <span class="token number">127.0</span>.0.1:6374 <span class="token number">127.0</span>.0.1:6375 <span class="token number">127.0</span>.0.1:6376 --cluster-replicas <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>出现选择提示信息，输入 yes.</p><p>集群创建成功如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@docker-desktop:/usr/local/bin# redis-cli -a 1234 --cluster create 127.0.0.1:6371 127.0.0.1:6372 127.0.0.1:6373 127.0.0.1:6374 127.0.0.1:6375 127.0.0.1:6376 --cluster-replicas 1
Warning: Using a password with &#39;-a&#39; or &#39;-u&#39; option on the command line interface may not be safe.
&gt;&gt;&gt; Performing hash slots allocation on 6 nodes...
Master[0] -&gt; Slots 0 - 5460
Master[1] -&gt; Slots 5461 - 10922
Master[2] -&gt; Slots 10923 - 16383
Adding replica 127.0.0.1:6375 to 127.0.0.1:6371
Adding replica 127.0.0.1:6376 to 127.0.0.1:6372
Adding replica 127.0.0.1:6374 to 127.0.0.1:6373
&gt;&gt;&gt; Trying to optimize slaves allocation for anti-affinity
[WARNING] Some slaves are in the same host as their master
M: f786c0520ca2bfe44edd7bc5ba6de0e41f3bfcf1 127.0.0.1:6371
   slots:[0-5460] (5461 slots) master
M: 0b92cb829db29b20a92c5673f877cfc8df74e321 127.0.0.1:6372
   slots:[5461-10922] (5462 slots) master
M: ed3832d22f8d898dafaa7f4ee5290bd7a6449a50 127.0.0.1:6373
   slots:[10923-16383] (5461 slots) master
S: 1a5b08d547a4ac5343ef85db50c3406ea051e36f 127.0.0.1:6374
   replicates f786c0520ca2bfe44edd7bc5ba6de0e41f3bfcf1
S: 4795ee8b1fe3db82c538391835de30680120fd65 127.0.0.1:6375
   replicates 0b92cb829db29b20a92c5673f877cfc8df74e321
S: 09af6ff673230f02cec5dc9ad5c255a5af2d7b8a 127.0.0.1:6376
   replicates ed3832d22f8d898dafaa7f4ee5290bd7a6449a50
Can I set the above configuration? (type &#39;yes&#39; to accept): yes
&gt;&gt;&gt; Nodes configuration updated
&gt;&gt;&gt; Assign a different config epoch to each node
&gt;&gt;&gt; Sending CLUSTER MEET messages to join the cluster
Waiting for the cluster to join
.....
&gt;&gt;&gt; Performing Cluster Check (using node 127.0.0.1:6371)
M: f786c0520ca2bfe44edd7bc5ba6de0e41f3bfcf1 127.0.0.1:6371
   slots:[0-5460] (5461 slots) master
   1 additional replica(s)
S: 4795ee8b1fe3db82c538391835de30680120fd65 127.0.0.1:6375
   slots: (0 slots) slave
   replicates 0b92cb829db29b20a92c5673f877cfc8df74e321
M: ed3832d22f8d898dafaa7f4ee5290bd7a6449a50 127.0.0.1:6373
   slots:[10923-16383] (5461 slots) master
   1 additional replica(s)
M: 0b92cb829db29b20a92c5673f877cfc8df74e321 127.0.0.1:6372
   slots:[5461-10922] (5462 slots) master
   1 additional replica(s)
S: 1a5b08d547a4ac5343ef85db50c3406ea051e36f 127.0.0.1:6374
   slots: (0 slots) slave
   replicates f786c0520ca2bfe44edd7bc5ba6de0e41f3bfcf1
S: 09af6ff673230f02cec5dc9ad5c255a5af2d7b8a 127.0.0.1:6376
   slots: (0 slots) slave
   replicates ed3832d22f8d898dafaa7f4ee5290bd7a6449a50
[OK] All nodes agree about slots configuration.
&gt;&gt;&gt; Check for open slots...
&gt;&gt;&gt; Check slots coverage...
[OK] All 16384 slots covered.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至此一个高可用的 Redis Cluster 集群搭建完成，如下图所示，该集群中包含 6 个 Redis 节点，3 主 3 从。三个主节点会分配槽，处理客户端的命令请求，而从节点可用在主节点故障后，顶替主节点。</p><h2 id="查看集群状态" tabindex="-1"><a class="header-anchor" href="#查看集群状态" aria-hidden="true">#</a> 查看集群状态</h2><p>我们先进入容器，然后通过一些集群常用的命令查看一下集群的状态。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 进入容器
docker exec -it redis-6371 bash
# 切换至指定目录
cd /usr/local/bin/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="检查集群状态" tabindex="-1"><a class="header-anchor" href="#检查集群状态" aria-hidden="true">#</a> 检查集群状态</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>redis-cli -a 1234 --cluster check 127.0.0.1:6375
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="查看集群信息和节点信息" tabindex="-1"><a class="header-anchor" href="#查看集群信息和节点信息" aria-hidden="true">#</a> 查看集群信息和节点信息</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 连接至集群某个节点
redis-cli -c -a 1234 -h 127.0.0.1 -p 6376
# 查看集群信息
cluster info
# 查看集群结点信息
cluster nodes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="set-get" tabindex="-1"><a class="header-anchor" href="#set-get" aria-hidden="true">#</a> SET/GET</h3><p>在 6371 节点中执行写入和读取，命令如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 进入容器并连接至集群某个节点
docker exec -it redis-6371 /usr/local/bin/redis-cli -c -a 1234 -h 127.0.0.1 -p 6371
# 写入数据
set name mrhelloworld
set aaa 111
set bbb 222
# 读取数据
get name
get aaa
get bbb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回结果如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>127.0.0.1:6371&gt; set name mrhelloworld
-&gt; Redirected to slot [5798] located at 127.0.0.1:6372
OK
127.0.0.1:6372&gt; set aaa 111
OK
127.0.0.1:6372&gt; set bbb 222
-&gt; Redirected to slot [5287] located at 127.0.0.1:6371
OK
127.0.0.1:6371&gt; get name
-&gt; Redirected to slot [5798] located at 127.0.0.1:6372
&quot;mrhelloworld&quot;
127.0.0.1:6372&gt; get aaa
&quot;111&quot;
127.0.0.1:6372&gt; get bbb
-&gt; Redirected to slot [5287] located at 127.0.0.1:6371
&quot;222&quot;
127.0.0.1:6371&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>别着急，让我来解释一下详细操作过程：</p><p>首先进入容器并连接至集群某个节点； 然后执行第一个 set 命令 <code>set name mrhelloworld</code>，name 键根据哈希函数运算以后得到的值为 [5798]。当前集群环境的槽分配情况为：[0-5460] 6371节点，[5461-10922] 6374节点，[10923-16383] 6372节点，所以该键的存储就被分配到了 6374 节点上； 再来看第二个 set 命令 <code>set aaa</code>，这里大家可能会有一些疑问，为什么看不到 aaa 键根据哈希函数运算以后得到的值？因为刚才重定向至 6374 节点插入了数据，此时如果还有数据插入，正好键根据哈希函数运算以后得到的值也还在该节点的范围内，那么直接插入数据即可； 接着是第三个 set 命令 <code>set bbb</code>，bbb 键根据哈希函数运算以后得到的值为 [5287]，所以该键的存储就被分配到了 6371 节点上； 然后是读取操作，第四个命令 <code>get name</code>，name 键根据哈希函数运算以后得到的值为 [5798]，被重定向至 6374 节点读取； 第五个命令 <code>get aaa</code>，aaa 键根据哈希函数运算以后得到的值也在 6374 节点，直接读取； 第六个命令 <code>get bbb</code>，bbb 键根据哈希函数运算以后得到的值为 [5287]，被重定向至 6371 节点读取。 通过以上操作我们得知 name 键的存储被分配到了 6374 节点，如果直接连接 6374 节点并获取该值会怎么样？没错，不需要重定向节点，因为数据就在该节点，所以直接读取返回。</p><h2 id="客户端连接" tabindex="-1"><a class="header-anchor" href="#客户端连接" aria-hidden="true">#</a> 客户端连接</h2><p>最后来一波客户端连接操作，随便哪个节点，看看可否通过外部访问 Redis Cluster 集群。</p><p>至此使用多机环境多个容器搭建 Redis Cluster 集群环境就到这里，其实整体搭建过程不算特别麻烦，因为：</p><ul><li>创建 Redis 集群需要用到 Ruby，否则就得自己关联节点构建集群，自己分配槽；</li><li>如果使用 Ruby 构建 Redis 集群，就需要安装 Ruby 环境；</li><li>而 Redis 从 5 版本开始可以直接使用 redis-cli 命令创建集群了，就省去了很多麻烦事；</li><li>我们还使用了 shell for 循环语句简化了构建过程，否则那些语句一条条执行也够你闹心的。</li></ul><p>综上所述，有没有更简单的办法呢？当然有了，不然我在这跟你卖什么关子。</p>`,38);function h(g,f){const r=i("ExternalLinkIcon"),a=i("RouterLink");return c(),o("div",null,[p,e("p",null,[s("参考"),e("a",v,[s("Docker 搭建 Redis Cluster 集群环境"),n(r)]),s("，整体搭建步骤主要分为以下几步：")]),b,m,k,e("p",null,[s("Docker Compose 就可以解决这个问题。后面我们先学习一下"),n(a,{to:"/blogs/Docker/docker-compose.html"},{default:l(()=>[s("什么是 Docker Compose")]),_:1}),s("，然后"),n(a,{to:"/blogs/Docker/docker-compose-redis-cluster.html"},{default:l(()=>[s("使用 Docker Compose 再来搭建一遍 Redis Cluster 集群环境")]),_:1}),s("，感受感受这前后的区别。")])])}const R=t(u,[["render",h],["__file","docker-redis-cluster.html.vue"]]);export{R as default};
