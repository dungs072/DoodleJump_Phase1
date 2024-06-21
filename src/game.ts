import Engine from './game-engine/Engine'
import GameController from './doodle-jump-game/mechanism/GameController'
import Vector2 from './game-engine/base-types/Vector2'
import ResourcesLoader from './doodle-jump-game/resource/ResourcesLoader'

class Game {
    private engineGame: Engine
    // you can create multiple scenes
    constructor() {
        new ResourcesLoader()
        let screenSize = new Vector2(640, 600)

        this.engineGame = new Engine(screenSize.x, screenSize.y)
        this.engineGame.createScene('GamePlay')
        new GameController(screenSize)
    }
}
// Start the game
new Game()
