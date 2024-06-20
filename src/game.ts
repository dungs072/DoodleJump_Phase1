import Engine from './game-engine/Engine'
import GameController from './doodle-jump-game/mechanism/GameController'

class Game {
    private engineGame: Engine
    // you can create multiple scenes
    constructor() {
        this.engineGame = new Engine(640, 600)
        this.engineGame.createScene('GamePlay')
        new GameController(this.engineGame.getCanvas())
    }
}
// Start the game
new Game()
