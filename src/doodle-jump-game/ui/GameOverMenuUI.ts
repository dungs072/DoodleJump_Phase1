import Sprite from '../../game-engine/base-types/components/render/Sprite'
import Vector2 from '../../game-engine/base-types/Vector2'
import Button from '../../game-engine/base-types/components/ui/Button'
import UIElement from '../../game-engine/base-types/components/ui/UIElement'
import ButtonManager from '../../game-engine/base-types/ui/base/ButtonManager'
import Text from '../../game-engine/base-types/components/ui/Text'
import ButtonGameObject from '../../game-engine/base-types/ui/my-ui/ButtonGameObject'
import TextGameObject from '../../game-engine/base-types/ui/my-ui/TextGameObject'
import GameObject from '../../game-engine/base-types/GameObject'
import Transform from '../../game-engine/base-types/components/Transform'

class GameOverMenuUI extends GameObject {
    private playAgainButton: ButtonGameObject
    private menuButton: ButtonGameObject
    private currentScoreText: TextGameObject
    private highScoreText: TextGameObject
    private panel: UIElement
    constructor(position: Vector2, scale: Vector2, background: Sprite) {
        super(true)
        this.transform.setPosition(position)
        this.transform.setScale(scale)
        this.panel = new UIElement(background)
        this.addComponent(this.panel)
        this.playAgainButton = new ButtonGameObject()
        this.playAgainButton.getComponent(Transform)?.setLocalPosition(new Vector2(280, 350))
        this.playAgainButton.getComponent(Transform)?.setScale(new Vector2(224, 82))
        this.menuButton = new ButtonGameObject()
        this.menuButton.getComponent(Transform)?.setLocalPosition(new Vector2(350, 500))
        this.menuButton.getComponent(Transform)?.setScale(new Vector2(224, 82))
        this.currentScoreText = new TextGameObject(true)
        this.currentScoreText.getComponent(Transform)?.setLocalPosition(new Vector2(200, 150))
        this.highScoreText = new TextGameObject(true)
        this.highScoreText.getComponent(Transform)?.setLocalPosition(new Vector2(200, 200))
        this.addChild(this.playAgainButton)
        this.addChild(this.menuButton)
        this.addChild(this.currentScoreText)
        this.addChild(this.highScoreText)
    }
    public setPlayAgainButton(button: Button): void {
        this.playAgainButton.setButton(button)
        ButtonManager.getInstance().addButton(button)
    }
    public setMenuButton(button: Button): void {
        this.menuButton.setButton(button)
        ButtonManager.getInstance().addButton(button)
    }
    public setCurrentScoreText(text: Text): void {
        this.currentScoreText.setText(text)
    }
    public setHighScoreText(text: Text): void {
        this.highScoreText.setText(text)
    }
    // public draw(context: CanvasRenderingContext2D): void {
    //     super.draw(context)
    //     this.playAgainButton.draw(context)
    //     this.menuButton.draw(context)
    //     this.currentScoreText.draw(context)
    //     this.highScoreText.draw(context)
    // }
    // public setIsActive(state: boolean): void {
    //     super.setIsActive(state)
    //     this.playAgainButton.setIsActive(state)
    //     this.menuButton.setIsActive(state)
    // }
    public setHighScore(num: number): void {
        this.highScoreText.getText().setTextDisplay('High score: ' + num.toString())
    }
    public setCurrentScore(num: number): void {
        this.currentScoreText.getText().setTextDisplay('Current score: ' + num.toString())
    }
}
export default GameOverMenuUI
