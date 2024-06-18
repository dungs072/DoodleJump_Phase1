import Engine from './game-engine/Engine'
import GameController from './doodle-jump-game/mechanism/GameController'

class Game {
    private gameController: GameController

    private engineGame: Engine
    // default scene name: 'Default'
    // you can create multiple scenes
    constructor() {
        this.engineGame = new Engine(640, 600)
        this.gameController = new GameController(this.engineGame.getCanvas())
    }
}
// Start the game
const game = new Game()
