const level1 = new Level(
  [new Chicken(), new Chicken(), new Chicken(), new Endboss()],

  (clouds = [new Cloud()]),
  (backgrounds = [
    new Background("../img/5_background/layers/air.png", -719),
    new Background("../img/5_background/layers/3_third_layer/2.png", -719),
    new Background("../img/5_background/layers/2_second_layer/2.png", -719),
    new Background("../img/5_background/layers/1_first_layer/2.png", -719),

    new Background("../img/5_background/layers/air.png", 0),
    new Background("../img/5_background/layers/3_third_layer/1.png", 0),
    new Background("../img/5_background/layers/2_second_layer/1.png", 0),
    new Background("../img/5_background/layers/1_first_layer/1.png", 0),

    new Background("../img/5_background/layers/air.png", 719),
    new Background("../img/5_background/layers/3_third_layer/2.png", 719),
    new Background("../img/5_background/layers/2_second_layer/2.png", 719),
    new Background("../img/5_background/layers/1_first_layer/2.png", 719),

    new Background("../img/5_background/layers/air.png", 719 * 2),
    new Background("../img/5_background/layers/3_third_layer/1.png", 719 * 2),
    new Background("../img/5_background/layers/2_second_layer/1.png", 719 * 2),
    new Background("../img/5_background/layers/1_first_layer/1.png", 719 * 2),

    new Background("../img/5_background/layers/air.png", 719 * 3),
    new Background("../img/5_background/layers/3_third_layer/2.png", 719 * 3),
    new Background("../img/5_background/layers/2_second_layer/2.png", 719 * 3),
    new Background("../img/5_background/layers/1_first_layer/2.png", 719 * 3),
  ]),
  (coins = [
    new Coins(400, 200),
    new Coins(460, 250),
    new Coins(600, 300),
    new Coins(750, 350),
    new Coins(800, 200),
    new Coins(950, 250),
    new Coins(1000, 300),
    new Coins(1150, 250),
    new Coins(1300, 200),
    new Coins(1700, 220),
    new Coins(2000, 240),
  ]),
);
