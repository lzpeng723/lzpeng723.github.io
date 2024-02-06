import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import recoTheme from "vuepress-theme-reco";

export default defineUserConfig({
  title: "小鹏杂谈",
  description: "小鹏杂谈",
  theme: recoTheme({
    style: "@vuepress-reco/style-default",
    logo: "/logo.png",
    author: "lzpeng723",
    authorAvatar: "/head.png",
    docsRepo: "https://github.com/lzpeng723/lzpeng723.github.io",
    docsBranch: "gh-pages-source",
    docsDir: "",
    lastUpdatedText: "",
    // series 为原 sidebar
    series: {
      "/docs/theme-reco/": [
        {
          text: "module one",
          children: ["home", "theme"],
        },
        {
          text: "module two",
          children: ["api", "plugin"],
        },
      ],
    },
    navbar: [
      { text: "首页", link: "/" },
      { text: "分类", link: "/categories/yunwei/1/" },
      { text: "标签", link: "/tags/Kubernetes/1/" },
      { text: "博客", link: "/posts/", icon: "reco-date"  },
      { text: "时间轴", link: "/timeline/", icon: "reco-date" },
      { text: "联系方式",
        children: [
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
        ],
      },
    ],
    bulletin: {
      body: [
        {
          type: "text",
          content: `🎉🎉🎉小鹏杂谈🎉🎉🎉`,
          style: "font-size: 12px;",
        },
        {
          type: "hr",
        },
        {
          type: "title",
          content: "公众号",
        },
        {
          type: 'image',
          src: '/wx_qrcode.jpg'
        },
        {
          type: "hr",
        },
        {
          type: "title",
          content: "GitHub",
        },
        {
          type: "text",
          content: `
          <ul>
            <li><a href="https://github.com/lzpeng723">Home<a/></li>
            <li><a href="https://github.com/lzpeng723/lzpeng723.github.io">lzpeng723.github.io<a/></li>
          </ul>`,
          style: "font-size: 12px;",
        },
        {
          type: "hr",
        },
        {
          type: "buttongroup",
          children: [
            {
              text: "打赏",
              link: "/docs/others/donate.html",
            },
          ],
        },
      ],
    },
    friendshipLinks: [
      {
        title: 'vuepress-reco',
        logo: 'https://avatars.githubusercontent.com/u/54167020?s=200&v=4',
        link: 'https://github.com/vuepress-reco'
      }
    ]
    // commentConfig: {
    //   type: 'valine',
    //   // options 与 1.x 的 valineConfig 配置一致
    //   options: {
    //     // appId: 'xxx',
    //     // appKey: 'xxx',
    //     // placeholder: '填写邮箱可以收到回复提醒哦！',
    //     // verify: true, // 验证码服务
    //     // notify: true,
    //     // recordIP: true,
    //     // hideComments: true // 隐藏评论
    //   },
    // },
  }),
  // debug: true,
});
