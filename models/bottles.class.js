class Bottles extends MoveableObject {
  width = 50;
  height = 60;
  IMAGES_BOTTELS = [
    "../img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "../img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  constructor(x, y) {
    super().loadImage("../img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.loadImages(this.IMAGES_BOTTELS);
    this.x = x;
    this.y = y;
  }
}
