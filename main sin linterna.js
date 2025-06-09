class Game {
  constructor () {
    this.container = document.getElementById('game-container')
    this.scoreElement = document.getElementById('score')
    this.player = null
    this.coins = []
    this.score = 0
    this.keys = {}
    this.worldOffsetX = 0
    this.worldOffsetY = 0
    this.moving = false

    this.createScenario()
    this.addEvents()
  }

  createScenario() {
    this.player = new Player()
    this.container.appendChild(this.player.element)

    for (let i = 0; i < 10; i++) {
      const coin = new Coin()
      this.coins.push(coin)
      this.container.appendChild(coin.element)
    }
    this.wallRight = this.createWall('wall-vertical')
    this.wallLeft = this.createWall('wall-vertical')
    this.wallTop = this.createWall('wall-horizontal')
    this.wallBottom = this.createWall('wall-horizontal')
  }

    
  createWall(className) {
    const wall = document.createElement('div')
    wall.classList.add(className)
    wall.style.display = 'none'
    this.container.appendChild(wall)
    return wall
  }

  addEvents() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.key] = true
      this.moving = true
    })
    window.addEventListener('keyup', (e) => {
      this.keys[e.key] = false
      this.moving = false
    })
    
    const update = () => {
      this.player.handleInput(this.keys, this)
      this.handleWorldLoop()
      this.updateWorldObjects()
      this.player.updatePosition()
      this.checkCollisions()

      // Activar si quieres ver en consola donde está el player
      if (this.moving){
        const playerX = -this.worldOffsetX + this.player.x
        const playerY = -this.worldOffsetY + this.player.y
        console.log(`Jugador en coordenadas del mundo: X=${playerX}, Y=${playerY}`)
      }

      requestAnimationFrame(update)
    }
    
    update()
  }

  handleWorldLoop() {
    const maxWorldWidth = 1100
    const maxWorldHeight = 900

    this.wallRight.style.display = 'none';
    this.wallLeft.style.display = 'none';
    this.wallTop.style.display = 'none';
    this.wallBottom.style.display = 'none';

    if (this.worldOffsetX <= -maxWorldWidth) {
      this.worldOffsetX = -maxWorldWidth;
      this.wallRight.style.left = `${this.player.x + this.player.width}px`;
      this.wallRight.style.top = `0px`;
      this.wallRight.style.display = 'block';
    } else if (this.worldOffsetX >= maxWorldWidth) {
      this.worldOffsetX = maxWorldWidth;
      this.wallLeft.style.left = `${this.player.x - 50}px`;
      this.wallLeft.style.top = `0px`;
      this.wallLeft.style.display = 'block';
    }

    if (this.worldOffsetY <= -maxWorldHeight) {
      this.worldOffsetY = -maxWorldHeight;
      this.wallBottom.style.top = `${this.player.y + this.player.height}px`;
      this.wallBottom.style.left = `0px`;
      this.wallBottom.style.display = 'block';
    } else if (this.worldOffsetY >= maxWorldHeight) {
      this.worldOffsetY = maxWorldHeight;
      this.wallTop.style.top = `${this.player.y - 50}px`;
      this.wallTop.style.left = `0px`;
      this.wallTop.style.display = 'block';
    }
  }

  updateWorldObjects() {
    this.coins.forEach((coin) => {
      coin.element.style.left = `${coin.x + this.worldOffsetX}px`
      coin.element.style.top = `${coin.y + this.worldOffsetY}px`
    })
  }

  checkCollisions() {
    this.coins.forEach((coin, index) => {
      if (this.player.collisionWith(coin, this.worldOffsetX, this.worldOffsetY)) {
        this.container.removeChild(coin.element)
        this.coins.splice(index, 1)
        this.updateScore(10)
      }
    })
  }

  updateScore(score) {
    this.score += score
    this.scoreElement.textContent = `Puntos: ${this.score}`
  }
}

class Player {
  constructor() {
    this.x = 455
    this.y = 245
    this.width = 50
    this.height = 50
    this.speed = 5
    this.jumping = false

    this.element = document.createElement('div')
    this.element.classList.add('player')

    this.updatePosition()
  }

  handleInput(keys, game) {
    if (keys['ArrowRight'] || keys['d'] ) game.worldOffsetX -= this.speed;
    if (keys['ArrowLeft'] || keys['a']) game.worldOffsetX += this.speed;
    if (keys['ArrowUp'] || keys['w']) game.worldOffsetY += this.speed;
    if (keys['ArrowDown'] || keys['s']) game.worldOffsetY -= this.speed;
  }


  updatePosition() {
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
    );
  }
}

class Coin {
  constructor() {
    this.x = Math.random() * (1555 + 645) - 645;
    this.y = Math.random() * (1145 + 655) - 655;
    this.width = 30;
    this.height = 30;
    this.element = document.createElement("div");
    this.element.classList.add("coin");
  }
}

const game = new Game();