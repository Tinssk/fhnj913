declare const process: any;

export default fromNodeMiddleware((req, res, next) => {
  // 判断是否启用密码验证
  if (process.env.USE_PASSWORD !== "true") {
    return next(); // 不启用验证，直接放行
  }
  // 1. 调试日志（可选）
  console.log("[Auth Middleware] Path:", req.url, "| Cookies:", req.headers.cookie);

  // 2. 排除不需要拦截的路径
  const excludePaths = [
    "/password",
    "/_nuxt",
    "/__nuxt_dev__",
    "/__nuxt",
    "/favicon.ico",
    "/__nuxt_error", // 关键修复：排除错误处理路由
    "/api", // 如果有API接口也需要排除
    "_ipx",
    "__nuxt_content",
  ];
  const requestUrl = req.url ?? "";
  if (requestUrl && excludePaths.some((path) => requestUrl.startsWith(path))) {
    return next();
  }
  // 在中间件中添加
  if (requestUrl === "/password" && req.method === "POST") {
    return next();
  }
  // 3. 检查Cookie中的验证标记
  const isAuthenticated = () => {
    if (!req.headers.cookie) return false;

    const cookies = req.headers.cookie.split(";").map((c: any) => c.trim());
    return cookies.some((cookie: any) => {
      const [name, value] = cookie.split("=");
      return name === "auth_passed" && value === "1";
    });
  };

  if (isAuthenticated()) {
    // 3.1 已认证，放行请求
    console.log("已认证过");
    return next();
  } else {
    // 3.2 未认证，重定向到密码页
    console.log("[Auth] Redirecting to /password");
    res.writeHead(302, {
      Location: "/password",
      "Cache-Control": "no-cache", // 防止浏览器缓存重定向
    });
    return res.end();
  }
});
