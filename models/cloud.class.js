/**
 * A cloud in the sky that slowly moves to the left.
 */
class Cloud extends MoveableObject {
  y = 50;
  width = 500;
  height = 200;

  /**
   * Places the cloud at a random position and starts the movement.
   */
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = 200 + Math.random() * 500;
    this.animate();
  }

  /**
   * Moves the cloud slowly to the left.
   */
  animate() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}
