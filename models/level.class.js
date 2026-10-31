class Level {
  enemies;
  clouds;
  backgrounds;
  level_end_x = 2500;
  coins;
  constructor(enemies, clouds, backgrounds, coins) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgrounds = backgrounds;
    this.coins = coins;
  }
}
