import GameObject from "../base-types/gameObject";
import RenderInterface from "../types/render";
import SystemInterface from "../types/system";

class Projectile extends GameObject implements SystemInterface, RenderInterface{
    private speed: number;
    constructor(speed: number){
        super();
        this.speed = speed;
    }

    public start(): void {
        
    }
    public update(deltaTime: number): void {
        
    }
    public draw(context: CanvasRenderingContext2D): void {
        
    }

}
export default Projectile;