import GameObject from '../GameObject'
import Vector2 from '../Vector2'

class Component {
    protected isActive: boolean
    private gameObject: GameObject
    constructor() {
        this.isActive = true
    }
    public getActive(): boolean {
        return this.isActive
    }
    public setActive(state: boolean): void {
        this.isActive = state
    }
    public getGameObject(): GameObject {
        return this.gameObject
    }
    public setGameObject(gameObject: GameObject): void {
        this.gameObject = gameObject
    }
    public draw(context: CanvasRenderingContext2D, position: Vector2): void {}
}
export default Component
