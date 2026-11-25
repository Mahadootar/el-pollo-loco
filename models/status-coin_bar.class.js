/**
 * Shows how many coins were collected. Starts empty.
 */
class StatusCoinBar extends StatusBar {
  /**
   * Creates the coin bar below the health bar.
   */
  constructor() {
    super(
      [
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
      ],
      40,
      45,
      0,
    );
  }
}
