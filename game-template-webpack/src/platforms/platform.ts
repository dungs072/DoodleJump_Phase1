import Collider from "../base-types/components/collider";
import Transform from "../base-types/components/transform";
import GameObject from "../base-types/gameObject";
import Vector2 from "../base-types/vector2";
import Movement from "../general/movement";
import ProductInterface from "../types/factory/product";
import SubcriberInterface from "../types/observer/subcriber";
import RenderInterface from "../types/render";
import SystemInterface from "../types/system";

abstract class Platform extends GameObject implements SystemInterface, RenderInterface, SubcriberInterface<number>, ProductInterface {
    private collider: Collider;
    protected transform: Transform;
    protected movement: Movement;

    private movementSpeed: number;
    private maxDistanceToDestroy: number;
    protected canJump: boolean;
    protected canDestroy: boolean;
    protected color: string;

    private targetY: number;
    constructor(position: Vector2, scale: Vector2, canJump: boolean) {
        super();
        this.transform = this.getComponent(Transform)!;
        this.transform.setPosition(position);
        this.transform.setScale(scale);
        this.movementSpeed = 500;
        this.maxDistanceToDestroy = 1500;
        this.targetY = this.transform.getPosition().y;
        this.canDestroy = false;
        this.canJump = canJump;
        this.color = "red";
        this.start();
    }
   
    public start(): void {
        this.collider = new Collider();
        let downRight = new Vector2(this.transform.getScale().x, this.transform.getScale().y-30);
        this.collider.setBounds(this.transform?.getPosition(), downRight);
        this.collider.setIsStatic(true);
        this.addComponent(this.collider);
        this.movement = new Movement();
        this.addComponent(this.movement);
    }
    public update(deltaTime: number): void {
        if(this.transform.getPosition().y>=this.maxDistanceToDestroy){
            this.canDestroy = true;
        }
        if(this.targetY<=this.transform.getPosition().y){
            this.targetY = -Infinity;
            return;
        }
        this.movement.move(deltaTime, Vector2.down(), this.movementSpeed, this.transform);
    }

    public draw(context: CanvasRenderingContext2D): void {
        if(!this.getCanDraw()){
            return;
        }
        this.drawModel(context, this.color);
    }
    private drawModel(context: CanvasRenderingContext2D, style: string){
        context.fillStyle = style;
        let transform = this.getComponent(Transform);
        if (transform == null) {
            return;
        }
        context.fillRect(transform.getPosition().x, transform.getPosition().y,
            transform.getScale().x, transform.getScale().y);
        this.collider.draw(context);
    }
    public receive(data: number): void {
        if(this.targetY==-Infinity){
            this.targetY = this.transform.getPosition().y + data;
        }
        
    }
    public  operation(): void {
        console.log("nothing");
        // this is the base platform
    }
    public getGameObject(): GameObject {
        return this;
    }

    public getCanJump(){
        return this.canJump;
    }
    public getCanDestroy(){
        return this.canDestroy;
    }
    public getTransform(){
        return this.transform;
    }
}

export default Platform;