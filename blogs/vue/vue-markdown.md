---
title: vue 加载 markdown 文件
date: 2021-09-21
tags:
 - vue
categories:
 - 前端
---

## 如何用Vue将markdown文件渲染到html

安装依赖

```
npm install --save axios
npm install --save markdown-loader vue-markdown
```

使用组件

```vue
<template>
  <div class="markdown">
    <vue-markdown :source="this.htmlMD" style="text-align: left;"></vue-markdown>
  </div>
</template>
<script>
// @ is an alias to /src
import VueMarkdown from 'vue-markdown'
import axios from 'axios'

export default {
  name: 'Markdown',
  components: { VueMarkdown },
  data () {
    return {
      htmlMD: ''
    }
  },
  created () {
      const url = `xxxxxx.md`
      axios.get(url).then((response) => {
        this.htmlMD = response.data
      })
  },
}
</script>

```