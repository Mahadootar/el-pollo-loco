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
    bottom: 10,
    right: 30,
    left: 40,
  };
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
  ];

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_SLEEPING = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  WALKING_SOUND = new Audio("audio/yarzur_ofc-st3-footstep-sfx-323056.mp3");
  lastActionTime = new Date().getTime();
  slowAnimationTick = 0;

  /**
   * Loads all images, starts the gravity and the animation.
   */
  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_SLEEPING);
    this.applyGravity();
    this.animate();
  }

  /**
   * Starts the movement (60 times per second) and the image animation (20 times per second).
   */
  animate() {
    setStoppableInterval(() => {
      this.WALKING_SOUND.pause();
      this.moveCharacter();
    }, 1000 / 60);

    setStoppableInterval(() => {
      this.playCharAnimation();
    }, 50);
  }

  /**
   * Chooses the right animation: dead, hurt, jumping or walking.
   */
  playCharAnimation() {
    this.updateSnoring();
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
    } else if (this.isSleeping()) {
      this.playSlowAnimation(this.IMAGES_SLEEPING);
    } else {
      this.playSlowAnimation(this.IMAGES_IDLE);
    }
  }

  /**
   * Pepe snores while he is sleeping. When he wakes up, the snoring stops.
   */
  updateSnoring() {
    if (this.isSleeping() && !this.isDead()) {
      startLoopSound("snoring");
    } else {
      stopLoopSound("snoring");
    }
  }

  /**
   * Plays an animation 4 times slower than normal (one image every 200 ms instead of 50 ms).
   * @param {string[]} images - Paths of the animation images.
   */
  playSlowAnimation(images) {
    this.slowAnimationTick++;
    if (this.slowAnimationTick % 4 == 0) {
      this.playAnimation(images);
    }
  }

  /**
   * Checks if Pepe has done nothing for more than 10 seconds.
   * @returns {boolean} True if Pepe falls asleep.
   */
  isSleeping() {
    return new Date().getTime() - this.lastActionTime > 10000;
  }

  /**
   * Remembers the time of the last key press, so Pepe only falls asleep when nothing happens.
   */
  rememberLastAction() {
    let k = this.world.keyboard;
    if (k.RIGHT || k.LEFT || k.UP || k.SPACE || k.D) {
      this.lastActionTime = new Date().getTime();
    }
  }

  /**
   * Moves Pepe with the keyboard, lets him jump and moves the camera with him.
   */
  moveCharacter() {
    if (this.isDead()) return;
    this.rememberLastAction();
    this.walk();
    this.world.camera_x = -this.x + 100;
    let keyboard = this.world.keyboard;
    let wantsToJump = keyboard.UP || keyboard.SPACE;
    if (wantsToJump && !this.isAboveGround() && this.speedY <= 0) {
      this.jump();
      playSound("jump");
    }
  }

  /**
   * Moves Pepe to the right or to the left, but not out of the level.
   */
  walk() {
    let keyboard = this.world.keyboard;
    if (keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.playWalkingSound();
    }
    if (keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.playWalkingSound();
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
