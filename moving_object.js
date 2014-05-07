(function (root) {
    //Changed the namespace
    var AST = root.Asteroids = (root.Asteroids || {});
    var MOP = AST.MovingObject.prototype;

    AST.MovingObject = function (radius, color) {
        this.pos = [0, 0];
        this.vel = [0, 0];
        this.radius = radius;
        this.color = color;
        //I added this.
        this.strokeColor = color;
        this.strokeWidth = 1;
    };

    MOP.move = function () {
        this.pos = [this.pos[0] + this.vel[0],
                    this.pos[1] + this.vel[1]];
    };

    MOP.draw = function (c) {
        c.beginPath();

        c.arc(this.pos[0], this.pos[1], this.radius,
            0, 2 * Math.PI, false);

        c.fillStyle = this.color;
        c.fill();

        //I added this.
        c.lineWidth = this.strokeWidth;
        c.strokeStyle = this.strokeColor;
        c.stroke();
    };

    MOP.isCollidedWith = function (otherObject) {
        var distance = this.distance(this.pos, otherObject.pos);
        return (distance <= (this.radius + otherObject.radius))
    };

    AST.distance = function (pos1, pos2) {
        xDiff = Math.abs(pos1[0] - pos2[0]);
        yDiff = Math.abs(pos1[1] - pos2[1]);
        return Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
    }
})(this);