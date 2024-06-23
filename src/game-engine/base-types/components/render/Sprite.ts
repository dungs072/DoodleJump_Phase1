import ResourcesManager from '../../../resources/ResourcesManager'
import GameObject from '../../GameObject'
import Vector2 from '../../Vector2'
import Component from '../Component'

class Sprite extends Component {
    private image: HTMLImageElement | null
    constructor(gameObject: GameObject, imageName?: string | undefined) {
        super(gameObject)
        if (imageName) {
            this.image = ResourcesManager.getInstance().getImage(imageName)
        }
    }

    public draw(context: CanvasRenderingContext2D, position: Vector2) {
        if (!this.isActive) {
            return
        }
        if (this.image) {
            context.drawImage(this.image, position.x, position.y)
        }
    }

    public setImage(imageName: string): void {
        this.image = ResourcesManager.getInstance().getImage(imageName)
    }
}
export default Sprite
