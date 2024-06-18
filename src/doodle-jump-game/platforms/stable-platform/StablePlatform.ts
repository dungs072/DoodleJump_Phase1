import Sprite from '../../../game-engine/base-types/components/render/Sprite'
import Vector2 from '../../../game-engine/base-types/Vector2'
import PathResources from '../../../game-engine/PathResources'
import Platform from '../Platform'
import PlatformModel from '../PlatformModel'

class StablePlatform extends Platform {
    constructor(position: Vector2, scale: Vector2) {
        super(position, scale, true)

        this.canJump = true
        let sprite = new Sprite(PathResources.STABLE_PLATFORM)
        this.setUpModel(sprite)
    }
    public operation(): void {
        // because it is stable, player can jump
    }
}
export default StablePlatform
