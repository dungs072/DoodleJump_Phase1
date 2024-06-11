import Vector2 from "../vector2";

class Collider {
    private topLeftBound: Vector2;
    private downRightBound: Vector2;
    private isTrigger: boolean;
    constructor() {
        this.isTrigger = false;
    }
    public setTopLeftBound(topLeft: Vector2) {
        this.topLeftBound = topLeft;
    }
    public setDownRightBound(downRight: Vector2) {
        this.downRightBound = downRight;
    }
    public setBounds(topLeft: Vector2, downRight: Vector2) {
        this.topLeftBound = topLeft;
        this.downRightBound = downRight;
    }
    public getTopLeftBound() {
        return this.topLeftBound;
    }
    public getDownRightBound() {
        return this.downRightBound;
    }
    public IsTrigger() {
        return this.isTrigger;
    }

    // public CheckCollision(collider1: Collider, collider2: Collider):boolean{

    // }

}
export default Collider;