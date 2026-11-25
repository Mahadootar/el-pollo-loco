/**
 * Base class for everything that can be drawn on the canvas.
 */
class DrawableObject {
  /** Set to true to see the blue collision frames while debugging. */
  static showFrames = false;

  x = 120;
  y = 280;
  img;
  height = 150;
  width = 100;
  imageCache = {};
  currentImage = 0;

  /**
   * Loads a single image and sets it as the current image.
   * @param {string} path - Path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the current image. A broken image is skipped instead of stopping the game.
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
      console.warn("Image could not be drawn:", this.img?.src, e);
    }
  }

  /**
   * Draws the collision frame of characters and enemies (only when showFrames is true).
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   */
  drawFrame(ctx) {
    if (!DrawableObject.showFrames || !this.offset) return;
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "blue";
    ctx.rect(
      this.x + this.offset.left,
      this.y + this.offset.top,
      this.width - this.offset.left - this.offset.right,
      this.height - this.offset.top - this.offset.bottom,
    );
    ctx.stroke();
  }

  /**
   * Loads several images into the image cache, e.g. for an animation.
   * @param {string[]} arr - Paths to the image files.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
