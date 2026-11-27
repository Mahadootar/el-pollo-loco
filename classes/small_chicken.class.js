/**
 * A small, slow chicken. It works like the normal chicken (it inherits everything),
 * only the images, the size and the start position are different.
 */
class SmallChicken extends Chicken {
  y = 380;
  width = 56;
  height = 50;
  offset = {
    top: 5,
    bottom: 5,
    left: 9,
    right: 8,
  };
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  DEAD_CHICKEN = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  /**
   * Loads the small chicken images and places it at a random position with a slow speed.
   */
  constructor() {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.DEAD_CHICKEN);
    this.x = 400 + Math.random() * 1200;
    this.speed = 0.15 + Math.random() * 0.25;
  }
}
