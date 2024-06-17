import Scene from './Scene'

class SceneManager {
    private scenes = new Map<string, Scene>()
    private currentActiveScene: Scene

    public addScene(sceneName: string, scene: Scene): void {
        if (this.scenes.has(sceneName)) {
            console.log('Scene name exists. Please change scene name to different one')
            return
        }
        this.scenes.set(sceneName, scene)
    }

    public getScene(sceneName: string): Scene | undefined {
        return this.scenes.get(sceneName)
    }
    public removeScene(sceneName: string): void {
        this.scenes.delete(sceneName)
    }
    public toggleSceneOn(sceneName: string) {
        this.scenes.forEach((value, key) => {
            value.setActive(key == sceneName)
            if (key == sceneName) {
                this.currentActiveScene = value
            }
        })
    }
    public getCurrentActiveScene() {
        return this.currentActiveScene
    }
}
export default SceneManager
