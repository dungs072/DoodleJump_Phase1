import Transform from "../../base-types/components/transform";
import Vector2 from "../../base-types/vector2";
import ProductInterface from "../../types/factory/product";
import Platform from "../platform";

class UnstablePlatform extends Platform {
    private dropDownSpeed: number;
    private isStomped: boolean;
    private maxDropDownDistance: number;
    private previousY: number;
    
    constructor(position: Vector2, scale: Vector2){
        super(position, scale, false);
        this.canJump = false;
        this.dropDownSpeed = 200;
        this.isStomped = false;
        this.maxDropDownDistance = 100;
        this.color = "brown";
        this.canDestroy = false;
    }

    public update(deltaTime: number): void {
        super.update(deltaTime);
        if(this.isStomped&&!this.canDestroy){
            if(this.transform.getPosition().y>=this.previousY+this.maxDropDownDistance){
                this.canDestroy = true;
                //this.setCanDraw(false);
            }
            this.movement.move(deltaTime, Vector2.down(), this.dropDownSpeed, this.transform);
        }
    }

    public operation(): void {
        this.isStomped = true;
        this.previousY = this.transform.getPosition().y;
    }

}
export default UnstablePlatform;