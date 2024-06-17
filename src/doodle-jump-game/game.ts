import Engine from '../game-engine/Engine'
import Vector2 from '../game-engine/base-types/Vector2'
import GameController from './mechanism/GameController'
import ButtonManager from './ui/ButtonManager'

class Game {
    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D

    private gameController: GameController

    private lastRenderTime: number
    private engineGame: Engine

    constructor() {
        this.engineGame = new Engine(640, 600)
        this.gameController = new GameController(this.canvas)
        this.start()
    }

    private start(): void {
        this.setEvents()
        this.gameLoop()
    }
    private setEvents(): void {
        this.canvas.addEventListener('click', (event) => {
            let rect = this.canvas.getBoundingClientRect()
            let x = event.clientX - rect.left
            let y = event.clientY - rect.top
            ButtonManager.getInstance().onClick(new Vector2(x, y))
        })
    }

    private update(deltaTime: number): void {}
    private render() {
        this.gameController.draw(this.context)
    }
}
// Start the game
const game = new Game()
