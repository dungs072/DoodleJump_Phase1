import Sprite from "./sprite";
import Vector2 from "./vector2";
import RenderInterface from '../types/render';

class Animation {
    private sprites: Sprite[];
    private position: Vector2;
    private canLoop: boolean;
    private maxTimePerSprite: number;
    private currentTime: number;
    private currentIndex: number;
    private isDone: boolean = false;
    constructor(paths: string[], position: Vector2, maxTimePerSprite: number){
        this.sprites = [];
        for(let i =0;i< paths.length;i++){
            let sprite = new Sprite(paths[i], position);
            this.sprites.push(sprite);
        }
        this.position = position;
        this.canLoop = false;
        this.maxTimePerSprite = maxTimePerSprite;
        this.currentTime = maxTimePerSprite;
        this.currentIndex = 0;
    }
    draw(context: CanvasRenderingContext2D, deltaTime: number): void {
        this.sprites[this.currentIndex].setPosition(this.position);
        this.sprites[this.currentIndex].draw(context);
        
        if(this.isDone){
            return;
        }
        this.currentTime+=deltaTime;
        if(this.currentTime>=this.maxTimePerSprite){
            this.currentIndex = (this.currentIndex+1)%this.sprites.length;
            this.currentTime = 0;
        }
        
        this.isDone = !this.canLoop && this.currentIndex==(this.sprites.length-1);
        
    }
    public setPosition(position: Vector2): void{
        this.position = position;
    }

}
export default Animation;