import Vector2 from "../vector2";

class Collider {
    private topLeftBound: Vector2;
    private downRightBound: Vector2;
    private isTrigger: boolean;
    constructor() {
        this.isTrigger = false;
    }
    public setTopLeftBound(topLeft: Vector2): void {
        this.topLeftBound = topLeft;
    }
    public setDownRightBound(downRight: Vector2): void {
        this.downRightBound = downRight;
    }
    public setBounds(topLeft: Vector2, downRight: Vector2): void {
        this.topLeftBound = topLeft;
        this.downRightBound = downRight;
    }
    public getTopLeftBound(): Vector2 {
        return this.topLeftBound;
    }
    public getDownRightBound(): Vector2 {
        return this.downRightBound;
    }
    public setIsTrigger(state: boolean): void {
        this.isTrigger = state;
    }
    public getIsTrigger(): boolean {
        return this.isTrigger;
    }


    public hasCollision(other: Collider): boolean {
        let overlapX = this.topLeftBound.x < other.topLeftBound.x + other.downRightBound.x
            && this.topLeftBound.x + this.downRightBound.x > other.topLeftBound.x

        let overlapY = this.topLeftBound.y < other.topLeftBound.y + other.downRightBound.y
            && this.topLeftBound.y + this.downRightBound.y > other.topLeftBound.y
        return overlapX && overlapY;
    }

}
export default Collider;