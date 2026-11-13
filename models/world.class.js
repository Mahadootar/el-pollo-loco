class World {
  character = new Character();
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  healthBar = new StatusHealthBar();
  coinBar = new StatusCoinbar();
  throwableObjects = [];
  collectedCoins = 0;
  totalCoins = this.level.coins.length;
  collectedBottles = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.checkCoinCollision();
    this.checkBottleCollision();
    console.log(this.totalCoins);
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgrounds);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMapp(this.healthBar);
    this.addToMapp(this.coinBar);
    this.ctx.translate(this.camera_x, 0);
    this.addToMapp(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowableObject();
    }, 1000);
  }

  checkThrowableObject() {
    if (this.keyboard.D) {
      let bottle = new ThrowableObject(this.character.x, this.character.y);
      this.throwableObjects.push(bottle);
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.healthBar.setPercentage(this.character.energy);
      }
    });
  }

  checkCoinCollision() {
    setInterval(() => {
      this.level.coins.forEach((coin, index) => {
        if (this.character.isColliding(coin)) {
          console.log("coins berührt", this.collectedCoins);
          this.collectedCoins++;
          this.level.coins.splice(index, 1);
          this.coinBar.setPercentage(
            (this.collectedCoins / this.totalCoins) * 100,
          );
        }
      });
    }, 100);
  }

  checkBottleCollision() {
    setInterval(() => {
      this.level.bottles.forEach((bottle, index) => {
        if (this.character.isColliding(bottle)) {
          this.collectedBottles++;
          this.level.bottles.splice(index, 1);
        }
      });
    }, 100);
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMapp(o);
    });
  }

  addToMapp(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
