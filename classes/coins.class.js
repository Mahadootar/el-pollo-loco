/**
 * A coin that can be collected. It pulses and changes its image.
 */
class Coins extends MoveableObject {
  width = 100;
  height = 100;
  IMAGES_COINS = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  /**
   * Places the coin and starts the animation.
   * @param {number} x - Position (x).
   * @param {number} y - Position (y).
   */
  constructor(x, y) {
    super().loadImage("img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_COINS);
    this.x = x;
    this.y = y;
    this.centerX = x + this.width / 2;
    this.centerY = y + this.height / 2;
    this.phase = Math.random() * Math.PI * 2;
    this.animate();
  }

  /**
   * Starts the pulsing and the image animation.
   */
  animate() {
    setStoppableInterval(() => this.pulse(), 30);
    setStoppableInterval(() => this.playAnimation(this.IMAGES_COINS), 100);
  }

  /**
   * Changes the size between 90 and 110 with a sine wave. The center stays the same.
   */
  pulse() {
    this.phase += 0.3;
    let size = 100 + Math.sin(this.phase) * 10;
    this.width = size;
    this.height = size;
    this.x = this.centerX - size / 2;
    this.y = this.centerY - size / 2;
  }
}
