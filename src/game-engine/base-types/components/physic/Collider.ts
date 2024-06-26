import EventDispatcher from '../../../event/EventDispatcher'
import GameObject from '../../GameObject'
import Vector2 from '../../Vector2'
import Component from '../Component'

class Collider extends Component {
    public static dispatcher: EventDispatcher = new EventDispatcher()
    private topLeftBound: Vector2
    private downRightBound: Vector2
    private offset: number
    private isTrigger: boolean
    private isStatic: boolean
    constructor(gameObject: GameObject) {
        super(gameObject)
        this.isTrigger = false
    }

    public setTopLeftBound(topLeft: Vector2): void {
        this.topLeftBound = topLeft
    }
    public setDownRightBound(downRight: Vector2): void {
        this.downRightBound = downRight
    }
    public setBounds(topLeft: Vector2, downRight: Vector2): void {
        this.topLeftBound = topLeft
        this.downRightBound = downRight
    }
    public getTopLeftBound(): Vector2 {
        return this.topLeftBound
    }
    public getDownRightBound(): Vector2 {
        return this.downRightBound
    }
    public setIsTrigger(state: boolean): void {
        this.isTrigger = state
    }
    public getIsTrigger(): boolean {
        return this.isTrigger
    }
    public setIsStatic(state: boolean): void {
        this.isStatic = state
        const gameObj = this.getGameObject()
        if (gameObj) {
            if (state) {
                Collider.dispatcher.dispatchEvent('static', gameObj)
            } else {
                Collider.dispatcher.dispatchEvent('nonstatic', gameObj)
            }
        }
    }
    public removePhysic(): void {
        if (this.isStatic) {
            Collider.dispatcher.dispatchEvent('removeStatic', this.getGameObject())
        } else {
            Collider.dispatcher.dispatchEvent('removeNonStatic', this.getGameObject())
        }
    }
    public getIsStatic(): boolean {
        return this.isStatic
    }

    public hasCollision(other: Collider): boolean {
        if (this.isActive && !this.isTrigger) {
            const overlapX =
                this.topLeftBound.x < other.topLeftBound.x + other.downRightBound.x &&
                this.topLeftBound.x + this.downRightBound.x > other.topLeftBound.x

            const overlapY =
                this.topLeftBound.y < other.topLeftBound.y + other.downRightBound.y &&
                this.topLeftBound.y + this.downRightBound.y > other.topLeftBound.y
            return overlapX && overlapY
        }
        return false
    }

    public draw(context: CanvasRenderingContext2D): void {
        // if (!this.isActive) {
        //     return
        // }
        // context.strokeStyle = '#008000'
        // context.strokeRect(
        //     this.topLeftBound.x,
        //     this.topLeftBound.y,
        //     this.downRightBound.x,
        //     this.downRightBound.y
        // )
    }
    public setOffset(offset: number): void {
        this.offset = offset
    }
    public getOffset(): number {
        return this.offset
    }
}
export default Collider
