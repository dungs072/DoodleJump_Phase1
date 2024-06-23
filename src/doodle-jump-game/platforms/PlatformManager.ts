import GameObject from '../../game-engine/base-types/GameObject'
import Vector2 from '../../game-engine/base-types/Vector2'
import Creator from '../patterns/factory/Creator'
import Publisher from '../patterns/observer/Publisher'
import MovablePlatformCreator from './movable-platform/MovablePlatformCreator'
import Platform from './Platform'
import StablePlatformCreator from './stable-platform/StablePlatformCreator'
import UnstablePlatform from './unstable-platform/UnstablePlatform'
import UnstablePlatformCreator from './unstable-platform/UnstablePlatformCreator'
import ShoesCreator from '../items/shoes/ShoesCreator'
import Item from '../items/Item'
import StablePlatform from './stable-platform/StablePlatform'
import PropellerCreator from '../items/propeller/PropellerCreator'

class PlatformManager {
    private publisher: Publisher<number>
    private platforms: Platform[]
    private items: Item[]
    private previousYPosition: number
    private maxPlatform: number

    private platformCreators: Creator[]
    private itemCreators: Creator[]

    constructor() {
        this.publisher = new Publisher<number>()
        this.platforms = []
        this.items = []
        this.previousYPosition = 500
        this.maxPlatform = 25
        this.platformCreators = []
        this.platformCreators.push(new StablePlatformCreator())
        this.platformCreators.push(new UnstablePlatformCreator())
        this.platformCreators.push(new MovablePlatformCreator())

        this.itemCreators = []
        this.itemCreators.push(new ShoesCreator())
        this.itemCreators.push(new PropellerCreator())
    }
    public getPublisher(): Publisher<number> {
        return this.publisher
    }
    public addPlatform(platform: Platform): void {
        this.platforms.push(platform)
    }
    public createPlatforms(canvasWidth: number) {
        for (let i = 0; i < this.maxPlatform - this.platforms.length; i++) {
            const scale = new Vector2(120, 35)
            const rangeHeight = this.getRandomInRange(100, 200)
            const firstRandomX = Math.random() * (canvasWidth - scale.x)
            const position = new Vector2(firstRandomX, this.previousYPosition - rangeHeight)

            const platformCreatorIndex = Math.floor(Math.random() * this.platformCreators.length)
            const platformCreator = this.platformCreators[platformCreatorIndex]
            const product = platformCreator.createProduct(position, scale)
            const gameObj = product.getGameObject()
            if (gameObj instanceof StablePlatform) {
                if (Math.random() > 0.3) {
                    const item = this.createRandomItem(
                        new Vector2(position.x + 30, position.y - 20),
                        new Vector2(50, 16)
                    )
                    gameObj.setItem(item)
                }
            }

            if (gameObj instanceof Platform) {
                this.platforms.push(gameObj)
                this.publisher.subscribe(gameObj)
            }
            if (gameObj instanceof UnstablePlatform) {
                let randomX = 0
                if (firstRandomX - scale.x > 0) {
                    randomX = this.getRandomInRange(0, firstRandomX - scale.x)
                } else {
                    randomX = this.getRandomInRange(firstRandomX + scale.x, canvasWidth - scale.x)
                }
                const randomHeight = this.getRandomInRange(100, 150)
                const position = new Vector2(randomX, this.previousYPosition - randomHeight)
                this.createStablePlatform(position, scale)
            }
            const platform = this.getTheLastPlatform()
            if (platform != null) {
                this.previousYPosition = platform.getTransform().getPosition().y
            }
        }
    }
    private createRandomItem(position: Vector2, scale: Vector2): GameObject {
        const itemCreatorIndex = Math.floor(Math.random() * this.itemCreators.length)
        const itemCreator = this.itemCreators[itemCreatorIndex]
        const product = itemCreator.createProduct(position, scale)
        const gameObj = product.getGameObject()
        if (gameObj instanceof Item) {
            this.items.push(gameObj)
        }
        return gameObj
    }
    public createStablePlatform(position: Vector2, scale: Vector2): GameObject {
        const platformCreator = this.platformCreators[0]
        const product = platformCreator.createProduct(position, scale)
        const gameObj = product.getGameObject()
        if (gameObj instanceof Platform) {
            this.platforms.push(gameObj)
            this.publisher.subscribe(gameObj)
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
            if (!this.platforms[i]) {
                this.platforms.splice(i)
                continue
            }
            if (this.platforms[i].getCanDestroy()) {
                this.publisher.unsubscribe(this.platforms[i])
                this.platforms.splice(i, 1)
            }
        }
    }
    public destroyItems() {
        for (let i = this.items.length - 1; i >= 0; i--) {
            if (!this.items[i]) {
                this.items.splice(i)
                continue
            }
            if (this.items[i].getCanDestroy()) {
                this.items.splice(i, 1)
            }
        }
    }
    public getPlatforms(): Platform[] {
        return this.platforms
    }
    public clearData(): void {
        this.platforms.forEach((platform) => {
            platform.destroy() //.setCanDestroy(true)
        })
        this.items.forEach((item) => {
            item.destroy()
        })
        this.platforms = []
        this.items = []
    }
    private getRandomInRange(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
}
export default PlatformManager
