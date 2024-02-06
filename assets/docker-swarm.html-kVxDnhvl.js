import{_ as d,r as s,o as c,c as l,b as e,d as n,e as t,w as o,a as r}from"./app-U2nchfLp.js";const u={},v=e("h1",{id:"docker-swarm",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#docker-swarm","aria-hidden":"true"},"#"),n(" Docker Swarm")],-1),m={href:"https://docs.docker.com/engine/swarm/",target:"_blank",rel:"noopener noreferrer"},p=e("p",null,[n("从 Docker 1.12.0 版本开始，Docker Swarm 已经包含在 Docker 引擎中（"),e("code",null,"docker swarm"),n("），并且已经内置了服务发现工具，我们就不需要像之前一样，再配置 Etcd 或者 Consul 来进行服务发现配置了。")],-1),k=e("div",{class:"custom-container tip"},[e("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[e("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[e("circle",{cx:"12",cy:"12",r:"9"}),e("path",{d:"M12 8h.01"}),e("path",{d:"M11 12h1v4h1"})])]),e("p",{class:"custom-container-title"},"TIP"),e("p",null,"注： 若是winows系统，本章节命令必须在管理员下运行")],-1),h=e("h2",{id:"_1-docker-machine-创建-docker-主机",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-docker-machine-创建-docker-主机","aria-hidden":"true"},"#"),n(" 1. Docker Machine 创建 Docker 主机")],-1),g=e("p",null,"在进行 Docker Swarm 配置之前，我们还需要说下 Docker 另外一个官方工具 Docker Machine，其作用就是快速帮助我们搭建 Docker 主机环境，比如我们要使用 Docker Swarm，就必须有很多的 Docker 主机来进行操作，Docker Machine 就是最理想的工具。",-1),b=r(`<p>我们先使用 Docker Machine 创建四个 Docker 主机，命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker-machine create --driver hyperv --hyperv-virtual-switch=docker manager1 &amp;&amp; \\
docker-machine create --driver hyperv --hyperv-virtual-switch=docker manager2 &amp;&amp; \\
docker-machine create --driver hyperv --hyperv-virtual-switch=docker worker1 &amp;&amp; \\
docker-machine create --driver hyperv --hyperv-virtual-switch=docker worker2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行上面命令，你会发现速度巨慢（如上），原因是从 GitHub 上下载一个<code>boot2docker.iso</code>文件（国内网络没办法），怎么解决呢？很简单，我们使用翻X的浏览器手动下载<code>boot2docker.iso</code>文件，然后拷贝到对应目录下（我电脑的目录<code>C:/Users/ThinkPad/.docker/machine/cache</code>），然后再执行上面的命令，发现速度快的一批。</p><p>我们可以查看下创建的 Docker 主机信息，命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker-machine ls
NAME       ACTIVE   DRIVER   STATE     URL                       SWARM   DOCKER      ERRORS
manager1   -        hyperv   Running   tcp://192.168.1.10:2376           v19.03.12
manager2   -        hyperv   Running   tcp://192.168.1.11:2376           v19.03.12
worker1    -        hyperv   Running   tcp://192.168.1.12:2376           v19.03.12
worker2    -        hyperv   Running   tcp://192.168.1.13:2376           v19.03.12
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，我们创建了四个 Docker 主机（两个 Manager 和两个 Worker），我们还可以连接到任何一台服务器进行操作，命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker-machine ssh manager1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="可能遇到的问题" tabindex="-1"><a class="header-anchor" href="#可能遇到的问题" aria-hidden="true">#</a> 可能遇到的问题</h3><h4 id="卡在-waiting-for-ssh-to-be-available" tabindex="-1"><a class="header-anchor" href="#卡在-waiting-for-ssh-to-be-available" aria-hidden="true">#</a> 卡在 Waiting for SSH to be available...</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Running pre-create checks...
(manager1) Unable to get the latest Boot2Docker ISO release version:  Get https://api.github.com/repos/boot2docker/boot2docker/releases/latest: dial tcp: lookup api.github.com: no such host
Creating machine...
(manager1) Unable to get the latest Boot2Docker ISO release version:  Get https://api.github.com/repos/boot2docker/boot2docker/releases/latest: dial tcp: lookup api.github.com: no such host
(manager1) Copying D:\\wsl2\\docker\\vm\\cache\\boot2docker.iso to D:\\wsl2\\docker\\vm\\machines\\manager1\\boot2docker.iso...
(manager1) Creating SSH key...
(manager1) Creating VM...
(manager1) Using switch &quot;docker&quot;
(manager1) Creating VHD
(manager1) Starting VM...
(manager1) Waiting for host to start...
Waiting for machine to be running, this may take a few minutes...
Detecting operating system of created instance...
Waiting for SSH to be available...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),x={href:"https://stackoverflow.com/questions/56792664/docker-desktop-windows-10-waiting-for-ssh-to-be-available-certificate-signe",target:"_blank",rel:"noopener noreferrer"},y=e("code",null,"--native-ssh",-1),w=r(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker-machine --native-ssh create --driver hyperv --hyperv-virtual-switch=docker manager1 &amp;&amp; \\
docker-machine --native-ssh create --driver hyperv --hyperv-virtual-switch=docker manager2 &amp;&amp; \\
docker-machine --native-ssh create --driver hyperv --hyperv-virtual-switch=docker worker1 &amp;&amp; \\
docker-machine --native-ssh create --driver hyperv --hyperv-virtual-switch=docker worker2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-docker-swarm-配置集群节点" tabindex="-1"><a class="header-anchor" href="#_2-docker-swarm-配置集群节点" aria-hidden="true">#</a> 2. Docker Swarm 配置集群节点</h2><p>我们执行下面命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ docker-machine ssh manager1 &quot;docker swarm init --advertise-addr 192.168.1.10&quot;
Swarm initialized: current node (c6kj4t51l0nzoq3u29pqxiuv6) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-5irhzlufi8nmuj26f61wkuobo46t20uja1igmkbe1rsc9g1c9w-1ucldja96grjps4rxkevrwghb 192.168.1.10:2377

To add a manager to this swarm, run &#39;docker swarm join-token manager&#39; and follow the instructions.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面是在manager1主机上，创建一个 Docker Swarm 管理节点（初始化集群的时候，会自动把当前节点设置为管理节点）。</p><p>接着，我们在worker1和worker2主机上，创建两个工作节点，并加入到集群中，命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ docker-machine ssh worker1 &quot;docker swarm join --token SWMTKN-1-5irhzlufi8nmuj26f61wkuobo46t20uja1igmkbe1rsc9g1c9w-1ucldja96grjps4rxkevrwghb 192.168.1.10:2377&quot;
This node joined a swarm as a worker.

$ docker-machine ssh worker2 &quot;docker swarm join --token SWMTKN-1-5irhzlufi8nmuj26f61wkuobo46t20uja1igmkbe1rsc9g1c9w-1ucldja96grjps4rxkevrwghb 192.168.1.10:2377&quot;
This node joined a swarm as a worker.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还有另外一个manager2主机，需要配置为管理节点，我们需要先在manager1主机上，获取管理节点对应的token，然后再配置为管理节点，命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ docker-machine ssh manager1 &quot;docker swarm join-token manager&quot;
To add a manager to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-5irhzlufi8nmuj26f61wkuobo46t20uja1igmkbe1rsc9g1c9w-6y84dxjfk3oo38honys4sjmbr 192.168.1.10:2377

$ docker-machine ssh manager2 &quot;docker swarm join --token SWMTKN-1-5irhzlufi8nmuj26f61wkuobo46t20uja1igmkbe1rsc9g1c9w-6y84dxjfk3oo38honys4sjmbr 192.168.1.10:2377&quot;
This node joined a swarm as a manager.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置好之后，我们进入manager1主机内（上面的命令也可以在主机内执行），然后查看集群节点的信息，命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ docker-machine ssh manager1 &quot;docker node ls&quot;
ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
c6kj4t51l0nzoq3u29pqxiuv6 *   manager1            Ready               Active              Leader              19.03.12
aynl204ef7bwv8dwmaqfjhh12     manager2            Ready               Active              Reachable           19.03.12
zi0z09j4mm9ny727i8btqfh92     worker1             Ready               Active                                  19.03.12
j44vqncnpt8ztw4z379zgw5a5     worker2             Ready               Active                                  19.03.12
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Leader表示当然集群的头，Reachable可以理解为头的候选人，头一挂掉它就顶上去了。</p><p>需要注意的是，我当天配置好之后，把所有的 Docker 主机都stop了，然后隔天重新start之后，出现了下面问题：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker node ls
Error response from daemon: rpc error: code = Unknown desc = The swarm does not have a leader. It&#39;s possible that too few managers are online. Make sure more than half of the managers are online.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,14),_={href:"https://q.cnblogs.com/q/96996/",target:"_blank",rel:"noopener noreferrer"},f=r(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ docker swarm init --force-new-cluster
Error response from daemon: could not choose an IP address to advertise since this system has multiple addresses on different interfaces (10.0.2.15 on eth0 and 192.168.1.10 on eth1) - specify one with --advertise-addr
$ docker swarm init --force-new-cluster --advertise-addr 192.168.1.10
Error response from daemon: This node is not a swarm manager. Worker nodes can&#39;t be used to view or modify cluster state. Please run this command on a manager node or promote the current node to a manager.
$ docker node ls
# 卡死
$ docker-machine restart manager1 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启不了，一直转圈 没办法，后来我只能删掉四个 Docker 主机，重新进行创建了。</p><h2 id="_3-docker-service-部署单个集群服务" tabindex="-1"><a class="header-anchor" href="#_3-docker-service-部署单个集群服务" aria-hidden="true">#</a> 3. Docker Service 部署单个集群服务</h2>`,3),D=e("code",null,"docker service create",-1),S={href:"https://docs.docker.com/engine/reference/commandline/service_create/",target:"_blank",rel:"noopener noreferrer"},R=r(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker service create --replicas 4 -p 8088:80 --name nginx nginx:alpine
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>需要注意的是，<code>--replicas 4</code>表示创建服务的实例个数（默认是一个），啥意思？比如4，就是在四个 Docker 主机上，分别创建一个nginx服务，如果是3，那就是三个 Docker 主机，或者你可以理解为 Docker 主机的个数，另外，REPLICAS会有进度显示，并且执行是异步的。</p><p>我们也可以手动设置实例个数，命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ docker service scale nginx=4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>部署好服务后，我们就可以进行查看了，命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ docker service ls
ID                  NAME                MODE                REPLICAS            ID                  NAME                MODE                REPLICAS            IMAGE               PORTS
ucymevu7jvds        nginx               replicated          4/4                 nginx:alpine        *:8088-&gt;80/tcp

$ docker service ps nginx
ID                  NAME                IMAGE               NODE                DESIRED STATE       CURRENT STATE           ERROR               PORTS
wikk1lrjvb62        nginx.1             nginx:alpine        manager1            Running             Running 2 minutes ago
54a8tgw3q47y        nginx.2             nginx:alpine        worker1             Running             Running 2 minutes ago
eu4yk2n33zm4        nginx.3             nginx:alpine        worker2             Running             Running 2 minutes ago
8bdu0zwut54q        nginx.4             nginx:alpine        manager2            Running             Running 2 minutes ago
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),j={href:"http://192.168.1.10:8088/",target:"_blank",rel:"noopener noreferrer"},E=r(`<h2 id="_4-集散集群" tabindex="-1"><a class="header-anchor" href="#_4-集散集群" aria-hidden="true">#</a> 4. 集散集群</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker swarm leave --force
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5-docker-stack-部署多个集群服务-以及-gui-管理页面" tabindex="-1"><a class="header-anchor" href="#_5-docker-stack-部署多个集群服务-以及-gui-管理页面" aria-hidden="true">#</a> 5. Docker Stack 部署多个集群服务，以及 GUI 管理页面</h2><p>docker service部署的是单个服务，我们可以使用<code>docker stack</code>进行多服务编排部署，使用的同样是<code>docker-compose.yml</code>配置文件，示例：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&quot;3&quot;</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">nginx</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>latest
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 8088<span class="token punctuation">:</span><span class="token number">80</span>
    <span class="token key atrule">deploy</span><span class="token punctuation">:</span>
      <span class="token key atrule">mode</span><span class="token punctuation">:</span> replicated
      <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">4</span>

  <span class="token key atrule">visualizer</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> dockersamples/visualizer<span class="token punctuation">:</span>latest
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;8080:8080&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;/var/run/docker.sock:/var/run/docker.sock&quot;</span>
    <span class="token key atrule">deploy</span><span class="token punctuation">:</span>
      <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
      <span class="token key atrule">placement</span><span class="token punctuation">:</span>
        <span class="token key atrule">constraints</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>node.role == manager<span class="token punctuation">]</span>

  <span class="token key atrule">portainer</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> portainer/portainer<span class="token punctuation">:</span>latest
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;9000:9000&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;/var/run/docker.sock:/var/run/docker.sock&quot;</span>
    <span class="token key atrule">deploy</span><span class="token punctuation">:</span>
      <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
      <span class="token key atrule">placement</span><span class="token punctuation">:</span>
        <span class="token key atrule">constraints</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>node.role == manager<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),q={href:"https://github.com/dockersamples/docker-swarm-visualizer",target:"_blank",rel:"noopener noreferrer"},T={href:"https://portainer.io/",target:"_blank",rel:"noopener noreferrer"},I=r(`<p>部署命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ docker stack deploy -c docker-compose.yml deploy-demo
Creating service deploy-demo_nginx
Creating service deploy-demo_visualizer
Creating service deploy-demo_portainer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>部署成功之后，我们可以查看具体详情，命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ docker stack ls
NAME                SERVICES
deploy-demo         3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),M=e("code",null,"visualizer",-1),A={href:"http://192.168.1.10:8080/",target:"_blank",rel:"noopener noreferrer"},z=e("code",null,"portainer",-1),C={href:"http://192.168.1.10:9000/",target:"_blank",rel:"noopener noreferrer"},N=r('<p>可以看到，<code>portainer</code>比<code>visualizer</code>强大太多了，甚至我们所有的操作都可以在<code>portainer</code>上完成。</p><h2 id="_6-docker-machine、docker-swarm、docker-node、docker-service-和-docker-stack-常用命令" tabindex="-1"><a class="header-anchor" href="#_6-docker-machine、docker-swarm、docker-node、docker-service-和-docker-stack-常用命令" aria-hidden="true">#</a> 6. docker-machine、docker swarm、docker node、docker service 和 docker stack 常用命令</h2><h3 id="docker-machine-常用命令" tabindex="-1"><a class="header-anchor" href="#docker-machine-常用命令" aria-hidden="true">#</a> docker-machine 常用命令</h3><table><thead><tr><th style="text-align:center;">命令</th><th style="text-align:center;">说明</th></tr></thead><tbody><tr><td style="text-align:center;">docker-machine create</td><td style="text-align:center;">创建一个 Docker 主机（常用<code>-d virtualbox</code>）</td></tr><tr><td style="text-align:center;">docker-machine ls</td><td style="text-align:center;">查看所有的 Docker 主机</td></tr><tr><td style="text-align:center;">docker-machine ssh</td><td style="text-align:center;">SSH 到主机上执行命令</td></tr><tr><td style="text-align:center;">docker-machine env</td><td style="text-align:center;">显示连接到某个主机需要的环境变量</td></tr><tr><td style="text-align:center;">docker-machine inspect</td><td style="text-align:center;">输出主机更多信息</td></tr><tr><td style="text-align:center;">docker-machine kill</td><td style="text-align:center;">停止某个主机</td></tr><tr><td style="text-align:center;">docker-machine restart</td><td style="text-align:center;">重启某台主机</td></tr><tr><td style="text-align:center;">docker-machine rm</td><td style="text-align:center;">删除某台主机</td></tr><tr><td style="text-align:center;">docker-machine scp</td><td style="text-align:center;">在主机之间复制文件</td></tr><tr><td style="text-align:center;">docker-machine start</td><td style="text-align:center;">启动一个主机</td></tr><tr><td style="text-align:center;">docker-machine status</td><td style="text-align:center;">查看主机状态</td></tr><tr><td style="text-align:center;">docker-machine stop</td><td style="text-align:center;">停止一个主机</td></tr></tbody></table><h3 id="docker-swarm-常用命令" tabindex="-1"><a class="header-anchor" href="#docker-swarm-常用命令" aria-hidden="true">#</a> docker swarm 常用命令</h3><table><thead><tr><th style="text-align:center;">命令</th><th style="text-align:center;">说明</th></tr></thead><tbody><tr><td style="text-align:center;">docker swarm init</td><td style="text-align:center;">初始化集群</td></tr><tr><td style="text-align:center;">docker swarm join-token worker</td><td style="text-align:center;">查看工作节点的 token</td></tr><tr><td style="text-align:center;">docker swarm join-token manager</td><td style="text-align:center;">查看管理节点的 token</td></tr><tr><td style="text-align:center;">docker swarm join</td><td style="text-align:center;">加入集群中</td></tr></tbody></table><h3 id="docker-node-常用命令" tabindex="-1"><a class="header-anchor" href="#docker-node-常用命令" aria-hidden="true">#</a> docker node 常用命令</h3><table><thead><tr><th style="text-align:center;">命令</th><th style="text-align:center;">说明</th></tr></thead><tbody><tr><td style="text-align:center;">docker node ls</td><td style="text-align:center;">查看所有集群节点</td></tr><tr><td style="text-align:center;">docker node rm</td><td style="text-align:center;">删除某个节点（<code>-f</code>强制删除）</td></tr><tr><td style="text-align:center;">docker node inspect</td><td style="text-align:center;">查看节点详情</td></tr><tr><td style="text-align:center;">docker node demote</td><td style="text-align:center;">节点降级，由管理节点降级为工作节点</td></tr><tr><td style="text-align:center;">docker node promote</td><td style="text-align:center;">节点升级，由工作节点升级为管理节点</td></tr><tr><td style="text-align:center;">docker node update</td><td style="text-align:center;">更新节点</td></tr><tr><td style="text-align:center;">docker node ps</td><td style="text-align:center;">查看节点中的 Task 任务</td></tr></tbody></table><h3 id="docker-service-常用命令" tabindex="-1"><a class="header-anchor" href="#docker-service-常用命令" aria-hidden="true">#</a> docker service 常用命令</h3><table><thead><tr><th style="text-align:center;">命令</th><th style="text-align:center;">说明</th></tr></thead><tbody><tr><td style="text-align:center;">docker service create</td><td style="text-align:center;">部署服务</td></tr><tr><td style="text-align:center;">docker service inspect</td><td style="text-align:center;">查看服务详情</td></tr><tr><td style="text-align:center;">docker service logs</td><td style="text-align:center;">产看某个服务日志</td></tr><tr><td style="text-align:center;">docker service ls</td><td style="text-align:center;">查看所有服务详情</td></tr><tr><td style="text-align:center;">docker service rm</td><td style="text-align:center;">删除某个服务（<code>-f</code>强制删除）</td></tr><tr><td style="text-align:center;">docker service scale</td><td style="text-align:center;">设置某个服务个数</td></tr><tr><td style="text-align:center;">docker service update</td><td style="text-align:center;">更新某个服务</td></tr></tbody></table><h3 id="docker-stack-常用命令" tabindex="-1"><a class="header-anchor" href="#docker-stack-常用命令" aria-hidden="true">#</a> docker stack 常用命令</h3><table><thead><tr><th style="text-align:center;">命令</th><th style="text-align:center;">说明</th></tr></thead><tbody><tr><td style="text-align:center;">docker stack deploy</td><td style="text-align:center;">部署新的堆栈或更新现有堆栈</td></tr><tr><td style="text-align:center;">docker stack ls</td><td style="text-align:center;">列出现有堆栈</td></tr><tr><td style="text-align:center;">docker stack ps</td><td style="text-align:center;">列出堆栈中的任务</td></tr><tr><td style="text-align:center;">docker stack rm</td><td style="text-align:center;">删除堆栈</td></tr><tr><td style="text-align:center;">docker stack services</td><td style="text-align:center;">列出堆栈中的服务</td></tr><tr><td style="text-align:center;">docker stack down</td><td style="text-align:center;">移除某个堆栈（不会删除数据）</td></tr></tbody></table>',12);function $(O,U){const a=s("ExternalLinkIcon"),i=s("RouterLink");return c(),l("div",null,[v,e("p",null,[e("a",m,[n("Docker Swarm"),t(a)]),n(" 和 Docker Compose 一样，都是 Docker 官方容器编排项目，但不同的是，Docker Compose 是一个在单个服务器或主机上创建多个容器的工具，而 Docker Swarm 则可以在多个服务器或主机上创建容器集群服务，对于微服务的部署，显然 Docker Swarm 会更加适合。")]),p,k,h,g,e("p",null,[n("首先进行"),t(i,{to:"/blogs/Docker/docker-machine.html"},{default:o(()=>[n("安装 Docker Machine")]),_:1}),n("。")]),b,e("p",null,[n("解决方案见"),e("a",x,[n("StackOverflow"),t(a)]),n(" 只需要在创建虚拟机时增加参数"),y]),w,e("p",null,[n("好像是集群节点丢失了头，相关问题："),e("a",_,[n('如何处理 docker swarm 集群"The swarm does not have a leader"问题'),t(a)]),n("，按照文章进行解决：")]),f,e("p",null,[n("上面比较啰嗦，我们接下来正式部署集群服务，拿nginx镜像做为示例，命令（"),D,n("命令"),e("a",S,[n("详细说明"),t(a)]),n("）:")]),R,e("p",null,[n("我们任意使用四个 Docker 主机中的一个 IP 地址，浏览器打开："),e("a",j,[n("http://192.168.1.10:8088/"),t(a)]),n(",即可看到nginx服务正在运行")]),E,e("p",null,[n("如上所示，我们总共需要部署三个服务，出了nginx服务作为示例之外，visualizer（"),e("a",q,[n("官方地址"),t(a)]),n("）和portainer（"),e("a",T,[n("官方地址"),t(a)]),n("）都是集群 GUI 管理服务。")]),I,e("p",null,[n("查看"),M,n(" GUI 集群管理，浏览器打开："),e("a",A,[n("http://192.168.1.10:8080/"),t(a)]),n(" 查看"),z,n(" GUI 集群管理，需要先配置账号信息，浏览器打开："),e("a",C,[n("http://192.168.1.1:9000/"),t(a)])]),N])}const V=d(u,[["render",$],["__file","docker-swarm.html.vue"]]);export{V as default};
