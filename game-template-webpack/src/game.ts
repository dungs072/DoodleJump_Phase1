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
        return obj1.x < obj2.x + obj2.width &&
            obj1.x + obj1.width > obj2.x &&
            obj1.y < obj2.y + obj2.height &&
            obj1.y + obj1.height > obj2.y;
    }
}


class Player extends GameObject {
    speed: number;

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
        this.speed = 200; // Adjust player speed as needed
    }

    update(deltaTime: number) {
        if (Key.isDown(Key.LEFT_ARROW)) {
            this.x -= this.speed * deltaTime;
        }
        if (Key.isDown(Key.RIGHT_ARROW)) {
            this.x += this.speed * deltaTime;
        }
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = 'blue';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Obstacle extends GameObject {
    speed: number;

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
        this.speed = 100; // Adjust obstacle speed as needed
    }

    update(deltaTime: number) {
        this.y += this.speed * deltaTime;
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
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

