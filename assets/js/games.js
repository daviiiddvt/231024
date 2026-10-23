/**
 * JUEGOS INTERACTIVOS - ANIVERSARIO DAVID & SOFÍA
 * 1. Trivia de Pareja
 * 2. Rasca y Gana de Cupones
 * 3. Juego de Memoria (Parejas)
 * 4. Ruleta de Planes
 * 5. Frasco de Razones
 */

document.addEventListener("DOMContentLoaded", () => {
  initGameTabs();
  initTrivia();
  initScratchCards();
  initMemoryGame();
  initRoulette();
  initReasonsJar();
});

/* ========================================================
   CONTROL DE PESTAÑAS DE JUEGOS
   ======================================================== */
function initGameTabs() {
  const tabs = document.querySelectorAll(".game-tab-btn");
  const panels = document.querySelectorAll(".game-panel");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("data-game");

      tabs.forEach(t => {
        t.classList.remove("game-tab-active", "text-white");
        t.classList.add("text-gray-600", "hover:text-rose-600");
      });

      tab.classList.add("game-tab-active");
      tab.classList.remove("text-gray-600", "hover:text-rose-600");

      panels.forEach(panel => {
        if (panel.id === `game-${targetId}`) {
          panel.classList.remove("hidden");
        } else {
          panel.classList.add("hidden");
        }
      });
    });
  });
}

/* ========================================================
   1. TRIVIA: ¿CUÁNTO NOS CONOCEMOS?
   ======================================================== */
function initTrivia() {
  let currentIndex = 0;
  let score = 0;

  const questionEl = document.getElementById("triviaQuestion");
  const optionsEl = document.getElementById("triviaOptions");
  const progressEl = document.getElementById("triviaProgress");
  const currentNumEl = document.getElementById("triviaCurrentNum");
  const totalNumEl = document.getElementById("triviaTotalNum");
  const feedbackEl = document.getElementById("triviaFeedback");
  const quizBox = document.getElementById("triviaQuizBox");
  const resultsBox = document.getElementById("triviaResultsBox");
  const finalScoreEl = document.getElementById("triviaFinalScore");
  const restartBtn = document.getElementById("triviaRestartBtn");

  if (!questionEl) return;

  function loadQuestion() {
    const q = CONFIG.trivia[currentIndex];
    currentNumEl.textContent = currentIndex + 1;
    totalNumEl.textContent = CONFIG.trivia.length;
    progressEl.style.width = `${((currentIndex) / CONFIG.trivia.length) * 100}%`;

    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";
    feedbackEl.classList.add("hidden");

    q.options.forEach((optText, i) => {
      const btn = document.createElement("button");
      btn.className = "w-full text-left p-4 rounded-xl border border-rose-100 bg-white hover:bg-rose-50 transition-all font-medium text-gray-700 hover:border-rose-300 flex items-center justify-between group";
      btn.innerHTML = `
        <span>${optText}</span>
        <span class="w-7 h-7 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center text-xs group-hover:bg-rose-500 group-hover:text-white transition-colors">
          ${String.fromCharCode(65 + i)}
        </span>
      `;

      btn.addEventListener("click", () => handleAnswer(i, q, btn));
      optionsEl.appendChild(btn);
    });
  }

  function handleAnswer(selectedIndex, q, clickedBtn) {
    // Desactivar todos los botones
    const allBtns = optionsEl.querySelectorAll("button");
    allBtns.forEach(b => b.disabled = true);

    const isCorrect = selectedIndex === q.correct;
    if (isCorrect) {
      score++;
      clickedBtn.classList.remove("bg-white", "hover:bg-rose-50");
      clickedBtn.classList.add("bg-emerald-50", "border-emerald-400", "text-emerald-800");
      feedbackEl.innerHTML = `
        <div class="p-3 bg-emerald-100 text-emerald-800 rounded-xl text-sm font-medium flex items-center gap-2">
          <i class="fas fa-check-circle text-lg"></i>
          <span>${q.loveMessage}</span>
        </div>
      `;
    } else {
      clickedBtn.classList.add("bg-rose-50", "border-rose-400", "text-rose-800");
      // Mostrar la correcta
      if (allBtns[q.correct]) {
        allBtns[q.correct].classList.add("bg-emerald-50", "border-emerald-300");
      }
      feedbackEl.innerHTML = `
        <div class="p-3 bg-rose-100 text-rose-800 rounded-xl text-sm font-medium flex items-center gap-2">
          <i class="fas fa-heart-broken text-lg"></i>
          <span>¡Casi! Pero no pasa nada, ${q.loveMessage}</span>
        </div>
      `;
    }

    feedbackEl.classList.remove("hidden");

    // Avanzar a la siguiente pregunta tras 2 segundos
    setTimeout(() => {
      currentIndex++;
      if (currentIndex < CONFIG.trivia.length) {
        loadQuestion();
      } else {
        showResults();
      }
    }, 2200);
  }

  function showResults() {
    quizBox.classList.add("hidden");
    resultsBox.classList.remove("hidden");
    progressEl.style.width = "100%";
    finalScoreEl.textContent = `${score} de ${CONFIG.trivia.length}`;

    if (typeof confetti === "function") {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#ec4899', '#fda4af', '#fcd34d']
      });
    }
  }

  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      currentIndex = 0;
      score = 0;
      resultsBox.classList.add("hidden");
      quizBox.classList.remove("hidden");
      loadQuestion();
    });
  }

  loadQuestion();
}

