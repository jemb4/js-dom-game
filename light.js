export class Light {
  constructor(container) {
    this.lightConf(container)
    this.lightHanddle(container)
  }

  lightConf(container) {
    this.darkness = document.createElement('div')
    this.darkness.id = 'darkness'
    container.appendChild(this.darkness)

    this.mouseX = 480
    this.mouseY = 270
  }

  lightHanddle(container) {
      container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect()
      this.mouseX = e.clientX - rect.left
      this.mouseY = e.clientY - rect.top
      console.log(this.playerCenterX)
    });
  }
  
  updateLight(player) {
  const playerCenterX = player.x + player.width / 2
  const playerCenterY = player.y + player.height / 2

  const dx = this.mouseX - playerCenterX
  const dy = this.mouseY - playerCenterY

  const flashlightX = playerCenterX + dx 
  const flashlightY = playerCenterY + dy

  this.darkness.style.background = `radial-gradient(
    circle 150px at ${flashlightX}px ${flashlightY}px,
    transparent 0%,
    rgba(0, 0, 0, 0.95) 100%
  )`
  }
}