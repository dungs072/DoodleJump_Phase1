import EventHandler from '../../../types/eventHandler'
import Vector2 from '../../Vector2'
import Transform from '../../components/transform/Transform'
import Button from '../../components/ui/Button'
class ButtonManager {
    private buttons: Button[]
    constructor() {
        this.buttons = []
        this.start()
    }
    private start(): void {
        const onAddButton: EventHandler = (button: Button) => {
            this.addButton(button)
        }
        Button.eventDispatcher.addEventListener('onAddButton', onAddButton)
    }

    public handleClick(position: Vector2) {
        this.buttons.forEach((button) => {
            if (button.getActive()) {
                const transform = button.getGameObject()?.getComponent(Transform)
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
        const index = this.buttons.indexOf(button)
        this.buttons.splice(index, 1)
    }
}

export default ButtonManager
