class World {
  character = new Character();
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  healthBar = new StatusHealthBar();
  coinBar = new StatusCoinbar();
  bottleBar = new StatusBottlesBar();
  endbossBar = new StatusEndbossBar();
  throwableObjects = [];
  collectedCoins = 0;
  totalCoins = this.level.coins.length;
  totalBottles = this.level.bottles.length;
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
    this.drawGameObjects();
    this.ctx.translate(-this.camera_x, 0);
    this.drawStatusBars();

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  drawGameObjects() {
    this.addToMapp(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.throwableObjects);
  }

  drawStatusBars() {
    this.addToMapp(this.healthBar);
    this.addToMapp(this.coinBar);
    this.addToMapp(this.bottleBar);
    this.addToMapp(this.endbossBar);
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkBottleHits();
    }, 50);
    setInterval(() => {
      this.checkThrowableObject();
    }, 200);
  }

  checkThrowableObject() {
    if (this.keyboard.D && this.collectedBottles > 0) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100,
      );
      this.throwableObjects.push(bottle);
      this.collectedBottles--;
      this.bottleBar.setPercentage(
        (this.collectedBottles / this.totalBottles) * 100,
      );
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.isDead()) {
        this.handleEnemyCollision(enemy);
      }
    });
  }

  handleEnemyCollision(enemy) {
    if (
      this.character.isAboveGround() &&
      this.character.speedY < 0 &&
      enemy instanceof Chicken
    ) {
      enemy.energy = 0;
      this.removeDeadEnemy(enemy, 1000);
    } else if (!this.character.isHurt()) {
      this.characterGetHit();
    }
  }

  characterGetHit() {
    this.character.hit(5);
    this.healthBar.setPercentage(this.character.energy);
    if (this.character.isDead()) {
      this.gameLost();
    }
  }

  removeDeadEnemy(enemy, delay) {
    setTimeout(() => {
      let index = this.level.enemies.indexOf(enemy);
      this.level.enemies.splice(index, 1);
    }, delay);
  }

  checkBottleHits() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy) && !enemy.isDead()) {
          this.handleBottleHit(bottle, enemy);
        }
      });
    });
  }

  handleBottleHit(bottle, enemy) {
    if (enemy instanceof Chicken) {
      enemy.energy = 0;
      this.removeDeadEnemy(enemy, 1000);
    } else {
      enemy.hit(20);
      this.endbossBar.setPercentage(enemy.energy);
      if (enemy.isDead()) {
        this.removeDeadEnemy(enemy, 1000);
        this.gameWon();
      }
    }
    let index = this.throwableObjects.indexOf(bottle);
    this.throwableObjects.splice(index, 1);
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
          this.bottleBar.setPercentage(
            (this.collectedBottles / this.totalBottles) * 100,
          );
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

  gameLost() {
    this.endGame("../img/You won, you lost/Game Over.png");
  }

  gameWon() {
    this.endGame("../img/You won, you lost/You won A.png");
  }

  endGame(imagePath) {
    setTimeout(() => {
      this.stopGame();
      document.getElementById("endScreenImg").src = imagePath;
      document.getElementById("endScreen").classList.remove("d-none");
    }, 1500);
  }

  stopGame() {
    for (let i = 1; i < 9999; i++) {
      clearInterval(i);
    }
  }
}
