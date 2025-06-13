import { Entity } from "./Entity.js";

export class Coin extends Entity {
  constructor() {
    this.x = this.randomPositionCoin(100)
    this.y = this.randomPositionCoin(100)
    this.width = 30
    this.height = 30
  }

  randomPositionCoin(maxRange) {
    const position = Math.random() * maxRange
    return position
  }
}