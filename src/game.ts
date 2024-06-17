import Vector2 from './game-engine/base-types/Vector2'
import PhysicManager from './game-engine/physic/PhysicManager'
import ButtonManager from './doodle-jump-game/ui/ButtonManager'
import GameController from './doodle-jump-game/mechanism/GameController'
class Game {
    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D

    private gameController: GameController

    private lastRenderTime: number

    constructor() {
        this.canvas = document.createElement('canvas') as HTMLCanvasElement
        this.context = this.canvas.getContext('2d')!

        this.canvas.width = 640
        this.canvas.height = 600
        this.lastRenderTime = 0
        document.body.appendChild(this.canvas)
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

    private gameLoop(): void {
        const currentTime = performance.now()
        const deltaTime = (currentTime - this.lastRenderTime) / 1000
        this.lastRenderTime = currentTime
        this.clearCanvas()

        // write code here
        this.update(deltaTime)
        this.render()

        // write code here
        requestAnimationFrame(() => this.gameLoop())
    }
    private update(deltaTime: number): void {
        PhysicManager.getInstance().handleCorePhysic(deltaTime)
        this.gameController.update(deltaTime)
    }
    private render() {
        this.clearCanvas()
        this.gameController.draw(this.context)
    }

    private clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}
// Start the game
const game = new Game()