/* ========================================================
   2. RASCA Y GANA DE CUPONES DEL AMOR
   ======================================================== */
function initScratchCards() {
  const container = document.getElementById("scratchCardsContainer");
  if (!container) return;

  container.innerHTML = CONFIG.scratchCoupons.map((c, i) => `
    <div class="glass-card p-4 rounded-2xl flex flex-col items-center">
      <div class="scratch-card" id="scratchCard-${i}">
        <!-- Premio Oculto -->
        <div class="scratch-card-prize bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200">
          <div class="w-14 h-14 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center text-2xl mb-3 shadow-inner">
            <i class="fas ${c.icon}"></i>
          </div>
          <h4 class="font-bold text-gray-800 text-base md:text-lg mb-1">${c.title}</h4>
          <p class="text-xs md:text-sm text-gray-600 px-4">${c.description}</p>
          <div class="mt-3 px-3 py-1 rounded-full bg-rose-500 text-white text-[11px] font-semibold tracking-wider">
            CÓDIGO: ${c.code}
          </div>
        </div>
        <!-- Capa para rascar -->
        <canvas class="scratch-card-canvas" id="canvasScratch-${i}"></canvas>
      </div>
      <p class="text-xs text-rose-500 font-medium mt-3 flex items-center gap-1">
        <i class="fas fa-hand-pointer animate-bounce"></i> Rasca con el ratón o tu dedo
      </p>
    </div>
  `).join("");

  CONFIG.scratchCoupons.forEach((_, i) => {
    setupCanvas(i);
  });

  function setupCanvas(index) {
    const canvas = document.getElementById(`canvasScratch-${index}`);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;

    const width = parent.offsetWidth || 340;
    const height = parent.offsetHeight || 220;

    canvas.width = width;
    canvas.height = height;

    // Dibujar capa plateada con brillo
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#d1d5db");
    grad.addColorStop(0.3, "#f3f4f6");
    grad.addColorStop(0.6, "#e5e7eb");
    grad.addColorStop(1, "#9ca3af");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decoración de la capa
    ctx.fillStyle = "#6b7280";
    ctx.font = "bold 15px 'Outfit', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✨ RASCA AQUÍ CON AMOR ✨", width / 2, height / 2 - 10);
    ctx.font = "12px 'Outfit', sans-serif";
    ctx.fillText("Descubre tu sorpresa especial", width / 2, height / 2 + 15);

    let isDrawing = false;
    let scratchedPixels = 0;
    let isRevealed = false;

    function getCoords(e) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }

    function scratch(e) {
      if (!isDrawing || isRevealed) return;
      e.preventDefault();
      const pos = getCoords(e);

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 22, 0, Math.PI * 2);
      ctx.fill();

      scratchedPixels++;
      // Si ya raspó suficiente, despejarlo por completo
      if (scratchedPixels > 45 && !isRevealed) {
        isRevealed = true;
        canvas.style.opacity = "0";
        setTimeout(() => {
          canvas.style.display = "none";
          if (typeof confetti === "function") {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.7 }
            });
          }
        }, 500);
      }
    }

    canvas.addEventListener("mousedown", (e) => { isDrawing = true; scratch(e); });
    canvas.addEventListener("mousemove", scratch);
    window.addEventListener("mouseup", () => { isDrawing = false; });

    canvas.addEventListener("touchstart", (e) => { isDrawing = true; scratch(e); }, { passive: false });
    canvas.addEventListener("touchmove", scratch, { passive: false });
    window.addEventListener("touchend", () => { isDrawing = false; });
  }
}

