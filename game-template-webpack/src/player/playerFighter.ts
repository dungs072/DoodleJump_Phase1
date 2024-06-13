import Vector2 from "../base-types/vector2";
import Projectile from "../projectile/projectile";
import ProjectileManager from "../projectile/projectileManager";
import ComponentInterface from "../types/component";
import RenderInterface from "../types/render";
import SystemInterface from "../types/system";

class PlayerFighter implements ComponentInterface{
    private projectileManager: ProjectileManager;
    constructor(projectileManager: ProjectileManager){
        this.projectileManager = projectileManager;
    }
    public fight(spawnPosition: Vector2, direction: Vector2){
        let scale = new Vector2(10,10);
        let projectile = new Projectile(200, spawnPosition, scale, direction);
        this.projectileManager.addProjectile(projectile);
    }

}
export default PlayerFighter;