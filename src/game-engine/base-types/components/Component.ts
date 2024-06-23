import GameObject from '../GameObject'
import Vector2 from '../Vector2'

class Component {
    protected isActive: boolean
    private gameObject: GameObject | undefined
    constructor(gameObject: GameObject) {
        this.isActive = true
        this.gameObject = gameObject
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
    public removeGameObject(): void {
        this.gameObject = undefined
    }
    public draw(context: CanvasRenderingContext2D, position: Vector2): void {}
}
export default Component
