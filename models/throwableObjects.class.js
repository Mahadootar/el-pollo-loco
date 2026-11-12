class ThrowableObject extends MoveableObject {
  speedY = 30;
  speedX = 20;

  constructor() {
    super().loadImage("../img/6_salsa_bottle/salsa_bottle.png");
    this.x = 100;
    this.y = 100;
  }
}
