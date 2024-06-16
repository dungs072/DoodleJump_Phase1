import PhysicManager from '../physic/PhysicManager'
import Projectile from './Projectile'

class ProjectileManager {
    private projectiles: Projectile[]
    constructor() {
        this.projectiles = []
    }
    public addProjectile(projectile: Projectile) {
        PhysicManager.getInstance().addNotStaticPhysicObj(projectile)
        this.projectiles.push(projectile)
    }

    public update(deltaTime: number) {
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            this.projectiles[i].update(deltaTime)
            if (this.projectiles[i].getCanDestroy()) {
                PhysicManager.getInstance().removeNotStaticPhysicObjs(this.projectiles[i])
                this.projectiles.splice(i, 1)
            }
        }
    }
    public draw(context: CanvasRenderingContext2D): void {
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            this.projectiles[i].draw(context)
        }
    }
    public clearData(): void {
        this.projectiles = []
    }
}
export default ProjectileManager
