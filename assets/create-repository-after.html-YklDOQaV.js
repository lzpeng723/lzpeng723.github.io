import{_ as i,o as e,c as n,a as s}from"./app-m_Ib8w5j.js";const d={},t=s(`<h2 id="全局配置-git-用户名邮箱" tabindex="-1"><a class="header-anchor" href="#全局配置-git-用户名邮箱" aria-hidden="true">#</a> 全局配置 git 用户名邮箱</h2><p>Git global setup</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>git config --global user.name &quot;lzpeng723&quot;
git config --global user.email &quot;1500913306@qq.com&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="克隆仓库" tabindex="-1"><a class="header-anchor" href="#克隆仓库" aria-hidden="true">#</a> 克隆仓库</h2><p>Create a new repository</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>git clone ssh://git@myliving.top:58022/lzpeng723/visitor-system-vue.git
cd visitor-system-vue
touch README.md
git add README.md
git commit -m &quot;add README&quot;
git push -u origin master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="将仓库与已有文件夹绑定" tabindex="-1"><a class="header-anchor" href="#将仓库与已有文件夹绑定" aria-hidden="true">#</a> 将仓库与已有文件夹绑定</h2><p>Push an existing folder</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cd existing_folder
#初始化git仓库
git init  
#添加所有文件
git add .  
#添加提交信息
git commit -m &#39;提交信息&#39; 
#添加远程仓库地址
git remote add origin ssh://git@github.com:lzpeng723/lzpeng723.github.io.git 
OR
git remote add origin https://github.com/lzpeng723/lzpeng723.github.io.git
# 若本地文件夹非空， 拉取远程仓库所有内容,并将所有非空文件提交
git pull --rebase origin master 
# 若有冲突 修改文件后 解决冲突，知道冲突全部解决完成
git rebase --continue
#将此次提交推送至远程仓库
git push -u origin master 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="已有git源地址的文件夹切换新的地址源" tabindex="-1"><a class="header-anchor" href="#已有git源地址的文件夹切换新的地址源" aria-hidden="true">#</a> 已有git源地址的文件夹切换新的地址源</h2><p>Push an existing Git repository</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cd existing_repo
git remote rename origin old-origin
git remote add origin ssh://git@github.com:lzpeng723/lzpeng723.github.io.git 
OR
git remote add origin https://github.com/lzpeng723/lzpeng723.github.io.git
git push -u origin --all
git push -u origin --tags
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),a=[t];function l(r,c){return e(),n("div",null,a)}const g=i(d,[["render",l],["__file","create-repository-after.html.vue"]]);export{g as default};
