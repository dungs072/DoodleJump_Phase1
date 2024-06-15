import Transform from '../base-types/components/Transform'
import Vector2 from '../base-types/Vector2'
import ComponentInterface from '../types/component'

class Movement implements ComponentInterface {
    public move(deltaTime: number, direction: Vector2, speed: number, transform: Transform): void {
        if (transform == null) {
            return
        }
        let distance = Vector2.multiply(direction, deltaTime * speed)
        let newPosition = Vector2.add(transform?.getPosition(), distance)
        transform.setPosition(newPosition)
    }
}
export default Movement
