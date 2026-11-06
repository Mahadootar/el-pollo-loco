class Character extends MoveableObject {
  y = 80;
  height = 300;
  world;
  speed = 5;
  offset = {
    top: 120,
    bottom: 40,
    right: 30,
    left: 40,
  };
  IMAGES_WALIKNG = [
    "../img/2_character_pepe/2_walk/W-21.png",
    "../img/2_character_pepe/2_walk/W-22.png",
    "../img/2_character_pepe/2_walk/W-23.png",
    "../img/2_character_pepe/2_walk/W-24.png",
    "../img/2_character_pepe/2_walk/W-25.png",
    "../img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "../img/2_character_pepe/3_jump/J-31.png",
    "../img/2_character_pepe/3_jump/J-32.png",
    "../img/2_character_pepe/3_jump/J-33.png",
    "../img/2_character_pepe/3_jump/J-34.png",
    "../img/2_character_pepe/3_jump/J-35.png",
    "../img/2_character_pepe/3_jump/J-36.png",
    "../img/2_character_pepe/3_jump/J-37.png",
    "../img/2_character_pepe/3_jump/J-38.png",
    "../img/2_character_pepe/3_jump/J-39.png",
  ];

  WALKING_SOUND = new Audio("../audio/yarzur_ofc-st3-footstep-sfx-323056.mp3");

  constructor() {
    super().loadImage("../img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALIKNG);
    this.loadImages(this.IMAGES_JUMPING);
    this.applayGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.WALKING_SOUND.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.WALKING_SOUND.play();
      }

      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.WALKING_SOUND.play();
      }
      this.world.camera_x = -this.x + 100;

      if (this.world.keyboard.UP && !this.isAboveGround()) {
        this.jump();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.isAboveGround()) {
        this.playImagesWalkingAnimation(this.IMAGES_JUMPING);
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playImagesWalkingAnimation(this.IMAGES_WALIKNG);
        }
      }
    }, 50);
  }
}
