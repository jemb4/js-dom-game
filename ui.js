export class UI {
  constructor() {
    this.uiConf()
  }

  uiConf() {
    this.element = document.createElement('div')
    this.element.classList.add('UI')

    this.scoreBox = document.createElement('div')
    this.scoreBox.setAttribute('id', 'ui-score')
    this.scoreBox.textContent = 'Remain: 3'

    this.rightColumn = document.createElement('div')
    this.rightColumn.classList.add('ui-right-column')

    this.element.append(this.scoreBox, this.rightColumn)

    this.coinBoxes = new Map()
  }

  addCoinUI(coinId) {
    const coinBox = document.createElement('div')
    coinBox.classList.add('coin-ui')
    coinBox.dataset.coinId = coinId
    coinBox.textContent = `Coin ${coinId}: calculating...`
    this.rightColumn.appendChild(coinBox)
    this.coinBoxes.set(coinId, coinBox)
  }

  updateCoinDistance(coinId, distance) {
    const box = this.coinBoxes.get(coinId)
    if (box) {
      box.textContent = `Coin ${coinId}: ${Math.round(distance)}px`
    }
  }

  removeCoinUI(coinId) {
    const box = this.coinBoxes.get(coinId)
    if (box) {
      box.remove()
      this.coinBoxes.delete(coinId)
    }
  }
}