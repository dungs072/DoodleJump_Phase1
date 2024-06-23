import GameObject from '../../game-engine/base-types/GameObject'
import Vector2 from '../../game-engine/base-types/Vector2'
import Transform from '../../game-engine/base-types/components/Transform'
import Collider from '../../game-engine/base-types/components/physic/Collider'
import Sprite from '../../game-engine/base-types/components/render/Sprite'
import ProductInterface from '../types/factory/product'
import ItemModel from './ItemModel'

abstract class Item extends GameObject implements ProductInterface {
    protected itemModel: ItemModel

    private collider: Collider
    protected transform: Transform
    protected canImplement: boolean
    protected timeToDestroy: number
    private currentTime: number

    constructor(position: Vector2, scale: Vector2) {
        super()

        this.transform = this.getComponent(Transform)!
        this.transform.setPosition(position)
        this.transform.setScale(scale)
        this.canImplement = false
        this.timeToDestroy = 4
        this.currentTime = 0
        this.setLayer(0)
        this.start()
    }

    public start(): void {
        this.collider = new Collider()
        const downRight = new Vector2(this.transform.getScale().x, this.transform.getScale().y)
        this.collider.setBounds(this.transform?.getPosition(), downRight)
        this.addComponent(this.collider)
        this.collider.setIsStatic(true)
    }
    public update(deltaTime: number): void {
        if (this.canImplement) {
            this.itemModel.setActive(false)
            this.currentTime += deltaTime
            if (this.currentTime > this.timeToDestroy) {
                this.destroy()
            }
        }
    }
    public operation(): void {
        this.canImplement = true
        this.collider.setActive(false)
    }
    protected setUpModel(sprite: Sprite) {
        this.itemModel = new ItemModel(sprite)
        this.addChild(this.itemModel)
    }
    public receive(data: number): void {
        this.canImplement = true
    }
    public getGameObject(): GameObject {
        return this
    }

    public getTransform() {
        return this.transform
    }
}

export default Item
