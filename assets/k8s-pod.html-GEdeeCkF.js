import{_ as l,r as p,o as i,c as o,b as n,d as s,e as t,a}from"./app-rBywrD27.js";const c="/assets/image-20200407121501907-l1bLVnrl.png",u="/assets/image-20200412111402706-1626782188724-HZbhoOYJ.png",d="/assets/image-20200406184656917-nSFC-Wr-.png",r="/assets/image-20200605021831545-yP7PsYDc.png",v="/assets/image-20200514095913741-Yg04l_zJ.png",k={},m={href:"https://gitee.com/yooome/golang/blob/main/k8s%E8%AF%A6%E7%BB%86%E6%95%99%E7%A8%8B/Kubernetes%E8%AF%A6%E7%BB%86%E6%95%99%E7%A8%8B.md#5-pod%E8%AF%A6%E8%A7%A3",target:"_blank",rel:"noopener noreferrer"},b={href:"https://www.bilibili.com/video/BV1Qv41167ck?p=24",target:"_blank",rel:"noopener noreferrer"},g=a('<h1 id="_5-pod详解" tabindex="-1"><a class="header-anchor" href="#_5-pod详解" aria-hidden="true">#</a> 5 Pod详解</h1><h2 id="_5-1-pod介绍" tabindex="-1"><a class="header-anchor" href="#_5-1-pod介绍" aria-hidden="true">#</a> 5.1 Pod介绍</h2><h3 id="_5-1-1-pod结构" tabindex="-1"><a class="header-anchor" href="#_5-1-1-pod结构" aria-hidden="true">#</a> 5.1.1 Pod结构</h3><p><img src="'+c+`" alt="image-20200407121501907"></p><p>每个Pod中都可以包含一个或者多个容器，这些容器可以分为两类：</p><ul><li>用户程序所在的容器，数量可多可少</li><li>Pause容器，这是每个Pod都会有的一个<strong>根容器</strong>，它的作用有两个： <ul><li>可以以它为依据，评估整个Pod的健康状态</li><li>可以在根容器上设置Ip地址，其它容器都此Ip（Pod IP），以实现Pod内部的网路通信 这里是Pod内部的通讯，Pod的之间的通讯采用虚拟二层网络技术来实现，我们当前环境用的是Flannel</li></ul></li></ul><h3 id="_5-1-2-pod定义" tabindex="-1"><a class="header-anchor" href="#_5-1-2-pod定义" aria-hidden="true">#</a> 5.1.2 Pod定义</h3><p>下面是Pod的资源清单：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1     <span class="token comment">#必选，版本号，例如v1</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod       　 <span class="token comment">#必选，资源类型，例如 Pod</span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>       　 <span class="token comment">#必选，元数据</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> string     <span class="token comment">#必选，Pod名称</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> string  <span class="token comment">#Pod所属的命名空间,默认为&quot;default&quot;</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>       　　  <span class="token comment">#自定义标签列表</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> string      　          
<span class="token key atrule">spec</span><span class="token punctuation">:</span>  <span class="token comment">#必选，Pod中容器的详细定义</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>  <span class="token comment">#必选，Pod中容器列表</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> string   <span class="token comment">#必选，容器名称</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> string  <span class="token comment">#必选，容器的镜像名称</span>
    <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> Always<span class="token punctuation">|</span>Never<span class="token punctuation">|</span>IfNotPresent <span class="token punctuation">]</span>  <span class="token comment">#获取镜像的策略 </span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>string<span class="token punctuation">]</span>   <span class="token comment">#容器的启动命令列表，如不指定，使用打包时使用的启动命令</span>
    <span class="token key atrule">args</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>string<span class="token punctuation">]</span>      <span class="token comment">#容器的启动命令参数列表</span>
    <span class="token key atrule">workingDir</span><span class="token punctuation">:</span> string  <span class="token comment">#容器的工作目录</span>
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>       <span class="token comment">#挂载到容器内部的存储卷配置</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> string      <span class="token comment">#引用pod定义的共享存储卷的名称，需用volumes[]部分定义的的卷名</span>
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> string <span class="token comment">#存储卷在容器内mount的绝对路径，应少于512字符</span>
      <span class="token key atrule">readOnly</span><span class="token punctuation">:</span> boolean <span class="token comment">#是否为只读模式</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span> <span class="token comment">#需要暴露的端口库号列表</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> string        <span class="token comment">#端口的名称</span>
      <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> int  <span class="token comment">#容器需要监听的端口号</span>
      <span class="token key atrule">hostPort</span><span class="token punctuation">:</span> int       <span class="token comment">#容器所在主机需要监听的端口号，默认与Container相同</span>
      <span class="token key atrule">protocol</span><span class="token punctuation">:</span> string    <span class="token comment">#端口协议，支持TCP和UDP，默认TCP</span>
    <span class="token key atrule">env</span><span class="token punctuation">:</span>   <span class="token comment">#容器运行前需设置的环境变量列表</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> string  <span class="token comment">#环境变量名称</span>
      <span class="token key atrule">value</span><span class="token punctuation">:</span> string <span class="token comment">#环境变量的值</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token comment">#资源限制和请求的设置</span>
      <span class="token key atrule">limits</span><span class="token punctuation">:</span>  <span class="token comment">#资源限制的设置</span>
        <span class="token key atrule">cpu</span><span class="token punctuation">:</span> string     <span class="token comment">#Cpu的限制，单位为core数，将用于docker run --cpu-shares参数</span>
        <span class="token key atrule">memory</span><span class="token punctuation">:</span> string  <span class="token comment">#内存限制，单位可以为Mib/Gib，将用于docker run --memory参数</span>
      <span class="token key atrule">requests</span><span class="token punctuation">:</span> <span class="token comment">#资源请求的设置</span>
        <span class="token key atrule">cpu</span><span class="token punctuation">:</span> string    <span class="token comment">#Cpu请求，容器启动的初始可用数量</span>
        <span class="token key atrule">memory</span><span class="token punctuation">:</span> string <span class="token comment">#内存请求,容器启动的初始可用数量</span>
    <span class="token key atrule">lifecycle</span><span class="token punctuation">:</span> <span class="token comment">#生命周期钩子</span>
        <span class="token key atrule">postStart</span><span class="token punctuation">:</span> <span class="token comment">#容器启动后立即执行此钩子,如果执行失败,会根据重启策略进行重启</span>
        <span class="token key atrule">preStop</span><span class="token punctuation">:</span> <span class="token comment">#容器终止前执行此钩子,无论结果如何,容器都会终止</span>
    <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>  <span class="token comment">#对Pod内各容器健康检查的设置，当探测无响应几次后将自动重启该容器</span>
      <span class="token key atrule">exec</span><span class="token punctuation">:</span>       　 <span class="token comment">#对Pod容器内检查方式设置为exec方式</span>
        <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>string<span class="token punctuation">]</span>  <span class="token comment">#exec方式需要制定的命令或脚本</span>
      <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>       <span class="token comment">#对Pod内个容器健康检查方法设置为HttpGet，需要制定Path、port</span>
        <span class="token key atrule">path</span><span class="token punctuation">:</span> string
        <span class="token key atrule">port</span><span class="token punctuation">:</span> number
        <span class="token key atrule">host</span><span class="token punctuation">:</span> string
        <span class="token key atrule">scheme</span><span class="token punctuation">:</span> string
        <span class="token key atrule">HttpHeaders</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> string
          <span class="token key atrule">value</span><span class="token punctuation">:</span> string
      <span class="token key atrule">tcpSocket</span><span class="token punctuation">:</span>     <span class="token comment">#对Pod内个容器健康检查方式设置为tcpSocket方式</span>
         <span class="token key atrule">port</span><span class="token punctuation">:</span> number
       <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">0</span>       <span class="token comment">#容器启动完成后首次探测的时间，单位为秒</span>
       <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> 0    　　    <span class="token comment">#对容器健康检查探测等待响应的超时时间，单位秒，默认1秒</span>
       <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> 0     　　    <span class="token comment">#对容器监控检查的定期探测时间设置，单位秒，默认10秒一次</span>
       <span class="token key atrule">successThreshold</span><span class="token punctuation">:</span> <span class="token number">0</span>
       <span class="token key atrule">failureThreshold</span><span class="token punctuation">:</span> <span class="token number">0</span>
       <span class="token key atrule">securityContext</span><span class="token punctuation">:</span>
         <span class="token key atrule">privileged</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
  <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>Always <span class="token punctuation">|</span> Never <span class="token punctuation">|</span> OnFailure<span class="token punctuation">]</span>  <span class="token comment">#Pod的重启策略</span>
  <span class="token key atrule">nodeName</span><span class="token punctuation">:</span> &lt;string<span class="token punctuation">&gt;</span> <span class="token comment">#设置NodeName表示将该Pod调度到指定到名称的node节点上</span>
  <span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span> obeject <span class="token comment">#设置NodeSelector表示将该Pod调度到包含这个label的node上</span>
  <span class="token key atrule">imagePullSecrets</span><span class="token punctuation">:</span> <span class="token comment">#Pull镜像时使用的secret名称，以key：secretkey格式指定</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> string
  <span class="token key atrule">hostNetwork</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>   <span class="token comment">#是否使用主机网络模式，默认为false，如果设置为true，表示使用宿主机网络</span>
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>   <span class="token comment">#在该pod上定义共享存储卷列表</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> string    <span class="token comment">#共享存储卷名称 （volumes类型有很多种）</span>
    <span class="token key atrule">emptyDir</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>       <span class="token comment">#类型为emtyDir的存储卷，与Pod同生命周期的一个临时目录。为空值</span>
    <span class="token key atrule">hostPath</span><span class="token punctuation">:</span> string   <span class="token comment">#类型为hostPath的存储卷，表示挂载Pod所在宿主机的目录</span>
      <span class="token key atrule">path</span><span class="token punctuation">:</span> string      　　        <span class="token comment">#Pod所在宿主机的目录，将被用于同期中mount的目录</span>
    <span class="token key atrule">secret</span><span class="token punctuation">:</span>       　　　<span class="token comment">#类型为secret的存储卷，挂载集群与定义的secret对象到容器内部</span>
      <span class="token key atrule">scretname</span><span class="token punctuation">:</span> string  
      <span class="token key atrule">items</span><span class="token punctuation">:</span>     
      <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> string
        <span class="token key atrule">path</span><span class="token punctuation">:</span> string
    <span class="token key atrule">configMap</span><span class="token punctuation">:</span>         <span class="token comment">#类型为configMap的存储卷，挂载预定义的configMap对象到容器内部</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> string
      <span class="token key atrule">items</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> string
        <span class="token key atrule">path</span><span class="token punctuation">:</span> string
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),y=n("div",{class:"custom-container tip"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8h.01"}),n("path",{d:"M11 12h1v4h1"})])]),n("p",{class:"custom-container-title"},"TIP"),n("p",null,"小提示： 在这里，可通过一个命令来查看每种资源的可配置项 kubectl explain 资源类型 查看某种资源可以配置的一级属性 kubectl explain 资源类型.属性 查看属性的子属性")],-1),h=a(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl explain pod

KIND:     Pod
VERSION:  v1
FIELDS:
   apiVersion   <span class="token operator">&lt;</span>string<span class="token operator">&gt;</span>
   kind <span class="token operator">&lt;</span>string<span class="token operator">&gt;</span>
   metadata     <span class="token operator">&lt;</span>Object<span class="token operator">&gt;</span>
   spec <span class="token operator">&lt;</span>Object<span class="token operator">&gt;</span>
   status       <span class="token operator">&lt;</span>Object<span class="token operator">&gt;</span>

kubectl explain pod.metadata

KIND:     Pod
VERSION:  v1
RESOURCE: metadata <span class="token operator">&lt;</span>Object<span class="token operator">&gt;</span>
FIELDS:
   annotations  <span class="token operator">&lt;</span>map<span class="token punctuation">[</span>string<span class="token punctuation">]</span>string<span class="token operator">&gt;</span>
   clusterName  <span class="token operator">&lt;</span>string<span class="token operator">&gt;</span>
   creationTimestamp    <span class="token operator">&lt;</span>string<span class="token operator">&gt;</span>
   deletionGracePeriodSeconds   <span class="token operator">&lt;</span>integer<span class="token operator">&gt;</span>
   deletionTimestamp    <span class="token operator">&lt;</span>string<span class="token operator">&gt;</span>
   finalizers   <span class="token operator">&lt;</span><span class="token punctuation">[</span><span class="token punctuation">]</span>string<span class="token operator">&gt;</span>
   generateName <span class="token operator">&lt;</span>string<span class="token operator">&gt;</span>
   generation   <span class="token operator">&lt;</span>integer<span class="token operator">&gt;</span>
   labels       <span class="token operator">&lt;</span>map<span class="token punctuation">[</span>string<span class="token punctuation">]</span>string<span class="token operator">&gt;</span>
   managedFields        <span class="token operator">&lt;</span><span class="token punctuation">[</span><span class="token punctuation">]</span>Object<span class="token operator">&gt;</span>
   name <span class="token operator">&lt;</span>string<span class="token operator">&gt;</span>
   namespace    <span class="token operator">&lt;</span>string<span class="token operator">&gt;</span>
   ownerReferences      <span class="token operator">&lt;</span><span class="token punctuation">[</span><span class="token punctuation">]</span>Object<span class="token operator">&gt;</span>
   resourceVersion      <span class="token operator">&lt;</span>string<span class="token operator">&gt;</span>
   selfLink     <span class="token operator">&lt;</span>string<span class="token operator">&gt;</span>
   uid  <span class="token operator">&lt;</span>string<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在kubernetes中基本所有资源的一级属性都是一样的，主要包含5部分：</p><ul><li><code>apiVersion &lt;string&gt;</code> 版本，由kubernetes内部定义，版本号必须可以用 kubectl api-versions 查询到</li><li><code>kind &lt;string&gt;</code> 类型，由kubernetes内部定义，版本号必须可以用 kubectl api-resources 查询到</li><li><code>metadata &lt;Object&gt;</code> 元数据，主要是资源标识和说明，常用的有name、namespace、labels等</li><li><code>spec &lt;Object&gt;</code> 描述，这是配置中最重要的一部分，里面是对各种资源配置的详细描述</li><li><code>status &lt;Object&gt;</code> 状态信息，里面的内容不需要定义，由kubernetes自动生成</li></ul><p>在上面的属性中，spec是接下来研究的重点，继续看下它的常见子属性:</p><ul><li><code>containers &lt;[]Object&gt;</code> 容器列表，用于定义容器的详细信息</li><li><code>nodeName &lt;String&gt;</code> 根据nodeName的值将pod调度到指定的Node节点上</li><li><code>nodeSelector &lt;map[]&gt;</code> 根据NodeSelector中定义的信息选择将该Pod调度到包含这些label的Node 上</li><li><code>hostNetwork &lt;boolean&gt;</code> 是否使用主机网络模式，默认为false，如果设置为true，表示使用宿主机网络</li><li><code>volumes &lt;[]Object&gt;</code> 存储卷，用于定义Pod上面挂在的存储信息</li><li><code>restartPolicy &lt;string&gt;</code> 重启策略，表示Pod在遇到故障的时候的处理策略</li></ul><h2 id="_5-2-pod配置" tabindex="-1"><a class="header-anchor" href="#_5-2-pod配置" aria-hidden="true">#</a> 5.2 Pod配置</h2><p>本小节主要来研究<code>pod.spec.containers</code>属性，这也是pod配置中最为关键的一项配置。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl explain pod.spec.containers

KIND:     Pod
VERSION:  v1
RESOURCE: containers <span class="token operator">&lt;</span><span class="token punctuation">[</span><span class="token punctuation">]</span>Object<span class="token operator">&gt;</span>   <span class="token comment"># 数组，代表可以有多个容器</span>
FIELDS:
   name  <span class="token operator">&lt;</span>string<span class="token operator">&gt;</span>     <span class="token comment"># 容器名称</span>
   image <span class="token operator">&lt;</span>string<span class="token operator">&gt;</span>     <span class="token comment"># 容器需要的镜像地址</span>
   imagePullPolicy  <span class="token operator">&lt;</span>string<span class="token operator">&gt;</span> <span class="token comment"># 镜像拉取策略 </span>
   <span class="token builtin class-name">command</span>  <span class="token operator">&lt;</span><span class="token punctuation">[</span><span class="token punctuation">]</span>string<span class="token operator">&gt;</span> <span class="token comment"># 容器的启动命令列表，如不指定，使用打包时使用的启动命令</span>
   args     <span class="token operator">&lt;</span><span class="token punctuation">[</span><span class="token punctuation">]</span>string<span class="token operator">&gt;</span> <span class="token comment"># 容器的启动命令需要的参数列表</span>
   <span class="token function">env</span>      <span class="token operator">&lt;</span><span class="token punctuation">[</span><span class="token punctuation">]</span>Object<span class="token operator">&gt;</span> <span class="token comment"># 容器环境变量的配置</span>
   ports    <span class="token operator">&lt;</span><span class="token punctuation">[</span><span class="token punctuation">]</span>Object<span class="token operator">&gt;</span>     <span class="token comment"># 容器需要暴露的端口号列表</span>
   resources <span class="token operator">&lt;</span>Object<span class="token operator">&gt;</span>      <span class="token comment"># 资源限制和资源请求的设置</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-1-基本配置" tabindex="-1"><a class="header-anchor" href="#_5-2-1-基本配置" aria-hidden="true">#</a> 5.2.1 基本配置</h3><p>创建pod-base.yaml文件，内容如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>base
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">user</span><span class="token punctuation">:</span> heima
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> busybox
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox<span class="token punctuation">:</span><span class="token number">1.30</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面定义了一个比较简单Pod的配置，里面有两个容器：</p><ul><li>nginx：用1.17.1版本的nginx镜像创建，（nginx是一个轻量级web容器）</li><li>busybox：用1.30版本的busybox镜像创建，（busybox是一个小巧的linux命令集合）</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建Pod</span>
kubectl apply <span class="token parameter variable">-f</span> pod-base.yaml

pod/pod-base created

<span class="token comment"># 查看Pod状况</span>
<span class="token comment"># READY 1/2 : 表示当前Pod中有2个容器，其中1个准备就绪，1个未就绪</span>
<span class="token comment"># RESTARTS  : 重启次数，因为有1个容器故障了，Pod一直在重启试图恢复它</span>
kubectl get pod <span class="token parameter variable">-n</span> dev

NAME       READY   STATUS    RESTARTS   AGE
pod-base   <span class="token number">1</span>/2     Running   <span class="token number">4</span>          95s

<span class="token comment"># 可以通过describe查看内部的详情</span>
<span class="token comment"># 此时已经运行起来了一个基本的Pod，虽然它暂时有问题</span>
kubectl describe pod pod-base <span class="token parameter variable">-n</span> dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-2-镜像拉取" tabindex="-1"><a class="header-anchor" href="#_5-2-2-镜像拉取" aria-hidden="true">#</a> 5.2.2 镜像拉取</h3><p>创建pod-imagepullpolicy.yaml文件，内容如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>imagepullpolicy
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
    <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> Never <span class="token comment"># 用于设置镜像拉取策略</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> busybox
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox<span class="token punctuation">:</span><span class="token number">1.30</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>imagePullPolicy，用于设置镜像拉取策略，kubernetes支持配置三种拉取策略：</p><ul><li>Always：总是从远程仓库拉取镜像（一直远程下载）</li><li>IfNotPresent：本地有则使用本地镜像，本地没有则从远程仓库拉取镜像（本地有就本地 本地没远程下载）</li><li>Never：只使用本地镜像，从不去远程仓库拉取，本地没有就报错 （一直使用本地）</li></ul><blockquote><p>默认值说明：</p><p>如果镜像tag为具体版本号， 默认策略是：IfNotPresent</p><p>如果镜像tag为：latest（最终版本）,默认策略是always</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建Pod</span>
kubectl create <span class="token parameter variable">-f</span> pod-imagepullpolicy.yaml

pod/pod-imagepullpolicy created

<span class="token comment"># 查看Pod详情</span>
<span class="token comment"># 此时明显可以看到nginx镜像有一步Pulling image &quot;nginx:1.17.1&quot;的过程</span>
kubectl describe pod pod-imagepullpolicy <span class="token parameter variable">-n</span> dev

<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
Events:
  Type     Reason     Age               From               Message
  ----     ------     ----              ----               -------
  Normal   Scheduled  <span class="token operator">&lt;</span>unknown<span class="token operator">&gt;</span>         default-scheduler  Successfully assigned dev/pod-imagePullPolicy to node1
  Normal   Pulling    32s               kubelet, node1     Pulling image <span class="token string">&quot;nginx:1.17.1&quot;</span>
  Normal   Pulled     26s               kubelet, node1     Successfully pulled image <span class="token string">&quot;nginx:1.17.1&quot;</span>
  Normal   Created    26s               kubelet, node1     Created container nginx
  Normal   Started    25s               kubelet, node1     Started container nginx
  Normal   Pulled     7s <span class="token punctuation">(</span>x3 over 25s<span class="token punctuation">)</span>  kubelet, node1     Container image <span class="token string">&quot;busybox:1.30&quot;</span> already present on machine
  Normal   Created    7s <span class="token punctuation">(</span>x3 over 25s<span class="token punctuation">)</span>  kubelet, node1     Created container busybox
  Normal   Started    7s <span class="token punctuation">(</span>x3 over 25s<span class="token punctuation">)</span>  kubelet, node1     Started container busybox
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-3-启动命令" tabindex="-1"><a class="header-anchor" href="#_5-2-3-启动命令" aria-hidden="true">#</a> 5.2.3 启动命令</h3><p>在前面的案例中，一直有一个问题没有解决，就是的busybox容器一直没有成功运行，那么到底是什么原因导致这个容器的故障呢？</p><p>原来busybox并不是一个程序，而是类似于一个工具类的集合，kubernetes集群启动管理后，它会自动关闭。解决方法就是让其一直在运行，这就用到了command配置。</p><p>创建pod-command.yaml文件，内容如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>command
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> busybox
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox<span class="token punctuation">:</span><span class="token number">1.30</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;touch /tmp/hello.txt;while true;do /bin/echo $(date +%T) &gt;&gt; /tmp/hello.txt; sleep 3; done;&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>command，用于在pod中的容器初始化完毕之后运行一个命令。</p><blockquote><p>稍微解释下上面命令的意思：</p><p>&quot;/bin/sh&quot;,&quot;-c&quot;, 使用sh执行命令</p><p>touch /tmp/hello.txt; 创建一个/tmp/hello.txt 文件</p><p>while true;do /bin/echo $(date +%T) &gt;&gt; /tmp/hello.txt; sleep 3; done; 每隔3秒向文件中写入当前时间</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建Pod</span>
kubectl create  <span class="token parameter variable">-f</span> pod-command.yaml

pod/pod-command created

<span class="token comment"># 查看Pod状态</span>
<span class="token comment"># 此时发现两个pod都正常运行了</span>
kubectl get pods pod-command <span class="token parameter variable">-n</span> dev

NAME          READY   STATUS   RESTARTS   AGE
pod-command   <span class="token number">2</span>/2     Runing   <span class="token number">0</span>          2s

<span class="token comment"># 进入pod中的busybox容器，查看文件内容</span>
<span class="token comment"># 补充一个命令: kubectl exec pod名称 -n 命名空间 -it -c 容器名称 /bin/sh  在容器内部执行命令</span>
<span class="token comment"># 使用这个命令就可以进入某个容器的内部，然后进行相关操作了</span>
<span class="token comment"># 比如，可以查看txt文件的内容</span>
kubectl <span class="token builtin class-name">exec</span> pod-command <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-it</span> <span class="token parameter variable">-c</span> busybox /bin/sh

/ <span class="token comment"># tail -f /tmp/hello.txt</span>
<span class="token number">14</span>:44:19
<span class="token number">14</span>:44:22
<span class="token number">14</span>:44:25
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>特别说明： 通过上面发现command已经可以完成启动命令和传递参数的功能，为什么这里还要提供一个args选项，用于传递参数呢?这其实跟docker有点关系，kubernetes中的command、args两项其实是实现覆盖Dockerfile中ENTRYPOINT的功能。 1 如果command和args均没有写，那么用Dockerfile的配置。 2 如果command写了，但args没有写，那么Dockerfile默认的配置会被忽略，执行输入的command 3 如果command没写，但args写了，那么Dockerfile中配置的ENTRYPOINT的命令会被执行，使用当前args的参数 4 如果command和args都写了，那么Dockerfile的配置被忽略，执行command并追加上args参数</p></blockquote><h3 id="_5-2-4-环境变量" tabindex="-1"><a class="header-anchor" href="#_5-2-4-环境变量" aria-hidden="true">#</a> 5.2.4 环境变量</h3><p>创建pod-env.yaml文件，内容如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>env
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> busybox
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox<span class="token punctuation">:</span><span class="token number">1.30</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;while true;do /bin/echo $(date +%T);sleep 60; done;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">env</span><span class="token punctuation">:</span> <span class="token comment"># 设置环境变量列表</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;username&quot;</span>
      <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;admin&quot;</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;password&quot;</span>
      <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;123456&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>env，环境变量，用于在pod中的容器设置环境变量。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建Pod</span>
kubectl create <span class="token parameter variable">-f</span> pod-env.yaml

pod/pod-env created

<span class="token comment"># 进入容器，输出环境变量</span>
kubectl <span class="token builtin class-name">exec</span> pod-env <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-c</span> busybox <span class="token parameter variable">-it</span> /bin/sh

/ <span class="token comment"># echo $username</span>
admin
/ <span class="token comment"># echo $password</span>
<span class="token number">123456</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方式不是很推荐，推荐将这些配置单独存储在配置文件中，这种方式将在后面介绍。</p><h3 id="_5-2-5-端口设置" tabindex="-1"><a class="header-anchor" href="#_5-2-5-端口设置" aria-hidden="true">#</a> 5.2.5 端口设置</h3><p>本小节来介绍容器的端口设置，也就是containers的ports选项。</p><p>首先看下ports支持的子选项：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl explain pod.spec.containers.ports

KIND:     Pod
VERSION:  v1
RESOURCE: ports <span class="token operator">&lt;</span><span class="token punctuation">[</span><span class="token punctuation">]</span>Object<span class="token operator">&gt;</span>
FIELDS:
   name         <span class="token operator">&lt;</span>string<span class="token operator">&gt;</span>  <span class="token comment"># 端口名称，如果指定，必须保证name在pod中是唯一的		</span>
   containerPort<span class="token operator">&lt;</span>integer<span class="token operator">&gt;</span> <span class="token comment"># 容器要监听的端口(0&lt;x&lt;65536)</span>
   hostPort     <span class="token operator">&lt;</span>integer<span class="token operator">&gt;</span> <span class="token comment"># 容器要在主机上公开的端口，如果设置，主机上只能运行容器的一个副本(一般省略) </span>
   hostIP       <span class="token operator">&lt;</span>string<span class="token operator">&gt;</span>  <span class="token comment"># 要将外部端口绑定到的主机IP(一般省略)</span>
   protocol     <span class="token operator">&lt;</span>string<span class="token operator">&gt;</span>  <span class="token comment"># 端口协议。必须是UDP、TCP或SCTP。默认为“TCP”。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，编写一个测试案例，创建pod-ports.yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>ports
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
    <span class="token key atrule">ports</span><span class="token punctuation">:</span> <span class="token comment"># 设置容器暴露的端口列表</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>port
      <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
      <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建Pod</span>
kubectl create <span class="token parameter variable">-f</span> pod-ports.yaml

pod/pod-ports created

<span class="token comment"># 查看pod</span>
<span class="token comment"># 在下面可以明显看到配置信息</span>
kubectl get pod pod-ports <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-o</span> yaml

<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
spec:
  containers:
  - image: nginx:1.17.1
    imagePullPolicy: IfNotPresent
    name: nginx
    ports:
    - containerPort: <span class="token number">80</span>
      name: nginx-port
      protocol: TCP
<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>访问容器中的程序需要使用的是<code>Podip:containerPort</code></p><h3 id="_5-2-6-资源配额" tabindex="-1"><a class="header-anchor" href="#_5-2-6-资源配额" aria-hidden="true">#</a> 5.2.6 资源配额</h3><p>容器中的程序要运行，肯定是要占用一定资源的，比如cpu和内存等，如果不对某个容器的资源做限制，那么它就可能吃掉大量资源，导致其它容器无法运行。针对这种情况，kubernetes提供了对内存和cpu的资源进行配额的机制，这种机制主要通过resources选项实现，他有两个子选项：</p><ul><li>limits：用于限制运行时容器的最大占用资源，当容器占用资源超过limits时会被终止，并进行重启</li><li>requests ：用于设置容器需要的最小资源，如果环境资源不够，容器将无法启动</li></ul><p>可以通过上面两个选项设置资源的上下限。</p><p>接下来，编写一个测试案例，创建pod-resources.yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>resources
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token comment"># 资源配额</span>
      <span class="token key atrule">limits</span><span class="token punctuation">:</span>  <span class="token comment"># 限制资源（上限）</span>
        <span class="token key atrule">cpu</span><span class="token punctuation">:</span> <span class="token string">&quot;2&quot;</span> <span class="token comment"># CPU限制，单位是core数</span>
        <span class="token key atrule">memory</span><span class="token punctuation">:</span> <span class="token string">&quot;10Gi&quot;</span> <span class="token comment"># 内存限制</span>
      <span class="token key atrule">requests</span><span class="token punctuation">:</span> <span class="token comment"># 请求资源（下限）</span>
        <span class="token key atrule">cpu</span><span class="token punctuation">:</span> <span class="token string">&quot;1&quot;</span>  <span class="token comment"># CPU限制，单位是core数</span>
        <span class="token key atrule">memory</span><span class="token punctuation">:</span> <span class="token string">&quot;10Mi&quot;</span>  <span class="token comment"># 内存限制</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这对cpu和memory的单位做一个说明：</p><ul><li>cpu：core数，可以为整数或小数</li><li>memory： 内存大小，可以使用Gi、Mi、G、M等形式</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 运行Pod</span>
kubectl create  <span class="token parameter variable">-f</span> pod-resources.yaml

pod/pod-resources created

<span class="token comment"># 查看发现pod运行正常</span>
kubectl get pod pod-resources <span class="token parameter variable">-n</span> dev

NAME            READY   STATUS    RESTARTS   AGE  
pod-resources   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          39s   

<span class="token comment"># 接下来，停止Pod</span>
kubectl delete  <span class="token parameter variable">-f</span> pod-resources.yaml

pod <span class="token string">&quot;pod-resources&quot;</span> deleted

<span class="token comment"># 编辑pod，修改resources.requests.memory的值为10Gi</span>
<span class="token comment"># 再次启动pod</span>
kubectl create  <span class="token parameter variable">-f</span> pod-resources.yaml

pod/pod-resources created

<span class="token comment"># 查看Pod状态，发现Pod启动失败</span>
kubectl get pod pod-resources <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-o</span> wide

NAME            READY   STATUS    RESTARTS   AGE          
pod-resources   <span class="token number">0</span>/1     Pending   <span class="token number">0</span>          20s    

<span class="token comment"># 查看pod详情会发现，如下提示</span>
kubectl describe pod pod-resources <span class="token parameter variable">-n</span> dev

<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
Warning  FailedScheduling  35s   default-scheduler  <span class="token number">0</span>/3 nodes are available: <span class="token number">1</span> node<span class="token punctuation">(</span>s<span class="token punctuation">)</span> had taint <span class="token punctuation">{</span>node-role.kubernetes.io/master: <span class="token punctuation">}</span>, that the pod didn&#39;t tolerate, <span class="token number">2</span> Insufficient memory.<span class="token punctuation">(</span>内存不足<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-3-pod生命周期" tabindex="-1"><a class="header-anchor" href="#_5-3-pod生命周期" aria-hidden="true">#</a> 5.3 Pod生命周期</h2><p>我们一般将pod对象从创建至终的这段时间范围称为pod的生命周期，它主要包含下面的过程：</p><ul><li>pod创建过程</li><li>运行初始化容器（init container）过程</li><li>运行主容器（main container） <ul><li>容器启动后钩子（post start）、容器终止前钩子（pre stop）</li><li>容器的存活性探测（liveness probe）、就绪性探测（readiness probe）</li></ul></li><li>pod终止过程</li></ul><p><img src="`+u+'" alt="image-20200412111402706"></p><p>在整个生命周期中，Pod会出现5种<strong>状态</strong>（<strong>相位</strong>），分别如下：</p><ul><li>挂起（Pending）：apiserver已经创建了pod资源对象，但它尚未被调度完成或者仍处于下载镜像的过程中</li><li>运行中（Running）：pod已经被调度至某节点，并且所有容器都已经被kubelet创建完成</li><li>成功（Succeeded）：pod中的所有容器都已经成功终止并且不会被重启</li><li>失败（Failed）：所有容器都已经终止，但至少有一个容器终止失败，即容器返回了非0值的退出状态</li><li>未知（Unknown）：apiserver无法正常获取到pod对象的状态信息，通常由网络通信失败所导致</li></ul><h3 id="_5-3-1-创建和终止" tabindex="-1"><a class="header-anchor" href="#_5-3-1-创建和终止" aria-hidden="true">#</a> 5.3.1 创建和终止</h3><p><strong>pod的创建过程</strong></p><ol><li><p>用户通过kubectl或其他api客户端提交需要创建的pod信息给apiServer</p></li><li><p>apiServer开始生成pod对象的信息，并将信息存入etcd，然后返回确认信息至客户端</p></li><li><p>apiServer开始反映etcd中的pod对象的变化，其它组件使用watch机制来跟踪检查apiServer上的变动</p></li><li><p>scheduler发现有新的pod对象要创建，开始为Pod分配主机并将结果信息更新至apiServer</p></li><li><p>node节点上的kubelet发现有pod调度过来，尝试调用docker启动容器，并将结果回送至apiServer</p></li><li><p>apiServer将接收到的pod状态信息存入etcd中</p><p><img src="'+d+`" alt="image-20200406184656917"></p></li></ol><p><strong>pod的终止过程</strong></p><ol><li>用户向apiServer发送删除pod对象的命令</li><li>apiServcer中的pod对象信息会随着时间的推移而更新，在宽限期内（默认30s），pod被视为dead</li><li>将pod标记为terminating状态</li><li>kubelet在监控到pod对象转为terminating状态的同时启动pod关闭过程</li><li>端点控制器监控到pod对象的关闭行为时将其从所有匹配到此端点的service资源的端点列表中移除</li><li>如果当前pod对象定义了preStop钩子处理器，则在其标记为terminating后即会以同步的方式启动执行</li><li>pod对象中的容器进程收到停止信号</li><li>宽限期结束后，若pod中还存在仍在运行的进程，那么pod对象会收到立即终止的信号</li><li>kubelet请求apiServer将此pod资源的宽限期设置为0从而完成删除操作，此时pod对于用户已不可见</li></ol><h3 id="_5-3-2-初始化容器" tabindex="-1"><a class="header-anchor" href="#_5-3-2-初始化容器" aria-hidden="true">#</a> 5.3.2 初始化容器</h3><p>初始化容器是在pod的主容器启动之前要运行的容器，主要是做一些主容器的前置工作，它具有两大特征：</p><ol><li>初始化容器必须运行完成直至结束，若某初始化容器运行失败，那么kubernetes需要重启它直到成功完成</li><li>初始化容器必须按照定义的顺序执行，当且仅当前一个成功之后，后面的一个才能运行</li></ol><p>初始化容器有很多的应用场景，下面列出的是最常见的几个：</p><ul><li>提供主容器镜像中不具备的工具程序或自定义代码</li><li>初始化容器要先于应用容器串行启动并运行完成，因此可用于延后应用容器的启动直至其依赖的条件得到满足</li></ul><p>接下来做一个案例，模拟下面这个需求：</p><p>假设要以主容器来运行nginx，但是要求在运行nginx之前先要能够连接上mysql和redis所在服务器</p><p>为了简化测试，事先规定好mysql<code>(192.168.90.14)</code>和redis<code>(192.168.90.15)</code>服务器的地址</p><p>创建pod-initcontainer.yaml，内容如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>initcontainer
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> main<span class="token punctuation">-</span>container
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
    <span class="token key atrule">ports</span><span class="token punctuation">:</span> 
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>port
      <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
  <span class="token key atrule">initContainers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> test<span class="token punctuation">-</span>mysql
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox<span class="token punctuation">:</span><span class="token number">1.30</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;sh&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;-c&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;until ping 192.168.90.14 -c 1 ; do echo waiting for mysql...; sleep 2; done;&#39;</span><span class="token punctuation">]</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> test<span class="token punctuation">-</span>redis
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox<span class="token punctuation">:</span><span class="token number">1.30</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;sh&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;-c&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;until ping 192.168.90.15 -c 1 ; do echo waiting for reids...; sleep 2; done;&#39;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建pod</span>
create <span class="token parameter variable">-f</span> pod-initcontainer.yaml

pod/pod-initcontainer created

<span class="token comment"># 查看pod状态</span>
<span class="token comment"># 发现pod卡在启动第一个初始化容器过程中，后面的容器不会运行</span>
kubectl describe pod  pod-initcontainer <span class="token parameter variable">-n</span> dev

<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  49s   default-scheduler  Successfully assigned dev/pod-initcontainer to node1
  Normal  Pulled     48s   kubelet, node1     Container image <span class="token string">&quot;busybox:1.30&quot;</span> already present on machine
  Normal  Created    48s   kubelet, node1     Created container test-mysql
  Normal  Started    48s   kubelet, node1     Started container test-mysql

<span class="token comment"># 动态查看pod</span>
kubectl get pods pod-initcontainer <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-w</span>

NAME                             READY   STATUS            RESTARTS   AGE
pod-initcontainer                <span class="token number">0</span>/1     Init:0/2          <span class="token number">0</span>          15s
pod-initcontainer                <span class="token number">0</span>/1     Init:1/2          <span class="token number">0</span>          52s
pod-initcontainer                <span class="token number">0</span>/1     Init:1/2          <span class="token number">0</span>          53s
pod-initcontainer                <span class="token number">0</span>/1     PodInitializing   <span class="token number">0</span>          89s
pod-initcontainer                <span class="token number">1</span>/1     Running           <span class="token number">0</span>          90s

<span class="token comment"># 接下来新开一个shell，为当前服务器新增两个ip，观察pod的变化</span>
<span class="token function">ifconfig</span> ens33:1 <span class="token number">192.168</span>.90.14 netmask <span class="token number">255.255</span>.255.0 up
<span class="token function">ifconfig</span> ens33:2 <span class="token number">192.168</span>.90.15 netmask <span class="token number">255.255</span>.255.0 up
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-3-钩子函数" tabindex="-1"><a class="header-anchor" href="#_5-3-3-钩子函数" aria-hidden="true">#</a> 5.3.3 钩子函数</h3><p>钩子函数能够感知自身生命周期中的事件，并在相应的时刻到来时运行用户指定的程序代码。</p><p>kubernetes在主容器的启动之后和停止之前提供了两个钩子函数：</p><ul><li>post start：容器创建之后执行，如果失败了会重启容器</li><li>pre stop ：容器终止之前执行，执行完成之后容器将成功终止，在其完成之前会阻塞删除容器的操作</li></ul><p>钩子处理器支持使用下面三种方式定义动作：</p><ul><li><p>Exec命令：在容器内执行一次命令</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># ...</span>
  <span class="token key atrule">lifecycle</span><span class="token punctuation">:</span>
    <span class="token key atrule">postStart</span><span class="token punctuation">:</span> 
      <span class="token key atrule">exec</span><span class="token punctuation">:</span>
        <span class="token key atrule">command</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> cat
        <span class="token punctuation">-</span> /tmp/healthy
<span class="token comment"># ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>TCPSocket：在当前容器尝试访问指定的socket</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># ... </span>
  <span class="token key atrule">lifecycle</span><span class="token punctuation">:</span>
    <span class="token key atrule">postStart</span><span class="token punctuation">:</span>
      <span class="token key atrule">tcpSocket</span><span class="token punctuation">:</span>
        <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8080</span>
<span class="token comment"># ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>HTTPGet：在当前容器中向某url发起http请求</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># ...</span>
  <span class="token key atrule">lifecycle</span><span class="token punctuation">:</span>
    <span class="token key atrule">postStart</span><span class="token punctuation">:</span>
      <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
        <span class="token key atrule">path</span><span class="token punctuation">:</span> / <span class="token comment">#URI地址</span>
        <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span> <span class="token comment">#端口号</span>
        <span class="token key atrule">host</span><span class="token punctuation">:</span> 192.168.5.3 <span class="token comment">#主机地址</span>
        <span class="token key atrule">scheme</span><span class="token punctuation">:</span> HTTP <span class="token comment">#支持的协议，http或者https</span>
<span class="token comment"># ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><p>接下来，以exec方式为例，演示下钩子函数的使用，创建pod-hook-exec.yaml文件，内容如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>hook<span class="token punctuation">-</span>exec
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> main<span class="token punctuation">-</span>container
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>port
      <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">lifecycle</span><span class="token punctuation">:</span>
      <span class="token key atrule">postStart</span><span class="token punctuation">:</span> 
        <span class="token key atrule">exec</span><span class="token punctuation">:</span> <span class="token comment"># 在容器启动的时候执行一个命令，修改掉nginx的默认首页内容</span>
          <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;echo postStart... &gt; /usr/share/nginx/html/index.html&quot;</span><span class="token punctuation">]</span>
      <span class="token key atrule">preStop</span><span class="token punctuation">:</span>
        <span class="token key atrule">exec</span><span class="token punctuation">:</span> <span class="token comment"># 在容器停止之前停止nginx服务</span>
          <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/usr/sbin/nginx&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;-s&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;quit&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建pod</span>
kubectl create <span class="token parameter variable">-f</span> pod-hook-exec.yaml

pod/pod-hook-exec created

<span class="token comment"># 查看pod</span>
kubectl get pods  pod-hook-exec <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-o</span> wide

NAME           READY   STATUS     RESTARTS   AGE    IP            NODE    
pod-hook-exec  <span class="token number">1</span>/1     Running    <span class="token number">0</span>          29s    <span class="token number">10.244</span>.2.48   node2   

<span class="token comment"># 访问pod</span>
<span class="token function">curl</span> <span class="token number">10.244</span>.2.48

postStart<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-4-容器探测" tabindex="-1"><a class="header-anchor" href="#_5-3-4-容器探测" aria-hidden="true">#</a> 5.3.4 容器探测</h3><p>容器探测用于检测容器中的应用实例是否正常工作，是保障业务可用性的一种传统机制。如果经过探测，实例的状态不符合预期，那么kubernetes就会把该问题实例&quot; 摘除 &quot;，不承担业务流量。kubernetes提供了两种探针来实现容器探测，分别是：</p><ul><li>liveness probes：存活性探针，用于检测应用实例当前是否处于正常运行状态，如果不是，k8s会重启容器</li><li>readiness probes：就绪性探针，用于检测应用实例当前是否可以接收请求，如果不能，k8s不会转发流量</li></ul><blockquote><p>livenessProbe 决定是否重启容器 readinessProbe 决定是否将请求转发给容器。</p></blockquote><p>上面两种探针目前均支持三种探测方式：</p><ul><li><p>Exec命令：在容器内执行一次命令，如果命令执行的退出码为0，则认为程序正常，否则不正常</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># ...</span>
  <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
    <span class="token key atrule">exec</span><span class="token punctuation">:</span>
      <span class="token key atrule">command</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> cat
      <span class="token punctuation">-</span> /tmp/healthy
<span class="token comment"># ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>TCPSocket：将会尝试访问一个用户容器的端口，如果能够建立这条连接，则认为程序正常，否则不正常</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># ...      </span>
  <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
    <span class="token key atrule">tcpSocket</span><span class="token punctuation">:</span>
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8080</span>
<span class="token comment"># ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>HTTPGet：调用容器内Web应用的URL，如果返回的状态码在200和399之间，则认为程序正常，否则不正常</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># ...</span>
  <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
    <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
      <span class="token key atrule">path</span><span class="token punctuation">:</span> / <span class="token comment">#URI地址</span>
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span> <span class="token comment">#端口号</span>
      <span class="token key atrule">host</span><span class="token punctuation">:</span> 127.0.0.1 <span class="token comment">#主机地址</span>
      <span class="token key atrule">scheme</span><span class="token punctuation">:</span> HTTP <span class="token comment">#支持的协议，http或者https</span>
<span class="token comment"># ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><p>下面以liveness probes为例，做几个演示：</p><p><strong>方式一：Exec</strong></p><p>创建pod-liveness-exec.yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>liveness<span class="token punctuation">-</span>exec
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
    <span class="token key atrule">ports</span><span class="token punctuation">:</span> 
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>port
      <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
      <span class="token key atrule">exec</span><span class="token punctuation">:</span>
        <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/bin/cat&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;/tmp/hello.txt&quot;</span><span class="token punctuation">]</span> <span class="token comment"># 执行一个查看文件的命令</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建pod，观察效果</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建Pod</span>
kubectl create <span class="token parameter variable">-f</span> pod-liveness-exec.yaml

pod/pod-liveness-exec created

<span class="token comment"># 查看Pod详情</span>
kubectl describe pods pod-liveness-exec <span class="token parameter variable">-n</span> dev

<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
  Normal   Created    20s <span class="token punctuation">(</span>x2 over 50s<span class="token punctuation">)</span>  kubelet, node1     Created container nginx
  Normal   Started    20s <span class="token punctuation">(</span>x2 over 50s<span class="token punctuation">)</span>  kubelet, node1     Started container nginx
  Normal   Killing    20s                kubelet, node1     Container nginx failed liveness probe, will be restarted
  Warning  Unhealthy  0s <span class="token punctuation">(</span>x5 over 40s<span class="token punctuation">)</span>   kubelet, node1     Liveness probe failed: cat: can<span class="token string">&#39;t open &#39;</span>/tmp/hello11.txt&#39;: No such <span class="token function">file</span> or directory
  
<span class="token comment"># 观察上面的信息就会发现nginx容器启动之后就进行了健康检查</span>
<span class="token comment"># 检查失败之后，容器被kill掉，然后尝试进行重启（这是重启策略的作用，后面讲解）</span>
<span class="token comment"># 稍等一会之后，再观察pod信息，就可以看到RESTARTS不再是0，而是一直增长</span>
kubectl get pods pod-liveness-exec <span class="token parameter variable">-n</span> dev

NAME                READY   STATUS             RESTARTS   AGE
pod-liveness-exec   <span class="token number">0</span>/1     CrashLoopBackOff   <span class="token number">2</span>          3m19s

<span class="token comment"># 当然接下来，可以修改成一个存在的文件，比如/tmp/hello.txt，再试，结果就正常了......</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>方式二：TCPSocket</strong></p><p>创建pod-liveness-tcpsocket.yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>liveness<span class="token punctuation">-</span>tcpsocket
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
    <span class="token key atrule">ports</span><span class="token punctuation">:</span> 
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>port
      <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
      <span class="token key atrule">tcpSocket</span><span class="token punctuation">:</span>
        <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8080</span> <span class="token comment"># 尝试访问8080端口</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建pod，观察效果</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建Pod</span>
kubectl create <span class="token parameter variable">-f</span> pod-liveness-tcpsocket.yaml

pod/pod-liveness-tcpsocket created

<span class="token comment"># 查看Pod详情</span>
kubectl describe pods pod-liveness-tcpsocket <span class="token parameter variable">-n</span> dev

<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
  Normal   Scheduled  31s                            default-scheduler  Successfully assigned dev/pod-liveness-tcpsocket to node2
  Normal   Pulled     <span class="token operator">&lt;</span>invalid<span class="token operator">&gt;</span>                      kubelet, node2     Container image <span class="token string">&quot;nginx:1.17.1&quot;</span> already present on machine
  Normal   Created    <span class="token operator">&lt;</span>invalid<span class="token operator">&gt;</span>                      kubelet, node2     Created container nginx
  Normal   Started    <span class="token operator">&lt;</span>invalid<span class="token operator">&gt;</span>                      kubelet, node2     Started container nginx
  Warning  Unhealthy  <span class="token operator">&lt;</span>invalid<span class="token operator">&gt;</span> <span class="token punctuation">(</span>x2 over <span class="token operator">&lt;</span>invalid<span class="token operator">&gt;</span><span class="token punctuation">)</span>  kubelet, node2     Liveness probe failed: dial tcp <span class="token number">10.244</span>.2.44:8080: connect: connection refused
  
<span class="token comment"># 观察上面的信息，发现尝试访问8080端口,但是失败了</span>
<span class="token comment"># 稍等一会之后，再观察pod信息，就可以看到RESTARTS不再是0，而是一直增长</span>
kubectl get pods pod-liveness-tcpsocket  <span class="token parameter variable">-n</span> dev

NAME                     READY   STATUS             RESTARTS   AGE
pod-liveness-tcpsocket   <span class="token number">0</span>/1     CrashLoopBackOff   <span class="token number">2</span>          3m19s

<span class="token comment"># 当然接下来，可以修改成一个可以访问的端口，比如80，再试，结果就正常了......</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>方式三：HTTPGet</strong></p><p>创建pod-liveness-httpget.yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>liveness<span class="token punctuation">-</span>httpget
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>port
      <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
      <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>  <span class="token comment"># 其实就是访问http://127.0.0.1:80/hello  </span>
        <span class="token key atrule">scheme</span><span class="token punctuation">:</span> HTTP <span class="token comment">#支持的协议，http或者https</span>
        <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span> <span class="token comment">#端口号</span>
        <span class="token key atrule">path</span><span class="token punctuation">:</span> /hello <span class="token comment">#URI地址</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建pod，观察效果</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建Pod</span>
kubectl create <span class="token parameter variable">-f</span> pod-liveness-httpget.yaml

pod/pod-liveness-httpget created

<span class="token comment"># 查看Pod详情</span>
kubectl describe pod pod-liveness-httpget <span class="token parameter variable">-n</span> dev

<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>.
  Normal   Pulled     6s <span class="token punctuation">(</span>x3 over 64s<span class="token punctuation">)</span>  kubelet, node1     Container image <span class="token string">&quot;nginx:1.17.1&quot;</span> already present on machine
  Normal   Created    6s <span class="token punctuation">(</span>x3 over 64s<span class="token punctuation">)</span>  kubelet, node1     Created container nginx
  Normal   Started    6s <span class="token punctuation">(</span>x3 over 63s<span class="token punctuation">)</span>  kubelet, node1     Started container nginx
  Warning  Unhealthy  6s <span class="token punctuation">(</span>x6 over 56s<span class="token punctuation">)</span>  kubelet, node1     Liveness probe failed: HTTP probe failed with statuscode: <span class="token number">404</span>
  Normal   Killing    6s <span class="token punctuation">(</span>x2 over 36s<span class="token punctuation">)</span>  kubelet, node1     Container nginx failed liveness probe, will be restarted
  
<span class="token comment"># 观察上面信息，尝试访问路径，但是未找到,出现404错误</span>
<span class="token comment"># 稍等一会之后，再观察pod信息，就可以看到RESTARTS不再是0，而是一直增长</span>
kubectl get pod pod-liveness-httpget <span class="token parameter variable">-n</span> dev

NAME                   READY   STATUS    RESTARTS   AGE
pod-liveness-httpget   <span class="token number">1</span>/1     Running   <span class="token number">5</span>          3m17s

<span class="token comment"># 当然接下来，可以修改成一个可以访问的路径path，比如/，再试，结果就正常了......</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至此，已经使用liveness Probe演示了三种探测方式，但是查看livenessProbe的子属性，会发现除了这三种方式，还有一些其他的配置，在这里一并解释下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl explain pod.spec.containers.livenessProbe

FIELDS:
   <span class="token builtin class-name">exec</span> <span class="token operator">&lt;</span>Object<span class="token operator">&gt;</span>  
   tcpSocket    <span class="token operator">&lt;</span>Object<span class="token operator">&gt;</span>
   httpGet      <span class="token operator">&lt;</span>Object<span class="token operator">&gt;</span>
   initialDelaySeconds  <span class="token operator">&lt;</span>integer<span class="token operator">&gt;</span>  <span class="token comment"># 容器启动后等待多少秒执行第一次探测</span>
   timeoutSeconds       <span class="token operator">&lt;</span>integer<span class="token operator">&gt;</span>  <span class="token comment"># 探测超时时间。默认1秒，最小1秒</span>
   periodSeconds        <span class="token operator">&lt;</span>integer<span class="token operator">&gt;</span>  <span class="token comment"># 执行探测的频率。默认是10秒，最小1秒</span>
   failureThreshold     <span class="token operator">&lt;</span>integer<span class="token operator">&gt;</span>  <span class="token comment"># 连续探测失败多少次才被认定为失败。默认是3。最小值是1</span>
   successThreshold     <span class="token operator">&lt;</span>integer<span class="token operator">&gt;</span>  <span class="token comment"># 连续探测成功多少次才被认定为成功。默认是1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面稍微配置两个，演示下效果即可：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># more pod-liveness-httpget.yaml</span>
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>liveness<span class="token punctuation">-</span>httpget
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>port
      <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
      <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
        <span class="token key atrule">scheme</span><span class="token punctuation">:</span> HTTP
        <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span> 
        <span class="token key atrule">path</span><span class="token punctuation">:</span> /
      <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">30</span> <span class="token comment"># 容器启动后30s开始探测</span>
      <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">5</span> <span class="token comment"># 探测超时时间为5s</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-5-重启策略" tabindex="-1"><a class="header-anchor" href="#_5-3-5-重启策略" aria-hidden="true">#</a> 5.3.5 重启策略</h3><p>在上一节中，一旦容器探测出现了问题，kubernetes就会对容器所在的Pod进行重启，其实这是由pod的重启策略决定的，pod的重启策略有 3 种，分别如下：</p><ul><li>Always ：容器失效时，自动重启该容器，这也是默认值。</li><li>OnFailure ： 容器终止运行且退出码不为0时重启</li><li>Never ： 不论状态为何，都不重启该容器</li></ul><p>重启策略适用于pod对象中的所有容器，首次需要重启的容器，将在其需要时立即进行重启，随后再次需要重启的操作将由kubelet延迟一段时间后进行，且反复的重启操作的延迟时长以此为10s、20s、40s、80s、160s和300s，300s是最大延迟时长。</p><p>创建pod-restartpolicy.yaml：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>restartpolicy
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>port
      <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
      <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
        <span class="token key atrule">scheme</span><span class="token punctuation">:</span> HTTP
        <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
        <span class="token key atrule">path</span><span class="token punctuation">:</span> /hello
  <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Never <span class="token comment"># 设置重启策略为Never</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行Pod测试</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建Pod</span>
kubectl create <span class="token parameter variable">-f</span> pod-restartpolicy.yam
pod/pod-restartpolicy created

<span class="token comment"># 查看Pod详情，发现nginx容器失败</span>
kubectl  describe pods pod-restartpolicy <span class="token parameter variable">-n</span> dev

<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
  Warning  Unhealthy  15s <span class="token punctuation">(</span>x3 over 35s<span class="token punctuation">)</span>  kubelet, node1     Liveness probe failed: HTTP probe failed with statuscode: <span class="token number">404</span>
  Normal   Killing    15s                kubelet, node1     Container nginx failed liveness probe
  
<span class="token comment"># 多等一会，再观察pod的重启次数，发现一直是0，并未重启   </span>
kubectl  get pods pod-restartpolicy <span class="token parameter variable">-n</span> dev

NAME                   READY   STATUS    RESTARTS   AGE
pod-restartpolicy      <span class="token number">0</span>/1     Running   <span class="token number">0</span>          5min42s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-4-pod调度" tabindex="-1"><a class="header-anchor" href="#_5-4-pod调度" aria-hidden="true">#</a> 5.4 Pod调度</h2><p>在默认情况下，一个Pod在哪个Node节点上运行，是由Scheduler组件采用相应的算法计算出来的，这个过程是不受人工控制的。但是在实际使用中，这并不满足的需求，因为很多情况下，我们想控制某些Pod到达某些节点上，那么应该怎么做呢？这就要求了解kubernetes对Pod的调度规则，kubernetes提供了四大类调度方式：</p><ul><li>自动调度：运行在哪个节点上完全由Scheduler经过一系列的算法计算得出</li><li>定向调度：NodeName、NodeSelector</li><li>亲和性调度：NodeAffinity、PodAffinity、PodAntiAffinity</li><li>污点（容忍）调度：Taints、Toleration</li></ul><h3 id="_5-4-1-定向调度" tabindex="-1"><a class="header-anchor" href="#_5-4-1-定向调度" aria-hidden="true">#</a> 5.4.1 定向调度</h3><p>定向调度，指的是利用在pod上声明nodeName或者nodeSelector，以此将Pod调度到期望的node节点上。注意，这里的调度是强制的，这就意味着即使要调度的目标Node不存在，也会向上面进行调度，只不过pod运行失败而已。</p><p><strong>NodeName</strong></p><p>NodeName用于强制约束将Pod调度到指定的Name的Node节点上。这种方式，其实是直接跳过Scheduler的调度逻辑，直接将Pod调度到指定名称的节点。</p><p>接下来，实验一下：创建一个pod-nodename.yaml文件</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>nodename
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
      <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
  <span class="token key atrule">nodeName</span><span class="token punctuation">:</span> node1 <span class="token comment"># 指定调度到node1节点上</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#创建Pod</span>
kubectl create <span class="token parameter variable">-f</span> pod-nodename.yaml

pod/pod-nodename created

<span class="token comment">#查看Pod调度到NODE属性，确实是调度到了node1节点上</span>
kubectl get pods pod-nodename <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-o</span> wide

NAME           READY   STATUS    RESTARTS   AGE   IP            NODE      <span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
pod-nodename   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          56s   <span class="token number">10.244</span>.1.87   node1     <span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>   

<span class="token comment"># 接下来，删除pod，修改nodeName的值为node3（并没有node3节点）</span>
kubectl create <span class="token parameter variable">-f</span> pod-nodename.yaml

pod/pod-nodename created

<span class="token comment">#再次查看，发现已经向Node3节点调度，但是由于不存在node3节点，所以pod无法正常运行</span>
kubectl get pods pod-nodename <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-o</span> wide

NAME           READY   STATUS    RESTARTS   AGE   IP       NODE    <span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
pod-nodename   <span class="token number">0</span>/1     Pending   <span class="token number">0</span>          6s    <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>   node3   <span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>           
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>NodeSelector</strong></p><p>NodeSelector用于将pod调度到添加了指定标签的node节点上。它是通过kubernetes的label-selector机制实现的，也就是说，在pod创建之前，会由scheduler使用MatchNodeSelector调度策略进行label匹配，找出目标node，然后将pod调度到目标节点，该匹配规则是强制约束。</p><p>接下来，实验一下：</p><p>1 首先分别为node节点添加标签</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl label nodes node1 <span class="token assign-left variable">nodeenv</span><span class="token operator">=</span>pro

node/node2 labeled

kubectl label nodes node2 <span class="token assign-left variable">nodeenv</span><span class="token operator">=</span>test

node/node2 labeled
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2 创建一个pod-nodeselector.yaml文件，并使用它创建Pod</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>nodeselector
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
      <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
  <span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span>
    <span class="token key atrule">nodeenv</span><span class="token punctuation">:</span> pro <span class="token comment"># 指定调度到具有nodeenv=pro标签的节点上</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#创建Pod</span>
kubectl create <span class="token parameter variable">-f</span> pod-nodeselector.yaml

pod/pod-nodeselector created

<span class="token comment">#查看Pod调度到NODE属性，确实是调度到了node1节点上</span>
kubectl get pods pod-nodeselector <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-o</span> wide

NAME               READY   STATUS    RESTARTS   AGE     IP          NODE    <span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
pod-nodeselector   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          47s   <span class="token number">10.244</span>.1.87   node1   <span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>

<span class="token comment"># 接下来，删除pod，修改nodeSelector的值为nodeenv: xxxx（不存在打有此标签的节点）</span>
kubectl create <span class="token parameter variable">-f</span> pod-nodeselector.yaml

pod/pod-nodeselector created

<span class="token comment">#再次查看，发现pod无法正常运行,Node的值为none</span>
kubectl get pods <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-o</span> wide

NAME               READY   STATUS    RESTARTS   AGE     IP       NODE    
pod-nodeselector   <span class="token number">0</span>/1     Pending   <span class="token number">0</span>          2m20s   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>

<span class="token comment"># 查看详情,发现node selector匹配失败的提示</span>
kubectl describe pods pod-nodeselector <span class="token parameter variable">-n</span> dev

<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>.
Events:
  Type     Reason            Age        From               Message
  ----     ------            ----       ----               -------
  Warning  FailedScheduling  <span class="token operator">&lt;</span>unknown<span class="token operator">&gt;</span>  default-scheduler  <span class="token number">0</span>/3 nodes are available: <span class="token number">3</span> node<span class="token punctuation">(</span>s<span class="token punctuation">)</span> didn&#39;t match <span class="token function">node</span> selector.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-4-2-亲和性调度" tabindex="-1"><a class="header-anchor" href="#_5-4-2-亲和性调度" aria-hidden="true">#</a> 5.4.2 亲和性调度</h3><p>上一节，介绍了两种定向调度的方式，使用起来非常方便，但是也有一定的问题，那就是如果没有满足条件的Node，那么Pod将不会被运行，即使在集群中还有可用Node列表也不行，这就限制了它的使用场景。</p><p>基于上面的问题，kubernetes还提供了一种亲和性调度（Affinity）。它在NodeSelector的基础之上的进行了扩展，可以通过配置的形式，实现优先选择满足条件的Node进行调度，如果没有，也可以调度到不满足条件的节点上，使调度更加灵活。</p><p>Affinity主要分为三类：</p><ul><li>nodeAffinity(node亲和性）: 以node为目标，解决pod可以调度到哪些node的问题</li><li>podAffinity(pod亲和性) : 以pod为目标，解决pod可以和哪些已存在的pod部署在同一个拓扑域中的问题</li><li>podAntiAffinity(pod反亲和性) : 以pod为目标，解决pod不能和哪些已存在pod部署在同一个拓扑域中的问题</li></ul><blockquote><p>关于亲和性(反亲和性)使用场景的说明：</p><p><strong>亲和性</strong>：如果两个应用频繁交互，那就有必要利用亲和性让两个应用的尽可能的靠近，这样可以减少因网络通信而带来的性能损耗。</p><p><strong>反亲和性</strong>：当应用的采用多副本部署时，有必要采用反亲和性让各个应用实例打散分布在各个node上，这样可以提高服务的高可用性。</p></blockquote><p><strong>NodeAffinity</strong></p><p>首先来看一下<code>pod.spec.affinity.nodeAffinity</code>的可配置项：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>requiredDuringSchedulingIgnoredDuringExecution  Node节点必须满足指定的所有规则才可以，相当于硬限制
  nodeSelectorTerms  节点选择列表
    matchFields   按节点字段列出的节点选择器要求列表
    matchExpressions   按节点标签列出的节点选择器要求列表(推荐)
      key    键
      values 值
      operat or 关系符 支持Exists<span class="token punctuation">,</span> DoesNotExist<span class="token punctuation">,</span> In<span class="token punctuation">,</span> NotIn<span class="token punctuation">,</span> Gt<span class="token punctuation">,</span> Lt
preferredDuringSchedulingIgnoredDuringExecution 优先调度到满足指定的规则的Node，相当于软限制 (倾向)
  preference   一个节点选择器项，与相应的权重相关联
    matchFields   按节点字段列出的节点选择器要求列表
    matchExpressions   按节点标签列出的节点选择器要求列表(推荐)
      key    键
      values 值
      operator 关系符 支持In<span class="token punctuation">,</span> NotIn<span class="token punctuation">,</span> Exists<span class="token punctuation">,</span> DoesNotExist<span class="token punctuation">,</span> Gt<span class="token punctuation">,</span> Lt
  weight 倾向权重，在范围1<span class="token punctuation">-</span>100。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关系符的使用说明:</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> nodeenv              <span class="token comment"># 匹配存在标签的key为nodeenv的节点</span>
    <span class="token key atrule">operator</span><span class="token punctuation">:</span> Exists
  <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> nodeenv              <span class="token comment"># 匹配标签的key为nodeenv,且value是&quot;xxx&quot;或&quot;yyy&quot;的节点</span>
    <span class="token key atrule">operator</span><span class="token punctuation">:</span> In
    <span class="token key atrule">values</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;xxx&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;yyy&quot;</span><span class="token punctuation">]</span>
  <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> nodeenv              <span class="token comment"># 匹配标签的key为nodeenv,且value大于&quot;xxx&quot;的节点</span>
    <span class="token key atrule">operator</span><span class="token punctuation">:</span> Gt
    <span class="token key atrule">values</span><span class="token punctuation">:</span> <span class="token string">&quot;xxx&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来首先演示一下<code>requiredDuringSchedulingIgnoredDuringExecution</code> ,</p><p>创建pod-nodeaffinity-required.yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>nodeaffinity<span class="token punctuation">-</span>required
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
      <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
  <span class="token key atrule">affinity</span><span class="token punctuation">:</span>  <span class="token comment">#亲和性设置</span>
    <span class="token key atrule">nodeAffinity</span><span class="token punctuation">:</span> <span class="token comment">#设置node亲和性</span>
      <span class="token key atrule">requiredDuringSchedulingIgnoredDuringExecution</span><span class="token punctuation">:</span> <span class="token comment"># 硬限制</span>
        <span class="token key atrule">nodeSelectorTerms</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span> <span class="token comment"># 匹配env的值在[&quot;xxx&quot;,&quot;yyy&quot;]中的标签</span>
              <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> nodeenv
                <span class="token key atrule">operator</span><span class="token punctuation">:</span> In
                <span class="token key atrule">values</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;xxx&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;yyy&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建pod</span>
kubectl create <span class="token parameter variable">-f</span> pod-nodeaffinity-required.yaml

pod/pod-nodeaffinity-required created

<span class="token comment"># 查看pod状态 （运行失败）</span>
kubectl get pods pod-nodeaffinity-required <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-o</span> wide

NAME                        READY   STATUS    RESTARTS   AGE   IP       NODE    <span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span> 
pod-nodeaffinity-required   <span class="token number">0</span>/1     Pending   <span class="token number">0</span>          16s   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>  <span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>

<span class="token comment"># 查看Pod的详情</span>
<span class="token comment"># 发现调度失败，提示node选择失败</span>
kubectl describe pod pod-nodeaffinity-required <span class="token parameter variable">-n</span> dev

<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
  Warning  FailedScheduling  <span class="token operator">&lt;</span>unknown<span class="token operator">&gt;</span>  default-scheduler  <span class="token number">0</span>/3 nodes are available: <span class="token number">3</span> node<span class="token punctuation">(</span>s<span class="token punctuation">)</span> didn<span class="token string">&#39;t match node selector.
  Warning  FailedScheduling  &lt;unknown&gt;  default-scheduler  0/3 nodes are available: 3 node(s) didn&#39;</span>t match <span class="token function">node</span> selector.

<span class="token comment">#接下来，停止pod</span>
kubectl delete <span class="token parameter variable">-f</span> pod-nodeaffinity-required.yaml

pod <span class="token string">&quot;pod-nodeaffinity-required&quot;</span> deleted

<span class="token comment"># 修改文件，将values: [&quot;xxx&quot;,&quot;yyy&quot;]------&gt; [&quot;pro&quot;,&quot;yyy&quot;]</span>
<span class="token comment"># 再次启动</span>
kubectl create <span class="token parameter variable">-f</span> pod-nodeaffinity-required.yaml

pod/pod-nodeaffinity-required created

<span class="token comment"># 此时查看，发现调度成功，已经将pod调度到了node1上</span>
kubectl get pods pod-nodeaffinity-required <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-o</span> wide

NAME                        READY   STATUS    RESTARTS   AGE   IP            NODE  <span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span> 
pod-nodeaffinity-required   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          11s   <span class="token number">10.244</span>.1.89   node1 <span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来再演示一下<code>requiredDuringSchedulingIgnoredDuringExecution</code> ,</p><p>创建pod-nodeaffinity-preferred.yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>nodeaffinity<span class="token punctuation">-</span>preferred
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
      <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
  <span class="token key atrule">affinity</span><span class="token punctuation">:</span>  <span class="token comment">#亲和性设置</span>
    <span class="token key atrule">nodeAffinity</span><span class="token punctuation">:</span> <span class="token comment">#设置node亲和性</span>
      <span class="token key atrule">preferredDuringSchedulingIgnoredDuringExecution</span><span class="token punctuation">:</span> <span class="token comment"># 软限制</span>
        <span class="token punctuation">-</span> <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">1</span>
          <span class="token key atrule">preference</span><span class="token punctuation">:</span>
            <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span> <span class="token comment"># 匹配env的值在[&quot;xxx&quot;,&quot;yyy&quot;]中的标签(当前环境没有)</span>
              <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> nodeenv
                <span class="token key atrule">operator</span><span class="token punctuation">:</span> In
                <span class="token key atrule">values</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;xxx&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;yyy&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建pod</span>
kubectl create <span class="token parameter variable">-f</span> pod-nodeaffinity-preferred.yaml

pod/pod-nodeaffinity-preferred created

<span class="token comment"># 查看pod状态 （运行成功）</span>
kubectl get pod pod-nodeaffinity-preferred <span class="token parameter variable">-n</span> dev

NAME                         READY   STATUS    RESTARTS   AGE
pod-nodeaffinity-preferred   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          40s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>NodeAffinity规则设置的注意事项： 1 如果同时定义了nodeSelector和nodeAffinity，那么必须两个条件都得到满足，Pod才能运行在指定的Node上 2 如果nodeAffinity指定了多个nodeSelectorTerms，那么只需要其中一个能够匹配成功即可 3 如果一个nodeSelectorTerms中有多个matchExpressions ，则一个节点必须满足所有的才能匹配成功 4 如果一个pod所在的Node在Pod运行期间其标签发生了改变，不再符合该Pod的节点亲和性需求，则系统将忽略此变化</p></blockquote><p><strong>PodAffinity</strong></p><p>PodAffinity主要实现以运行的Pod为参照，实现让新创建的Pod跟参照pod在一个区域的功能。</p><p>首先来看一下<code>pod.spec.affinity.podAffinity</code>的可配置项：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>requiredDuringSchedulingIgnoredDuringExecution  硬限制
  namespaces       指定参照pod的namespace
  topologyKey      指定调度作用域
  labelSelector    标签选择器
    matchExpressions  按节点标签列出的节点选择器要求列表(推荐)
      key    键
      values 值
      operator 关系符 支持In<span class="token punctuation">,</span> NotIn<span class="token punctuation">,</span> Exists<span class="token punctuation">,</span> DoesNotExist.
    matchLabels    指多个matchExpressions映射的内容
preferredDuringSchedulingIgnoredDuringExecution 软限制
  podAffinityTerm  选项
    namespaces      
    topologyKey
    labelSelector
      matchExpressions  
        key    键
        values 值
        operator
      matchLabels
  weight 倾向权重，在范围1<span class="token punctuation">-</span><span class="token number">100</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>topologyKey用于指定调度时作用域,例如: 如果指定为kubernetes.io/hostname，那就是以Node节点为区分范围 如果指定为beta.kubernetes.io/os,则以Node节点的操作系统类型来区分</p><p>接下来，演示下<code>requiredDuringSchedulingIgnoredDuringExecution</code>,</p><p>1）首先创建一个参照Pod,pod-podaffinity-target.yaml：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>podaffinity<span class="token punctuation">-</span>target
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">podenv</span><span class="token punctuation">:</span> pro <span class="token comment">#设置标签</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
      <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
  <span class="token key atrule">nodeName</span><span class="token punctuation">:</span> node1 <span class="token comment"># 将目标pod名确指定到node1上</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动目标pod</span>
kubectl create <span class="token parameter variable">-f</span> pod-podaffinity-target.yaml

pod/pod-podaffinity-target created

<span class="token comment"># 查看pod状况</span>
kubectl get pods  pod-podaffinity-target <span class="token parameter variable">-n</span> dev

NAME                     READY   STATUS    RESTARTS   AGE
pod-podaffinity-target   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          4s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2）创建pod-podaffinity-required.yaml，内容如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>podaffinity<span class="token punctuation">-</span>required
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
      <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
  <span class="token key atrule">affinity</span><span class="token punctuation">:</span>  <span class="token comment">#亲和性设置</span>
    <span class="token key atrule">podAffinity</span><span class="token punctuation">:</span> <span class="token comment">#设置pod亲和性</span>
      <span class="token key atrule">requiredDuringSchedulingIgnoredDuringExecution</span><span class="token punctuation">:</span> <span class="token comment"># 硬限制</span>
        <span class="token punctuation">-</span> <span class="token key atrule">labelSelector</span><span class="token punctuation">:</span>
            <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span> <span class="token comment"># 匹配env的值在[&quot;xxx&quot;,&quot;yyy&quot;]中的标签</span>
              <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> podenv
                <span class="token key atrule">operator</span><span class="token punctuation">:</span> In
                <span class="token key atrule">values</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;xxx&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;yyy&quot;</span><span class="token punctuation">]</span>
          <span class="token key atrule">topologyKey</span><span class="token punctuation">:</span> kubernetes.io/hostname
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面配置表达的意思是：新Pod必须要与拥有标签nodeenv=xxx或者nodeenv=yyy的pod在同一Node上，显然现在没有这样pod，接下来，运行测试一下。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动pod</span>
kubectl create <span class="token parameter variable">-f</span> pod-podaffinity-required.yaml

pod/pod-podaffinity-required created

<span class="token comment"># 查看pod状态，发现未运行</span>
kubectl get pods pod-podaffinity-required <span class="token parameter variable">-n</span> dev

NAME                       READY   STATUS    RESTARTS   AGE
pod-podaffinity-required   <span class="token number">0</span>/1     Pending   <span class="token number">0</span>          9s

<span class="token comment"># 查看详细信息</span>
kubectl describe pods pod-podaffinity-required  <span class="token parameter variable">-n</span> dev

<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
Events:
  Type     Reason            Age        From               Message
  ----     ------            ----       ----               -------
  Warning  FailedScheduling  <span class="token operator">&lt;</span>unknown<span class="token operator">&gt;</span>  default-scheduler  <span class="token number">0</span>/3 nodes are available: <span class="token number">2</span> node<span class="token punctuation">(</span>s<span class="token punctuation">)</span> didn<span class="token string">&#39;t match pod affinity rules, 1 node(s) had taints that the pod didn&#39;</span>t tolerate.

<span class="token comment"># 接下来修改  values: [&quot;xxx&quot;,&quot;yyy&quot;]-----&gt;values:[&quot;pro&quot;,&quot;yyy&quot;]</span>
<span class="token comment"># 意思是：新Pod必须要与拥有标签nodeenv=xxx或者nodeenv=yyy的pod在同一Node上</span>
<span class="token comment"># 然后重新创建pod，查看效果</span>
kubectl create <span class="token parameter variable">-f</span> pod-podaffinity-required.yaml

pod/pod-podaffinity-required created

<span class="token comment"># 发现此时Pod运行正常</span>
kubectl get pods pod-podaffinity-required <span class="token parameter variable">-n</span> dev

NAME                       READY   STATUS    RESTARTS   AGE   LABELS
pod-podaffinity-required   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          6s    <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于<code>PodAffinity</code>的 <code>preferredDuringSchedulingIgnoredDuringExecution</code>，这里不再演示。</p><p><strong>PodAntiAffinity</strong></p><p>PodAntiAffinity主要实现以运行的Pod为参照，让新创建的Pod跟参照pod不在一个区域中的功能。</p><p>它的配置方式和选项跟PodAffinty是一样的，这里不再做详细解释，直接做一个测试案例。</p><p>1）继续使用上个案例中目标pod</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl get pods <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-o</span> wide --show-labels

NAME                     READY   STATUS    RESTARTS   AGE     IP            NODE    LABELS
pod-podaffinity-required <span class="token number">1</span>/1     Running   <span class="token number">0</span>          3m29s   <span class="token number">10.244</span>.1.38   node1   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>     
pod-podaffinity-target   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          9m25s   <span class="token number">10.244</span>.1.37   node1   <span class="token assign-left variable">podenv</span><span class="token operator">=</span>pro
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2）创建pod-podantiaffinity-required.yaml，内容如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>podantiaffinity<span class="token punctuation">-</span>required
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
      <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
  <span class="token key atrule">affinity</span><span class="token punctuation">:</span>  <span class="token comment">#亲和性设置</span>
    <span class="token key atrule">podAntiAffinity</span><span class="token punctuation">:</span> <span class="token comment">#设置pod亲和性</span>
      <span class="token key atrule">requiredDuringSchedulingIgnoredDuringExecution</span><span class="token punctuation">:</span> <span class="token comment"># 硬限制</span>
        <span class="token punctuation">-</span> <span class="token key atrule">labelSelector</span><span class="token punctuation">:</span>
            <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span> <span class="token comment"># 匹配podenv的值在[&quot;pro&quot;]中的标签</span>
              <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> podenv
                <span class="token key atrule">operator</span><span class="token punctuation">:</span> In
                <span class="token key atrule">values</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;pro&quot;</span><span class="token punctuation">]</span>
          <span class="token key atrule">topologyKey</span><span class="token punctuation">:</span> kubernetes.io/hostname
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面配置表达的意思是：新Pod必须要与拥有标签nodeenv=pro的pod不在同一Node上，运行测试一下。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建pod</span>
kubectl create <span class="token parameter variable">-f</span> pod-podantiaffinity-required.yaml

pod/pod-podantiaffinity-required created

<span class="token comment"># 查看pod</span>
<span class="token comment"># 发现调度到了node2上</span>
kubectl get pods pod-podantiaffinity-required <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-o</span> wide

NAME                           READY   STATUS    RESTARTS   AGE   IP            NODE   <span class="token punctuation">..</span> 
pod-podantiaffinity-required   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          30s   <span class="token number">10.244</span>.1.96   node2  <span class="token punctuation">..</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-4-3-污点和容忍" tabindex="-1"><a class="header-anchor" href="#_5-4-3-污点和容忍" aria-hidden="true">#</a> 5.4.3 污点和容忍</h3><p><strong>污点（Taints）</strong></p><p>前面的调度方式都是站在Pod的角度上，通过在Pod上添加属性，来确定Pod是否要调度到指定的Node上，其实我们也可以站在Node的角度上，通过在Node上添加<strong>污点</strong>属性，来决定是否允许Pod调度过来。</p><p>Node被设置上污点之后就和Pod之间存在了一种相斥的关系，进而拒绝Pod调度进来，甚至可以将已经存在的Pod驱逐出去。</p><p>污点的格式为：<code>key=value:effect</code>, key和value是污点的标签，effect描述污点的作用，支持如下三个选项：</p><ul><li>PreferNoSchedule：kubernetes将尽量避免把Pod调度到具有该污点的Node上，除非没有其他节点可调度</li><li>NoSchedule：kubernetes将不会把Pod调度到具有该污点的Node上，但不会影响当前Node上已存在的Pod</li><li>NoExecute：kubernetes将不会把Pod调度到具有该污点的Node上，同时也会将Node上已存在的Pod驱离</li></ul><p><img src="`+r+`" alt="image-20200605021606508"></p><p>使用kubectl设置和去除污点的命令示例如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 设置污点</span>
kubectl taint nodes node1 <span class="token assign-left variable">key</span><span class="token operator">=</span>value:effect

<span class="token comment"># 去除污点</span>
kubectl taint nodes node1 key:effect-

<span class="token comment"># 去除所有污点</span>
kubectl taint nodes node1 key-
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，演示下污点的效果：</p><ol><li>准备节点node1（为了演示效果更加明显，暂时停止node2节点）</li><li>为node1节点设置一个污点: <code>tag=heima:PreferNoSchedule</code>；然后创建pod1( pod1 可以 )</li><li>修改为node1节点设置一个污点: <code>tag=heima:NoSchedule</code>；然后创建pod2( pod1 正常 pod2 失败 )</li><li>修改为node1节点设置一个污点: <code>tag=heima:NoExecute</code>；然后创建pod3 ( 3个pod都失败 )</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 为node1设置污点(PreferNoSchedule)</span>
kubectl taint nodes node1 <span class="token assign-left variable">tag</span><span class="token operator">=</span>heima:PreferNoSchedule

<span class="token comment"># 创建pod1</span>
kubectl run taint1 <span class="token parameter variable">--image</span><span class="token operator">=</span>nginx:1.17.1 <span class="token parameter variable">-n</span> dev

kubectl get pods <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-o</span> wide
NAME                      READY   STATUS    RESTARTS   AGE     IP           NODE   
taint1-7665f7fd85-574h4   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          2m24s   <span class="token number">10.244</span>.1.59   node1    

<span class="token comment"># 为node1设置污点(取消PreferNoSchedule，设置NoSchedule)</span>
kubectl taint nodes node1 tag:PreferNoSchedule-
kubectl taint nodes node1 <span class="token assign-left variable">tag</span><span class="token operator">=</span>heima:NoSchedule

<span class="token comment"># 创建pod2</span>
kubectl run taint2 <span class="token parameter variable">--image</span><span class="token operator">=</span>nginx:1.17.1 <span class="token parameter variable">-n</span> dev
kubectl get pods taint2 <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-o</span> wide

NAME                      READY   STATUS    RESTARTS   AGE     IP            NODE
taint1-7665f7fd85-574h4   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          2m24s   <span class="token number">10.244</span>.1.59   node1 
taint2-544694789-6zmlf    <span class="token number">0</span>/1     Pending   <span class="token number">0</span>          21s     <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>   

<span class="token comment"># 为node1设置污点(取消NoSchedule，设置NoExecute)</span>
kubectl taint nodes node1 tag:NoSchedule-
kubectl taint nodes node1 <span class="token assign-left variable">tag</span><span class="token operator">=</span>heima:NoExecute

<span class="token comment"># 创建pod3</span>
kubectl run taint3 <span class="token parameter variable">--image</span><span class="token operator">=</span>nginx:1.17.1 <span class="token parameter variable">-n</span> dev
kubectl get pods <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-o</span> wide

NAME                      READY   STATUS    RESTARTS   AGE   IP       NODE     NOMINATED 
taint1-7665f7fd85-htkmp   <span class="token number">0</span>/1     Pending   <span class="token number">0</span>          35s   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>    
taint2-544694789-bn7wb    <span class="token number">0</span>/1     Pending   <span class="token number">0</span>          35s   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>     
taint3-6d78dbd749-tktkq   <span class="token number">0</span>/1     Pending   <span class="token number">0</span>          6s    <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>     
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,191),x=n("div",{class:"custom-container tip"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8h.01"}),n("path",{d:"M11 12h1v4h1"})])]),n("p",{class:"custom-container-title"},"TIP"),n("p",null,"小提示： 使用kubeadm搭建的集群，默认就会给master节点添加一个污点标记,所以pod就不会调度到master节点上.")],-1),f=a('<p><strong>容忍（Toleration）</strong></p><p>上面介绍了污点的作用，我们可以在node上添加污点用于拒绝pod调度上来，但是如果就是想将一个pod调度到一个有污点的node上去，这时候应该怎么做呢？这就要使用到<strong>容忍</strong>。</p><p><img src="'+v+`" alt="image-20200514095913741"></p><blockquote><p>污点就是拒绝，容忍就是忽略，Node通过污点拒绝pod调度上去，Pod通过容忍忽略拒绝</p></blockquote><p>下面先通过一个案例看下效果：</p><ol><li>上一小节，已经在node1节点上打上了<code>NoExecute</code>的污点，此时pod是调度不上去的</li><li>本小节，可以通过给pod添加容忍，然后将其调度上去</li></ol><p>创建pod-toleration.yaml,内容如下</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>toleration
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
      <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
  <span class="token key atrule">tolerations</span><span class="token punctuation">:</span>      <span class="token comment"># 添加容忍</span>
    <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> <span class="token string">&quot;tag&quot;</span>        <span class="token comment"># 要容忍的污点的key</span>
      <span class="token key atrule">operator</span><span class="token punctuation">:</span> <span class="token string">&quot;Equal&quot;</span> <span class="token comment"># 操作符</span>
      <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;heima&quot;</span>    <span class="token comment"># 容忍的污点的value</span>
      <span class="token key atrule">effect</span><span class="token punctuation">:</span> <span class="token string">&quot;NoExecute&quot;</span>   <span class="token comment"># 添加容忍的规则，这里必须和标记的污点规则相同</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 添加容忍之前的pod</span>
kubectl get pods <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-o</span> wide

NAME             READY   STATUS    RESTARTS   AGE   IP       NODE     NOMINATED 
pod-toleration   <span class="token number">0</span>/1     Pending   <span class="token number">0</span>          3s    <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           

<span class="token comment"># 添加容忍之后的pod</span>
kubectl get pods <span class="token parameter variable">-n</span> dev <span class="token parameter variable">-o</span> wide

NAME             READY   STATUS    RESTARTS   AGE   IP            NODE    NOMINATED
pod-toleration   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          3s    <span class="token number">10.244</span>.1.62   node1   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面看一下容忍的详细配置:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl explain pod.spec.tolerations

<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
FIELDS:
   key       <span class="token comment"># 对应着要容忍的污点的键，空意味着匹配所有的键</span>
   value     <span class="token comment"># 对应着要容忍的污点的值</span>
   operator  <span class="token comment"># key-value的运算符，支持Equal和Exists（默认）</span>
   effect    <span class="token comment"># 对应污点的effect，空意味着匹配所有影响</span>
   tolerationSeconds   <span class="token comment"># 容忍时间, 当effect为NoExecute时生效，表示pod在Node上的停留时间</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11);function P(S,E){const e=p("ExternalLinkIcon");return i(),o("div",null,[n("p",null,[n("a",m,[s("原文链接"),t(e)]),s(),n("a",b,[s("视频教程"),t(e)])]),g,y,h,x,f])}const A=l(k,[["render",P],["__file","k8s-pod.html.vue"]]);export{A as default};
