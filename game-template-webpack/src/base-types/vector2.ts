class Vector2 {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    public isZero(): boolean {
        return this.x == 0 && this.y == 0;
    }
    public static add(v1: Vector2, v2: Vector2): Vector2 {
        return new Vector2(v1.x + v2.x, v1.y + v2.y);
    }
    public static subtract(v1: Vector2, v2: Vector2): Vector2 {
        return new Vector2(v1.x - v2.x, v1.y - v2.y);
    }
    public static multiply(v1: Vector2, value: number): Vector2 {
        return new Vector2(v1.x * value, v1.y * value);
    }
    public static devide(v1: Vector2, value: number): Vector2 {
        if (value == 0) {
            console.log("Devide 0");
            return Vector2.zero();
        }
        return new Vector2(v1.x / value, v1.y / value);
    }
    public static up(): Vector2 {
        return new Vector2(0, -1);
    }
    public static down(): Vector2 {
        return new Vector2(0, 1);
    }
    public static left(): Vector2 {
        return new Vector2(-1, 0);
    }
    public static right(): Vector2 {
        return new Vector2(1, 0);
    }
    public static zero(): Vector2 {
        return new Vector2(0, 0);
    }

}
export default Vector2