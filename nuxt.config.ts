// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-04-01",
  devtools: { enabled: false },
  devServer: {
    host: "192.168.0.103",
    port: 3000,
  },

  modules: ["@nuxt/content", "@nuxt/image", "@nuxt/scripts", "@nuxt/test-utils", "@pinia/nuxt", "shadcn-nuxt"],

  app: {
    head: {
      meta: [
        { name: "referrer", content: "no-referrer" },
        { name: "description", content: "碧瑶的一切相关资料网站,小说诛仙女主角碧瑶专属的网站,为碧瑶粉丝,花瓣们提供服务的网站;包括碧瑶角色介绍,同人文,证据资料,同人美图等等" },
        { name: "keywords", content: "碧瑶,诛仙,资料,资料库,资料站,证据,同人,美图,图片,同人文" },
        { name: "robots", content: "index, follow" },
        { name: "author", content: "碧瑶伤心花瓣组" },
        { name: "image", content: "https://www.biyao521.com/img/wiki/by1.jpg" },
        { charset: "utf-8" },
        { property: "og:title", content: "碧瑶的狐岐资料站" },
        { property: "og:description", content: "碧瑶的一切相关资料网站,小说诛仙女主角碧瑶专属的网站,为碧瑶粉丝,花瓣们提供服务;包括同人文,证据资料,同人美图等等" },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "https://www.biyao521.com/img/wiki/by1.jpg" },
        { property: "og:url", content: "https://www.biyao521.com" },
      ],
      title: "碧瑶的狐岐资料站", // default fallback title
      htmlAttrs: {
        lang: "zh-CN",
      },
      link: [
        { rel: "icon", type: "image/png", href: "/img/icon1.png" },
        {
          rel: "preload",
          as: "image",
          href: "/img/header/main-header.jpg",
        },
        {
          rel: "preload",
          as: "font",
          type: "font/woff2",
          href: "/fonts/汉仪文黑-65W.woff2",
          crossorigin: "anonymous",
        },
      ],
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1, maximum-scale=1,user-scalable=no",
    },
    pageTransition: { name: "page", mode: "out-in" },
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
      pathMeta: {
        slugifyOptions: {},
      },
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
    serverAssets: [
      {
        baseName: "content",
        dir: "../content", // Relative to Nitro `srcDir`
      },
    ],
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      strictPort: true, // 如果端口被占用，则直接失败
      cors: true, // 允许跨域访问
    },
  },
});
