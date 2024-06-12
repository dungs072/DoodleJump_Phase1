import Transform from "./components/transform";
import ComponentInterface from "../types/component";
import PhysicsInterface from "../types/physicSystem";
import Collider from "./components/collider";
class GameObject implements PhysicsInterface {
    private components: ComponentsArray
    constructor() {
        this.components = new ComponentsArray();
        this.initGameObject();
    }

    private initGameObject(): void {
        let transform = new Transform();
        this.components.Push(transform);
    }
    public getComponent<T extends ComponentInterface>(componentClass: { new(): T }): T | null {
        return this.components.getInstanceFor<T>(componentClass);
    }
    public addComponent(component: ComponentInterface): void {
        this.components.Push(component);
    }
    public isOutsideCanvas(canvas: HTMLCanvasElement): boolean {
        let transform = this.getComponent(Transform);
        if (transform == null) {
            return true
        }
        return transform.getPosition().x < 0 || transform.getPosition().x > canvas.width ||
            transform.getPosition().y < 0 || transform.getPosition().y > canvas.height;
    }
    public OnCollisionEnter(other: Collider): void {
        // implement collision here
    }
}
class ComponentsArray extends Array<ComponentInterface> {
    public getInstanceFor<T extends ComponentInterface>(componentClass: { new(): T; }) {
        for (var i = 0; i < this.length; i++) {
            if ((<any>this[i].constructor).name === (<any>componentClass).name) {
                return this[i];
            }
        }
        return null as any;
    }
    public Push(component: ComponentInterface): void {
        this.push(component);
    }
}

export default GameObject
