import { GameObject } from "./types/gameObject";
import { Vector2 } from "./types/vector2";

class Game {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    player: Player;
    obstacles: Obstacle[];
    lastRenderTime: number;

    constructor() {
        this.canvas = document.createElement('canvas') as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d')!;
        this.canvas.width = 800;
        this.canvas.height = 600;
        document.body.appendChild(this.canvas);

        this.player = new Player(this.canvas.width / 2, this.canvas.height - 50, 50, 50);
        this.obstacles = [];
        this.lastRenderTime = 0;

        this.start();
    }

    start() {
        this.update();
    }

    update() {
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

    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    createObstacles() {
        if (Math.random() < 0.01) { // Adjust this value to control obstacle spawn rate
            const obstacle = new Obstacle(Math.random() * this.canvas.width, 0, 30, 30);
            this.obstacles.push(obstacle);
        }
    }

    updateObstacles(deltaTime: number) {
        this.obstacles.forEach(obstacle => {
            obstacle.update(deltaTime);
            obstacle.draw(this.context);

            if (this.checkCollision(this.player, obstacle)) {
                // Collision happened, handle it accordingly
                console.log('Game Over!');
            }
        });

        this.obstacles = this.obstacles.filter(obstacle => !obstacle.isOutsideCanvas(this.canvas));
    }

    checkCollision(obj1: GameObject, obj2: GameObject): boolean {
        return obj1.Position.x < obj2.Position.x + obj2.Size.x &&
            obj1.Position.x + obj1.Size.x > obj2.Position.x &&
            obj1.Position.y < obj2.Position.y + obj2.Size.y &&
            obj1.Position.y + obj1.Size.y > obj2.Position.y;
    }
}


class Player extends GameObject {
    speed: number;

    constructor(x: number, y: number, width: number, height: number) {
        super(new Vector2(x, y), new Vector2(width, height));
        this.speed = 200; // Adjust player speed as needed
    }

    update(deltaTime: number) {
        if (Key.isDown(Key.LEFT_ARROW)) {
            this.Position.x -= this.speed * deltaTime;
        }
        if (Key.isDown(Key.RIGHT_ARROW)) {
            this.Position.x += this.speed * deltaTime;
        }
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = 'blue';
        context.fillRect(this.Position.x, this.Position.y, this.Size.x, this.Size.y);
    }
}

class Obstacle extends GameObject {
    speed: number;

    constructor(x: number, y: number, width: number, height: number) {
        super(new Vector2(x, y), new Vector2(width, height));
        this.speed = 100; // Adjust obstacle speed as needed
    }

    update(deltaTime: number) {
        this.Position.y += this.speed * deltaTime;
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = 'red';
        context.fillRect(this.Position.x, this.Position.y, this.Size.x, this.Size.y);
    }
}

class Key {
    static LEFT_ARROW = 37;
    static RIGHT_ARROW = 39;

    static keys: { [key: number]: boolean } = {};

    static isDown(keyCode: number): boolean {
        return this.keys[keyCode];
    }
}

window.addEventListener('keydown', (event) => {
    Key.keys[event.keyCode] = true;
});

window.addEventListener('keyup', (event) => {
    delete Key.keys[event.keyCode];
});

// Start the game
const game = new Game();

