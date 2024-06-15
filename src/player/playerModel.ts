import Sprite from "../base-types/Sprite";
import Vector2 from "../base-types/Vector2";
import PathResources from "../PathResources";
import Action from "../base-types/enums/Action";

class PlayerModel{
    private leftJumpSprite: Sprite;
    private leftNormalSprite: Sprite;
    private rightJumpSprite: Sprite;
    private rightNormalSprite: Sprite;
    private forwardJumpSprite: Sprite;
    private forwardNormalSprite: Sprite;

    private currentSprite: Sprite;

    constructor(position: Vector2){
        this.leftJumpSprite = new Sprite(PathResources.LEFT_JUMP, position);
        this.leftNormalSprite = new Sprite(PathResources.LEFT_NORMAL, position);
        this.rightJumpSprite = new Sprite(PathResources.RIGHT_JUMP, position);
        this.rightNormalSprite = new Sprite(PathResources.RIGHT_NORMAL, position);
        this.forwardJumpSprite = new Sprite(PathResources.FORWARD_JUMP, position);
        this.forwardNormalSprite = new Sprite(PathResources.FORWARD_NORMAL, position);
        this.currentSprite = this.leftNormalSprite;
    }
    public takeAction(action: Action): Sprite{
        if(action==Action.LEFT_JUMP){
            this.currentSprite = this.leftJumpSprite;
        }
        else if(action==Action.LEFT_NORMAL){
            this.currentSprite = this.leftNormalSprite;
        }
        else if(action==Action.FORWARD_JUMP){
            this.currentSprite = this.forwardJumpSprite;
        }
        else if(action==Action.FORWARD_NORMAL){
            this.currentSprite = this.forwardNormalSprite;
        }
        else if(action==Action.RIGHT_JUMP){
            this.currentSprite = this.rightJumpSprite;
        }
        else if(action==Action.RIGHT_NORMAL){
            this.currentSprite = this.rightNormalSprite;
        }
        return this.currentSprite;
    }
    public getCurrentSprite(): Sprite{
        return this.currentSprite;
    }
    public setPosition(position: Vector2):void{
        this.currentSprite.setPosition(position);
    }
    public handleJumpSprite(){
        if(this.currentSprite==this.leftNormalSprite){
            this.currentSprite = this.leftJumpSprite;
        }
        else if(this.currentSprite==this.rightNormalSprite){
            this.currentSprite = this.rightJumpSprite;
        }
        else if(this.currentSprite==this.forwardNormalSprite){
            this.currentSprite = this.forwardJumpSprite;
        }
    }
    public handleNormalSprite(){
        if(this.currentSprite==this.leftJumpSprite){
            this.currentSprite = this.leftNormalSprite;
        }
        else if(this.currentSprite==this.rightJumpSprite){
            this.currentSprite = this.rightNormalSprite;
        }
        else if(this.currentSprite==this.forwardJumpSprite){
            this.currentSprite = this.forwardNormalSprite;
        }
    }


}
export default PlayerModel;