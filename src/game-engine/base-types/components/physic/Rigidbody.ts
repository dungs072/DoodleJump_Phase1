import GameObject from '../../GameObject'
import Vector2 from '../../Vector2'
import Component from '../Component'

class RigidBody extends Component {
    private useGravity: boolean
    private velocity: Vector2
    private mass: number

    constructor(gameObject: GameObject) {
        super(gameObject)
        this.velocity = Vector2.zero()
        this.mass = 1
    }
    public addForce(direction: Vector2, forceAmount: number): void {
        this.velocity = Vector2.add(this.velocity, Vector2.multiply(direction, forceAmount))
    }
    public clampToZeroVelocity(amount: number): void {
        if (this.velocity.x < 0) {
            this.velocity.x = Math.min(this.velocity.x + amount, 0)
        } else if (this.velocity.x > 0) {
            this.velocity.x = Math.max(this.velocity.x - amount, 0)
        }
        if (this.velocity.y < 0) {
            this.velocity.y = Math.min(this.velocity.y + amount, 0)
        } else if (this.velocity.y > 0) {
            this.velocity.y = Math.max(this.velocity.y - amount, 0)
        }
    }
    public canUseGravity(): boolean {
        return this.useGravity
    }
    public setUseGravity(state: boolean): void {
        this.useGravity = state
    }
    public getVelocity(): Vector2 {
        return this.velocity
    }
    public setVelocity(velocity: Vector2): void {
        this.velocity = velocity
    }

    public getMass() {
        return this.mass
    }
    public setMass(mass: number) {
        this.mass = mass
    }
}
export default RigidBody
