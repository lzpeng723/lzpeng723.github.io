import{_ as l,r as i,o as t,c as p,b as n,d as s,e,a as c}from"./app-m_Ib8w5j.js";const o="/assets/image-20200413174713773-tea73h96.png",u="/assets/image-20200413214031331-j7w9Y2bM.png",d="/assets/image-20200413215133559-CoBEuTb1.png",r="/assets/image-20200514194111567-3ie_1UVp.png",v="/assets/image-20200515002806726-7S2BTZ__.png",m={},k={href:"https://gitee.com/yooome/golang/blob/main/k8s%E8%AF%A6%E7%BB%86%E6%95%99%E7%A8%8B/Kubernetes%E8%AF%A6%E7%BB%86%E6%95%99%E7%A8%8B.md#8-%E6%95%B0%E6%8D%AE%E5%AD%98%E5%82%A8",target:"_blank",rel:"noopener noreferrer"},b={href:"https://www.bilibili.com/video/BV1Qv41167ck?p=70",target:"_blank",rel:"noopener noreferrer"},y=c('<h1 id="_8-数据存储" tabindex="-1"><a class="header-anchor" href="#_8-数据存储" aria-hidden="true">#</a> 8. 数据存储</h1><p>在前面已经提到，容器的生命周期可能很短，会被频繁地创建和销毁。那么容器在销毁时，保存在容器中的数据也会被清除。这种结果对用户来说，在某些情况下是不乐意看到的。为了持久化保存容器的数据，kubernetes引入了Volume的概念。</p><p>Volume是Pod中能够被多个容器访问的共享目录，它被定义在Pod上，然后被一个Pod里的多个容器挂载到具体的文件目录下，kubernetes通过Volume实现同一个Pod中不同容器之间的数据共享以及数据的持久化存储。Volume的生命容器不与Pod中单个容器的生命周期相关，当容器终止或者重启时，Volume中的数据也不会丢失。</p><p>kubernetes的Volume支持多种类型，比较常见的有下面几个：</p><ul><li>简单存储：EmptyDir、HostPath、NFS</li><li>高级存储：PV、PVC</li><li>配置存储：ConfigMap、Secret</li></ul><h2 id="_8-1-基本存储" tabindex="-1"><a class="header-anchor" href="#_8-1-基本存储" aria-hidden="true">#</a> 8.1 基本存储</h2><h3 id="_8-1-1-emptydir" tabindex="-1"><a class="header-anchor" href="#_8-1-1-emptydir" aria-hidden="true">#</a> 8.1.1 EmptyDir</h3><p>EmptyDir是最基础的Volume类型，一个EmptyDir就是Host上的一个空目录。</p><p>EmptyDir是在Pod被分配到Node时创建的，它的初始内容为空，并且无须指定宿主机上对应的目录文件，因为kubernetes会自动分配一个目录，当Pod销毁时， EmptyDir中的数据也会被永久删除。 EmptyDir用途如下：</p><ul><li>临时空间，例如用于某些应用程序运行时所需的临时目录，且无须永久保留</li><li>一个容器需要从另一个容器中获取数据的目录（多容器共享目录）</li></ul><p>接下来，通过一个容器之间文件共享的案例来使用一下EmptyDir。</p><p>在一个Pod中准备两个容器nginx和busybox，然后声明一个Volume分别挂在到两个容器的目录中，然后nginx容器负责向Volume中写日志，busybox中通过命令将日志内容读到控制台。</p><p><img src="'+o+`" alt="img"></p><p>创建一个volume-emptydir.yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> volume<span class="token punctuation">-</span>emptydir
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>  <span class="token comment"># 将logs-volume挂在到nginx容器中，对应的目录为 /var/log/nginx</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> logs<span class="token punctuation">-</span>volume
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/log/nginx
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> busybox
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox<span class="token punctuation">:</span><span class="token number">1.30</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;tail -f /logs/access.log&quot;</span><span class="token punctuation">]</span> <span class="token comment"># 初始命令，动态读取指定文件中内容</span>
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>  <span class="token comment"># 将logs-volume 挂在到busybox容器中，对应的目录为 /logs</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> logs<span class="token punctuation">-</span>volume
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /logs
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span> <span class="token comment"># 声明volume， name为logs-volume，类型为emptyDir</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> logs<span class="token punctuation">-</span>volume
    <span class="token key atrule">emptyDir</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建Pod</span>
kubectl create <span class="token parameter variable">-f</span> volume-emptydir.yaml

pod/volume-emptydir created

<span class="token comment"># 查看pod</span>
kubectl get pods volume-emptydir <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-o</span> wide

NAME                  READY   STATUS    RESTARTS   AGE      IP         NODE   <span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span> 
volume-emptydir       <span class="token number">2</span>/2     Running   <span class="token number">0</span>          97s   <span class="token number">10.244</span>.1.25   node1  <span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>

<span class="token comment"># 通过podIp访问nginx</span>
<span class="token function">curl</span> <span class="token number">10.244</span>.1.25
<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>

<span class="token comment"># 通过kubectl logs命令查看指定容器的标准输出</span>
kubectl logs <span class="token parameter variable">-f</span> volume-emptydir <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-c</span> busybox

<span class="token number">10.244</span>.0.0 - - <span class="token punctuation">[</span>02/Nov/2021:12:25:31 +0000<span class="token punctuation">]</span> <span class="token string">&quot;GET / HTTP/1.1&quot;</span> <span class="token number">200</span> <span class="token number">612</span> <span class="token string">&quot;-&quot;</span> <span class="token string">&quot;curl/7.29.0&quot;</span> <span class="token string">&quot;-&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-1-2-hostpath" tabindex="-1"><a class="header-anchor" href="#_8-1-2-hostpath" aria-hidden="true">#</a> 8.1.2 HostPath</h3><p>上节课提到，EmptyDir中数据不会被持久化，它会随着Pod的结束而销毁，如果想简单的将数据持久化到主机中，可以选择HostPath。</p><p>HostPath就是将Node主机中一个实际目录挂在到Pod中，以供容器使用，这样的设计就可以保证Pod销毁了，但是数据依据可以存在于Node主机上。</p><p><img src="`+u+`" alt="img"></p><p>创建一个volume-hostpath.yaml：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> volume<span class="token punctuation">-</span>hostpath
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> logs<span class="token punctuation">-</span>volume
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/log/nginx
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> busybox
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox<span class="token punctuation">:</span><span class="token number">1.30</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;tail -f /logs/access.log&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> logs<span class="token punctuation">-</span>volume
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /logs
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> logs<span class="token punctuation">-</span>volume
    <span class="token key atrule">hostPath</span><span class="token punctuation">:</span> 
      <span class="token key atrule">path</span><span class="token punctuation">:</span> /root/logs
      <span class="token key atrule">type</span><span class="token punctuation">:</span> DirectoryOrCreate  <span class="token comment"># 目录存在就使用，不存在就先创建后使用</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>关于type的值的一点说明： DirectoryOrCreate 目录存在就使用，不存在就先创建后使用 Directory 目录必须存在 FileOrCreate 文件存在就使用，不存在就先创建后使用 File 文件必须存在 Socket unix套接字必须存在 CharDevice 字符设备必须存在 BlockDevice 块设备必须存在</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建Pod</span>
kubectl create <span class="token parameter variable">-f</span> volume-hostpath.yaml

pod/volume-hostpath created

<span class="token comment"># 查看Pod</span>
kubectl get pods volume-hostpath <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-o</span> wide

NAME                  READY   STATUS    RESTARTS   AGE   IP              NODE           <span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
pod-volume-hostpath   <span class="token number">2</span>/2     Running   <span class="token number">0</span>          16s   <span class="token number">10.244</span>.4.31     CentOS7-Node2  <span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>

<span class="token comment">#访问nginx</span>
<span class="token function">curl</span> <span class="token number">10.244</span>.4.31

<span class="token comment"># 查看访问日志</span>
kubectl logs <span class="token parameter variable">-f</span> volume-hostpath <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-c</span> busybox

<span class="token comment"># 接下来就可以去host的/root/logs目录下查看存储的文件了</span>
<span class="token comment">###  注意: 下面的操作需要到Pod所在的节点运行（案例中是CentOS7-Node2）</span>
<span class="token function">ls</span> /root/logs/

access.log  error.log

<span class="token comment"># 同样的道理，如果在此目录下创建一个文件，到容器中也是可以看到的</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-1-3-nfs" tabindex="-1"><a class="header-anchor" href="#_8-1-3-nfs" aria-hidden="true">#</a> 8.1.3 NFS</h3><p>HostPath可以解决数据持久化的问题，但是一旦Node节点故障了，Pod如果转移到了别的节点，又会出现问题了，此时需要准备单独的网络存储系统，比较常用的用NFS、CIFS。</p><p>NFS是一个网络文件存储系统，可以搭建一台NFS服务器，然后将Pod中的存储直接连接到NFS系统上，这样的话，无论Pod在节点上怎么转移，只要Node跟NFS的对接没问题，数据就可以成功访问。</p><p><img src="`+d+`" alt="img"></p><p>1）首先要准备nfs的服务器，这里为了简单，直接是master节点做nfs服务器</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 在nfs上安装nfs服务</span>
yum <span class="token function">install</span> nfs-utils <span class="token parameter variable">-y</span>

<span class="token comment"># 准备一个共享目录</span>
<span class="token function">mkdir</span> /root/data/nfs <span class="token parameter variable">-pv</span>

<span class="token comment"># 将共享目录以读写权限暴露给192.168.85.0/24网段中的所有主机</span>
<span class="token function">vim</span> /etc/exports
<span class="token function">more</span> /etc/exports

/root/data/nfs     <span class="token number">192.168</span>.85.0/24<span class="token punctuation">(</span>rw,no_root_squash<span class="token punctuation">)</span>

<span class="token comment"># 启动nfs服务</span>
systemctl restart nfs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2）接下来，要在的每个node节点上都安装下nfs，这样的目的是为了node节点可以驱动nfs设备</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 在node上安装nfs服务，注意不需要启动</span>
yum <span class="token function">install</span> nfs-utils <span class="token parameter variable">-y</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>3）接下来，就可以编写pod的配置文件了，创建volume-nfs.yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> volume<span class="token punctuation">-</span>nfs
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> logs<span class="token punctuation">-</span>volume
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/log/nginx
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> busybox
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox<span class="token punctuation">:</span><span class="token number">1.30</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;tail -f /logs/access.log&quot;</span><span class="token punctuation">]</span> 
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> logs<span class="token punctuation">-</span>volume
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /logs
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> logs<span class="token punctuation">-</span>volume
    <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
      <span class="token key atrule">server</span><span class="token punctuation">:</span> 192.168.85.130  <span class="token comment">#nfs服务器地址</span>
      <span class="token key atrule">path</span><span class="token punctuation">:</span> /root/data/nfs <span class="token comment">#共享文件路径</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4）最后，运行下pod，观察结果</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建pod</span>
kubectl create <span class="token parameter variable">-f</span> volume-nfs.yaml

pod/volume-nfs created

<span class="token comment"># 查看pod</span>
kubectl get pods volume-nfs <span class="token parameter variable">-n</span> dev

NAME              READY   STATUS    RESTARTS   AGE
volume-nfs        <span class="token number">2</span>/2     Running   <span class="token number">0</span>          2m9s

<span class="token comment"># 查看nfs服务器上的共享目录，发现已经有文件了</span>
<span class="token function">ls</span> /root/data/nfs

access.log  error.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-2-高级存储" tabindex="-1"><a class="header-anchor" href="#_8-2-高级存储" aria-hidden="true">#</a> 8.2 高级存储</h2><p>前面已经学习了使用NFS提供存储，此时就要求用户会搭建NFS系统，并且会在yaml配置nfs。由于kubernetes支持的存储系统有很多，要求客户全都掌握，显然不现实。为了能够屏蔽底层存储实现的细节，方便用户使用， kubernetes引入PV和PVC两种资源对象。</p><ul><li><p>PV（Persistent Volume）是持久化卷的意思，是对底层的共享存储的一种抽象。一般情况下PV由kubernetes管理员进行创建和配置，它与底层具体的共享存储技术有关，并通过插件完成与共享存储的对接。</p></li><li><p>PVC（Persistent Volume Claim）是持久卷声明的意思，是用户对于存储需求的一种声明。换句话说，PVC其实就是用户向kubernetes系统发出的一种资源需求申请。</p></li></ul><p><img src="`+r+`" alt="img"></p><p>使用了PV和PVC之后，工作可以得到进一步的细分：</p><ul><li>存储：存储工程师维护</li><li>PV： kubernetes管理员维护</li><li>PVC：kubernetes用户维护</li></ul><h3 id="_8-2-1-pv" tabindex="-1"><a class="header-anchor" href="#_8-2-1-pv" aria-hidden="true">#</a> 8.2.1 PV</h3><p>PV是存储资源的抽象，下面是资源清单文件:</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1  
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pv2
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span> <span class="token comment"># 存储类型，与底层真正存储对应</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span>  <span class="token comment"># 存储能力，目前只支持存储空间的设置</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 2Gi
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>  <span class="token comment"># 访问模式</span>
  <span class="token key atrule">storageClassName</span><span class="token punctuation">:</span> <span class="token comment"># 存储类别</span>
  <span class="token key atrule">persistentVolumeReclaimPolicy</span><span class="token punctuation">:</span> <span class="token comment"># 回收策略</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>PV 的关键配置参数说明：</p><ul><li><p><strong>存储类型</strong></p><p>底层实际存储的类型，kubernetes支持多种存储类型，每种存储类型的配置都有所差异</p></li><li><p><strong>存储能力（capacity）</strong></p></li></ul><p>目前只支持存储空间的设置( storage=1Gi )，不过未来可能会加入IOPS、吞吐量等指标的配置</p><ul><li><p><strong>访问模式（accessModes）</strong></p><p>用于描述用户应用对存储资源的访问权限，访问权限包括下面几种方式：</p><ul><li>ReadWriteOnce（RWO）：读写权限，但是只能被单个节点挂载</li><li>ReadOnlyMany（ROX）： 只读权限，可以被多个节点挂载</li><li>ReadWriteMany（RWX）：读写权限，可以被多个节点挂载</li></ul><p><code>需要注意的是，底层不同的存储类型可能支持的访问模式不同</code></p></li><li><p><strong>回收策略（persistentVolumeReclaimPolicy）</strong></p><p>当PV不再被使用了之后，对其的处理方式。目前支持三种策略：</p><ul><li>Retain （保留） 保留数据，需要管理员手工清理数据</li><li>Recycle（回收） 清除 PV 中的数据，效果相当于执行 rm -rf /thevolume/*</li><li>Delete （删除） 与 PV 相连的后端存储完成 volume 的删除操作，当然这常见于云服务商的存储服务</li></ul><p><code>需要注意的是，底层不同的存储类型可能支持的回收策略不同</code></p></li><li><p><strong>存储类别</strong></p><p>PV可以通过storageClassName参数指定一个存储类别</p><ul><li>具有特定类别的PV只能与请求了该类别的PVC进行绑定</li><li>未设定类别的PV则只能与不请求任何类别的PVC进行绑定</li></ul></li><li><p><strong>状态（status）</strong></p><p>一个 PV 的生命周期中，可能会处于4中不同的阶段：</p><ul><li>Available（可用）： 表示可用状态，还未被任何 PVC 绑定</li><li>Bound（已绑定）： 表示 PV 已经被 PVC 绑定</li><li>Released（已释放）： 表示 PVC 被删除，但是资源还未被集群重新声明</li><li>Failed（失败）： 表示该 PV 的自动回收失败</li></ul></li></ul><p><strong>实验</strong></p><p>使用NFS作为存储，来演示PV的使用，创建3个PV，对应NFS中的3个暴露的路径。</p><ol><li>准备NFS环境</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建目录</span>
<span class="token function">mkdir</span> /root/data/<span class="token punctuation">{</span>pv1,pv2,pv3<span class="token punctuation">}</span> <span class="token parameter variable">-pv</span>

<span class="token comment"># 暴露服务</span>
<span class="token function">more</span> /etc/exports

/root/data/pv1     <span class="token number">192.168</span>.85.0/24<span class="token punctuation">(</span>rw,no_root_squash<span class="token punctuation">)</span>
/root/data/pv2     <span class="token number">192.168</span>.85.0/24<span class="token punctuation">(</span>rw,no_root_squash<span class="token punctuation">)</span>
/root/data/pv3     <span class="token number">192.168</span>.85.0/24<span class="token punctuation">(</span>rw,no_root_squash<span class="token punctuation">)</span>

<span class="token comment"># 重启服务</span>
systemctl restart nfs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>创建pv.yaml</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span>  pv1
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span> 
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 1Gi
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> ReadWriteMany
  <span class="token key atrule">persistentVolumeReclaimPolicy</span><span class="token punctuation">:</span> Retain
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
    <span class="token key atrule">path</span><span class="token punctuation">:</span> /root/data/pv1
    <span class="token key atrule">server</span><span class="token punctuation">:</span> 192.168.85.130

<span class="token punctuation">---</span>

<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span>  pv2
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span> 
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 2Gi
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> ReadWriteMany
  <span class="token key atrule">persistentVolumeReclaimPolicy</span><span class="token punctuation">:</span> Retain
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
    <span class="token key atrule">path</span><span class="token punctuation">:</span> /root/data/pv2
    <span class="token key atrule">server</span><span class="token punctuation">:</span> 192.168.85.130
    
<span class="token punctuation">---</span>

<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span>  pv3
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span> 
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 3Gi
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> ReadWriteMany
  <span class="token key atrule">persistentVolumeReclaimPolicy</span><span class="token punctuation">:</span> Retain
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
    <span class="token key atrule">path</span><span class="token punctuation">:</span> /root/data/pv3
    <span class="token key atrule">server</span><span class="token punctuation">:</span> 192.168.85.130
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建 pv</span>
kubectl create <span class="token parameter variable">-f</span> pv.yaml

persistentvolume/pv1 created
persistentvolume/pv2 created
persistentvolume/pv3 created

<span class="token comment"># 查看pv</span>
kubectl get <span class="token function">pv</span> <span class="token parameter variable">-o</span> wide

NAME   CAPACITY   ACCESS MODES  RECLAIM POLICY  STATUS      AGE   VOLUMEMODE
pv1    1Gi        RWX            Retain        Available    10s   Filesystem
pv2    2Gi        RWX            Retain        Available    10s   Filesystem
pv3    3Gi        RWX            Retain        Available    9s    Filesystem
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-2-2-pvc" tabindex="-1"><a class="header-anchor" href="#_8-2-2-pvc" aria-hidden="true">#</a> 8.2.2 PVC</h3><p>PVC是资源的申请，用来声明对存储空间、访问模式、存储类别需求信息。下面是资源清单文件:</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolumeClaim
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pvc
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span> <span class="token comment"># 访问模式</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span> <span class="token comment"># 采用标签对PV选择</span>
  <span class="token key atrule">storageClassName</span><span class="token punctuation">:</span> <span class="token comment"># 存储类别</span>
  <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token comment"># 请求空间</span>
    <span class="token key atrule">requests</span><span class="token punctuation">:</span>
      <span class="token key atrule">storage</span><span class="token punctuation">:</span> 5Gi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>PVC 的关键配置参数说明：</p><ul><li><strong>访问模式（accessModes）</strong></li></ul><p>用于描述用户应用对存储资源的访问权限</p><ul><li><p><strong>选择条件（selector）</strong></p><p>通过Label Selector的设置，可使PVC对于系统中己存在的PV进行筛选</p></li><li><p><strong>存储类别（storageClassName）</strong></p><p>PVC在定义时可以设定需要的后端存储的类别，只有设置了该class的pv才能被系统选出</p></li><li><p><strong>资源请求（Resources ）</strong></p><p>描述对存储资源的请求</p></li></ul><p><strong>实验</strong></p><ol><li>创建pvc.yaml，申请pv</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolumeClaim
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pvc1
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span> 
  <span class="token punctuation">-</span> ReadWriteMany
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
    <span class="token key atrule">requests</span><span class="token punctuation">:</span>
      <span class="token key atrule">storage</span><span class="token punctuation">:</span> 1Gi
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolumeClaim
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pvc2
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span> 
  <span class="token punctuation">-</span> ReadWriteMany
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
    <span class="token key atrule">requests</span><span class="token punctuation">:</span>
      <span class="token key atrule">storage</span><span class="token punctuation">:</span> 1Gi
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolumeClaim
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pvc3
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span> 
  <span class="token punctuation">-</span> ReadWriteMany
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
    <span class="token key atrule">requests</span><span class="token punctuation">:</span>
      <span class="token key atrule">storage</span><span class="token punctuation">:</span> 1Gi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建pvc</span>
kubectl create <span class="token parameter variable">-f</span> pvc.yaml

persistentvolumeclaim/pvc1 created
persistentvolumeclaim/pvc2 created
persistentvolumeclaim/pvc3 created

<span class="token comment"># 查看pvc</span>
kubectl get pvc  <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-o</span> wide

NAME   STATUS   VOLUME   CAPACITY   ACCESS MODES   STORAGECLASS   AGE   VOLUMEMODE
pvc1   Bound    pv1      1Gi        RWX                           15s   Filesystem
pvc2   Bound    pv2      2Gi        RWX                           15s   Filesystem
pvc3   Bound    pv3      3Gi        RWX                           15s   Filesystem

<span class="token comment"># 查看pv</span>
kubectl get <span class="token function">pv</span> <span class="token parameter variable">-o</span> wide

NAME  CAPACITY ACCESS MODES  RECLAIM POLICY  STATUS    CLAIM       AGE     VOLUMEMODE
pv1    1Gi        RWx        Retain          Bound    dev/pvc1    3h37m    Filesystem
pv2    2Gi        RWX        Retain          Bound    dev/pvc2    3h37m    Filesystem
pv3    3Gi        RWX        Retain          Bound    dev/pvc3    3h37m    Filesystem   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>创建pods.yaml, 使用pv</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod1
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> busybox
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox<span class="token punctuation">:</span><span class="token number">1.30</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;while true;do echo pod1 &gt;&gt; /root/out.txt; sleep 10; done;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> volume
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /root/
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> volume
      <span class="token key atrule">persistentVolumeClaim</span><span class="token punctuation">:</span>
        <span class="token key atrule">claimName</span><span class="token punctuation">:</span> pvc1
        <span class="token key atrule">readOnly</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod2
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> busybox
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox<span class="token punctuation">:</span><span class="token number">1.30</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;while true;do echo pod2 &gt;&gt; /root/out.txt; sleep 10; done;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> volume
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /root/
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> volume
      <span class="token key atrule">persistentVolumeClaim</span><span class="token punctuation">:</span>
        <span class="token key atrule">claimName</span><span class="token punctuation">:</span> pvc2
        <span class="token key atrule">readOnly</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建pod</span>
kubectl create <span class="token parameter variable">-f</span> pods.yaml

pod/pod1 created
pod/pod2 created

<span class="token comment"># 查看pod</span>
kubectl get pods <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-o</span> wide

NAME   READY   STATUS    RESTARTS   AGE   IP            NODE   
pod1   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          14s   <span class="token number">10.244</span>.1.69   node1   
pod2   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          14s   <span class="token number">10.244</span>.1.70   node1  

<span class="token comment"># 查看pvc</span>
kubectl get pvc <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-o</span> wide

NAME   STATUS   VOLUME   CAPACITY   ACCESS MODES      AGE   VOLUMEMODE
pvc1   Bound    pv1      1Gi        RWX               94m   Filesystem
pvc2   Bound    pv2      2Gi        RWX               94m   Filesystem
pvc3   Bound    pv3      3Gi        RWX               94m   Filesystem

<span class="token comment"># 查看pv</span>
kubectl get <span class="token function">pv</span> <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-o</span> wide

NAME   CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM       AGE     VOLUMEMODE
pv1    1Gi        RWX            Retain           Bound    dev/pvc1    5h11m   Filesystem
pv2    2Gi        RWX            Retain           Bound    dev/pvc2    5h11m   Filesystem
pv3    3Gi        RWX            Retain           Bound    dev/pvc3    5h11m   Filesystem

<span class="token comment"># 查看nfs中的文件存储</span>
<span class="token function">more</span> /root/data/pv1/out.txt

node1
node1

<span class="token function">more</span> /root/data/pv2/out.txt

node2
node2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-2-3-生命周期" tabindex="-1"><a class="header-anchor" href="#_8-2-3-生命周期" aria-hidden="true">#</a> 8.2.3 生命周期</h3><p>PVC和PV是一一对应的，PV和PVC之间的相互作用遵循以下生命周期：</p><ul><li><p><strong>资源供应</strong>：管理员手动创建底层存储和PV</p></li><li><p><strong>资源绑定</strong>：用户创建PVC，kubernetes负责根据PVC的声明去寻找PV，并绑定</p><p>在用户定义好PVC之后，系统将根据PVC对存储资源的请求在已存在的PV中选择一个满足条件的</p><ul><li>一旦找到，就将该PV与用户定义的PVC进行绑定，用户的应用就可以使用这个PVC了</li><li>如果找不到，PVC则会无限期处于Pending状态，直到等到系统管理员创建了一个符合其要求的PV</li></ul><p>PV一旦绑定到某个PVC上，就会被这个PVC独占，不能再与其他PVC进行绑定了</p></li><li><p><strong>资源使用</strong>：用户可在pod中像volume一样使用pvc</p><p>Pod使用Volume的定义，将PVC挂载到容器内的某个路径进行使用。</p></li><li><p><strong>资源释放</strong>：用户删除pvc来释放pv</p><p>当存储资源使用完毕后，用户可以删除PVC，与该PVC绑定的PV将会被标记为“已释放”，但还不能立刻与其他PVC进行绑定。通过之前PVC写入的数据可能还被留在存储设备上，只有在清除之后该PV才能再次使用。</p></li><li><p><strong>资源回收</strong>：kubernetes根据pv设置的回收策略进行资源的回收</p><p>对于PV，管理员可以设定回收策略，用于设置与之绑定的PVC释放资源之后如何处理遗留数据的问题。只有PV的存储空间完成回收，才能供新的PVC绑定和使用</p></li></ul><p><img src="`+v+`" alt="img"></p><h2 id="_8-3-配置存储" tabindex="-1"><a class="header-anchor" href="#_8-3-配置存储" aria-hidden="true">#</a> 8.3 配置存储</h2><h3 id="_8-3-1-configmap" tabindex="-1"><a class="header-anchor" href="#_8-3-1-configmap" aria-hidden="true">#</a> 8.3.1 ConfigMap</h3><p>ConfigMap是一种比较特殊的存储卷，它的主要作用是用来存储配置信息的。</p><p>创建configmap.yaml，内容如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> configmap
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">info</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
    username: admin
    password: 123456</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，使用此配置文件创建configmap</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建configmap</span>
kubectl create <span class="token parameter variable">-f</span> configmap.yaml

configmap/configmap created

<span class="token comment"># 查看configmap详情</span>
kubectl describe cm configmap <span class="token parameter variable">-n</span> dev

Name:         configmap
Namespace:    dev
Labels:       <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Annotations:  <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>

Data
<span class="token operator">==</span><span class="token operator">==</span>
info:
----
username: admin
password: <span class="token number">123456</span>

Events:  <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来创建一个pod-configmap.yaml，将上面创建的configmap挂载进去</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>configmap
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span> <span class="token comment"># 将configmap挂载到目录</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> config
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /configmap/config
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span> <span class="token comment"># 引用configmap</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> config
    <span class="token key atrule">configMap</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> configmap
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建pod</span>
kubectl create <span class="token parameter variable">-f</span> pod-configmap.yaml

pod/pod-configmap created

<span class="token comment"># 查看pod</span>
kubectl get pod pod-configmap <span class="token parameter variable">-n</span> dev

NAME            READY   STATUS    RESTARTS   AGE
pod-configmap   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          6s

<span class="token comment">#进入容器</span>
kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> pod-configmap <span class="token parameter variable">-n</span> dev /bin/sh

<span class="token builtin class-name">cd</span> /configmap/config/
<span class="token function">ls</span>
<span class="token function">more</span> info
username: admin
password: <span class="token number">123456</span>

<span class="token comment"># 可以看到映射已经成功，每个configmap都映射成了一个目录</span>
<span class="token comment"># key---&gt;文件     value----&gt;文件中的内容</span>
<span class="token comment"># 此时如果更新configmap的内容, 容器中的值也会动态更新</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-3-2-secret" tabindex="-1"><a class="header-anchor" href="#_8-3-2-secret" aria-hidden="true">#</a> 8.3.2 Secret</h3><p>在kubernetes中，还存在一种和ConfigMap非常类似的对象，称为Secret对象。它主要用于存储敏感信息，例如密码、秘钥、证书等等。</p><ol><li>首先使用base64对数据进行编码</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#准备username</span>
<span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> <span class="token string">&#39;admin&#39;</span> <span class="token operator">|</span> base64

<span class="token assign-left variable">YWRtaW4</span><span class="token operator">=</span>

<span class="token comment">#准备password</span>
<span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> <span class="token string">&#39;123456&#39;</span> <span class="token operator">|</span> base64

MTIzNDU2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>接下来编写secret.yaml，并创建Secret</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Secret
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> secret
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">type</span><span class="token punctuation">:</span> Opaque
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">username</span><span class="token punctuation">:</span> YWRtaW4=
  <span class="token key atrule">password</span><span class="token punctuation">:</span> MTIzNDU2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建secret</span>
kubectl create <span class="token parameter variable">-f</span> secret.yaml

secret/secret created

<span class="token comment"># 查看secret详情</span>
kubectl describe secret secret <span class="token parameter variable">-n</span> dev

Name:         secret
Namespace:    dev
Labels:       <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Annotations:  <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Type:  Opaque
Data
<span class="token operator">==</span><span class="token operator">==</span>
password:  <span class="token number">6</span> bytes
username:  <span class="token number">5</span> bytes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>创建pod-secret.yaml，将上面创建的secret挂载进去：</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>secret
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span> <span class="token comment"># 将secret挂载到目录</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> config
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /secret/config
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> config
    <span class="token key atrule">secret</span><span class="token punctuation">:</span>
      <span class="token key atrule">secretName</span><span class="token punctuation">:</span> secret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建pod</span>
kubectl create <span class="token parameter variable">-f</span> pod-secret.yaml

pod/pod-secret created

<span class="token comment"># 查看pod</span>
kubectl get pod pod-secret <span class="token parameter variable">-n</span> dev

NAME            READY   STATUS    RESTARTS   AGE
pod-secret      <span class="token number">1</span>/1     Running   <span class="token number">0</span>          2m28s

<span class="token comment"># 进入容器，查看secret信息，发现已经自动解码了</span>
kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> pod-secret /bin/sh <span class="token parameter variable">-n</span> dev

/ <span class="token builtin class-name">cd</span> /secret/config <span class="token operator">&amp;&amp;</span> <span class="token function">ls</span>
password  username
/ <span class="token function">more</span> username
admin
/ <span class="token function">more</span> password
<span class="token number">123456</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至此，已经实现了利用secret实现了信息的编码。</p>`,95);function g(h,P){const a=i("ExternalLinkIcon");return t(),p("div",null,[n("p",null,[n("a",k,[s("原文链接"),e(a)]),s(),n("a",b,[s("视频教程"),e(a)])]),y])}const V=l(m,[["render",g],["__file","k8s-volume.html.vue"]]);export{V as default};