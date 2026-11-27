/**
 * A level with all its enemies, clouds, background layers, coins and bottles.
 */
class Level {
  enemies;
  clouds;
  backgrounds;
  level_end_x = 2500;
  coins;
  bottles;

  /**
   * @param {MoveableObject[]} enemies - Chickens and the endboss.
   * @param {Cloud[]} clouds - Clouds in the sky.
   * @param {Background[]} backgrounds - Background layers.
   * @param {Coins[]} coins - Coins that can be collected.
   * @param {Bottles[]} bottles - Bottles on the ground that can be collected.
   */
  constructor(enemies, clouds, backgrounds, coins, bottles) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgrounds = backgrounds;
    this.coins = coins;
    this.bottles = bottles;
  }
}
