import Vector2 from '../Vector2'
import ComponentInterface from '../../types/component'

class Transform implements ComponentInterface {
    private position: Vector2
    private scale: Vector2

    constructor() {
        this.position = new Vector2(0, 0)
        this.scale = new Vector2(1, 1)
    }
    public getPosition(): Vector2 {
        return this.position
    }
    public getScale(): Vector2 {
        return this.scale
    }

    public setPosition(position: Vector2): void {
        this.position = position
    }
    public setScale(scale: Vector2): void {
        this.scale = scale
    }
}

export default Transform
