import { UIController } from "./controller/UIcontroller.js";

export class Game {
  ui = new UIController();

  constructor() {
    this.init();
  }

  /**
   *
   */
  init() {
    this.ui.init();
  }
}
