import Sprite from "../../base-types/sprite";
import Vector2 from "../../base-types/vector2";
import PathResources from "../../pathResources";
import ProductInterface from "../../types/factory/product";
import Platform from "../platform";

class StablePlatform extends Platform { 
    constructor(position: Vector2, scale: Vector2){
        super(position, scale, true);
        
        this.canJump = true;
        this.color = "red";
        this.sprite = new Sprite(PathResources.STABLE_PLATFORM, position);
    }
    public operation(): void {
        // because it is stable, player can jump
    }
}
export default StablePlatform;