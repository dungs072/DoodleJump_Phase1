import Vector2 from './base-types/Vector2'
import PhysicManager from './physic/PhysicManager'
import Sprite from './base-types/Sprite'
import PathResources from './PathResources'
import ButtonManager from './ui/ButtonManager'
import GameController from './mechanism/GameController'
class Game {
    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D

    private gameController: GameController

    private lastRenderTime: number

    private backgroundSprite: Sprite

    constructor() {
        this.canvas = document.createElement('canvas') as HTMLCanvasElement
        this.context = this.canvas.getContext('2d')!

        this.canvas.width = 640
        this.canvas.height = 600
        this.lastRenderTime = 0
        document.body.appendChild(this.canvas)
        this.gameController = new GameController()
        this.start()
    }

    private start(): void {
        this.backgroundSprite = new Sprite(PathResources.BACKGROUND, new Vector2(0, 0))
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
        this.backgroundSprite.draw(this.context)
        this.gameController.draw(this.context)
    }

    private clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}
// Start the game
const game = new Game()
