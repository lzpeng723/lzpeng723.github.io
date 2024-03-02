import{_ as i,r as l,o as t,c as p,b as n,d as s,e,a as c}from"./app-CTlNizBn.js";const r="/assets/image-20200408194716912-sUQUPP0t.png",o="/assets/image-20200509121254425-jri0C17m.png",u="/assets/image-20200509151424280-UJjWQnRr.png",d="/assets/image-20200509152947714-CscWj67y.png",v="/assets/image-20200509153731363-wQC623aB.png",m="/assets/image-20200509191917069-ownhOImm.png",k="/assets/image-20200620175731338-Zzkr26kP.png",b="/assets/image-20200510103945494-Ys0lk37N.png",g="/assets/image-20200510113311209-SCBnP__d.png",y="/assets/image-20200623092808049-xtHyCNQZ.png",h="/assets/image-20200516112704764-yJFGgxZS.png",x="/assets/image-20200516102419998-adfmHmU4.png",P={},S={href:"https://gitee.com/yooome/golang/blob/main/k8s%E8%AF%A6%E7%BB%86%E6%95%99%E7%A8%8B/Kubernetes%E8%AF%A6%E7%BB%86%E6%95%99%E7%A8%8B.md#7-service%E8%AF%A6%E8%A7%A3",target:"_blank",rel:"noopener noreferrer"},_={href:"https://www.bilibili.com/video/BV1Qv41167ck?p=58",target:"_blank",rel:"noopener noreferrer"},N=c('<h1 id="_7-service详解" tabindex="-1"><a class="header-anchor" href="#_7-service详解" aria-hidden="true">#</a> 7. Service详解</h1><h2 id="_7-1-service介绍" tabindex="-1"><a class="header-anchor" href="#_7-1-service介绍" aria-hidden="true">#</a> 7.1 Service介绍</h2><p>在kubernetes中，pod是应用程序的载体，我们可以通过pod的ip来访问应用程序，但是pod的ip地址不是固定的，这也就意味着不方便直接采用pod的ip对服务进行访问。</p><p>为了解决这个问题，kubernetes提供了Service资源，Service会对提供同一个服务的多个pod进行聚合，并且提供一个统一的入口地址。通过访问Service的入口地址就能访问到后面的pod服务。</p><p><img src="'+r+'" alt="img"></p><p>Service在很多情况下只是一个概念，真正起作用的其实是kube-proxy服务进程，每个Node节点上都运行着一个kube-proxy服务进程。当创建Service的时候会通过api-server向etcd写入创建的service的信息，而kube-proxy会基于监听的机制发现这种Service的变动，然后<strong>它会将最新的Service信息转换成对应的访问规则</strong>。</p><p><img src="'+o+`" alt="img"></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 10.97.97.97:80 是service提供的访问入口</span>
<span class="token comment"># 当访问这个入口的时候，可以发现后面有三个pod的服务在等待调用，</span>
<span class="token comment"># kube-proxy会基于rr（轮询）的策略，将请求分发到其中一个pod上去</span>
<span class="token comment"># 这个规则会同时在集群内的所有节点上都生成，所以在任何一个节点上访问都可以。</span>
ipvsadm <span class="token parameter variable">-Ln</span>

IP Virtual Server version <span class="token number">1.2</span>.1 <span class="token punctuation">(</span>size<span class="token operator">=</span><span class="token number">4096</span><span class="token punctuation">)</span>
Prot LocalAddress:Port Scheduler Flags
  -<span class="token operator">&gt;</span> RemoteAddress:Port           Forward Weight ActiveConn InActConn
TCP  <span class="token number">10.97</span>.97.97:80 rr  <span class="token punctuation">(</span>Service IP<span class="token punctuation">)</span>
  -<span class="token operator">&gt;</span> <span class="token number">10.244</span>.1.39:80               Masq    <span class="token number">1</span>      <span class="token number">0</span>          <span class="token number">0</span>  <span class="token punctuation">(</span>POD IP<span class="token punctuation">)</span>
  -<span class="token operator">&gt;</span> <span class="token number">10.244</span>.1.40:80               Masq    <span class="token number">1</span>      <span class="token number">0</span>          <span class="token number">0</span>  <span class="token punctuation">(</span>POD IP<span class="token punctuation">)</span>
  -<span class="token operator">&gt;</span> <span class="token number">10.244</span>.2.33:80               Masq    <span class="token number">1</span>      <span class="token number">0</span>          <span class="token number">0</span>  <span class="token punctuation">(</span>POD IP<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>kube-proxy目前支持三种工作模式:</p><h3 id="_7-1-1-userspace-模式" tabindex="-1"><a class="header-anchor" href="#_7-1-1-userspace-模式" aria-hidden="true">#</a> 7.1.1 userspace 模式</h3><p>userspace模式下，kube-proxy会为每一个Service创建一个监听端口，发向Cluster IP的请求被Iptables规则重定向到kube-proxy监听的端口上，kube-proxy根据LB算法选择一个提供服务的Pod并和其建立链接，以将请求转发到Pod上。 该模式下，kube-proxy充当了一个四层负责均衡器的角色。由于kube-proxy运行在userspace中，在进行转发处理时会增加内核和用户空间之间的数据拷贝，虽然比较稳定，但是效率比较低。</p><p><img src="`+u+'" alt="img"></p><h3 id="_7-1-2-iptables-模式" tabindex="-1"><a class="header-anchor" href="#_7-1-2-iptables-模式" aria-hidden="true">#</a> 7.1.2 iptables 模式</h3><p>iptables模式下，kube-proxy为service后端的每个Pod创建对应的iptables规则，直接将发向Cluster IP的请求重定向到一个Pod IP。 该模式下kube-proxy不承担四层负责均衡器的角色，只负责创建iptables规则。该模式的优点是较userspace模式效率更高，但不能提供灵活的LB策略，当后端Pod不可用时也无法进行重试。</p><p><img src="'+d+'" alt="img"></p><h3 id="_7-1-3-ipvs-模式" tabindex="-1"><a class="header-anchor" href="#_7-1-3-ipvs-模式" aria-hidden="true">#</a> 7.1.3 ipvs 模式</h3><p>ipvs模式和iptables类似，kube-proxy监控Pod的变化并创建相应的ipvs规则。ipvs相对iptables转发效率更高。除此以外，ipvs支持更多的LB算法。</p><p><img src="'+v+`" alt="img"></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 此模式必须安装ipvs内核模块，否则会降级为iptables</span>
<span class="token comment"># 开启ipvs 修改 mode: &quot;ipvs&quot;</span>
kubectl edit cm kube-proxy <span class="token parameter variable">-n</span> kube-system
<span class="token comment"># 删除旧的 kube-proxy pod</span>
kubectl delete pod <span class="token parameter variable">-l</span> k8s-app<span class="token operator">=</span>kube-proxy <span class="token parameter variable">-n</span> kube-system
<span class="token comment"># 重新查看 ipvs 配置</span>
ipvsadm <span class="token parameter variable">-Ln</span>

IP Virtual Server version <span class="token number">1.2</span>.1 <span class="token punctuation">(</span>size<span class="token operator">=</span><span class="token number">4096</span><span class="token punctuation">)</span>
Prot LocalAddress:Port Scheduler Flags
  -<span class="token operator">&gt;</span> RemoteAddress:Port           Forward Weight ActiveConn InActConn
TCP  <span class="token number">10.97</span>.97.97:80 rr
  -<span class="token operator">&gt;</span> <span class="token number">10.244</span>.1.39:80               Masq    <span class="token number">1</span>      <span class="token number">0</span>          <span class="token number">0</span>
  -<span class="token operator">&gt;</span> <span class="token number">10.244</span>.1.40:80               Masq    <span class="token number">1</span>      <span class="token number">0</span>          <span class="token number">0</span>
  -<span class="token operator">&gt;</span> <span class="token number">10.244</span>.2.33:80               Masq    <span class="token number">1</span>      <span class="token number">0</span>          <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-2-service类型" tabindex="-1"><a class="header-anchor" href="#_7-2-service类型" aria-hidden="true">#</a> 7.2 Service类型</h2><p>Service的资源清单文件：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> Service  <span class="token comment"># 资源类型</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1  <span class="token comment"># 资源版本</span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span> <span class="token comment"># 元数据</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> service <span class="token comment"># 资源名称</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev <span class="token comment"># 命名空间</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span> <span class="token comment"># 描述</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span> <span class="token comment"># 标签选择器，用于确定当前service代理哪些pod</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token comment"># Service类型，指定service的访问方式</span>
  <span class="token key atrule">clusterIP</span><span class="token punctuation">:</span>  <span class="token comment"># 虚拟服务的ip地址</span>
  <span class="token key atrule">sessionAffinity</span><span class="token punctuation">:</span> <span class="token comment"># session亲和性，支持ClientIP、None两个选项</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span> <span class="token comment"># 端口信息</span>
    <span class="token punctuation">-</span> <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP 
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3017</span>  <span class="token comment"># service端口</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">5003</span> <span class="token comment"># pod端口</span>
      <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">31122</span> <span class="token comment"># 主机端口</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有以下几种Service类型</p><ul><li>ClusterIP：默认值，它是Kubernetes系统自动分配的虚拟IP，只能在集群内部访问</li><li>NodePort：将Service通过指定的Node上的端口暴露给外部，通过此方法，就可以在集群外部访问服务</li><li>LoadBalancer：使用外接负载均衡器完成到服务的负载分发，注意此模式需要外部云环境支持</li><li>ExternalName： 把集群外部的服务引入集群内部，直接使用</li></ul><h2 id="_7-3-service使用" tabindex="-1"><a class="header-anchor" href="#_7-3-service使用" aria-hidden="true">#</a> 7.3 Service使用</h2><h3 id="_7-3-1-实验环境准备" tabindex="-1"><a class="header-anchor" href="#_7-3-1-实验环境准备" aria-hidden="true">#</a> 7.3.1 实验环境准备</h3><p>在使用service之前，首先利用Deployment创建出3个pod，注意要为pod设置<code>app=nginx-pod</code>的标签</p><p>创建deployment.yaml，内容如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment      
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pc<span class="token punctuation">-</span>deployment
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span> 
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pod
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pod
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
        <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl create <span class="token parameter variable">-f</span> deployment.yaml
deployment.apps/pc-deployment created

<span class="token comment"># 查看pod详情</span>
kubectl get pods <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-o</span> wide --show-labels

NAME                             READY   STATUS     IP            NODE     LABELS
pc-deployment-66cb59b984-8p84h   <span class="token number">1</span>/1     Running    <span class="token number">10.244</span>.1.39   node1    <span class="token assign-left variable">app</span><span class="token operator">=</span>nginx-pod
pc-deployment-66cb59b984-vx8vx   <span class="token number">1</span>/1     Running    <span class="token number">10.244</span>.2.33   node2    <span class="token assign-left variable">app</span><span class="token operator">=</span>nginx-pod
pc-deployment-66cb59b984-wnncx   <span class="token number">1</span>/1     Running    <span class="token number">10.244</span>.1.40   node1    <span class="token assign-left variable">app</span><span class="token operator">=</span>nginx-pod

<span class="token comment"># 为了方便后面的测试，修改下三台nginx的index.html页面（三台修改的IP地址不一致）</span>
kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> pc-deployment-66cb59b984-8p84h <span class="token parameter variable">-n</span> dev /bin/sh
<span class="token builtin class-name">echo</span> <span class="token string">&quot;10.244.1.39&quot;</span> <span class="token operator">&gt;</span> /usr/share/nginx/html/index.html

<span class="token comment">#修改完毕之后，访问测试</span>
<span class="token function">curl</span> <span class="token number">10.244</span>.1.39
<span class="token number">10.244</span>.1.39
<span class="token function">curl</span> <span class="token number">10.244</span>.2.33
<span class="token number">10.244</span>.2.33
<span class="token function">curl</span> <span class="token number">10.244</span>.1.40
<span class="token number">10.244</span>.1.40
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-3-2-clusterip类型的service" tabindex="-1"><a class="header-anchor" href="#_7-3-2-clusterip类型的service" aria-hidden="true">#</a> 7.3.2 ClusterIP类型的Service</h3><p>创建service-clusterip.yaml文件</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> service<span class="token punctuation">-</span>clusterip
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pod
  <span class="token key atrule">clusterIP</span><span class="token punctuation">:</span> 10.97.97.97 <span class="token comment"># service的ip地址，如果不写，默认会生成一个</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>  <span class="token comment"># Service端口       </span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span> <span class="token comment"># pod端口</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建service</span>
kubectl create <span class="token parameter variable">-f</span> service-clusterip.yaml
service/service-clusterip created

<span class="token comment"># 查看service</span>
kubectl get svc <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-o</span> wide
NAME                TYPE        CLUSTER-IP    EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>   AGE   SELECTOR
service-clusterip   ClusterIP   <span class="token number">10.97</span>.97.97   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">80</span>/TCP    13s   <span class="token assign-left variable">app</span><span class="token operator">=</span>nginx-pod

<span class="token comment"># 查看service的详细信息</span>
<span class="token comment"># 在这里有一个Endpoints列表，里面就是当前service可以负载到的服务入口</span>
kubectl describe svc service-clusterip <span class="token parameter variable">-n</span> dev

Name:              service-clusterip
Namespace:         dev
Labels:            <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Annotations:       <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Selector:          <span class="token assign-left variable">app</span><span class="token operator">=</span>nginx-pod
Type:              ClusterIP
IP:                <span class="token number">10.97</span>.97.97
Port:              <span class="token operator">&lt;</span>unset<span class="token operator">&gt;</span>  <span class="token number">80</span>/TCP
TargetPort:        <span class="token number">80</span>/TCP
Endpoints:         <span class="token number">10.244</span>.1.39:80,10.244.1.40:80,10.244.2.33:80
Session Affinity:  None
Events:            <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>

<span class="token comment"># 查看ipvs的映射规则</span>
ipvsadm <span class="token parameter variable">-Ln</span>

TCP  <span class="token number">10.97</span>.97.97:80 rr
  -<span class="token operator">&gt;</span> <span class="token number">10.244</span>.1.39:80               Masq    <span class="token number">1</span>      <span class="token number">0</span>          <span class="token number">0</span>
  -<span class="token operator">&gt;</span> <span class="token number">10.244</span>.1.40:80               Masq    <span class="token number">1</span>      <span class="token number">0</span>          <span class="token number">0</span>
  -<span class="token operator">&gt;</span> <span class="token number">10.244</span>.2.33:80               Masq    <span class="token number">1</span>      <span class="token number">0</span>          <span class="token number">0</span>

<span class="token comment"># 访问10.97.97.97:80观察效果</span>
<span class="token function">curl</span> <span class="token number">10.97</span>.97.97:80

<span class="token number">10.244</span>.2.33
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-3-3-endpoint" tabindex="-1"><a class="header-anchor" href="#_7-3-3-endpoint" aria-hidden="true">#</a> 7.3.3 Endpoint</h3><p>Endpoint是kubernetes中的一个资源对象，存储在etcd中，用来记录一个service对应的所有pod的访问地址，它是根据service配置文件中selector描述产生的。</p><p>一个Service由一组Pod组成，这些Pod通过Endpoints暴露出来，<strong>Endpoints是实现实际服务的端点集合</strong>。换句话说，service和pod之间的联系是通过endpoints实现的。</p><p><img src="`+m+`" alt="image-20200509191917069"></p><p><strong>负载分发策略</strong></p><p>对Service的访问被分发到了后端的Pod上去，目前kubernetes提供了两种负载分发策略：</p><ul><li><p>如果不定义，默认使用kube-proxy的策略，比如随机、轮询</p></li><li><p>基于客户端地址的会话保持模式，即来自同一个客户端发起的所有请求都会转发到固定的一个Pod上</p><p>此模式可以使在spec中添加<code>sessionAffinity: ClientIP</code>选项</p></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看ipvs的映射规则【rr 轮询】</span>
ipvsadm <span class="token parameter variable">-Ln</span>

TCP  <span class="token number">10.97</span>.97.97:80 rr
  -<span class="token operator">&gt;</span> <span class="token number">10.244</span>.1.39:80               Masq    <span class="token number">1</span>      <span class="token number">0</span>          <span class="token number">0</span>
  -<span class="token operator">&gt;</span> <span class="token number">10.244</span>.1.40:80               Masq    <span class="token number">1</span>      <span class="token number">0</span>          <span class="token number">0</span>
  -<span class="token operator">&gt;</span> <span class="token number">10.244</span>.2.33:80               Masq    <span class="token number">1</span>      <span class="token number">0</span>          <span class="token number">0</span>

<span class="token comment"># 循环访问测试</span>
<span class="token keyword">while</span> <span class="token boolean">true</span><span class="token punctuation">;</span><span class="token keyword">do</span> <span class="token function">curl</span> <span class="token number">10.97</span>.97.97:80<span class="token punctuation">;</span> <span class="token function">sleep</span> <span class="token number">5</span><span class="token punctuation">;</span> <span class="token keyword">done</span><span class="token punctuation">;</span>

<span class="token number">10.244</span>.1.40
<span class="token number">10.244</span>.1.39
<span class="token number">10.244</span>.2.33
<span class="token number">10.244</span>.1.40
<span class="token number">10.244</span>.1.39
<span class="token number">10.244</span>.2.33

<span class="token comment"># 修改分发策略----sessionAffinity:ClientIP</span>
<span class="token comment"># 查看ipvs规则【persistent 代表持久】</span>
ipvsadm <span class="token parameter variable">-Ln</span>

TCP  <span class="token number">10.97</span>.97.97:80 rr persistent <span class="token number">10800</span>
  -<span class="token operator">&gt;</span> <span class="token number">10.244</span>.1.39:80               Masq    <span class="token number">1</span>      <span class="token number">0</span>          <span class="token number">0</span>
  -<span class="token operator">&gt;</span> <span class="token number">10.244</span>.1.40:80               Masq    <span class="token number">1</span>      <span class="token number">0</span>          <span class="token number">0</span>
  -<span class="token operator">&gt;</span> <span class="token number">10.244</span>.2.33:80               Masq    <span class="token number">1</span>      <span class="token number">0</span>          <span class="token number">0</span>

<span class="token comment"># 循环访问测试</span>
<span class="token keyword">while</span> <span class="token boolean">true</span><span class="token punctuation">;</span><span class="token keyword">do</span> <span class="token function">curl</span> <span class="token number">10.97</span>.97.97<span class="token punctuation">;</span> <span class="token function">sleep</span> <span class="token number">5</span><span class="token punctuation">;</span> <span class="token keyword">done</span><span class="token punctuation">;</span>

<span class="token number">10.244</span>.2.33
<span class="token number">10.244</span>.2.33
<span class="token number">10.244</span>.2.33
  
<span class="token comment"># 删除service</span>
kubectl delete <span class="token parameter variable">-f</span> service-clusterip.yaml

<span class="token function">service</span> <span class="token string">&quot;service-clusterip&quot;</span> deleted
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-3-4-headliness类型的service" tabindex="-1"><a class="header-anchor" href="#_7-3-4-headliness类型的service" aria-hidden="true">#</a> 7.3.4 HeadLiness类型的Service</h3><p>在某些场景中，开发人员可能不想使用Service提供的负载均衡功能，而希望自己来控制负载均衡策略，针对这种情况，kubernetes提供了HeadLiness Service，这类Service不会分配Cluster IP，如果想要访问service，只能通过service的域名进行查询。</p><p>创建service-headliness.yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> service<span class="token punctuation">-</span>headliness
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pod
  <span class="token key atrule">clusterIP</span><span class="token punctuation">:</span> None <span class="token comment"># 将clusterIP设置为None，即可创建headliness Service</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>    
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建service</span>
kubectl create <span class="token parameter variable">-f</span> service-headliness.yaml
service/service-headliness created

<span class="token comment"># 获取service， 发现CLUSTER-IP未分配</span>
kubectl get svc service-headliness <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-o</span> wide

NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>   AGE   SELECTOR
service-headliness   ClusterIP   None         <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">80</span>/TCP    11s   <span class="token assign-left variable">app</span><span class="token operator">=</span>nginx-pod

<span class="token comment"># 查看service详情</span>
kubectl describe svc service-headliness  <span class="token parameter variable">-n</span> dev

Name:              service-headliness
Namespace:         dev
Labels:            <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Annotations:       <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Selector:          <span class="token assign-left variable">app</span><span class="token operator">=</span>nginx-pod
Type:              ClusterIP
IP Family Policy:  SingleStack
IP Families:       IPv4
IP:                None
IPs:               None
Port:              <span class="token operator">&lt;</span>unset<span class="token operator">&gt;</span>  <span class="token number">80</span>/TCP
TargetPort:        <span class="token number">80</span>/TCP
Endpoints:         <span class="token number">10.244</span>.1.19:80,10.244.2.11:80,10.244.3.22:80
Session Affinity:  None
Events:            <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>

<span class="token comment"># 查看域名的解析情况</span>
kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> pc-deployment-66cb59b984-8p84h <span class="token parameter variable">-n</span> dev /bin/sh

/ <span class="token function">cat</span> /etc/resolv.conf

nameserver <span class="token number">10.96</span>.0.10
search dev.svc.cluster.local svc.cluster.local cluster.local
options ndots:5

<span class="token function">dig</span> @10.96.0.10 service-headliness.dev.svc.cluster.local

service-headliness.dev.svc.cluster.local. <span class="token number">30</span> IN A <span class="token number">10.244</span>.1.40
service-headliness.dev.svc.cluster.local. <span class="token number">30</span> IN A <span class="token number">10.244</span>.1.39
service-headliness.dev.svc.cluster.local. <span class="token number">30</span> IN A <span class="token number">10.244</span>.2.33
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-3-5-nodeport类型的service" tabindex="-1"><a class="header-anchor" href="#_7-3-5-nodeport类型的service" aria-hidden="true">#</a> 7.3.5 NodePort类型的Service</h3><p>在之前的样例中，创建的Service的ip地址只有集群内部才可以访问，如果希望将Service暴露给集群外部使用，那么就要使用到另外一种类型的Service，称为NodePort类型。NodePort的工作原理其实就是<strong>将service的端口映射到Node的一个端口上</strong>，然后就可以通过<code>NodeIp: NodePort</code>来访问service了。</p><p><img src="`+k+`" alt="img"></p><p>创建service-nodeport.yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> service<span class="token punctuation">-</span>nodeport
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pod
  <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort <span class="token comment"># service类型</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">30002</span> <span class="token comment"># 指定绑定的node的端口(默认的取值范围是：30000-32767), 如果不指定，会默认分配</span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建service</span>
kubectl create <span class="token parameter variable">-f</span> service-nodeport.yaml

service/service-nodeport created

<span class="token comment"># 查看service</span>
kubectl get svc <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-o</span> wide

NAME               TYPE       CLUSTER-IP       EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>        AGE   SELECTOR
service-nodeport   NodePort   <span class="token number">10.104</span>.169.108   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">80</span>:30002/TCP   13s   <span class="token assign-left variable">app</span><span class="token operator">=</span>nginx-pod

<span class="token comment"># 接下来可以通过电脑主机的浏览器去访问集群中任意一个nodeip的30002端口，即可访问到pod</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-3-6-loadbalancer类型的service" tabindex="-1"><a class="header-anchor" href="#_7-3-6-loadbalancer类型的service" aria-hidden="true">#</a> 7.3.6 LoadBalancer类型的Service</h3><p>LoadBalancer和NodePort很相似，目的都是向外部暴露一个端口，区别在于LoadBalancer会在集群的外部再来做一个负载均衡设备，而这个设备需要外部环境支持的，外部服务发送到这个设备上的请求，会被设备负载之后转发到集群中。</p><p><img src="`+b+'" alt="img"></p><h3 id="_7-3-7-externalname类型的service" tabindex="-1"><a class="header-anchor" href="#_7-3-7-externalname类型的service" aria-hidden="true">#</a> 7.3.7 ExternalName类型的Service</h3><p>ExternalName类型的Service用于引入集群外部的服务，它通过<code>externalName</code>属性指定外部一个服务的地址，然后在集群内部访问此service就可以访问到外部的服务了。</p><p><img src="'+g+`" alt="img"></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>apiVersion: v1
kind: Service
metadata:
  name: service-externalname
  namespace: dev
spec:
  type: ExternalName <span class="token comment"># service类型</span>
  externalName: www.baidu.com  <span class="token comment">#改成ip地址也可以</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建service</span>
kubectl create <span class="token parameter variable">-f</span> service-externalname.yaml

service/service-externalname created

<span class="token comment"># 域名解析</span>
<span class="token function">dig</span> @10.96.0.10 service-externalname.dev.svc.cluster.local

service-externalname.dev.svc.cluster.local. <span class="token number">30</span> IN CNAME www.baidu.com.
www.baidu.com.          <span class="token number">30</span>      IN      CNAME   www.a.shifen.com.
www.a.shifen.com.       <span class="token number">30</span>      IN      A       <span class="token number">39.156</span>.66.18
www.a.shifen.com.       <span class="token number">30</span>      IN      A       <span class="token number">39.156</span>.66.14
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-4-ingress介绍" tabindex="-1"><a class="header-anchor" href="#_7-4-ingress介绍" aria-hidden="true">#</a> 7.4 Ingress介绍</h2><p>在前面课程中已经提到，Service对集群之外暴露服务的主要方式有两种：NotePort和LoadBalancer，但是这两种方式，都有一定的缺点：</p><ul><li>NodePort方式的缺点是会占用很多集群机器的端口，那么当集群服务变多的时候，这个缺点就愈发明显</li><li>LB方式的缺点是每个service需要一个LB，浪费、麻烦，并且需要kubernetes之外设备的支持</li></ul><p>基于这种现状，kubernetes提供了Ingress资源对象，Ingress只需要一个NodePort或者一个LB就可以满足暴露多个Service的需求。工作机制大致如下图表示：</p><p><img src="`+y+'" alt="img"></p><p>实际上，Ingress相当于一个7层的负载均衡器，是kubernetes对反向代理的一个抽象，它的工作原理类似于Nginx，可以理解成在<strong>Ingress里建立诸多映射规则，Ingress Controller通过监听这些配置规则并转化成Nginx的反向代理配置 , 然后对外部提供服务</strong>。在这里有两个核心概念：</p><ul><li>ingress：kubernetes中的一个对象，作用是定义请求如何转发到service的规则</li><li>ingress controller：具体实现反向代理及负载均衡的程序，对ingress定义的规则进行解析，根据配置的规则来实现请求转发，实现方式有很多，比如Nginx, Contour, Haproxy等等</li></ul><p>Ingress（以Nginx为例）的工作原理如下：</p><ol><li>用户编写Ingress规则，说明哪个域名对应kubernetes集群中的哪个Service</li><li>Ingress控制器动态感知Ingress服务规则的变化，然后生成一段对应的Nginx反向代理配置</li><li>Ingress控制器会将生成的Nginx配置写入到一个运行着的Nginx服务中，并动态更新</li><li>到此为止，其实真正在工作的就是一个Nginx了，内部配置了用户定义的请求转发规则</li></ol><p><img src="'+h+`" alt="img"></p><h2 id="_7-5-ingress使用" tabindex="-1"><a class="header-anchor" href="#_7-5-ingress使用" aria-hidden="true">#</a> 7.5 Ingress使用</h2><h3 id="_7-5-1-环境准备-搭建ingress环境-因有镜像-还未测试成功" tabindex="-1"><a class="header-anchor" href="#_7-5-1-环境准备-搭建ingress环境-因有镜像-还未测试成功" aria-hidden="true">#</a> 7.5.1 环境准备 搭建ingress环境 (因有镜像，还未测试成功)</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 准备镜像</span>
<span class="token function">docker</span> pull registry.aliyuncs.com/google_containers/nginx-ingress-controller:0.30.0

<span class="token comment"># 创建文件夹</span>
<span class="token function">mkdir</span> ingress-controller
<span class="token builtin class-name">cd</span> ingress-controller

<span class="token comment"># 获取ingress-nginx，本次案例使用的是0.30版本</span>
<span class="token function">wget</span> https://raw.githubusercontent.com/kubernetes/ingress-nginx/nginx-0.30.0/deploy/static/mandatory.yaml
<span class="token function">wget</span> https://raw.githubusercontent.com/kubernetes/ingress-nginx/nginx-0.30.0/deploy/static/provider/baremetal/service-nodeport.yaml

<span class="token comment"># 修改mandatory.yaml文件中的仓库</span>
<span class="token comment"># 修改quay.io/kubernetes-ingress-controller/nginx-ingress-controller:0.30.0</span>
<span class="token comment"># ~~为quay-mirror.qiniu.com/kubernetes-ingress-controller/nginx-ingress-controller:0.30.0~~</span>
<span class="token comment"># ~~为quay.mirrors.ustc.edu.cn/kubernetes-ingress-controller/nginx-ingress-controller:0.30.0~~</span>
<span class="token comment"># 为registry.aliyuncs.com/google_containers/nginx-ingress-controller:0.30.0</span>
<span class="token comment"># 创建ingress-nginx</span>
kubectl apply <span class="token parameter variable">-f</span> ./

<span class="token comment"># 查看ingress-nginx</span>
kubectl get pod <span class="token parameter variable">-n</span> ingress-nginx

NAME                                           READY   STATUS    RESTARTS   AGE
pod/nginx-ingress-controller-fbf967dd5-4qpbp   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          12h

<span class="token comment"># 查看service</span>
kubectl get svc <span class="token parameter variable">-n</span> ingress-nginx

NAME            TYPE       CLUSTER-IP     EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>                      AGE
ingress-nginx   NodePort   <span class="token number">10.98</span>.75.163   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">80</span>:32240/TCP,443:31335/TCP   11h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-5-2-准备service和pod" tabindex="-1"><a class="header-anchor" href="#_7-5-2-准备service和pod" aria-hidden="true">#</a> 7.5.2 准备service和pod</h3><p>为了后面的实验比较方便，创建如下图所示的模型</p><p><img src="`+x+`" alt="img"></p><p>创建tomcat-nginx.yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>deployment
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pod
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pod
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
        <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>

<span class="token punctuation">---</span>

<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">-</span>deployment
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">-</span>pod
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">-</span>pod
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> tomcat
        <span class="token key atrule">image</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">:</span>8.5<span class="token punctuation">-</span>jre10<span class="token punctuation">-</span>slim
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8080</span>

<span class="token punctuation">---</span>

<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>service
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pod
  <span class="token key atrule">clusterIP</span><span class="token punctuation">:</span> None
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span>

<span class="token punctuation">---</span>

<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">-</span>service
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">-</span>pod
  <span class="token key atrule">clusterIP</span><span class="token punctuation">:</span> None
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8080</span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8080</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建</span>
kubectl create <span class="token parameter variable">-f</span> tomcat-nginx.yaml

<span class="token comment"># 查看</span>
kubectl get svc <span class="token parameter variable">-n</span> dev

NAME             TYPE        CLUSTER-IP   EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>    AGE
nginx-service    ClusterIP   None         <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">80</span>/TCP     48s
tomcat-service   ClusterIP   None         <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">8080</span>/TCP   48s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-5-3-http代理" tabindex="-1"><a class="header-anchor" href="#_7-5-3-http代理" aria-hidden="true">#</a> 7.5.3 Http代理</h3><p>创建ingress-http.yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> extensions/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ingress<span class="token punctuation">-</span>http
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> nginx.itheima.com
    <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /
        <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>service
          <span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">80</span>
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> tomcat.itheima.com
    <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /
        <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">-</span>service
          <span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">8080</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建</span>
kubectl create <span class="token parameter variable">-f</span> ingress-http.yaml
ingress.extensions/ingress-http created

<span class="token comment"># 查看</span>
kubectl get ing ingress-http <span class="token parameter variable">-n</span> dev

NAME           HOSTS                                  ADDRESS   PORTS   AGE
ingress-http   nginx.itheima.com,tomcat.itheima.com             <span class="token number">80</span>      22s

<span class="token comment"># 查看详情</span>
kubectl describe ing ingress-http <span class="token parameter variable">-n</span> dev

<span class="token punctuation">..</span>.
Rules:
Host                Path  Backends
----                ----  --------
nginx.itheima.com   / nginx-service:80 <span class="token punctuation">(</span><span class="token number">10.244</span>.1.96:80,10.244.1.97:80,10.244.2.112:80<span class="token punctuation">)</span>
tomcat.itheima.com  / tomcat-service:8080<span class="token punctuation">(</span><span class="token number">10.244</span>.1.94:8080,10.244.1.95:8080,10.244.2.111:8080<span class="token punctuation">)</span>
<span class="token punctuation">..</span>.

<span class="token comment"># 接下来,在本地电脑上配置host文件,解析上面的两个域名到192.168.109.100(master)上</span>
<span class="token comment"># 然后,就可以分别访问tomcat.itheima.com:32240  和  nginx.itheima.com:32240 查看效果了</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-5-4-https代理" tabindex="-1"><a class="header-anchor" href="#_7-5-4-https代理" aria-hidden="true">#</a> 7.5.4 Https代理</h3><p>创建证书</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 生成证书</span>
openssl req <span class="token parameter variable">-x509</span> <span class="token parameter variable">-sha256</span> <span class="token parameter variable">-nodes</span> <span class="token parameter variable">-days</span> <span class="token number">365</span> <span class="token parameter variable">-newkey</span> rsa:2048 <span class="token parameter variable">-keyout</span> tls.key <span class="token parameter variable">-out</span> tls.crt <span class="token parameter variable">-subj</span> <span class="token string">&quot;/C=CN/ST=BJ/L=BJ/O=nginx/CN=itheima.com&quot;</span>

<span class="token comment"># 创建密钥</span>
kubectl create secret tls tls-secret <span class="token parameter variable">--key</span> tls.key <span class="token parameter variable">--cert</span> tls.crt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建ingress-https.yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> extensions/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ingress<span class="token punctuation">-</span>https
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">tls</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> nginx.itheima.com
      <span class="token punctuation">-</span> tomcat.itheima.com
      <span class="token key atrule">secretName</span><span class="token punctuation">:</span> tls<span class="token punctuation">-</span>secret <span class="token comment"># 指定秘钥</span>
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> nginx.itheima.com
    <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /
        <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>service
          <span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">80</span>
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> tomcat.itheima.com
    <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /
        <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">-</span>service
          <span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">8080</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建</span>
kubectl create <span class="token parameter variable">-f</span> ingress-https.yaml

ingress.extensions/ingress-https created

<span class="token comment"># 查看</span>
kubectl get ing ingress-https <span class="token parameter variable">-n</span> dev

NAME            HOSTS                                  ADDRESS         PORTS     AGE
ingress-https   nginx.itheima.com,tomcat.itheima.com   <span class="token number">10.104</span>.184.38   <span class="token number">80</span>, <span class="token number">443</span>   2m42s

<span class="token comment"># 查看详情</span>
kubectl describe ing ingress-https <span class="token parameter variable">-n</span> dev

<span class="token punctuation">..</span>.
TLS:
  tls-secret terminates nginx.itheima.com,tomcat.itheima.com
Rules:
Host              Path Backends
----              ---- --------
nginx.itheima.com  /  nginx-service:80 <span class="token punctuation">(</span><span class="token number">10.244</span>.1.97:80,10.244.1.98:80,10.244.2.119:80<span class="token punctuation">)</span>
tomcat.itheima.com /  tomcat-service:8080<span class="token punctuation">(</span><span class="token number">10.244</span>.1.99:8080,10.244.2.117:8080,10.244.2.120:8080<span class="token punctuation">)</span>
<span class="token punctuation">..</span>.

<span class="token comment"># 下面可以通过浏览器访问https://nginx.itheima.com:31335 和 https://tomcat.itheima.com:31335来查看了</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,90);function f(E,I){const a=l("ExternalLinkIcon");return t(),p("div",null,[n("p",null,[n("a",S,[s("原文链接"),e(a)]),s(),n("a",_,[s("视频教程"),e(a)])]),N])}const C=i(P,[["render",f],["__file","k8s-service.html.vue"]]);export{C as default};
