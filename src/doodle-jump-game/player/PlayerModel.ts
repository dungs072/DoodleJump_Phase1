import Sprite from '../../game-engine/base-types/components/render/Sprite'
import Vector2 from '../../game-engine/base-types/Vector2'
import PathResources from '../../game-engine/PathResources'
import Action from '../states/Action'
import GameObject from '../../game-engine/base-types/GameObject'

class PlayerModel extends GameObject {
    private leftJumpSprite: Sprite
    private leftNormalSprite: Sprite
    private rightJumpSprite: Sprite
    private rightNormalSprite: Sprite
    private forwardJumpSprite: Sprite
    private forwardNormalSprite: Sprite

    private currentSprite: Sprite

    constructor() {
        super()
        this.leftJumpSprite = new Sprite(PathResources.LEFT_JUMP)
        this.leftNormalSprite = new Sprite(PathResources.LEFT_NORMAL)
        this.rightJumpSprite = new Sprite(PathResources.RIGHT_JUMP)
        this.rightNormalSprite = new Sprite(PathResources.RIGHT_NORMAL)
        this.forwardJumpSprite = new Sprite(PathResources.FORWARD_JUMP)
        this.forwardNormalSprite = new Sprite(PathResources.FORWARD_NORMAL)
        //this.setCurrentSprite(this.leftNormalSprite)
        this.transform.setLocalPosition(new Vector2(-33, 0))
        this.takeAction(Action.LEFT_NORMAL)
    }
    public takeAction(action: Action): Sprite {
        if (action == Action.LEFT_NORMAL) {
            this.setCurrentSprite(this.leftNormalSprite)
        } else if (action == Action.LEFT_JUMP) {
            this.setCurrentSprite(this.leftJumpSprite)
        } else if (action == Action.FORWARD_JUMP) {
            this.setCurrentSprite(this.forwardJumpSprite)
        } else if (action == Action.FORWARD_NORMAL) {
            this.setCurrentSprite(this.forwardNormalSprite)
        } else if (action == Action.RIGHT_JUMP) {
            this.setCurrentSprite(this.rightJumpSprite)
        } else if (action == Action.RIGHT_NORMAL) {
            this.setCurrentSprite(this.rightNormalSprite)
        }
        return this.currentSprite
    }
    public getCurrentSprite(): Sprite {
        return this.currentSprite
    }
    public handleJumpSprite() {
        if (this.currentSprite == this.leftNormalSprite) {
            this.setCurrentSprite(this.leftJumpSprite)
        } else if (this.currentSprite == this.rightNormalSprite) {
            this.setCurrentSprite(this.rightJumpSprite)
        } else if (this.currentSprite == this.forwardNormalSprite) {
            this.setCurrentSprite(this.forwardJumpSprite)
        }
    }
    public handleNormalSprite() {
        if (this.currentSprite == this.leftJumpSprite) {
            this.setCurrentSprite(this.leftNormalSprite)
        } else if (this.currentSprite == this.rightJumpSprite) {
            this.setCurrentSprite(this.rightNormalSprite)
        } else if (this.currentSprite == this.forwardJumpSprite) {
            this.setCurrentSprite(this.forwardNormalSprite)
        }
    }
    private setCurrentSprite(sprite: Sprite): void {
        if (this.currentSprite) {
            this.removeComponent(this.currentSprite)
        }
        this.currentSprite = sprite
        this.addComponent(this.currentSprite)
    }
}
export default PlayerModel
