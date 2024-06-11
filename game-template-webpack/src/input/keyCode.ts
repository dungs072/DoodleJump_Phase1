class KeyCode {
    public static readonly LEFT_ARROW = 37;
    public static readonly RIGHT_ARROW = 39;
    public static readonly UP_ARROW = 38;
    public static readonly DOWN_ARROW = 40;

    public static keys: { [key: number]: boolean } = {};

    public static isDown(keyCode: number): boolean {
        return this.keys[keyCode];
    }
    public static isDownButNotHold(keyCode: number): boolean {
        if (this.keys[keyCode]) {
            this.keys[keyCode] = false;
            return true;
        }
        return false;
    }
}

window.addEventListener('keydown', (event) => {
    KeyCode.keys[event.keyCode] = true;
});

window.addEventListener('keyup', (event) => {
    delete KeyCode.keys[event.keyCode];
});

export default KeyCode;