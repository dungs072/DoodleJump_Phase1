import PhysicManager from './physic/PhysicManager'
import Scene from './scene/Scene'
import SceneManager from './scene/SceneManager'
import ButtonManager from './base-types/ui/base/ButtonManager'
import Vector2 from './base-types/Vector2'

class Engine {
    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D

    private lastRenderTime: number

    private sceneManager: SceneManager

    constructor(width: number, height: number) {
        this.canvas = document.createElement('canvas') as HTMLCanvasElement
        this.context = this.canvas.getContext('2d')!

        this.canvas.width = width
        this.canvas.height = height
        this.lastRenderTime = 0
        document.body.appendChild(this.canvas)
        this.start()
    }

    private start(): void {
        this.createScene('Default')
        this.setEvents()
        this.gameLoop()
    }
    public createScene(sceneName: string) {
        this.sceneManager = SceneManager.getInstance()
        let defaultScene = new Scene(sceneName)
        this.sceneManager.addScene(defaultScene.getSceneName(), defaultScene)
        this.sceneManager.toggleSceneOn(sceneName)
    }

    private gameLoop(): void {
        const currentTime = performance.now()
        const deltaTime = (currentTime - this.lastRenderTime) / 1000
        this.lastRenderTime = currentTime
        this.clearCanvas()

        this.update(deltaTime)
        this.render()

        requestAnimationFrame(() => this.gameLoop())
    }
    private update(deltaTime: number): void {
        PhysicManager.getInstance().handleCorePhysic(deltaTime)
        let scene = this.sceneManager.getCurrentActiveScene()
        scene.update(deltaTime)
    }
    private render() {
        this.clearCanvas()
        let scene = this.sceneManager.getCurrentActiveScene()
        scene.draw(this.context)
    }
    private setEvents(): void {
        this.canvas.addEventListener('click', (event: MouseEvent) => {
            let rect = this.canvas.getBoundingClientRect()
            let x = event.clientX - rect.left
            let y = event.clientY - rect.top
            ButtonManager.getInstance().onClick(new Vector2(x, y))
        })
    }
    public getCanvas(): HTMLCanvasElement {
        return this.canvas
    }

    private clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}
export default Engine
