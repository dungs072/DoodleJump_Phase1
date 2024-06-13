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
import PlayerFighter from "./playerFighter";
import ProjectileManager from "../projectile/projectileManager";
import PlayerModel from "./playerModel";
import { Action } from "../types/Action";
class Player extends GameObject implements SystemInterface, RenderInterface {
    private movementSpeed: number;
    private jumpForce: number;
    private maxBorder: number;
    private maxChangeJumpToNormalTime: number;

    private spawnProjectilePos: Vector2;

    private rb: RigidBody;
    private collider: Collider;
    private transform: Transform;
    private movement: Movement;
    private fighter: PlayerFighter;

    private playerModel: PlayerModel;

    private platFormManager: PlatformManager;
    private projectileManager: ProjectileManager;

    private previousHeight: number;
    private isAddForceDown: boolean;
    private currentTime: number;

    constructor(position: Vector2, scale: Vector2) {
        super();
        this.movementSpeed = 300;
        this.jumpForce = 250;
        this.maxBorder = 250;
        this.maxChangeJumpToNormalTime = 0.05;
        
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
                                this.transform.getPosition().y + 100);
        let downRight = Vector2.add(this.transform.getPosition(), this.transform.getScale());
        this.collider.setBounds(topLeft, downRight);
        this.collider.setIsStatic(false);
        this.collider.setOffset(115);
        this.addComponent(this.collider);

        this.spawnProjectilePos = Vector2.add(this.transform.getPosition(), 
                            new Vector2(this.transform.getScale().x/2,-10));

        this.playerModel = new PlayerModel(this.transform.getPosition());
    }
    public update(deltaTime: number): void {
        this.handleInput(deltaTime);
        this.handleNormalSprite(deltaTime);
        this.updateChildTransform();
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
    private handleInput(deltaTime: number){
        if (KeyCode.isDown(KeyCode.LEFT_ARROW)) {
            let direction = Vector2.left();
            this.movement.move(deltaTime, direction, this.movementSpeed, this.transform);
            this.playerModel.takeAction(Action.LEFT_NORMAL);
        }
        if (KeyCode.isDown(KeyCode.RIGHT_ARROW)) {
            let direction = Vector2.right();
            this.movement.move(deltaTime, direction, this.movementSpeed, this.transform);
            this.playerModel.takeAction(Action.RIGHT_NORMAL);
        }
        if(KeyCode.isDownButNotHold(KeyCode.UP_ARROW)){
            this.playerModel.takeAction(Action.FORWARD_NORMAL);
            this.fighter.fight(this.spawnProjectilePos, Vector2.up());
        }
        if (KeyCode.isDownButNotHold(KeyCode.SPACE)) {
            let rigidbody = this.getComponent(RigidBody);
            if (rigidbody == null) {
                return;
            }
            let velocity = Vector2.multiply(Vector2.up(), this.jumpForce);
            rigidbody.setVelocity(velocity);
        }
        
    }
    private updateChildTransform(){
        this.spawnProjectilePos = Vector2.add(this.transform.getPosition(), 
        new Vector2(this.transform.getScale().x/2,-10));
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
                this.playerModel.handleJumpSprite();
            }

        }
    }

    public draw(context: CanvasRenderingContext2D): void {
        
        this.playerModel.setPosition(new Vector2(this.transform.getPosition().x-33, 
                                                this.transform.getPosition().y));
        this.playerModel.getCurrentSprite().draw(context);
        
        this.collider.draw(context);
    }
    private handleNormalSprite(deltaTime: number): void{
        if(this.collider.getIsTrigger()){
            this.currentTime+=deltaTime;
            if(this.currentTime>this.maxChangeJumpToNormalTime){
                this.currentTime = 0;
                this.playerModel.handleNormalSprite();
            }
        }
       
    }

    public setPlatformManager(platformManager: PlatformManager): void{
        this.platFormManager = platformManager;
    }
    public setProjectileManager(projectileManager: ProjectileManager): void{
        this.projectileManager = projectileManager;
        this.fighter = new PlayerFighter(this.projectileManager);
        this.addComponent(this.fighter);
    }
    public getPosition(): Vector2{
        return this.transform.getPosition();
    }
    public setPosition(position: Vector2): void{
        this.transform.setPosition(position);
    }

}
export default Player