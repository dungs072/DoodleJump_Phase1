import GameObject from "../base-types/gameObject";
import Vector2 from "../base-types/vector2";
import Transform from "../base-types/components/transform";
import SystemInterface from "../types/system";
import KeyCode from "../input/keyCode";
import RenderInterface from "../types/render";
import RigidBody from '../base-types/components/rigidbody';
import Collider from "../base-types/components/collider";
import Movement from "../general/movement";
import PlatformManager from "../platforms/platformManager";
import Platform from '../platforms/platform';
class Player extends GameObject implements SystemInterface, RenderInterface {
    private movementSpeed: number;
    private jumpForce: number;
    private maxBorder: number;

    private rb: RigidBody;
    private collider: Collider;
    private transform: Transform;
    private movement: Movement;

    private platFormManager: PlatformManager ;

    private previousHeight: number;
    private isAddForceDown: boolean;

    constructor(position: Vector2, scale: Vector2) {
        super();
        this.movementSpeed = 250;
        this.jumpForce = 250;
        this.maxBorder = 250;
        
        this.transform = this.getComponent(Transform)!;
        this.transform?.setPosition(position);
        this.transform?.setScale(scale);
        this.start();
    }

    public start(): void {
        this.rb = new RigidBody();
        this.rb.setMass(100);
        this.rb.setUseGravity(true);
        this.addComponent(this.rb);

        this.movement = new Movement();
        this.addComponent(this.movement);
        
        this.collider = new Collider();
        let topLeft = new Vector2(this.transform.getPosition().x, 
                                this.transform.getPosition().y + 15);
        let downRight = Vector2.add(this.transform.getPosition(), this.transform.getScale());
        this.collider.setBounds(topLeft, downRight);
        this.collider.setIsStatic(false);
        this.addComponent(this.collider);
    }
    public update(deltaTime: number): void {
        this.handleInput(deltaTime);
        this.collider.setIsTrigger(this.transform.getPosition().y<this.previousHeight);
        this.previousHeight = this.transform.getPosition().y;

        if(this.transform.getPosition().y>=this.maxBorder){
            return;
        }
        else if(!this.isAddForceDown){
            this.rb.addForce(Vector2.down(), 45); // need to calculate this again there
            this.isAddForceDown = true;
        }
        this.movement.move(deltaTime, Vector2.down(), this.movementSpeed+50, this.transform);
        this.previousHeight = this.transform.getPosition().y;
        this.platFormManager.getPublisher().setData(50);
        this.platFormManager.getPublisher().notify();
    }
    public handleInput(deltaTime: number){
        if (KeyCode.isDown(KeyCode.LEFT_ARROW)) {
            let direction = Vector2.left();
            this.movement.move(deltaTime, direction, this.movementSpeed, this.transform);
        }
        if (KeyCode.isDown(KeyCode.RIGHT_ARROW)) {
            let direction = Vector2.right();
            this.movement.move(deltaTime, direction, this.movementSpeed, this.transform);
        }
        if (KeyCode.isDownButNotHold(KeyCode.UP_ARROW)) {
            let rigidbody = this.getComponent(RigidBody);
            if (rigidbody == null) {
                return;
            }
            let velocity = Vector2.multiply(Vector2.up(), this.jumpForce);
            rigidbody.setVelocity(velocity);
        }
    }
    public onCollisionEnter(other: GameObject): void {
        // check if collide with Platform
        if(other instanceof Platform){
            let platform = (other as Platform);
            platform.operation();
            if(platform.getCanJump()){
                var forceAmount = this.jumpForce;

                this.rb.setVelocity(Vector2.zero());
                this.rb.addForce(Vector2.up(), forceAmount);
                this.isAddForceDown = false;
            }

        }
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

    public SetPlatFormManager(platformManager: PlatformManager): void{
        this.platFormManager = platformManager;
    }
    public getPosition(): Vector2{
        return this.transform.getPosition();
    }
    public setPosition(position: Vector2): void{
        this.transform.setPosition(position);
    }

}
export default Player