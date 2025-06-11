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
    this.scoreValue = document.getElementById('score-value')
    this.endGame = document.getElementById('end-game')
    this.blur = document.getElementById('blur')
    this.restartBtn = document.getElementById('restart-game')

    this.player = null
    this.coins = []
    this.score = 3
    this.keys = {}
    this.gameOver = false
  }

  createScenario() {
    this.createWorld()
    this.createPlayer()
    this.createCoin(this.score)
    this.createLight()
  }

  createPlayer() {
    this.player = new Player()
    this.container.appendChild(this.player.element)
  }

  createCoin(n) {
    for (let i = 0; i < n; i++) {
      const coin = new Coin(this.world)
      this.coins.push(coin)
      this.container.appendChild(coin.element)
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
    this.restartGame()

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

  restartGame() {
    this.restartBtn.addEventListener('click', () => this.restartGame())
  }

  update() {
      this.handleInput(this.keys, this)
      // this.handleWorldLoop()
      this.checkCollisions()
      this.light.updateLight(this.player)
      this.updateCoins()
      // this.playerPosition() // Activar si quieres ver en consola donde está el player
      this.world.updateWorld(this.container)
      
      requestAnimationFrame(() => this.update())
  }

  updateCoins() {
    this.coins.forEach(coin => coin.updatePosition())
  }

  updateScore() {
    this.score--
    this.scoreValue.textContent = this.score
  }

  checkCollisions() {
    this.coins.forEach((coin, index) => {
      const collided = this.player.collisionWith(coin, this.world.worldOffsetX, this.world.worldOffsetY)
      
      if (collided) {
        this.container.removeChild(coin.element)
        this.coins.splice(index, 1)
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
    if (keys['ArrowRight'] || keys['d'] ) this.world.worldOffsetX -= this.player.speed;
    if (keys['ArrowLeft'] || keys['a']) this.world.worldOffsetX += this.player.speed;
    if (keys['ArrowUp'] || keys['w']) this.world.worldOffsetY += this.player.speed;
    if (keys['ArrowDown'] || keys['s']) this.world.worldOffsetY -= this.player.speed;
  }
}

const game = new Game()