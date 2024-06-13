import GameObject from "../base-types/gameObject";
import Vector2 from "../base-types/vector2";
import Creator from "../patterns/factory/creator";
import Publisher from "../patterns/observer/publisher";
import MovablePlatform from "./movable-platform/movablePlatform";
import MovablePlatformCreator from "./movable-platform/movablePlatformCreator";
import Platform from "./platform";
import StablePlatform from "./stable-platform/stablePlatform";
import StablePlatformCreator from './stable-platform/stablePlatformCreator';
import UnstablePlatform from "./unstable-platform/unstablePlatform";
import UnstablePlatformCreator from './unstable-platform/unstablePlatformCreator';

class PlatformManager {
    private publisher: Publisher<number>;
    private platforms: Platform[];
    private physicObjs: GameObject[];
    private previousYPosition: number;
    private maxHeightToSpawn: number;
    private maxSpawnTime: number;
    private currentSpawnTime: number;

    private platformCreators: Creator[];

    constructor(){
        this.publisher = new Publisher<number>();
        this.platforms = [];
        this.previousYPosition = 500;
        this.maxHeightToSpawn = -2000;
        this.maxSpawnTime = 0.1;
        this.currentSpawnTime = 0;
        this.platformCreators = [];
        this.platformCreators.push(new StablePlatformCreator());
        this.platformCreators.push(new UnstablePlatformCreator());
        this.platformCreators.push(new MovablePlatformCreator());
    }
    public getPublisher(): Publisher<number>{
        return this.publisher;
    }
    public addPlatform(platform: Platform): void{
        this.platforms.push(platform);
    }
    public createPlatforms(deltaTime: number,canvasWidth: number) {
        this.currentSpawnTime+=deltaTime;
        let lastPlatform = this.getTheLastPlatform();
        var isMaxPlatform = true;
        if(lastPlatform!=null){
            isMaxPlatform = this.maxHeightToSpawn < lastPlatform.getTransform().getPosition().y;
        }
        
        if (this.currentSpawnTime>this.maxSpawnTime&&isMaxPlatform) {
            let position = new Vector2(Math.random() * canvasWidth, this.previousYPosition-100);
            let scale = new Vector2(100, 30);
            let platformCreatorIndex = Math.floor(Math.random() * this.platformCreators.length);
            let platformCreator = this.platformCreators[platformCreatorIndex];
            let product = platformCreator.createProduct(position, scale);
            let gameObj = product.getGameObject();
            if(gameObj instanceof Platform){
                let platform = gameObj as Platform;
                this.platforms.push(platform);
                this.publisher.subcribe(platform);
                this.physicObjs.push(platform);
            }
            
            if(lastPlatform!=null){
                this.previousYPosition = lastPlatform.getTransform().getPosition().y;
            }
            this.currentSpawnTime = 0;
        }

    }
    public createStablePlatform(position: Vector2, scale: Vector2){
        let platformCreator = this.platformCreators[0];
        let product = platformCreator.createProduct(position, scale);
        let gameObj = product.getGameObject();
        if(gameObj instanceof Platform){
            let platform = gameObj as Platform;
            this.platforms.push(platform);
            this.publisher.subcribe(platform);
        }
        this.physicObjs.push(gameObj);
    }
    private getTheLastPlatform(): Platform|null{
        if(this.platforms.length==0){
            return null;
        }
        return this.platforms[this.platforms.length-1];
    }

    public updatePlatforms(deltaTime: number, context: CanvasRenderingContext2D) {
        for(let i = this.platforms.length-1;i>=0;i--){
            if(this.platforms[i].getCanDestroy()){
                this.platforms.splice(i, 1);
                let indexPhysic = this.physicObjs.indexOf(this.platforms[i]);
                this.physicObjs.slice(indexPhysic, 1);
            }
            this.platforms[i].update(deltaTime);
            this.platforms[i].draw(context);
        }
        this.platforms.forEach(platform => {
            
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