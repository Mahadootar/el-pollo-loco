/**
 * Base class for all status bars. It shows one of six images (0, 20, 40, 60, 80, 100 %).
 */
class StatusBar extends DrawableObject {
  height = 50;
  width = 200;
  images = [];
  percentage = 0;

  /**
   * Loads the six images, sets the position and the start value.
   * @param {string[]} images - Six image paths from 0 % to 100 %.
   * @param {number} x - Position (x) on the screen.
   * @param {number} y - Position (y) on the screen.
   * @param {number} percentage - Start value from 0 to 100.
   */
  constructor(images, x, y, percentage) {
    super();
    this.images = images;
    this.loadImages(images);
    this.x = x;
    this.y = y;
    this.setPercentage(percentage);
  }

  /**
   * Sets a new value and shows the matching image.
   * @param {number} percentage - Value from 0 to 100.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.images[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Finds the image that fits the current percentage.
   * @returns {number} Index from 0 (empty) to 5 (full).
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
