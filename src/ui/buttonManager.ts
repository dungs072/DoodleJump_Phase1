import Vector2 from '../base-types/Vector2'
import Button from './base/Button'

class ButtonManager {
    private buttons: Button[]
    private static instance: ButtonManager
    public static getInstance(): ButtonManager {
        if (!ButtonManager.instance) {
            ButtonManager.instance = new ButtonManager()
        }
        return ButtonManager.instance
    }
    constructor() {
        this.buttons = []
    }

    public onClick(position: Vector2) {
        console.log(position)
        this.buttons.forEach((button) => {
            if (
                position.x > button.getPosition().x &&
                position.x < button.getPosition().x + button.getScale().x &&
                position.y > button.getPosition().y &&
                position.y < button.getPosition().y + button.getScale().y
            ) {
                button.onClick()
            }

            console.log(button)
        })
    }
    public addButton(button: Button) {
        this.buttons.push(button)
    }
    public removeButton(button: Button) {
        let index = this.buttons.indexOf(button)
        this.buttons.splice(index, 1)
    }
}

export default ButtonManager
