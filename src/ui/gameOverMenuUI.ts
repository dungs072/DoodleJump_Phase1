import Sprite from "../base-types/sprite";
import Vector2 from "../base-types/vector2";
import Button from "./base/button";
import UIElement from "./base/uiElement";
import ButtonManager from "./buttonManager";

class GameOverMenuUI extends UIElement{
    private playAgainButton: Button;
    private menuButton: Button;
    constructor(position: Vector2, scale: Vector2, background: Sprite){
        super(position, scale, background);
    }
    public setPlayAgainButton(button: Button): void{
        this.playAgainButton = button;
        ButtonManager.getInstance().addButton(this.playAgainButton);

    }
    public setMenuButton(button: Button): void{
        this.menuButton = button;
        ButtonManager.getInstance().addButton(this.playAgainButton);

    }
    public draw(context: CanvasRenderingContext2D): void {
        super.draw(context);
        this.playAgainButton.draw(context);
        this.menuButton.draw(context);
    }

    
}
export default GameOverMenuUI;