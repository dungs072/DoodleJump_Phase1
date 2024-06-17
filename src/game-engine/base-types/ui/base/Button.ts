import Sprite from '../../2d/Sprite'
import Vector2 from '../../Vector2'
import Publisher from '../../../../doodle-jump-game/patterns/observer/Publisher'
import FontManager from './FontManager'
import UIElement from './UIElement'
import SubcriberInterface from '../../../../doodle-jump-game/types/observer/subcriber'

class Button extends UIElement {
    private text: string
    private textColor: string
    private publisher: Publisher<string>
    constructor(
        position: Vector2,
        scale: Vector2,
        text: string,
        textColor: string,
        background: Sprite
    ) {
        super(position, scale, background)
        this.text = text
        this.textColor = textColor
        this.publisher = new Publisher()
    }

    public draw(context: CanvasRenderingContext2D): void {
        super.draw(context)

        context.fillStyle = this.textColor
        context.font = FontManager.Arial
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillText(
            this.text,
            this.getPosition().x + this.getScale().x / 2,
            this.getPosition().y + this.getScale().y / 2
        )
        context.strokeStyle = '#008000'
        context.strokeRect(
            this.getPosition().x,
            this.getPosition().y,
            this.getScale().x,
            this.getScale().y
        )
    }
    public subcribe(subcriber: SubcriberInterface<string>): void {
        this.publisher.subcribe(subcriber)
    }
    public unSubcribe(subcriber: SubcriberInterface<string>): void {
        this.publisher.unsubcribe(subcriber)
    }
    public onClick(): void {
        this.publisher.setData(this.text)
        this.publisher.notify()
    }
}
export default Button
