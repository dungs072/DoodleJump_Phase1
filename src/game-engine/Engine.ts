import PhysicManager from './physic/PhysicManager'
import Scene from './scene/Scene'
import SceneManager from './scene/SceneManager'

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
        this.gameLoop()
    }
    public createScene(sceneName: string) {
        this.sceneManager = new SceneManager()
        let defaultScene = new Scene(sceneName)
        this.sceneManager.addScene(defaultScene.getSceneName(), defaultScene)
        this.sceneManager.toggleSceneOn(sceneName)
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
        let scene = this.sceneManager.getCurrentActiveScene()
        scene.update(deltaTime)
    }
    private render() {
        this.clearCanvas()
        let scene = this.sceneManager.getCurrentActiveScene()
        scene.draw(this.context)
    }

    private clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}
export default Engine
