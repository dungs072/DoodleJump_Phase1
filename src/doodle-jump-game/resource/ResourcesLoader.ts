import ResourcesManager from '../../game-engine/resources/ResourcesManager'

class ResourcesLoader {
    public static readonly BACKGROUND: string = 'bck.png'

    public static readonly STABLE_PLATFORM: string = 'stable.png'
    public static readonly MOVABLE_PLATFORM: string = 'movable.png'
    public static readonly UNSTABLE_PLATFORM: string = 'unstable.png'
    public static readonly UNSTABLE_PLATFORM1: string = 'unstable1.png'
    public static readonly UNSTABLE_PLATFORM2: string = 'unstable2.png'
    public static readonly UNSTABLE_PLATFORM3: string = 'unstable3.png'

    public static readonly FORWARD_JUMP: string = 'forwardJump.png'
    public static readonly FORWARD_NORMAL: string = 'forwardNormal.png'
    public static readonly LEFT_JUMP: string = 'leftJump.png'
    public static readonly LEFT_NORMAL: string = 'leftNormal.png'
    public static readonly RIGHT_JUMP: string = 'rightJump.png'
    public static readonly RIGHT_NORMAL: string = 'rightNormal.png'

    public static readonly MENU_BUTTON: string = 'menuButton.png'
    public static readonly PLAY_AGAIN_BUTTON: string = 'playAgainButton.png'

    public static readonly PLAY_GAME: string = 'playGameButton.png'

    public static readonly DOODLE_JUMP_TEXT: string = 'doodleJumpText.png'

    // items

    // shoe
    public static readonly SHOE: string = 'shoe.png'
    public static readonly SHOE1: string = 'shoe1.png'
    public static readonly SHOE2: string = 'shoe2.png'
    public static readonly SHOE3: string = 'shoe3.png'
    public static readonly SHOE4: string = 'shoe4.png'

    // propeller
    public static readonly PROPELLER: string = 'propeller.png'
    public static readonly PROPELLER1: string = 'propeller1.png'
    public static readonly PROPELLER2: string = 'propeller2.png'
    public static readonly PROPELLER3: string = 'propeller3.png'

    public static readonly BULLET: string = 'bullet.png'

    private resource: ResourcesManager
    private path = '../assets/images/'

    constructor() {
        this.resource = ResourcesManager.getInstance()

        this.loadImages()
    }
    private loadImages(): void {
        this.resource.loadImage(this.path + ResourcesLoader.BACKGROUND, ResourcesLoader.BACKGROUND)
        this.resource.loadImage(
            this.path + ResourcesLoader.STABLE_PLATFORM,
            ResourcesLoader.STABLE_PLATFORM
        )
        this.resource.loadImage(
            this.path + ResourcesLoader.MOVABLE_PLATFORM,
            ResourcesLoader.MOVABLE_PLATFORM
        )
        this.resource.loadImage(
            this.path + ResourcesLoader.UNSTABLE_PLATFORM,
            ResourcesLoader.UNSTABLE_PLATFORM
        )
        this.resource.loadImage(
            this.path + ResourcesLoader.UNSTABLE_PLATFORM1,
            ResourcesLoader.UNSTABLE_PLATFORM1
        )
        this.resource.loadImage(
            this.path + ResourcesLoader.UNSTABLE_PLATFORM2,
            ResourcesLoader.UNSTABLE_PLATFORM2
        )
        this.resource.loadImage(
            this.path + ResourcesLoader.UNSTABLE_PLATFORM3,
            ResourcesLoader.UNSTABLE_PLATFORM3
        )
        this.resource.loadImage(
            this.path + ResourcesLoader.FORWARD_JUMP,
            ResourcesLoader.FORWARD_JUMP
        )

        this.resource.loadImage(
            this.path + ResourcesLoader.FORWARD_JUMP,
            ResourcesLoader.FORWARD_JUMP
        )
        this.resource.loadImage(
            this.path + ResourcesLoader.FORWARD_NORMAL,
            ResourcesLoader.FORWARD_NORMAL
        )
        this.resource.loadImage(this.path + ResourcesLoader.LEFT_JUMP, ResourcesLoader.LEFT_JUMP)
        this.resource.loadImage(
            this.path + ResourcesLoader.LEFT_NORMAL,
            ResourcesLoader.LEFT_NORMAL
        )
        this.resource.loadImage(this.path + ResourcesLoader.RIGHT_JUMP, ResourcesLoader.RIGHT_JUMP)
        this.resource.loadImage(
            this.path + ResourcesLoader.RIGHT_NORMAL,
            ResourcesLoader.RIGHT_NORMAL
        )
        this.resource.loadImage(
            this.path + ResourcesLoader.MENU_BUTTON,
            ResourcesLoader.MENU_BUTTON
        )
        this.resource.loadImage(
            this.path + ResourcesLoader.PLAY_AGAIN_BUTTON,
            ResourcesLoader.PLAY_AGAIN_BUTTON
        )

        this.resource.loadImage(this.path + ResourcesLoader.PLAY_GAME, ResourcesLoader.PLAY_GAME)
        this.resource.loadImage(
            this.path + ResourcesLoader.DOODLE_JUMP_TEXT,
            ResourcesLoader.DOODLE_JUMP_TEXT
        )
        this.resource.loadImage(this.path + ResourcesLoader.SHOE, ResourcesLoader.SHOE)
        this.resource.loadImage(this.path + ResourcesLoader.SHOE1, ResourcesLoader.SHOE1)
        this.resource.loadImage(this.path + ResourcesLoader.SHOE2, ResourcesLoader.SHOE2)
        this.resource.loadImage(this.path + ResourcesLoader.SHOE3, ResourcesLoader.SHOE3)
        this.resource.loadImage(this.path + ResourcesLoader.SHOE4, ResourcesLoader.SHOE4)
        this.resource.loadImage(this.path + ResourcesLoader.PROPELLER, ResourcesLoader.PROPELLER)
        this.resource.loadImage(this.path + ResourcesLoader.PROPELLER1, ResourcesLoader.PROPELLER1)
        this.resource.loadImage(this.path + ResourcesLoader.PROPELLER2, ResourcesLoader.PROPELLER2)
        this.resource.loadImage(this.path + ResourcesLoader.PROPELLER3, ResourcesLoader.PROPELLER3)

        this.resource.loadImage(this.path + ResourcesLoader.BULLET, ResourcesLoader.BULLET)
    }
    public getImage(imageName: string): HTMLImageElement {
        return this.resource.getImage(imageName)
    }
}
export default ResourcesLoader
