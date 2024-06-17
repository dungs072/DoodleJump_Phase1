import Vector2 from '../../../game-engine/base-types/Vector2'
import Creator from '../../patterns/factory/Creator'
import ProductInterface from '../../../game-engine/types/factory/product'
import UnstablePlatform from './UnstablePlatform'

class UnstablePlatformCreator extends Creator {
    public createProduct(position: Vector2, scale: Vector2): ProductInterface {
        return new UnstablePlatform(position, scale)
    }
}
export default UnstablePlatformCreator
