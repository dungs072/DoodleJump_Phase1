import RenderInterface from '../../types/render'
import Vector2 from '../Vector2'

class Sprite implements RenderInterface {
    private position: Vector2
    private image: HTMLImageElement
    constructor(path: string, position: Vector2) {
        this.position = position
        this.image = new Image()
        this.image.src = path
    }
    draw(context: CanvasRenderingContext2D) {
        context.drawImage(this.image, this.position.x, this.position.y)
    }
    public setPosition(position: Vector2): void {
        this.position = position
    }
    public getPosition(): Vector2 {
        return this.position
    }
}
export default Sprite
