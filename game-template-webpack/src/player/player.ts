import GameObject from "../base-types/gameObject";
import Vector2 from "../base-types/vector2";
import Transform from "../base-types/components/transform";
import SystemInterface from "../types/system";
import KeyCode from "../input/keyCode";
import RenderInterface from "../types/render";
import RigidBody from '../base-types/components/rigidbody';
import Collider from "../base-types/components/collider";
class Player extends GameObject implements SystemInterface, RenderInterface {
    private movementSpeed: number;
    private jumpForce: number;
    private rb: RigidBody;
    private collider: Collider;
    private transform: Transform;

    private previousHeight: number;

    constructor(position: Vector2, scale: Vector2) {
        super();
        this.movementSpeed = 200;
        this.jumpForce = 275;
        this.transform = this.getComponent(Transform)!;
        this.transform?.setPosition(position);
        this.transform?.setScale(scale);
        this.start()
    }

    public start(): void {
        this.rb = new RigidBody();
        this.rb.setMass(100);
        this.rb.setUseGravity(true);
        
        this.addComponent(this.rb);

        let transform = this.getComponent(Transform);
        if (transform == null) {
            return;
        }
        this.collider = new Collider();
        let downRight = new Vector2(transform.getScale().x, transform.getScale().y);
        this.collider.setBounds(transform.getPosition(), downRight);
        this.collider.setIsStatic(false);
        this.addComponent(this.collider);
    }
    public update(deltaTime: number): void {
        this.handleInput(deltaTime);
        this.collider.setIsTrigger(this.previousHeight>this.transform.getPosition().y);
        this.previousHeight = this.transform.getPosition().y;
    }
    public handleInput(deltaTime: number){
        if (KeyCode.isDown(KeyCode.LEFT_ARROW)) {
            let direction = Vector2.left();
            this.move(deltaTime, direction);
        }
        if (KeyCode.isDown(KeyCode.RIGHT_ARROW)) {
            let direction = Vector2.right();
            this.move(deltaTime, direction);
        }
        if (KeyCode.isDownButNotHold(KeyCode.UP_ARROW)) {
            let rigidbody = this.getComponent(RigidBody);
            if (rigidbody == null) {
                return;
            }
            rigidbody.addForce(Vector2.up(), this.jumpForce)
        }
    }
    public OnCollisionEnter(other: Collider): void {
        this.rb.addForce(Vector2.up(), this.jumpForce);
        
    }

    private move(deltaTime: number, direction: Vector2): void {
        let transform = this.getComponent(Transform);
        if (transform == null) {
            return;
        }
        let distance = Vector2.multiply(direction, deltaTime * this.movementSpeed);
        let newPosition = Vector2.add(transform?.getPosition(), distance);
        transform.setPosition(newPosition);
    }
    public draw(context: CanvasRenderingContext2D): void {
        if(this.collider.getIsTrigger()){
            context.fillStyle = 'blue';
        }
        else{
            context.fillStyle = 'grey';
        }
        
        let transform = this.getComponent(Transform);
        if (transform == null) {
            return;
        }
        context.fillRect(transform.getPosition().x, transform.getPosition().y,
            transform.getScale().x, transform.getScale().y);
        this.collider.draw(context);
    }



}
export default Player