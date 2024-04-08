import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "full-featured",
  description: "A VitePress Site",
  base: "/full-featured/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "功能介绍", link: "/" },
      { text: "安装引导", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "",
        items: [
          { text: "安装", link: "/markdown-examples" },
          { text: "", link: "/api-examples" },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
