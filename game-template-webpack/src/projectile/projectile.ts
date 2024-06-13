import Collider from "../base-types/components/collider";
import Transform from "../base-types/components/transform";
import GameObject from "../base-types/gameObject";
import Vector2 from "../base-types/vector2";
import Movement from "../general/movement";
import RenderInterface from "../types/render";
import SystemInterface from "../types/system";

class Projectile extends GameObject implements SystemInterface, RenderInterface{
    private speed: number;
    private direction: Vector2;
    private movement: Movement;
    private transform: Transform;
    private collider: Collider;
    private style = "black";
    constructor(speed: number, position: Vector2, scale: Vector2, direction: Vector2){
        super();
        this.movement = new Movement();
        this.speed = speed;
        this.transform = this.getComponent(Transform)!;
        if(this.transform==null){
            return;
        }
        this.transform.setPosition(position);
        this.transform.setScale(scale);
        this.direction = direction;
        this.start();
    }

    public start(): void {
        this.collider = new Collider();
        this.collider.setBounds(this.transform.getPosition(), this.transform.getScale());
        this.addComponent(this.collider);
    }
    public update(deltaTime: number): void {
        this.movement.move(deltaTime, this.direction, this.speed, this.transform);
    }
    public draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = this.style;
        if (this.transform == null) {
            return;
        }
        context.fillRect(this.transform.getPosition().x, this.transform.getPosition().y,
                        this.transform.getScale().x, this.transform.getScale().y);
        this.collider.draw(context);
    }
}
export default Projectile;