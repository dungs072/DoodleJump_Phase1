import Vector2 from '../../../game-engine/base-types/Vector2'
import Item from '../Item'
import Animation from '../../../game-engine/base-types/components/render/Animation'
import Sprite from '../../../game-engine/base-types/components/render/Sprite'
import ResourcesLoader from '../../resource/ResourcesLoader'

class Shoes extends Item {
    private animation: Animation
    private forceAmount: number

    constructor(position: Vector2, scale: Vector2) {
        super(position, scale)
        this.forceAmount = 1200

        this.setUpAnimation()
        const sprite = new Sprite(this, ResourcesLoader.SHOE1)
        this.setUpModel(sprite)
    }
    private setUpAnimation(): void {
        const images: string[] = []
        images.push(ResourcesLoader.SHOE1)
        images.push(ResourcesLoader.SHOE2)
        images.push(ResourcesLoader.SHOE3)
        images.push(ResourcesLoader.SHOE4)
        this.animation = new Animation(this, images, 0.02)
        this.addComponent(this.animation)
    }

    public update(deltaTime: number): void {
        super.update(deltaTime)
        if (this.canImplement) {
            this.animation.play(deltaTime)
        }
    }
    public getForceAmount(): number {
        return this.forceAmount
    }
}
export default Shoes
