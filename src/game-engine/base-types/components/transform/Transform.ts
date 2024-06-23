import GameObject from '../../GameObject'
import Component from '../Component'
import Vector2 from '../../Vector2'

class Transform extends Component {
    private position: Vector2
    private localPosition: Vector2
    private scale: Vector2

    constructor(gameObject: GameObject) {
        super(gameObject)
        this.position = new Vector2(0, 0)
        this.localPosition = new Vector2(0, 0)
        this.scale = new Vector2(1, 1)
    }
    public getPosition(): Vector2 {
        return this.position
    }
    public getLocalPosition(): Vector2 {
        return this.localPosition
    }
    public getScale(): Vector2 {
        return this.scale
    }

    public setPosition(position: Vector2): void {
        this.position = position
        this.getGameObject()?.setChildsPosition(position)
    }
    public setLocalPosition(position: Vector2): void {
        this.localPosition = position
    }
    public setScale(scale: Vector2): void {
        this.scale = scale
        //this.getGameObject().setChildsScale(scale)
    }
}

export default Transform
