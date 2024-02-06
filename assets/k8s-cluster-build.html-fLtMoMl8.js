import{_ as l,r as t,o as r,c as d,b as n,d as e,e as a,a as i}from"./app-rBywrD27.js";const c="/assets/image-20200404094800622-rZbvChvE.png",o="/assets/image-20210609000002940-yubcgy5d.png",p={},u={href:"https://gitee.com/yooome/golang/blob/main/k8s%E8%AF%A6%E7%BB%86%E6%95%99%E7%A8%8B/Kubernetes%E8%AF%A6%E7%BB%86%E6%95%99%E7%A8%8B.md#2-kubernetes%E9%9B%86%E7%BE%A4%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA",target:"_blank",rel:"noopener noreferrer"},b={href:"https://www.bilibili.com/video/BV1Qv41167ck?p=5",target:"_blank",rel:"noopener noreferrer"},m=i('<h1 id="_2-kubernetes集群环境搭建" tabindex="-1"><a class="header-anchor" href="#_2-kubernetes集群环境搭建" aria-hidden="true">#</a> 2. kubernetes集群环境搭建</h1><h2 id="_2-1-前置知识点" tabindex="-1"><a class="header-anchor" href="#_2-1-前置知识点" aria-hidden="true">#</a> 2.1 前置知识点</h2><p>目前生产部署Kubernetes 集群主要有两种方式：</p><p><strong>kubeadm</strong></p><p>Kubeadm 是一个K8s 部署工具，提供<code>kubeadm init</code> 和<code>kubeadm join</code>，用于快速部署Kubernetes 集群。</p>',5),v={href:"https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm/",target:"_blank",rel:"noopener noreferrer"},k=i('<p><strong>二进制包</strong></p><p>从github 下载发行版的二进制包，手动部署每个组件，组成Kubernetes 集群。</p><p>Kubeadm 降低部署门槛，但屏蔽了很多细节，遇到问题很难排查。如果想更容易可控，推荐使用二进制包部署Kubernetes 集群，虽然手动部署麻烦点，期间可以学习很多工作原理，也利于后期维护。</p><p><img src="'+c+'" alt="image-20200404094800622"></p><h2 id="_2-2-kubeadm-部署方式介绍" tabindex="-1"><a class="header-anchor" href="#_2-2-kubeadm-部署方式介绍" aria-hidden="true">#</a> 2.2 kubeadm 部署方式介绍</h2><p>kubeadm 是官方社区推出的一个用于快速部署kubernetes 集群的工具，这个工具能通过两条指令完成一个kubernetes 集群的部署：</p><ul><li>创建一个Master 节点<code>kubeadm init</code></li><li>将Node 节点加入到当前集群中<code>kubeadm join &lt;Master 节点的IP 和端口&gt;</code></li></ul><h2 id="_2-3-安装要求" tabindex="-1"><a class="header-anchor" href="#_2-3-安装要求" aria-hidden="true">#</a> 2.3 安装要求</h2><p>在开始之前，部署Kubernetes 集群机器需要满足以下几个条件：</p><ul><li>一台或多台机器，操作系统CentOS7.x-86_x64</li><li>硬件配置：2GB 或更多RAM，2 个CPU 或更多CPU，硬盘30GB 或更多</li><li>集群中所有机器之间网络互通</li><li>可以访问外网，需要拉取镜像</li><li>禁止swap 分区</li></ul><h2 id="_2-4-最终目标" tabindex="-1"><a class="header-anchor" href="#_2-4-最终目标" aria-hidden="true">#</a> 2.4 最终目标</h2><ul><li>在所有节点上安装 Docker 和 kubeadm</li><li>部署 Kubernetes Master</li><li>部署容器网络插件</li><li>部署 Kubernetes Node，将节点加入Kubernetes 集群中</li><li>部署 Dashboard Web 页面，可视化查看Kubernetes 资源</li></ul><h2 id="_2-5-准备环境" tabindex="-1"><a class="header-anchor" href="#_2-5-准备环境" aria-hidden="true">#</a> 2.5 准备环境</h2><p><img src="'+o+`" alt="image-20210609000002940"></p><table><thead><tr><th style="text-align:left;">角色</th><th style="text-align:left;">IP地址</th><th style="text-align:left;">组件</th></tr></thead><tbody><tr><td style="text-align:left;">CentOS7-Node1</td><td style="text-align:left;">192.168.85.131</td><td style="text-align:left;">docker，kubectl，kubeadm，kubelet</td></tr><tr><td style="text-align:left;">CentOS7-Node2</td><td style="text-align:left;">192.168.85.132</td><td style="text-align:left;">docker，kubectl，kubeadm，kubelet</td></tr><tr><td style="text-align:left;">CentOS7-Node3</td><td style="text-align:left;">192.168.85.133</td><td style="text-align:left;">docker，kubectl，kubeadm，kubelet</td></tr><tr><td style="text-align:left;">CentOS7-Node4</td><td style="text-align:left;">192.168.85.134</td><td style="text-align:left;">docker，kubectl，kubeadm，kubelet</td></tr><tr><td style="text-align:left;">CentOS7-Node5</td><td style="text-align:left;">192.168.85.135</td><td style="text-align:left;">docker，kubectl，kubeadm，kubelet</td></tr></tbody></table><h2 id="_2-6-环境初始化" tabindex="-1"><a class="header-anchor" href="#_2-6-环境初始化" aria-hidden="true">#</a> 2.6 环境初始化</h2><h3 id="_2-6-1-检查操作系统的版本" tabindex="-1"><a class="header-anchor" href="#_2-6-1-检查操作系统的版本" aria-hidden="true">#</a> 2.6.1 检查操作系统的版本</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 此方式下安装kubernetes集群要求Centos版本要在7.5或之上</span>
<span class="token function">cat</span> /etc/redhat-release
CentOS Linux release <span class="token number">7.9</span>.2009 <span class="token punctuation">(</span>Core<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-6-2-主机名解析" tabindex="-1"><a class="header-anchor" href="#_2-6-2-主机名解析" aria-hidden="true">#</a> 2.6.2 主机名解析</h3><p>为了方便集群节点间的直接调用，在这个配置一下主机名解析，企业中推荐使用内部DNS服务器</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 主机名成解析 编所使用台服务器的/etc/hosts文件，添加下面内容</span>
<span class="token number">192.168</span>.85.130 CentOS7-Node0
<span class="token number">192.168</span>.85.131 CentOS7-Node1
<span class="token number">192.168</span>.85.132 CentOS7-Node2
<span class="token number">192.168</span>.85.133 CentOS7-Node3
<span class="token number">192.168</span>.85.134 CentOS7-Node4
<span class="token number">192.168</span>.85.135 CentOS7-Node5
<span class="token number">192.168</span>.85.136 CentOS7-Node6
<span class="token number">192.168</span>.85.137 CentOS7-Node7
<span class="token number">192.168</span>.85.138 CentOS7-Node8
<span class="token number">192.168</span>.85.139 CentOS7-Node9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-6-3-时间同步" tabindex="-1"><a class="header-anchor" href="#_2-6-3-时间同步" aria-hidden="true">#</a> 2.6.3 时间同步</h3><p>kubernetes要求集群中的节点时间必须精确一直，这里使用chronyd服务从网络同步时间</p><p>企业中建议配置内部的时间同步服务器</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动chronyd服务</span>
systemctl start chronyd
systemctl <span class="token builtin class-name">enable</span> chronyd
<span class="token function">date</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-6-4-禁用-iptable-和-firewalld-服务" tabindex="-1"><a class="header-anchor" href="#_2-6-4-禁用-iptable-和-firewalld-服务" aria-hidden="true">#</a> 2.6.4 禁用 iptable 和 firewalld 服务</h3><p>kubernetes和docker 在运行的中会产生大量的iptables规则，为了不让系统规则跟它们混淆，直接关闭系统的规则</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1 关闭firewalld服务</span>
systemctl stop firewalld
systemctl disable firewalld
<span class="token comment"># 2 关闭iptables服务</span>
systemctl stop iptables
systemctl disable iptables
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-6-5-禁用-selinux" tabindex="-1"><a class="header-anchor" href="#_2-6-5-禁用-selinux" aria-hidden="true">#</a> 2.6.5 禁用 selinux</h3><p>selinux是linux系统一下的一个安全服务，如果不关闭它，在安装集群中会产生各种各样的奇葩问题</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 将 SELinux 设置为 permissive 模式（相当于将其禁用）</span>
<span class="token comment"># 临时设置</span>
<span class="token function">sudo</span> setenforce <span class="token number">0</span>
<span class="token comment"># 永久设置</span>
<span class="token comment"># 1 编辑 /etc/selinux/config 文件，修改SELINUX的值为permissive</span>
<span class="token assign-left variable">SELINUX</span><span class="token operator">=</span>permissive
<span class="token comment"># 2 使用 sed 命令</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/^SELINUX=enforcing$/SELINUX=permissive/&#39;</span> /etc/selinux/config
<span class="token comment"># 注意修改完毕之后需要重启linux服务</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-6-6-禁用swap分区" tabindex="-1"><a class="header-anchor" href="#_2-6-6-禁用swap分区" aria-hidden="true">#</a> 2.6.6 禁用swap分区</h3><p>swap分区值的是虚拟内存分区，它的作用是物理内存使用完，之后将磁盘空间虚拟成内存来使用，启用swap设备会对系统的性能产生非常负面的影响，因此kubernetes要求每个节点都要禁用swap设备，但是如果因为某些原因确实不能关闭swap分区，就需要在集群安装过程中通过明确的参数进行配置说明</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 编辑分区配置文件/etc/fstab，注释掉swap分区一行</span>
<span class="token comment"># 注意修改完毕之后需要重启linux服务</span>
<span class="token function">vim</span> /etc/fstab
<span class="token comment"># 注释掉 /dev/mapper/centos-swap swap</span>
<span class="token comment"># /dev/mapper/centos-swap swap</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-6-7-修改linux的内核参数" tabindex="-1"><a class="header-anchor" href="#_2-6-7-修改linux的内核参数" aria-hidden="true">#</a> 2.6.7 修改linux的内核参数</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 修改linux的内核采纳数，添加网桥过滤和地址转发功能</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/sysctl.d/k8s.conf</span>
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF</span>
<span class="token comment"># 重新加载配置</span>
<span class="token function">sudo</span> <span class="token function">sysctl</span> <span class="token parameter variable">-p</span>
<span class="token comment"># 加载网桥过滤模块</span>
modprobe br_netfilter
<span class="token comment"># 查看网桥过滤模块是否加载成功</span>
lsmod <span class="token operator">|</span> <span class="token function">grep</span> br_netfilter
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-6-8-配置ipvs功能" tabindex="-1"><a class="header-anchor" href="#_2-6-8-配置ipvs功能" aria-hidden="true">#</a> 2.6.8 配置ipvs功能</h3><p>在Kubernetes中Service有两种带来模型，一种是基于iptables的，一种是基于ipvs的两者比较的话，ipvs的性能明显要高一些，但是如果要使用它，需要手动载入ipvs模块</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1.安装ipset和ipvsadm</span>
yum <span class="token function">install</span> ipset ipvsadm <span class="token parameter variable">-y</span>
<span class="token comment"># 2.添加需要加载的模块写入脚本文件</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> /etc/sysconfig/modules/ipvs.modules</span>
#!/bin/bash
modprobe br_netfilter
modprobe -- ip_vs
modprobe -- ip_vs_rr
modprobe -- ip_vs_wrr
modprobe -- ip_vs_sh
modprobe -- nf_conntrack_ipv4
EOF</span>
<span class="token comment"># 3.为脚本添加执行权限</span>
<span class="token function">chmod</span> +x /etc/sysconfig/modules/ipvs.modules
<span class="token comment"># 4.执行脚本文件</span>
/bin/bash /etc/sysconfig/modeules/ipvs.modules
<span class="token comment"># 5.查看对应的模块是否加载成功</span>
lsmod <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-e</span> <span class="token parameter variable">-ip_vs</span> <span class="token parameter variable">-e</span> nf_conntrack_ipv4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时开始重启服务器</p><h3 id="_2-6-9-安装docker" tabindex="-1"><a class="header-anchor" href="#_2-6-9-安装docker" aria-hidden="true">#</a> 2.6.9 安装docker</h3><p><s>1、切换镜像源</s><s><code>wget https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo -O /etc/yum.repos.d.docker-ce.repo</code></s></p><p><s>2、查看当前镜像源中支持的docker版本</s><s><code>yum list docker-ce --showduplicates</code></s></p><p><s>3、安装特定版本的docker-ce</s><s>必须制定--setopt=obsoletes=0，否则yum会自动安装更高版本</s><s><code>yum install --setopt=obsoletes=0 docker-ce-18.06.3.ce-3.e17 -y</code></s></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1、下载安装Docker</span>
<span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://get.docker.com <span class="token operator">|</span> <span class="token function">bash</span> <span class="token parameter variable">-s</span> <span class="token function">docker</span> <span class="token parameter variable">--mirror</span> Aliyun
<span class="token comment"># 2、添加一个配置文件</span>
<span class="token comment">#Docker 在默认情况下使用Vgroup Driver为cgroupfs，而Kubernetes推荐使用systemd来替代cgroupfs</span>
<span class="token function">mkdir</span> /etc/docker
<span class="token comment"># 3、编辑Docker配置文件</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> /etc/docker/daemon.json</span>
{
    &quot;exec-opts&quot;: [&quot;native.cgroupdriver=systemd&quot;],
    &quot;data-root&quot;: &quot;/opt/data/docker&quot;,
    &quot;registry-mirrors&quot;:  [
        &quot;http://hub-mirror.c.163.com&quot;,
        &quot;https://docker.mirrors.ustc.edu.cn&quot;,
        &quot;https://registry.docker-cn.com&quot;,
        &quot;https://reg-mirror.qiniu.com&quot;,
        &quot;https://dockerhub.azk8s.cn&quot;
    ]
}
EOF</span>
<span class="token comment"># 5、启动dokcer</span>
systemctl restart <span class="token function">docker</span>
systemctl <span class="token builtin class-name">enable</span> <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-6-10-安装kubernetes组件" tabindex="-1"><a class="header-anchor" href="#_2-6-10-安装kubernetes组件" aria-hidden="true">#</a> 2.6.10 安装Kubernetes组件</h3>`,46),h={href:"https://developer.aliyun.com/mirror/kubernetes",target:"_blank",rel:"noopener noreferrer"},g=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1、由于kubernetes的镜像在国外，速度比较慢，这里切换成国内的镜像源</span>
<span class="token comment"># 2、编辑/etc/yum.repos.d/kubernetes.repo,添加下面的配置</span>
<span class="token punctuation">[</span>kubernetes<span class="token punctuation">]</span>       
<span class="token assign-left variable">name</span><span class="token operator">=</span>Kubernetes
<span class="token assign-left variable">baseurl</span><span class="token operator">=</span>https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
<span class="token assign-left variable">enabled</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token assign-left variable">gpgcheck</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token assign-left variable">repo_gpgcheck</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token assign-left variable">gpgkey</span><span class="token operator">=</span>https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
<span class="token assign-left variable">exclude</span><span class="token operator">=</span>kubelet kubeadm kubectl

