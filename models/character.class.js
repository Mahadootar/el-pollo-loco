class Character extends MoveableObject {
  y = 140;
  height = 300;
  IMAGES_WALIKNG = [
    "../img/2_character_pepe/2_walk/W-21.png",
    "../img/2_character_pepe/2_walk/W-22.png",
    "../img/2_character_pepe/2_walk/W-23.png",
    "../img/2_character_pepe/2_walk/W-24.png",
    "../img/2_character_pepe/2_walk/W-25.png",
    "../img/2_character_pepe/2_walk/W-26.png",
  ];

  constructor() {
    super().loadImage("../img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALIKNG);
    this.animate();
  }

  animate() {
    setInterval(() => {
      let i = this.currentImage % this.IMAGES_WALIKNG.length;
      let path = this.IMAGES_WALIKNG[i];
      this.img = this.imageCatch[path];
      this.currentImage++;
    }, 100);
  }
}
