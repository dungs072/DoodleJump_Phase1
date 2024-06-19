import GameObject from '../base-types/GameObject'
import RenderInterface from '../types/render'
import SystemInterface from '../types/system'

class Scene implements SystemInterface, RenderInterface {
    private name: string
    private gameObjects: GameObject[]
    private stickyGameObjects: GameObject[]
    private isActive: boolean
    private canvasMoveX: number
    private canvasMoveY: number
    constructor(name: string) {
        this.gameObjects = []
        this.stickyGameObjects = []
        this.name = name
        this.canvasMoveX = 0
        this.canvasMoveY = 0
    }

    public start(): void {
        this.gameObjects.forEach((gameObject) => {
            gameObject.start()
        })
    }
    public update(deltaTime: number): void {
        for (let i = this.gameObjects.length - 1; i >= 0; i--) {
            if (this.gameObjects[i]) {
                if (!this.gameObjects[i].getCanDestroy()) {
                    this.gameObjects[i].update(deltaTime)
                }
            } else {
                this.gameObjects.splice(i)
            }
        }
        for (let i = this.stickyGameObjects.length - 1; i >= 0; i--) {
            if (this.stickyGameObjects[i]) {
                if (!this.stickyGameObjects[i].getCanDestroy()) {
                    this.stickyGameObjects[i].update(deltaTime)
                }
            } else {
                this.stickyGameObjects.splice(i)
            }
        }
        //console.log(this.gameObjects.length)
    }
    public draw(context: CanvasRenderingContext2D): void {
        // draw background here
        context.save()
        this.stickyGameObjects.forEach((gameObject) => {
            if (gameObject) {
                if (!gameObject.getCanDestroy() && gameObject.getActive()) {
                    gameObject.draw(context)
                }
            }
        })
        context.translate(this.canvasMoveX, this.canvasMoveY)
        this.gameObjects.forEach((gameObject) => {
            if (!gameObject.getCanDestroy() && gameObject.getActive()) {
                gameObject.draw(context)
            }
        })
        context.restore()
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
        // change here to decrease time complexity
        this.gameObjects.sort((a, b) => b.getLayer() - a.getLayer())
    }
    public addStickyGameObject(gameObj: GameObject): void {
        this.stickyGameObjects.push(gameObj)
        // change here to decrease time complexity
        this.stickyGameObjects.sort((a, b) => b.getLayer() - a.getLayer())
    }
    public removeGameObject(gameObj: GameObject): void {
        gameObj.setCanDestroy(true)
        let index = this.gameObjects.indexOf(gameObj)
        this.gameObjects.splice(index, 1)
    }
    public removeStickyGameObject(gameObj: GameObject): void {
        gameObj.setCanDestroy(true)
        let index = this.gameObjects.indexOf(gameObj)
        this.stickyGameObjects.splice(index, 1)
    }
    public setCanvasMoveX(value: number): void {
        this.canvasMoveX = value
    }
    public setCanvasMoveY(value: number): void {
        this.canvasMoveY = value
    }
}
export default Scene
