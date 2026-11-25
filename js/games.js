let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

function startGame() {
  document.getElementById("startScreen").classList.add("d-none");
  initLevel();
  init();
}

function toggleFullscreen() {
  let container = document.getElementById("gameContainer");
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    container.requestFullscreen();
  }
}

const KEYS = {
  39: "RIGHT",
  37: "LEFT",
  32: "SPACE",
  38: "UP",
  40: "DOWN",
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

const TOUCH_BUTTONS = {
  btnLeft: "LEFT",
  btnRight: "RIGHT",
  btnJump: "UP",
  btnThrow: "D",
};

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

window.addEventListener("DOMContentLoaded", bindTouchButtons);
