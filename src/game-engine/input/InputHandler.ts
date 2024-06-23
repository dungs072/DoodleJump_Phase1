class InputHandler {
    public static keys: { [key: string]: boolean } = {}
    constructor() {
        window.addEventListener('keydown', (event) => {
            InputHandler.keys[event.key] = true
        })

        window.addEventListener('keyup', (event) => {
            InputHandler.keys[event.key] = false
        })
    }

    public static isDown(keyboardName: string): boolean {
        return this.keys[keyboardName]
    }
    public static isDownButNotHold(keyboardName: string): boolean {
        if (this.keys[keyboardName]) {
            this.keys[keyboardName] = false
            return true
        }
        return false
    }
}

export default InputHandler
