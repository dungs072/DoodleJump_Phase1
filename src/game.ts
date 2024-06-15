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
        this.update()
        let fixedDeltaTime = PhysicManager.getInstance().getFixedDeltaTime()
        setInterval(() => this.fixedUpdate(), fixedDeltaTime)
    }
    private setEvents(): void {
        this.canvas.addEventListener('click', (event) => {
            let rect = this.canvas.getBoundingClientRect()
            let x = event.clientX - rect.left
            let y = event.clientY - rect.top
            ButtonManager.getInstance().onClick(new Vector2(x, y))
        })
    }

    private update(): void {
        const currentTime = performance.now()
        const deltaTime = (currentTime - this.lastRenderTime) / 1000
        this.lastRenderTime = currentTime
        this.clearCanvas()

        // write code here
        this.backgroundSprite.draw(this.context)
        this.gameController.update(deltaTime, this.context)

        // write code here
        requestAnimationFrame(() => this.update())
    }

    private fixedUpdate(): void {
        // write code relate to physics here

        // write code here
        PhysicManager.getInstance().handleCorePhysic()
    }

    private clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}
// Start the game
const game = new Game()
