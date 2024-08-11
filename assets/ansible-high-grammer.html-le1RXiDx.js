import{_ as t,r as l,o as i,c as p,b as n,t as c,d as a,e as o,a as s}from"./app-m_Ib8w5j.js";const u={},d=s(`<h2 id="ansible-高级语法" tabindex="-1"><a class="header-anchor" href="#ansible-高级语法" aria-hidden="true">#</a> ansible 高级语法</h2><h3 id="默认-ansible-在遇到-error-会立刻停止-playbook" tabindex="-1"><a class="header-anchor" href="#默认-ansible-在遇到-error-会立刻停止-playbook" aria-hidden="true">#</a> 默认 ansible 在遇到 error 会立刻停止 playbook</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span> test
  <span class="token key atrule">ignore_errors</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 全局忽略错误</span>
  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 启动一个不存在的服务
      <span class="token key atrule">ignore_errors</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 此任务是否忽略错误</span>
      <span class="token key atrule">service</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> hehe
        <span class="token key atrule">state</span><span class="token punctuation">:</span> started
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 创建一个文件
      <span class="token key atrule">file</span><span class="token punctuation">:</span>
        <span class="token key atrule">path</span><span class="token punctuation">:</span> ~/tmp/test.txt
        <span class="token key atrule">state</span><span class="token punctuation">:</span> touch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="handlers" tabindex="-1"><a class="header-anchor" href="#handlers" aria-hidden="true">#</a> handlers</h3><p>当某个任务需要依赖其他任务怎么办?</p><ul><li>可以通过handlers定义一组任务</li><li>仅当某个任务触发(notify)handlers时才执行相应的任务</li><li>如果有多个notify触发执行handlers任务，也仅执行一次</li><li>仅当任务的执行状态为changed时handlers任务才执行</li><li>handlers任务在所有其他任务都执行后才执行</li></ul><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span> test
  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 创建文件夹 <span class="token comment"># 多次执行playbook该任务状态不再是changed</span>
      <span class="token key atrule">file</span><span class="token punctuation">:</span>
        <span class="token key atrule">path</span><span class="token punctuation">:</span> ~/tmp/
        <span class="token key atrule">state</span><span class="token punctuation">:</span> directory
      <span class="token key atrule">notify</span><span class="token punctuation">:</span> 创建一个文件 <span class="token comment"># notify后面的名称必须和handlers中的任务名称一致</span>
  <span class="token key atrule">handlers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 创建一个文件
      <span class="token key atrule">file</span><span class="token punctuation">:</span>
        <span class="token key atrule">path</span><span class="token punctuation">:</span> ~/tmp/test.txt
        <span class="token key atrule">state</span><span class="token punctuation">:</span> touch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="when-条件判断" tabindex="-1"><a class="header-anchor" href="#when-条件判断" aria-hidden="true">#</a> when 条件判断</h3>`,8),r=n("li",null,"when可以定义判断条件，条件为真时才执行某个任务",-1),k=n("li",null,"常见条件操作符如下: ==、!=、>、>=、<、<=",-1),v=n("li",null,"多个条件可以使用and或or分割",-1),m=s(`<div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span> test
  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 若剩余内存小于 700 mb，则关闭 NetworkManager 服务
      <span class="token key atrule">service</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> NetworkManager
        <span class="token key atrule">state</span><span class="token punctuation">:</span> stopped
      <span class="token key atrule">when</span><span class="token punctuation">:</span> ansible_memfree_mb &lt; 700
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="block-任务组" tabindex="-1"><a class="header-anchor" href="#block-任务组" aria-hidden="true">#</a> block 任务组</h3><ul><li>使用 block 可以将多个任务合并为一个组</li></ul><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span> test
  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 定义任务组
      <span class="token key atrule">block</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 安装 httpd
          <span class="token key atrule">yum</span><span class="token punctuation">:</span>
            <span class="token key atrule">name</span><span class="token punctuation">:</span> httpd
            <span class="token key atrule">state</span><span class="token punctuation">:</span> present
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 启动 httpd
          <span class="token key atrule">service</span><span class="token punctuation">:</span>
            <span class="token key atrule">name</span><span class="token punctuation">:</span> httpd
            <span class="token key atrule">state</span><span class="token punctuation">:</span> started
      <span class="token key atrule">when</span><span class="token punctuation">:</span> <span class="token punctuation">&gt;</span><span class="token scalar string">
        ansible_memfree_mb &gt; 700
        and
        ansible_distribution == &quot;CentOS&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>rescue 定义 block 任务执行失败时要执行的其他任务</li><li>always 定义无论 block 任务是否成功，都要执行的任务</li></ul><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span> test
  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 任务块测试
      <span class="token key atrule">block</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 创建 test1.txt
          <span class="token key atrule">file</span><span class="token punctuation">:</span>
            <span class="token key atrule">path</span><span class="token punctuation">:</span> ~/tmp/test1.txt
            <span class="token key atrule">state</span><span class="token punctuation">:</span> touch
      <span class="token key atrule">rescue</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 创建 test1.txt 失败，则创建 test2.txt
          <span class="token key atrule">file</span><span class="token punctuation">:</span>
            <span class="token key atrule">path</span><span class="token punctuation">:</span> ~/tmp/test2.txt
            <span class="token key atrule">state</span><span class="token punctuation">:</span> touch
      <span class="token key atrule">always</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 无论创建 test1.txt 成功失败，都创建 test3.txt
          <span class="token key atrule">file</span><span class="token punctuation">:</span>
            <span class="token key atrule">path</span><span class="token punctuation">:</span> ~/tmp/test3.txt
            <span class="token key atrule">state</span><span class="token punctuation">:</span> touch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="loop-循环" tabindex="-1"><a class="header-anchor" href="#loop-循环" aria-hidden="true">#</a> loop 循环</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span> test
  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 批量创建文件夹
      <span class="token key atrule">file</span><span class="token punctuation">:</span>
        <span class="token key atrule">path</span><span class="token punctuation">:</span> ~/tmp/<span class="token punctuation">{</span><span class="token punctuation">{</span>item<span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token comment"># 循环变量必须是 item</span>
        <span class="token key atrule">state</span><span class="token punctuation">:</span> directory
      <span class="token key atrule">loop</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> School
        <span class="token punctuation">-</span> Legend
        <span class="token punctuation">-</span> Life
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span> test
  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 批量创建用户
      <span class="token key atrule">user</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;{{item.iname}}&quot;</span>
        <span class="token key atrule">state</span><span class="token punctuation">:</span> <span class="token string">&quot;{{item.ipass | password_hash(&#39;sha512&#39;)}}&quot;</span>
      <span class="token key atrule">loop</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">iname</span><span class="token punctuation">:</span> <span class="token string">&#39;tom&#39;</span><span class="token punctuation">,</span> <span class="token key atrule">ipass</span><span class="token punctuation">:</span> <span class="token string">&#39;123456&#39;</span><span class="token punctuation">}</span>
        <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">iname</span><span class="token punctuation">:</span> <span class="token string">&#39;jerry&#39;</span><span class="token punctuation">,</span> <span class="token key atrule">ipass</span><span class="token punctuation">:</span> <span class="token string">&#39;123456&#39;</span><span class="token punctuation">}</span>
        <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">iname</span><span class="token punctuation">:</span> <span class="token string">&#39;mary&#39;</span><span class="token punctuation">,</span> <span class="token key atrule">ipass</span><span class="token punctuation">:</span> <span class="token string">&#39;123456&#39;</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ansible-vault" tabindex="-1"><a class="header-anchor" href="#ansible-vault" aria-hidden="true">#</a> ansible-vault</h2><ul><li>Ansible 有时需要访问一些敏感数据，如密码、Key等</li><li>使用 ansible-vault 可以加密和解密数据 <ul><li>encrypt 加密</li><li>decrypt 解密</li><li>view 查看</li></ul></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 需要加密的敏感数据</span>
<span class="token builtin class-name">echo</span> <span class="token number">123456</span> <span class="token operator">&gt;</span> data.txt
<span class="token comment"># 加密文件</span>
ansible-vault encrypt data.txt
<span class="token comment"># 查看文件</span>
ansible-vault view data.txt
<span class="token comment"># 解密文件</span>
ansible-vault decrypt data.txt
<span class="token comment"># 修改密码</span>
ansible-vault rekey data.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加密、解密每次都输入密码很麻烦，可以将密码写入文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 需要加密的敏感数据</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;I&#39;m secret data&quot;</span> <span class="token operator">&gt;</span> data.txt
<span class="token comment"># 加密的密码</span>
<span class="token builtin class-name">echo</span> <span class="token number">123456</span> <span class="token operator">&gt;</span> pass.txt
<span class="token comment"># 加密文件</span>
ansible-vault encrypt --vault-id<span class="token operator">=</span>pass.txt data.txt
<span class="token comment"># 解密文件</span>
ansible-vault decrypt --vault-id<span class="token operator">=</span>pass.txt data.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>传输加密文件时应该使用</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ansible <span class="token builtin class-name">test</span> <span class="token parameter variable">-m</span> copy  --vault-id<span class="token operator">=</span>pass.txt <span class="token parameter variable">-a</span> <span class="token string">&quot;src=data.txt dest=/tmp/ mode=0600&quot;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>加密变量文件</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span> test
  <span class="token key atrule">vars_files</span><span class="token punctuation">:</span> variables.yml
  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 打印变量
      <span class="token key atrule">debug</span><span class="token punctuation">:</span>
        <span class="token key atrule">msg</span><span class="token punctuation">:</span> <span class="token string">&quot;用户名: {{iname}}, 密码: {{ipassword}}&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 输入密码</span>
ansible-vault encrypt variables.yml
ansible-playbook --ask-vault-pass test.yml
<span class="token comment"># 或指定密码文件</span>
ansible-vault encrypt --vault-id<span class="token operator">=</span>pass.txt variables.yml
ansible-playbook --vault-id<span class="token operator">=</span>pass.txt test.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ansible-roles" tabindex="-1"><a class="header-anchor" href="#ansible-roles" aria-hidden="true">#</a> ansible roles</h2><ul><li>在实际生产环境中，为了实现不同的功能，我们会编写大量的playbook文件</li><li>而且，每个playbook还可能会调用其他文件(如变量文件)</li><li>对于海量的、无规律的文件，管理起来非常痛苦!</li><li>Ansible从1.2版本开始支持Roles</li><li>Roles是管理ansible文件的一种规范(目录结构)</li><li>Roles会按照标准的规范，自动到特定的目录和文件中读取数据</li></ul><h3 id="roles-规范的目录结构" tabindex="-1"><a class="header-anchor" href="#roles-规范的目录结构" aria-hidden="true">#</a> Roles 规范的目录结构</h3><blockquote><p>role-name ├── defaults │   └── main.yml # 定义变量的缺省值，优先级较低 ├── files # 存储静态文件的目录 ├── handlers │   └── main.yml # 定义 handlers ├── meta │   └── main.yml # 写作者、 版本等描述信息 ├── README.md # 整个角色(role)的描述信息 ├── tasks │   └── main.yml # 定义任务的地方 ├── templates # 存放动态数据文件的地方(模板文件) ├── tests │   ├── inventory │   └── test.yml └── vars └── main.yml # 定义变量，优先级高</p></blockquote><h3 id="创建-role" tabindex="-1"><a class="header-anchor" href="#创建-role" aria-hidden="true">#</a> 创建 Role</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> ~/ansible/roles
<span class="token comment"># 创建一个Role,该Role的目的是使用模板修改远程主机的/tmp/issue文件</span>
ansible-galaxy init ~/ansible/roles/issue
<span class="token comment"># 查看目录结构</span>
tree ~/ansible/roles/issue
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="修改-role" tabindex="-1"><a class="header-anchor" href="#修改-role" aria-hidden="true">#</a> 修改 Role</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 定义模板文件</span>
<span class="token function">cat</span> ./templates/issue.j2
This is the system: <span class="token punctuation">{</span><span class="token punctuation">{</span>ansible_hostname<span class="token punctuation">}</span><span class="token punctuation">}</span>
Today&#39;date is: <span class="token punctuation">{</span><span class="token punctuation">{</span>ansible_date_time.date<span class="token punctuation">}</span><span class="token punctuation">}</span>
Contract to <span class="token punctuation">{</span><span class="token punctuation">{</span>admin<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token comment"># 定义变量文件</span>
<span class="token function">cat</span> ./vars/main.yml
---
<span class="token comment"># vars file for /root/ansible/roles/issue</span>
admin: lzpeng723@163.com
<span class="token comment"># 修改任务文件,任务文件中不需要使用 tasks 关键字</span>
<span class="token function">cat</span> ./tasks/main.yml
---
<span class="token comment"># vars file for /root/ansible/tasks/main.yml</span>
- name: 传输模板文件
  template:
    src: issue.j2
    dest: /tmp/issue
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="在playbook中调用role" tabindex="-1"><a class="header-anchor" href="#在playbook中调用role" aria-hidden="true">#</a> 在Playbook中调用Role</h3><ul><li>方法一: 在role相同目录下创建一个playbook调用</li><li>方法二: 在ansible.cfg设置role_path=路径</li></ul><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span> test
  <span class="token key atrule">roles</span><span class="token punctuation">:</span>
   <span class="token punctuation">-</span> issue
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ansible-galaxy" tabindex="-1"><a class="header-anchor" href="#ansible-galaxy" aria-hidden="true">#</a> ansible-galaxy</h2>`,31),b={href:"https://galaxy.ansible.com",target:"_blank",rel:"noopener noreferrer"},h=s(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 联网搜索roles</span>
ansible-galaxy search <span class="token string">&#39;httpd&#39;</span>
<span class="token comment"># 查看roles基本信息</span>
ansible-galaxy info acandid.httpd
<span class="token comment"># 下载roles到特定目录</span>
ansible-galaxy <span class="token function">install</span> acandid.httpd <span class="token parameter variable">-p</span> ~/ansible/roles/
<span class="token comment"># 列出本地有哪些roles</span>
ansible-galaxy list <span class="token parameter variable">-p</span> ./roles/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="下载roles的方法" tabindex="-1"><a class="header-anchor" href="#下载roles的方法" aria-hidden="true">#</a> 下载Roles的方法</h3><p>使用 ansible-galaxy install 或者编写 requirements.yml 文件</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token comment"># 直接从 Ansible Galaxy 官网下载</span>
<span class="token punctuation">-</span> <span class="token key atrule">src</span><span class="token punctuation">:</span> acandid.httpd
<span class="token comment"># 从某个 git 服务器下载</span>
<span class="token punctuation">-</span> <span class="token key atrule">src</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//gitlab.com/xxx/xxx.git
  <span class="token key atrule">scm</span><span class="token punctuation">:</span> git
  <span class="token key atrule">version</span><span class="token punctuation">:</span> 56e00a54
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>acme
<span class="token comment"># 下载 tar 包, 支持 http、https、file</span>
<span class="token punctuation">-</span> <span class="token key atrule">src</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//examle.com/myrole.tar
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myrole
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ansible-galaxy <span class="token function">install</span> <span class="token parameter variable">-r</span> requirements.yml <span class="token parameter variable">-p</span> ./roles
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,5);function y(g,x){const e=l("ExternalLinkIcon");return i(),p("div",null,[d,n("ul",null,[r,k,v,n("li",null,"when表达式中调用变量不要使用"+c(),1)]),m,n("p",null,[a("Ansible Galaxy是官方提供的一个共享roles的平台 公用Roles仓库"),n("a",b,[a("https://galaxy.ansible.com"),o(e)])]),h])}const _=t(u,[["render",y],["__file","ansible-high-grammer.html.vue"]]);export{_ as default};
