import Transform from './components/Transform'
import PhysicsInterface from '../types/physicSystem'
import SystemInterface from '../types/system'
import RenderInterface from '../types/render'
import SceneManager from '../scene/SceneManager'
import Component from './components/Component'
import Vector2 from './Vector2'
class GameObject implements PhysicsInterface, SystemInterface, RenderInterface {
    private components: Map<Function, Component>
    private children: GameObject[]
    private isActive: boolean
    protected canDestroy: boolean
    protected transform: Transform
    private layer: number

    constructor() {
        this.components = new Map<Function, Component>()
        this.layer = 0
        this.initGameObject()
    }
    private initGameObject(): void {
        this.children = []
        this.transform = new Transform()
        this.addComponent(this.transform)
        this.isActive = true
        this.canDestroy = false
        this.registerToScene()
        this.start()
    }
    private registerToScene() {
        // I have to decouple here: fix fix
        let scene = SceneManager.getInstance().getCurrentActiveScene()
        scene.addGameObject(this)
    }

    public start(): void {
        // start object
    }
    public update(deltaTime: number): void {
        // update object
    }
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
        console.log(this.components.delete(component.constructor))
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
    public setCanDestroy(state: boolean): void {
        this.canDestroy = state
    }
    public getLayer(): number {
        return this.layer
    }
    public setLayer(layer: number) {
        this.layer = layer
    }
    public addChild(child: GameObject): void {
        this.children.push(child)
        this.transform.setPosition(this.transform.getPosition())
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
