import Sprite from '../../base-types/Sprite'
import Vector2 from '../../base-types/Vector2'
import PathResources from '../../PathResources'
import Platform from '../Platform'
import Animation from '../../base-types/Animation'

class UnstablePlatform extends Platform {
    private dropDownSpeed: number
    private isStomped: boolean
    private maxDropDownDistance: number
    private previousY: number
    private animation: Animation
    private deltaTime: number

    constructor(position: Vector2, scale: Vector2) {
        super(position, scale, false)
        this.canJump = false
        this.dropDownSpeed = 200
        this.isStomped = false
        this.maxDropDownDistance = 100
        this.color = 'brown'
        this.canDestroy = false
        this.sprite = new Sprite(PathResources.UNSTABLE_PLATFORM, position)
        this.deltaTime = 0.01
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
        this.deltaTime = deltaTime
        super.update(deltaTime)
        if (this.isStomped && !this.canDestroy) {
            if (this.transform.getPosition().y >= this.previousY + this.maxDropDownDistance) {
                this.canDestroy = true
                //this.setCanDraw(false);
            }
            this.movement.move(deltaTime, Vector2.down(), this.dropDownSpeed, this.transform)
        }
    }
    public draw(context: CanvasRenderingContext2D): void {
        if (this.isStomped) {
            this.animation.setPosition(this.transform.getPosition())
            this.animation.draw(context, this.deltaTime)

            return
        }
        super.draw(context)
    }

    public operation(): void {
        this.isStomped = true
        this.animation.setPosition(this.transform.getPosition())
        this.previousY = this.transform.getPosition().y
    }
}
export default UnstablePlatform
