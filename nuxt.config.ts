// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import remarkBreaks from "remark-breaks"; // ✅ 引入插件本体
export default defineNuxtConfig({
  compatibilityDate: "2025-04-01",
  devtools: { enabled: false },

  modules: ["@nuxt/content", "@nuxt/image", "@nuxt/scripts", "@nuxt/test-utils", "@pinia/nuxt"],

  app: {
    head: {
      title: "碧瑶の狐岐资料馆", // default fallback title
      meta: [{ name: "referrer", content: "no-referrer" }],
      htmlAttrs: {
        lang: "zh-CN",
      },
      link: [{ rel: "icon", type: "image/png", href: "img/icon1.png" }],
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1, maximum-scale=1,user-scalable=no",
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
  content: {
    build: {
      markdown: {
        remarkPlugins: { "remark-breaks": {} },
        // 允许使用单个换行作为 <br>
        toc: {
          depth: 2,
          searchDepth: 2,
        },
        // 👇 启用 breaks
        highlight: {
          theme: "github-dark",
        },
        // 启用换行符解析为 <br>
      },
    },
  },
  future: {
    compatibilityVersion: 4, //启用nuxt4版本
  },

  postcss: {
    plugins: {
      "postcss-nested": {},
      "@csstools/postcss-oklab-function": { preserve: true }, //适配旧版本浏览器的颜色
      "postcss-custom-media": {},
    },
  },
  css: ["@/assets/css/main.css"],

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/robots.txt"],
      ignore: [
        /^\/posts\/.+/, // ❌ 不生成 /posts/* 的 HTML 文件
      ],
    },
    preset: "node-server",
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ["marmot-sterling-strongly.ngrok-free.app"],
      strictPort: true, // 如果端口被占用，则直接失败
      cors: true, // 允许跨域访问
    },
  },
});
