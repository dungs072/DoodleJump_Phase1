import Vector2 from "./base-types/vector2";
import Player from "./player/player";
import PlatformManager from './platforms/platformManager';
import PhysicManager from "./physic/physicManager";
class Game {

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    player: Player;
   
    lastRenderTime: number;
    platformManager: PlatformManager;

    constructor() {
        this.canvas = document.createElement('canvas') as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d')!;
        this.canvas.width = 800;
        this.canvas.height = 600;

        document.body.appendChild(this.canvas);
        let playerPosition = new Vector2(this.canvas.width / 2, this.canvas.height - 100);
        let playerScale = new Vector2(30, 30);
        this.player = new Player(playerPosition, playerScale);
        this.platformManager = new PlatformManager();
        this.player.SetPlatFormManager(this.platformManager);
        this.lastRenderTime = 0;
        PhysicManager.getInstance().addNotStaticPhysicObj(this.player);
        let platformPosition = new Vector2(playerPosition.x-50, playerPosition.y+playerScale.y);
        let scale = new Vector2(100, 30);
        this.platformManager.createStablePlatform(platformPosition, scale);
        this.start();
    }

    private start(): void {
        this.update();
        let fixedDeltaTime = PhysicManager.getInstance().getFixedDeltaTime();
        
        setInterval(() => this.fixedUpdate(), fixedDeltaTime);
    }

    private update(): void {
        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastRenderTime) / 1000;
        this.lastRenderTime = currentTime;
        this.clearCanvas();

        // write code here
        this.platformManager.createPlatforms(deltaTime, this.canvas.width-200);
        this.platformManager.updatePlatforms(deltaTime, this.context);

        this.HandlePlayer(deltaTime);
        


        // write code here
        requestAnimationFrame(() => this.update());

    }
    private HandlePlayer(deltaTime: number){
        this.player.update(deltaTime);
        this.player.draw(this.context);
        if(this.player.getPosition().x>this.canvas.width){
            let newPos = new Vector2(0, this.player.getPosition().y);
            this.player.setPosition(newPos);
        }
        if(this.player.getPosition().x<0){
            let newPos = new Vector2(this.canvas.width, this.player.getPosition().y);
            this.player.setPosition(newPos);
        }
    }

    private fixedUpdate(): void {
        // write code relate to physics here


        // write code here
        PhysicManager.getInstance().handleCorePhysic();
    }


    private clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

   
}
// Start the game
const game = new Game();

