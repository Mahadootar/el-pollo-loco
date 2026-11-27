# El Pollo Loco

A 2D jump-and-run game built with **HTML5 Canvas, CSS and JavaScript** (object-oriented, with classes).

Help Pepe cross the Mexican desert: collect coins and salsa bottles, fight the chickens and defeat the giant endboss chicken.

## How to play

| Goal | How |
|---|---|
| **Win** | Defeat the endboss by hitting him 5 times with salsa bottles. |
| **Lose** | Pepe loses all his energy. A chicken costs 5 energy, the endboss 20. |
| **Kill a chicken** | Jump on it, or hit it with a bottle. |
| **Collect** | Walk through coins and bottles on the ground. You can only throw bottles you have collected. |

The endboss waits at the end of the level. When Pepe comes close, he starts walking towards Pepe and attacks him.

## Controls

### Keyboard

| Key | Action |
|---|---|
| ← → | Walk left / right |
| ↑ or Space | Jump |
| D | Throw a bottle (in the direction Pepe is looking) |

### Mobile

On touch devices, buttons appear in the game: ◀ ▶ to walk, ▲ to jump and the bottle to throw.

### Buttons below the game

- 🔊 / 🔇 – turn the sound on or off
- **Vollbild** – fullscreen mode (leave with `Esc`)

## Status bars

- **Top left:** Pepe's energy, collected coins and collected bottles
- **Top right:** energy of the endboss

## How to start

The game runs in the browser, no installation is needed.

1. Download or clone the repository.
2. Open the folder with a local web server, for example **Live Server** in Visual Studio Code.
3. Open `index.html` and click **Play The Game**.

> Opening `index.html` directly from the file system can block images and sounds in some browsers. A local server avoids that.

## Project structure

```
el-pollo-loco/
├── index.html            # page with canvas, start/end screen and controls
├── style.css             # layout, buttons, fullscreen and mobile styles
├── script.js             # start, keyboard, touch buttons, sound, fullscreen
├── levels/level1.js      # enemies, coins and bottles of level 1
├── classes/              # one class per file
│   ├── drawable-object.class.js   # everything that can be drawn
│   ├── moveable.class.js          # movement, gravity, damage, collision
│   ├── character.class.js         # Pepe
│   ├── chicken.class.js
│   ├── end_boss.class.js
│   ├── throwableObjects.class.js  # thrown bottle
│   ├── bottles.class.js           # bottle on the ground
│   ├── coins.class.js
│   ├── status-bar.class.js        # base class of all status bars
│   ├── world.class.js             # draws the game, checks collisions, ends the game
│   └── ...
├── img/                  # images
├── audio/                # music and sounds
└── fonts/                # zabars font
```

## Technologies

- HTML5 Canvas for drawing the game
- JavaScript classes and inheritance (`DrawableObject` → `MoveableObject` → `Character`, `Chicken`, `Endboss`, …)
- CSS with media queries for phones (portrait and landscape) and the Fullscreen API
- Pointer events for the touch controls

## Credits

- Images: provided by the Developer Akademie for the El Pollo Loco project
- Music: "Foggy Sunrise" desert music loop (`audio/foggysunrise-desert-music-loop-371877.mp3`)
- Footstep sound: `audio/yarzur_ofc-st3-footstep-sfx-323056.mp3`
- Font: zabars
