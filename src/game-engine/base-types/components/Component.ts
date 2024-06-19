import GameObject from '../GameObject'
import Vector2 from '../Vector2'

class Component {
    protected isActive: boolean
    private gameObject: GameObject | undefined
    constructor() {
        this.isActive = true
    }
    public getActive(): boolean {
        return this.isActive
    }
    public setActive(state: boolean): void {
        this.isActive = state
    }
    public getGameObject(): GameObject | undefined {
        return this.gameObject
    }
    public setGameObject(gameObject: GameObject | undefined): void {
        this.gameObject = gameObject
    }
    public draw(context: CanvasRenderingContext2D, position: Vector2): void {}
}
export default Component
