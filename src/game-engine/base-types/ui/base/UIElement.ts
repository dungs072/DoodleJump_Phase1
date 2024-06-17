import GameObject from '../../GameObject'
import Sprite from '../../2d/Sprite'
import Vector2 from '../../Vector2'
import Transform from '../../components/Transform'
import RenderInterface from '../../../types/render'

class UIElement extends GameObject implements RenderInterface {
    private background: Sprite | null
    private transform: Transform
    private isActive: boolean
    constructor(position: Vector2, scale: Vector2, background: Sprite | null) {
        super()
        if (background != null) {
            this.background = background
            this.background.setPosition(position)
        }

        this.transform = this.getComponent(Transform)!
        this.transform.setPosition(position)
        this.transform.setScale(scale)
        this.isActive = true
    }
    public draw(context: CanvasRenderingContext2D): void {
        if (this.background != null) {
            this.background.draw(context)
        }
    }
    public setPosition(position: Vector2): void {
        this.background?.setPosition(position)
        this.transform.setPosition(position)
    }
    public getPosition(): Vector2 {
        return this.transform.getPosition()
    }
    public getScale(): Vector2 {
        return this.transform.getScale()
    }
    public setIsActive(state: boolean): void {
        this.isActive = state
    }
    public getIsActive(): boolean {
        return this.isActive
    }
}
export default UIElement
