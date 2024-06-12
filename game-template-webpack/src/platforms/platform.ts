import Collider from "../base-types/components/collider";
import Transform from "../base-types/components/transform";
import GameObject from "../base-types/gameObject";
import Vector2 from "../base-types/vector2";
import RenderInterface from "../types/render";
import SystemInterface from "../types/system";

class Platform extends GameObject implements SystemInterface, RenderInterface {
    private collider: Collider;
    constructor(position: Vector2, scale: Vector2) {
        super();
        let transform = this.getComponent(Transform);
        transform?.setPosition(position);
        transform?.setScale(scale);
        if (transform == null) {
            return;
        }
        this.collider = new Collider();
        let downRight = new Vector2(transform.getScale().x, transform.getScale().y-25);
        this.collider.setBounds(transform?.getPosition(), downRight);
        this.collider.setIsStatic(true);
        this.addComponent(this.collider);
        this.start();
    }
    start(): void {

    }
    update(deltaTime: number): void {

    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = 'red';
        let transform = this.getComponent(Transform);
        if (transform == null) {
            return null;
        }
        context.fillRect(transform.getPosition().x, transform.getPosition().y,
            transform.getScale().x, transform.getScale().y);
        this.collider.draw(context);
    }
}

export default Platform;