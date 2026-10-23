/**
 * ARCHIVO PRINCIPAL - ANIVERSARIO DAVID & SOFÍA
 * Contador de tiempo, animaciones de corazones, música y galería.
 */

document.addEventListener("DOMContentLoaded", () => {
  initLiveCounter();
  initHeartCanvas();
  initMusicPlayer();
  renderTimeline();
  renderPolaroids();
  initLetterEnvelope();
});

/* ========================================================
   1. CONTADOR DE TIEMPO JUNTOS EN VIVO
   ======================================================== */
function initLiveCounter() {
  const yearsEl = document.getElementById("countYears");
  const monthsEl = document.getElementById("countMonths");
  const daysEl = document.getElementById("countDays");
  const hoursEl = document.getElementById("countHours");
  const minutesEl = document.getElementById("countMinutes");
  const secondsEl = document.getElementById("countSeconds");
  const totalDaysEl = document.getElementById("totalDaysCount");

  function update() {
    const now = new Date();
    const start = CONFIG.startDate;
    
    // Diferencia total en milisegundos
    let diffMs = now - start;
    if (diffMs < 0) diffMs = 0;

    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    // Cálculo detallado en años, meses, días
    let y = now.getFullYear() - start.getFullYear();
    let m = now.getMonth() - start.getMonth();
    let d = now.getDate() - start.getDate();
    
    if (d < 0) {
      m -= 1;
      const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      d += prevMonthLastDay;
    }
    if (m < 0) {
      y -= 1;
      m += 12;
    }

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    if (yearsEl) yearsEl.textContent = y;
    if (monthsEl) monthsEl.textContent = m;
    if (daysEl) daysEl.textContent = d;
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
    if (totalDaysEl) totalDaysEl.textContent = totalDays.toLocaleString();
  }

  update();
  setInterval(update, 1000);
}

/* ========================================================
   2. REPRODUCTOR DE MÚSICA ("Emborracharme" - Lori Meyers)
   ======================================================== */
let isPlaying = false;
let updatePlayerUI = null;

function initMusicPlayer() {
  const localAudio = document.getElementById("bgAudio");
  const playBtn = document.getElementById("musicToggleBtn");
  const playerPill = document.getElementById("musicPlayerPill");
  const musicTitle = document.getElementById("musicTitle");
  const musicInfoBtn = document.getElementById("musicInfoBtn");
  const musicIconBtn = document.getElementById("musicIconBtn");

  if (musicTitle) {
    musicTitle.textContent = `${CONFIG.song.title} - ${CONFIG.song.artist}`;
  }

  // Función para actualizar la interfaz gráfica
  updatePlayerUI = function(playing) {
    if (playing) {
      playerPill.classList.add("music-playing");
      playBtn.innerHTML = '<i class="fas fa-pause text-rose-500"></i>';
    } else {
      playerPill.classList.remove("music-playing");
      playBtn.innerHTML = '<i class="fas fa-play text-rose-500"></i>';
    }
  };

  // Sincronizar eventos nativos del elemento de audio
  if (localAudio) {
    localAudio.addEventListener("play", () => {
      isPlaying = true;
      updatePlayerUI(true);
    });
    localAudio.addEventListener("pause", () => {
      isPlaying = false;
      updatePlayerUI(false);
    });
    localAudio.addEventListener("ended", () => {
      isPlaying = false;
      updatePlayerUI(false);
    });
  }

  function togglePlay() {
    if (localAudio) {
      if (localAudio.paused) {
        localAudio.play().then(() => {
          isPlaying = true;
          updatePlayerUI(true);
        }).catch(err => {
          console.warn("No se pudo reproducir audio:", err);
        });
      } else {
        localAudio.pause();
        isPlaying = false;
        updatePlayerUI(false);
      }
    }
  }

  if (playBtn) playBtn.addEventListener("click", togglePlay);
  if (musicInfoBtn) musicInfoBtn.addEventListener("click", togglePlay);
  if (musicIconBtn) musicIconBtn.addEventListener("click", togglePlay);
}

/* ========================================================
   3. CORAZONES Y DESTELLOS FLOTANTES EN CANVAS
   ======================================================== */
