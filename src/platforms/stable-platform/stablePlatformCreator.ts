import Vector2 from "../../base-types/vector2";
import Creator from "../../patterns/factory/creator";
import ProductInterface from "../../types/factory/product";
import StablePlatform from "./stablePlatform";

class StablePlatformCreator extends Creator{
    public createProduct(position: Vector2, scale: Vector2): ProductInterface {
        return new StablePlatform(position, scale);
    }

}
export default StablePlatformCreator;