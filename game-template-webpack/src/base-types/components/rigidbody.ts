import ComponentInterface from "../../types/component";
import Vector2 from "../vector2";

class RigidBody implements ComponentInterface {
    private useGravity: boolean;
    private velocity: Vector2;

    constructor() {
        this.velocity = Vector2.zero();
    }
    public IsUseGravity(): boolean {
        return this.useGravity;
    }
    public setUseGravity(state: boolean): void {
        this.useGravity = state;
    }

    public addForce(direction: Vector2, forceAmount: number): void {
        this.velocity = Vector2.multiply(direction, forceAmount);
    }
    public getVelocity(): Vector2 {
        return this.velocity;
    }




}
export default RigidBody;