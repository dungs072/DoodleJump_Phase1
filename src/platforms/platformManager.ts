import GameObject from "../base-types/GameObject";
import Vector2 from "../base-types/Vector2";
import Creator from "../patterns/factory/Creator";
import Publisher from "../patterns/observer/Publisher";
import PhysicManager from '../physic/PhysicManager';
import MovablePlatformCreator from "./movable-platform/MovablePlatformCreator";
import Platform from "./Platform";
import StablePlatformCreator from './stable-platform/StablePlatformCreator';
import UnstablePlatformCreator from './unstable-platform/UnstablePlatformCreator';

class PlatformManager {
    private publisher: Publisher<number>;
    private platforms: Platform[];
    //private physicObjs: GameObject[];
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
    public createPlatforms(deltaTime: number, canvasWidth: number) {
        this.currentSpawnTime+=deltaTime;
        let lastPlatform = this.getTheLastPlatform();
        let isMaxPlatform = true;
        if(lastPlatform!=null){
            isMaxPlatform = this.maxHeightToSpawn < lastPlatform.getTransform().getPosition().y;
        }
        
        if (this.currentSpawnTime>this.maxSpawnTime&&isMaxPlatform) {
            let position = new Vector2(Math.random() * canvasWidth, this.previousYPosition-150);
            let scale = new Vector2(120, 30);
            let platformCreatorIndex = Math.floor(Math.random() * this.platformCreators.length);
            let platformCreator = this.platformCreators[platformCreatorIndex];
            let product = platformCreator.createProduct(position, scale);
            let gameObj = product.getGameObject();
            if(gameObj instanceof Platform){
                this.platforms.push(gameObj);
                this.publisher.subcribe(gameObj);
                PhysicManager.getInstance().addphysicObjs(gameObj);
            }
            
            if(lastPlatform!=null){
                this.previousYPosition = lastPlatform.getTransform().getPosition().y;
            }
            this.currentSpawnTime = 0;
        }

    }
    public createStablePlatform(position: Vector2, scale: Vector2): GameObject{
        let platformCreator = this.platformCreators[0];
        let product = platformCreator.createProduct(position, scale);
        let gameObj = product.getGameObject();
        if(gameObj instanceof Platform){
            this.platforms.push(gameObj);
            this.publisher.subcribe(gameObj); 
            PhysicManager.getInstance().addphysicObjs(gameObj);
        }
        return gameObj;
    }
    private getTheLastPlatform(): Platform|null{
        if(this.platforms.length==0){
            return null;
        }
        return this.platforms[this.platforms.length-1];
    }

    public updatePlatforms(deltaTime: number, context: CanvasRenderingContext2D) {
        for(let i = this.platforms.length-1;i>=0;i--){
            this.platforms[i].update(deltaTime);
            this.platforms[i].draw(context);
            if(this.platforms[i].getCanDestroy()){
                PhysicManager.getInstance().removePhysicObjs(this.platforms[i]);
                this.publisher.unsubcribe(this.platforms[i]);
                this.platforms.splice(i, 1);
            }

        }
        
        //console.log(PhysicManager.getInstance().getFirstLengthPhysicObjs());
        // this.platforms = this.platforms.filter(platform => !platform.isOutsideCanvas(this.canvas));
    }
    public getPlatforms(): Platform[]{
        return this.platforms;
    }
    public clearData(): void{
        this.platformCreators = [];
        this.platforms = [];
    }
}
export default PlatformManager;