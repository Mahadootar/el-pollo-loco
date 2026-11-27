/**
 * A salsa bottle that Pepe throws.
 */
class ThrowableObject extends MoveableObject {
  /**
   * Creates the bottle and throws it.
   * @param {number} x - Start position (x).
   * @param {number} y - Start position (y).
   * @param {boolean} toLeft - True if the bottle flies to the left.
   */
  constructor(x, y, toLeft) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.toLeft = toLeft;
    this.height = 60;
    this.width = 50;
    this.throw();
  }

  /**
   * Throws the bottle up in an arc and moves it to the left or to the right.
   */
  throw() {
    this.speedY = 10;
    this.applyGravity();
    setStoppableInterval(() => {
      if (this.toLeft) {
        this.x -= 5;
      } else {
        this.x += 5;
      }
    }, 25);
  }
}
