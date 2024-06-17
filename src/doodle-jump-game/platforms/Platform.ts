import Collider from '../../game-engine/base-types/components/Collider'
import Transform from '../../game-engine/base-types/components/Transform'
import GameObject from '../../game-engine/base-types/GameObject'
import Vector2 from '../../game-engine/base-types/Vector2'
import Movement from '../general/Movement'
import ProductInterface from '../types/factory/product'
import SubcriberInterface from '../types/observer/subcriber'
import RenderInterface from '../../game-engine/types/render'
import SystemInterface from '../../game-engine/types/system'
import Sprite from '../../game-engine/base-types/2d/Sprite'

abstract class Platform
    extends GameObject
    implements SystemInterface, RenderInterface, SubcriberInterface<number>, ProductInterface
{
    private collider: Collider
    protected transform: Transform
    protected movement: Movement
    protected sprite: Sprite

    private movementSpeed: number
    private maxDistanceToDestroy: number
    protected canJump: boolean

    protected color: string

    private collisionPlayerPositionY: number
    constructor(position: Vector2, scale: Vector2, canJump: boolean) {
        super()
        this.transform = this.getComponent(Transform)!
        this.transform.setPosition(position)
        this.transform.setScale(scale)
        this.movementSpeed = 300
        this.maxDistanceToDestroy = 250
        this.collisionPlayerPositionY = Infinity
        this.canDestroy = false
        this.canJump = canJump
        this.color = 'red'
        this.start()
    }

    public start(): void {
        this.collider = new Collider()
        let downRight = new Vector2(this.transform.getScale().x, this.transform.getScale().y - 25)
        this.collider.setBounds(this.transform?.getPosition(), downRight)
        this.collider.setIsStatic(true)
        this.addComponent(this.collider)
        this.movement = new Movement()
        this.addComponent(this.movement)
    }
    public update(deltaTime: number): void {
        this.sprite.setPosition(
            new Vector2(this.transform.getPosition().x - 10, this.transform.getPosition().y)
        )
        let downRight = this.collider.getDownRightBound()
        this.collider.setBounds(this.transform.getPosition(), downRight)
        if (
            this.transform.getPosition().y - this.collisionPlayerPositionY >=
            this.maxDistanceToDestroy
        ) {
            this.canDestroy = true
        }
    }

    public draw(context: CanvasRenderingContext2D): void {
        if (!this.getCanDraw()) {
            return
        }
        this.drawModel(context)
    }
    private drawModel(context: CanvasRenderingContext2D) {
        this.sprite.draw(context)
        this.collider.draw(context)
    }
    public receive(data: number): void {
        this.collisionPlayerPositionY = data
    }
    public operation(): void {
        console.log('nothing')
        // this is the base platform
    }
    public getGameObject(): GameObject {
        return this
    }

    public getCanJump() {
        return this.canJump
    }

    public getTransform() {
        return this.transform
    }
}

export default Platform
