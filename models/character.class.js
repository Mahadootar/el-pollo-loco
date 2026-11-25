/**
 * Pepe, the character that is controlled by the player.
 */
class Character extends MoveableObject {
  y = 80;
  height = 300;
  width = 150;
  world;
  speed = 5;
  offset = {
    top: 120,
    bottom: 40,
    right: 30,
    left: 40,
  };
  IMAGES_WALKING = [
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

  IMAGES_DEAD = [
    "../img/2_character_pepe/5_dead/D-51.png",
    "../img/2_character_pepe/5_dead/D-52.png",
    "../img/2_character_pepe/5_dead/D-53.png",
    "../img/2_character_pepe/5_dead/D-54.png",
    "../img/2_character_pepe/5_dead/D-55.png",
    "../img/2_character_pepe/5_dead/D-56.png",
  ];

  IMAGES_HURT = [
    "../img/2_character_pepe/4_hurt/H-41.png",
    "../img/2_character_pepe/4_hurt/H-42.png",
    "../img/2_character_pepe/4_hurt/H-43.png",
  ];

  WALKING_SOUND = new Audio("../audio/yarzur_ofc-st3-footstep-sfx-323056.mp3");

  /**
   * Loads all images, starts the gravity and the animation.
   */
  constructor() {
    super().loadImage("../img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animate();
  }

  /**
   * Starts the movement (60 times per second) and the image animation (20 times per second).
   */
  animate() {
    setInterval(() => {
      this.WALKING_SOUND.pause();
      this.moveCharacter();
    }, 1000 / 60);

    setInterval(() => {
      this.playCharAnimation();
    }, 50);
  }

  /**
   * Chooses the right animation: dead, hurt, jumping or walking.
   */
  playCharAnimation() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  /**
   * Moves Pepe with the keyboard, lets him jump and moves the camera with him.
   */
  moveCharacter() {
    let keyboard = this.world.keyboard;
    if (keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.playWalkingSound();
    }
    if (keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.playWalkingSound();
    }
    this.world.camera_x = -this.x + 100;
    if ((keyboard.UP || keyboard.SPACE) && !this.isAboveGround()) {
      this.jump();
    }
  }

  /**
   * Plays the footstep sound, unless the sound is muted.
   */
  playWalkingSound() {
    if (!isMuted) {
      this.WALKING_SOUND.play();
    }
  }
}
