import Sprite from '../../game-engine/base-types/components/render/Sprite'
import Vector2 from '../../game-engine/base-types/Vector2'
import Action from '../states/Action'
import GameObject from '../../game-engine/base-types/GameObject'
import ResourcesManager from '../../game-engine/resources/ResourcesManager'

class PlayerModel extends GameObject {
    private sprite: Sprite
    private currentAction: Action
    constructor() {
        super()
        this.transform.setLocalPosition(new Vector2(-33, 0))
        this.sprite = new Sprite('')
        this.addComponent(this.sprite)
        this.takeAction(Action.LEFT_NORMAL)
    }
    public takeAction(action: Action): Sprite {
        if (action == Action.LEFT_NORMAL) {
            this.sprite.setImage(ResourcesManager.LeftNormalImage)
        } else if (action == Action.LEFT_JUMP) {
            this.sprite.setImage(ResourcesManager.LeftJumpImage)
        } else if (action == Action.FORWARD_JUMP) {
            this.sprite.setImage(ResourcesManager.ForwardJumpImage)
        } else if (action == Action.FORWARD_NORMAL) {
            this.sprite.setImage(ResourcesManager.ForwarNormalImage)
        } else if (action == Action.RIGHT_JUMP) {
            this.sprite.setImage(ResourcesManager.RightJumpImage)
        } else if (action == Action.RIGHT_NORMAL) {
            this.sprite.setImage(ResourcesManager.RightNormalImage)
        }
        this.currentAction = action
        return this.sprite
    }
    public getCurrentSprite(): Sprite {
        return this.sprite
    }
    public handleJumpSprite() {
        if (this.currentAction == Action.LEFT_NORMAL) {
            this.takeAction(Action.LEFT_JUMP)
        } else if (this.currentAction == Action.RIGHT_NORMAL) {
            this.takeAction(Action.RIGHT_JUMP)
        } else if (this.currentAction == Action.FORWARD_NORMAL) {
            this.takeAction(Action.FORWARD_JUMP)
        }
    }
    public handleNormalSprite() {
        if (this.currentAction == Action.LEFT_JUMP) {
            this.takeAction(Action.LEFT_NORMAL)
        } else if (this.currentAction == Action.RIGHT_JUMP) {
            this.takeAction(Action.RIGHT_NORMAL)
        } else if (this.currentAction == Action.FORWARD_JUMP) {
            this.takeAction(Action.FORWARD_NORMAL)
        }
    }
}
export default PlayerModel
