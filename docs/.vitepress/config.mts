import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Full-Featured",
  description: "A VitePress Site",
  base: "/full-featured/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "功能介绍", link: "/" },
      { text: "安装引导", link: "/markdown-examples" },
    ],
    logo: { src: "./logo.png" },
    sidebar: [
      {
        text: "",
        items: [
          { text: "介绍", link: "/markdown-examples" },
          { text: "快速开始", link: "/api-examples" },
          {
            text: "full-featured-template",
            link: "/template",
            items: [
              { text: "基础技术栈", link: "/template" },
              { text: "axios", link: "/axios" },
              { text: "ali-oss", link: "/ali-oss" },
            ],
          },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/liliphoenix/full-featured" },
      { icon: "npm", link: "https://www.npmjs.com/package/full-featured-cli" },
    ],
  },
});
