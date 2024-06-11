import GameObject from "../base-types/gameObject";
import Vector2 from "../base-types/vector2";
import Transform from "../base-types/components/transform";
import SystemInterface from "../types/system";
import KeyCode from "../input/keyCode";
import RenderInterface from "../types/render";
import RigidBody from "../base-types/components/rigidbody";
class Player extends GameObject implements SystemInterface, RenderInterface {
    private movementSpeed: number;
    private jumpForce: number;
    constructor(position: Vector2, scale: Vector2) {
        super();
        this.movementSpeed = 200;
        this.jumpForce = 275;
        let transform = this.getComponent(Transform);
        transform?.setPosition(position);
        transform?.setScale(scale);
        this.start()
    }
    public start(): void {
        let rigidbody = new RigidBody();
        rigidbody.setUseGravity(true);
        rigidbody.setMass(100);
        this.addComponent(rigidbody);
        //throw new Error("Method not implemented.");
    }
    public update(deltaTime: number): void {
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
        // if (KeyCode.isDown(KeyCode.DOWN_ARROW)) {
        //     let direction = Vector2.down();
        //     this.move(deltaTime, direction);
        // }
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
        context.fillStyle = 'blue';
        let transform = this.getComponent(Transform);
        if (transform == null) {
            return;
        }
        context.fillRect(transform.getPosition().x, transform.getPosition().y,
            transform.getScale().x, transform.getScale().y);
    }



}
export default Player