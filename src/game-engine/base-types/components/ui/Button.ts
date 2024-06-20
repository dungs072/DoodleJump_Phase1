import Sprite from '../render/Sprite'
import Vector2 from '../../Vector2'
import Publisher from '../../../../doodle-jump-game/patterns/observer/Publisher'
import FontManager from '../../ui/base/FontManager'
import UIElement from './UIElement'
import SubcriberInterface from '../../../../doodle-jump-game/types/observer/subcriber'
import Transform from '../Transform'

class Button extends UIElement {
    private text: string
    private textColor: string
    private publisher: Publisher<string>
    constructor(text: string, textColor: string, background: Sprite) {
        super(background)
        this.text = text
        this.textColor = textColor
        this.publisher = new Publisher()
    }

    public draw(context: CanvasRenderingContext2D, position: Vector2): void {
        super.draw(context, position)

        context.fillStyle = this.textColor
        context.font = FontManager.Arial
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillText(this.text, position.x, position.y)
        context.strokeStyle = '#008000'
        let transform = this.getGameObject()?.getComponent(Transform)
        if (transform) {
            context.strokeRect(
                position.x,
                position.y,
                transform.getScale().x,
                transform.getScale().y
            )
        }
    }
    public subcribe(subcriber: SubcriberInterface<string>): void {
        this.publisher.subscribe(subcriber)
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
