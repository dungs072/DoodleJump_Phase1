import Sprite from '../render/Sprite'
import Vector2 from '../../Vector2'
import FontManager from '../../ui/base/FontManager'
import UIElement from './UIElement'

class Text extends UIElement {
    private text: string
    private textColor: string
    private width: number
    constructor(text: string, textColor: string, width: number, background: Sprite | null) {
        super(background)
        this.text = text
        this.textColor = textColor
        this.width = width
    }

    public draw(context: CanvasRenderingContext2D, position: Vector2): void {
        super.draw(context, position)

        context.fillStyle = this.textColor
        context.font = FontManager.Arial
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillText(this.text, position.x, position.y, this.width)
        // context.strokeStyle = '#008000'
        // context.strokeRect(
        //     this.getPosition().x,
        //     this.getPosition().y,
        //     this.getScale().x,
        //     this.getScale().y
        // )
    }
    public setTextDisplay(text: string): void {
        this.text = text
    }
}
export default Text
