import Sprite from '../render/Sprite'
import Vector2 from '../../Vector2'
import FontManager from '../../ui/base/FontManager'
import GameObject from '../../GameObject'
import ButtonManager from '../../ui/base/ButtonManager'

class Button extends Sprite {
    private text: string
    private textColor: string
    constructor(gameObject: GameObject, text: string, textColor: string, background: string) {
        super(gameObject, background)
        this.text = text
        this.textColor = textColor
        ButtonManager.getInstance().addButton(this)
    }

    public draw(context: CanvasRenderingContext2D, position: Vector2): void {
        super.draw(context, position)

        context.fillStyle = this.textColor
        context.font = FontManager.Arial
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillText(this.text, position.x, position.y)
        // context.strokeStyle = '#008000'
        // let transform = this.getGameObject()?.getComponent(Transform)
        // if (transform) {
        //     context.strokeRect(
        //         position.x,
        //         position.y,
        //         transform.getScale().x,
        //         transform.getScale().y
        //     )
        // }
    }

    private callback: () => void
    public subscribe(subscriber: () => void): void {
        this.callback = subscriber
    }
    public onClick(): void {
        this.callback()
    }
}
export default Button
