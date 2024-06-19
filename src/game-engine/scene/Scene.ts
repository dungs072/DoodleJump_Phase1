import GameObject from '../base-types/GameObject'
import EventDispatcher from '../event/EventDispatcher'
import RenderInterface from '../types/render'
import SystemInterface from '../types/system'

class Scene implements SystemInterface, RenderInterface {
    private name: string
    private gameObjects: GameObject[]
    private isActive: boolean
    private canMoveUp: boolean
    private canvasHeight: number
    private heightObject: number
    constructor(name: string) {
        this.gameObjects = []
        this.name = name
        this.canMoveUp = false
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
        //console.log(this.gameObjects.length)
    }
    public draw(context: CanvasRenderingContext2D): void {
        // draw background here
        context.save()
        //UIManager.getInstance().getScore().draw(context)
        if (this.canMoveUp) {
            if (this.heightObject < this.canvasHeight / 2) {
                context.translate(0, this.canvasHeight / 2 - this.heightObject)
            }
        }
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
    public removeGameObject(gameObj: GameObject): void {
        gameObj.setCanDestroy(true)
        let index = this.gameObjects.indexOf(gameObj)
        this.gameObjects.splice(index, 1)
    }
    public setCanvasHeight(canvasHeight: number): void {
        this.canvasHeight = canvasHeight
    }
    public setHeightObject(num: number): void {
        this.heightObject = num
    }
    public setCanMoveUp(state: boolean): void {
        this.canMoveUp = state
    }
}
export default Scene
