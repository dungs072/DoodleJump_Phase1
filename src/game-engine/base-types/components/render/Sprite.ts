import Vector2 from '../../Vector2'
import Component from '../Component'

class Sprite extends Component {
    private image: HTMLImageElement
    constructor(path: string) {
        super()
        this.image = new Image()
        this.image.src = path
    }

    public draw(context: CanvasRenderingContext2D, position: Vector2) {
        if (!this.isActive) {
            return
        }

        context.drawImage(this.image, position.x, position.y)
    }

    public setImage(image: HTMLImageElement): void {
        this.image = image
    }
}
export default Sprite
