let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
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
  backgroundMusic.currentTime = 0;
  if (!isMuted) {
    backgroundMusic.play();
  }
}

/**
 * Works like setInterval, but remembers the interval, so stopGame() can stop it later.
 * @param {Function} fn - The function that is called again and again.
 * @param {number} time - Time between two calls in milliseconds.
 * @returns {number} The id of the interval.
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
  return id;
}

/**
 * Stops the whole game: all intervals, the drawing loop and all sounds.
 */
function stopGame() {
  intervalIds.forEach((id) => clearInterval(id));
  intervalIds = [];
  if (world) {
    cancelAnimationFrame(world.animationFrame);
    world.character.WALKING_SOUND.pause();
  }
  backgroundMusic.pause();
}

/**
 * Hides the end screen and starts a new game, without reloading the page.
 */
function restartGame() {
  stopGame();
  document.getElementById("endScreen").classList.add("d-none");
  startGame();
}

/**
 * Leaves the game and goes back to the start screen.
 */
function goHome() {
  stopGame();
  document.getElementById("endScreen").classList.add("d-none");
  document.getElementById("startScreen").classList.remove("d-none");
}

/**
 * Turns the fullscreen mode of the game on or off (desktop only, the button is hidden on mobile).
 * Uses the normal and the older "webkit" version, so it also works in older Safari.
 */
function toggleFullscreen() {
  let container = document.getElementById("gameContainer");
  if (document.fullscreenElement || document.webkitFullscreenElement) {
    (document.exitFullscreen || document.webkitExitFullscreen).call(document);
  } else {
    (container.requestFullscreen || container.webkitRequestFullscreen).call(container);
  }
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

/**
 * Opens the dialog with the game instructions.
 */
function openHelp() {
  document.getElementById("helpDialog").showModal();
}

/**
 * Closes the dialog with the game instructions.
 */
function closeHelp() {
  document.getElementById("helpDialog").close();
}

/**
 * Closes the dialog when the user clicks next to it (on the dark background).
 */
function closeHelpOnBackdropClick() {
  let dialog = document.getElementById("helpDialog");
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      closeHelp();
    }
  });
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
    button.addEventListener("contextmenu", (e) => e.preventDefault());
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
  closeHelpOnBackdropClick();
});
