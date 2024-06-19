import GameState from '../states/GameState'
import SubcriberInterface from '../types/observer/subcriber'
import UIManager from '../ui/UIManager'
import GameStateHandler from './GameStateHandler'

class GameMenu implements SubcriberInterface<string> {
    private gameStateHandler: GameStateHandler
    constructor(gameStateHandler: GameStateHandler) {
        this.gameStateHandler = gameStateHandler
    }
    // change the way it works here
    receive(data: string): void {
        UIManager.getInstance().toggleMainMenu(true)
        UIManager.getInstance().toggleGameOver(false)
        this.gameStateHandler.setGameState(GameState.MAIN_MENU)
    }
}
export default GameMenu
