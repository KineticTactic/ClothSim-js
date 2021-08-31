class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(a, b) {
        if (a instanceof Vector) {
            this.x += a.x;
            this.y += a.y;
        } else if (typeof a === "number") {
            if (arguments.length === 1) {
                this.x += a;
                this.y += a;
            } else if (arguments.length === 2) {
                this.x += a;
                this.y += b;
            }
        }
    }

    static add(a, b) {
        if (a instanceof Vector && b instanceof Vector) {
            return new Vector(a.x + b.x, a.y + b.y);
        }
    }

    mult(a, b) {
        if (a instanceof Vector) {
            this.x *= a.x;
            this.y *= a.y;
        } else if (typeof a === "number") {
            if (arguments.length === 1) {
                this.x *= a;
                this.y *= a;
            } else if (arguments.length === 2) {
                this.x *= a;
                this.y *= b;
            }
        }
        return this;
    }

    static mult(a, b) {
        if (a instanceof Vector && b instanceof Vector) {
            return new Vector(a.x * b.x, a.y * b.y);
        }
        if (a instanceof Vector && typeof b === "number") {
            return new Vector(a.x * b, a.y * b);
        }
    }

    sub(a) {
        if (a instanceof Vector) {
            this.x -= a.x;
            this.y -= a.y;
        } else if (typeof a === "number") {
            this.x -= a;
            this.y -= a;
        }
    }

    static sub(a, b) {
        if (a instanceof Vector && b instanceof Vector) {
            return new Vector(a.x - b.x, a.y - b.y);
        }
    }

    div(a) {
        if (a instanceof Vector) {
            this.x /= a.x;
            this.y /= a.y;
        } else if (typeof a === "number") {
            this.x /= a;
            this.y /= a;
        }
        return this;
    }

    static div(a, b) {
        if (a instanceof Vector && b instanceof Vector) {
            return new Vector(a.x / b.x, a.y / b.y);
        }
        if (a instanceof Vector && typeof b === "number") {
            return new Vector(a.x / b, a.y / b);
        }
    }

    set(x, y) {
        if (typeof x === "number" && typeof y === "number") {
            this.x = x;
            this.y = y;
        } else if (x instanceof Vector) {
            this.x = x.x;
            this.y = x.y;
        }
    }

    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    static mag(v) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }

    magSq() {
        return this.x * this.x + this.y * this.y;
    }

    static magSq(v) {
        return v.x * v.x + v.y * v.y;
    }

    setMag(a) {
        let m = this.mag();
        this.x *= a / m;
        this.y *= a / m;
    }

    normalize() {
        this.setMag(1);
        return this;
    }

    limit(a) {
        if (this.mag() > a) this.setMag(a);
    }

    heading() {
        return Math.atan2(this.y, this.x);
    }

    rotate(a) {
        let cos = Math.cos(a),
            sin = Math.sin(a),
            nx = cos * this.x - sin * this.y,
            ny = cos * this.y + sin * this.x;
        this.x = nx;
        this.y = ny;
    }

    // angleBetween(v) {
    // 	// let dotmagmag = this.dot(v) / (this.mag() * v.mag());
    // 	// let angle = Math.acos(Math.min(1, Math.max(-1, dotmagmag)));
    // 	// // if (this.p5) return this.p5._fromRadians(angle);
    // 	// return angle;
    //
    // 	let angle = Math.acos((Vector.dot(this, v)) / this.mag() * v.mag());
    // 	return angle;
    // }

    dot(a) {
        return a.x * this.x + a.y * this.y;
    }

    static dot(a, b) {
        return a.x * b.x + a.y * b.y;
    }

    dist(a) {
        return Math.sqrt(Math.pow(this.x - a.x, 2) + Math.pow(this.y - a.y, 2));
    }

    static dist(a, b) {
        return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
    }

    lerp(a, amt) {
        let diffX = a.x - this.x;
        let diffY = a.y - this.y;
        this.x += amt * diffX;
        this.y += amt * diffY;
    }

    copy() {
        return new Vector(this.x, this.y);
    }
}
