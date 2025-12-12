// server/api/auth/verify.js
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const correctPassword = "by521"; // 从环境变量获取密码

  if (body.password === correctPassword) {
    setCookie(event, "auth_passed", "1", {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return { success: true };
  }
  console.warn(`Failed login attempt from ${getRequestIP(event)}`); //记录请求失败的ip
  return { success: false };
});
