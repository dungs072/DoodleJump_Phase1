import GameObject from '../../game-engine/base-types/GameObject'
import Vector2 from '../../game-engine/base-types/Vector2'
import Sprite from '../../game-engine/base-types/components/render/Sprite'

class PlatformModel extends GameObject {
    private sprite: Sprite
    constructor(sprite: Sprite) {
        super()
        this.sprite = sprite
        this.addComponent(sprite)
        this.transform.setLocalPosition(new Vector2(0, 0))
        this.setLayer(1)
    }

    public getSprite(): Sprite {
        return this.sprite
    }
}
export default PlatformModel
