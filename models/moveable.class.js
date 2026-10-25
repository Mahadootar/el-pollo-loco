class MoveableObject {
  x;
  y;
  img;

  loadImage(path) {
    this.img = new Image();
    this.src = path;
  }

  moveLeft() {}
}
