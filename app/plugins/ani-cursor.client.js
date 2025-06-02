// plugins/ani-cursor.client.js

export default defineNuxtPlugin(async () => {
  // 判断是否为支持鼠标的设备
  const isMouseDevice = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (isMouseDevice) {
    const { setANICursor } = await import("ani-cursor.js");

    setANICursor("body", "/cursor/normal.ani");
    setANICursor(".catBtn", "/cursor/Link.ani");
    setANICursor(".texto", "/cursor/texto.ani");

    console.log("🐭 ani-cursor enabled for mouse device");
  } else {
    console.log("📱 Touch device detected, ani-cursor skipped");
  }
});
