import Transform from './components/Transform'
import ComponentInterface from '../types/component'
import PhysicsInterface from '../types/physicSystem'
class GameObject implements PhysicsInterface {
    // change to dictionary for reducing time complexity
    private components: ComponentsArray
    private canDraw: boolean
    protected canDestroy: boolean
    constructor() {
        this.components = new ComponentsArray()
        this.initGameObject()
    }

    private initGameObject(): void {
        let transform = new Transform()
        this.components.Push(transform)
        this.canDraw = true
        this.canDestroy = false
    }
    public getComponent<T extends ComponentInterface>(componentClass: { new (): T }): T | null {
        return this.components.getInstanceFor<T>(componentClass)
    }
    public addComponent(component: ComponentInterface): void {
        this.components.Push(component)
    }
    public isOutsideCanvas(canvas: HTMLCanvasElement): boolean {
        let transform = this.getComponent(Transform)
        if (transform == null) {
            return true
        }
        return (
            transform.getPosition().x < 0 ||
            transform.getPosition().x > canvas.width ||
            transform.getPosition().y < 0 ||
            transform.getPosition().y > canvas.height
        )
    }
    public onCollisionEnter(other: GameObject): void {
        // implement collision here
    }
    public setCanDraw(state: boolean): void {
        this.canDraw = state
    }
    public getCanDraw(): boolean {
        return this.canDraw
    }
    public getCanDestroy() {
        return this.canDestroy
    }
}
// edit later
class ComponentsArray extends Array<ComponentInterface> {
    public getInstanceFor<T extends ComponentInterface>(componentClass: { new (): T }) {
        for (let i = 0; i < this.length; i++) {
            if (this[i].constructor.name === componentClass.name) {
                return this[i]
            }
        }
        return null as any
    }
    public Push(component: ComponentInterface): void {
        this.push(component)
    }
}

export default GameObject
