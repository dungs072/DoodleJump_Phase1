import Vector2 from '../../../game-engine/base-types/Vector2'
import Item from '../Item'
import Animation from '../../../game-engine/base-types/components/render/Animation'
import Sprite from '../../../game-engine/base-types/components/render/Sprite'
import ResourcesLoader from '../../resource/ResourcesLoader'

class Propeller extends Item {
    private animation: Animation
    private maxDistanceFlight: number
    private flySpeed: number

    constructor(position: Vector2, scale: Vector2) {
        super(position, scale)
        this.maxDistanceFlight = 1500
        this.flySpeed = 600
        this.timeToDestroy = this.maxDistanceFlight / this.flySpeed
        this.setUpAnimation()
        const sprite = new Sprite(this, ResourcesLoader.PROPELLER)
        this.setUpModel(sprite)
    }
    private setUpAnimation(): void {
        const images: string[] = []
        images.push(ResourcesLoader.PROPELLER1)
        images.push(ResourcesLoader.PROPELLER2)
        images.push(ResourcesLoader.PROPELLER3)
        this.animation = new Animation(this, images, 0.02)
        this.animation.setCanLoop(true)
        this.addComponent(this.animation)
    }
    public getMaxDistanceFlight(): number {
        return this.maxDistanceFlight
    }
    public getFlySpeed(): number {
        return this.flySpeed
    }
    public operation(): void {
        super.operation()
        this.animation.play()
    }
}
export default Propeller
