import Vector2 from '../../game-engine/base-types/Vector2'
import Projectile from '../projectile/Projectile'
import ProjectileManager from '../projectile/ProjectileManager'
import Component from '../../game-engine/base-types/components/Component'

class PlayerFighter extends Component {
    private projectileManager: ProjectileManager
    constructor(projectileManager: ProjectileManager) {
        super()
        this.projectileManager = projectileManager
    }
    public fight(spawnPosition: Vector2, direction: Vector2) {
        let scale = new Vector2(10, 10)
        let projectile = new Projectile(200, spawnPosition, scale, direction)
        this.projectileManager.addProjectile(projectile)
    }
}
export default PlayerFighter
