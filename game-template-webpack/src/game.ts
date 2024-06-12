import Transform from "./base-types/components/transform";
import GameObject from "./base-types/gameObject";
import Vector2 from "./base-types/vector2";
import Player from "./player/player";
import RigidBody from "./base-types/components/rigidbody";
import PhysicData from "./base-types/physics/physicData";
import Collider from "./base-types/components/collider";
import Platform from "./platforms/platform";
import PhysicsInterface from "./types/physicSystem";
class Game {
    private readonly fixedDeltaTime = 0.02;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    player: Player;
    platforms: Platform[];
    physicObjs: GameObject[];
    notStaticPhysicObjs: GameObject[];
    lastRenderTime: number;
    playerCollider: Collider;
    playerRigidbody: RigidBody;

    constructor() {
        this.canvas = document.createElement('canvas') as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d')!;
        this.canvas.width = 800;
        this.canvas.height = 600;

        document.body.appendChild(this.canvas);
        let playerPosition = new Vector2(this.canvas.width / 2, this.canvas.height - 50);
        let playerScale = new Vector2(50, 50);
        this.player = new Player(playerPosition, playerScale);
        this.platforms = [];
        this.physicObjs = [];
        this.notStaticPhysicObjs = [];
        this.lastRenderTime = 0;

        this.notStaticPhysicObjs.push(this.player);
        console.log(this.notStaticPhysicObjs[0]);
        this.start();
    }

    private start(): void {
        this.playerCollider = this.player.getComponent(Collider)!;
        this.playerRigidbody = this.player.getComponent(RigidBody)!;
        this.update();
        setInterval(() => this.fixedUpdate(), this.fixedDeltaTime);
    }

    private update(): void {
        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastRenderTime) / 1000;
        this.lastRenderTime = currentTime;
        this.clearCanvas();

        // write code here
        this.createPlatforms();
        this.updatePlatforms(deltaTime);

        this.player.update(deltaTime);
        this.player.draw(this.context);


        // write code here
        requestAnimationFrame(() => this.update());

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
            let downRight = collider.getDownRightBound()
            collider.setBounds(transform.getPosition(), downRight);
            for (let j = 0; j < this.physicObjs.length; j++) {
                if(this.notStaticPhysicObjs[i]==this.physicObjs[j]){
                    continue;
                }
                let otherCollider = this.physicObjs[j].getComponent(Collider);
                if (otherCollider == null) {
                    continue;
                }
                if (!collider.getIsTrigger()&&collider.hasCollision(otherCollider)) {
                    this.notStaticPhysicObjs[i].OnCollisionEnter(otherCollider);
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
    }

    private clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private createPlatforms() {
        if (Math.random() < 0.01) {
            let position = new Vector2(Math.random() * this.canvas.width, Math.random() * this.canvas.height);
            let scale = new Vector2(150, 30);
            let platform = new Platform(position, scale);
            this.platforms.push(platform);
            this.physicObjs.push(platform);
        }
    }

    private updatePlatforms(deltaTime: number) {
        this.platforms.forEach(obstacle => {
            //obstacle.update(deltaTime);
            obstacle.draw(this.context);
        });
        this.platforms = this.platforms.filter(obstacle => !obstacle.isOutsideCanvas(this.canvas));
    }
}
// Start the game
const game = new Game();

