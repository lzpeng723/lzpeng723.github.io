import{_ as s,o as n,c as e,a}from"./app-U2nchfLp.js";const i={},l=a(`<h1 id="ansible-sudo授权" tabindex="-1"><a class="header-anchor" href="#ansible-sudo授权" aria-hidden="true">#</a> ansible sudo授权</h1><h2 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念" aria-hidden="true">#</a> 基本概念</h2><h3 id="sudo" tabindex="-1"><a class="header-anchor" href="#sudo" aria-hidden="true">#</a> sudo</h3><ul><li>superuser or another do</li><li>以超级管理员或其他人身份执行命令</li></ul><h3 id="基本流程" tabindex="-1"><a class="header-anchor" href="#基本流程" aria-hidden="true">#</a> 基本流程</h3><ul><li>管理员需要先授权(修改<code>/etc/sudoers</code>文件)</li><li>普通用户以sudo的形式执行命令</li><li>可以通过<code>sudo -l</code>查看授权情况</li></ul><h3 id="修改-etc-sudoers的方法" tabindex="-1"><a class="header-anchor" href="#修改-etc-sudoers的方法" aria-hidden="true">#</a> 修改<code>/etc/sudoers</code>的方法</h3><ul><li>visudo (带语法检查，默认没有颜色提示)</li><li>vim /etc/sudoers (不带语法检查，默认有颜色提示)</li></ul><h3 id="授权格式如下" tabindex="-1"><a class="header-anchor" href="#授权格式如下" aria-hidden="true">#</a> 授权格式如下</h3><ul><li>用户或组 主机列表=(提权身份) [NOPASSWD]:命令列表</li><li>命令需要写绝对路径（支持*）</li></ul><h3 id="例子" tabindex="-1"><a class="header-anchor" href="#例子" aria-hidden="true">#</a> 例子</h3><p>创建并切换到lzpeng用户执行systemctl命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">useradd</span> lzpeng
<span class="token function">passwd</span> lzpeng
<span class="token function">su</span> - lzpeng
systemctl restart network
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以发现提示</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>==== AUTHENTICATING FOR org.freedesktop.systemd1.manage-units ===
Authentication is required to manage system services or units.
Authenticating as: root
Password:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>表示我们不能执行 <code>systemctl restart network</code> 命令,下面我们使用root用户修改sudo文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">which</span> systemctl
<span class="token function">which</span> nmcli
<span class="token function">vim</span> /etc/sudoers
<span class="token comment"># 将下面这行文件添加至文件中</span>
lzpeng <span class="token assign-left variable">ALL</span><span class="token operator">=</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span> /usr/bin/systemctl,/usr/bin/nmcli
<span class="token comment"># 如果是这样配置可以使对应用户使用sudo执行命令时,无需修改密码</span>
lzpeng <span class="token assign-left variable">ALL</span><span class="token operator">=</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span> NOPASSWD:/usr/bin/systemctl,/usr/bin/nmcli
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用lzpeng用户执行systemctl命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">su</span> - lzpeng
<span class="token comment"># 以root身份执行systemctl命令</span>
<span class="token function">sudo</span> systemctl restart network
<span class="token comment"># 查看自己可以以谁的身份执行什么命令</span>
<span class="token function">sudo</span> <span class="token parameter variable">-l</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后切换为root删除lzpeng用户</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>userdel -r lzpeng
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="实战创建用户使其可以使用sudo执行任何命令" tabindex="-1"><a class="header-anchor" href="#实战创建用户使其可以使用sudo执行任何命令" aria-hidden="true">#</a> 实战创建用户使其可以使用sudo执行任何命令</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 在test主机创建 lzpeng 用户,并设置密码为 123456</span>
ansible <span class="token builtin class-name">test</span> <span class="token parameter variable">-m</span> user <span class="token parameter variable">-a</span> <span class="token string">&quot;name=lzpeng password={{&#39;123456&#39; | password_hash(&#39;sha512&#39;)}}&quot;</span>
<span class="token comment"># 在test被管理主机配置sudo,让lzpeng可以执行任何命令，且无需输入密码</span>
ansible <span class="token builtin class-name">test</span> <span class="token parameter variable">-m</span> lineinfile <span class="token parameter variable">-a</span> <span class="token string">&quot;path=/etc/sudoers line=&#39;lzpeng ALL=(ALL) NOPASSWD:ALL&#39;&quot;</span>

<span class="token comment"># 测试</span>
<span class="token function">ssh</span> lzpeng@CentOS7-Node1
<span class="token function">sudo</span> <span class="token parameter variable">-l</span>
<span class="token function">sudo</span> systemctl restart chronyd

<span class="token comment"># 删除test主机的 lzpeng 用户</span>
ansible <span class="token builtin class-name">test</span> <span class="token parameter variable">-m</span> user <span class="token parameter variable">-a</span> <span class="token string">&#39;name=lzpeng state=absent remove=true&#39;</span>
<span class="token comment"># 删除 /etc/sudoers 文件刚添加的一行</span>
ansible <span class="token builtin class-name">test</span> <span class="token parameter variable">-m</span> lineinfile <span class="token parameter variable">-a</span> <span class="token string">&quot;path=/etc/sudoers line=&#39;lzpeng ALL=(ALL) NOPASSWD:ALL&#39; state=absent&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="向所有主机分发密钥" tabindex="-1"><a class="header-anchor" href="#向所有主机分发密钥" aria-hidden="true">#</a> 向所有主机分发密钥</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> CentOS7-Node1 CentOS7-Node2 CentOS7-Node3 CentOS7-Node4 CentOS7-Node5
<span class="token keyword">do</span>
    ssh-copy-id lzpeng@<span class="token variable">$i</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="修改-ansible-配置文件" tabindex="-1"><a class="header-anchor" href="#修改-ansible-配置文件" aria-hidden="true">#</a> 修改 ansible 配置文件</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">[</span>defaults<span class="token punctuation">]</span>
<span class="token comment"># 主机清单配置文件</span>
inventory      = ./hosts
<span class="token comment"># 配置用户</span>
remote_user = lzpeng
<span class="token punctuation">[</span>privilege_escalation<span class="token punctuation">]</span>
<span class="token comment"># 是否需要切换用户</span>
become = True
<span class="token comment"># 如何切换用户</span>
become_method = sudo
<span class="token comment"># 切换成什么用户</span>
become_user = root
<span class="token comment"># sudo 是否需要输入密码</span>
become_ask_pass = False

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,27),d=[l];function t(c,r){return n(),e("div",null,d)}const u=s(i,[["render",t],["__file","ansible-sudo.html.vue"]]);export{u as default};
