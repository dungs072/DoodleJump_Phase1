import ComponentInterface from "../../types/component";
import Vector2 from "../vector2";

class RigidBody implements ComponentInterface {
    private useGravity: boolean;
    private velocity: Vector2;
    private mass: number;

    constructor() {
        this.velocity = Vector2.zero();
        this.mass = 1;
    }
    public addForce(direction: Vector2, forceAmount: number): void {
        this.velocity = Vector2.multiply(direction, forceAmount);
    }
    public decreaseToZeroVelocity(amount: number): void {
        this.velocity.x = Math.min(this.velocity.x + amount, 0);
        this.velocity.y = Math.min(this.velocity.y + amount, 0);
    }
    public canUseGravity(): boolean {
        return this.useGravity;
    }
    public setUseGravity(state: boolean): void {
        this.useGravity = state;
    }
    public getVelocity(): Vector2 {
        return this.velocity;
    }
    public setMass(mass: number) {
        this.mass = mass;
    }
    public getMass() {
        return this.mass;
    }





}
export default RigidBody;