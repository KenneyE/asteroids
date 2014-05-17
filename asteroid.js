(function (root) {
    var AST = root.Asteroids = (root.Asteroids || {});


    var Asteroid = AST.Asteroid = function () {
        var radius = Math.floor(Math.random() * 20 + 30)
        var color = (Math.floor(Math.random() * 4 + 3)) + "01"
        AST.MovingObject.call(this, radius, color);
    };

    Asteroid.inherits(AST.MovingObject);
    Asteroid.COLOR = '#302';
    Asteroid.MAX_SPEED = 10;

    Asteroid.randomAsteroid = function (dimX, dimY) {
        var randomAsteroid = new Asteroid();
        randomAsteroid.pos = [Math.random() * dimX / 2 - (dimX/4)  , Math.random() * dimY];
        randomAsteroid.vel = [Math.random() * Asteroid.MAX_SPEED - Asteroid.MAX_SPEED/2,
        Math.random() * Asteroid.MAX_SPEED - Asteroid.MAX_SPEED/2];
        return randomAsteroid;
    }

    Asteroid.prototype.setSpeed = function (shipVel) {
        var relSpeed = 120;
        this.vel = [this.vel[0] -  shipVel[0] / relSpeed , this.vel[1] - shipVel[1]  / relSpeed ];
    };

    Asteroid.prototype.outOfBounds = function (bounds) {
        var pos = this.pos;
        pos[0] > bounds[0] ? pos[0] -= bounds[0] : pos[0];
        pos[0] < 0 ? pos[0] += bounds[0] : pos[0];

        pos[1] > bounds[1] ? pos[1] -= bounds[1] : pos[1];
        pos[1] < 0 ? pos[1] += bounds[1] : pos[1];
    };

})(this);
