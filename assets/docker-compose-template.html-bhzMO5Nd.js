import{_ as a,r,o as l,c as t,b as e,d,e as i,a as s}from"./app-rBywrD27.js";const c={},o=s(`<h2 id="compose-模板文件" tabindex="-1"><a class="header-anchor" href="#compose-模板文件" aria-hidden="true">#</a> Compose 模板文件</h2><p>模板文件是使用 <code>Compose</code> 的核心，涉及到的指令关键字也比较多。但大家不用担心，这里面大部分指令跟 <code>docker run</code> 相关参数的含义都是类似的。</p><p>默认的模板文件名称为 <code>docker-compose.yml</code>，格式为 YAML 格式。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>version: &quot;3&quot;

services:
  webapp:
    image: examples/web
    ports:
      - &quot;80:80&quot;
    volumes:
      - &quot;/data&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意每个服务都必须通过 <code>image</code> 指令指定镜像或 <code>build</code> 指令（需要 Dockerfile）等来自动构建生成镜像。</p><p>如果使用 <code>build</code> 指令，在 <code>Dockerfile</code> 中设置的选项(例如：<code>CMD</code>, <code>EXPOSE</code>, <code>VOLUME</code>, <code>ENV</code> 等) 将会自动被获取，无需在 <code>docker-compose.yml</code> 中重复设置。</p><p>下面分别介绍各个指令的用法。</p><h3 id="build" tabindex="-1"><a class="header-anchor" href="#build" aria-hidden="true">#</a> <strong><code>build</code></strong></h3><p>指定 <code>Dockerfile</code> 所在文件夹的路径（可以是绝对路径，或者相对 docker-compose.yml 文件的路径）。 <code>Compose</code> 将会利用它自动构建这个镜像，然后使用这个镜像。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>version: &#39;3&#39;
services:

  webapp:
    build: ./dir
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你也可以使用 <code>context</code> 指令指定 <code>Dockerfile</code> 所在文件夹的路径。</p><p>使用 <code>dockerfile</code> 指令指定 <code>Dockerfile</code> 文件名。</p><p>使用 <code>arg</code> 指令指定构建镜像时的变量。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>version: &#39;3&#39;
services:

  webapp:
    build:
      context: ./dir
      dockerfile: Dockerfile-alternate
      args:
        buildno: 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <code>cache_from</code> 指定构建镜像的缓存</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>build:
  context: .
  cache_from:
    - alpine:latest
    - corp/web_app:3.14
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cap-add-cap-drop" tabindex="-1"><a class="header-anchor" href="#cap-add-cap-drop" aria-hidden="true">#</a> <strong><code>cap_add, cap_drop</code></strong></h3><p>指定容器的内核能力（capacity）分配。</p><p>例如，让容器拥有所有能力可以指定为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cap_add:
  - ALL
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>去掉 NET_ADMIN 能力可以指定为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cap_drop:
  - NET_ADMIN
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="command" tabindex="-1"><a class="header-anchor" href="#command" aria-hidden="true">#</a> <strong><code>command</code></strong></h3><p>覆盖容器启动后默认执行的命令。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>command: echo &quot;hello world&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="configs" tabindex="-1"><a class="header-anchor" href="#configs" aria-hidden="true">#</a> <strong><code>configs</code></strong></h3><p>仅用于 <code>Swarm mode</code>，详细内容请查看 <a href="./docker-swarm-mode"><code>Swarm mode</code></a> 一节。</p><h3 id="cgroup-parent" tabindex="-1"><a class="header-anchor" href="#cgroup-parent" aria-hidden="true">#</a> <strong><code>cgroup_parent</code></strong></h3><p>指定父 <code>cgroup</code> 组，意味着将继承该组的资源限制。</p><p>例如，创建了一个 cgroup 组名称为 <code>cgroups_1</code>。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cgroup_parent: cgroups_1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="container-name" tabindex="-1"><a class="header-anchor" href="#container-name" aria-hidden="true">#</a> <strong><code>container_name</code></strong></h3><p>指定容器名称。默认将会使用 <code>项目名称_服务名称_序号</code> 这样的格式。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>container_name: docker-web-container
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>注意: 指定容器名称后，该服务将无法进行扩展（scale），因为 Docker 不允许多个容器具有相同的名称。</p></blockquote><h3 id="deploy" tabindex="-1"><a class="header-anchor" href="#deploy" aria-hidden="true">#</a> <strong><code>deploy</code></strong></h3>`,36),v=e("code",null,"Swarm mode",-1),u={href:"https://yeasy.gitbook.io/docker_practice/swarm_mode",target:"_blank",rel:"noopener noreferrer"},m=e("code",null,"Swarm mode",-1),p=s(`<h1 id="devices" tabindex="-1"><a class="header-anchor" href="#devices" aria-hidden="true">#</a> <strong><code>devices</code></strong></h1><p>指定设备映射关系。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>devices:
  - &quot;/dev/ttyUSB1:/dev/ttyUSB0&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="depends-on" tabindex="-1"><a class="header-anchor" href="#depends-on" aria-hidden="true">#</a> <strong><code>depends_on</code></strong></h3><p>解决容器的依赖、启动先后的问题。以下例子中会先启动 <code>redis</code> <code>db</code> 再启动 <code>web</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>version: &#39;3&#39;

services:
  web:
    build: .
    depends_on:
      - db
      - redis

  redis:
    image: redis

  db:
    image: postgres
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注意：<code>web</code> 服务不会等待 <code>redis</code> <code>db</code> 「完全启动」之后才启动。</p></blockquote><h3 id="dns" tabindex="-1"><a class="header-anchor" href="#dns" aria-hidden="true">#</a> <strong><code>dns</code></strong></h3><p>自定义 <code>DNS</code> 服务器。可以是一个值，也可以是一个列表。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>dns: 8.8.8.8

dns:
  - 8.8.8.8
  - 114.114.114.114
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="dns-search" tabindex="-1"><a class="header-anchor" href="#dns-search" aria-hidden="true">#</a> <strong><code>dns_search</code></strong></h1><p>配置 <code>DNS</code> 搜索域。可以是一个值，也可以是一个列表。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>dns_search: example.com

dns_search:
  - domain1.example.com
  - domain2.example.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="tmpfs" tabindex="-1"><a class="header-anchor" href="#tmpfs" aria-hidden="true">#</a> <strong><code>tmpfs</code></strong></h3><p>挂载一个 tmpfs 文件系统到容器。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>tmpfs: /run
tmpfs:
  - /run
  - /tmp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="env-file" tabindex="-1"><a class="header-anchor" href="#env-file" aria-hidden="true">#</a> <strong><code>env_file</code></strong></h3><p>从文件中获取环境变量，可以为单独的文件路径或列表。</p><p>如果通过 <code>docker-compose -f FILE</code> 方式来指定 Compose 模板文件，则 <code>env_file</code> 中变量的路径会基于模板文件路径。</p><p>如果有变量名称与 <code>environment</code> 指令冲突，则按照惯例，以后者为准。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>env_file: .env

env_file:
  - ./common.env
  - ./apps/web.env
  - /opt/secrets.env
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>环境变量文件中每一行必须符合格式，支持 <code>#</code> 开头的注释行。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># common.env: Set development environment
PROG_ENV=development
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="environment" tabindex="-1"><a class="header-anchor" href="#environment" aria-hidden="true">#</a> <strong><code>environment</code></strong></h3><p>设置环境变量。你可以使用数组或字典两种格式。</p><p>只给定名称的变量会自动获取运行 Compose 主机上对应变量的值，可以用来防止泄露不必要的数据。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>environment:
  RACK_ENV: development
  SESSION_SECRET:

environment:
  - RACK_ENV=development
  - SESSION_SECRET
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,27),b=e("code",null,"true|false，yes|no",-1),g={href:"https://yaml.org/type/bool.html",target:"_blank",rel:"noopener noreferrer"},h=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>y|Y|yes|Yes|YES|n|N|no|No|NO|true|True|TRUE|false|False|FALSE|on|On|ON|off|Off|OFF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="expose" tabindex="-1"><a class="header-anchor" href="#expose" aria-hidden="true">#</a> <strong><code>expose</code></strong></h3><p>暴露端口，但不映射到宿主机，只被连接的服务访问。</p><p>仅可以指定内部端口为参数</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>expose:
 - &quot;3000&quot;
 - &quot;8000&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="external-links" tabindex="-1"><a class="header-anchor" href="#external-links" aria-hidden="true">#</a> <strong><code>external_links</code></strong></h3><blockquote><p>注意：不建议使用该指令。</p></blockquote><p>链接到 <code>docker-compose.yml</code> 外部的容器，甚至并非 <code>Compose</code> 管理的外部容器。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>external_links:
 - redis_1
 - project_db_1:mysql
 - project_db_1:postgresql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="extra-hosts" tabindex="-1"><a class="header-anchor" href="#extra-hosts" aria-hidden="true">#</a> <strong><code>extra_hosts</code></strong></h3><p>类似 Docker 中的 <code>--add-host</code> 参数，指定额外的 host 名称映射信息。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>extra_hosts:
 - &quot;googledns:8.8.8.8&quot;
 - &quot;dockerhub:52.1.157.61&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>会在启动后的服务容器中 <code>/etc/hosts</code> 文件中添加如下两条条目。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>8.8.8.8 googledns
52.1.157.61 dockerhub
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="healthcheck" tabindex="-1"><a class="header-anchor" href="#healthcheck" aria-hidden="true">#</a> <strong><code>healthcheck</code></strong></h3><p>通过命令检查容器是否健康运行。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>healthcheck:
  test: [&quot;CMD&quot;, &quot;curl&quot;, &quot;-f&quot;, &quot;http://localhost&quot;]
  interval: 1m30s
  timeout: 10s
  retries: 3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="image" tabindex="-1"><a class="header-anchor" href="#image" aria-hidden="true">#</a> <strong><code>image</code></strong></h3><p>指定为镜像名称或镜像 ID。如果镜像在本地不存在，<code>Compose</code> 将会尝试拉取这个镜像。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>image: ubuntu
image: orchardup/postgresql
image: a4bc65fd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="labels" tabindex="-1"><a class="header-anchor" href="#labels" aria-hidden="true">#</a> <strong><code>labels</code></strong></h3><p>为容器添加 Docker 元数据（metadata）信息。例如可以为容器添加辅助说明信息。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>labels:
  com.startupteam.description: &quot;webapp for a startup team&quot;
  com.startupteam.department: &quot;devops department&quot;
  com.startupteam.release: &quot;rc3 for v1.0&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> <strong><code>links</code></strong></h3><blockquote><p>注意：不推荐使用该指令。</p></blockquote><h3 id="logging" tabindex="-1"><a class="header-anchor" href="#logging" aria-hidden="true">#</a> <strong><code>logging</code></strong></h3><p>配置日志选项。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>logging:
  driver: syslog
  options:
    syslog-address: &quot;tcp://192.168.0.42:123&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>目前支持三种日志驱动类型。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>driver: &quot;json-file&quot;
driver: &quot;syslog&quot;
driver: &quot;none&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>options</code> 配置日志驱动的相关参数。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>options:
  max-size: &quot;200k&quot;
  max-file: &quot;10&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="network-mode" tabindex="-1"><a class="header-anchor" href="#network-mode" aria-hidden="true">#</a> <strong><code>network_mode</code></strong></h3><p>设置网络模式。使用和 <code>docker run</code> 的 <code>--network</code> 参数一样的值。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>network_mode: &quot;bridge&quot;
network_mode: &quot;host&quot;
network_mode: &quot;none&quot;
network_mode: &quot;service:[service name]&quot;
network_mode: &quot;container:[container name/id]&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="networks" tabindex="-1"><a class="header-anchor" href="#networks" aria-hidden="true">#</a> <strong><code>networks</code></strong></h3><p>配置容器连接的网络。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>version: &quot;3&quot;
services:

  some-service:
    networks:
     - some-network
     - other-network

networks:
  some-network:
  other-network:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="pid" tabindex="-1"><a class="header-anchor" href="#pid" aria-hidden="true">#</a> <strong><code>pid</code></strong></h3><p>跟主机系统共享进程命名空间。打开该选项的容器之间，以及容器和宿主机系统之间可以通过进程 ID 来相互访问和操作。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>pid: &quot;host&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="ports" tabindex="-1"><a class="header-anchor" href="#ports" aria-hidden="true">#</a> <strong><code>ports</code></strong></h3><p>暴露端口信息。</p><p>使用宿主端口：容器端口 <code>(HOST:CONTAINER)</code> 格式，或者仅仅指定容器的端口（宿主将会随机选择端口）都可以。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ports:
 - &quot;3000&quot;
 - &quot;8000:8000&quot;
 - &quot;49100:22&quot;
 - &quot;127.0.0.1:8001:8001&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>注意：当使用</em> <em><code>HOST:CONTAINER</code></em> <em>格式来映射端口时，如果你使用的容器端口小于 60 并且没放到引号里，可能会得到错误结果，因为</em> <em><code>YAML</code></em> <em>会自动解析</em> <em><code>xx:yy</code></em> <em>这种数字格式为 60 进制。为避免出现这种问题，建议数字串都采用引号包括起来的字符串格式。</em></p><h3 id="secrets" tabindex="-1"><a class="header-anchor" href="#secrets" aria-hidden="true">#</a> <strong><code>secrets</code></strong></h3><p>存储敏感数据，例如 <code>mysql</code> 服务密码。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>version: &quot;3.1&quot;
services:

mysql:
  image: mysql
  environment:
    MYSQL_ROOT_PASSWORD_FILE: /run/secrets/db_root_password
  secrets:
    - db_root_password
    - my_other_secret

secrets:
  my_secret:
    file: ./my_secret.txt
  my_other_secret:
    external: true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="security-opt" tabindex="-1"><a class="header-anchor" href="#security-opt" aria-hidden="true">#</a> <strong><code>security_opt</code></strong></h3><p>指定容器模板标签（label）机制的默认属性（用户、角色、类型、级别等）。例如配置标签的用户名和角色名。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>security_opt:
    - label:user:USER
    - label:role:ROLE
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="stop-signal" tabindex="-1"><a class="header-anchor" href="#stop-signal" aria-hidden="true">#</a> <strong><code>stop_signal</code></strong></h3><p>设置另一个信号来停止容器。在默认情况下使用的是 SIGTERM 停止容器。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>stop_signal: SIGUSR1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="sysctls" tabindex="-1"><a class="header-anchor" href="#sysctls" aria-hidden="true">#</a> <strong><code>sysctls</code></strong></h3><p>配置容器内核参数。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sysctls:
  net.core.somaxconn: 1024
  net.ipv4.tcp_syncookies: 0

sysctls:
  - net.core.somaxconn=1024
  - net.ipv4.tcp_syncookies=0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ulimits" tabindex="-1"><a class="header-anchor" href="#ulimits" aria-hidden="true">#</a> <strong><code>ulimits</code></strong></h3><p>指定容器的 ulimits 限制值。</p><p>例如，指定最大进程数为 65535，指定文件句柄数为 20000（软限制，应用可以随时修改，不能超过硬限制） 和 40000（系统硬限制，只能 root 用户提高）。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  ulimits:
    nproc: 65535
    nofile:
      soft: 20000
      hard: 40000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="volumes" tabindex="-1"><a class="header-anchor" href="#volumes" aria-hidden="true">#</a> <strong><code>volumes</code></strong></h3><p>数据卷所挂载路径设置。可以设置为宿主机路径(<code>HOST:CONTAINER</code>)或者数据卷名称(<code>VOLUME:CONTAINER</code>)，并且可以设置访问模式 （<code>HOST:CONTAINER:ro</code>）。</p><p>该指令中路径支持相对路径。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>volumes:
 - /var/lib/mysql
 - cache/:/tmp/cache
 - ~/configs:/etc/configs/:ro
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果路径为数据卷名称，必须在文件中配置数据卷。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>version: &quot;3&quot;

services:
  my_src:
    image: mysql:8.0
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="其它指令" tabindex="-1"><a class="header-anchor" href="#其它指令" aria-hidden="true">#</a> <strong>其它指令</strong></h2><p>此外，还有包括 <code>domainname, entrypoint, hostname, ipc, mac_address, privileged, read_only, shm_size, restart, stdin_open, tty, user, working_dir</code> 等指令，基本跟 <code>docker run</code> 中对应参数的功能一致。</p><p>指定服务容器启动后执行的入口文件。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>entrypoint: /code/entrypoint.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>指定容器中运行应用的用户名。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>user: nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>指定容器中工作目录。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>working_dir: /code
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>指定容器中搜索域名、主机名、mac 地址等。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>domainname: your_website.com
hostname: test
mac_address: 08-00-27-00-0C-0A
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>允许容器中运行一些特权命令。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>privileged: true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>指定容器退出后的重启策略为始终重启。该命令对保持服务始终运行十分有效，在生产环境中推荐配置为 <code>always</code> 或者 <code>unless-stopped</code>。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>restart: always
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>以只读模式挂载容器的 root 文件系统，意味着不能对容器内容进行修改。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>read_only: true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>打开标准输入，可以接受外部输入。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>stdin_open: true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>模拟一个伪终端。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>tty: true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="读取变量" tabindex="-1"><a class="header-anchor" href="#读取变量" aria-hidden="true">#</a> <strong>读取变量</strong></h2><p>Compose 模板文件支持动态读取主机的系统环境变量和当前目录下的 <code>.env</code> 文件中的变量。</p><p>例如，下面的 Compose 文件将从运行它的环境中读取变量 <code>\${MONGO_VERSION}</code> 的值，并写入执行的指令中。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>version: &quot;3&quot;
services:

db:
  image: &quot;mongo:\${MONGO_VERSION}&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果执行 <code>MONGO_VERSION=3.2 docker-compose up</code> 则会启动一个 <code>mongo:3.2</code> 镜像的容器；如果执行 <code>MONGO_VERSION=2.8 docker-compose up</code> 则会启动一个 <code>mongo:2.8</code> 镜像的容器。</p><p>若当前目录存在 <code>.env</code> 文件，执行 <code>docker-compose</code> 命令时将从该文件中读取变量。</p><p>在当前目录新建 <code>.env</code> 文件并写入以下内容。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 支持 # 号注释
MONGO_VERSION=3.6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>执行 <code>docker-compose up</code> 则会启动一个 <code>mongo:3.6</code> 镜像的容器。</p><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> <strong>参考资料</strong></h2>`,98),x={href:"https://docs.docker.com/compose/compose-file/",target:"_blank",rel:"noopener noreferrer"},_={href:"https://github.com/docker/awesome-compose",target:"_blank",rel:"noopener noreferrer"};function f(q,k){const n=r("ExternalLinkIcon");return l(),t("div",null,[o,e("p",null,[d("仅用于 "),v,d("，详细内容请查看 "),e("a",u,[m,i(n)]),d(" 一节")]),p,e("p",null,[d("如果变量名称或者值中用到 "),b,d(" 等表达 "),e("a",g,[d("布尔"),i(n)]),d(" 含义的词汇，最好放到引号里，避免 YAML 自动解析某些内容为对应的布尔语义。这些特定词汇，包括")]),h,e("ul",null,[e("li",null,[e("a",x,[d("官方文档"),i(n)])]),e("li",null,[e("a",_,[d("awesome-compose"),i(n)])])])])}const w=a(c,[["render",f],["__file","docker-compose-template.html.vue"]]);export{w as default};
