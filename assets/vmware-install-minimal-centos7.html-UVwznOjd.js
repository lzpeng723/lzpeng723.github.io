import{_ as r,r as d,o as t,c as l,b as e,d as n,e as s,a}from"./app-rBywrD27.js";const o={},c=a('<h1 id="vmware-安装-centos7" tabindex="-1"><a class="header-anchor" href="#vmware-安装-centos7" aria-hidden="true">#</a> VMWare 安装 CentOS7</h1><h2 id="环境准备" tabindex="-1"><a class="header-anchor" href="#环境准备" aria-hidden="true">#</a> 环境准备</h2><h3 id="安装vmware-16" tabindex="-1"><a class="header-anchor" href="#安装vmware-16" aria-hidden="true">#</a> 安装VmWare 16</h3>',3),v={href:"https://www.vmware.com/go/getworkstation-win",target:"_blank",rel:"noopener noreferrer"},u=e("p",null,"VMWare Workstation Pro 16 密钥：（随便输哪个）",-1),m=e("p",null,[e("code",null,"ZF3R0-FHED2-M80TY-8QYGC-NPKYF"),e("code",null,"YF390-0HF8P-M81RQ-2DXQE-M2UT6"),e("code",null,"ZF71R-DMX85-08DQY-8YMNC-PPHV8")],-1),h=e("h3",{id:"下载-centos-7",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#下载-centos-7","aria-hidden":"true"},"#"),n(" 下载 CentOS 7")],-1),b={href:"https://www.centos.org/download",target:"_blank",rel:"noopener noreferrer"},p={href:"https://mirrors.aliyun.com/centos/7.9.2009/isos/x86_64/",target:"_blank",rel:"noopener noreferrer"},_=e("p",null,[n("选择 "),e("code",null,"CentOS-7-x86_64-DVD-2009.iso")],-1),g=e("h3",{id:"vmware-装-centos7",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#vmware-装-centos7","aria-hidden":"true"},"#"),n(" VMWare 装 CentOS7")],-1),x={href:"https://blog.csdn.net/Mikli/article/details/108342867",target:"_blank",rel:"noopener noreferrer"},f={id:"安装-vmtools",tabindex:"-1"},w=e("a",{class:"header-anchor",href:"#安装-vmtools","aria-hidden":"true"},"#",-1),y={href:"https://kb.vmware.com/s/article/1018414",target:"_blank",rel:"noopener noreferrer"},q=a(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mkdir /mnt/cdrom
mount /dev/cdrom /mnt/cdrom
cp /mnt/cdrom/VMwareTools-version.tar.gz /tmp/
# Where version is the VMware Tools package version.
cd /tmp
tar -zxvf VMwareTools-version.tar.gz
cd vmware-tools-distrib
./vmware-install.pl
umount /mnt/cdrom
cd /
rm /tmp/VMwareTools-version.tar.gz
rm -rf /tmp/vmware-tools-distrib
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装过程出现 <code>-bash: ./vmware-install.pl: /usr/bin/perl: bad interpreter: No such file or directory</code> 安装相关的环境即可,输入命令 <code>yum -y install gcc gcc-c++ perl make kernel-headers kernel-devel</code></p><h3 id="配置网络" tabindex="-1"><a class="header-anchor" href="#配置网络" aria-hidden="true">#</a> 配置网络</h3>`,3),O={href:"https://blog.csdn.net/zsg88/article/details/75095229",target:"_blank",rel:"noopener noreferrer"},k=a(`<p>配置固定ip</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vim /etc/sysconfig/network-scripts/ifcfg-ens33

####################################################
TYPE=&quot;Ethernet&quot;
PROXY_METHOD=&quot;none&quot;
BROWSER_ONLY=&quot;no&quot;
BOOTPROTO=&quot;static&quot; #dhcp改为static 
DEFROUTE=&quot;yes&quot;
IPV4_FAILURE_FATAL=&quot;no&quot;
IPV6INIT=&quot;yes&quot;
IPV6_AUTOCONF=&quot;yes&quot;
IPV6_DEFROUTE=&quot;yes&quot;
IPV6_FAILURE_FATAL=&quot;no&quot;
IPV6_ADDR_GEN_MODE=&quot;stable-privacy&quot;
NAME=&quot;ens33&quot;
UUID=&quot;dc94394f-84ed-48b4-911f-c1e0f298c5ce&quot;
DEVICE=&quot;ens33&quot;
ONBOOT=&quot;yes&quot; #开机启用本配置
IPADDR=192.168.85.130 #静态IP
GATEWAY=192.168.85.2 #默认网关
NETMASK=255.255.255.0 #子网掩码
DNS1=192.168.85.2 #DNS 配置
####################################################
systemctl restart network
ping baidu.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置-yum-源" tabindex="-1"><a class="header-anchor" href="#配置-yum-源" aria-hidden="true">#</a> 配置 yum 源</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>yum install -y wget
cd /etc/yum.repos.d
cp ./CentOS-Base.repo ./CentOS-Base.repo.bak
cp ./epel-7.repo ./epel-7.repo.bak
wget http://mirrors.aliyun.com/repo/Centos-7.repo
wget https://mirrors.aliyun.com/repo/epel-7.repo
yum clean all
yum makecache
yum update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装-ssh" tabindex="-1"><a class="header-anchor" href="#安装-ssh" aria-hidden="true">#</a> 安装 ssh</h3><p>CentOS7 DVD 默认已安装启动</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>yum install -y openssl openssh-server
vim /etc/ssh/sshd_config
# 将 PermitRootLogin，RSAAuthentication，PubkeyAuthentication 的设置打开。
systemctl start sshd
systemctl enable sshd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置 ssh 免密登录</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ssh-keygen -f ~/.ssh/id_rsa -N &#39;&#39;
for i in CentOS7-Node1 CentOS7-Node2 CentOS7-Node3 CentOS7-Node4 CentOS7-Node5
do
    ssh-copy-id $i
done
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="常用软件安装" tabindex="-1"><a class="header-anchor" href="#常用软件安装" aria-hidden="true">#</a> 常用软件安装</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 安装命令行补全
yum install -y wget vim curl bash-completion yum-utils
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,11);function V(E,N){const i=d("ExternalLinkIcon");return t(),l("div",null,[c,e("p",null,[e("a",v,[n("VMWare最新版本唯一官方下载地址"),s(i)])]),u,m,h,e("p",null,[n("可以选择从"),e("a",b,[n("官网"),s(i)]),n("或者"),e("a",p,[n("阿里云镜像仓库"),s(i)]),n("下载")]),_,g,e("p",null,[n("一直下一步即可，"),e("a",x,[n("参考链接"),s(i)])]),e("h3",f,[w,n(),e("a",y,[n("安装 VMTools"),s(i)])]),q,e("p",null,[e("a",O,[n("參考链接"),s(i)])]),k])}const D=r(o,[["render",V],["__file","vmware-install-minimal-centos7.html.vue"]]);export{D as default};
