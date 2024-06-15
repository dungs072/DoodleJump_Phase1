import Vector2 from "../../base-types/vector2";
import Creator from "../../patterns/factory/creator";
import ProductInterface from "../../types/factory/product";
import UnstablePlatform from "./unstablePlatform";

class UnstablePlatformCreator extends Creator{
    public createProduct(position: Vector2, scale: Vector2): ProductInterface {
        return new UnstablePlatform(position, scale);
    }

}
export default UnstablePlatformCreator;