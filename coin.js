export class Coin {
  constructor(world) {
    this.world = world
    this.coinConf()
    this.createCoin()
    this.updatePosition()
  }

  coinConf() {
    // this.x = Math.random() * (1555 + 645) - 645
    // this.y = Math.random() * (1145 + 655) - 655
    this.x = Math.random() * 100
    this.y = Math.random() * 100
    this.width = 30
    this.height = 30
  }

  createCoin() {
    this.element = document.createElement('div')
    this.element.classList.add('coin')
  }

  updatePosition() {
    const xOffset = this.x + this.world.worldOffsetX
    const yOffset = this.y + this.world.worldOffsetY
    this.element.style.left = `${xOffset}px`
    this.element.style.top = `${yOffset}px`
  }
}