/* ========================================================
   3. JUEGO DE MEMORIA (PAREJAS)
   ======================================================== */
function initMemoryGame() {
  const grid = document.getElementById("memoryGrid");
  const movesEl = document.getElementById("memoryMoves");
  const restartBtn = document.getElementById("memoryRestartBtn");
  const winBanner = document.getElementById("memoryWinBanner");
  if (!grid) return;

  const cardItems = [
    { icon: "fa-heart", label: "Amor", color: "text-rose-500" },
    { icon: "fa-music", label: "Lori Meyers", color: "text-purple-500" },
    { icon: "fa-plane", label: "Viajes", color: "text-sky-500" },
    { icon: "fa-calendar-alt", label: "23 Octubre", color: "text-amber-500" },
    { icon: "fa-glass-cheers", label: "Brindis", color: "text-pink-500" },
    { icon: "fa-camera-retro", label: "Recuerdos", color: "text-emerald-500" }
  ];

  let deck = [];
  let flippedCards = [];
  let matchedPairs = 0;
  let moves = 0;
  let isLocked = false;

  function setup() {
    deck = [...cardItems, ...cardItems]; // Duplicar para tener parejas
    deck.sort(() => Math.random() - 0.5); // Barajar

    grid.innerHTML = "";
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    isLocked = false;
    movesEl.textContent = "0";
    winBanner.classList.add("hidden");

    deck.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "memory-card";
      card.dataset.index = index;
      card.dataset.name = item.label;

      card.innerHTML = `
        <div class="memory-card-inner">
          <div class="memory-front">
            <i class="fas fa-heart text-white opacity-80 text-xl md:text-2xl"></i>
          </div>
          <div class="memory-back flex flex-col items-center justify-center p-2 bg-white">
            <i class="fas ${item.icon} ${item.color} text-2xl md:text-3xl mb-1"></i>
            <span class="text-[11px] font-semibold text-gray-700 text-center leading-tight">${item.label}</span>
          </div>
        </div>
      `;

      card.addEventListener("click", () => flipCard(card));
      grid.appendChild(card);
    });
  }

  function flipCard(card) {
    if (isLocked) return;
    if (card.classList.contains("flipped") || card.classList.contains("matched")) return;

    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      moves++;
      movesEl.textContent = moves;
      checkForMatch();
    }
  }

  function checkForMatch() {
    isLocked = true;
    const [card1, card2] = flippedCards;

    if (card1.dataset.name === card2.dataset.name) {
      card1.classList.add("matched");
      card2.classList.add("matched");
      matchedPairs++;
      flippedCards = [];
      isLocked = false;

      if (matchedPairs === cardItems.length) {
        setTimeout(() => {
          winBanner.classList.remove("hidden");
          if (typeof confetti === "function") {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
          }
        }, 400);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        flippedCards = [];
        isLocked = false;
      }, 900);
    }
  }

  if (restartBtn) restartBtn.addEventListener("click", setup);

  setup();
}

/* ========================================================
   4. RULETA DE PLANES Y CITAS
   ======================================================== */
