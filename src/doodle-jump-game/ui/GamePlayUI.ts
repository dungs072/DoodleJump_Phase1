import Sprite from '../../game-engine/base-types/components/render/Sprite'
import Vector2 from '../../game-engine/base-types/Vector2'
import TextGameObject from '../../game-engine/base-types/ui/my-ui/TextGameObject'
import GameObject from '../../game-engine/base-types/GameObject'
import Text from '../../game-engine/base-types/components/ui/Text'
import Transform from '../../game-engine/base-types/components/transform/Transform'
import ResourcesLoader from '../resource/ResourcesLoader'

class GamePlayUI extends GameObject {
    private scoreText: TextGameObject
    private panel: Sprite
    constructor(position: Vector2, scale: Vector2) {
        super(true)
        this.panel = new Sprite(this, ResourcesLoader.BACKGROUND)
        this.addComponent(this.panel)
        this.scoreText = new TextGameObject(true)
        this.scoreText.getComponent(Transform)?.setLocalPosition(new Vector2(75, 25))
        this.scoreText.setLayer(-1)
        this.addChild(this.scoreText)
        this.transform.setPosition(position)
        this.transform.setScale(scale)
        this.setUpUI()
    }
    private setUpUI(): void {
        const scoreText = new Text(this.scoreText, 'Score: 0', 'red', 100, undefined)
        this.scoreText.setText(scoreText)
    }
    public setScoreText(text: string): void {
        this.scoreText.getText().setTextDisplay(text)
    }
    public getScoreText(): Text {
        return this.scoreText.getText()
    }
}
export default GamePlayUI
