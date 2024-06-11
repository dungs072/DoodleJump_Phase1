import Transform from "./base-types/components/transform";
import GameObject from "./base-types/gameObject";
import Vector2 from "./base-types/vector2";
import Player from "./player/player";
import RigidBody from "./base-types/components/rigidbody";
import PhysicData from "./base-types/physics/physicData";
import Collider from "./base-types/components/collider";
class Game {
    private readonly fixedDeltaTime = 0.02;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    player: Player;
    obstacles: Obstacle[];
    physicObjs: GameObject[];
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
        this.obstacles = [];
        this.physicObjs = [];
        this.lastRenderTime = 0;

        this.physicObjs.push(this.player);
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

        this.player.update(deltaTime);
        this.player.draw(this.context);

        this.createObstacles();
        this.updateObstacles(deltaTime);

        requestAnimationFrame(() => this.update());

    }

    private fixedUpdate(): void {
        for (let i = 0; i < this.physicObjs.length; i++) {
            let rigidbody = this.physicObjs[i].getComponent(RigidBody);
            let transform = this.physicObjs[i].getComponent(Transform);
            if (transform == null) {
                return;
            }
            if (rigidbody == null) {
                return;
            }
            if (!rigidbody.getVelocity().isZero()) {
                let jumpPosition = Vector2.multiply(rigidbody.getVelocity(), this.fixedDeltaTime);
                let newPosition = Vector2.add(transform.getPosition(), jumpPosition);
                transform.setPosition(newPosition);
                rigidbody.decreaseToZeroVelocity(this.fixedDeltaTime * 50);
            }
            if (rigidbody?.canUseGravity()) {
                let distance = rigidbody.getMass() * this.fixedDeltaTime;
                let dropPosition = Vector2.multiply(Vector2.down(), distance);

                let newPosition = Vector2.add(transform.getPosition(), dropPosition);
                transform.setPosition(newPosition);
            }
            let collider = this.physicObjs[i].getComponent(Collider);
            if (collider == null) {
                return;
            }
            collider.setBounds(transform.getPosition(), transform.getScale());
            if (!(this.physicObjs[i] instanceof Player)) {
                if (collider.hasCollision(this.playerCollider)) {
                    //console.log("collision detection");
                }
            }

        }
    }

    private clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private createObstacles() {
        if (Math.random() < 0.01) { // Adjust this value to control obstacle spawn rate
            const obstacle = new Obstacle(Math.random() * this.canvas.width,
                Math.random() * this.canvas.width, 30, 30);
            this.obstacles.push(obstacle);
            this.physicObjs.push(obstacle);
        }
    }

    private updateObstacles(deltaTime: number) {
        this.obstacles.forEach(obstacle => {
            //obstacle.update(deltaTime);
            obstacle.draw(this.context);
        });

        this.obstacles = this.obstacles.filter(obstacle => !obstacle.isOutsideCanvas(this.canvas));
    }
}


class Obstacle extends GameObject {

    constructor(x: number, y: number, width: number, height: number) {
        super();
        let transform = this.getComponent(Transform);
        transform?.setPosition(new Vector2(x, y));
        transform?.setScale(new Vector2(width, height));
        if (transform == null) {
            return;
        }
        let rigidbody = new RigidBody();
        rigidbody.setUseGravity(true);
        let collider = new Collider();
        collider.setBounds(transform?.getPosition(), transform.getScale());
        this.addComponent(collider);
        this.addComponent(rigidbody);
    }

    // update(deltaTime: number) {
    //     let transform = this.GetComponent(Transform);
    //     if (transform == null) {
    //         return;
    //     }
    //     let downDistance = new Vector2(0, this.speed * deltaTime);
    //     let newPosition = Vector2.Add(transform.Position(), downDistance);
    //     transform.SetPosition(newPosition);
    // }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = 'red';
        let transform = this.getComponent(Transform);
        if (transform == null) {
            return null;
        }
        context.fillRect(transform.getPosition().x, transform.getPosition().y,
            transform.getScale().x, transform.getScale().y);
    }
}



// Start the game
const game = new Game();

