import { UIEntity } from "../models/UIEntity.js";

export class CoinController {
  constructor(coinID) {
    this.coinID = coinID
  }

  Infinity() {
    this.coinID.forEach(id => {
      UIEntity.addCoinUI(id)
    });
  }
}