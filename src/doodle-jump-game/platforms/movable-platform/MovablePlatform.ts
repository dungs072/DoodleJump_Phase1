import Sprite from '../../../game-engine/base-types/components/render/Sprite'
import Transform from '../../../game-engine/base-types/components/Transform'
import Vector2 from '../../../game-engine/base-types/Vector2'
import PathResources from '../../../game-engine/resources/PathResources'
import ResourcesManager from '../../../game-engine/resources/ResourcesManager'
import Platform from '../Platform'
import PlatformModel from '../PlatformModel'

class MovablePlatform extends Platform {
    private maxLeft: number
    private maxRight: number
    private horizontalSpeed: number
    private canMoveLeft: boolean
    constructor(position: Vector2, scale: Vector2) {
        super(position, scale, true)
        this.canJump = true
        this.horizontalSpeed = 100

        this.maxLeft = this.transform.getPosition().x - 100
        this.maxRight = this.transform.getPosition().x + 100
        let sprite = new Sprite(ResourcesManager.MovablePlatformImage)
        this.setUpModel(sprite)
    }
    public update(deltaTime: number): void {
        super.update(deltaTime)

        if (this.transform.getPosition().x < this.maxLeft) {
            this.canMoveLeft = false
        }
        if (this.transform.getPosition().x > this.maxRight) {
            this.canMoveLeft = true
        }
        if (this.canMoveLeft) {
            this.movement.move(deltaTime, Vector2.left(), this.horizontalSpeed, this.transform)
        } else {
            this.movement.move(deltaTime, Vector2.right(), this.horizontalSpeed, this.transform)
        }
        let modelTransfrom = this.platformModel.getComponent(Transform)
        if (modelTransfrom) {
            modelTransfrom.setPosition(this.transform.getPosition())
        }
    }
    public operation(): void {
        // because it is stable, player can jump
    }
}
export default MovablePlatform
