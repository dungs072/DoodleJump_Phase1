import GameObject from '../../GameObject'
import Text from '../../components/ui/Text'

class TextGameObject extends GameObject {
    private text: Text

    public setText(text: Text): void {
        if (this.text) {
            this.removeComponent<Text>(this.text)
        }
        this.text = text
        this.addComponent<Text>(this.text)
    }
    public getText(): Text {
        return this.text
    }
}
export default TextGameObject
