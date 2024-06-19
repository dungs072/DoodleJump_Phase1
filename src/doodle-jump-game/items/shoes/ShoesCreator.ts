import Vector2 from '../../../game-engine/base-types/Vector2'
import Creator from '../../patterns/factory/Creator'
import ProductInterface from '../../types/factory/product'
import Shoes from './Shoes'
import MovablePlatform from './Shoes'

class ShoesCreator extends Creator {
    public createProduct(position: Vector2, scale: Vector2): ProductInterface {
        return new Shoes(position, scale)
    }
}
export default ShoesCreator
