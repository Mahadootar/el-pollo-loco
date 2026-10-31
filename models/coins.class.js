class Coins extends MoveableObject {
  width = 100;
  height = 100;
  y = 300;
  IMAGES_COINS = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor() {
    super().loadImage("img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_COINS);
    this.x = 100 + Math.random() * 2500;
    this.y = 400 * Math.random();
    this.animateThecoins();
  }

  animateThecoins() {
    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;
    let phase = Math.random();

    setInterval(() => {
      phase += 0.3;

      const size = 100 + Math.sin(phase) * 10;

      this.width = size;
      this.height = size;

      this.x = centerX - this.width / 2;
      this.y = centerY - this.height / 2;
    }, 30);

    setInterval(() => {
      this.playImagesWalkingAnimation(this.IMAGES_COINS);
    }, 100);
  }
}
