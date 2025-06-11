export class World {
  constructor() {
    this.worldConf()
  }

  worldConf() {
    this.container = document.getElementById('game-container')

    this.worldOffsetX = 0
    this.worldOffsetY = 0

    this.leftWall = this.createVerticalWall(-1546)
    this.rightWall = this.createVerticalWall(1495)
    this.topWall = this.createHorizontalWall(-1755)
    this.bottomWall = this.createHorizontalWall(1285)
  }

  createVerticalWall(xPosition) {
    const wall = document.createElement('div')
    wall.classList.add('vertical-wall')
    wall.dataset.baseX = xPosition
    this.container.appendChild(wall)
    return wall
  }

  createHorizontalWall(yPosition) {
  const wall = document.createElement('div')
  wall.classList.add('horizontal-wall')
  wall.dataset.baseY = yPosition
  this.container.appendChild(wall)
  return wall
}

  updateWorld(container) {
    container.style.backgroundPosition = `${this.worldOffsetX}px ${this.worldOffsetY}px`
    const verticalWalls = [this.leftWall, this.rightWall]
    for (const wall of verticalWalls) {
      const baseX = parseInt(wall.dataset.baseX, 10)
      const screenX = baseX + this.worldOffsetX
      wall.style.left = `${screenX}px`
      wall.style.top = `0px`
    }

    const horizontalWalls = [this.topWall, this.bottomWall]
    for (const wall of horizontalWalls) {
      const baseY = parseInt(wall.dataset.baseY, 10)
      const screenY = baseY + this.worldOffsetY
      wall.style.top = `${screenY}px`
      wall.style.left = `0px`
    }
  }
}