import{_ as t,r as p,o as i,c as l,b as n,d as s,e,a as c}from"./app-U2nchfLp.js";const o="/assets/wiki-language-W8C_NslO.png",u="/assets/wiki-search-nzuSO0Xr.png",r="/assets/wiki-storage-1OuB8EEy.png",d="/assets/wiki-search-1-OlKNWTsW.png",k={},v={href:"https://blog.csdn.net/fenglailea/article/details/128615789",target:"_blank",rel:"noopener noreferrer"},m={href:"https://js.wiki/",target:"_blank",rel:"noopener noreferrer"},b=n("h1",{id:"k8s部署-wiki-js-带中文分词",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#k8s部署-wiki-js-带中文分词","aria-hidden":"true"},"#"),s(" k8s部署 wiki.js ,带中文分词")],-1),y=n("h2",{id:"_1-1-k8s-postgres-安装",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-1-k8s-postgres-安装","aria-hidden":"true"},"#"),s(" 1.1 k8s postgres 安装")],-1),h=n("p",null,"因为包含中文分词，要在原版的基础上增加分词插件,这里直接使用别人已经制作好的镜像",-1),g={href:"https://github.com/abcfy2/docker_zhparser",target:"_blank",rel:"noopener noreferrer"},w={href:"https://hub.docker.com/r/abcfy2/zhparser",target:"_blank",rel:"noopener noreferrer"},_=c(`<p>这里选择 <code>postgres 15</code> 版本，即 <code>docker pull abcfy2/zhparser:15-alpine</code></p><p>那么最后的 <code>k8s postgres</code> 配置文件如下</p><p><strong>postgresql-pod.yml</strong></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> postgres
  <span class="token key atrule">name</span><span class="token punctuation">:</span> postgres
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">revisionHistoryLimit</span><span class="token punctuation">:</span> <span class="token number">5</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> postgres
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> postgres
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">env</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> TZ
              <span class="token key atrule">value</span><span class="token punctuation">:</span> Asia/Shanghai
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> POSTGRES_USER
              <span class="token key atrule">value</span><span class="token punctuation">:</span> fox
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> POSTGRES_PASSWORD
              <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&#39;123456&#39;</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> ALLOW_IP_RANGE
              <span class="token key atrule">value</span><span class="token punctuation">:</span> 0.0.0.0/0
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> PGDATA
              <span class="token key atrule">value</span><span class="token punctuation">:</span> /var/lib/postgresql/data
          <span class="token comment">#image: &#39;postgres:15-alpine&#39;</span>
          <span class="token comment"># 使用支持 中文分词的 </span>
          <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token string">&#39;abcfy2/zhparser:15-alpine&#39;</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> postgres
          <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">5432</span>
              <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
<span class="token comment">#          resources:</span>
<span class="token comment">#            limits:</span>
<span class="token comment">#              memory: 2Gi</span>
<span class="token comment">#            requests:</span>
<span class="token comment">#              memory: 2Gi</span>
          <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> vm<span class="token punctuation">-</span>data
              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/lib/postgresql/data

      <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Always
      <span class="token key atrule">terminationGracePeriodSeconds</span><span class="token punctuation">:</span> <span class="token number">30</span>
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> vm<span class="token punctuation">-</span>data
          <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
            <span class="token comment"># 宿主机目录</span>
            <span class="token key atrule">path</span><span class="token punctuation">:</span> /www/websites/postgresql/data
            <span class="token comment"># hostPath 卷指定 type，如果目录不存在则创建(可创建多层目录)</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> DirectoryOrCreate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>postgresql-svc.yml</strong></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> postgres
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> postgres
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">5432</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">5432</span>
      <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">30432</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> postgres
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>30432 : 为 外部端口</p><p>POSTGRES_USER : 数据库账号 fox，默认创建的库名是 同账号名 即 fox</p><p>POSTGRES_PASSWORD: 数据库密码 123456</p></blockquote><h3 id="应用并生效" tabindex="-1"><a class="header-anchor" href="#应用并生效" aria-hidden="true">#</a> 应用并生效</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> postgresql-pod.yaml
kubectl apply <span class="token parameter variable">-f</span> postgresql-svc.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>设置目录可写</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /www/websites/postgresql/data
<span class="token function">chmod</span> <span class="token parameter variable">-R</span> <span class="token number">777</span> /www/websites/postgresql/data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置-wiki数据库" tabindex="-1"><a class="header-anchor" href="#配置-wiki数据库" aria-hidden="true">#</a> 配置 wiki数据库</h2><h3 id="进入pod" tabindex="-1"><a class="header-anchor" href="#进入pod" aria-hidden="true">#</a> 进入pod</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> <span class="token variable"><span class="token variable">\`</span>kubectl get pods <span class="token operator">|</span> <span class="token function">grep</span> postgres <span class="token operator">|</span>  <span class="token function">awk</span> <span class="token string">&#39;{print $1}&#39;</span><span class="token variable">\`</span></span> <span class="token function">bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="创建-wiki-使用-用户和库-设置数据库相关" tabindex="-1"><a class="header-anchor" href="#创建-wiki-使用-用户和库-设置数据库相关" aria-hidden="true">#</a> 创建 wiki 使用 用户和库 设置数据库相关</h3><p>登录</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 登陆 fox用户</span>
psql <span class="token parameter variable">-U</span> fox
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>生成用户，数据库，给用户管理员权限（创建插件用）</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 创建用户及密码</span>
<span class="token keyword">CREATE</span> <span class="token keyword">USER</span> wikijs <span class="token keyword">WITH</span> PASSWORD <span class="token string">&#39;wikijs&#39;</span><span class="token punctuation">;</span>
<span class="token comment">-- 创建库及库所属人</span>
<span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> wikijs_db OWNER wikijs<span class="token punctuation">;</span>
<span class="token comment">-- 设置权限</span>
<span class="token keyword">GRANT</span> <span class="token keyword">ALL</span> <span class="token keyword">PRIVILEGES</span> <span class="token keyword">ON</span> <span class="token keyword">DATABASE</span> wikijs_db <span class="token keyword">to</span> wikijs<span class="token punctuation">;</span>
<span class="token comment">-- 设置用户为超级用户</span>
<span class="token keyword">ALTER</span> <span class="token keyword">USER</span> wikijs <span class="token keyword">WITH</span> SUPERUSER<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后 <code>exit</code> 退出数据库命令行</p><h3 id="设置-wikijs-用户下-库相关" tabindex="-1"><a class="header-anchor" href="#设置-wikijs-用户下-库相关" aria-hidden="true">#</a> 设置 wikijs 用户下 库相关</h3><p>登录</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 登陆 wikijs用户</span>
psql <span class="token parameter variable">-U</span> wikijs <span class="token parameter variable">-d</span> wikijs_db
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>表相关操作</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 创建扩展表</span>
<span class="token comment">-- https://docs.requarks.io/en/search/postgres</span>
<span class="token keyword">CREATE</span> EXTENSION pg_trgm<span class="token punctuation">;</span>

<span class="token keyword">CREATE</span> EXTENSION zhparser<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TEXT</span> SEARCH CONFIGURATION pg_catalog<span class="token punctuation">.</span>chinese_zh <span class="token punctuation">(</span>PARSER <span class="token operator">=</span> zhparser<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TEXT</span> SEARCH CONFIGURATION chinese_zh <span class="token keyword">ADD</span> MAPPING <span class="token keyword">FOR</span> n<span class="token punctuation">,</span>v<span class="token punctuation">,</span>a<span class="token punctuation">,</span>i<span class="token punctuation">,</span>e<span class="token punctuation">,</span>l <span class="token keyword">WITH</span> <span class="token keyword">simple</span><span class="token punctuation">;</span>

<span class="token comment">-- [二、PostgerSQL全文检索系统之中文支持_jjj的博客-CSDN博客](https://blog.csdn.net/weixin_40746796/article/details/89209316)</span>
<span class="token comment">-- 忽略标点影响</span>
<span class="token keyword">ALTER</span> ROLE wikijs <span class="token keyword">SET</span> zhparser<span class="token punctuation">.</span>punctuation_ignore <span class="token operator">=</span> <span class="token keyword">ON</span><span class="token punctuation">;</span>
<span class="token comment">-- 短词复合</span>
<span class="token keyword">ALTER</span> ROLE wikijs <span class="token keyword">SET</span> zhparser<span class="token punctuation">.</span>multi_short <span class="token operator">=</span> <span class="token keyword">ON</span><span class="token punctuation">;</span>

<span class="token comment">-- 看看 chinese_zh 在不在</span>
\\dF
<span class="token comment">-- 测试一下</span>
<span class="token keyword">select</span> ts_debug<span class="token punctuation">(</span><span class="token string">&#39;chinese_zh&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;白垩纪是地球上海陆分布和生物界急剧变化、火山活动频繁的时代&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后 <code>exit</code> 退出数据库命令行</p><h3 id="设置wikijs用户为普通用户权限" tabindex="-1"><a class="header-anchor" href="#设置wikijs用户为普通用户权限" aria-hidden="true">#</a> 设置wikijs用户为普通用户权限</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 登陆 fox用户</span>
psql <span class="token parameter variable">-U</span> fox <span class="token parameter variable">-d</span> fox
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>表相关操作</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- UPDATE：之前提示 pg_catalog 没权限，这里再执行一次！</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TEXT</span> SEARCH CONFIGURATION pg_catalog<span class="token punctuation">.</span>chinese_zh <span class="token punctuation">(</span>PARSER <span class="token operator">=</span> zhparser<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">ALTER</span> <span class="token keyword">USER</span> wikijs <span class="token keyword">WITH</span> NOSUPERUSER<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后 <code>exit</code> 退出数据库命令行</p><p>到此数据库配置完成</p><h2 id="k8s-配置-wiki" tabindex="-1"><a class="header-anchor" href="#k8s-配置-wiki" aria-hidden="true">#</a> k8s 配置 wiki</h2><p><strong>wiki-pod.yml</strong></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> wiki
  <span class="token key atrule">name</span><span class="token punctuation">:</span> wiki
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">revisionHistoryLimit</span><span class="token punctuation">:</span> <span class="token number">5</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> wiki
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> wiki
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">env</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> TZ
              <span class="token key atrule">value</span><span class="token punctuation">:</span> Asia/Shanghai
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DB_USER
              <span class="token key atrule">value</span><span class="token punctuation">:</span> fox
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DB_PASS
              <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&#39;123456&#39;</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DB_NAME
              <span class="token key atrule">value</span><span class="token punctuation">:</span> wikijs_db
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DB_HOST
              <span class="token key atrule">value</span><span class="token punctuation">:</span> postgres
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DB_TYPE
              <span class="token key atrule">value</span><span class="token punctuation">:</span> postgres
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DB_PORT
              <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;5432&quot;</span>
          <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token string">&#39;ghcr.io/requarks/wiki:2&#39;</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> wiki
          <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">3000</span>
              <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
<span class="token comment">#          resources:</span>
<span class="token comment">#            limits:</span>
<span class="token comment">#              memory: 2Gi</span>
<span class="token comment">#            requests:</span>
<span class="token comment">#              memory: 2Gi</span>
          <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> vm<span class="token punctuation">-</span>data
              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /wiki/data
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> vm<span class="token punctuation">-</span>content
              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /wiki/content

      <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Always
      <span class="token key atrule">terminationGracePeriodSeconds</span><span class="token punctuation">:</span> <span class="token number">30</span>
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> vm<span class="token punctuation">-</span>data
          <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
            <span class="token comment"># 宿主机目录</span>
            <span class="token key atrule">path</span><span class="token punctuation">:</span> /www/websites/wiki/data
            <span class="token comment"># hostPath 卷指定 type，如果目录不存在则创建(可创建多层目录)</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> DirectoryOrCreate
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> vm<span class="token punctuation">-</span>content
          <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
            <span class="token comment"># 宿主机目录</span>
            <span class="token key atrule">path</span><span class="token punctuation">:</span> /www/websites/wiki/content
            <span class="token comment"># hostPath 卷指定 type，如果目录不存在则创建(可创建多层目录)</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> DirectoryOrCreate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>wiki-svc.yml</strong></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> wiki
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> wiki
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3000</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">3000</span>
      <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">30300</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> wiki
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>30300 : 为 外部端口</p><p>外部浏览器访问 http://ip:30300 即可打开 wiki.js</p></blockquote><h3 id="应用并生效-1" tabindex="-1"><a class="header-anchor" href="#应用并生效-1" aria-hidden="true">#</a> 应用并生效</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> wiki-pod.yml
kubectl apply <span class="token parameter variable">-f</span> wiki-svc.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>设置目录可写</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /www/websites/wiki/data
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /www/websites/wiki/content
<span class="token function">chmod</span> <span class="token parameter variable">-R</span> <span class="token number">777</span> /www/websites/wiki/data
<span class="token function">chmod</span> <span class="token parameter variable">-R</span> <span class="token number">777</span> /www/websites/wiki/content
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="设置-wiki-可以使用中文分词" tabindex="-1"><a class="header-anchor" href="#设置-wiki-可以使用中文分词" aria-hidden="true">#</a> 设置 wiki 可以使用中文分词</h2><p>进入 pod 内部</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> <span class="token variable"><span class="token variable">\`</span>kubectl get pods <span class="token operator">|</span> <span class="token function">grep</span> wiki <span class="token operator">|</span>  <span class="token function">awk</span> <span class="token string">&#39;{print $1}&#39;</span><span class="token variable">\`</span></span> <span class="token function">bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>显示 <code>definition.yml</code> 文件内容，</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> /wiki/server/modules/search/postgres/definition.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>把上面显示的内容复制到主机 <code>/www/websites/wiki/search/definition.yml</code> 文件中，如果没有目录的，要先创建好目录或文件 修改 <code>/www/websites/wiki/search/definition.yml</code> 文件 ，案例如下 主要是在 <code>- turkish</code> 下面一行增加 <code>- chinese_zh</code> 格式要一致</p><p><strong>请不要直接复制以下案例内容，因为有的版本该文件会增加其他功能字段</strong></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">key</span><span class="token punctuation">:</span> postgres
<span class="token key atrule">title</span><span class="token punctuation">:</span> Database <span class="token punctuation">-</span> PostgreSQL
<span class="token key atrule">description</span><span class="token punctuation">:</span> Advanced PostgreSQL<span class="token punctuation">-</span>based search engine.
<span class="token key atrule">author</span><span class="token punctuation">:</span> requarks.io
<span class="token key atrule">logo</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//static.requarks.io/logo/postgresql.svg
<span class="token key atrule">website</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//www.requarks.io/
<span class="token key atrule">isAvailable</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">props</span><span class="token punctuation">:</span>
  <span class="token key atrule">dictLanguage</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> String
    <span class="token key atrule">title</span><span class="token punctuation">:</span> Dictionary Language
    <span class="token key atrule">hint</span><span class="token punctuation">:</span> Language to use when creating and querying text search vectors.
    <span class="token key atrule">default</span><span class="token punctuation">:</span> english
    <span class="token key atrule">enum</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> simple
      <span class="token punctuation">-</span> danish
      <span class="token punctuation">-</span> dutch
      <span class="token punctuation">-</span> english
      <span class="token punctuation">-</span> finnish
      <span class="token punctuation">-</span> french
      <span class="token punctuation">-</span> german
      <span class="token punctuation">-</span> hungarian
      <span class="token punctuation">-</span> italian
      <span class="token punctuation">-</span> norwegian
      <span class="token punctuation">-</span> portuguese
      <span class="token punctuation">-</span> romanian
      <span class="token punctuation">-</span> russian
      <span class="token punctuation">-</span> spanish
      <span class="token punctuation">-</span> swedish
      <span class="token punctuation">-</span> turkish
      <span class="token punctuation">-</span> chinese_zh
    <span class="token key atrule">order</span><span class="token punctuation">:</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改 pod 配置</p><p>新增 <code>wiki-pod-new.yml</code> 文件</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> wiki
  <span class="token key atrule">name</span><span class="token punctuation">:</span> wiki
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">revisionHistoryLimit</span><span class="token punctuation">:</span> <span class="token number">5</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> wiki
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> wiki
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">env</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> TZ
              <span class="token key atrule">value</span><span class="token punctuation">:</span> Asia/Shanghai
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DB_USER
              <span class="token key atrule">value</span><span class="token punctuation">:</span> fox
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DB_PASS
              <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&#39;123456&#39;</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DB_NAME
              <span class="token key atrule">value</span><span class="token punctuation">:</span> wikijs_db
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DB_HOST
              <span class="token key atrule">value</span><span class="token punctuation">:</span> postgres
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DB_TYPE
              <span class="token key atrule">value</span><span class="token punctuation">:</span> postgres
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DB_PORT
              <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;5432&quot;</span>
          <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token string">&#39;ghcr.io/requarks/wiki:2&#39;</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> wiki
          <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">3000</span>
              <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
<span class="token comment">#          resources:</span>
<span class="token comment">#            limits:</span>
<span class="token comment">#              memory: 2Gi</span>
<span class="token comment">#            requests:</span>
<span class="token comment">#              memory: 2Gi</span>
          <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> vm<span class="token punctuation">-</span>data
              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /wiki/data
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> vm<span class="token punctuation">-</span>content
              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /wiki/content
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> vm<span class="token punctuation">-</span>definition
              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /wiki/server/modules/search/postgres/definition.yml
      <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Always
      <span class="token key atrule">terminationGracePeriodSeconds</span><span class="token punctuation">:</span> <span class="token number">30</span>
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> vm<span class="token punctuation">-</span>data
          <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
            <span class="token comment"># 宿主机目录</span>
            <span class="token key atrule">path</span><span class="token punctuation">:</span> /www/websites/wiki/data
            <span class="token comment"># hostPath 卷指定 type，如果目录不存在则创建(可创建多层目录)</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> DirectoryOrCreate
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> vm<span class="token punctuation">-</span>content
          <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
            <span class="token comment"># 宿主机目录</span>
            <span class="token key atrule">path</span><span class="token punctuation">:</span> /www/websites/wiki/content
            <span class="token comment"># hostPath 卷指定 type，如果目录不存在则创建(可创建多层目录)</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> DirectoryOrCreate
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> vm<span class="token punctuation">-</span>definition
          <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
            <span class="token key atrule">path</span><span class="token punctuation">:</span> /www/websites/wiki/search/definition.yml
            <span class="token key atrule">type</span><span class="token punctuation">:</span> FileOrCreate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="应用并生效-2" tabindex="-1"><a class="header-anchor" href="#应用并生效-2" aria-hidden="true">#</a> 应用并生效</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl delete <span class="token parameter variable">-f</span> wiki-pod.yml
kubectl apply <span class="token parameter variable">-f</span> wiki-pod-new.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置-wiki" tabindex="-1"><a class="header-anchor" href="#配置-wiki" aria-hidden="true">#</a> 配置 wiki</h2><p>通过域名打开 <code>http://ip:30300</code> ,开始配置wiki。配置管理员邮箱、密码、wiki登录地址。</p><h3 id="配置-中文" tabindex="-1"><a class="header-anchor" href="#配置-中文" aria-hidden="true">#</a> 配置 中文</h3><p>如果要配置语言为中文的的，在这个页面下 <code>http://ip:30300/a/locale</code></p><p><img src="`+o+'" alt="切换语言"></p><h3 id="配置-中文搜索" tabindex="-1"><a class="header-anchor" href="#配置-中文搜索" aria-hidden="true">#</a> 配置 中文搜索</h3><p>wiki.js -&gt; 管理 -&gt; 搜索引擎 -&gt; Database - PostgreSQL -&gt; Dictionary Language</p><p>选 chinese_zh</p><p><img src="'+u+'" alt="搜索引擎"></p><h3 id="配置文件存储" tabindex="-1"><a class="header-anchor" href="#配置文件存储" aria-hidden="true">#</a> 配置文件存储</h3><p>如果不配置，那么文件创建，或者上传文件会在pod容器内部，无法持久话，会丢失附件 配置板 -&gt; 存储 -&gt; Local File System -&gt; 目标配置 内容修改为 <code>/wiki/content</code> 最后 应用 并生效</p><p><img src="'+r+'" alt="配置存储"></p><p>此时就可以使用全文检索了，如果检索不到，可以进行手动更新索引</p><p><img src="'+d+'" alt="搜索引擎"></p>',69);function f(P,E){const a=p("ExternalLinkIcon");return i(),l("div",null,[n("p",null,[n("a",v,[s("原文链接"),e(a)]),s(),n("a",m,[s("wiki官网"),e(a)])]),b,y,h,n("p",null,[s("github 地址 : "),n("a",g,[s("https://github.com/abcfy2/docker_zhparser"),e(a)])]),n("p",null,[s("镜像地址： "),n("a",w,[s("https://hub.docker.com/r/abcfy2/zhparser"),e(a)])]),_])}const x=t(k,[["render",f],["__file","k8s-wiki.html.vue"]]);export{x as default};
