import Vector2 from '../../../game-engine/base-types/Vector2'
import ResourcesManager from '../../../game-engine/resources/ResourcesManager'
import Item from '../Item'
import Animation from '../../../game-engine/base-types/components/render/Animation'
import Sprite from '../../../game-engine/base-types/components/render/Sprite'
import PathResources from '../../resource/ResourcesLoader'

class Shoes extends Item {
    private animation: Animation
    private forceAmount: number

    constructor(position: Vector2, scale: Vector2) {
        super(position, scale)
        this.forceAmount = 1500

        this.setUpAnimation()
        let sprite = new Sprite(PathResources.SHOE1)
        this.setUpModel(sprite)
    }
    private setUpAnimation(): void {
        let images: string[] = []
        images.push(PathResources.SHOE1)
        images.push(PathResources.SHOE1)
        images.push(PathResources.SHOE1)
        images.push(PathResources.SHOE1)
        this.animation = new Animation(images, 0.02)
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
