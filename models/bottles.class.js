/**
 * A salsa bottle that lies on the ground and can be collected.
 */
class Bottles extends MoveableObject {
  width = 50;
  height = 60;

  /**
   * Places the bottle on the ground.
   * @param {number} x - Position (x).
   * @param {number} y - Position (y).
   */
  constructor(x, y) {
    super().loadImage("../img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.x = x;
    this.y = y;
  }
}
