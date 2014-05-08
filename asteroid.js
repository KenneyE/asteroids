(function (root) {
    //Changed the namespace
    var AST = root.Asteroids = (root.Asteroids || {});


    var Asteroid = AST.Asteroid = function () {
        AST.MovingObject.call(this, Asteroid.RADIUS,
            Asteroid.COLOR);
    };
    Asteroid.inherits(AST.MovingObject);
    Asteroid.COLOR = 'red';
    Asteroid.RADIUS = 10;

    Asteroid.randomAsteroid = function (dimX, dimY) {
        var randomAsteroid = new Asteroid();
        randomAsteroid.pos = [Math.random() * dimX, Math.random() * dimY];
        randomAsteroid.vel = [Math.random() * 5 - 2.5, Math.random() * 5 - 2.5];
        return randomAsteroid;
    }

    Asteroid.prototype.outOfBounds = function (bounds) {
        var pos = this.pos;
        pos[0] > bounds[0] ? pos[0] -= bounds[0] : pos[0];
        pos[0] < 0 ? pos[0] += bounds[0] : pos[0];

        pos[1] > bounds[1] ? pos[1] -= bounds[1] : pos[1];
        pos[1] < 0 ? pos[1] += bounds[1] : pos[1];
    };

})(this);
