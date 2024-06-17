import Sprite from '../../game-engine/base-types/2d/Sprite'
import Vector2 from '../../game-engine/base-types/Vector2'
import Button from '../../game-engine/base-types/ui/base/Button'
import UIElement from '../../game-engine/base-types/ui/base/UIElement'
import ButtonManager from './ButtonManager'

class MainMenuUI extends UIElement {
    private startGameButton: Button
    private doodleJumpText: UIElement
    constructor(position: Vector2, scale: Vector2, background: Sprite) {
        super(position, scale, background)
    }
    public setStartGameButton(button: Button): void {
        this.startGameButton = button
        ButtonManager.getInstance().addButton(this.startGameButton)
    }
    public setDoodleJumpText(uiElement: UIElement): void {
        this.doodleJumpText = uiElement
    }
    public draw(context: CanvasRenderingContext2D): void {
        super.draw(context)
        this.startGameButton.draw(context)
        this.doodleJumpText.draw(context)
    }
    public setIsActive(state: boolean): void {
        super.setIsActive(state)
        this.startGameButton.setIsActive(state)
    }
}
export default MainMenuUI
