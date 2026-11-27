/**
 * The game world. It draws everything, checks all collisions and ends the game.
 */
class World {
  character = new Character();
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  healthBar = new StatusHealthBar();
  coinBar = new StatusCoinBar();
  bottleBar = new StatusBottleBar();
  endbossBar = new StatusEndbossBar();
  throwableObjects = [];
  collectedCoins = 0;
  totalCoins = this.level.coins.length;
  totalBottles = this.level.bottles.length;
  collectedBottles = 0;

  /**
   * Creates the world and starts drawing and all checks.
   * @param {HTMLCanvasElement} canvas - The canvas to draw on.
   * @param {Keyboard} keyboard - The pressed keys.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.checkCoinCollision();
    this.checkBottleCollision();
  }

  /**
   * Gives Pepe and all enemies access to the world.
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  /**
   * Draws the whole game again and again (about 60 times per second).
   */
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

  /**
   * Draws everything that moves with the camera.
   */
  drawGameObjects() {
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.throwableObjects);
  }

  /**
   * Draws the status bars. They stay fixed on the screen.
   */
  drawStatusBars() {
    this.addToMap(this.healthBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.endbossBar);
  }

  /**
   * Starts the checks for enemies and bottles.
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkBottleHits();
      this.removeFallenBottles();
    }, 50);
    setInterval(() => {
      this.checkThrowableObject();
    }, 200);
  }

  /**
   * Throws a bottle in the direction Pepe is looking, if D is pressed and he has a bottle.
   */
  checkThrowableObject() {
    if (this.keyboard.D && this.collectedBottles > 0) {
      let toLeft = this.character.otherDirection;
      let startX = toLeft ? this.character.x : this.character.x + 100;
      let bottle = new ThrowableObject(startX, this.character.y + 100, toLeft);
      this.throwableObjects.push(bottle);
      this.collectedBottles--;
      this.updateBottleBar();
    }
  }

  /**
   * Checks if Pepe touches a living enemy.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.isDead()) {
        this.handleEnemyCollision(enemy);
      }
    });
  }

  /**
   * Pepe kills a chicken when he lands on it. Otherwise he gets hurt.
   * @param {MoveableObject} enemy - The enemy Pepe touches.
   */
  handleEnemyCollision(enemy) {
    if (
      this.character.isAboveGround() &&
      this.character.speedY < 0 &&
      enemy instanceof Chicken
    ) {
      enemy.energy = 0;
      this.removeDeadEnemy(enemy, 1000);
    } else if (!this.character.isHurt()) {
      this.characterGetHit(enemy);
    }
  }

  /**
   * Pepe loses energy. The endboss hurts more than a chicken.
   * @param {MoveableObject} enemy - The enemy that hits Pepe.
   */
  characterGetHit(enemy) {
    let damage = enemy instanceof Endboss ? 20 : 5;
    this.character.hit(damage);
    this.healthBar.setPercentage(this.character.energy);
    if (this.character.isDead()) {
      this.gameLost();
    }
  }

  /**
   * Removes a dead enemy from the level after a short time.
   * @param {MoveableObject} enemy - The dead enemy.
   * @param {number} delay - Time in milliseconds until it disappears.
   */
  removeDeadEnemy(enemy, delay) {
    setTimeout(() => {
      let index = this.level.enemies.indexOf(enemy);
      if (index != -1) {
        this.level.enemies.splice(index, 1);
      }
    }, delay);
  }

  /**
   * Checks if a flying bottle hits a living enemy.
   */
  checkBottleHits() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy) && !enemy.isDead()) {
          this.handleBottleHit(bottle, enemy);
        }
      });
    });
  }

  /**
   * A bottle kills a chicken or hurts the endboss. Then the bottle disappears.
   * @param {ThrowableObject} bottle - The bottle that hits.
   * @param {MoveableObject} enemy - The enemy that is hit.
   */
  handleBottleHit(bottle, enemy) {
    if (enemy instanceof Chicken) {
      enemy.energy = 0;
      this.removeDeadEnemy(enemy, 1000);
    } else {
      this.endbossGetHit(enemy);
    }
    let index = this.throwableObjects.indexOf(bottle);
    this.throwableObjects.splice(index, 1);
  }

  /**
   * The endboss loses energy. When he is dead, the game is won.
   * @param {Endboss} endboss - The endboss.
   */
  endbossGetHit(endboss) {
    endboss.hit(20);
    this.endbossBar.setPercentage(endboss.energy);
    if (endboss.isDead()) {
      this.removeDeadEnemy(endboss, 3000);
      this.gameWon();
    }
  }

  /**
   * Removes bottles that fell out of the screen.
   */
  removeFallenBottles() {
    this.throwableObjects = this.throwableObjects.filter(
      (bottle) => bottle.y < 480,
    );
  }

  /**
   * Checks if Pepe collects a coin.
   */
  checkCoinCollision() {
    setInterval(() => {
      this.level.coins.forEach((coin, index) => {
        if (this.character.isColliding(coin)) {
          this.collectedCoins++;
          this.level.coins.splice(index, 1);
          this.coinBar.setPercentage(
            (this.collectedCoins / this.totalCoins) * 100,
          );
        }
      });
    }, 100);
  }

  /**
   * Checks if Pepe collects a bottle from the ground.
   */
  checkBottleCollision() {
    setInterval(() => {
      this.level.bottles.forEach((bottle, index) => {
        if (this.character.isColliding(bottle)) {
          this.collectedBottles++;
          this.level.bottles.splice(index, 1);
          this.updateBottleBar();
        }
      });
    }, 100);
  }

  /**
   * Shows the number of bottles Pepe has in the bottle bar.
   */
  updateBottleBar() {
    this.bottleBar.setPercentage(
      (this.collectedBottles / this.totalBottles) * 100,
    );
  }

  /**
   * Draws several objects.
   * @param {DrawableObject[]} objects - The objects to draw.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Draws one object. Objects that look to the left are mirrored.
   * @param {DrawableObject} mo - The object to draw.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Mirrors the canvas so the object is drawn looking to the left.
   * @param {DrawableObject} mo - The object to mirror.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Undoes the mirroring after the object was drawn.
   * @param {DrawableObject} mo - The mirrored object.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Ends the game with the "You lost" screen.
   */
  gameLost() {
    this.endGame("img/You won, you lost/You lost.png");
  }

  /**
   * Ends the game with the "You won" screen.
   */
  gameWon() {
    this.endGame("img/You won, you lost/You won A.png");
  }

  /**
   * Waits a moment, stops the game and shows the end screen.
   * @param {string} imagePath - Path to the image of the end screen.
   */
  endGame(imagePath) {
    setTimeout(() => {
      this.stopGame();
      backgroundMusic.pause();
      document.getElementById("endScreenImg").src = imagePath;
      document.getElementById("endScreen").classList.remove("d-none");
    }, 1500);
  }

  /**
   * Stops all intervals, so nothing moves anymore.
   */
  stopGame() {
    for (let i = 1; i < 9999; i++) {
      clearInterval(i);
    }
  }
}
