(function (root) {
    var AST = root.Asteroids = (root.Asteroids || {});


    var Star = AST.Star = function () {
        var radius = (Math.random() * 2)
        AST.MovingObject.call(this, radius, Star.COLOR);
    };

    Star.inherits(AST.MovingObject);
    Star.COLOR = 'white';

    Star.randomStar = function (dimX, dimY) {
        var randomStar = new Star();
        randomStar.pos = [Math.random() * dimX , Math.random() * dimY];
        randomStar.vel = [0, 0];
        randomStar.parallax = Math.random();
        return randomStar;
    }

    Star.prototype.setSpeed = function (shipVel) {
        this.vel = [-1 * shipVel[0] * this.parallax, -1 * shipVel[1] * this.parallax];
    };

    Star.prototype.outOfBounds = function (bounds) {
        var pos = this.pos;
        pos[0] > bounds[0] ? pos[0] -= bounds[0] : pos[0];
        pos[0] < 0 ? pos[0] += bounds[0] : pos[0];

        pos[1] > bounds[1] ? pos[1] -= bounds[1] : pos[1];
        pos[1] < 0 ? pos[1] += bounds[1] : pos[1];
    };

    var getSpeed = function (vel) {
      return Math.sqrt(vel[0] * vel[0] + vel[1] * vel[1])
    };

})(this);