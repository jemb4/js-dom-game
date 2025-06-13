export class Entity {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = 0
    this.height = 0
    this.entityType = ''

    this.element = document.createElement('div')
    this.element.classList.add(this.entityType)
  }

  updatePosition() {
    this.element.style.left = `${this.x}px`
    this.element.style.top = `${this.y}px`
  }
}