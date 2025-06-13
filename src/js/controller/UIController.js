import { UIEntity } from "../models/UIEntity.js";
import GameSettings from "../config/GameSettings.js"

export class UIController {

    init() {
        UIEntity.initUI(GameSettings.score)
    }
}