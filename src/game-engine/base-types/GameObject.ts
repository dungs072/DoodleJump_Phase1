import Transform from './components/Transform'
import PhysicsInterface from '../types/physicSystem'
import SystemInterface from '../types/system'
import RenderInterface from '../types/render'
import SceneManager from '../scene/SceneManager'
import Component from './components/Component'
import Vector2 from './Vector2'
class GameObject implements PhysicsInterface, SystemInterface, RenderInterface {
    private components: Map<Function, Component>
    private parent: GameObject
    private children: GameObject[]
    private isActive: boolean
    protected canDestroy: boolean
    protected transform: Transform
    private layer: number

    constructor(isSticky = false) {
        this.components = new Map<Function, Component>()
        this.layer = 0
        this.initGameObject(isSticky)
    }
    private initGameObject(isSticky: boolean): void {
        this.children = []
        this.transform = new Transform()
        this.addComponent(this.transform)
        this.isActive = true
        this.canDestroy = false
        this.registerToScene(isSticky)
        this.start()
    }
    private registerToScene(isSticky: boolean) {
        // I have to decouple here: fix fix
        let scene = SceneManager.getInstance().getCurrentActiveScene()
        if (isSticky) {
            scene.addStickyGameObject(this)
        } else {
            scene.addGameObject(this)
        }
    }

    public start(): void {
        // start object
    }
    public update(deltaTime: number): void {
        // update object
    }

    // please dont override it
    public draw(context: CanvasRenderingContext2D): void {
        if (!this.isActive) {
            return
        }
        this.components.forEach((component) => {
            if (component.getActive()) {
                component.draw(context, this.transform.getPosition())
            }
        })
    }

    public getComponent<T extends Component>(componentClass: {
        new (...args: any[]): T
    }): T | undefined {
        return this.components.get(componentClass) as T | undefined
    }
    public addComponent<T extends Component>(component: T): void {
        component.setGameObject(this)
        this.components.set(component.constructor, component)
    }
    public removeComponent<T extends Component>(component: T): void {
        component.setGameObject(undefined)
        this.components.delete(component.constructor)
    }

    public onCollisionEnter(other: GameObject): void {
        // implement collision here
    }
    public setActive(state: boolean): void {
        this.isActive = state
        this.components.forEach((component) => {
            component.setActive(state)
        })
        this.children.forEach((child) => {
            child.setActive(state)
        })
    }
    public getActive(): boolean {
        return this.isActive
    }
    public getCanDestroy(): boolean {
        return this.canDestroy
    }
    public destroy(): void {
        if (this.parent) {
            this.parent.removeChild(this)
        }
        this.canDestroy = true
        // use event here
        this.children.forEach((child) => {
            child.destroy()
        })
        this.components.clear()
        SceneManager.getInstance().getCurrentActiveScene().removeGameObject(this)
    }
    public setCanDestroy(state: boolean): void {
        this.children.forEach((child) => {
            child.setCanDestroy(state)
        })
        this.children = []
        this.canDestroy = state
    }
    public getLayer(): number {
        return this.layer
    }
    public setLayer(layer: number) {
        this.layer = layer
        // SceneManager.getInstance().getCurrentActiveScene().sortLayers()
    }
    public setParent(parent: GameObject): void {
        this.parent = parent
    }
    public getParent(): GameObject {
        return this.parent
    }
    public addChild(child: GameObject): void {
        this.children.push(child)
        this.transform.setPosition(this.transform.getPosition())
        child.setParent(this)
    }
    public removeChild(child: GameObject): void {
        let index = this.children.indexOf(child)
        this.children.splice(index, 1)
    }
    public setChildsPosition(position: Vector2): void {
        this.children.forEach((child) => {
            child.transform.setPosition(
                new Vector2(
                    position.x + child.transform.getLocalPosition().x,
                    position.y + child.transform.getLocalPosition().y
                )
            )
        })
    }
    // public setChildsScale(scale: Vector2): void {
    //     this.children.forEach((child) => {
    //         child.transform.setScale(
    //             new Vector2(
    //                 this.transform.getScale().x + child.transform.getScale().x,
    //                 this.transform.getPosition().y + child.transform.getPosition().y
    //             )
    //         )
    //     })
    // }
}
export default GameObject
