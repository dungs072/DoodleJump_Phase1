import Transform from '../../game-engine/base-types/components/Transform'
import Vector2 from '../../game-engine/base-types/Vector2'
import Component from '../../game-engine/base-types/components/Component'

class Movement extends Component {
    public move(deltaTime: number, direction: Vector2, speed: number, transform: Transform): void {
        if (transform == null) {
            return
        }
        const distance = Vector2.multiply(direction, deltaTime * speed)
        const newPosition = Vector2.add(transform?.getPosition(), distance)
        transform.setPosition(newPosition)
    }
}
export default Movement
