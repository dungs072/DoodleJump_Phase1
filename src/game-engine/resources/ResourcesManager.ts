class ResourcesManager {
    private images: Map<string, HTMLImageElement>
    private static instance: ResourcesManager
    public static getInstance(): ResourcesManager {
        if (!ResourcesManager.instance) {
            ResourcesManager.instance = new ResourcesManager()
        }
        return ResourcesManager.instance
    }
    constructor() {
        this.images = new Map<string, HTMLImageElement>()
    }

    public getImage(imageName: string): HTMLImageElement {
        return this.images.get(imageName)!
    }

    public loadImage(path: string, imageName: string): HTMLImageElement {
        const image = new Image()
        image.src = path
        this.images.set(imageName, image)
        return image
    }
}
export default ResourcesManager
