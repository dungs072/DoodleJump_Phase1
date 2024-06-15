import GameState from '../base-types/enums/GameState'
import SubcriberInterface from '../types/observer/subcriber'
import UIManager from '../ui/UIManager'
import GameStateHandler from './GameStateHandler'

class GameOver implements SubcriberInterface<string> {
    private gameStateHandler: GameStateHandler
    constructor(gameStateHandler: GameStateHandler) {
        this.gameStateHandler = gameStateHandler
    }
    receive(data: string): void {
        UIManager.getInstance().toggleMainMenu(false)
        UIManager.getInstance().toggleGameOver(true)
        this.gameStateHandler.setGameState(GameState.GAME_OVER)
    }
}
export default GameOver
