import GameState from '../states/GameState'

class GameStateHandler {
    private gameState: GameState
    constructor() {
        this.gameState = GameState.MAIN_MENU
    }

    public getGameState(): GameState {
        return this.gameState
    }
    public setGameState(gamePlay: GameState): void {
        this.gameState = gamePlay
    }
}
export default GameStateHandler
