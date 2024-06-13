import GameObject from "../base-types/gameObject";
import Vector2 from "../base-types/vector2";
import Publisher from "../patterns/observer/publisher";
import Platform from "./platform";

class PlatformManager {
    private publisher: Publisher<number>;
    private platforms: Platform[];
    private physicObjs: GameObject[]
    private previousYPosition: number;
    private maxSpawnTime: number;
    private currentSpawnTime: number;
    constructor(){
        this.publisher = new Publisher<number>();
        this.platforms = [];
        this.previousYPosition = 500;
        this.maxSpawnTime = 0.2;
        this.currentSpawnTime = 0;
    }
    public getPublisher(): Publisher<number>{
        return this.publisher;
    }
    public addPlatform(platform: Platform): void{
        this.platforms.push(platform);
    }
    public createPlatforms(deltaTime: number,canvasWidth: number) {
        this.currentSpawnTime+=deltaTime;
        if (this.currentSpawnTime>this.maxSpawnTime) {
            let position = new Vector2(Math.random() * canvasWidth, this.previousYPosition-100);
            let scale = new Vector2(100, 30);
            let platform = new Platform(position, scale);
            this.platforms.push(platform);
            this.physicObjs.push(platform);
            this.publisher.subcribe(platform);
            this.previousYPosition = position.y;
            this.currentSpawnTime = 0;
        }

    }

    public updatePlatforms(deltaTime: number, context: CanvasRenderingContext2D) {
        this.platforms.forEach(platform => {
            platform.update(deltaTime);
            platform.draw(context);
        });
        // this.platforms = this.platforms.filter(platform => !platform.isOutsideCanvas(this.canvas));
    }
    public getPlatforms(): Platform[]{
        return this.platforms;
    }
    public setPhysicObjs(physicObjs: GameObject[]): void{
        this.physicObjs = physicObjs;
    }
}
export default PlatformManager;