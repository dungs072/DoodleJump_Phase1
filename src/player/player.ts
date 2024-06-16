import GameObject from '../base-types/GameObject'
import Vector2 from '../base-types/Vector2'
import Transform from '../base-types/components/Transform'
import SystemInterface from '../types/system'
import KeyCode from '../input/KeyCode'
import RenderInterface from '../types/render'
import Collider from '../base-types/components/Collider'
import Movement from '../general/Movement'
import PlatformManager from '../platforms/PlatformManager'
import Platform from '../platforms/Platform'
import PlayerFighter from './PlayerFighter'
import ProjectileManager from '../projectile/ProjectileManager'
import PlayerModel from './PlayerModel'

import ScoreCalculate from '../score/ScoreCalculator'
import Action from '../base-types/enums/Action'
import RigidBody from '../base-types/components/Rigidbody'

class Player extends GameObject implements SystemInterface, RenderInterface {
    private jumpForce: number
    private movementSpeed: number
    private dropSpeed: number
    private maxBorder: number
    private targetJumpYPosition: number
    private maxChangeJumpToNormalTime: number
    private maxTriggerTime: number

    private spawnProjectilePos: Vector2

    private collider: Collider
    private rb: RigidBody
    private transform: Transform
    private movement: Movement
    private fighter: PlayerFighter
    private scoreCalculator: ScoreCalculate
    private projectileManger: ProjectileManager

    private playerModel: PlayerModel

    private platFormManager: PlatformManager
    private projectileManager: ProjectileManager

    private currentTime: number
    private currentTriggerTime: number
    private previousHeight: number

    private canFalseTrigger: boolean

    constructor(position: Vector2, scale: Vector2) {
        super()
        this.movementSpeed = 450
        this.jumpForce = 700
        this.maxBorder = 100
        this.maxChangeJumpToNormalTime = 0.25
        this.maxTriggerTime = 0.1
        this.currentTriggerTime = 0
        this.canFalseTrigger = false

        this.transform = this.getComponent(Transform)!
        this.transform?.setPosition(position)
        this.transform?.setScale(scale)
        this.targetJumpYPosition = Infinity
        this.start()
    }

    public start(): void {
        this.movement = new Movement()
        this.addComponent(this.movement)

        this.collider = new Collider()
        this.collider.setOffset(115)
        let topLeft = new Vector2(
            this.transform.getPosition().x,
            this.transform.getPosition().y + this.collider.getOffset()
        )
        let downRight = new Vector2(
            this.transform.getScale().x,
            this.transform.getScale().y - this.collider.getOffset()
        )
        this.collider.setBounds(topLeft, downRight)
        this.collider.setIsStatic(false)
        this.addComponent(this.collider)

        this.rb = new RigidBody()
        this.rb.setMass(550)
        this.rb.setUseGravity(true)
        this.addComponent(this.rb)

        this.spawnProjectilePos = Vector2.add(
            this.transform.getPosition(),
            new Vector2(this.transform.getScale().x / 2, -10)
        )

        this.playerModel = new PlayerModel(this.transform.getPosition())
        this.scoreCalculator = new ScoreCalculate()
        this.projectileManger = new ProjectileManager()
        this.fighter = new PlayerFighter(this.projectileManager)
        this.addComponent(this.fighter)
    }
    public update(deltaTime: number): void {
        this.handleInput(deltaTime)
        this.handleNormalSprite(deltaTime)
        this.updateChildTransform()

        this.collider.setIsTrigger(this.transform.getPosition().y < this.previousHeight)
        this.previousHeight = this.transform.getPosition().y

        if (this.canFalseTrigger) {
            this.currentTriggerTime += deltaTime
            if (this.currentTriggerTime >= this.maxTriggerTime) {
                this.collider.setIsTrigger(false)
                this.currentTriggerTime = 0
                this.canFalseTrigger = false
            }
        }
        if (this.transform.getPosition().y < this.maxBorder) {
            this.rb.clampToZeroVelocity(75)
        }

        this.playerModel.setPosition(
            new Vector2(this.transform.getPosition().x - 33, this.transform.getPosition().y)
        )
    }
    public draw(context: CanvasRenderingContext2D): void {
        this.playerModel.getCurrentSprite().draw(context)
        this.collider.draw(context)
        if (this.projectileManager) {
            this.projectileManager.draw(context)
        }
        context.fillStyle = 'red'
        context.fillRect(0, this.maxBorder, 1080, 10)
    }
    private handleInput(deltaTime: number) {
        if (KeyCode.isDown(KeyCode.LEFT_ARROW)) {
            let direction = Vector2.left()
            this.movement.move(deltaTime, direction, this.movementSpeed, this.transform)
            this.playerModel.takeAction(Action.LEFT_NORMAL)
        }
        if (KeyCode.isDown(KeyCode.RIGHT_ARROW)) {
            let direction = Vector2.right()
            this.movement.move(deltaTime, direction, this.movementSpeed, this.transform)
            this.playerModel.takeAction(Action.RIGHT_NORMAL)
        }
        // if (KeyCode.isDownButNotHold(KeyCode.UP_ARROW)) {
        //     this.playerModel.takeAction(Action.FORWARD_NORMAL)
        //     this.fighter.fight(this.spawnProjectilePos, Vector2.up())
        // }
        if (KeyCode.isDownButNotHold(KeyCode.SPACE)) {
            // let rigidbody = this.getComponent(RigidBody)
            // if (rigidbody == null) {
            //     return
            // }
            // // let velocity = Vector2.multiply(Vector2.up(), this.jumpForce)
            // // rigidbody.setVelocity(velocity)
        }
    }
    private updateChildTransform() {
        this.spawnProjectilePos = Vector2.add(
            this.transform.getPosition(),
            new Vector2(this.transform.getScale().x / 2, -10)
        )
    }
    public onCollisionEnter(other: GameObject): void {
        // check if collide with Platform
        if (other instanceof Platform) {
            let platform = other as Platform
            platform.operation()
            if (platform.getCanJump()) {
                if (other.getTransform().getPosition().y <= 550) {
                    let distance = 550 - other.getTransform().getPosition().y
                    this.platFormManager.getPublisher().setData(distance)
                    this.platFormManager.getPublisher().notify()
                    this.scoreCalculator.addCurrentScore(50)
                }

                this.rb.setVelocity(Vector2.zero())
                this.rb.addForce(Vector2.up(), this.jumpForce)
                this.playerModel.handleJumpSprite()
            }
        }
    }

    private handleNormalSprite(deltaTime: number): void {
        if (this.collider.getIsTrigger()) {
            this.currentTime += deltaTime
            if (this.currentTime > this.maxChangeJumpToNormalTime) {
                this.currentTime = 0
                this.playerModel.handleNormalSprite()
            }
        } else {
            this.playerModel.handleNormalSprite()
        }
    }

    public setPlatformManager(platformManager: PlatformManager): void {
        this.platFormManager = platformManager
    }
    public getPosition(): Vector2 {
        return this.transform.getPosition()
    }
    public setPosition(position: Vector2): void {
        this.transform.setPosition(position)
    }
    public clearData(): void {
        this.setPosition(new Vector2(this.getPosition().x, 0))
    }
}
export default Player
