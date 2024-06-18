import GameObject from '../../GameObject'
import Button from '../../components/ui/Button'

class ButtonGameObject extends GameObject {
    private button: Button
    constructor() {
        super()
    }

    public setButton(button: Button): void {
        if (this.button) {
            this.removeComponent<Button>(this.button)
        }
        this.button = button
        this.addComponent<Button>(this.button)
    }
    public getButton(): Button {
        return this.button
    }
}
export default ButtonGameObject
