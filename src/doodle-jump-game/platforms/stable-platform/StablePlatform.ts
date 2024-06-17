import Sprite from '../../../game-engine/base-types/2d/Sprite'
import Vector2 from '../../../game-engine/base-types/Vector2'
import PathResources from '../../../game-engine/PathResources'
import Platform from '../Platform'

class StablePlatform extends Platform {
    constructor(position: Vector2, scale: Vector2) {
        super(position, scale, true)

        this.canJump = true
        this.color = 'red'
        this.sprite = new Sprite(PathResources.STABLE_PLATFORM, position)
    }
    public operation(): void {
        // because it is stable, player can jump
    }
}
export default StablePlatform
