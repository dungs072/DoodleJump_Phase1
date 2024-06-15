import Sprite from "../base-types/sprite";
import Vector2 from "../base-types/vector2";
import Button from "./base/button";
import UIElement from './base/uiElement';
import ButtonManager from "./buttonManager";

class MainMenuUI extends UIElement{
    private startGameButton: Button;
    private doodleJumpText: UIElement;
    constructor(position: Vector2, scale: Vector2, background: Sprite){
        super(position, scale, background);
    }
    public setStartGameButton(button: Button): void{
        this.startGameButton = button;
        ButtonManager.getInstance().addButton(this.startGameButton);

    }
    public setDoodleJumpText(uiElement: UIElement): void{
        this.doodleJumpText = uiElement;
    }
    public draw(context: CanvasRenderingContext2D): void {
        super.draw(context);
        this.startGameButton.draw(context);
        this.doodleJumpText.draw(context);
    }

}
export default MainMenuUI;