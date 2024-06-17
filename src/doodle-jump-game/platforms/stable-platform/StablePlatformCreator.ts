import Vector2 from '../../../game-engine/base-types/Vector2'
import Creator from '../../patterns/factory/Creator'
import ProductInterface from '../../types/factory/product'
import StablePlatform from './StablePlatform'

class StablePlatformCreator extends Creator {
    public createProduct(position: Vector2, scale: Vector2): ProductInterface {
        return new StablePlatform(position, scale)
    }
}
export default StablePlatformCreator
