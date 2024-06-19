import Sprite from '../../game-engine/base-types/components/render/Sprite'
import Vector2 from '../../game-engine/base-types/Vector2'
import Button from '../../game-engine/base-types/components/ui/Button'
import UIElement from '../../game-engine/base-types/components/ui/UIElement'
import ButtonManager from '../../game-engine/base-types/ui/base/ButtonManager'
import ButtonGameObject from '../../game-engine/base-types/ui/my-ui/ButtonGameObject'
import TextGameObject from '../../game-engine/base-types/ui/my-ui/TextGameObject'
import GameObject from '../../game-engine/base-types/GameObject'
import Text from '../../game-engine/base-types/components/ui/Text'
import Transform from '../../game-engine/base-types/components/Transform'

class GamePlayUI extends GameObject {
    private scoreText: TextGameObject
    private panel: UIElement
    constructor(position: Vector2, scale: Vector2, background: Sprite) {
        super(true)
        this.panel = new UIElement(background)
        this.addComponent(this.panel)
        this.scoreText = new TextGameObject(true)
        this.scoreText.getComponent(Transform)?.setLocalPosition(new Vector2(75, 25))
        this.scoreText.setLayer(-1)
        this.addChild(this.scoreText)
        this.transform.setPosition(position)
        this.transform.setScale(scale)
    }
    public setScoreText(text: Text): void {
        this.scoreText.setText(text)
    }
    public getScoreText(): Text {
        return this.scoreText.getText()
    }
}
export default GamePlayUI