function initRoulette() {
  const canvas = document.getElementById("rouletteCanvas");
  const spinBtn = document.getElementById("spinRouletteBtn");
  const resultText = document.getElementById("rouletteResultText");
  if (!canvas || !spinBtn) return;

  const ctx = canvas.getContext("2d");
  const options = CONFIG.rouletteOptions;
  const numOptions = options.length;
  const arcSize = (2 * Math.PI) / numOptions;

  const colors = [
    "#f43f5e", "#fb7185", "#ec4899", "#f472b6",
    "#fb923c", "#f59e0b", "#a855f7", "#e11d48"
  ];

  let currentRotation = 0;
  let isSpinning = false;

  function drawWheel() {
    const width = canvas.width;
    const height = canvas.height;
    const radius = width / 2;

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < numOptions; i++) {
      const angle = i * arcSize;
      ctx.beginPath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.moveTo(radius, radius);
      ctx.arc(radius, radius, radius - 8, angle, angle + arcSize);
      ctx.lineTo(radius, radius);
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Texto de cada sección
      ctx.save();
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 13px 'Outfit', sans-serif";
      ctx.translate(radius, radius);
      ctx.rotate(angle + arcSize / 2);
      ctx.textAlign = "right";
      ctx.fillText(options[i], radius - 24, 5);
      ctx.restore();
    }

    // Centro decorativo
    ctx.beginPath();
    ctx.arc(radius, radius, 30, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(0,0,0,0.15)";
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.fillStyle = "#f43f5e";
    ctx.font = "18px 'Outfit', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("❤️", radius, radius);
  }

  drawWheel();

  spinBtn.addEventListener("click", () => {
    if (isSpinning) return;
    isSpinning = true;
    spinBtn.disabled = true;
    resultText.innerHTML = '<span class="text-rose-500 animate-pulse">¡Girando el destino del amor...!</span>';

    // Rotación aleatoria (al menos 5 vueltas completas)
    const randomExtra = Math.floor(Math.random() * 360) + 1800; // 5 vueltas + extra
    const finalRotation = currentRotation + randomExtra;

    canvas.style.transition = "transform 4.5s cubic-bezier(0.15, 0.9, 0.2, 1)";
    canvas.style.transform = `rotate(${finalRotation}deg)`;

    setTimeout(() => {
      isSpinning = false;
      spinBtn.disabled = false;
      currentRotation = finalRotation % 360;

      // Calcular qué segmento quedó apuntando arriba (270 grados en canvas)
      const degreesPerSlice = 360 / numOptions;
      const normalizedDegree = (360 - (currentRotation % 360) + 270) % 360;
      const selectedIndex = Math.floor(normalizedDegree / degreesPerSlice) % numOptions;
      const chosenPlan = options[selectedIndex];

      resultText.innerHTML = `
        <div class="inline-block p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl animate-bounce">
          <span class="text-xs uppercase tracking-wider text-rose-500 font-bold block mb-1">¡Plan Decidido!</span>
          <span class="text-lg md:text-xl font-bold text-gray-800">✨ ${chosenPlan} ✨</span>
        </div>
      `;

      if (typeof confetti === "function") {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 4600);
  });
}

/* ========================================================
   5. FRASCO DE RAZONES PARA AMARTE
   ======================================================== */
function initReasonsJar() {
  const button = document.getElementById("getReasonBtn");
  const displayBox = document.getElementById("reasonDisplayBox");
  const reasonText = document.getElementById("reasonText");
  const reasonNumber = document.getElementById("reasonNumber");
  if (!button || !displayBox) return;

  let lastIndex = -1;

  button.addEventListener("click", () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * CONFIG.reasons.length);
    } while (randomIndex === lastIndex && CONFIG.reasons.length > 1);

    lastIndex = randomIndex;
    const phrase = CONFIG.reasons[randomIndex];

    displayBox.classList.remove("hidden");
    displayBox.classList.add("animate-heartbeat");
    setTimeout(() => displayBox.classList.remove("animate-heartbeat"), 800);

    reasonNumber.textContent = `Razón #${randomIndex + 1}`;
    reasonText.textContent = `"${phrase}"`;

    if (typeof confetti === "function") {
      confetti({
        particleCount: 30,
        spread: 40,
        origin: { y: 0.8 }
      });
    }
  });
}

