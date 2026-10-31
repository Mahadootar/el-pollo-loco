class MoveableObject {
  x = 120;
  y = 280;
  img;
  height = 150;
  width = 100;
  imageCatch = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCatch[path] = img;
    });
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  playImagesWalkingAnimation(images) {
    let i = this.currentImage % this.IMAGES_WALIKNG.length;
    let path = images[i];
    this.img = this.imageCatch[path];
    this.currentImage++;
  }
}
