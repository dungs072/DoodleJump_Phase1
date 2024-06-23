import PhysicManager from './physic/PhysicManager'
import Scene from './scene/Scene'
import SceneManager from './scene/SceneManager'
import ButtonManager from './base-types/ui/base/ButtonManager'
import Vector2 from './base-types/Vector2'
import ResourcesManager from './resources/ResourcesManager'

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
        this.sceneManager = SceneManager.getInstance()
        document.body.appendChild(this.canvas)
        this.start()
    }

    private start(): void {
        this.setEvents()

        this.gameLoop()
    }
    public createScene(sceneName: string): Scene {
        const scene = new Scene(sceneName)
        this.sceneManager.addScene(scene.getSceneName(), scene)
        this.sceneManager.toggleSceneOn(sceneName)
        scene.start()
        return scene
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
        const scene = this.sceneManager.getCurrentActiveScene()
        if (scene) {
            PhysicManager.getInstance().handleCorePhysic(deltaTime)
            scene.update(deltaTime)
        }
    }
    private render() {
        const scene = this.sceneManager.getCurrentActiveScene()
        if (scene) {
            scene.draw(this.context)
        }
    }
    private setEvents(): void {
        this.canvas.addEventListener('click', (event: MouseEvent) => {
            const rect = this.canvas.getBoundingClientRect()
            const x = event.clientX - rect.left
            const y = event.clientY - rect.top
            ButtonManager.getInstance().handleClick(new Vector2(x, y))
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
