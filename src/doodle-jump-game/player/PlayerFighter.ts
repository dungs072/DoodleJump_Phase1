import Vector2 from '../../game-engine/base-types/Vector2'
import Projectile from '../projectile/Projectile'
import Component from '../../game-engine/base-types/components/Component'
import PhysicManager from '../../game-engine/physic/PhysicManager'

class PlayerFighter extends Component {
    public fight(spawnPosition: Vector2, direction: Vector2) {
        let scale = new Vector2(10, 10)
        let projectile = new Projectile(1000, spawnPosition, scale, direction)
    }
}
export default PlayerFighter