function initHeartCanvas() {
  const canvas = document.getElementById("heartCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const hearts = [];
  const totalHearts = 26;

  function createHeart() {
    return {
      x: Math.random() * width,
      y: height + Math.random() * 50,
      size: Math.random() * 14 + 10,
      speedY: Math.random() * 1.2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.7,
      opacity: Math.random() * 0.5 + 0.2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      color: Math.random() > 0.4 ? "#f43f5e" : (Math.random() > 0.5 ? "#fb7185" : "#fda4af")
    };
  }

  for (let i = 0; i < totalHearts; i++) {
    const h = createHeart();
    h.y = Math.random() * height; // Distribución inicial
    hearts.push(h);
  }

  function drawHeartShape(ctx, x, y, size, color, opacity, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(0, topCurveHeight);
    // Lado izquierdo del corazón
    ctx.bezierCurveTo(
      -size / 2, -size / 2,
      -size, size / 3,
      0, size
    );
    // Lado derecho del corazón
    ctx.bezierCurveTo(
      size, size / 3,
      size / 2, -size / 2,
      0, topCurveHeight
    );
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    hearts.forEach((h, index) => {
      h.y -= h.speedY;
      h.x += h.speedX;
      h.rotation += h.rotationSpeed;

      if (h.y < -30) {
        hearts[index] = createHeart();
      }

      drawHeartShape(ctx, h.x, h.y, h.size, h.color, h.opacity, h.rotation);
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ========================================================
   4. RENDERIZADO DE LA LÍNEA DE TIEMPO
   ======================================================== */
function renderTimeline() {
  const container = document.getElementById("timelineContainer");
  if (!container) return;

  container.innerHTML = CONFIG.timeline.map((item, index) => {
    const isEven = index % 2 === 0;
    return `
      <div class="relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''} mb-14">
        <!-- Punto central -->
        <div class="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-rose-500 border-4 border-white shadow-lg flex items-center justify-center text-white text-xs z-10">
          <i class="fas fa-heart"></i>
        </div>

        <!-- Contenido -->
        <div class="w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pl-10 text-left' : 'md:pr-10 md:text-right'}">
          <div class="glass-card glass-card-hover p-6 rounded-2xl border border-rose-100 relative group overflow-hidden">
            <span class="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-rose-100 text-rose-600 mb-2">
              ${item.tag} • ${item.date}
            </span>
            <h3 class="text-xl font-bold text-gray-800 mb-2 font-serif-elegant">${item.title}</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-4">${item.description}</p>
            <!-- Marco adaptado para fotos verticales sin cortar caras -->
            <div class="overflow-hidden rounded-2xl shadow-md border border-rose-100/70 h-80 sm:h-96 w-full bg-rose-50/50 relative group/img cursor-pointer" onclick="openLightbox('${item.image}', '${item.title}', '${item.tag} • ${item.date}')">
              <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" style="object-position: ${item.position || 'center'};" onerror="this.src='assets/images/foto1.jpg'">
              <!-- Botón sutil para ver foto completa -->
              <div class="absolute bottom-3 right-3 bg-black/55 hover:bg-black/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-md opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1.5 shadow-md">
                <i class="fas fa-search-plus"></i>
                <span>Ver completa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

/* ========================================================
   5. RENDERIZADO DE GALERÍA POLAROID
   ======================================================== */
function renderPolaroids() {
  const container = document.getElementById("polaroidGallery");
  if (!container) return;

  const rotations = [-2.5, 3, -1.5, 2, -3, 1.5, -2, 2.5];

  container.innerHTML = CONFIG.polaroids.map((p, idx) => {
    const rot = rotations[idx % rotations.length];
    return `
      <div class="polaroid-container w-72 max-w-full" style="transform: rotate(${rot}deg);">
        <div class="washi-tape"></div>
        <div class="polaroid-card" onclick="this.classList.toggle('flipped')">
          <!-- Frente -->
          <div class="polaroid-front">
            <div class="w-full flex-1 min-h-0 rounded overflow-hidden bg-rose-50 relative group/pfront">
              <img src="${p.image}" alt="${p.caption}" class="w-full h-full object-cover" style="object-position: ${p.position || 'center 30%'};" onerror="this.src='assets/images/foto1.jpg'">
              <!-- Botón lupa para ver foto completa -->
              <button onclick="event.stopPropagation(); openLightbox('${p.image}', '${p.caption}', 'David & Sofía ❤️')" class="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center text-xs backdrop-blur-sm transition-transform hover:scale-110 shadow-sm" title="Ver foto completa">
                <i class="fas fa-expand"></i>
              </button>
            </div>
            <p class="mt-2.5 text-center font-romantic text-2xl text-gray-700 tracking-wide">${p.caption}</p>
            <span class="text-[10px] text-gray-400 text-center block mt-0.5"><i class="fas fa-sync-alt mr-1"></i> Toca para leer el reverso</span>
          </div>
          <!-- Reverso -->
          <div class="polaroid-back">
            <i class="fas fa-quote-left text-rose-300 text-2xl mb-2"></i>
            <p class="font-romantic text-2xl text-rose-600 leading-snug px-2">"${p.secretNote}"</p>
            <span class="mt-4 text-xs font-semibold text-rose-400">David & Sofía ❤️</span>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

/* ========================================================
   6. SOBRE LACRADO Y CARTA DE AMOR
   ======================================================== */

// Generador de Tono Musical Suave y Cálido (Web Audio API) para acompañar la carta
class LetterAmbience {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.filter = null;
    this.isPlaying = false;
    this.intervalId = null;
    this.chordIndex = 0;

    // Progresión romántica y emotiva en Hz: Cmaj9 -> Am9 -> Fmaj7 -> G6add9
    this.chords = [
      [130.81, 196.00, 246.94, 293.66, 329.63], // C3, G3, B3, D4, E4
      [110.00, 164.81, 196.00, 246.94, 261.63], // A2, E3, G3, B3, C4
      [87.31, 130.81, 174.61, 220.00, 261.63, 329.63], // F2, C3, F3, A3, C4, E4
      [98.00, 146.83, 196.00, 246.94, 293.66, 329.63]  // G2, D3, G3, B3, D4, E4
    ];
    // Toques melódicos suaves tipo caja de música
    this.melodies = [
      [329.63, 392.00, 493.88], // E4, G4, B4
      [261.63, 329.63, 392.00], // C4, E4, G4
      [349.23, 440.00, 523.25], // F4, A4, C5
      [293.66, 392.00, 493.88]  // D4, G4, B4
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      // Master Gain para mantener el volumen suave y no tapar la voz (~7-8%)
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

      // Filtro paso bajo suave (750 Hz) para dar calidez aterciopelada
      // y no interferir con las frecuencias vocales de David
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = "lowpass";
      this.filter.frequency.setValueAtTime(750, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(1.1, this.ctx.currentTime);

      this.filter.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playNote(freq, startTime, duration, velocity = 0.05, isBell = false) {
    if (!this.ctx) return;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc1.type = isBell ? "sine" : "triangle";
    osc1.frequency.setValueAtTime(freq, startTime);

    // Segundo oscilador con leve coro cálido
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(freq * 1.002, startTime);

    const attack = isBell ? 0.03 : 0.6;
    const decay = duration * 0.9;

    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.linearRampToValueAtTime(velocity, startTime + attack);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + attack + decay);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(this.filter);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + attack + decay + 0.1);
    osc2.stop(startTime + attack + decay + 0.1);
  }

  playChordStep() {
    if (!this.isPlaying || !this.ctx) return;
    const chord = this.chords[this.chordIndex];
    const melody = this.melodies[this.chordIndex];
    const now = this.ctx.currentTime;
    const chordDuration = 3.9;

    // Arpegio armónico suave
    chord.forEach((freq, idx) => {
      const delay = idx * 0.16;
      this.playNote(freq, now + delay, chordDuration - delay, 0.035);
    });

    // Pequeño arpegio agudo suave como caja de música
    if (melody && melody.length) {
      melody.forEach((freq, idx) => {
        const delay = 1.5 + idx * 0.6;
        this.playNote(freq, now + delay, 1.8, 0.025, true);
      });
    }

    this.chordIndex = (this.chordIndex + 1) % this.chords.length;
  }

  start() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Fade-in suave de la melodía (1.5s)
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value || 0.0001, now);
    this.masterGain.gain.linearRampToValueAtTime(0.075, now + 1.5); // Volumen exacto muy sutil

    this.chordIndex = 0;
    this.playChordStep();
    this.intervalId = setInterval(() => {
      this.playChordStep();
    }, 4000);
  }

  stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.8);
    }
  }
}

const letterAmbience = new LetterAmbience();

function initLetterEnvelope() {
  const envelope = document.getElementById("envelope");
  const letterBody = document.getElementById("letterBody");
  const letterSalutation = document.getElementById("letterSalutation");
  const letterClosing = document.getElementById("letterClosing");
  const letterSignature = document.getElementById("letterSignature");
  const openNotice = document.getElementById("envelopeOpenNotice");
  const letterAudio = document.getElementById("letterAudio");
  const bgAudio = document.getElementById("bgAudio");
  const toggleLetterAudioBtn = document.getElementById("toggleLetterAudioBtn");

  if (letterSalutation) letterSalutation.textContent = CONFIG.letter.salutation;
  if (letterBody) letterBody.innerHTML = CONFIG.letter.body.replace(/\n\n/g, "<br><br>");
  if (letterClosing) letterClosing.textContent = CONFIG.letter.closing;
  if (letterSignature) letterSignature.textContent = CONFIG.letter.signature;

  let wasBgPlayingBeforeLetter = false;

  function updateLetterVoiceUI(playing) {
    if (!toggleLetterAudioBtn) return;
    if (playing) {
      toggleLetterAudioBtn.innerHTML = '<i class="fas fa-pause mr-1"></i><span>Pausar voz</span>';
      toggleLetterAudioBtn.className = "text-xs bg-rose-500 hover:bg-rose-600 text-white px-3 py-1 rounded-full font-medium transition-all flex items-center gap-1 shadow-sm";
    } else {
      toggleLetterAudioBtn.innerHTML = '<i class="fas fa-play mr-1"></i><span>Escuchar voz</span>';
      toggleLetterAudioBtn.className = "text-xs bg-rose-100 hover:bg-rose-200 text-rose-700 px-3 py-1 rounded-full font-medium transition-all flex items-center gap-1 shadow-sm";
    }
  }

  if (envelope) {
    envelope.addEventListener("click", (e) => {
      // Si el usuario pulsó en el botón de pausar la voz, evitamos cerrar/abrir el sobre
      if (e.target.closest("#toggleLetterAudioBtn")) {
        return;
      }

      const isOpening = !envelope.classList.contains("open");
      envelope.classList.toggle("open");

      if (isOpening) {
        if (openNotice) openNotice.textContent = "Haz clic de nuevo para cerrar la carta";

        // 1. PARAR TODO EL RESTO DE MÚSICA
        if (bgAudio && !bgAudio.paused) {
          wasBgPlayingBeforeLetter = true;
          bgAudio.pause();
        } else if (isPlaying) {
          wasBgPlayingBeforeLetter = true;
        }
        if (typeof updatePlayerUI === "function") {
          updatePlayerUI(false);
        }

        // 2. REPRODUCIR LA CARTA DICTADA + TONO MUSICAL SUAVE
        if (letterAudio) {
          letterAudio.currentTime = 0;
          letterAudio.play().then(() => {
            updateLetterVoiceUI(true);
            letterAmbience.start();
          }).catch(err => {
            console.warn("Autoplay de voz de la carta:", err);
            updateLetterVoiceUI(false);
          });
        }

        // 3. Disparar confeti romántico
        if (typeof confetti === "function") {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#f43f5e', '#fb7185', '#fda4af', '#fef08a']
          });
        }
      } else {
        if (openNotice) openNotice.textContent = "Toca el sobre o el sello para abrir";

        // Al cerrar el sobre, pausar la voz y el tono musical suave
        if (letterAudio) {
          letterAudio.pause();
          updateLetterVoiceUI(false);
        }
        letterAmbience.stop();

        // Reanudar la música de fondo si estaba sonando previamente
        if (wasBgPlayingBeforeLetter && bgAudio) {
          bgAudio.play().then(() => {
            if (typeof updatePlayerUI === "function") updatePlayerUI(true);
          }).catch(() => {});
          wasBgPlayingBeforeLetter = false;
        }
      }
    });
  }

  // Control manual del botón dentro de la carta
  if (toggleLetterAudioBtn && letterAudio) {
    toggleLetterAudioBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (letterAudio.paused) {
        // Pausar música de fondo si se reanuda la carta
        if (bgAudio && !bgAudio.paused) {
          wasBgPlayingBeforeLetter = true;
          bgAudio.pause();
          if (typeof updatePlayerUI === "function") updatePlayerUI(false);
        }
        letterAudio.play().then(() => {
          updateLetterVoiceUI(true);
          letterAmbience.start();
        });
      } else {
        letterAudio.pause();
        updateLetterVoiceUI(false);
        letterAmbience.stop();
      }
    });

    letterAudio.addEventListener("ended", () => {
      updateLetterVoiceUI(false);
      letterAmbience.stop();
      // Reanudar música de fondo al terminar la carta si estaba activa
      if (wasBgPlayingBeforeLetter && bgAudio) {
        bgAudio.play().then(() => {
          if (typeof updatePlayerUI === "function") updatePlayerUI(true);
        }).catch(() => {});
        wasBgPlayingBeforeLetter = false;
      }
    });
  }
}

/* ========================================================
   7. VISUALIZADOR DE FOTOS A PANTALLA COMPLETA (LIGHTBOX)
   ======================================================== */
window.openLightbox = function(src, title, subtitle) {
  const modal = document.getElementById("photoLightbox");
  const img = document.getElementById("lightboxImg");
  const titleEl = document.getElementById("lightboxTitle");
  const subEl = document.getElementById("lightboxSubtitle");
  if (!modal || !img) return;

  img.src = src;
  if (titleEl) titleEl.textContent = title || "";
  if (subEl) subEl.textContent = subtitle || "";

  modal.classList.remove("hidden");
  setTimeout(() => {
    modal.classList.remove("opacity-0");
  }, 10);
};

window.closeLightbox = function() {
  const modal = document.getElementById("photoLightbox");
  if (!modal) return;
  modal.classList.add("opacity-0");
  setTimeout(() => {
    modal.classList.add("hidden");
  }, 300);
};

// Cerrar con Escape o clic fuera
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("photoLightbox");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) window.closeLightbox();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") window.closeLightbox();
  });
});

