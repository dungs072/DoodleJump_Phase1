import GameObject from '../base-types/GameObject'
import EventDispatcher from '../event/EventDispatcher'
import RenderInterface from '../types/render'
import SystemInterface from '../types/system'

class Scene implements SystemInterface, RenderInterface {
    private name: string
    private gameObjects: GameObject[]
    private isActive: boolean
    constructor(name: string) {
        this.gameObjects = []
        this.name = name
    }

    public start(): void {
        this.gameObjects.forEach((gameObject) => {
            gameObject.start()
        })
    }
    public update(deltaTime: number): void {
        for (let i = this.gameObjects.length - 1; i >= 0; i--) {
            if (this.gameObjects[i].getCanDestroy()) {
                this.gameObjects.splice(i)
            } else {
                this.gameObjects[i].update(deltaTime)
            }
        }
    }
    public draw(context: CanvasRenderingContext2D): void {
        this.gameObjects.forEach((gameObject) => {
            if (!gameObject.getCanDestroy() && gameObject.getActive()) {
                gameObject.draw(context)
            }
        })
    }
    public setActive(state: boolean): void {
        this.isActive = state
    }

    public getIsActive(): boolean {
        return this.isActive
    }
    public getSceneName(): string {
        return this.name
    }
    public setSceneName(name: string): void {
        this.name = name
    }
    public addGameObject(gameObj: GameObject): void {
        this.gameObjects.push(gameObj)
        this.gameObjects.sort((a, b) => b.getLayer() - a.getLayer())
    }
    public removeGameObject(gameObj: GameObject): void {
        let index = this.gameObjects.indexOf(gameObj)
        this.gameObjects.splice(index, 1)
    }
}
export default Scene
