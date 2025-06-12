export class Player {
  constructor() {
    this.playerConf()
    this.createPlayer()
  }

  playerConf() {
    this.x = 455
    this.y = 245
    this.width = 30
    this.height = 30
    this.speed = 5
    this.moving = false
  }

  createPlayer() {
    this.element = document.createElement('div')
    this.element.classList.add('player')
    this.element.style.left = `${this.x}px`
    this.element.style.top = `${this.y}px`
  }

  collisionWith(object, offsetX, offsetY) {
    const objectX = object.x + offsetX;
    const objectY = object.y + offsetY;
    return (
      this.x < objectX + object.width &&
      this.x + this.width > objectX &&
      this.y < objectY + object.height &&
      this.y + this.height > objectY
    )
  }
}