import Sprite from '../../game-engine/base-types/2d/Sprite'
import Vector2 from '../../game-engine/base-types/Vector2'
import Button from '../../game-engine/base-types/ui/base/Button'
import UIElement from '../../game-engine/base-types/ui/base/UIElement'
import ButtonManager from './ButtonManager'
import Text from '../../game-engine/base-types/ui/base/Text'

class GameOverMenuUI extends UIElement {
    private playAgainButton: Button
    private menuButton: Button
    private currentScoreText: Text
    private highScoreText: Text
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
    public setCurrentScoreText(text: Text): void {
        this.currentScoreText = text
    }
    public setHighScoreText(text: Text): void {
        this.highScoreText = text
    }
    public draw(context: CanvasRenderingContext2D): void {
        super.draw(context)
        this.playAgainButton.draw(context)
        this.menuButton.draw(context)
        this.currentScoreText.draw(context)
        this.highScoreText.draw(context)
    }
    public setIsActive(state: boolean): void {
        super.setIsActive(state)
        this.playAgainButton.setIsActive(state)
        this.menuButton.setIsActive(state)
    }
    public setHighScore(num: number): void {
        this.highScoreText.setText('High score: ' + num.toString())
    }
    public setCurrentScore(num: number): void {
        this.currentScoreText.setText('Current score: ' + num.toString())
    }
}
export default GameOverMenuUI