<span class="token comment"># 3、安装kubeadm、kubelet和kubectl</span>
yum <span class="token function">install</span> kubeadm kubelet kubectl <span class="token parameter variable">-y</span>

<span class="token comment"># 4、配置kubelet的cgroup</span>
<span class="token comment"># 编辑/etc/sysconfig/kubelet, 添加下面的配置</span>
<span class="token assign-left variable">KUBELET_CGROUP_ARGS</span><span class="token operator">=</span><span class="token string">&quot;--cgroup-driver=systemd&quot;</span>
<span class="token assign-left variable">KUBE_PROXY_MODE</span><span class="token operator">=</span><span class="token string">&quot;ipvs&quot;</span>

<span class="token comment"># 5、设置kubelet开机自启</span>
systemctl <span class="token builtin class-name">enable</span> kubelet
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-6-11-准备集群镜像" tabindex="-1"><a class="header-anchor" href="#_2-6-11-准备集群镜像" aria-hidden="true">#</a> 2.6.11 准备集群镜像</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 在安装kubernetes集群之前，必须要提前准备好集群需要的镜像，所需镜像可以通过下面命令查看</span>
kubeadm config images list
<span class="token comment"># 拉取镜像</span>
kubeadm config images pull --image-repository<span class="token operator">=</span>registry.aliyuncs.com/google_containers
<span class="token comment"># 保存镜像</span>
<span class="token function">docker</span> save <span class="token parameter variable">-o</span> k8s-base-images.tar <span class="token variable"><span class="token variable">\`</span><span class="token function">docker</span> images <span class="token operator">|</span> <span class="token function">grep</span> google_containers <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;BEGIN{OFS=&quot;:&quot;;ORS=&quot; &quot;}{print $1,$2}&#39;</span><span class="token variable">\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-6-11-集群初始化" tabindex="-1"><a class="header-anchor" href="#_2-6-11-集群初始化" aria-hidden="true">#</a> 2.6.11 集群初始化</h3><blockquote><p>下面的操作只需要在master节点上执行即可</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建集群</span>
kubeadm init --apiserver-advertise-address<span class="token operator">=</span><span class="token number">192.168</span>.85.131 --image-repository registry.aliyuncs.com/google_containers --service-cidr<span class="token operator">=</span><span class="token number">10.96</span>.0.0/12 --pod-network-cidr<span class="token operator">=</span><span class="token number">10.244</span>.0.0/16
<span class="token comment"># 创建必要文件</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token environment constant">$HOME</span>/.kube
<span class="token function">sudo</span> <span class="token function">cp</span> <span class="token parameter variable">-i</span> /etc/kubernetes/admin.conf <span class="token environment constant">$HOME</span>/.kube/config
<span class="token function">sudo</span> <span class="token function">chown</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span><span class="token builtin class-name">:</span><span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-g</span><span class="token variable">)</span></span> <span class="token environment constant">$HOME</span>/.kube/config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>下面的操作只需要在node节点上执行即可</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubeadm <span class="token function">join</span> <span class="token number">192.168</span>.85.131:6443 <span class="token parameter variable">--token</span> awk15p.t6bamck54w69u4s8 <span class="token punctuation">\\</span>
    --discovery-token-ca-cert-hash sha256:a94fa09562466d32d29523ab6cff122186f1127599fa4dcd5fa0152694f17117 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在master上查看节点信息</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl get nodes
NAME            STATUS     ROLES                  AGE   VERSION
centos7-node1   NotReady   control-plane,master   9h    v1.22.3
centos7-node3   NotReady   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>                 9h    v1.22.3
centos7-node4   NotReady   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>                 9h    v1.22.3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-6-13-安装网络插件-只在master节点操作即可" tabindex="-1"><a class="header-anchor" href="#_2-6-13-安装网络插件-只在master节点操作即可" aria-hidden="true">#</a> 2.6.13 安装网络插件，只在master节点操作即可</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>由于外网不好访问，如果出现无法访问的情况，可以直接用下面的 记得文件名是kube-flannel.yml，位置：/root/kube-flannel.yml内容：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>https://github.com/flannel-io/flannel/tree/master/Documentation/kube-flannel.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><s>下载完成<code>kube-flannel.yml</code>后,将文件中的<code>quay.io</code>替换为<code>quay-mirror.qiniu.com</code></s></p><p>下载完成<code>kube-flannel.yml</code>后,将文件中的<code>quay.io</code>替换为<code>quay.mirrors.ustc.edu.cn</code></p><p>准备镜像</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 拉取镜像</span>
<span class="token function">docker</span> pull rancher/mirrored-flannelcni-flannel-cni-plugin:v1.2
<span class="token function">docker</span> pull quay.mirrors.ustc.edu.cn/coreos/flannel:v0.15.0
<span class="token comment"># 保存镜像</span>
<span class="token function">docker</span> save <span class="token parameter variable">-o</span> k8s-network-flannel-images.tar <span class="token variable"><span class="token variable">\`</span><span class="token function">docker</span> images <span class="token operator">|</span> <span class="token function">grep</span> flannel <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;BEGIN{OFS=&quot;:&quot;;ORS=&quot; &quot;}{print $1,$2}&#39;</span><span class="token variable">\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-6-14-重启kubelet和docker" tabindex="-1"><a class="header-anchor" href="#_2-6-14-重启kubelet和docker" aria-hidden="true">#</a> 2.6.14 重启kubelet和docker</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 重启kubelet</span>
systemctl restart kubelet
<span class="token comment"># 重启docker</span>
systemctl restart <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用配置文件启动fannel</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> kube-flannel.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>等待它安装完毕 发现已经是 集群的状态已经是Ready</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>NAME            STATUS     ROLES                  AGE     VERSION
centos7-node1   Ready      control-plane,master   10m     v1.22.3
centos7-node2   Ready      <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>                 73s     v1.22.3
centos7-node3   Ready      <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>                 84s     v1.22.3
centos7-node4   Ready      <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>                 2m22s   v1.22.3
centos7-node5   Ready      <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>                 2m23s   v1.22.3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>若没有变成Ready,可以检查 kube-system 的 pod 是否正常</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl get pods <span class="token parameter variable">-n</span> kube-system

NAME                                    READY   STATUS                  RESTARTS      AGE
coredns-7f6cbbb7b8-6lbzt                <span class="token number">0</span>/1     Pending                 <span class="token number">0</span>             9h
coredns-7f6cbbb7b8-flwg8                <span class="token number">0</span>/1     Pending                 <span class="token number">0</span>             9h
etcd-centos7-node1                      <span class="token number">1</span>/1     Running                 <span class="token number">1</span> <span class="token punctuation">(</span>9h ago<span class="token punctuation">)</span>    9h
kube-apiserver-centos7-node1            <span class="token number">1</span>/1     Running                 <span class="token number">1</span> <span class="token punctuation">(</span>9h ago<span class="token punctuation">)</span>    9h
kube-controller-manager-centos7-node1   <span class="token number">1</span>/1     Running                 <span class="token number">1</span> <span class="token punctuation">(</span>9h ago<span class="token punctuation">)</span>    9h
kube-flannel-ds-5nk4h                   <span class="token number">0</span>/1     Init:0/2                <span class="token number">0</span>             3m39s
kube-flannel-ds-5rf6h                   <span class="token number">0</span>/1     Init:0/2                <span class="token number">0</span>             3m39s
kube-flannel-ds-t6dv7                   <span class="token number">0</span>/1     Init:ImagePullBackOff   <span class="token number">0</span>             3m39s
kube-proxy-pwprt                        <span class="token number">1</span>/1     Running                 <span class="token number">1</span> <span class="token punctuation">(</span>9h ago<span class="token punctuation">)</span>    9h
kube-proxy-v68fz                        <span class="token number">1</span>/1     Running                 <span class="token number">1</span> <span class="token punctuation">(</span>31m ago<span class="token punctuation">)</span>   9h
kube-proxy-vbwb8                        <span class="token number">1</span>/1     Running                 <span class="token number">1</span> <span class="token punctuation">(</span>9h ago<span class="token punctuation">)</span>    9h
kube-scheduler-centos7-node1            <span class="token number">1</span>/1     Running                 <span class="token number">1</span> <span class="token punctuation">(</span>9h ago<span class="token punctuation">)</span>    9h

<span class="token comment"># 发现有镜像是 Init:ImagePullBackOff</span>
<span class="token comment"># 然后重新拉取镜像解决</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-6-16-kubeadm中的命令" tabindex="-1"><a class="header-anchor" href="#_2-6-16-kubeadm中的命令" aria-hidden="true">#</a> 2.6.16 kubeadm中的命令</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 生成 新的token</span>
kubeadm token create --print-join-command
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-7-集群测试" tabindex="-1"><a class="header-anchor" href="#_2-7-集群测试" aria-hidden="true">#</a> 2.7 集群测试</h2><h3 id="_2-7-1-创建一个nginx服务" tabindex="-1"><a class="header-anchor" href="#_2-7-1-创建一个nginx服务" aria-hidden="true">#</a> 2.7.1 创建一个nginx服务</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl create deployment nginx <span class="token parameter variable">--image</span><span class="token operator">=</span>nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-7-2-暴露端口" tabindex="-1"><a class="header-anchor" href="#_2-7-2-暴露端口" aria-hidden="true">#</a> 2.7.2 暴露端口</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl expose deploy nginx <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">80</span> --target-port<span class="token operator">=</span><span class="token number">80</span> <span class="token parameter variable">--type</span><span class="token operator">=</span>NodePort
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-7-3-查看服务" tabindex="-1"><a class="header-anchor" href="#_2-7-3-查看服务" aria-hidden="true">#</a> 2.7.3 查看服务</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl get pod,svc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>NAME                         READY   STATUS    RESTARTS   AGE
pod/nginx-6799fc88d8-qd2nm   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          2m4s

NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>        AGE
service/kubernetes   ClusterIP   <span class="token number">10.96</span>.0.1    <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">443</span>/TCP        20m
service/nginx        NodePort    <span class="token number">10.99</span>.20.8   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">80</span>:32200/TCP   113s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>浏览器可以打开 http://192.168.85.131:32200 访问 nginx 服务</p>`,37);function f(_,x){const s=t("ExternalLinkIcon");return r(),d("div",null,[n("p",null,[n("a",u,[e("原文链接"),a(s)]),e(),n("a",b,[e("视频教程"),a(s)])]),m,n("p",null,[e("官方地址："),n("a",v,[e("https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm/"),a(s)])]),k,n("p",null,[n("a",h,[e("参考链接"),a(s)])]),g])}const E=l(p,[["render",f],["__file","k8s-cluster-build.html.vue"]]);export{E as default};
