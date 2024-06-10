class GameObject {
    constructor(public Position: Vector2, public Size: Vector2) { }

    isOutsideCanvas(canvas: HTMLCanvasElement): boolean {
        return this.Position.x < 0 || this.Position.x > canvas.width ||
            this.Position.y < 0 || this.Position.y > canvas.height;
    }
}
