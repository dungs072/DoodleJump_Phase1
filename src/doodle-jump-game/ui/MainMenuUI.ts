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

class MainMenuUI extends GameObject {
    private startGameButton: ButtonGameObject
    private doodleJumpText: TextGameObject
    private panel: UIElement
    constructor(position: Vector2, scale: Vector2, background: Sprite) {
        super()
        this.panel = new UIElement(background)
        this.addComponent(this.panel)
        this.startGameButton = new ButtonGameObject()
        this.startGameButton.getComponent(Transform)?.setLocalPosition(new Vector2(100, 200))
        this.startGameButton.getComponent(Transform)?.setScale(new Vector2(222, 80))
        this.doodleJumpText = new TextGameObject()
        this.addChild(this.startGameButton)
        this.addChild(this.doodleJumpText)
        this.transform.setPosition(position)
        this.transform.setScale(scale)
    }
    public setStartGameButton(button: Button): void {
        ButtonManager.getInstance().addButton(button)
        this.startGameButton.setButton(button)
    }
    public setDoodleJumpText(text: Text): void {
        this.doodleJumpText.setText(text)
    }
    // public draw(context: CanvasRenderingContext2D): void {
    //     super.draw(context)
    //     this.startGameButton.draw(context)
    //     this.doodleJumpText.draw(context)
    // }
}
export default MainMenuUI
