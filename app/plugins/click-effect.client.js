// plugins/click-effect.client.js
export default defineNuxtPlugin(() => {
  if (process.client) {
    let a_idx = 0;
    const words = ["❤碧瑶❤", "❤情缘❤", "❤爱恋❤", "❤花瓣❤", "❤生死❤", "❤痴情咒❤", "❤不悔❤", "❤合欢❤", "❤伤心❤", "❤三生七世❤", "❤九幽阴灵❤", "❤伤心花❤", "❤合欢铃❤"];

    window.addEventListener("click", function (event) {
      // 🛑 如果点击的是表单控件，就不触发动画
      const target = event.target; // ✅ 从 event 中获取 target

      if (target.matches("input, textarea, select,a,button") || target.isContentEditable) {
        return; // 🚫 如果是输入框等表单元素，不触发动画
      }
      const heart = document.createElement("b");
      heart.onselectstart = () => false;

      // const clickani = document.createElement("video");
      // clickani.onselectstart = () => false;
      // clickani.src = "/video/clickAni.webm";
      // clickani.setAttribute("width", "150");
      // clickani.setAttribute("height", "150");
      // clickani.setAttribute("muted", "muted");
      // clickani.setAttribute("autoplay", "autoplay");
      // clickani.setAttribute("preload", "auto");
      // clickani.setAttribute("type", "video/webm");

      document.body.appendChild(heart).innerHTML = words[a_idx];
      // document.body.appendChild(clickani);

      a_idx = (a_idx + 1) % words.length;

      const f = 16;
      let x = event.clientX - f / 2;
      let y = event.clientY - f;
      const c = randomColor();
      let a = 1;
      let s = 1.2;

      heart.style.cssText = "position: fixed;left:-100%;z-index:200;";
      // clickani.style.cssText = `position: fixed;left:${x}px;top:${y}px;width: 150px;height: 150px;transform: translate(-50%, -50%);z-index:200;`;

      // clickani.addEventListener("ended", () => {
      //   clickani.pause();
      //   clickani.remove();
      // });

      const timer = setInterval(() => {
        if (a <= 0) {
          heart.remove();
          clearInterval(timer);
        } else {
          heart.style.cssText = `font-size:16px;position: fixed;color:${c};left:${x}px;top:${y}px;opacity:${a};transform:scale(${s});z-index:200;`;
          y--;
          a -= 0.016;
          s += 0.002;
        }
      }, 15);

      function randomColor() {
        return `rgb(${~~(Math.random() * 255)},${~~(Math.random() * 255)},${~~(Math.random() * 255)})`;
      }
    });
  }
});
