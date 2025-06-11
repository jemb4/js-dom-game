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

    this.messageBox = document.createElement('div')
    this.messageBox.classList.add('ui-message')
    this.messageBox.textContent = 'Ready?'

    const rightColumn = document.createElement('div')
    rightColumn.classList.add('ui-right-column')
    rightColumn.append(this.messageBox)

    this.element.append(this.scoreBox, rightColumn)
  }
}