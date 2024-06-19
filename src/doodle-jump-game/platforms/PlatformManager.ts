import Transform from '../../game-engine/base-types/components/Transform'
import GameObject from '../../game-engine/base-types/GameObject'
import Vector2 from '../../game-engine/base-types/Vector2'
import Creator from '../patterns/factory/Creator'
import Publisher from '../patterns/observer/Publisher'
import PhysicManager from '../../game-engine/physic/PhysicManager'
import MovablePlatformCreator from './movable-platform/MovablePlatformCreator'
import Platform from './Platform'
import StablePlatformCreator from './stable-platform/StablePlatformCreator'
import UnstablePlatform from './unstable-platform/UnstablePlatform'
import UnstablePlatformCreator from './unstable-platform/UnstablePlatformCreator'

class PlatformManager {
    private publisher: Publisher<number>
    private platforms: Platform[]
    private previousYPosition: number
    private maxPlatform: number

    private platformCreators: Creator[]

    constructor() {
        this.publisher = new Publisher<number>()
        this.platforms = []
        this.previousYPosition = 500
        this.maxPlatform = 12
        this.platformCreators = []
        this.platformCreators.push(new StablePlatformCreator())
        this.platformCreators.push(new UnstablePlatformCreator())
        this.platformCreators.push(new MovablePlatformCreator())
    }
    public getPublisher(): Publisher<number> {
        return this.publisher
    }
    public addPlatform(platform: Platform): void {
        this.platforms.push(platform)
    }
    public createPlatforms(canvasWidth: number) {
        for (let i = 0; i < this.maxPlatform - this.platforms.length; i++) {
            let rangeHeight = this.getRandomInRange(100, 200)
            let firstRandomX = Math.random() * canvasWidth
            let position = new Vector2(firstRandomX, this.previousYPosition - rangeHeight)
            let scale = new Vector2(120, 35)
            let platformCreatorIndex = Math.floor(Math.random() * this.platformCreators.length)
            let platformCreator = this.platformCreators[platformCreatorIndex]
            let product = platformCreator.createProduct(position, scale)
            let gameObj = product.getGameObject()
            if (gameObj instanceof Platform) {
                this.platforms.push(gameObj)
                this.publisher.subcribe(gameObj)
                PhysicManager.getInstance().addphysicObjs(gameObj)
            }
            if (gameObj instanceof UnstablePlatform) {
                let randomX = 0
                if (firstRandomX - scale.x > 0) {
                    randomX = this.getRandomInRange(0, firstRandomX - scale.x)
                } else {
                    randomX = this.getRandomInRange(firstRandomX + scale.x, canvasWidth)
                }
                let randomHeight = this.getRandomInRange(100, 150)
                let position = new Vector2(randomX, this.previousYPosition - randomHeight)
                this.createStablePlatform(position, scale)
            }
            let platform = this.getTheLastPlatform()
            if (platform != null) {
                this.previousYPosition = platform.getTransform().getPosition().y
            }
        }
    }
    public createStablePlatform(position: Vector2, scale: Vector2): GameObject {
        let platformCreator = this.platformCreators[0]
        let product = platformCreator.createProduct(position, scale)
        let gameObj = product.getGameObject()
        if (gameObj instanceof Platform) {
            this.platforms.push(gameObj)
            this.publisher.subcribe(gameObj)
            PhysicManager.getInstance().addphysicObjs(gameObj)
        }
        return gameObj
    }
    private getTheLastPlatform(): Platform | null {
        if (this.platforms.length == 0) {
            return null
        }
        return this.platforms[this.platforms.length - 1]
    }
    public getTheFirstPlatform(): Platform | null {
        if (this.platforms.length == 0) {
            return null
        }
        return this.platforms[0]
    }

    public destroyPlatforms() {
        for (let i = this.platforms.length - 1; i >= 0; i--) {
            //this.platforms[i].update(deltaTime)
            if (!this.platforms[i]) {
                this.platforms.splice(i)
                continue
            }
            if (this.platforms[i].getCanDestroy()) {
                PhysicManager.getInstance().removePhysicObjs(this.platforms[i])
                this.publisher.unsubcribe(this.platforms[i])
                this.platforms.splice(i, 1)
            }
        }

        //console.log(PhysicManager.getInstance().getFirstLengthPhysicObjs());
        // this.platforms = this.platforms.filter(platform => !platform.isOutsideCanvas(this.canvas));
    }
    // public draw(context: CanvasRenderingContext2D) {
    //     for (let i = this.platforms.length - 1; i >= 0; i--) {
    //         this.platforms[i].draw(context)
    //     }
    // }
    public getPlatforms(): Platform[] {
        return this.platforms
    }
    public clearData(): void {
        this.platforms.forEach((platform) => {
            platform.destroy() //.setCanDestroy(true)
        })
        this.platforms = []
    }
    private getRandomInRange(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
}
export default PlatformManager
