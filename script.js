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

/** Name of a sound → [file, volume from 0 to 1]. */
const SOUND_FILES = {
  jump: ["audio/dragon-studio-cartoon-jump-463196.mp3", 0.4],
  coin: ["audio/yodguard-coin-collect-3-540190.mp3", 0.4],
  pickup: ["audio/freesound_community-item-pickup-37089.mp3", 0.5],
  throw: ["audio/denielcz-bamboo-whoosh-429156.mp3", 0.5],
  bottleBreak: ["audio/dragon-studio-glass-breaking-511313.mp3", 0.4],
  chickenDead: ["audio/freesound_community-chicken-single-alarm-call-6056.mp3", 0.5],
  endbossHit: ["audio/soundzee-angry-chicken-cluck-fx-356746.mp3", 0.6],
  hurt: ["audio/cookiecheese-hurt-sound-531758.mp3", 0.5],
  snoring: ["audio/snoring-331163.mp3", 0.4],
  win: ["audio/eaglaxle-gaming-victory-464016.mp3", 0.5],
  lose: ["audio/mori_sound-fx-loose-cartoon-521523.mp3", 0.5],
};

/** Long sound files are stopped after this time (in milliseconds). */
const SOUND_MAX_DURATION = {
  endbossHit: 1500,
  bottleBreak: 1200,
};

let sounds = createSounds();

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
  stopAllSounds();
}

/**
 * Creates an Audio object with the right volume for every entry in SOUND_FILES.
 * @returns {Object<string, HTMLAudioElement>} Name of the sound → Audio object.
 */
function createSounds() {
  let result = {};
  Object.entries(SOUND_FILES).forEach(([name, [file, volume]]) => {
    result[name] = new Audio(file);
    result[name].volume = volume;
  });
  return result;
}

/**
 * Plays a short sound from the beginning, unless the sound is muted.
 * Long files are stopped after the time in SOUND_MAX_DURATION.
 * @param {string} name - Name of the sound, e.g. "jump".
 */
function playSound(name) {
  if (isMuted) return;
  let sound = sounds[name];
  sound.currentTime = 0;
  sound.play().catch(() => {});
  clearTimeout(sound.stopTimer);
  if (SOUND_MAX_DURATION[name]) {
    sound.stopTimer = setTimeout(() => sound.pause(), SOUND_MAX_DURATION[name]);
  }
}

/**
 * Plays a sound again and again (e.g. snoring), unless the sound is muted.
 * @param {string} name - Name of the sound.
 */
function startLoopSound(name) {
  let sound = sounds[name];
  sound.loop = true;
  if (!isMuted && sound.paused) {
    sound.play().catch(() => {});
  }
}

/**
 * Stops a sound that is played again and again.
 * @param {string} name - Name of the sound.
 */
function stopLoopSound(name) {
  sounds[name].pause();
}

/**
 * Stops all sound effects.
 */
function stopAllSounds() {
  Object.values(sounds).forEach((sound) => sound.pause());
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
  if (isMuted) {
    stopAllSounds();
  } else if (world) {
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
