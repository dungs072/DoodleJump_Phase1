import Sprite from '../../../game-engine/base-types/components/render/Sprite'
import Vector2 from '../../../game-engine/base-types/Vector2'
import PathResources from '../../../game-engine/resources/PathResources'
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
        let sprite = new Sprite(ResourcesManager.UnstablePlatformImage)
        this.setUpModel(sprite)

        this.setUpAnimation()
    }

    private setUpAnimation(): void {
        let images: HTMLImageElement[] = []
        images.push(ResourcesManager.UnstablePlatformImage)
        images.push(ResourcesManager.UnstablePlatform1Image)
        images.push(ResourcesManager.UnstablePlatform2Image)
        images.push(ResourcesManager.UnstablePlatform3Image)
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
