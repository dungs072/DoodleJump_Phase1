import Collider from '../../game-engine/base-types/components/Collider'
import RigidBody from '../../game-engine/base-types/components/Rigidbody'
import Transform from '../../game-engine/base-types/components/Transform'
import GameObject from '../../game-engine/base-types/GameObject'
import Vector2 from '../../game-engine/base-types/Vector2'
import RenderInterface from '../../game-engine/types/render'
import SystemInterface from '../../game-engine/types/system'

class Projectile extends GameObject implements SystemInterface, RenderInterface {
    private timeToDestroy: number
    private forceAmount: number
    private direction: Vector2
    private transform: Transform
    private collider: Collider
    private rb: RigidBody
    private style = 'black'

    private currentTime: number
    constructor(forceAmount: number, position: Vector2, scale: Vector2, direction: Vector2) {
        super()
        this.transform = this.getComponent(Transform)!
        if (this.transform == null) {
            return
        }
        this.transform.setPosition(position)
        this.transform.setScale(scale)
        this.direction = direction
        this.forceAmount = forceAmount
        this.timeToDestroy = 5
        this.currentTime = 0
        this.start()
    }

    public start(): void {
        this.collider = new Collider()
        this.collider.setBounds(this.transform.getPosition(), this.transform.getScale())
        this.collider.setOffset(27)
        this.addComponent(this.collider)

        this.rb = new RigidBody()
        this.rb.setUseGravity(false)
        this.addComponent(this.rb)
    }
    public update(deltaTime: number): void {
        this.currentTime += deltaTime
        if (this.currentTime >= this.timeToDestroy) {
            this.canDestroy = true
        } else {
            this.rb.setVelocity(Vector2.multiply(this.direction, this.forceAmount))
        }
        //this.movement.move(deltaTime, this.direction, this.speed, this.transform);
    }
    public draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = this.style
        if (this.transform == null) {
            return
        }
        context.fillRect(
            this.transform.getPosition().x,
            this.transform.getPosition().y,
            this.transform.getScale().x,
            this.transform.getScale().y
        )
        this.collider.draw(context)
    }
}
export default Projectile
