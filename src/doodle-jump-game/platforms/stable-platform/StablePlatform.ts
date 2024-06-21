import Sprite from '../../../game-engine/base-types/components/render/Sprite'
import Vector2 from '../../../game-engine/base-types/Vector2'
import ResourcesManager from '../../../game-engine/resources/ResourcesManager'
import ResourcesLoader from '../../resource/ResourcesLoader'
import Platform from '../Platform'

class StablePlatform extends Platform {
    constructor(position: Vector2, scale: Vector2) {
        super(position, scale, true)

        this.canJump = true
        let sprite = new Sprite(ResourcesLoader.STABLE_PLATFORM)
        this.setUpModel(sprite)
    }
    public operation(): void {
        // because it is stable, player can jump
    }
}
export default StablePlatform
