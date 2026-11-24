class ThrowableObject extends MoveableObject {
  constructor(x, y, toLeft) {
    super().loadImage("../img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.throw();
    this.toLeft = toLeft;
  }

  throw() {
    this.speedY = 10;
    this.applayGravity();
    setInterval(() => {
      if (this.toLeft) {
        this.x -= 5;
      } else {
        this.x += 5;
      }
    }, 25);
  }
}
