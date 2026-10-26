class Chicken extends MoveableObject {
  y = 340;
  width = 90;
  height = 80;
  constructor() {
    super().loadImage("../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 150 + Math.random() * 500;
  }
}
