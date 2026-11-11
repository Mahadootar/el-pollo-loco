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
    new Coins(600, 60),
    new Coins(700, 200),
    new Coins(850, 50),
    new Coins(900, 200),
    new Coins(1250, 50),
    new Coins(1200, 300),
    new Coins(1550, 200),
    new Coins(1900, 100),
    new Coins(2200, 200),
  ]),
);
