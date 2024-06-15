import Sprite from '../base-types/Sprite'
import Vector2 from '../base-types/Vector2'
import Button from './base/Button'
import UIElement from './base/UIElement'
import ButtonManager from './ButtonManager'

class GameOverMenuUI extends UIElement {
    private playAgainButton: Button
    private menuButton: Button
    constructor(position: Vector2, scale: Vector2, background: Sprite) {
        super(position, scale, background)
    }
    public setPlayAgainButton(button: Button): void {
        this.playAgainButton = button
        ButtonManager.getInstance().addButton(this.playAgainButton)
    }
    public setMenuButton(button: Button): void {
        this.menuButton = button
        ButtonManager.getInstance().addButton(this.menuButton)
    }
    public draw(context: CanvasRenderingContext2D): void {
        super.draw(context)
        this.playAgainButton.draw(context)
        this.menuButton.draw(context)
    }
}
export default GameOverMenuUI
