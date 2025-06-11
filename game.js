import { Player } from './player.js'
import { UI } from './ui.js'
import { Coin } from './coin.js'
import { World } from './world.js'
import { Light } from './light.js'

class Game {
  constructor() {
    this.gameConf()
    this.createScenario()
    this.addEvents()
  }

  gameConf() {
    this.container = document.getElementById('game-container')
    this.scoreElement = document.getElementById('score')
    this.scoreValue = document.querySelector('ui-score')

    this.player = null
    this.coins = []
    this.score = 3
    this.keys = {}
    this.gameOver = false
  }

  createScenario() {
    this.createWorld()
    this.createPlayer()
    this.createUI()
    this.createCoin(this.score)
    this.createLight()
  }

  createUI() {
    this.UI = new UI()
    this.container.appendChild(this.UI.element)
  }

  createPlayer() {
    this.player = new Player()
    this.container.appendChild(this.player.element)
  }

  createCoin(n) {
    for (let i = 0; i < n; i++) {
      const coin = new Coin(this.world)
      coin.id = i
      this.coins.push(coin)
      this.container.appendChild(coin.element)
      this.UI.addCoinUI(coin.id)
    }
  }

  createWorld() {
    this.world = new World()
  }

  createLight() {
    this.light = new Light(this.container)
  }

  addEvents() {
    this.listenerEvents()
    this.update()
  }

  listenerEvents() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.key] = true
      this.player.moving = true
    })

    window.addEventListener('keyup', (e) => {
      this.keys[e.key] = false
      this.player.moving = false
    })

    this.container.addEventListener('mousemove', (e) => {
      const rect = this.container.getBoundingClientRect()
      this.light.mouseX = e.clientX - rect.left
      this.light.mouseY = e.clientY - rect.top
      console.log(this.mouseX)
    });
  }

  update() {
      this.handleInput(this.keys, this)
      this.checkCollisions()
      this.light.updateLight(this.player)
      this.updateCoins()
      this.world.updateWorld(this.container)
      this.updateCoinDistances()
      this.playerPosition() // Activar si quieres ver en consola donde está el player
      
      requestAnimationFrame(() => this.update())
  }

  updateCoins() {
    this.coins.forEach(coin => coin.updatePosition())
  }

  updateCoinDistances() {
    const playerX = -this.world.worldOffsetX + this.player.x + this.player.width / 2
    const playerY = -this.world.worldOffsetY + this.player.y + this.player.height / 2

    this.coins.forEach(coin => {
      const coinX = coin.x + coin.width / 2
      const coinY = coin.y + coin.height / 2

      const dx = playerX - coinX
      const dy = playerY - coinY
      const distance = Math.sqrt(dx * dx + dy * dy)

      const rounded = Math.round(distance)
      const coinBox = this.UI.coinBoxes.get(coin.id)

      if (coinBox) {
        coinBox.textContent = `Coin ${coin.id}: ${rounded}px`

        if (distance < 150) {
          coinBox.style.color = 'lime'
        } else if (distance < 350) {
          coinBox.style.color = 'gold'
        } else {
          coinBox.style.color = 'lightcoral'
        }
      }
    })
  }

  updateScore() {
    this.score--
    this.UI.scoreBox.textContent = `Remain: ${this.score}`
  }

  checkCollisions() {
    this.coins.forEach((coin, index) => {
      const collided = this.player.collisionWith(coin, this.world.worldOffsetX, this.world.worldOffsetY)
      
      if (collided) {
        this.container.removeChild(coin.element)
        this.coins.splice(index, 1)
        this.UI.removeCoinUI(coin.id)
        this.updateScore()
      }
    })
  }

  playerPosition() {
      if (this.player.moving){
        const playerX = -this.world.worldOffsetX + this.player.x
        const playerY = -this.world.worldOffsetY + this.player.y
        console.log(`Jugador en coordenadas del mundo: X=${playerX}, Y=${playerY}`)
      }
  }

  handleInput(keys) {
  const input = {
    x: 0,
    y: 0,
  }

  if (keys['ArrowRight'] || keys['d']) input.x -= this.player.speed
  if (keys['ArrowLeft'] || keys['a']) input.x += this.player.speed
  if (keys['ArrowUp'] || keys['w']) input.y += this.player.speed
  if (keys['ArrowDown'] || keys['s']) input.y -= this.player.speed

  const nextX = this.world.worldOffsetX + input.x
  const nextY = this.world.worldOffsetY + input.y

  // Limits
  if (nextX < -1000 || nextX > 1000) input.x = 0
  if (nextY < -1000 || nextY > 1000) input.y = 0

  this.world.worldOffsetX += input.x
  this.world.worldOffsetY += input.y
  }
}

const game = new Game()