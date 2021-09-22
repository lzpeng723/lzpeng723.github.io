---
title: Mysql笔记
date: 2021-09-21
tags:
 - MySQL
categories:
 - 数据库
---

## 常用命令

### too many connections

[参考链接]: https://zhuanlan.zhihu.com/p/65291697
查看最大连接数  show variables like '%max_connections%';
显示所有连接    show processlist;
删除连接        kill 1180421;
修改最大连接数(临时生效,无需重启服务)  set GLOBAL max_connections=1024;
修改最大连接数(需重启服务,永久生效)  修改my.cnf， vim /etc/my.cnf, 加入max_connections=1024

### 重置密码

```
mysqladmin -u root password NEWPASS
```

### 重启mysql服务

```
systemctl restart mysqld
```

### 1、开启MySQL查询日志

```
set global general_log = on;
show variables like 'general_log';
```

### 2、关闭MySQL查询日志

```
set global general_log=off;
show variables like 'general_log';
```

### 3、设置日志输出方式

设置日志输出方式为表（如果设置log_output=table的话，则日志结果会记录到名为gengera_log的表中，这表的默认引擎是CSV）：

```
show variables like 'log_output';
set global log_output='table';
show variables like 'log_output';
## 查看查询日志信息。
select * from mysql.general_log;
```

### 4、查询日志归档

```
mysql> system mv /var/lib/mysql/DB-Server.log  /var/lib/mysql/DB-Server.log.20170706
mysql> system mysqladmin flush-logs -p
Enter password:
或者你在shell中执行下面命令
[root@DB-Server mysql]# mv /var/lib/mysql/DB-Server.log  /var/lib/mysql/DB-Server.log.20170706
[root@DB-Server mysql]# mysqladmin flush-logs -p
Enter password:
```

### 5、 修改查询日志名称或位置

```
mysql> show variables like 'general_log%';
+------------------+------------------------------+
| Variable_name    | Value                        |
+------------------+------------------------------+
| general_log      | ON                           |
| general_log_file | /var/lib/mysql/DB-Server.log |
+------------------+------------------------------+
2 rows in set (0.00 sec)
 
mysql> set global general_log='OFF';
Query OK, 0 rows affected (0.00 sec)
 
mysql> set global general_log_file='/u02/mysql_log.log';
Query OK, 0 rows affected (0.00 sec)
mysql> set global general_log='ON';
Query OK, 0 rows affected (0.02 sec)
```

### 6 备份与恢复
http://c.biancheng.net/view/7373.html
http://c.biancheng.net/view/7381.html
https://www.cnblogs.com/chenmh/p/5300370.html

```sql
mysqldump -uroot -p cosmic > d:\cosmic\cosmic.sql
mysqldump -uroot -p ff_log > d:\cosmic\ff_log.sql
mysqldump -uroot -p hq_cosmic_sys > d:\cosmic\hq_cosmic_sys.sql
mysqldump -uroot -p --databases cosmic hq_cosmic_sys> filename.sql
mysqldump -uroot -p --all-databases > d:\cosmic\cosmic.sql
mysql -uroot -p < d:\cosmic\cosmic.sql
mysql -uroot -p cosmic< d:\cosmic\cosmic.sql

-- 跨服务器导出导入数据
mysqldump --host=h1 -uroot -proot --databases db1 |mysql --host=h2 -uroot -proot db2
-- 将h1服务器中的db1数据库的所有数据导入到h2中的db2数据库中，db2的数据库必须存在否则会报错
mysqldump --host=127.0.0.1 -P3306 -uroot -pkingdee -C --databases hq_cosmic_sys | mysql --host=127.0.0.1 -P3307 -uroot -p123456 hq_cosmic_sys 
```

## 创建用户并授权

```sql
mysql -uroot -p123456 --socket=/tmp/mysql_3306.sock --port=3306
# 关闭只读模式
set global read_only=OFF;
CREATE USER `hana`@`%` IDENTIFIED BY 'hana@2020' PASSWORD EXPIRE NEVER;
GRANT SELECT, SHOW VIEW ON jszt_secd.view_repairenty_c TO `hana`@`%`;
FLUSH PRIVILEGES;
# 开启只读模式
set global read_only=OFF;
```

## 查询数据表信息

```sql
SELECT
	COLUMN_NAME 字段名,
	COLUMN_COMMENT 备注,
	DATA_TYPE 字段类型,
	CHARACTER_MAXIMUM_LENGTH 长度,
	CASE COLUMN_DEFAULT 
	WHEN 'NULL' THEN ''
	ELSE COLUMN_DEFAULT END 默认值,
	CASE COLUMN_KEY 
	WHEN 'PRI' THEN '主键'
	ELSE COLUMN_KEY END 键类型
FROM
	INFORMATION_SCHEMA.COLUMNS 
WHERE
	table_schema = 'kd'  -- 数据库名
	AND table_name = 'T_sup_supplier'; -- 表名
```

## 启动丢失 dll

该问题是由于部分操作系统是精简版导致，需要访问 https://www.zhaodll.com/ 搜索缺失的dll文件下载到放到 C:\Windows\System32 下即可

## 索引

数据结构测试[https://www.cs.usfca.edu/~galles/visualization/Algorithms.html]

### B+树
索引页 默认16KB
B+树与B树相比，叶子节点添加双向指针，B+树叶子节点放了所有索引，包括父节点的冗余索引，父节点只存储索引值，不存储数据

### hash索引
仅支持 = IN 不支持范围查找


### 存储引擎

#### myisam
不支持行锁和事务
.frm 表结构
.myi 索引文件 B+树
.myd 数据文件

#### innodb
支持行锁和事务
.frm 表结构
.ibd 索引和数据文件 B+树叶子节点放数据而不是行记录对应地址
建议主键整型递增

