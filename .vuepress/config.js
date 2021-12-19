module.exports = {
  "title": "小鹏杂谈",
  "description": "小鹏杂谈",
  "dest": "dest",
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
    // 看板娘
    // ["@vuepress-reco/vuepress-plugin-kan-ban-niang"],
    // 音乐播放器
    ["@vuepress-reco/vuepress-plugin-bgm-player", {
      // 默认不自动播放
      autoplay: false,
      // 默认缩小
      autoShrink: true,
      // 播放列表
      audios: [
        // 网络文件示例
        {
          name: '苍穹',
          artist: '韩磊',
          url: 'http://dl.stream.qqmusic.qq.com/C400003lizLX38Dm1v.m4a?guid=6286738029&vkey=7E6ED0ABC93284D399196F492C4B8A78F9C26804A72BE3A3C07970B9ABF4C87FC2651D59A568266AEBD6367D48399E84A3C1A00EA35BD857&uin=&fromtag=66',
          cover: 'https://y.qq.com/music/photo_new/T002R300x300M0000046Etze42qCxC_1.jpg'
        },
        {
          name: '世间美好与你环环相扣',
          artist: '柏松',
          url: 'https://m10.music.126.net/20211219203713/ad80093b7314084aa55021232426832b/ymusic/0459/045c/520c/330c359473365e50a368ef0d43bc612f.mp3',
          cover: 'https://y.qq.com/music/photo_new/T002R300x300M000002Ks2fK36m5UA_1.jpg'
        }
      ]
    }],
    // 评论系统
    /*
    ['@vuepress-reco/comments', {
      solution: 'vssue',
      options: {
        title: 'lzpeng723.github.io',
        platform: 'github',
        owner: 'lzpeng723',
        repo: 'lzpeng723.github.io',
        clientId: '*************',
        clientSecret: '********************************',
      }
    }],*/
    // 悬浮框
    ['@vuepress-reco/vuepress-plugin-bulletin-popover', {
      width: '260px', // 默认 260px
      title: '消息提示',
      body: [
        {
          type: 'title',
          content: '欢迎访问小鹏杂谈 🎉🎉🎉',
          style: 'text-aligin: center;'
        },
        {
          type: 'title',
          content: '扫码关注公众号',
          style: 'text-aligin: center;'
        },
        {
          type: 'image',
          src: '/wx_qrcode.jpg'
        }
      ],
      footer: [
        {
          type: 'button',
          text: '点我',
          link: 'https://github.com/lzpeng723'
        }
      ]
    }]
  ]
}
