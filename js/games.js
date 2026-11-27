let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = localStorage.getItem("muted") === "true";
let backgroundMusic = new Audio(
  "audio/foggysunrise-desert-music-loop-371877.mp3",
);
backgroundMusic.loop = true;
backgroundMusic.volume = 0.3;
backgroundMusic.muted = isMuted;

/**
 * Creates the game world on the canvas.
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

/**
 * Hides the start screen, creates the level, starts the game and the music.
 */
function startGame() {
  document.getElementById("startScreen").classList.add("d-none");
  initLevel();
  init();
  if (!isMuted) {
    backgroundMusic.play();
  }
}

/**
 * Turns the fullscreen mode of the game on or off.
 * Devices without real fullscreen (e.g. iPhone) get a CSS fullscreen instead.
 */
function toggleFullscreen() {
  let container = document.getElementById("gameContainer");
  if (isRealFullscreen()) {
    (document.exitFullscreen || document.webkitExitFullscreen).call(document);
  } else if (container.classList.contains("pseudo-fullscreen")) {
    container.classList.remove("pseudo-fullscreen");
  } else if (document.fullscreenEnabled || document.webkitFullscreenEnabled) {
    requestRealFullscreen(container);
  } else {
    container.classList.add("pseudo-fullscreen");
  }
}

/**
 * Checks if the browser shows something in real fullscreen at the moment.
 * @returns {boolean} True if real fullscreen is active.
 */
function isRealFullscreen() {
  return !!(document.fullscreenElement || document.webkitFullscreenElement);
}

/**
 * Asks the browser for real fullscreen. If it does not work, the CSS fullscreen is used.
 * Uses the normal and the older "webkit" version, so it also works in Safari on the iPad.
 * @param {HTMLElement} container - The element that should become fullscreen.
 */
function requestRealFullscreen(container) {
  let request =
    container.requestFullscreen || container.webkitRequestFullscreen;
  let result = request.call(container);
  if (result) result.catch(() => {});
  setTimeout(() => {
    if (!isRealFullscreen()) container.classList.add("pseudo-fullscreen");
  }, 300);
}

/**
 * Turns all sounds on or off and changes the icon of the sound button.
 */
function toggleSound() {
  isMuted = !isMuted;
  backgroundMusic.muted = isMuted;
  localStorage.setItem("muted", isMuted);
  if (!isMuted && world) {
    backgroundMusic.play();
  }
  updateSoundButton();
}

/**
 * Shows 🔇 or 🔊 on the sound button, depending on isMuted.
 */
function updateSoundButton() {
  document.getElementById("soundBtn").innerText = isMuted ? "🔇" : "🔊";
}

/** Key code → name of the key in the Keyboard class. */
const KEYS = {
  39: "RIGHT",
  37: "LEFT",
  32: "SPACE",
  38: "UP",
  68: "D",
};

window.addEventListener("keydown", (e) => {
  let name = KEYS[e.keyCode];
  if (name) {
    keyboard[name] = true;
  }
});

window.addEventListener("keyup", (e) => {
  let name = KEYS[e.keyCode];
  if (name) {
    keyboard[name] = false;
  }
});

/** Id of a touch button → name of the key in the Keyboard class. */
const TOUCH_BUTTONS = {
  btnLeft: "LEFT",
  btnRight: "RIGHT",
  btnJump: "UP",
  btnThrow: "D",
};

/**
 * Connects the touch buttons with the keyboard, so the game can be played on a phone.
 */
function bindTouchButtons() {
  Object.entries(TOUCH_BUTTONS).forEach(([id, name]) => {
    let button = document.getElementById(id);
    button.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      keyboard[name] = true;
    });
    ["pointerup", "pointerleave", "pointercancel"].forEach((type) => {
      button.addEventListener(type, () => (keyboard[name] = false));
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  bindTouchButtons();
  updateSoundButton();
});
