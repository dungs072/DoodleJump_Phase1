import Sprite from '../../../game-engine/base-types/components/render/Sprite'
import Vector2 from '../../../game-engine/base-types/Vector2'
import PathResources from '../../../game-engine/PathResources'
import Platform from '../Platform'
import Animation from '../../../game-engine/base-types/components/render/Animation'
import PlatformModel from '../PlatformModel'
import Transform from '../../../game-engine/base-types/components/Transform'

class UnstablePlatform extends Platform {
    private dropDownSpeed: number
    private isStomped: boolean
    private maxDropDownDistance: number
    private previousY: number
    private animation: Animation

    constructor(position: Vector2, scale: Vector2) {
        super(position, scale, false)
        this.canJump = false
        this.dropDownSpeed = 200
        this.isStomped = false
        this.maxDropDownDistance = 100
        this.canDestroy = false

        let sprite = new Sprite(PathResources.UNSTABLE_PLATFORM)
        this.setUpModel(sprite)

        this.setUpAnimation()
    }

    private setUpAnimation(): void {
        let paths: string[] = []
        paths.push(PathResources.UNSTABLE_PLATFORM)
        paths.push(PathResources.UNSTABLE_PLATFORM1)
        paths.push(PathResources.UNSTABLE_PLATFORM2)
        paths.push(PathResources.UNSTABLE_PLATFORM3)
        this.animation = new Animation(paths, this.transform.getPosition(), 0.02)
    }

    public update(deltaTime: number): void {
        super.update(deltaTime)
        if (this.isStomped && !this.canDestroy) {
            if (this.transform.getPosition().y >= this.previousY + this.maxDropDownDistance) {
                this.canDestroy = true
            }
            this.movement.move(deltaTime, Vector2.down(), this.dropDownSpeed, this.transform)
        }
        // this.animation.setPosition(this.transform.getPosition())
    }
    // public draw(context: CanvasRenderingContext2D): void {
    //     if (this.isStomped) {
    //         this.animation.draw(context, this.deltaTime)
    //         return
    //     }
    //     super.draw(context)
    // }

    public operation(): void {
        this.isStomped = true
        //this.animation.setPosition(this.transform.getPosition())
        this.previousY = this.transform.getPosition().y
    }
}
export default UnstablePlatform
