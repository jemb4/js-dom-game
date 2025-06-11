export class World {
  constructor() {
    this.worldConf()
  }

  worldConf() {
    this.container = document.getElementById('game-container')

    this.worldOffsetX = 0
    this.worldOffsetY = 0
  }

  updateWorld(container) {
    container.style.backgroundPosition = `${this.worldOffsetX}px ${this.worldOffsetY}px`
  }
}