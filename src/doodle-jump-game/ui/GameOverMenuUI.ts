import Sprite from '../../game-engine/base-types/components/render/Sprite'
import Vector2 from '../../game-engine/base-types/Vector2'
import Button from '../../game-engine/base-types/components/ui/Button'
import Text from '../../game-engine/base-types/components/ui/Text'
import ButtonGameObject from '../../game-engine/base-types/ui/my-ui/ButtonGameObject'
import TextGameObject from '../../game-engine/base-types/ui/my-ui/TextGameObject'
import GameObject from '../../game-engine/base-types/GameObject'
import Transform from '../../game-engine/base-types/components/transform/Transform'
import ResourcesLoader from '../resource/ResourcesLoader'

class GameOverMenuUI extends GameObject {
    private playAgainButton: ButtonGameObject
    private menuButton: ButtonGameObject
    private currentScoreText: TextGameObject
    private highScoreText: TextGameObject
    private panel: Sprite
    constructor(position: Vector2, scale: Vector2) {
        super()
        this.setLayer(1)
        this.transform.setPosition(position)
        this.transform.setScale(scale)
        this.panel = new Sprite(this, ResourcesLoader.BACKGROUND)
        this.addComponent(this.panel)
        this.playAgainButton = new ButtonGameObject()
        this.playAgainButton.getComponent(Transform)?.setLocalPosition(new Vector2(280, 350))
        this.playAgainButton.getComponent(Transform)?.setScale(new Vector2(224, 82))
        this.menuButton = new ButtonGameObject()
        this.menuButton.setLayer(-2)
        this.menuButton.getComponent(Transform)?.setLocalPosition(new Vector2(350, 500))
        this.menuButton.getComponent(Transform)?.setScale(new Vector2(224, 82))
        this.currentScoreText = new TextGameObject()
        this.currentScoreText.setLayer(-2)
        this.currentScoreText.getComponent(Transform)?.setLocalPosition(new Vector2(200, 150))
        this.highScoreText = new TextGameObject()
        this.highScoreText.setLayer(-2)
        this.highScoreText.getComponent(Transform)?.setLocalPosition(new Vector2(200, 200))
        this.addChild(this.playAgainButton)
        this.addChild(this.menuButton)
        this.addChild(this.currentScoreText)
        this.addChild(this.highScoreText)
        this.setUpUI()
    }
    private setUpUI(): void {
        const currentScoreText = new Text(
            this.currentScoreText,
            'Your score: ',
            'red',
            300,
            undefined
        )
        this.currentScoreText.setText(currentScoreText)

        const highScoreText = new Text(this.highScoreText, 'High score: ', 'red', 300, undefined)
        this.highScoreText.setText(highScoreText)

        const playAgainButtonBg = new Sprite(
            this.playAgainButton,
            ResourcesLoader.PLAY_AGAIN_BUTTON
        )
        const playAgainButton = new Button(
            this.playAgainButton,
            '',
            '',
            ResourcesLoader.PLAY_AGAIN_BUTTON
        )
        this.playAgainButton.setButton(playAgainButton)

        const menuButton = new Button(this.menuButton, '', '', ResourcesLoader.MENU_BUTTON)
        this.menuButton.setButton(menuButton)
    }
    public setHighScore(num: number): void {
        this.highScoreText.getText().setTextDisplay('High score: ' + num.toString())
    }
    public setCurrentScore(num: number): void {
        this.currentScoreText.getText().setTextDisplay('Current score: ' + num.toString())
    }
    public getPlayAgainButton(): Button {
        return this.playAgainButton.getButton()
    }
    public getMenuButton(): Button {
        return this.menuButton.getButton()
    }
}
export default GameOverMenuUI
