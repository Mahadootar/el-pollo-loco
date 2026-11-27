/**
 * One layer of the background (air, hills or ground).
 */
class Background extends MoveableObject {
  height = 480;
  width = 720;

  /**
   * Creates a background layer.
   * @param {string} imagePath - Path to the image of the layer.
   * @param {number} x - Position (x) of the layer.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
