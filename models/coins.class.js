class Coins extends MoveableObject {
  width = 100;
  height = 100;
  IMAGES_COINS = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor(x, y) {
    super().loadImage("img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_COINS);
    this.x = x;
    this.y = y;
    this.centerX = x + this.width / 2;
    this.centerY = y + this.height / 2;
    this.phase = Math.random() * Math.PI * 2;
    this.animateThecoins();
  }

  animateThecoins() {
    setInterval(() => this.pulse(), 30);
    setInterval(() => this.playImagesWalkingAnimation(this.IMAGES_COINS), 100);
  }

  pulse() {
    this.phase += 0.3;
    let size = 100 + Math.sin(this.phase) * 10;
    this.width = size;
    this.height = size;
    this.x = this.centerX - size / 2;
    this.y = this.centerY - size / 2;
  }
}
