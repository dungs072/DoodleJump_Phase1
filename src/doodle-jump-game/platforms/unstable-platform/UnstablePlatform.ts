import Sprite from '../../../game-engine/base-types/components/render/Sprite'
import Vector2 from '../../../game-engine/base-types/Vector2'
import ResourcesLoader from '../../resource/ResourcesLoader'
import Platform from '../Platform'
import Animation from '../../../game-engine/base-types/components/render/Animation'
import ResourcesManager from '../../../game-engine/resources/ResourcesManager'

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
        this.setLayer(1)
        let sprite = new Sprite(ResourcesLoader.UNSTABLE_PLATFORM)
        this.setUpModel(sprite)

        this.setUpAnimation()
    }

    private setUpAnimation(): void {
        let images: string[] = []
        images.push(ResourcesLoader.UNSTABLE_PLATFORM)
        images.push(ResourcesLoader.UNSTABLE_PLATFORM1)
        images.push(ResourcesLoader.UNSTABLE_PLATFORM2)
        images.push(ResourcesLoader.UNSTABLE_PLATFORM3)
        this.animation = new Animation(images, 0.02)
        this.addComponent(this.animation)
    }

    public update(deltaTime: number): void {
        super.update(deltaTime)
        if (this.isStomped && !this.canDestroy) {
            this.platformModel.setActive(false)
            this.animation.play(deltaTime)

            if (this.transform.getPosition().y >= this.previousY + this.maxDropDownDistance) {
                this.destroy()
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
