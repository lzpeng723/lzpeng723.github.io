import{_ as l,r as i,o as t,c as p,b as n,d as s,e as a,a as o}from"./app-rBywrD27.js";const c="/assets/image-20200407100850484-_47Mf0-G.png",r="/assets/image-20200407121501907-l1bLVnrl.png",d="/assets/image-20200408193950807-mnUbbOXW.png",u="/assets/image-20200408194716912-sUQUPP0t.png",v={},m={href:"https://gitee.com/yooome/golang/blob/main/k8s%E8%AF%A6%E7%BB%86%E6%95%99%E7%A8%8B/Kubernetes%E8%AF%A6%E7%BB%86%E6%95%99%E7%A8%8B.md#4-%E5%AE%9E%E6%88%98%E5%85%A5%E9%97%A8",target:"_blank",rel:"noopener noreferrer"},b={href:"https://www.bilibili.com/video/BV1Qv41167ck?p=19",target:"_blank",rel:"noopener noreferrer"},k=o('<h1 id="_4-实战入门" tabindex="-1"><a class="header-anchor" href="#_4-实战入门" aria-hidden="true">#</a> 4. 实战入门</h1><p>本章节将介绍如何在kubernetes集群中部署一个nginx服务，并且能够对其进行访问。</p><h2 id="_4-1-namespace" tabindex="-1"><a class="header-anchor" href="#_4-1-namespace" aria-hidden="true">#</a> 4.1 Namespace</h2><p>Namespace是kubernetes系统中的一种非常重要资源，它的主要作用是用来实现<strong>多套环境的资源隔离</strong>或者<strong>多租户的资源隔离</strong>。</p><p>默认情况下，kubernetes集群中的所有的Pod都是可以相互访问的。但是在实际中，可能不想让两个Pod之间进行互相的访问，那此时就可以将两个Pod划分到不同的namespace下。kubernetes通过将集群内部的资源分配到不同的Namespace中，可以形成逻辑上的&quot;组&quot;，以方便不同的组的资源进行隔离使用和管理。</p><p>可以通过kubernetes的授权机制，将不同的namespace交给不同租户进行管理，这样就实现了多租户的资源隔离。此时还能结合kubernetes的资源配额机制，限定不同租户能占用的资源，例如CPU使用量、内存使用量等等，来实现租户可用资源的管理。</p><p><img src="'+c+`" alt="image-20200407100850484"></p><p>kubernetes在集群启动之后，会默认创建几个namespace</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl get namespace

NAME              STATUS   AGE
default           Active   45h     <span class="token comment">#  所有未指定Namespace的对象都会被分配在default命名空间</span>
kube-node-lease   Active   45h     <span class="token comment">#  集群节点之间的心跳维护，v1.13开始引入</span>
kube-public       Active   45h     <span class="token comment">#  此命名空间下的资源可以被所有人访问（包括未认证用户）</span>
kube-system       Active   45h     <span class="token comment">#  所有由Kubernetes系统创建的资源都处于这个命名空间</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面来看namespace资源的具体操作：</p><h3 id="_4-1-1-查看" tabindex="-1"><a class="header-anchor" href="#_4-1-1-查看" aria-hidden="true">#</a> 4.1.1 <strong>查看</strong></h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1 查看所有的ns  命令：kubectl get ns</span>
kubectl get ns

NAME              STATUS   AGE
default           Active   45h
kube-node-lease   Active   45h
kube-public       Active   45h     
kube-system       Active   45h     

<span class="token comment"># 2 查看指定的ns   命令：kubectl get ns ns名称</span>
kubectl get ns default

NAME      STATUS   AGE
default   Active   45h

<span class="token comment"># 3 指定输出格式  命令：kubectl get ns ns名称  -o 格式参数</span>
<span class="token comment"># kubernetes支持的格式有很多，比较常见的是wide、json、yaml</span>
kubectl get ns default <span class="token parameter variable">-o</span> yaml

apiVersion: v1
kind: Namespace
metadata:
  creationTimestamp: <span class="token string">&quot;2021-10-30T05:29:36Z&quot;</span>
  labels:
    kubernetes.io/metadata.name: default
  name: default
  resourceVersion: <span class="token string">&quot;204&quot;</span>
  uid: c89bf2fe-608e-4e4f-bf67-490ca063683e
spec:
  finalizers:
  - kubernetes
status:
  phase: Active
  
<span class="token comment"># 4 查看ns详情  命令：kubectl describe ns ns名称</span>
kubectl describe ns default

Name:         default
Labels:       <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Annotations:  <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Status:       Active  <span class="token comment"># Active 命名空间正在使用中  Terminating 正在删除命名空间</span>

<span class="token comment"># Resource Quota 针对 namespace 做的资源限制</span>
<span class="token comment"># LimitRange 针对 namespace 中的每个组件做的资源限制</span>
No resource quota.
No LimitRange resource.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-1-2-创建" tabindex="-1"><a class="header-anchor" href="#_4-1-2-创建" aria-hidden="true">#</a> 4.1.2 <strong>创建</strong></h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建namespace</span>
kubectl create ns dev

namespace/dev created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-1-3-删除" tabindex="-1"><a class="header-anchor" href="#_4-1-3-删除" aria-hidden="true">#</a> 4.1.3 <strong>删除</strong></h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 删除namespace</span>
kubectl delete ns dev

namespace <span class="token string">&quot;dev&quot;</span> deleted
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-1-4-配置方式" tabindex="-1"><a class="header-anchor" href="#_4-1-4-配置方式" aria-hidden="true">#</a> 4.1.4 <strong>配置方式</strong></h3><p>首先准备一个yaml文件：ns-dev.yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Namespace
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后就可以执行对应的创建和删除命令了：</p><p>创建：<code>kubectl create -f ns-dev.yaml</code></p><p>删除：<code>kubectl delete -f ns-dev.yaml</code></p><h2 id="_4-2-pod" tabindex="-1"><a class="header-anchor" href="#_4-2-pod" aria-hidden="true">#</a> 4.2 Pod</h2><p>Pod是kubernetes集群进行管理的最小单元，程序要运行必须部署在容器中，而容器必须存在于Pod中。</p><p>Pod可以认为是容器的封装，一个Pod中可以存在一个或者多个容器。</p><p><img src="`+r+`" alt="image-20200407121501907"></p><p>kubernetes在集群启动之后，集群中的各个组件也都是以Pod方式运行的。可以通过下面命令查看：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl get pod <span class="token parameter variable">-n</span> kube-system

NAMESPACE     NAME                             READY   STATUS    RESTARTS   AGE
kube-system   coredns-6955765f44-68g6v         <span class="token number">1</span>/1     Running   <span class="token number">0</span>          2d1h
kube-system   coredns-6955765f44-cs5r8         <span class="token number">1</span>/1     Running   <span class="token number">0</span>          2d1h
kube-system   etcd-master                      <span class="token number">1</span>/1     Running   <span class="token number">0</span>          2d1h
kube-system   kube-apiserver-master            <span class="token number">1</span>/1     Running   <span class="token number">0</span>          2d1h
kube-system   kube-controller-manager-master   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          2d1h
kube-system   kube-flannel-ds-amd64-47r25      <span class="token number">1</span>/1     Running   <span class="token number">0</span>          2d1h
kube-system   kube-flannel-ds-amd64-ls5lh      <span class="token number">1</span>/1     Running   <span class="token number">0</span>          2d1h
kube-system   kube-proxy-685tk                 <span class="token number">1</span>/1     Running   <span class="token number">0</span>          2d1h
kube-system   kube-proxy-87spt                 <span class="token number">1</span>/1     Running   <span class="token number">0</span>          2d1h
kube-system   kube-scheduler-master            <span class="token number">1</span>/1     Running   <span class="token number">0</span>          2d1h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-1-创建并运行" tabindex="-1"><a class="header-anchor" href="#_4-2-1-创建并运行" aria-hidden="true">#</a> 4.2.1 创建并运行</h3><p>kubernetes没有提供单独运行Pod的命令，都是通过Pod控制器来实现的</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 命令格式： kubectl run (pod控制器名称) [参数] </span>
<span class="token comment"># --image  指定Pod的镜像</span>
<span class="token comment"># --port   指定端口</span>
<span class="token comment"># --namespace  指定namespace</span>
kubectl run nginx <span class="token parameter variable">--image</span><span class="token operator">=</span>nginx:latest <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">80</span> <span class="token parameter variable">--namespace</span> dev

pod/nginx created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-2-查看pod信息" tabindex="-1"><a class="header-anchor" href="#_4-2-2-查看pod信息" aria-hidden="true">#</a> 4.2.2 查看pod信息</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看Pod基本信息</span>
kubectl get pods <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-o</span> wide

NAME    READY   STATUS    RESTARTS   AGE     IP           NODE            NOMINATED NODE   READINESS GATES
nginx   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          2m36s   <span class="token number">10.244</span>.4.8   centos7-node2   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>

<span class="token comment"># 查看Pod的详细信息</span>
kubectl describe pod nginx <span class="token parameter variable">-n</span> dev

Name:         nginx
Namespace:    dev
Priority:     <span class="token number">0</span>
Node:         centos7-node2/192.168.85.132
Start Time:   Sat, <span class="token number">30</span> Oct <span class="token number">2021</span> <span class="token number">19</span>:49:04 +0800
Labels:       <span class="token assign-left variable">run</span><span class="token operator">=</span>nginx
Annotations:  <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Status:       Running
IP:           <span class="token number">10.244</span>.4.8
IPs:
  IP:  <span class="token number">10.244</span>.4.8
Containers:
  nginx:
    Container ID:   docker://b43ffdea69838700bc2a2dcccd3f28addd1ab1480d3483c7716702f6e2be1c51
    Image:          nginx:latest
    Image ID:       docker-pullable://nginx@sha256:644a70516a26004c97d0d85c7fe1d0c3a67ea8ab7ddf4aff193d9f301670cf36
    Port:           <span class="token number">80</span>/TCP
    Host Port:      <span class="token number">0</span>/TCP
    State:          Running
      Started:      Sat, <span class="token number">30</span> Oct <span class="token number">2021</span> <span class="token number">19</span>:49:07 +0800
    Ready:          True
    Restart Count:  <span class="token number">0</span>
    Environment:    <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-f8qnf <span class="token punctuation">(</span>ro<span class="token punctuation">)</span>
Conditions:
  Type              Status
  Initialized       True 
  Ready             True 
  ContainersReady   True 
  PodScheduled      True 
Volumes:
  kube-api-access-f8qnf:
    Type:                    Projected <span class="token punctuation">(</span>a volume that contains injected data from multiple sources<span class="token punctuation">)</span>
    TokenExpirationSeconds:  <span class="token number">3607</span>
    ConfigMapName:           kube-root-ca.crt
    ConfigMapOptional:       <span class="token operator">&lt;</span>nil<span class="token operator">&gt;</span>
    DownwardAPI:             <span class="token boolean">true</span>
QoS Class:                   BestEffort
Node-Selectors:              <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Tolerations:                 node.kubernetes.io/not-ready:NoExecute <span class="token assign-left variable">op</span><span class="token operator">=</span>Exists <span class="token keyword">for</span> 300s
                             node.kubernetes.io/unreachable:NoExecute <span class="token assign-left variable">op</span><span class="token operator">=</span>Exists <span class="token keyword">for</span> 300s
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  53s   default-scheduler  Successfully assigned dev/nginx to centos7-node2
  Normal  Pulling    51s   kubelet            Pulling image <span class="token string">&quot;nginx:latest&quot;</span>
  Normal  Pulled     50s   kubelet            Successfully pulled image <span class="token string">&quot;nginx:latest&quot;</span> <span class="token keyword">in</span> <span class="token number">1</span>.57113276s
  Normal  Created    50s   kubelet            Created container nginx
  Normal  Started    50s   kubelet            Started container nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-3-访问pod" tabindex="-1"><a class="header-anchor" href="#_4-2-3-访问pod" aria-hidden="true">#</a> 4.2.3 访问Pod</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 获取podIP</span>
kubectl get pods <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-o</span> wide

NAME    READY   STATUS    RESTARTS   AGE     IP           NODE            NOMINATED NODE   READINESS GATES
nginx   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          8m39s   <span class="token number">10.244</span>.4.8   centos7-node2   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>

<span class="token comment">#访问POD</span>
<span class="token function">curl</span> http://10.244.4.8:80
 
<span class="token operator">&lt;</span><span class="token operator">!</span>DOCTYPE html<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>html<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>head<span class="token operator">&gt;</span>
	<span class="token operator">&lt;</span>title<span class="token operator">&gt;</span>Welcome to nginx<span class="token operator">!</span><span class="token operator">&lt;</span>/title<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>/head<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>body<span class="token operator">&gt;</span>
	<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span><span class="token operator">&lt;</span>em<span class="token operator">&gt;</span>Thank you <span class="token keyword">for</span> using nginx.<span class="token operator">&lt;</span>/em<span class="token operator">&gt;</span><span class="token operator">&lt;</span>/p<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>/body<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>/html<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-4-删除指定pod" tabindex="-1"><a class="header-anchor" href="#_4-2-4-删除指定pod" aria-hidden="true">#</a> 4.2.4 删除指定Pod</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 删除指定Pod</span>
kubectl delete pod nginx <span class="token parameter variable">-n</span> dev

pod <span class="token string">&quot;nginx&quot;</span> deleted

<span class="token comment"># 此时，显示删除Pod成功，但是再查询，发现又新产生了一个 </span>
kubectl get pods <span class="token parameter variable">-n</span> dev

NAME    READY   STATUS    RESTARTS   AGE
nginx   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          21s

<span class="token comment"># 这是因为当前Pod是由Pod控制器创建的，控制器会监控Pod状况，一旦发现Pod死亡，会立即重建</span>
<span class="token comment"># 此时要想删除Pod，必须删除Pod控制器</span>
<span class="token comment"># 先来查询一下当前namespace下的Pod控制器</span>
kubectl get deploy <span class="token parameter variable">-n</span>  dev

NAME    READY   UP-TO-DATE   AVAILABLE   AGE
nginx   <span class="token number">1</span>/1     <span class="token number">1</span>            <span class="token number">1</span>           9m7s

<span class="token comment"># 接下来，删除此PodPod控制器</span>
kubectl delete deploy nginx <span class="token parameter variable">-n</span> dev

deployment.apps <span class="token string">&quot;nginx&quot;</span> deleted

<span class="token comment"># 稍等片刻，再查询Pod，发现Pod被删除了</span>
kubectl get pods <span class="token parameter variable">-n</span> dev

No resources found <span class="token keyword">in</span> dev namespace.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-5-配置操作" tabindex="-1"><a class="header-anchor" href="#_4-2-5-配置操作" aria-hidden="true">#</a> 4.2.5 配置操作</h3><p>创建一个pod-nginx.yaml，内容如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>latest
    <span class="token key atrule">name</span><span class="token punctuation">:</span> pod
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>port
      <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
      <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后就可以执行对应的创建和删除命令了：</p><p>创建：<code>kubectl create -f pod-nginx.yaml</code></p><p>删除：<code>kubectl delete -f pod-nginx.yaml</code></p><h2 id="_4-3-label" tabindex="-1"><a class="header-anchor" href="#_4-3-label" aria-hidden="true">#</a> 4.3 Label</h2><p>Label是kubernetes系统中的一个重要概念。它的作用就是在资源上添加标识，用来对它们进行区分和选择。</p><p>Label的特点：</p><ul><li>一个Label会以key/value键值对的形式附加到各种对象上，如Node、Pod、Service等等</li><li>一个资源对象可以定义任意数量的Label ，同一个Label也可以被添加到任意数量的资源对象上去</li><li>Label通常在资源对象定义时确定，当然也可以在对象创建后动态添加或者删除</li></ul><p>可以通过Label实现资源的多维度分组，以便灵活、方便地进行资源分配、调度、配置、部署等管理工作。</p><blockquote><p>一些常用的Label 示例如下：</p><ul><li>版本标签：&quot;version&quot;:&quot;release&quot;, &quot;version&quot;:&quot;stable&quot;......</li><li>环境标签：&quot;environment&quot;:&quot;dev&quot;，&quot;environment&quot;:&quot;test&quot;，&quot;environment&quot;:&quot;pro&quot;</li><li>架构标签：&quot;tier&quot;:&quot;frontend&quot;，&quot;tier&quot;:&quot;backend&quot;</li></ul></blockquote><p>标签定义完毕之后，还要考虑到标签的选择，这就要使用到Label Selector，即： Label用于给某个资源对象定义标识 Label Selector用于查询和筛选拥有某些标签的资源对象</p><p>当前有两种Label Selector：</p><ul><li>基于等式的Label Selector <ul><li><code>name = slave</code>: 选择所有包含Label中key=&quot;name&quot;且value=&quot;slave&quot;的对象</li><li><code>env != production</code>: 选择所有包括Label中的key=&quot;env&quot;且value不等于&quot;production&quot;的对象</li></ul></li><li>基于集合的Label Selector <ul><li><code>name in (master, slave)</code>: 选择所有包含Label中的key=&quot;name&quot;且value=&quot;master&quot;或&quot;slave&quot;的对象</li><li><code>name not in (frontend)</code>: 选择所有包含Label中的key=&quot;name&quot;且value不等于&quot;frontend&quot;的对象</li></ul></li></ul><p>标签的选择条件可以使用多个，此时将多个Label Selector进行组合，使用逗号&quot;,&quot;进行分隔即可。例如：</p><ul><li><code>name=slave,env!=production</code></li><li><code>name not in (frontend),env!=production</code></li></ul><h3 id="_4-3-1-命令方式" tabindex="-1"><a class="header-anchor" href="#_4-3-1-命令方式" aria-hidden="true">#</a> 4.3.1 命令方式</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 为pod资源打标签</span>
kubectl label pod nginx-pod <span class="token assign-left variable">version</span><span class="token operator">=</span><span class="token number">1.0</span> <span class="token parameter variable">-n</span> dev

pod/nginx-pod labeled

<span class="token comment"># 为pod资源更新标签</span>
kubectl label pod nginx-pod <span class="token assign-left variable">version</span><span class="token operator">=</span><span class="token number">2.0</span> <span class="token parameter variable">-n</span> dev <span class="token parameter variable">--overwrite</span>

pod/nginx-pod labeled

<span class="token comment"># 查看标签</span>
kubectl get pod nginx-pod  <span class="token parameter variable">-n</span> dev --show-labels

NAME        READY   STATUS    RESTARTS   AGE   LABELS
nginx-pod   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          10m   <span class="token assign-left variable">version</span><span class="token operator">=</span><span class="token number">2.0</span>

<span class="token comment"># 筛选标签</span>
kubectl get pod <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-l</span> <span class="token assign-left variable">version</span><span class="token operator">=</span><span class="token number">2.0</span>  --show-labels

NAME        READY   STATUS    RESTARTS   AGE   LABELS
nginx-pod   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          17m   <span class="token assign-left variable">version</span><span class="token operator">=</span><span class="token number">2.0</span>

kubectl get pod <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-l</span> version<span class="token operator">!=</span><span class="token number">2.0</span> --show-labels

No resources found <span class="token keyword">in</span> dev namespace.

<span class="token comment">#删除标签</span>
kubectl label pod nginx-pod version- <span class="token parameter variable">-n</span> dev

pod/nginx-pod labeled
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-2-配置方式" tabindex="-1"><a class="header-anchor" href="#_4-3-2-配置方式" aria-hidden="true">#</a> 4.3.2 配置方式</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&quot;3.0&quot;</span> 
    <span class="token key atrule">env</span><span class="token punctuation">:</span> <span class="token string">&quot;test&quot;</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>latest
    <span class="token key atrule">name</span><span class="token punctuation">:</span> pod
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>port
      <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
      <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后就可以执行对应的更新命令了：<code>kubectl apply -f pod-nginx.yaml</code></p><h2 id="_4-4-deployment" tabindex="-1"><a class="header-anchor" href="#_4-4-deployment" aria-hidden="true">#</a> 4.4 Deployment</h2><p>在kubernetes中，Pod是最小的控制单元，但是kubernetes很少直接控制Pod，一般都是通过Pod控制器来完成的。Pod控制器用于pod的管理，确保pod资源符合预期的状态，当pod的资源出现故障时，会尝试进行重启或重建pod。</p><p>在kubernetes中Pod控制器的种类有很多，本章节只介绍一种：Deployment。</p><p><img src="`+d+`" alt="image-20200408193950807"></p><h3 id="_4-4-1-命令操作" tabindex="-1"><a class="header-anchor" href="#_4-4-1-命令操作" aria-hidden="true">#</a> 4.4.1 命令操作</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 命令格式: kubectl create deployment 名称  [参数] </span>
<span class="token comment"># --image  指定pod的镜像</span>
<span class="token comment"># --port   指定端口</span>
<span class="token comment"># --replicas  指定创建pod数量</span>
<span class="token comment"># --namespace  指定namespace</span>
kubectl create deployment nginx <span class="token parameter variable">--image</span><span class="token operator">=</span>nginx:latest <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">80</span> <span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">3</span> <span class="token parameter variable">-n</span> dev

deployment.apps/nginx created

<span class="token comment"># 查看创建的Pod</span>
kubectl get pods <span class="token parameter variable">-n</span> dev

NAME                     READY   STATUS    RESTARTS   AGE
nginx-5ff7956ff6-6k8cb   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          19s
nginx-5ff7956ff6-jxfjt   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          19s
nginx-5ff7956ff6-v6jqw   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          19s

<span class="token comment"># 查看deployment的信息</span>
kubectl get deploy <span class="token parameter variable">-n</span> dev

NAME    READY   UP-TO-DATE   AVAILABLE   AGE
nginx   <span class="token number">3</span>/3     <span class="token number">3</span>            <span class="token number">3</span>           2m42s

<span class="token comment"># UP-TO-DATE：成功升级的副本数量</span>
<span class="token comment"># AVAILABLE：可用副本的数量</span>
kubectl get deploy <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-o</span> wide

NAME    READY UP-TO-DATE  AVAILABLE   AGE     CONTAINERS   IMAGES              SELECTOR
nginx   <span class="token number">3</span>/3     <span class="token number">3</span>         <span class="token number">3</span>           2m51s   nginx        nginx:latest        <span class="token assign-left variable">app</span><span class="token operator">=</span>nginx

<span class="token comment"># 查看deployment的详细信息</span>
kubectl describe deploy nginx <span class="token parameter variable">-n</span> dev

Name:                   nginx
Namespace:              dev
CreationTimestamp:      Wed, 08 May <span class="token number">2021</span> <span class="token number">11</span>:14:14 +0800
Labels:                 <span class="token assign-left variable">run</span><span class="token operator">=</span>nginx
Annotations:            deployment.kubernetes.io/revision: <span class="token number">1</span>
Selector:               <span class="token assign-left variable">run</span><span class="token operator">=</span>nginx
Replicas:               <span class="token number">3</span> desired <span class="token operator">|</span> <span class="token number">3</span> updated <span class="token operator">|</span> <span class="token number">3</span> total <span class="token operator">|</span> <span class="token number">3</span> available <span class="token operator">|</span> <span class="token number">0</span> unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        <span class="token number">0</span>
RollingUpdateStrategy:  <span class="token number">25</span>% max unavailable, <span class="token number">25</span>% max surge
Pod Template:
  Labels:  <span class="token assign-left variable">run</span><span class="token operator">=</span>nginx
  Containers:
   nginx:
    Image:        nginx:latest
    Port:         <span class="token number">80</span>/TCP
    Host Port:    <span class="token number">0</span>/TCP
    Environment:  <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
    Mounts:       <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
  Volumes:        <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Available      True    MinimumReplicasAvailable
  Progressing    True    NewReplicaSetAvailable
OldReplicaSets:  <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
NewReplicaSet:   nginx-5ff7956ff6 <span class="token punctuation">(</span><span class="token number">3</span>/3 replicas created<span class="token punctuation">)</span>
Events:
  Type    Reason             Age    From                   Message
  ----    ------             ----   ----                   -------
  Normal  ScalingReplicaSet  5m43s  deployment-controller  Scaled up replicaset nginx-5ff7956ff6 to <span class="token number">3</span>
  
<span class="token comment"># 删除 </span>
kubectl delete deploy nginx <span class="token parameter variable">-n</span> dev

deployment.apps <span class="token string">&quot;nginx&quot;</span> deleted
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-2-配置操作" tabindex="-1"><a class="header-anchor" href="#_4-4-2-配置操作" aria-hidden="true">#</a> 4.4.2 配置操作</h3><p>创建一个deploy-nginx.yaml，内容如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">run</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">run</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>latest
        <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
          <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后就可以执行对应的创建和删除命令了：</p><p>创建：<code>kubectl create -f deploy-nginx.yaml</code></p><p>删除：<code>kubectl delete -f deploy-nginx.yaml</code></p><h2 id="_4-5-service" tabindex="-1"><a class="header-anchor" href="#_4-5-service" aria-hidden="true">#</a> 4.5 Service</h2><p>通过上节课的学习，已经能够利用Deployment来创建一组Pod来提供具有高可用性的服务。</p><p>虽然每个Pod都会分配一个单独的Pod IP，然而却存在如下两问题：</p><ul><li>Pod IP 会随着Pod的重建产生变化</li><li>Pod IP 仅仅是集群内可见的虚拟IP，外部无法访问</li></ul><p>这样对于访问这个服务带来了难度。因此，kubernetes设计了Service来解决这个问题。</p><p>Service可以看作是一组同类Pod<strong>对外的访问接口</strong>。借助Service，应用可以方便地实现服务发现和负载均衡。</p><p><img src="`+u+`" alt="image-20200408194716912"></p><h3 id="_4-5-1-创建集群内部可访问的service" tabindex="-1"><a class="header-anchor" href="#_4-5-1-创建集群内部可访问的service" aria-hidden="true">#</a> 4.5.1 创建集群内部可访问的Service</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 暴露Service</span>
kubectl expose deploy nginx <span class="token parameter variable">--name</span><span class="token operator">=</span>svc-nginx1 <span class="token parameter variable">--type</span><span class="token operator">=</span>ClusterIP <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">80</span> --target-port<span class="token operator">=</span><span class="token number">80</span> <span class="token parameter variable">-n</span> dev

service/svc-nginx1 exposed

<span class="token comment"># 查看service</span>
kubectl get svc svc-nginx1 <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-o</span> wide

NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>   AGE   SELECTOR
svc-nginx1   ClusterIP   <span class="token number">10.110</span>.89.103   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">80</span>/TCP    24s   <span class="token assign-left variable">run</span><span class="token operator">=</span>nginx

<span class="token comment"># 这里产生了一个CLUSTER-IP，这就是service的IP，在Service的生命周期中，这个地址是不会变动的</span>
<span class="token comment"># 可以通过这个IP访问当前service对应的POD</span>
<span class="token function">curl</span> <span class="token number">10.110</span>.89.103:80

<span class="token operator">&lt;</span><span class="token operator">!</span>DOCTYPE html<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>html<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>head<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>title<span class="token operator">&gt;</span>Welcome to nginx<span class="token operator">!</span><span class="token operator">&lt;</span>/title<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>/head<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>body<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>h<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span>Welcome to nginx<span class="token operator">!</span><span class="token operator">&lt;</span>/h<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span>
<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>.
<span class="token operator">&lt;</span>/body<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>/html<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-5-2-创建集群外部也可访问的service" tabindex="-1"><a class="header-anchor" href="#_4-5-2-创建集群外部也可访问的service" aria-hidden="true">#</a> 4.5.2 创建集群外部也可访问的Service</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 上面创建的Service的type类型为ClusterIP，这个ip地址只用集群内部可访问</span>
<span class="token comment"># 如果需要创建外部也可以访问的Service，需要修改type为NodePort</span>
kubectl expose deploy nginx <span class="token parameter variable">--name</span><span class="token operator">=</span>svc-nginx2 <span class="token parameter variable">--type</span><span class="token operator">=</span>NodePort <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">80</span> --target-port<span class="token operator">=</span><span class="token number">80</span> <span class="token parameter variable">-n</span> dev

service/svc-nginx2 exposed

<span class="token comment"># 此时查看，会发现出现了NodePort类型的Service，而且有一对Port（80:30871/TC）</span>
kubectl get svc  svc-nginx2  <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-o</span> wide

NAME         TYPE       CLUSTER-IP     EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>        AGE   SELECTOR
svc-nginx2   NodePort   <span class="token number">10.96</span>.250.54   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">80</span>:30871/TCP   10s   <span class="token assign-left variable">run</span><span class="token operator">=</span>nginx


<span class="token comment"># 接下来就可以通过集群外的主机访问 节点IP:30871访问服务了</span>
<span class="token comment"># 例如在的电脑主机上通过浏览器访问下面的地址</span>
http://192.168.85.131:30871
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-5-3-删除service" tabindex="-1"><a class="header-anchor" href="#_4-5-3-删除service" aria-hidden="true">#</a> 4.5.3 删除Service</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl delete svc svc-nginx-1 <span class="token parameter variable">-n</span> dev 

<span class="token function">service</span> <span class="token string">&quot;svc-nginx-1&quot;</span> deleted
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-5-4-配置方式" tabindex="-1"><a class="header-anchor" href="#_4-5-4-配置方式" aria-hidden="true">#</a> 4.5.4 配置方式</h3><p>创建一个svc-nginx.yaml，内容如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> svc<span class="token punctuation">-</span>nginx
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">clusterIP</span><span class="token punctuation">:</span> 10.109.179.231 <span class="token comment">#固定svc的内网ip</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">run</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后就可以执行对应的创建和删除命令了：</p><p>创建：<code>kubectl create -f svc-nginx.yaml</code></p><p>删除：<code>kubectl delete -f svc-nginx.yaml</code></p><blockquote><p><strong>小结</strong></p><p>至此，已经掌握了Namespace、Pod、Deployment、Service资源的基本操作，有了这些操作，就可以在kubernetes集群中实现一个服务的简单部署和访问了，但是如果想要更好的使用kubernetes，就需要深入学习这几种资源的细节和原理。</p></blockquote>`,91);function g(h,y){const e=i("ExternalLinkIcon");return t(),p("div",null,[n("p",null,[n("a",m,[s("原文链接"),a(e)]),s(),n("a",b,[s("视频教程"),a(e)])]),k])}const f=l(v,[["render",g],["__file","k8s-resources-example.html.vue"]]);export{f as default};
