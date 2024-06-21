import ResourcesManager from '../../game-engine/resources/ResourcesManager'

class PathResources {
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
        this.resource.loadImage(this.path + PathResources.BACKGROUND, PathResources.BACKGROUND)
        this.resource.loadImage(
            this.path + PathResources.STABLE_PLATFORM,
            PathResources.STABLE_PLATFORM
        )
        this.resource.loadImage(
            this.path + PathResources.MOVABLE_PLATFORM,
            PathResources.MOVABLE_PLATFORM
        )
        this.resource.loadImage(
            this.path + PathResources.UNSTABLE_PLATFORM,
            PathResources.UNSTABLE_PLATFORM
        )
        this.resource.loadImage(
            this.path + PathResources.UNSTABLE_PLATFORM1,
            PathResources.UNSTABLE_PLATFORM1
        )
        this.resource.loadImage(
            this.path + PathResources.UNSTABLE_PLATFORM2,
            PathResources.UNSTABLE_PLATFORM2
        )
        this.resource.loadImage(
            this.path + PathResources.UNSTABLE_PLATFORM3,
            PathResources.UNSTABLE_PLATFORM3
        )
        this.resource.loadImage(this.path + PathResources.FORWARD_JUMP, PathResources.FORWARD_JUMP)

        this.resource.loadImage(this.path + PathResources.FORWARD_JUMP, PathResources.FORWARD_JUMP)
        this.resource.loadImage(
            this.path + PathResources.FORWARD_NORMAL,
            PathResources.FORWARD_NORMAL
        )
        this.resource.loadImage(this.path + PathResources.LEFT_JUMP, PathResources.LEFT_JUMP)
        this.resource.loadImage(this.path + PathResources.LEFT_NORMAL, PathResources.LEFT_NORMAL)
        this.resource.loadImage(this.path + PathResources.RIGHT_JUMP, PathResources.RIGHT_JUMP)
        this.resource.loadImage(this.path + PathResources.RIGHT_NORMAL, PathResources.RIGHT_NORMAL)
        this.resource.loadImage(this.path + PathResources.MENU_BUTTON, PathResources.MENU_BUTTON)
        this.resource.loadImage(
            this.path + PathResources.PLAY_AGAIN_BUTTON,
            PathResources.PLAY_AGAIN_BUTTON
        )

        this.resource.loadImage(this.path + PathResources.PLAY_GAME, PathResources.PLAY_GAME)
        this.resource.loadImage(
            this.path + PathResources.DOODLE_JUMP_TEXT,
            PathResources.DOODLE_JUMP_TEXT
        )
        this.resource.loadImage(this.path + PathResources.SHOE, PathResources.SHOE)
        this.resource.loadImage(this.path + PathResources.SHOE1, PathResources.SHOE1)
        this.resource.loadImage(this.path + PathResources.SHOE2, PathResources.SHOE2)
        this.resource.loadImage(this.path + PathResources.SHOE3, PathResources.SHOE3)
        this.resource.loadImage(this.path + PathResources.SHOE4, PathResources.SHOE4)
        this.resource.loadImage(this.path + PathResources.PROPELLER, PathResources.PROPELLER)
        this.resource.loadImage(this.path + PathResources.PROPELLER1, PathResources.PROPELLER1)
        this.resource.loadImage(this.path + PathResources.PROPELLER2, PathResources.PROPELLER2)
        this.resource.loadImage(this.path + PathResources.PROPELLER3, PathResources.PROPELLER3)

        this.resource.loadImage(this.path + PathResources.BULLET, PathResources.BULLET)
    }
}
export default PathResources
