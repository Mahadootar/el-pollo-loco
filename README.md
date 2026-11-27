# El Pollo Loco

A 2D jump-and-run game built with **HTML5 Canvas, CSS and JavaScript** (object-oriented, with classes).

Pepe crosses the Mexican desert. A giant chicken threatens his village – only with hot salsa bottles can he defeat it! Collect coins and bottles, fight the chickens and beat the endboss.

## How to play

| Goal | How |
|---|---|
| **Win** | Defeat the endboss by hitting him 5 times with salsa bottles. |
| **Lose** | Pepe loses all his energy. A chicken costs 5 energy, the endboss 20. |
| **Kill a chicken** | Jump on it from above, or hit it with a bottle. |
| **Collect** | Walk through coins and bottles. You can only throw bottles you have collected. |

The endboss waits at the end of the level. When Pepe comes close, he walks towards him and attacks.
If Pepe does nothing for 10 seconds, he falls asleep and starts snoring.

## Controls

### Keyboard

| Key | Action |
|---|---|
| ← → | Walk left / right |
| ↑ or Space | Jump |
| D | Throw a bottle (in the direction Pepe is looking) |

### Mobile

On phones and tablets, touch buttons appear in the game: ◀ ▶ to walk, ▲ to jump and the bottle to throw.
The game is played in **landscape mode** – in portrait mode a hint asks you to turn your device.

### Buttons in the game (top center)

| Button | Action |
|---|---|
| ❓ | Opens a dialog with the story, the goal and the controls (close with ✕, `Esc` or a click next to it) |
| 🔊 / 🔇 | Turns all sounds on or off – the setting is saved in the local storage |
| ⛶ | Fullscreen mode (desktop only, leave with `Esc`) |

### End screen

After winning or losing you can choose **Nochmal spielen** (restart the game) or **Startbildschirm** (back to the start screen). The page is not reloaded.

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
├── index.html            # game page: canvas, start/end screen, help dialog, touch buttons
├── impressum.html        # legal notice (example data)
├── style.css             # layout, buttons, dialog, fullscreen and mobile styles
├── script.js             # start/restart, keyboard, touch buttons, sounds, fullscreen
├── levels/level1.js      # enemies, coins and bottles of level 1
├── classes/              # one class per file
│   ├── drawable-object.class.js   # everything that can be drawn
│   ├── moveable.class.js          # movement, gravity, damage, collision
│   ├── character.class.js         # Pepe (walk, jump, hurt, idle, sleep, dead)
│   ├── chicken.class.js
│   ├── end_boss.class.js          # alert, walk, attack, hurt, dead
│   ├── throwableObjects.class.js  # thrown bottle
│   ├── bottles.class.js           # bottle on the ground
│   ├── coins.class.js
│   ├── cloud.class.js
│   ├── background.class.js
│   ├── keyboard.class.js
│   ├── level.class.js
│   ├── status-bar.class.js        # base class of all status bars
│   ├── status-*_bar.class.js      # health, coin, bottle and endboss bar
│   └── world.class.js             # draws the game, checks collisions, ends the game
├── img/                  # images
├── audio/                # music and sound effects
└── fonts/                # zabars font
```

## Technologies

- HTML5 Canvas for drawing the game
- JavaScript classes and inheritance (`DrawableObject` → `MoveableObject` → `Character`, `Chicken`, `Endboss`, …)
- All functions documented with JSDoc
- CSS media queries for phones and tablets, the Fullscreen API and the `<dialog>` element
- Pointer events for the touch controls
- Local storage for the mute setting

## Credits

- **Images:** provided by the Developer Akademie for the El Pollo Loco project
- **Font:** zabars
- **Music and sound effects:** [Pixabay](https://pixabay.com/sound-effects/) (free license), by:

| Sound | Creator |
|---|---|
| Desert music loop | foggysunrise |
| Footsteps | yarzur_ofc |
| Jump | Dragon Studio |
| Glass breaking | Dragon Studio |
| Coin | yodguard |
| Item pickup | freesound_community |
| Chicken | freesound_community |
| Angry chicken | soundzee |
| Whoosh | denielcz |
| Hurt | cookiecheese |
| Snoring | snoring-331163 |
| Victory | eaglaxle-gaming |
| Lose | mori_sound-fx |
