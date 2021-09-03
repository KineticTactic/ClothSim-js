class Stick {
    constructor(pointA, pointB, length) {
        this.pointA = pointA;
        this.pointB = pointB;
        this.length = length;
        this.actualLength = 0;
    }

    render(ctx) {
        const color = constrain(mapRange(this.actualLength, this.length * 0.9, this.length * 1.1, 360, 0), 360, 0);
        ctx.strokeStyle = `hsl(${color}, 100%, 40%)`;
        ctx.beginPath();
        ctx.moveTo(this.pointA.position.x, this.pointA.position.y);
        ctx.lineTo(this.pointB.position.x, this.pointB.position.y);
        ctx.stroke();
    }
}
