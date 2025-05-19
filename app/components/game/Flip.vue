<template>
  <div><!-- 遮罩和游戏弹窗 -->
    <transition name="fade">
      <div v-if="showGame" class="fixed inset-0 z-[9999] flex items-center justify-center">
        <!-- 遮罩层 -->
        <div class="absolute inset-0 bg-opacity-40" @click="closeGame"></div>
        <!-- 游戏主区域 -->
        <div
          class="relative z-10 bg-white rounded-xl shadow-2xl p-6 w-[380px] md:w-[480px] flex flex-col items-center border-4 border-green-500">
          <!-- 步数与重开 -->
          <div class="flex justify-between items-center w-full mb-4">
            <span class="text-green-700 font-bold">步数：{{ steps }}</span>
            <span class="text-green-700">规则:连续点击两张一样的瑶瑶</span>
            <button @click="resetGame"
              class="catBtn ml-2 px-3 py-1 mr-10 bg-green-500 text-white rounded hover:bg-green-600">重新开始</button>
          </div>
          <!-- 卡片区 -->
          <div class="grid grid-cols-4 gap-3">
            <div v-for="(card, idx) in cards" :key="card.id"
              class="catBtn w-16 h-20 md:w-20 md:h-24 cursor-pointer perspective" @click="flipCard(idx)">
              <div
                :class="['relative w-full h-full duration-300', card.flipped || card.matched ? 'rotate-y-180' : '', 'transform-style-preserve-3d']">
                <!-- 背面 -->
                <div
                  class="absolute w-full h-full bg-green-400 rounded-lg flex items-center justify-center text-white text-2xl font-bold backface-hidden shadow-lg">
                  ?</div>
                <!-- 正面 -->
                <div
                  class="absolute w-full h-full rounded-lg bg-white flex items-center justify-center backface-hidden shadow-lg rotate-y-180 overflow-hidden">
                  <img v-if="card.img" :src="card.img" alt="img" class="w-full h-full object-cover rounded-lg" />
                </div>
              </div>
            </div>
          </div>
          <!-- 关闭按钮 -->
          <button @click="closeGame"
            class="catBtn close-btn absolute top-2 right-2 flex items-center justify-center bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full shadow-lg hover:from-green-500 hover:to-green-700 transition-all duration-200"
            style="width: 48px; height: 48px; font-size: 2rem">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="14" cy="14" r="13" fill="url(#paint0_linear)" />
              <path d="M9 9L19 19" stroke="white" stroke-width="2.5" stroke-linecap="round" />
              <path d="M19 9L9 19" stroke="white" stroke-width="2.5" stroke-linecap="round" />
              <defs>
                <linearGradient id="paint0_linear" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#34d399" />
                  <stop offset="1" stop-color="#059669" />
                </linearGradient>
              </defs>
            </svg>
          </button>
        </div>
      </div>
    </transition>
    <!-- 恭喜喝彩弹窗 -->
    <transition name="fade">
      <div v-if="celebratory" class="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none">
        <div class="relative z-10 flex flex-col items-center">
          <img src="/img/games/File/完成喝彩.png" class="w-35 lg:w-40 h-auto object-contain" />
          <div class="celebrate-text text-2xl lg:text-5xl font-extrabold text-green-700 mb-4 animate-pop">🎉
            恭喜找到了所有的瑶瑶！🎉</div>
          <div class="celebrate-fireworks">
            <span class="firework"></span>
            <span class="firework"></span>
            <span class="firework"></span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
const showGame = useState("showGame", () => false);
const steps = ref(0);
// 翻翻乐图片
const imageList = ref<string[]>(["/img/games/File/1.jpg", "/img/games/File/2.jpg", "/img/games/File/3.jpg", "/img/games/File/4.jpg", "/img/games/File/5.jpg", "/img/games/File/6.jpg", "/img/games/File/7.jpg", "/img/games/File/8.png"]);

interface Card {
  id: number;
  img: string;
  flipped: boolean;
  matched: boolean;
}

