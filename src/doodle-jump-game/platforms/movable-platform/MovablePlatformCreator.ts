import Vector2 from '../../../game-engine/base-types/Vector2'
import Creator from '../../patterns/factory/Creator'
import ProductInterface from '../../types/factory/product'
import MovablePlatform from './MovablePlatform'

class MovablePlatformCreator extends Creator {
    public createProduct(position: Vector2, scale: Vector2): ProductInterface {
        return new MovablePlatform(position, scale)
    }
}
export default MovablePlatformCreator
