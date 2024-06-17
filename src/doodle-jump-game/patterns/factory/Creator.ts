import Vector2 from '../../../game-engine/base-types/Vector2'
import ProductInterface from '../../types/factory/product'

abstract class Creator {
    public abstract createProduct(position: Vector2, scale: Vector2): ProductInterface

    // public operate(position: Vector2, scale: Vector2): void{
    //     let product = this.createProduct(position, scale);
    //     product.operation();
    // }
}

export default Creator
