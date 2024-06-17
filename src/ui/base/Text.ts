import Sprite from '../../base-types/Sprite'
import Vector2 from '../../base-types/Vector2'
import FontManager from './FontManager'
import UIElement from './UIElement'

class Text extends UIElement {
    private text: string
    private textColor: string
    private width: number
    constructor(
        position: Vector2,
        scale: Vector2,
        text: string,
        textColor: string,
        width: number,
        background: Sprite | null
    ) {
        super(position, scale, background)
        this.text = text
        this.textColor = textColor
        this.width = width
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
            this.getPosition().y + this.getScale().y / 2,
            this.width
        )
        // context.strokeStyle = '#008000'
        // context.strokeRect(
        //     this.getPosition().x,
        //     this.getPosition().y,
        //     this.getScale().x,
        //     this.getScale().y
        // )
    }
    public setText(text: string): void {
        this.text = text
    }
}
export default Text
