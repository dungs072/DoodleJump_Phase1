import Vector2 from "../../base-types/Vector2";
import Creator from "../../patterns/factory/Creator";
import ProductInterface from "../../types/factory/product";
import UnstablePlatform from "./UnstablePlatform";

class UnstablePlatformCreator extends Creator{
    public createProduct(position: Vector2, scale: Vector2): ProductInterface {
        return new UnstablePlatform(position, scale);
    }

}
export default UnstablePlatformCreator;