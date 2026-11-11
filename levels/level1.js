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
    new Coins(400, 280),
    new Coins(500, 260),
    new Coins(600, 270),
    new Coins(850, 150),
    new Coins(950, 70),
    new Coins(1050, 150),
    new Coins(1300, 280),
    new Coins(1400, 280),
    new Coins(1600, 150),
    new Coins(1900, 70),
  ]),
);
