import Vector2 from '../../Vector2'
import Transform from '../../components/Transform'
import Button from '../../components/ui/Button'
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
        this.buttons.forEach((button) => {
            if (button.getIsActive()) {
                let transform = button.getGameObject()?.getComponent(Transform)
                if (transform) {
                    if (
                        position.x > transform.getPosition().x &&
                        position.x < transform.getPosition().x + transform.getScale().x &&
                        position.y > transform.getPosition().y &&
                        position.y < transform.getPosition().y + transform.getScale().y
                    ) {
                        button.onClick()
                    }
                }
            }
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
