import Vector2 from '../../../game-engine/base-types/Vector2'
import ResourcesManager from '../../../game-engine/resources/ResourcesManager'
import Item from '../Item'
import Animation from '../../../game-engine/base-types/components/render/Animation'
import Sprite from '../../../game-engine/base-types/components/render/Sprite'

class Shoes extends Item {
    private animation: Animation
    private forceAmount: number

    constructor(position: Vector2, scale: Vector2) {
        super(position, scale)
        this.forceAmount = 700

        this.setUpAnimation()
        let sprite = new Sprite(ResourcesManager.Shoe1Image)
        this.setUpModel(sprite)
    }
    private setUpAnimation(): void {
        let images: HTMLImageElement[] = []
        images.push(ResourcesManager.Shoe1Image)
        images.push(ResourcesManager.Shoe2Image)
        images.push(ResourcesManager.Shoe3Image)
        images.push(ResourcesManager.Shoe4Image)
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
