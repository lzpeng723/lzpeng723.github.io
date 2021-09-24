
# 基础镜像使用node:alpine
FROM node:alpine AS build
# 工作目录
WORKDIR /app
# 复制文件
COPY . /app
# 安装依赖 打包
RUN npm install --registry=https://registry.npm.taobao.org && npm run build
# 使用nginx镜像
FROM nginx:alpine
# 复制文件
COPY --from=build /app/dest /usr/share/nginx/html
# 暴漏端口
EXPOSE 80
# 运行nginx
CMD ["nginx", "-g", "daemon off;"]