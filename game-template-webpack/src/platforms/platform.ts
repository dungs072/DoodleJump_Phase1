import Collider from "../base-types/components/collider";
import Transform from "../base-types/components/transform";
import GameObject from "../base-types/gameObject";
import Vector2 from "../base-types/vector2";
import Movement from "../general/movement";
import SubcriberInterface from "../types/observer/subcriber";
import RenderInterface from "../types/render";
import SystemInterface from "../types/system";

class Platform extends GameObject implements SystemInterface, RenderInterface, SubcriberInterface<number> {
    private collider: Collider;
    private transform: Transform;
    private movement: Movement;

    private movementSpeed: number;

    private targetY: number;
    constructor(position: Vector2, scale: Vector2) {
        super();
        this.transform = this.getComponent(Transform)!;
        this.transform.setPosition(position);
        this.transform.setScale(scale);
        this.movementSpeed = 500;
        this.targetY = this.transform.getPosition().y;
        this.start();
    }
   
    public start(): void {
        this.collider = new Collider();
        let downRight = new Vector2(this.transform.getScale().x, this.transform.getScale().y-25);
        this.collider.setBounds(this.transform?.getPosition(), downRight);
        this.collider.setIsStatic(true);
        this.addComponent(this.collider);
        this.movement = new Movement();
        this.addComponent(this.movement);
    }
    public update(deltaTime: number): void {
        if(this.targetY<=this.transform.getPosition().y){
            this.targetY = -Infinity;
            return;
        }
        this.movement.move(deltaTime, Vector2.down(), this.movementSpeed, this.transform);
    }

    public draw(context: CanvasRenderingContext2D) {
        context.fillStyle = 'red';
        let transform = this.getComponent(Transform);
        if (transform == null) {
            return null;
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
}

export default Platform;