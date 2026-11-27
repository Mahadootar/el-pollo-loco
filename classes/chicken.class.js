/**
 * A small chicken that walks to the left. It dies when Pepe jumps on it or a bottle hits it.
 */
class Chicken extends MoveableObject {
  y = 355;
  width = 90;
  height = 80;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  DEAD_CHICKEN = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  /**
   * Loads the images and places the chicken at a random position with a random speed.
   */
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.DEAD_CHICKEN);
    this.x = 600 + Math.random() * 600;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }

  /**
   * Lets the chicken walk to the left and shows the walking or the dead image.
   */
  animate() {
    setInterval(() => {
      if (!this.isDead()) {
        this.moveLeft();
        this.otherDirection = false;
      }
    }, 1000 / 60);
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.DEAD_CHICKEN);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
  }
}
