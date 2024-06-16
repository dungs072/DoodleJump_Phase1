import Collider from '../base-types/components/Collider'
import Transform from '../base-types/components/Transform'
import GameObject from '../base-types/GameObject'
import Vector2 from '../base-types/Vector2'
import Movement from '../general/Movement'
import ProductInterface from '../types/factory/product'
import SubcriberInterface from '../types/observer/subcriber'
import RenderInterface from '../types/render'
import SystemInterface from '../types/system'
import Sprite from '../base-types/Sprite'

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
    private currentData: number
    protected canJump: boolean

    protected color: string

    private targetY: number
    constructor(position: Vector2, scale: Vector2, canJump: boolean) {
        super()
        this.transform = this.getComponent(Transform)!
        this.transform.setPosition(position)
        this.transform.setScale(scale)
        this.movementSpeed = 300
        this.maxDistanceToDestroy = 595
        this.targetY = this.transform.getPosition().y
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
        if (this.targetY > this.transform.getPosition().y) {
            if (this.currentData > 100) {
                this.movement.move(
                    deltaTime,
                    Vector2.down(),
                    this.movementSpeed + 450,
                    this.transform
                )
            } else {
                this.movement.move(deltaTime, Vector2.down(), this.movementSpeed, this.transform)
            }
        }
        this.sprite.setPosition(
            new Vector2(this.transform.getPosition().x - 10, this.transform.getPosition().y)
        )
        let downRight = this.collider.getDownRightBound()
        this.collider.setBounds(this.transform.getPosition(), downRight)
        if (this.transform.getPosition().y >= this.maxDistanceToDestroy) {
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
        this.targetY = this.transform.getPosition().y + data
        this.currentData = data
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
