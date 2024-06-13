import Vector2 from "../../base-types/vector2";
import ProductInterface from "../../types/factory/product";
import Platform from "../platform";

class StablePlatform extends Platform { 
    constructor(position: Vector2, scale: Vector2){
        super(position, scale, true);
        
        this.canJump = true;
        this.color = "red";
    }
    public operation(): void {
        // because it is stable, player can jump
    }
}
export default StablePlatform;