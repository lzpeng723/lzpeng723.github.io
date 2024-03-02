import{_ as s,o as a,c as n,a as e}from"./app-CTlNizBn.js";const l={},i=e(`<h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h2><h3 id="too-many-connections" tabindex="-1"><a class="header-anchor" href="#too-many-connections" aria-hidden="true">#</a> too many connections</h3><p>查看最大连接数 show variables like &#39;%max_connections%&#39;; 显示所有连接 show processlist; 删除连接 kill 1180421; 修改最大连接数(临时生效,无需重启服务) set GLOBAL max_connections=1024; 修改最大连接数(需重启服务,永久生效) 修改my.cnf， vim /etc/my.cnf, 加入max_connections=1024</p><h3 id="重置密码" tabindex="-1"><a class="header-anchor" href="#重置密码" aria-hidden="true">#</a> 重置密码</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mysqladmin -u root password NEWPASS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="重启mysql服务" tabindex="-1"><a class="header-anchor" href="#重启mysql服务" aria-hidden="true">#</a> 重启mysql服务</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl restart mysqld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1、开启mysql查询日志" tabindex="-1"><a class="header-anchor" href="#_1、开启mysql查询日志" aria-hidden="true">#</a> 1、开启MySQL查询日志</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>set global general_log = on;
show variables like &#39;general_log&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、关闭mysql查询日志" tabindex="-1"><a class="header-anchor" href="#_2、关闭mysql查询日志" aria-hidden="true">#</a> 2、关闭MySQL查询日志</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>set global general_log=off;
show variables like &#39;general_log&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、设置日志输出方式" tabindex="-1"><a class="header-anchor" href="#_3、设置日志输出方式" aria-hidden="true">#</a> 3、设置日志输出方式</h3><p>设置日志输出方式为表（如果设置log_output=table的话，则日志结果会记录到名为gengera_log的表中，这表的默认引擎是CSV）：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>show variables like &#39;log_output&#39;;
set global log_output=&#39;table&#39;;
show variables like &#39;log_output&#39;;
## 查看查询日志信息。
select * from mysql.general_log;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、查询日志归档" tabindex="-1"><a class="header-anchor" href="#_4、查询日志归档" aria-hidden="true">#</a> 4、查询日志归档</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mysql&gt; system mv /var/lib/mysql/DB-Server.log  /var/lib/mysql/DB-Server.log.20170706
mysql&gt; system mysqladmin flush-logs -p
Enter password:
或者你在shell中执行下面命令
[root@DB-Server mysql]# mv /var/lib/mysql/DB-Server.log  /var/lib/mysql/DB-Server.log.20170706
[root@DB-Server mysql]# mysqladmin flush-logs -p
Enter password:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5、-修改查询日志名称或位置" tabindex="-1"><a class="header-anchor" href="#_5、-修改查询日志名称或位置" aria-hidden="true">#</a> 5、 修改查询日志名称或位置</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mysql&gt; show variables like &#39;general_log%&#39;;
+------------------+------------------------------+
| Variable_name    | Value                        |
+------------------+------------------------------+
| general_log      | ON                           |
| general_log_file | /var/lib/mysql/DB-Server.log |
+------------------+------------------------------+
2 rows in set (0.00 sec)
 
mysql&gt; set global general_log=&#39;OFF&#39;;
Query OK, 0 rows affected (0.00 sec)
 
mysql&gt; set global general_log_file=&#39;/u02/mysql_log.log&#39;;
Query OK, 0 rows affected (0.00 sec)
mysql&gt; set global general_log=&#39;ON&#39;;
Query OK, 0 rows affected (0.02 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-备份与恢复" tabindex="-1"><a class="header-anchor" href="#_6-备份与恢复" aria-hidden="true">#</a> 6 备份与恢复</h3><p>http://c.biancheng.net/view/7373.html http://c.biancheng.net/view/7381.html https://www.cnblogs.com/chenmh/p/5300370.html</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>mysqldump <span class="token operator">-</span>uroot <span class="token operator">-</span>p cosmic <span class="token operator">&gt;</span> d:\\cosmic\\cosmic<span class="token punctuation">.</span><span class="token keyword">sql</span>
mysqldump <span class="token operator">-</span>uroot <span class="token operator">-</span>p ff_log <span class="token operator">&gt;</span> d:\\cosmic\\ff_log<span class="token punctuation">.</span><span class="token keyword">sql</span>
mysqldump <span class="token operator">-</span>uroot <span class="token operator">-</span>p hq_cosmic_sys <span class="token operator">&gt;</span> d:\\cosmic\\hq_cosmic_sys<span class="token punctuation">.</span><span class="token keyword">sql</span>
mysqldump <span class="token operator">-</span>uroot <span class="token operator">-</span>p <span class="token comment">--databases cosmic hq_cosmic_sys&gt; filename.sql</span>
mysqldump <span class="token operator">-</span>uroot <span class="token operator">-</span>p <span class="token comment">--all-databases &gt; d:\\cosmic\\cosmic.sql</span>
mysql <span class="token operator">-</span>uroot <span class="token operator">-</span>p <span class="token operator">&lt;</span> d:\\cosmic\\cosmic<span class="token punctuation">.</span><span class="token keyword">sql</span>
mysql <span class="token operator">-</span>uroot <span class="token operator">-</span>p cosmic<span class="token operator">&lt;</span> d:\\cosmic\\cosmic<span class="token punctuation">.</span><span class="token keyword">sql</span>

<span class="token comment">-- 跨服务器导出导入数据</span>
mysqldump <span class="token comment">--host=h1 -uroot -proot --databases db1 |mysql --host=h2 -uroot -proot db2</span>
<span class="token comment">-- 将h1服务器中的db1数据库的所有数据导入到h2中的db2数据库中，db2的数据库必须存在否则会报错</span>
mysqldump <span class="token comment">--host=127.0.0.1 -P3306 -uroot -pkingdee -C --databases hq_cosmic_sys | mysql --host=127.0.0.1 -P3307 -uroot -p123456 hq_cosmic_sys </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建用户并授权" tabindex="-1"><a class="header-anchor" href="#创建用户并授权" aria-hidden="true">#</a> 创建用户并授权</h2><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>mysql <span class="token operator">-</span>uroot <span class="token operator">-</span>p123456 <span class="token comment">--socket=/tmp/mysql_3306.sock --port=3306</span>
<span class="token comment"># 关闭只读模式</span>
<span class="token keyword">set</span> <span class="token keyword">global</span> read_only<span class="token operator">=</span><span class="token keyword">OFF</span><span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">USER</span> <span class="token identifier"><span class="token punctuation">\`</span>hana<span class="token punctuation">\`</span></span><span class="token variable">@\`%\`</span> IDENTIFIED <span class="token keyword">BY</span> <span class="token string">&#39;hana@2020&#39;</span> PASSWORD EXPIRE NEVER<span class="token punctuation">;</span>
<span class="token keyword">GRANT</span> <span class="token keyword">SELECT</span><span class="token punctuation">,</span> <span class="token keyword">SHOW</span> <span class="token keyword">VIEW</span> <span class="token keyword">ON</span> jszt_secd<span class="token punctuation">.</span>view_repairenty_c <span class="token keyword">TO</span> <span class="token identifier"><span class="token punctuation">\`</span>hana<span class="token punctuation">\`</span></span><span class="token variable">@\`%\`</span><span class="token punctuation">;</span>
FLUSH <span class="token keyword">PRIVILEGES</span><span class="token punctuation">;</span>
<span class="token comment"># 开启只读模式</span>
<span class="token keyword">set</span> <span class="token keyword">global</span> read_only<span class="token operator">=</span><span class="token keyword">OFF</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="查询数据表信息" tabindex="-1"><a class="header-anchor" href="#查询数据表信息" aria-hidden="true">#</a> 查询数据表信息</h2><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span>
	COLUMN_NAME 字段名<span class="token punctuation">,</span>
	COLUMN_COMMENT 备注<span class="token punctuation">,</span>
	DATA_TYPE 字段类型<span class="token punctuation">,</span>
	CHARACTER_MAXIMUM_LENGTH 长度<span class="token punctuation">,</span>
	<span class="token keyword">CASE</span> COLUMN_DEFAULT 
	<span class="token keyword">WHEN</span> <span class="token string">&#39;NULL&#39;</span> <span class="token keyword">THEN</span> <span class="token string">&#39;&#39;</span>
	<span class="token keyword">ELSE</span> COLUMN_DEFAULT <span class="token keyword">END</span> 默认值<span class="token punctuation">,</span>
	<span class="token keyword">CASE</span> COLUMN_KEY 
	<span class="token keyword">WHEN</span> <span class="token string">&#39;PRI&#39;</span> <span class="token keyword">THEN</span> <span class="token string">&#39;主键&#39;</span>
	<span class="token keyword">ELSE</span> COLUMN_KEY <span class="token keyword">END</span> 键类型
<span class="token keyword">FROM</span>
	INFORMATION_SCHEMA<span class="token punctuation">.</span><span class="token keyword">COLUMNS</span> 
<span class="token keyword">WHERE</span>
	table_schema <span class="token operator">=</span> <span class="token string">&#39;kd&#39;</span>  <span class="token comment">-- 数据库名</span>
	<span class="token operator">AND</span> table_name <span class="token operator">=</span> <span class="token string">&#39;T_sup_supplier&#39;</span><span class="token punctuation">;</span> <span class="token comment">-- 表名</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="启动丢失-dll" tabindex="-1"><a class="header-anchor" href="#启动丢失-dll" aria-hidden="true">#</a> 启动丢失 dll</h2><p>该问题是由于部分操作系统是精简版导致，需要访问 https://www.zhaodll.com/ 搜索缺失的dll文件下载到放到 C:\\Windows\\System32 下即可</p><h2 id="索引" tabindex="-1"><a class="header-anchor" href="#索引" aria-hidden="true">#</a> 索引</h2><p>数据结构测试[https://www.cs.usfca.edu/~galles/visualization/Algorithms.html]</p><h3 id="b-树" tabindex="-1"><a class="header-anchor" href="#b-树" aria-hidden="true">#</a> B+树</h3><p>索引页 默认16KB B+树与B树相比，叶子节点添加双向指针，B+树叶子节点放了所有索引，包括父节点的冗余索引，父节点只存储索引值，不存储数据</p><h3 id="hash索引" tabindex="-1"><a class="header-anchor" href="#hash索引" aria-hidden="true">#</a> hash索引</h3><p>仅支持 = IN 不支持范围查找</p><h3 id="存储引擎" tabindex="-1"><a class="header-anchor" href="#存储引擎" aria-hidden="true">#</a> 存储引擎</h3><h4 id="myisam" tabindex="-1"><a class="header-anchor" href="#myisam" aria-hidden="true">#</a> myisam</h4><p>不支持行锁和事务 .frm 表结构 .myi 索引文件 B+树 .myd 数据文件</p><h4 id="innodb" tabindex="-1"><a class="header-anchor" href="#innodb" aria-hidden="true">#</a> innodb</h4><p>支持行锁和事务 .frm 表结构 .ibd 索引和数据文件 B+树叶子节点放数据而不是行记录对应地址 建议主键整型递增</p>`,38),t=[i];function o(d,r){return a(),n("div",null,t)}const p=s(l,[["render",o],["__file","MySQL-guide.html.vue"]]);export{p as default};
