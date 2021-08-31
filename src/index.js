const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
console.log(ctx);

const points = [];
const sticks = [];
const width = 50;
const height = 20;
const space = Math.min((canvas.width * 0.8) / width, (canvas.height * 0.8) / height);

for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
        points.push(new Point(new Vector(i * space + (canvas.width - width * space) / 2, j * space)));
    }
}
points[5].locked = true;
points[width - 5].locked = true;
points[Math.floor(width / 2)].locked = true;

for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
        if (j < height - 1)
            sticks.push(
                new Stick(
                    points[i + j * width],
                    points[i + (j + 1) * width],
                    Vector.sub(points[i + j * width].position, points[i + (j + 1) * width].position).mag()
                )
            );
        if (i < width - 1)
            sticks.push(new Stick(points[i + j * width], points[i + 1 + j * width], Vector.sub(points[i].position, points[i + 1].position).mag()));
    }
}

const gravity = 0.5;
const dragRadius = 100;

let isBeingDragged = false;
let mousePos = new Vector(0, 0);
let prevMousePos = new Vector(0, 0);
let tool = "DRAG";

let lastTime = Date.now();

function draw() {
    requestAnimationFrame(draw);
    ctx.fillStyle = "#121218";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let dt = (Date.now() - lastTime) / 1000;
    lastTime = Date.now();

    if (tool === "KNIFE" && isBeingDragged) {
        for (let i = sticks.length - 1; i >= 0; i--) {
            if (
                lineLineIntersection(
                    sticks[i].pointA.position.x,
                    sticks[i].pointA.position.y,
                    sticks[i].pointB.position.x,
                    sticks[i].pointB.position.y,
                    mousePos.x,
                    mousePos.y,
                    prevMousePos.x,
                    prevMousePos.y
                )
            ) {
                sticks.splice(i, 1);
            }
        }
    }
    prevMousePos = mousePos.copy();

    for (let p of points) {
        if (p.locked) continue;

        let positionBeforeUpdate = p.position.copy();
        p.position.add(Vector.sub(p.position, p.prevPosition));
        p.position.add(new Vector(0, gravity)); //* dt * dt));

        if (tool === "DRAG") {
            if (isBeingDragged && p.dragInfluence > 0) p.position.add(Vector.sub(mousePos, p.position).mult(p.dragInfluence * 0.2));
        }

        p.prevPosition = positionBeforeUpdate;
    }

    for (let i = 0; i < 20; i++) {
        for (let s of sticks) {
            let stickCenter = Vector.div(Vector.add(s.pointA.position, s.pointB.position), 2);
            let stickDir = Vector.sub(s.pointA.position, s.pointB.position).normalize();

            if (!s.pointA.locked) s.pointA.position = Vector.add(stickCenter, Vector.mult(stickDir, s.length / 2));
            if (!s.pointB.locked) s.pointB.position = Vector.sub(stickCenter, Vector.mult(stickDir, s.length / 2));
        }
    }

    for (let i = sticks.length - 1; i >= 0; i--) {
        sticks[i].actualLength = Vector.sub(sticks[i].pointA.position, sticks[i].pointB.position).mag();
        if (sticks[i].actualLength >= sticks[i].length * 3) sticks.splice(i, 1);
    }

    for (let s of sticks) s.render(ctx);
    // for (let p of points) p.render(ctx);

    ctx.font = "24px sans-serif";
    ctx.textAlign = "end";
    ctx.fillStyle = "white";
    ctx.fillText("D - Drag Tool", canvas.width - 15, canvas.height - 52);
    ctx.fillText("K - Knife Tool", canvas.width - 15, canvas.height - 24);
}

draw();

canvas.addEventListener("mousedown", (e) => {
    isBeingDragged = true;
    for (let p of points) {
        p.dragInfluence = constrain(mapRange(Vector.sub(p.position, mousePos).mag(), 0, 100, 1, 0), 1, 0);
    }
});

canvas.addEventListener("mouseup", (e) => {
    isBeingDragged = false;
    for (let p of points) {
        p.dragInfluence = 0;
    }
});

canvas.addEventListener("mousemove", (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
});

window.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
        case 75:
            tool = "KNIFE";
            break;
        case 68:
            tool = "DRAG";
            break;
    }
});
