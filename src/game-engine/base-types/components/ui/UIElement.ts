import Sprite from '../render/Sprite'
import Vector2 from '../../Vector2'
import Component from '../Component'
import Transform from '../Transform'
class UIElement extends Component {
    private background: Sprite | null
    constructor(background: Sprite | null) {
        super()
        if (background != null) {
            this.background = background
        }
    }
    public draw(context: CanvasRenderingContext2D, position: Vector2): void {
        if (!this.isActive) {
            return
        }
        if (this.background != null) {
            let newPosition = new Vector2(position.x, position.y)
            this.background.draw(context, newPosition)
        }
    }
    public setIsActive(state: boolean): void {
        this.isActive = state
    }
    public getIsActive(): boolean {
        return this.isActive
    }
}
export default UIElement
