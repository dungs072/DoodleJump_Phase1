import GameObject from '../../game-engine/base-types/GameObject'
import Vector2 from '../../game-engine/base-types/Vector2'
import Transform from '../../game-engine/base-types/components/Transform'
import SystemInterface from '../../game-engine/types/system'
import InputHandler from '../../game-engine/input/InputHandler'
import Collider from '../../game-engine/base-types/components/physic/Collider'
import Movement from '../general/Movement'
import Platform from '../platforms/Platform'
import PlayerFighter from './PlayerFighter'
import PlayerModel from './PlayerModel'

import ScoreCalculate from '../score/ScoreCalculator'
import Action from '../states/Action'
import Publisher from '../patterns/observer/Publisher'
import UIManager from '../ui/UIManager'
import Item from '../items/Item'
import Shoes from '../items/shoes/Shoes'
import Propeller from '../items/propeller/Propeller'
import RigidBody from '../../game-engine/base-types/components/physic/Rigidbody'

class Player extends GameObject implements SystemInterface {
    private jumpForce: number
    private movementSpeed: number

    private spawnProjectilePos: Vector2

    private collider: Collider
    private rb: RigidBody
    private movement: Movement
    private fighter: PlayerFighter
    private scoreCalculator: ScoreCalculate

    private publisher: Publisher<number>
    private playerModel: PlayerModel

    private previousHeight: number
    private maxHeight: number

    private maxBorder: number

    private maxHeightFlight: number
    private flySpeed: number
    private canFly: boolean

    private isOver: boolean

    private inputHandler: InputHandler

    constructor(position: Vector2, scale: Vector2) {
        super()
        this.inputHandler = InputHandler.getInstance()
        this.transform.setPosition(position)
        this.transform.setScale(scale)
        this.start()
    }

    public start(): void {
        this.movementSpeed = 450
        this.jumpForce = 700
        this.canFly = false
        this.isOver = false

        this.movement = new Movement()
        this.addComponent(this.movement)

        this.collider = new Collider()
        this.collider.setOffset(110)
        const topLeft = new Vector2(
            this.transform.getPosition().x,
            this.transform.getPosition().y + this.collider.getOffset()
        )
        const downRight = new Vector2(
            this.transform.getScale().x,
            this.transform.getScale().y - this.collider.getOffset()
        )
        this.collider.setBounds(topLeft, downRight)
        this.addComponent(this.collider)
        this.collider.setIsStatic(false)

        this.rb = new RigidBody()
        this.rb.setMass(400)
        this.rb.setUseGravity(true)
        this.addComponent(this.rb)

        this.spawnProjectilePos = Vector2.add(
            this.transform.getPosition(),
            new Vector2(this.transform.getScale().x / 2, -10)
        )

        this.playerModel = new PlayerModel()
        this.addChild(this.playerModel)
        this.scoreCalculator = new ScoreCalculate()
        this.fighter = new PlayerFighter()

        this.addComponent(this.fighter)
        this.previousHeight = this.transform.getPosition().y
        this.maxHeight = 300
    }
    public update(deltaTime: number): void {
        if (this.isOver) {
            return
        }
        this.handleInput(deltaTime)
        this.updateSpawnProjectilePos()
        this.handleTrigger()
        this.handleFly(deltaTime)
        this.calculateHeight()
    }

    private handleInput(deltaTime: number) {
        if (InputHandler.isDown('ArrowLeft')) {
            const direction = Vector2.left()
            this.movement.move(deltaTime, direction, this.movementSpeed, this.transform)
            this.playerModel.takeAction(Action.LEFT_NORMAL)
        }
        if (InputHandler.isDown('ArrowRight')) {
            const direction = Vector2.right()
            this.movement.move(deltaTime, direction, this.movementSpeed, this.transform)
            this.playerModel.takeAction(Action.RIGHT_NORMAL)
        }
        // if (InputHandler.isDownButNotHold('ArrowUp')) {
        //     this.playerModel.takeAction(Action.FORWARD_NORMAL)
        //     this.fighter.fight(this.spawnProjectilePos, Vector2.up())
        // }
    }
    private updateSpawnProjectilePos() {
        this.spawnProjectilePos = Vector2.add(
            this.transform.getPosition(),
            new Vector2(this.transform.getScale().x / 2 - 5, -10)
        )
    }
    private handleTrigger(): void {
        this.collider.setIsTrigger(this.transform.getPosition().y < this.previousHeight)
        this.previousHeight = this.transform.getPosition().y

        if (!this.collider.getIsTrigger()) {
            this.publisher.setData(this.maxBorder)
            this.publisher.notify()
            this.playerModel.handleNormalSprite()
        } else {
            this.playerModel.handleJumpSprite()
        }
    }
    private handleFly(deltaTime: number): void {
        if (this.canFly) {
            if (this.getPosition().y > this.maxHeightFlight) {
                this.movement.move(deltaTime, Vector2.up(), this.flySpeed, this.transform)
            } else {
                this.canFly = false
                this.rb.setUseGravity(!this.canFly)
            }
        }
    }
    private calculateHeight(): void {
        if (this.maxHeight > this.transform.getPosition().y) {
            const num = Math.floor(this.maxHeight - this.transform.getPosition().y)
            this.setScore(num)
            this.maxHeight = this.transform.getPosition().y
        }
    }
    public onCollisionEnter(other: GameObject): void {
        // check if collide with Platform
        if (other instanceof Item) {
            other.operation()
            if (other instanceof Shoes) {
                this.rb.addForce(Vector2.up(), other.getForceAmount())
            }
            if (other instanceof Propeller) {
                this.addChild(other)
                this.maxHeightFlight =
                    -other.getMaxDistanceFlight() + this.transform.getPosition().y
                this.canFly = true
                this.rb.setUseGravity(!this.canFly)
                this.flySpeed = other.getFlySpeed()
            }
        } else if (other instanceof Platform) {
            other.operation()
            if (other.getCanJump()) {
                this.rb.setVelocity(Vector2.zero())
                this.rb.addForce(Vector2.up(), this.jumpForce)
            }
        }
    }

    public setPublisher(publisher: Publisher<number>): void {
        this.publisher = publisher
    }

    public getPosition(): Vector2 {
        return this.transform.getPosition()
    }
    public setPosition(position: Vector2): void {
        this.transform.setPosition(position)
    }
    public setScore(num: number): void {
        this.scoreCalculator.addCurrentScore(num)
        UIManager.getInstance().setScoreText(this.scoreCalculator.getCurrentScore().toString())
    }
    public setMaxBorder(num: number): void {
        this.maxBorder = num
    }
    public saveHighScore(): void {
        this.scoreCalculator.saveHighScore()
        UIManager.getInstance()
            .getGameOverMenuUI()
            .setHighScore(this.scoreCalculator.getHighScore())
        UIManager.getInstance()
            .getGameOverMenuUI()
            .setCurrentScore(this.scoreCalculator.getCurrentScore())
    }
    public clearData(): void {
        this.setPosition(new Vector2(this.getPosition().x, 0))
        this.scoreCalculator.setCurrentScore(0)
        UIManager.getInstance().setScoreText('0')
    }
    public setIsOver(state: boolean) {
        this.isOver = state
    }
}
export default Player
