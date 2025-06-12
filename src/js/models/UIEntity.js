export class UIEntity {
  static container = document.getElementById("game-container");

  constructor() {}

  /**
   *
   */
  static initUI() {
    this.addUI()
    this.addRemainBox()
    this.addCoinBox()
    return this;
  }

  static addUI() {
    this.uiElement = document.createElement('div')
    this.uiElement.classList.add('UI')
    
    this.container.appendChild(this.uiElement)    
  }

  static addRemainBox() {
    this.scoreBox = document.createElement("div");
    this.scoreBox.setAttribute("id", "ui-score");
    this.scoreBox.textContent = "Remain: 3";

    this.uiElement.appendChild(this.scoreBox)
  }

  static addCoinBox() {
    this.rightColumn = document.createElement('div')
    this.rightColumn.classList.add('ui-right-column')

    this.uiElement.appendChild(this.rightColumn)
  }

  /**
   * 
   */
  static setScoreBox(coinsQuantity) {
    console.log('10');
    
  }
}
