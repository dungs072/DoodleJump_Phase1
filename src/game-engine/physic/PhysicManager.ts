import Collider from '../base-types/components/physic/Collider'
import RigidBody from '../base-types/components/physic/Rigidbody'
import Transform from '../base-types/components/transform/Transform'
import GameObject from '../base-types/GameObject'
import Vector2 from '../base-types/Vector2'
import EventHandler from '../types/eventHandler'

class PhysicManager {
    private physicObjs: GameObject[]
    private notStaticPhysicObjs: GameObject[]

    constructor() {
        this.physicObjs = []
        this.notStaticPhysicObjs = []
        this.start()
    }
    private start() {
        const onSetStatic: EventHandler = (gameObject: GameObject) => {
            this.addPhysicObjs(gameObject)
        }
        const onSetNonStatic: EventHandler = (gameObject: GameObject) => {
            this.addNotStaticPhysicObj(gameObject)
        }

        const onRemoveStatic: EventHandler = (gameObject: GameObject) => {
            this.removePhysicObjs(gameObject)
        }
        const onRemoveNonStatic: EventHandler = (gameObject: GameObject) => {
            this.removeNotStaticPhysicObjs(gameObject)
        }
        Collider.dispatcher.addEventListener('static', onSetStatic)
        Collider.dispatcher.addEventListener('nonstatic', onSetNonStatic)

        Collider.dispatcher.addEventListener('removeStatic', onRemoveStatic)
        Collider.dispatcher.addEventListener('removeNonStatic', onRemoveNonStatic)
    }
    public handleCorePhysic(deltaTime: number): void {
        for (let i = this.notStaticPhysicObjs.length - 1; i >= 0; i--) {
            if (!this.notStaticPhysicObjs[i].getCanDestroy()) {
                const transform = this.notStaticPhysicObjs[i].getComponent(Transform)
                if (transform == null) {
                    return
                }
                const collider = this.notStaticPhysicObjs[i].getComponent(Collider)
                if (collider == null) {
                    return
                }
                const topLeft = new Vector2(
                    transform.getPosition().x,
                    transform.getPosition().y + collider.getOffset()
                )
                const downRight = new Vector2(
                    transform.getScale().x,
                    transform.getScale().y - collider.getOffset()
                )

                collider.setBounds(topLeft, downRight)
                for (let j = this.physicObjs.length - 1; j >= 0; j--) {
                    if (this.notStaticPhysicObjs[i] == this.physicObjs[j]) {
                        continue
                    }
                    const otherCollider = this.physicObjs[j].getComponent(Collider)

                    if (otherCollider == null) {
                        continue
                    }
                    if (collider.hasCollision(otherCollider)) {
                        this.notStaticPhysicObjs[i].onCollisionEnter(this.physicObjs[j])
                    }
                }
                const rigidbody = this.notStaticPhysicObjs[i].getComponent(RigidBody)
                if (!rigidbody) {
                    return
                }

                if (!rigidbody.getVelocity().isZero()) {
                    const jumpPosition = Vector2.multiply(rigidbody.getVelocity(), deltaTime)
                    const newPosition = Vector2.add(transform.getPosition(), jumpPosition)
                    transform.setPosition(newPosition)
                    rigidbody.clampToZeroVelocity(1000 * deltaTime)
                } else if (rigidbody?.canUseGravity()) {
                    const distance = rigidbody.getMass() * deltaTime * deltaTime * 75
                    const dropPosition = Vector2.multiply(Vector2.down(), distance)

                    const newPosition = Vector2.add(transform.getPosition(), dropPosition)
                    transform.setPosition(newPosition)
                }
            }
        }
        for (let i = this.physicObjs.length - 1; i >= 0; i--) {
            const collider = this.physicObjs[i].getComponent(Collider)
            if (collider == null) {
                continue
            }
            const transform = this.physicObjs[i].getComponent(Transform)
            if (transform == null) {
                continue
            }
            const downRight = collider.getDownRightBound()
            collider.setBounds(transform.getPosition(), downRight)
        }
    }

    public addNotStaticPhysicObj(obj: GameObject): void {
        this.notStaticPhysicObjs.push(obj)
    }
    public addPhysicObjs(obj: GameObject): void {
        this.physicObjs.push(obj)
    }
    public removePhysicObjs(obj: GameObject): void {
        const indexPhysic = this.physicObjs.indexOf(obj)
        this.physicObjs.splice(indexPhysic, 1)
    }
    public removeNotStaticPhysicObjs(obj: GameObject): void {
        const indexPhysic = this.notStaticPhysicObjs.indexOf(obj)
        this.notStaticPhysicObjs.splice(indexPhysic, 1)
    }

    public getLengthPhysicObjs(): number {
        return this.physicObjs.length
    }
    public getFirstLengthPhysicObjs(): GameObject {
        return this.physicObjs[0]
    }

    public clearData(): void {
        this.physicObjs = []
        //this.notStaticPhysicObjs = []
    }
}
export default PhysicManager
