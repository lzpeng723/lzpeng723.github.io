import{_ as e,o as s,c as n,a as i}from"./app-rBywrD27.js";const a={},d=i(`<h2 id="配置多个-ssh-key-文件" tabindex="-1"><a class="header-anchor" href="#配置多个-ssh-key-文件" aria-hidden="true">#</a> 配置多个 ssh-key 文件</h2><p>打开<code>~/.ssh</code>目录</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> ~/.ssh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="设置全局的用户名和邮箱" tabindex="-1"><a class="header-anchor" href="#设置全局的用户名和邮箱" aria-hidden="true">#</a> 设置全局的用户名和邮箱</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 配置一下全局的用户名和邮箱</span>
<span class="token comment"># 用户名为git仓库注册时用户名</span>
<span class="token comment"># 邮箱为git仓库注册时邮箱</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> user.name <span class="token string">&quot;自定义用户名&quot;</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> user.email <span class="token string">&quot;邮箱&quot;</span>

<span class="token comment"># 取消全局设置</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> <span class="token parameter variable">--unset</span> user.name
<span class="token function">git</span> config <span class="token parameter variable">--global</span> <span class="token parameter variable">--unset</span> user.email
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="管理git生成的多个ssh-key" tabindex="-1"><a class="header-anchor" href="#管理git生成的多个ssh-key" aria-hidden="true">#</a> 管理Git生成的多个ssh key</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ssh-keygen <span class="token parameter variable">-t</span> rsa <span class="token parameter variable">-C</span> <span class="token string">&quot;yourmail@qq.com&quot;</span> <span class="token parameter variable">-f</span> <span class="token string">&quot;自定义文件名1 如 github_id_rsa&quot;</span>
ssh-keygen <span class="token parameter variable">-t</span> rsa <span class="token parameter variable">-C</span> <span class="token string">&quot;yourmail@qq.com&quot;</span> <span class="token parameter variable">-f</span> <span class="token string">&quot;自定义文件名2 如 gitee_id_rsa&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="添加私钥到秘匙管理器" tabindex="-1"><a class="header-anchor" href="#添加私钥到秘匙管理器" aria-hidden="true">#</a> 添加私钥到秘匙管理器</h3><p>执行···ssh-agent命令 ssh-agent是一个密钥管理器，运行ssh-agent以后，使用ssh-add将私钥交给ssh-agent保管， 其他程序需要身份验证的时候可以将验证申请交给ssh-agent来完成整个认证过程</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ssh-agent
SSH_AUTH_SOCK=/tmp/ssh-vtu2Stw1WRUj/agent.10928; export SSH_AUTH_SOCK;
SSH_AGENT_PID=11716; export SSH_AGENT_PID;
echo Agent pid 11716;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="添加私钥" tabindex="-1"><a class="header-anchor" href="#添加私钥" aria-hidden="true">#</a> 添加私钥</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ssh-add ~/.ssh/gitee_id_rsa
Could not open a connection to your authentication agent.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在执行上面的添加私钥命令时，如果你也出现Could not open a connection to your authentication agent. 解决方法如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 输入如下命令查看已开启的ssh-agent线程
ps aux | grep ssh
11716       1   11716      11716  ?         197609 19:32:41 /usr/bin/ssh-agent
#  执行命令杀死线程：kill -9 线程号
$ kill -9 11716
# 在.ssh目录执行如下命令:
exec ssh-agent bash
eval ssh-agent -s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>好了，现在我们可以成功添加私钥到秘匙管理器ssh-agent当中了，执行ssh-add命令</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ssh-add ./gitee_id_rsa
Identity added: ./gitee_id_rsa (./gitee_id_rsa)

ssh-add ./gitlab_id_rsa
Identity added: ./gitlab_id_rsa (./gitlab_id_rsa)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="新建配置文件" tabindex="-1"><a class="header-anchor" href="#新建配置文件" aria-hidden="true">#</a> 新建配置文件</h3><p>在.ssh目录下新建config文件，并添加配置信息 config文件内容如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># gitlab
Host gitlab.com
HostName gitlab.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/gitlab_id_rsa
User lzpeng723

# gitee
Host gitee.com
HostName gitee.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/gitee_id_rsa
User lzpeng723

# github
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/github_id_rsa
User lzpeng723

# kdgitlab
Host myliving.top
HostName myliving.top
PreferredAuthentications publickey
IdentityFile ~/.ssh/kd_gitlab_id_rsa
User lzpeng723
Port 58022
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件说明</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 这个是真实的域名地址
HostName 
# 这里是id_rsa的地址
IdentityFile 
# 配置登录时用什么权限认证--可设置publickey,password publickey,keyboard-interactive等
PreferredAuthentications 
# 配置使用用户名
User 
# 配置端口
Port
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于Host参数: 每个账号单独配置一个Host，每个Host要取一个别名，每个Host主要配置HostName和IdentityFile两个属性即可 Host的名字可以取为自己喜欢的名字，不过这个会影响git相关命令</p><p>例如： <code>Host mygithub</code> 这样定义的话，<code>git@</code>后面紧跟的名字将会变为<code>mygithub</code>，如下 <code>git clone git@mygithub:blog/AndroidRotateAnim.git</code> 就相当于你配置的HostName真正的域名映射成了Host后面的配置的名字</p><p>注意: 不要在配置文件中添加下面这样的注释, 这种注释在读取该配置文件时会导致报错，不被识别</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>HostName git.glanway.com //这里填你们公司的git网址即可
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="将公钥添加到对应的站点" tabindex="-1"><a class="header-anchor" href="#将公钥添加到对应的站点" aria-hidden="true">#</a> 将公钥添加到对应的站点</h3><h3 id="测试连接" tabindex="-1"><a class="header-anchor" href="#测试连接" aria-hidden="true">#</a> 测试连接</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#测试连接github
ssh -T git@github.com
#测试连接gitlab
ssh -T git@gitlab.com
#测试连接码云
ssh -T git@gitee.com
#测试连接kdgitlab
ssh -T git@myliving.top
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试链接时可能会出现问题</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> ssh -T git@github.com
The authenticity of host &#39;github.com (52.74.223.119)&#39; can&#39;t be established.
RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时要输入 <code>yes</code> 而不是直接按回车 输入 <code>yes</code> 后会自动生成 <code>known_hosts</code> 文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Permanently added the RSA host key for IP address &#39;20.205.243.166&#39; to the list of known hosts.
\`\`
手动将ip地址添加到 \`\`\`known_hosts\`\`\` 文件中， 格式如下
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>github.com,20.205.243.166 publickey</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code></code></pre><div class="line-numbers" aria-hidden="true"></div></div>`,34),l=[d];function t(r,c){return s(),n("div",null,l)}const u=e(a,[["render",t],["__file","multi-ssh-key.html.vue"]]);export{u as default};
