let level1;

const COIN_POSITIONS = [
  [400, 280], [500, 260], [600, 270], [850, 150], [950, 70],
  [1050, 150], [1300, 280], [1400, 280], [1600, 150], [1900, 70],
];

const BOTTLE_POSITIONS = [250, 750, 950, 1150, 1230, 1500, 1580, 1700, 1780, 1860];

/**
 * Creates level 1 with all enemies, clouds, background layers, coins and bottles.
 */
function initLevel() {
  level1 = new Level(
    [new Chicken(), new Chicken(), new Chicken(), new Endboss()],
    [new Cloud()],
    createBackgrounds(),
    COIN_POSITIONS.map(([x, y]) => new Coins(x, y)),
    BOTTLE_POSITIONS.map((x) => new Bottles(x, 370)),
  );
}

/**
 * Creates the background from -719 to 719 * 3. Image 1 and 2 of each layer take turns.
 * @returns {Background[]} All background layers.
 */
function createBackgrounds() {
  let backgrounds = [];
  for (let i = -1; i <= 3; i++) {
    let x = 719 * i;
    let n = i % 2 == 0 ? 1 : 2;
    backgrounds.push(new Background("../img/5_background/layers/air.png", x));
    backgrounds.push(new Background(`../img/5_background/layers/3_third_layer/${n}.png`, x));
    backgrounds.push(new Background(`../img/5_background/layers/2_second_layer/${n}.png`, x));
    backgrounds.push(new Background(`../img/5_background/layers/1_first_layer/${n}.png`, x));
  }
  return backgrounds;
}