const cards = ref<Card[]>([]);
const flippedIdxs = ref<number[]>([]);
const celebratory = ref(false);

function shuffle<T>(arr: T[]): T[] {
  return arr.slice().sort(() => Math.random() - 0.5);
}

function initCards() {
  steps.value = 0;
  flippedIdxs.value = [];
  celebratory.value = false;
  // 直接使用开发者指定的图片
  const imgs = imageList.value;
  // 生成16张卡片
  const arr: Card[] = [];
  for (let i = 0; i < 8; i++) {
    arr.push({ id: i * 2, img: imgs[i], flipped: false, matched: false });
    arr.push({ id: i * 2 + 1, img: imgs[i], flipped: false, matched: false });
  }
  cards.value = shuffle(arr);
}

function flipCard(idx: number) {
  if (cards.value[idx].flipped || cards.value[idx].matched || flippedIdxs.value.length === 2) return;
  cards.value[idx].flipped = true;
  flippedIdxs.value.push(idx);
  if (flippedIdxs.value.length === 2) {
    steps.value++;
    const [i1, i2] = flippedIdxs.value;
    if (cards.value[i1].img === cards.value[i2].img) {
      setTimeout(() => {
        cards.value[i1].matched = true;
        cards.value[i2].matched = true;
        flippedIdxs.value = [];
        // 检查是否全部配对成功
        if (cards.value.every((card) => card.matched)) {
          celebratory.value = true;
          setTimeout(() => {
            celebratory.value = false;
          }, 2200);
        }
      }, 500);
    } else {
      setTimeout(() => {
        cards.value[i1].flipped = false;
        cards.value[i2].flipped = false;
        flippedIdxs.value = [];
      }, 800);
    }
  }
}

function resetGame() {
  initCards();
}

function closeGame() {
  showGame.value = false;
  setTimeout(() => {
    resetGame();
  }, 300);
}

watch(showGame, (v) => {
  if (v) initCards();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.perspective {
  perspective: 600px;
}

.transform-style-preserve-3d {
  transform-style: preserve-3d;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}

.backface-hidden {
  backface-visibility: hidden;
}

.close-btn {
  width: 48px;
  height: 48px;
  font-size: 2rem;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #34d399 0%, #059669 100%);
  box-shadow: 0 2px 8px rgba(52, 211, 153, 0.2);
  transition: background 0.2s, box-shadow 0.2s;
}

.close-btn:hover {
  background: linear-gradient(135deg, #059669 0%, #34d399 100%);
  box-shadow: 0 4px 16px rgba(5, 150, 105, 0.25);
}

.celebrate-text {
  text-shadow: 0 2px 8px #bbf7d0, 0 0 16px #34d399;
  letter-spacing: 2px;
}

.celebrate-fireworks {
  position: relative;
  width: 120px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.firework {
  width: 12px;
  height: 40px;
  background: linear-gradient(180deg, #34d399 0%, #059669 100%);
  border-radius: 6px 6px 0 0;
  animation: firework-pop 1.2s ease-in-out infinite alternate;
  margin: 0 8px;
  opacity: 0.8;
}

.firework:nth-child(2) {
  animation-delay: 0.3s;
  background: linear-gradient(180deg, #facc15 0%, #f59e42 100%);
}

.firework:nth-child(3) {
  animation-delay: 0.6s;
  background: linear-gradient(180deg, #38bdf8 0%, #6366f1 100%);
}

@keyframes firework-pop {
  0% {
    transform: scaleY(0.4) translateY(20px);
    opacity: 0.5;
  }

  60% {
    transform: scaleY(1.2) translateY(-10px);
    opacity: 1;
  }

  100% {
    transform: scaleY(0.7) translateY(0);
    opacity: 0.7;
  }
}

.animate-pop {
  animation: pop-scale 0.8s cubic-bezier(0.4, 1.4, 0.6, 1) both;
}

@keyframes pop-scale {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }

  60% {
    transform: scale(1.2);
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
