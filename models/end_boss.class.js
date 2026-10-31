class Endboss extends MoveableObject {
  width = 300;
  height = 500;
  y = -20;

  IMAGES_WALIKNG = [
    "../img/4_enemie_boss_chicken/2_alert/G5.png",
    "../img/4_enemie_boss_chicken/2_alert/G6.png",
    "../img/4_enemie_boss_chicken/2_alert/G7.png",
    "../img/4_enemie_boss_chicken/2_alert/G8.png",
    "../img/4_enemie_boss_chicken/2_alert/G9.png",
    "../img/4_enemie_boss_chicken/2_alert/G10.png",
    "../img/4_enemie_boss_chicken/2_alert/G11.png",
    "../img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALIKNG[0]);
    this.loadImages(this.IMAGES_WALIKNG);
    this.x = 2000;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playImagesWalkingAnimation(this.IMAGES_WALIKNG);
    }, 100);
  }
}
