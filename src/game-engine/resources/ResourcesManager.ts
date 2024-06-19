import PathResources from './PathResources'

class ResourcesManager {
    public static PageImage: HTMLImageElement
    public static DoodleJumpTextImage: HTMLImageElement
    public static StartButtonImage: HTMLImageElement
    public static PlayAgainButtonImage: HTMLImageElement
    public static MenuButtonImage: HTMLImageElement

    public static ForwardJumpImage: HTMLImageElement
    public static ForwarNormalImage: HTMLImageElement

    public static LeftJumpImage: HTMLImageElement
    public static LeftNormalImage: HTMLImageElement

    public static RightJumpImage: HTMLImageElement
    public static RightNormalImage: HTMLImageElement

    public static MovablePlatformImage: HTMLImageElement
    public static StablePlatformImage: HTMLImageElement

    public static UnstablePlatformImage: HTMLImageElement
    public static UnstablePlatform1Image: HTMLImageElement

    public static UnstablePlatform2Image: HTMLImageElement
    public static UnstablePlatform3Image: HTMLImageElement

    // items

    // shoes

    public static ShoeImage: HTMLImageElement
    public static Shoe1Image: HTMLImageElement
    public static Shoe2Image: HTMLImageElement
    public static Shoe3Image: HTMLImageElement
    public static Shoe4Image: HTMLImageElement

    public static LoadResources(): void {
        this.PageImage = this.loadImage(PathResources.BACKGROUND)
        this.DoodleJumpTextImage = this.loadImage(PathResources.DOODLE_JUMP_TEXT)
        this.StartButtonImage = this.loadImage(PathResources.PLAY_GAME)
        this.PlayAgainButtonImage = this.loadImage(PathResources.PLAY_AGAIN_BUTTON)
        this.MenuButtonImage = this.loadImage(PathResources.MENU_BUTTON)
        this.ForwardJumpImage = this.loadImage(PathResources.FORWARD_JUMP)
        this.ForwarNormalImage = this.loadImage(PathResources.FORWARD_NORMAL)

        this.LeftJumpImage = this.loadImage(PathResources.LEFT_JUMP)
        this.LeftNormalImage = this.loadImage(PathResources.LEFT_NORMAL)

        this.RightJumpImage = this.loadImage(PathResources.RIGHT_JUMP)
        this.RightNormalImage = this.loadImage(PathResources.RIGHT_NORMAL)

        this.MovablePlatformImage = this.loadImage(PathResources.MOVABLE_PLATFORM)
        this.StablePlatformImage = this.loadImage(PathResources.STABLE_PLATFORM)

        this.UnstablePlatformImage = this.loadImage(PathResources.UNSTABLE_PLATFORM)
        this.UnstablePlatform1Image = this.loadImage(PathResources.UNSTABLE_PLATFORM1)
        this.UnstablePlatform2Image = this.loadImage(PathResources.UNSTABLE_PLATFORM2)
        this.UnstablePlatform3Image = this.loadImage(PathResources.UNSTABLE_PLATFORM3)

        this.ShoeImage = this.loadImage(PathResources.SHOE)
        this.Shoe1Image = this.loadImage(PathResources.SHOE1)
        this.Shoe2Image = this.loadImage(PathResources.SHOE2)
        this.Shoe3Image = this.loadImage(PathResources.SHOE3)
        this.Shoe4Image = this.loadImage(PathResources.SHOE4)
    }

    private static loadImage(path: string): HTMLImageElement {
        let image = new Image()
        image.src = path
        return image
    }
}
export default ResourcesManager
