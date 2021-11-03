---
title:  10. Kubernetes详细教程-DashBoard
date: 2021-11-02
tags:
  - Kubernetes
categories:
  - 运维
---

[原文链接](https://gitee.com/yooome/golang/blob/main/k8s详细教程/Kubernetes详细教程.md#10-dashboard) [视频教程](https://www.bilibili.com/video/BV1Qv41167ck?p=84)

# 10. DashBoard

之前在kubernetes中完成的所有操作都是通过命令行工具kubectl完成的。其实，为了提供更丰富的用户体验，kubernetes还开发了一个基于web的用户界面（Dashboard）。用户可以使用Dashboard部署容器化的应用，还可以监控应用的状态，执行故障排查以及管理kubernetes中各种资源。

## 10.1 部署Dashboard

1) [下载yaml](https://raw.githubusercontent.com/kubernetes/dashboard/v2.4.0/aio/deploy/recommended.yaml),修改镜像,并运行Dashboard

```bash
docker pull registry.cn-hangzhou.aliyuncs.com/kubernetes_ns/metrics-scraper:v1.0.4
docker pull registry.cn-hangzhou.aliyuncs.com/kubernetes_ns/dashboard:v2.0.3
docker save -o k8s-dashboard-images.tar `docker images | grep kubernetes_ns | awk 'BEGIN{OFS=":";ORS=" "}{print $1,$2}'`
```

将yaml文件中的

`kubernetesui/metrics-scraper:v1.0.7`替换为`registry.cn-hangzhou.aliyuncs.com/kubernetes_ns/metrics-scraper:v1.0.4`

`kubernetesui/dashboard:v2.4.0`替换为`registry.cn-hangzhou.aliyuncs.com/kubernetes_ns/dashboard:v2.0.3`

修改 Service 配置

```yaml
kind: Service
apiVersion: v1
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard
  namespace: kubernetes-dashboard
spec:
  type: NodePort  # 新增
  ports:
    - port: 443
      targetPort: 8443
      nodePort: 32100  # 新增
  selector:
    k8s-app: kubernetes-dashboard
```

```bash
# 部署
kubectl create -f recommended.yaml
# 查看namespace下的kubernetes-dashboard下的资源
kubectl get pod,svc -n kubernetes-dashboard

NAME                                            READY   STATUS    RESTARTS   AGE
pod/dashboard-metrics-scraper-c79c65bb7-zwfvw   1/1     Running   0          111s
pod/kubernetes-dashboard-56484d4c5-z95z5        1/1     Running   0          111s

NAME                               TYPE       CLUSTER-IP      EXTERNAL-IP  PORT(S)         AGE
service/dashboard-metrics-scraper  ClusterIP  10.96.89.218    <none>       8000/TCP        111s
service/kubernetes-dashboard       NodePort   10.104.178.171  <none>       443:30009/TCP   111s
```

2）创建访问账户，获取token

```bash
# 创建账号
kubectl create serviceaccount dashboard-admin -n kubernetes-dashboard

# 授权
kubectl create clusterrolebinding dashboard-admin-rb --clusterrole=cluster-admin --serviceaccount=kubernetes-dashboard:dashboard-admin

# 获取账号token
kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | grep dashboard-admin | awk '{print $1}')

Name:         dashboard-admin-token-xbqhh
Namespace:    kubernetes-dashboard
Labels:       <none>
Annotations:  kubernetes.io/service-account.name: dashboard-admin
              kubernetes.io/service-account.uid: 95d84d80-be7a-4d10-a2e0-68f90222d039

Type:  kubernetes.io/service-account-token

Data
====
namespace:  20 bytes
token:      eyJhbGciOiJSUzI1NiIsImtpZCI6ImJrYkF4bW5XcDhWcmNGUGJtek5NODFuSXl1aWptMmU2M3o4LTY5a2FKS2cifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlcm5ldGVzLWRhc2hib2FyZCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJkYXNoYm9hcmQtYWRtaW4tdG9rZW4teGJxaGgiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiZGFzaGJvYXJkLWFkbWluIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiOTVkODRkODAtYmU3YS00ZDEwLWEyZTAtNjhmOTAyMjJkMDM5Iiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmVybmV0ZXMtZGFzaGJvYXJkOmRhc2hib2FyZC1hZG1pbiJ9.NAl7e8ZfWWdDoPxkqzJzTB46sK9E8iuJYnUI9vnBaY3Jts7T1g1msjsBnbxzQSYgAG--cV0WYxjndzJY_UWCwaGPrQrt_GunxmOK9AUnzURqm55GR2RXIZtjsWVP2EBatsDgHRmuUbQvTFOvdJB4x3nXcYLN2opAaMqg3rnU2rr-A8zCrIuX_eca12wIp_QiuP3SF-tzpdLpsyRfegTJZl6YnSGyaVkC9id-cxZRb307qdCfXPfCHR_2rt5FVfxARgg_C0e3eFHaaYQO7CitxsnIoIXpOFNAR8aUrmopJyODQIPqBWUehb7FhlU1DCduHnIIXVC_UICZ-MKYewBDLw
ca.crt:     1025 bytes
```

3）通过浏览器访问Dashboard的UI

在登录页面上输入上面的token

![image-20200520144548997](./Kubenetes.assets/image-20200520144548997.png)

出现下面的页面代表成功

![image-20200520144959353](./Kubenetes.assets/image-20200520144959353.png)

## 10.2 使用DashBoard

本章节以Deployment为例演示DashBoard的使用

**查看**

选择指定的命名空间`dev`，然后点击`Deployments`，查看dev空间下的所有deployment

![img](./Kubenetes.assets/image-20200520154628679.png)

**扩缩容**

在`Deployment`上点击`规模`，然后指定`目标副本数量`，点击确定

![img](./Kubenetes.assets/image-20200520162605102.png)

**编辑**

在`Deployment`上点击`编辑`，然后修改`yaml文件`，点击确定

![image-20200520163253644](./Kubenetes.assets/image-20200520163253644.png)

**查看Pod**

点击`Pods`, 查看pods列表

![img](./Kubenetes.assets/image-20200520163552110.png)

**操作Pod**

选中某个Pod，可以对其执行日志（logs）、进入执行（exec）、编辑、删除操作

![img](./Kubenetes.assets/image-20200520163832827.png)

> Dashboard提供了kubectl的绝大部分功能，这里不再一一演示