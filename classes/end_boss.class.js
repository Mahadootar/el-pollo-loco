/**
 * The endboss. He waits until Pepe comes close, then walks towards him and attacks.
 */
class Endboss extends MoveableObject {
  width = 300;
  height = 500;
  y = -58;
  isActive = false;
  offset = {
    top: 100,
    bottom: 20,
    right: 30,
    left: 40,
  };

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Loads all images, places the endboss at the end of the level and starts the animation.
   */
  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2000;
    this.animate();
  }

  /**
   * Starts the image animation and the movement.
   */
  animate() {
    setInterval(() => {
      this.playEndbossAnimation();
    }, 100);

    setInterval(() => {
      this.moveEndboss();
    }, 1000 / 60);
  }

  /**
   * Activates the endboss when Pepe comes close. An active endboss walks to the left.
   */
  moveEndboss() {
    if (this.world.character.x >= 1500) {
      this.isActive = true;
    }
    if (this.isActive && !this.isDead()) {
      this.x -= 2.5;
    }
  }

  /**
   * Checks if Pepe is close enough to be attacked.
   * @returns {boolean} True if Pepe is near the endboss.
   */
  isNearCharacter() {
    return this.x - this.world.character.x < 200;
  }

  /**
   * Chooses the right animation: dead, hurt, attack, walking or alert.
   */
  playEndbossAnimation() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isActive && this.isNearCharacter()) {
      this.playAnimation(this.IMAGES_ATTACK);
    } else if (this.isActive) {
      this.playAnimation(this.IMAGES_WALKING);
    } else {
      this.playAnimation(this.IMAGES_ALERT);
    }
  }
}
