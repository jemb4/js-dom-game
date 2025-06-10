class Game {
    constructor() {
        this.container = document.getElementById('game-container')
        this.scoreElement = document.getElementById('score')
        this.endGame = document.getElementById('end-game')
        this.blur = document.getElementById('blur')
        this.restartBtn = document.getElementById('restart-game')

        this.player = null
        this.coins = []
        this.light = null
        this.score = 0
        this.keys = {}
        this.worldOffsetX = 0
        this.worldOffsetY = 0
        this.moving = false
        this.gameOver = false

        this.createScenario()
        this.addEvents()
    }

    
}

class Light {
    constructor() {
        this.mouseX = 480
        this.mouseX = 270

        this.darkness = document.createElement('div')
        this.darkness.id = 'darkness'
        this.container.appendChild(this.darkness)

        this.container.addEventListener
    }
}

class Player {
    constructor() {
        this.x = 455
        this.y = 245
        this.width = 30
        this.height = 30
        this.speed = 5
        
        this.element = document.createElement('div')
        this.element.classList.add('player')

        this.updatePosition()
    }
}

class Coin {
    constructor(maxW, maxH) {
        this.x = Math.random() * maxW
        this.y = Math.random() * maxH
        this.width = 30
        this.height = 30
        this.element = document.createElement('div')
        this.element.classList.add('coin')
    }
}

const game = new Game()