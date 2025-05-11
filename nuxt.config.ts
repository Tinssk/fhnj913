// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import remarkBreaks from "remark-breaks"; // ✅ 引入插件本体
export default defineNuxtConfig({
  compatibilityDate: "2025-04-01",
  devtools: { enabled: false },
  devServer: {
    host: "192.168.0.170",
    port: 3000,
  },

  modules: ["@nuxt/content", "@nuxt/image", "@nuxt/scripts", "@nuxt/test-utils", "@pinia/nuxt", "shadcn-nuxt"],

  app: {
    head: {
      meta: [{ name: "referrer", content: "no-referrer" }],
      title: "碧瑶の狐岐资料馆", // default fallback title
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
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./app/components/ui"
     */
    componentDir: "./app/components/ui",
  },
  content: {
    build: {
      markdown: {
        remarkPlugins: { "remark-breaks": {} },
        // 允许使用单个换行作为 <br>
        toc: {
          depth: 3,
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
      "@csstools/postcss-oklab-function": { preserve: true }, //适配旧版本浏览器的颜色
    },
  },
  css: ["@/assets/css/main.css"],

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/robots.txt"],
    },
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      strictPort: true, // 如果端口被占用，则直接失败
      cors: true, // 允许跨域访问
    },
  },
});
