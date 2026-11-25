/**
 * Shows the energy of the endboss. Starts full.
 */
class StatusEndbossBar extends StatusBar {
  /**
   * Creates the endboss bar at the top right.
   */
  constructor() {
    super(
      [
        "img/7_statusbars/2_statusbar_endboss/green/green0.png",
        "img/7_statusbars/2_statusbar_endboss/green/green20.png",
        "img/7_statusbars/2_statusbar_endboss/green/green40.png",
        "img/7_statusbars/2_statusbar_endboss/green/green60.png",
        "img/7_statusbars/2_statusbar_endboss/green/green80.png",
        "img/7_statusbars/2_statusbar_endboss/green/green100.png",
      ],
      500,
      0,
      100,
    );
  }
}
