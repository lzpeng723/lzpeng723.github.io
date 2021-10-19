---
title:  win10家庭版安装Docker for Windows
date: 2021-09-25
tags:
 - Docker
categories:
 - 运维
---

## 伪装成win10专业版

以管理员身份打开cmd。
执行如下命令：

```batch
REG ADD "HKEY_LOCAL_MACHINE\software\Microsoft\Windows NT\CurrentVersion" /v EditionId /T REG_EXPAND_SZ /d Professional /F
```

## 开启Hyper-V

### 一、如果Hyper-V完全禁用或未安装

新建hyperv.cmd文件，内容如下：

```batch
pushd "%~dp0"

dir /b %SystemRoot%\servicing\Packages\*Hyper-V*.mum >hyper-v.txt

for /f %%i in ('findstr /i . hyper-v.txt 2^>nul') do dism /online /norestart /add-package:"%SystemRoot%\servicing\Packages\%%i"

del hyper-v.txt

Dism /online /enable-feature /featurename:Microsoft-Hyper-V-All /LimitAccess /ALL
```

以管理员身份执行```hyperv.cmd```文件。
如果系统要你重启，便重启。
在控制面板->程序和功能->启用或关闭Windows功能打开Hyper-V。

### 二、如果已启用Hyper-V功能但不起作用

使用Hypervisor启用

```batch
bcdedit /set hypervisorlaunchtype auto
```

现在重新启动系统，然后重试。

如果问题仍然存在，则系统上的Hyper-V可能已损坏，因此进入控制面板 - > [程序] - > [Windows功能]，完全取消选中所有与Hyper-V相关的组件，重启系统。
再次启用Hyper-V，重新开始。

## 注意


Hyper-V需要硬件虚拟化作为先决条件。确保您的PC支持它，如果是，但仍然无法正常工作，可能是您的BIOS未正确配置且此功能已禁用。在这种情况下，请检查，启用它并重试。根据所使用的平台，可以根据不同的名称报告虚拟化功能（例如，如果您没有看到明确使用虚拟化标签的任何选项，则必须在Intel上检查SVM功能状态，在VT-x功能状态下）。

Hyper-V 只能安装某些版本，例如：
Windows 10企业版; Windows 10专业版; Windows 10教育。
Hyper-V 无法安装在更便宜或移动的Windows版本上，例如：
Windows 10 Home; Windows 10移动版; Windows 10移动企业版。

## 安装Docker Desktop

[下载地址](https://www.docker.com/products/docker-desktop)

下载后直接安装，安装时注意取消勾选window容器（默认不会勾选）。
Docker安装成功后，执行cmd命令```docker version```。

### 配置镜像加速

阿里云的加速器：https://<你的ID>.mirror.aliyuncs.com [申请地址](https://help.aliyun.com/document_detail/60750.html)

网易加速器：http://hub-mirror.c.163.com

官方中国加速器：https://registry.docker-cn.com

七牛云加速器：https://reg-mirror.qiniu.com

科大镜像(ustc) 的镜像：https://docker.mirrors.ustc.edu.cn

daocloud：https://www.daocloud.io/mirror#accelerator-doc（注册后使用）


```json
"registry-mirrors":  [
    "http://hub-mirror.c.163.com",
    "https://docker.mirrors.ustc.edu.cn",
    "https://registry.docker-cn.com",
    "https://reg-mirror.qiniu.com",
    "https://dockerhub.azk8s.cn"
]
```
## 修改docker文件存储位置

[参考链接]: https://blog.csdn.net/u013948858/article/details/111464534

### 使用WSL修改docker文件存储位置

WSL2模式下docker-desktop-data vm磁盘映像通常位于以下位置：
`C:\Users\<User>\AppData\Local\Docker\wsl\data\ext4.vhdx`
按照以下说明将其重新定位到其他驱动器/目录，并保留所有现有的Docker数据。
 
- 首先，右键单击Docker Desktop图标关闭Docker桌面，然后选择退出Docker桌面，然后，打开命令提示符：
  ```
  wsl --list -v
  ```
- 您应该能够看到，确保两个状态都已停止。
 ```
 NAME                   STATE           VERSION
* docker-desktop         Stopped         2
  docker-desktop-data    Stopped         2
 ```
:::tip
默认情况下，Docker Desktop for Window会创建如下两个发行版（distro) C:\Users\<User>\AppData\Local\Docker\wsl
docker-desktop (对应distro/ext4.vhdx)
docker-desktop-data （对应data/ext4.vhdx）
按官网提示：vhdx文件最大支持256G，超出大小会有异常。当然我的C盘也没那么大[官方说明](https://docs.microsoft.com/en-us/windows/wsl/compare-versions#expanding-the-size-of-your-wsl-2-virtual-hard-disk)
:::
- 将`docker-desktop-data`导出到文件中(备份image及相关文件)，使用如下命令
 ```
 D:
 md wsl2\docker
 wsl --export docker-desktop-data "D:\\wsl2\\docker\\docker-desktop-data.tar"
 ```
- 从wsl取消注册`docker-desktop-data`，请注意`C:\Users\<User>\AppData\Local\Docker\wsl\data\ext4.vhdx`文件将被自动删除。
 ```
 wsl --unregister docker-desktop-data
 ```
- 将导出的`docker-desktop-data`再导入回wsl，并设置我们想要的路径，即新的镜像及各种docker使用的文件的挂载目录，我这里设置到`D:\\docker\\wsl`
 ```
 wsl --import docker-desktop-data "D:\\wsl2\\docker\\wsl" "D:\\wsl2\\docker\\docker-desktop-data.tar" --version 2
 ```
- 命令执行完毕，就能再目录下看到文件了，这时次启动`Docker Desktop`，可以正常工作了

### 如何验证有效

修改前记录 `C:\Users\<User>\AppData\Local\Docker\wsl`目录文件大小（大于2G）
修改后，在记录其文件大小（小于200M）和`D:\\wsl2\\docker\\wsl`（1.47G），然后docker pull任意一个镜像（我下载了nginx、tomcat），再看`C:\Users\<User>\AppData\Local\Docker\wsl`目录无变化，而`D:\\wsl2\\docker\\wsl`增大到2.26G

如果在验证后一切没有问题，则可以删除`D:\\wsl2\\docker\\docker-desktop-data.tar`文件，记住可不是`ext4.vhdx`文件，这可是重要文件

## 最后

### 运行个 Hello World 尝尝鲜

```
docker run hello-world
```

好了，Docker 安装完毕，开始愉快的学习 Docker 吧，[Docker学习教程](https://www.runoob.com/docker)。


## 可能遇到的问题

### docker for windows could not read CA certificate问题

问题原因: 之前安装过 docker toolbox。

解决步骤: 
- 删掉四个docker 的环境变量
- 执行cmd命令```docker-machine rm default```
- 以管理员身份执行cmd命令```@FOR /f "tokens=*" %i IN ('docker-machine env -u') DO @%i```


## 卸载Docker

### 运行卸载程序

### 清除注册表

- 按下`Window+R`唤起命令输入界面，输入`regedit`打开注册表编辑
- 在地址栏输入`HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\Docker Desktop`
- 将整个Docker Desktop组点击右键删除

### [关闭 Hyper-V](https://kb.vmware.com/s/article/2146361?lang=zh_CN) 和 适用于 Linux 的 Windows 子系统

```
bcdedit /set hypervisorlaunchtype off
```
最后重启电脑