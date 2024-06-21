import Sprite from './Sprite'
import Vector2 from '../../Vector2'
import Component from '../Component'

class Animation extends Component {
    private sprites: Sprite[]
    private canLoop: boolean
    private maxTimePerSprite: number
    private currentTime: number
    private currentIndex: number
    private isDone: boolean = false
    private isPlaying: boolean
    constructor(images: string[], maxTimePerSprite: number) {
        super()
        this.sprites = []
        for (let i = 0; i < images.length; i++) {
            let sprite = new Sprite(images[i])
            this.sprites.push(sprite)
        }
        this.canLoop = false
        this.maxTimePerSprite = maxTimePerSprite
        this.currentTime = maxTimePerSprite
        this.currentIndex = 0
        this.isPlaying = false
    }
    public play(deltaTime: number): void {
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
}
export default Animation
