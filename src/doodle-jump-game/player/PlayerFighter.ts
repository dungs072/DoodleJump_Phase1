import Vector2 from '../../game-engine/base-types/Vector2'
import Projectile from '../projectile/Projectile'

class PlayerFighter {
    public fight(spawnPosition: Vector2, direction: Vector2) {
        const scale = new Vector2(10, 10)
        const projectile = new Projectile(1000, spawnPosition, scale, direction)
    }
}
export default PlayerFighter
