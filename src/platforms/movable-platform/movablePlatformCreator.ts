import Vector2 from "../../base-types/vector2";
import Creator from "../../patterns/factory/creator";
import ProductInterface from "../../types/factory/product";
import MovablePlatform from "./movablePlatform";

class MovablePlatformCreator extends Creator{
    public createProduct(position: Vector2, scale: Vector2): ProductInterface {
        return new MovablePlatform(position, scale);
    }
}
export default MovablePlatformCreator;