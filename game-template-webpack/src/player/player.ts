import { GameObject } from "../types/gameObject";
import { Vector2 } from "../types/vector2";
export class Player extends GameObject {
    speed: number;

    constructor(x: number, y: number, width: number, height: number) {
        super(new Vector2(x, y), new Vector2(width, height));
        this.speed = 200; // Adjust player speed as needed
    }
}
