class Endboss extends MoveableObject {
  width = 300;
  height = 500;
  y = -58;
  isActive = false;

  IMAGES_ALERT = [
    "../img/4_enemie_boss_chicken/2_alert/G5.png",
    "../img/4_enemie_boss_chicken/2_alert/G6.png",
    "../img/4_enemie_boss_chicken/2_alert/G7.png",
    "../img/4_enemie_boss_chicken/2_alert/G8.png",
    "../img/4_enemie_boss_chicken/2_alert/G9.png",
    "../img/4_enemie_boss_chicken/2_alert/G10.png",
    "../img/4_enemie_boss_chicken/2_alert/G11.png",
    "../img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_WALKING = [
    "../img/4_enemie_boss_chicken/1_walk/G1.png",
    "../img/4_enemie_boss_chicken/1_walk/G2.png",
    "../img/4_enemie_boss_chicken/1_walk/G3.png",
    "../img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  IMAGES_ATTACK = [
    "../img/4_enemie_boss_chicken/3_attack/G13.png",
    "../img/4_enemie_boss_chicken/3_attack/G14.png",
    "../img/4_enemie_boss_chicken/3_attack/G15.png",
    "../img/4_enemie_boss_chicken/3_attack/G16.png",
    "../img/4_enemie_boss_chicken/3_attack/G17.png",
    "../img/4_enemie_boss_chicken/3_attack/G18.png",
    "../img/4_enemie_boss_chicken/3_attack/G19.png",
    "../img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "../img/4_enemie_boss_chicken/4_hurt/G21.png",
    "../img/4_enemie_boss_chicken/4_hurt/G22.png",
    "../img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "../img/4_enemie_boss_chicken/5_dead/G24.png",
    "../img/4_enemie_boss_chicken/5_dead/G25.png",
    "../img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

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

  animate() {
    setInterval(() => {
      this.playEndbossAnimation();
    }, 100);

    setInterval(() => {
      this.moveEndboss();
    }, 1000 / 60);
  }

  moveEndboss() {
    if (this.world.character.x >= 1500) {
      this.isActive = true;
    }
    if (this.isActive && !this.isDead()) {
      this.x -= 2.5;
    }
  }

  playEndbossAnimation() {
    if (this.isDead()) {
      this.playImagesWalkingAnimation(this.IMAGES_DEAD);
    } else if (this.isHurt()) {
      this.playImagesWalkingAnimation(this.IMAGES_HURT);
    } else if (this.isActive) {
      this.playImagesWalkingAnimation(this.IMAGES_WALKING);
    } else {
      this.playImagesWalkingAnimation(this.IMAGES_ALERT);
    }
  }
}
