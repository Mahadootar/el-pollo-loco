/**
 * Shows how many bottles Pepe has. Starts empty.
 */
class StatusBottleBar extends StatusBar {
  /**
   * Creates the bottle bar below the coin bar.
   */
  constructor() {
    super(
      [
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
      ],
      40,
      90,
      0,
    );
  }
}
