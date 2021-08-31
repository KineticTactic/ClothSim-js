class Point {
    constructor(pos, locked = false) {
        this.position = pos;
        this.prevPosition = pos;
        this.locked = locked;
        this.dragInfluence = 0;
    }

    render(ctx) {
        ctx.fillStyle = "white";
        ctx.beginPath();
        // ctx.arc(this.position.x, this.position.y, ctx.canvas.width / 1000, 0, Math.PI * 2);
        ctx.fill();
    }
}
