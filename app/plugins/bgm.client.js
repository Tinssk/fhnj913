// plugins/bgm.client.js
export default defineNuxtPlugin(() => {
  //   if (process.client) {
  //     const audio = document.createElement("audio");
  //     audio.src = "/audio/bgm.mp3"; // 替换为你的路径
  //     audio.loop = true;
  //     audio.volume = 1; // 音量 0.0 - 1.0
  //     audio.autoplay = false; // autoplay 需要用户交互才能生效
  //     audio.setAttribute("preload", "auto");
  //     document.body.appendChild(audio);
  //     // 必须用户有一次点击行为后才能播放（为符合浏览器限制）
  //     const tryPlay = () => {
  //       audio.play().catch((e) => {
  //         console.warn("自动播放失败，等待用户交互：", e);
  //       });
  //       document.removeEventListener("click", tryPlay);
  //     };
  //     document.addEventListener("click", tryPlay);
  //   }
});
