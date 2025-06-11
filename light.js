export class Light {
  constructor(container) {
    this.lightConf(container)
  }

  lightConf(container) {
    this.darkness = document.createElement('div')
    this.darkness.id = 'darkness'
    container.appendChild(this.darkness)

    this.mouseX = 480
    this.mouseY = 270
  }
  
  updateLight(player) {
  const playerCenterX = player.x + player.width / 2
  const playerCenterY = player.y + player.height / 2

  const dx = this.mouseX - playerCenterX
  const dy = this.mouseY - playerCenterY

  const flashlightX = playerCenterX + dx * 0.7
  const flashlightY = playerCenterY + dy * 0.7

  this.darkness.style.background = `radial-gradient(
    circle 150px at ${flashlightX}px ${flashlightY}px,
    transparent 0%,
    rgba(0, 0, 0, 0.95) 100%
  )`
  }
}