import Vector2 from '../../Vector2'
import Component from '../Component'

class Sprite extends Component {
    private image: HTMLImageElement | undefined
    constructor(image?: HTMLImageElement) {
        super()
        this.image = image
    }

    public draw(context: CanvasRenderingContext2D, position: Vector2) {
        if (!this.isActive) {
            return
        }
        if (this.image) {
            context.drawImage(this.image, position.x, position.y)
        }
    }

    public setImage(image: HTMLImageElement): void {
        this.image = image
    }
}
export default Sprite
