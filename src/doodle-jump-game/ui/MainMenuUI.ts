import Sprite from '../../game-engine/base-types/components/render/Sprite'
import Vector2 from '../../game-engine/base-types/Vector2'
import Button from '../../game-engine/base-types/components/ui/Button'
import ButtonGameObject from '../../game-engine/base-types/ui/my-ui/ButtonGameObject'
import TextGameObject from '../../game-engine/base-types/ui/my-ui/TextGameObject'
import GameObject from '../../game-engine/base-types/GameObject'
import Text from '../../game-engine/base-types/components/ui/Text'
import Transform from '../../game-engine/base-types/components/transform/Transform'
import ResourcesLoader from '../resource/ResourcesLoader'

class MainMenuUI extends GameObject {
    private startGameButton: ButtonGameObject
    private doodleJumpText: TextGameObject
    private panel: Sprite
    constructor(position: Vector2, scale: Vector2) {
        super()
        this.panel = new Sprite(this, ResourcesLoader.BACKGROUND)
        this.addComponent(this.panel)
        this.startGameButton = new ButtonGameObject()
        this.startGameButton.getComponent(Transform)?.setLocalPosition(new Vector2(100, 200))
        this.startGameButton.getComponent(Transform)?.setScale(new Vector2(222, 80))
        this.doodleJumpText = new TextGameObject()
        this.addChild(this.startGameButton)
        this.addChild(this.doodleJumpText)
        this.transform.setPosition(position)
        this.transform.setScale(scale)
        this.setUpUI()
    }
    private setUpUI() {
        const playGameButton = new Button(this.startGameButton, '', '', ResourcesLoader.PLAY_GAME)
        this.startGameButton.setButton(playGameButton)

        const doodleJumpText = new Text(
            this.doodleJumpText,
            '',
            '',
            0,
            ResourcesLoader.DOODLE_JUMP_TEXT
        )
        this.doodleJumpText.setText(doodleJumpText)
    }
    public getStartGameButton(): Button {
        return this.startGameButton.getButton()
    }
}
export default MainMenuUI
