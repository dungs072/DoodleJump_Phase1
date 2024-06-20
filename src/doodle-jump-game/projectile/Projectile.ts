import Collider from '../../game-engine/base-types/components/physic/Collider'
import RigidBody from '../../game-engine/base-types/components/physic/Rigidbody'
import Transform from '../../game-engine/base-types/components/Transform'
import GameObject from '../../game-engine/base-types/GameObject'
import Vector2 from '../../game-engine/base-types/Vector2'
import Sprite from '../../game-engine/base-types/components/render/Sprite'
import ResourcesManager from '../../game-engine/resources/ResourcesManager'

class Projectile extends GameObject {
    private timeToDestroy: number
    private forceAmount: number
    private direction: Vector2
    private collider: Collider
    private rb: RigidBody
    private sprite: Sprite

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
        this.sprite = new Sprite(ResourcesManager.BulletImage)
        this.addComponent(this.sprite)
        this.start()
    }

    public start(): void {
        this.collider = new Collider()
        this.collider.setBounds(this.transform.getPosition(), this.transform.getScale())
        this.collider.setOffset(27)

        this.addComponent(this.collider)
        this.collider.setIsStatic(false)

        this.rb = new RigidBody()
        this.rb.setUseGravity(false)
        this.addComponent(this.rb)
    }
    public update(deltaTime: number): void {
        this.currentTime += deltaTime
        if (this.currentTime >= this.timeToDestroy) {
            this.destroy()
        } else {
            this.rb.setVelocity(Vector2.multiply(this.direction, this.forceAmount))
        }
    }
}
export default Projectile
