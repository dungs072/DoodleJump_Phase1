import Sprite from './Sprite'
import Vector2 from '../../Vector2'
import Component from '../Component'
import GameObject from '../../GameObject'

class Animation extends Component {
    private sprites: Sprite[]
    private canLoop: boolean
    private maxTimePerSprite: number
    private currentTime: number
    private currentIndex: number
    private isDone: boolean = true
    private isPlaying: boolean
    constructor(gameObject: GameObject, images: string[], maxTimePerSprite: number) {
        super(gameObject)
        this.sprites = []
        for (let i = 0; i < images.length; i++) {
            let sprite = new Sprite(gameObject, images[i])
            this.sprites.push(sprite)
        }
        this.canLoop = false
        this.maxTimePerSprite = maxTimePerSprite
        this.currentTime = maxTimePerSprite
        this.currentIndex = 0
        this.isPlaying = false
    }

    public update(deltaTime: number): void {
        if (this.isDone) {
            return
        }
        this.isPlaying = true
        this.currentTime += deltaTime
        if (this.currentTime >= this.maxTimePerSprite) {
            this.currentIndex = (this.currentIndex + 1) % this.sprites.length
            this.currentTime = 0
        }
        this.isDone = !this.canLoop && this.currentIndex == this.sprites.length - 1
    }
    public draw(context: CanvasRenderingContext2D, position: Vector2): void {
        if (this.isPlaying) {
            this.sprites[this.currentIndex].draw(context, position)
        }
    }
    public setCanLoop(state: boolean): void {
        this.canLoop = state
    }
    public play() {
        this.isDone = false
    }
    public stop() {
        this.isDone = true
    }
}
export default Animation
