import Vector2 from '../../../game-engine/base-types/Vector2'
import ResourcesManager from '../../../game-engine/resources/ResourcesManager'
import Item from '../Item'
import Animation from '../../../game-engine/base-types/components/render/Animation'
import Sprite from '../../../game-engine/base-types/components/render/Sprite'
import Transform from '../../../game-engine/base-types/components/Transform'

class Propeller extends Item {
    private animation: Animation
    private maxDistanceFlight: number
    private flySpeed: number

    constructor(position: Vector2, scale: Vector2) {
        super(position, scale)
        this.maxDistanceFlight = 2000
        this.flySpeed = 700
        this.timeToDestroy = this.maxDistanceFlight / this.flySpeed
        this.setUpAnimation()
        let sprite = new Sprite(ResourcesManager.PropellerImage)
        this.setUpModel(sprite)
    }
    private setUpAnimation(): void {
        let images: HTMLImageElement[] = []
        images.push(ResourcesManager.Propeller1Image)
        images.push(ResourcesManager.Propeller2Image)
        images.push(ResourcesManager.Propeller3Image)
        this.animation = new Animation(images, 0.02)
        this.animation.setCanLoop(true)
        this.addComponent(this.animation)
    }

    public update(deltaTime: number): void {
        super.update(deltaTime)
        if (this.canImplement) {
            this.animation.play(deltaTime)
        }
    }
    public getMaxDistanceFlight(): number {
        return this.maxDistanceFlight
    }
    public getFlySpeed(): number {
        return this.flySpeed
    }
}
export default Propeller
