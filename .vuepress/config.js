module.exports = {
  "title": "小鹏杂谈",
  "description": "小鹏杂谈",
  "dest": "public",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      },
      {
        "name": "QQ",
        "content": "1500913306"
      },
      {
        "name": "wechat",
        "content": "lzpeng723"
      },
      {
        "name": "github",
        "content": "https://github.com/lzpeng723"
      },
      {
        "name": "gitee",
        "content": "https://gitee.com/lzpeng723"
      },
      {
        "name": "zhihu",
        "content": "https://www.zhihu.com/people/lzpeng723"
      }
    ]
  ],
  "theme": "reco",
  "themeConfig": {
    "subSidebar": 'auto', //在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
    "nav": [
      {
        "text": "首页",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "时间线",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "文档",
        "icon": "reco-message",
        "items": [
          {
            "text": "minimal-boot",
            "link": "/docs/minimal-boot/"
          },
          {
            "text": "minimal-cloud",
            "link": "/docs/minimal-cloud/"
          }
        ]
      },
      {
        "text": "联系方式",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/lzpeng723",
            "icon": "reco-github"
          }, 
          {
            "text": "Gitee",
            "link": "https://gitee.com/lzpeng723",
            "icon": "reco-mayun"
          }, 
          {
            "text": "知乎",
            "link": "https://www.zhihu.com/people/lzpeng723",
            "icon": "reco-zhihu"
          }
        ]
      }
    ],
    "sidebar": {
      "/docs/minimal-boot/": [
        ""
      ],
      "/docs/minimal-cloud/": [
        "",
        "project-introduction",
        "quick-understand",
        "quick-start",
        "java-development-book",
        "vue-development-book",
        "deploy-project",
        "common-problem",
        "contribution-code",
        "copyright-notice",
        "special-thanks"
      ]
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "分类"
      },
      "tag": {
        "location": 3,
        "text": "标签"
      }
    },
    "friendLink": [
      {
        "title": "午后南杂",
        "desc": "Enjoy when you can, and endure when you must.",
        "email": "1156743527@qq.com",
        "link": "https://www.recoluan.com"
      },
      {
        "title": "vuepress-theme-reco",
        "desc": "A simple and beautiful vuepress Blog & Doc theme.",
        "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        "link": "https://vuepress-theme-reco.recoluan.com"
      }
    ],
    "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "lzpeng723",
    "authorAvatar": "/avatar.jpg",
    "record": "lzpeng723",
    "startYear": "2021"
  },
  "markdown": {
    "lineNumbers": true
  },
  // 插件配置
  plugins: [
    [
      "@vuepress-reco/vuepress-plugin-kan-ban-niang"
    ],
    [
      "@vuepress-reco/vuepress-plugin-bgm-player",
      {
        // 默认不自动播放
        autoplay: false,
        // 默认缩小
        autoShrink: true,
        // 播放列表
        audios: [
          // 网络文件示例
          {
            name: '我再没见过 像你一般的星空',
            artist: 'Seto',
            url: 'https://assets.smallsunnyfox.com/music/Seto我再没见过像你一般的星空.mp3',
            cover: 'https://assets.smallsunnyfox.com/music/1.png'
          },
          {
            name: '萤火之森',
            artist: 'CMJ',
            url: 'https://assets.smallsunnyfox.com/music/CMJ萤火之森.mp3',
            cover: 'https://assets.smallsunnyfox.com/music/2.png'
          }
        ]  
      }
    ]
  ]
}