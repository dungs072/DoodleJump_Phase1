import Transform from "./base-types/components/transform";
import GameObject from "./base-types/gameObject";
import Vector2 from "./base-types/vector2";
import Player from "./player/player";
import RigidBody from "./base-types/components/rigidbody";
import Collider from "./base-types/components/collider";
import Platform from "./platforms/platform";
import PlatformManager from './platforms/platformManager';
import StablePlatform from "./platforms/stable-platform/stablePlatform";
class Game {
    private readonly fixedDeltaTime = 0.02;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    player: Player;
    physicObjs: GameObject[];
    notStaticPhysicObjs: GameObject[];
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
        this.physicObjs = [];
        this.notStaticPhysicObjs = [];
        this.lastRenderTime = 0;

        this.notStaticPhysicObjs.push(this.player);
        this.platformManager.setPhysicObjs(this.physicObjs);
        let platformPosition = new Vector2(playerPosition.x-50, playerPosition.y+playerScale.y);
        let scale = new Vector2(100, 30);
        this.platformManager.createStablePlatform(platformPosition, scale);
        this.start();
    }

    private start(): void {
        this.update();
        setInterval(() => this.fixedUpdate(), this.fixedDeltaTime);
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
        this.handleCorePhysic();
    }
    private handleCorePhysic(): void {
        for (let i = 0; i < this.notStaticPhysicObjs.length; i++) {
            
            let rigidbody = this.notStaticPhysicObjs[i].getComponent(RigidBody);
            let transform = this.notStaticPhysicObjs[i].getComponent(Transform);
            if (transform == null) {
                return;
            }
            let collider = this.notStaticPhysicObjs[i].getComponent(Collider);
            if (collider == null) {
                return;
            }
            var topLeft = new Vector2(transform.getPosition().x, transform.getPosition().y + 25);
            var downRight = new Vector2(transform.getScale().x, transform.getScale().y-25);

            collider.setBounds(topLeft, downRight);
            for (let j = 0; j < this.physicObjs.length; j++) {
                if(this.notStaticPhysicObjs[i]==this.physicObjs[j]){
                    continue;
                }
                let otherCollider = this.physicObjs[j].getComponent(Collider);
                
                if (otherCollider == null) {
                    continue;
                }

                if (!collider.getIsTrigger()&&collider.hasCollision(otherCollider)) {
                    this.notStaticPhysicObjs[i].onCollisionEnter(this.physicObjs[j]);
                }
                
            }

            if (rigidbody == null) {
                return;
            }
            if (!rigidbody.getVelocity().isZero()) {
                let jumpPosition = Vector2.multiply(rigidbody.getVelocity(), this.fixedDeltaTime);
                let newPosition = Vector2.add(transform.getPosition(), jumpPosition);
                transform.setPosition(newPosition);
                rigidbody.clampToZeroVelocity(this.fixedDeltaTime * 50);
            }
            if (rigidbody?.canUseGravity()) {
                let distance = rigidbody.getMass() * this.fixedDeltaTime;
                let dropPosition = Vector2.multiply(Vector2.down(), distance);

                let newPosition = Vector2.add(transform.getPosition(), dropPosition);
                transform.setPosition(newPosition);
            }
        }
        for(let i =0;i< this.physicObjs.length;i++){
            let collider = this.physicObjs[i].getComponent(Collider);
            if (collider == null) {
                return;
            }
            let transform = this.physicObjs[i].getComponent(Transform);
            if (transform == null) {
                return;
            }
            let downRight = collider.getDownRightBound()
            collider.setBounds(transform.getPosition(), downRight);
        }
    }

    private clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

   
}
// Start the game
const game = new Game();

