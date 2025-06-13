export class UIEntity {
  static container = document.getElementById("game-container");

  constructor() {}

  /**
   *
   */
  static initUI(score) {
    this.addUI()
    this.addRemainBox(score)
    this.addCoinColumn()
    return this;
  }

  static addUI() {
    this.uiElement = document.createElement('div')
    this.uiElement.classList.add('UI')
    
    this.container.appendChild(this.uiElement)    
  }

  static addRemainBox(score) {
    this.scoreBox = document.createElement("div");
    this.scoreBox.setAttribute("id", "ui-score");
    this.scoreBox.textContent = `Remain: 3`;

    this.uiElement.appendChild(this.scoreBox)
  }

  static addCoinColumn() {
    this.rightColumn = document.createElement('div')
    this.rightColumn.classList.add('ui-right-column')

    this.coinBoxes = new Map()
    this.uiElement.appendChild(this.rightColumn)
  }

  static addCoinUI (coinID) {
    const coinBox = document.createElement
    coinBox.classList.add('coin-ui')
    coinBox.dataset.coinID = coinID
    coinBox.textContent = `Coin ${coinID}: calculating...`

    this.rightColumn.appendChild(coinBox)
    this.coinBoxes.set(coinID, coinBox)
  }

  /**
   * 
   */
  static setScoreBox(score) {
    if (this.scoreBox) {
      this.scoreBox.textContent = `Remain: ${score}`
    }
  }
}
