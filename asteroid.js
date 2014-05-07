(function (root) {
    //Changed the namespace
    var AST = root.Asteroids = (root.Asteroids || {});


    var Asteroid = AST.Asteroid = function () {
        AST.MovingObject.call(this, Asteroid.RADIUS, Asteroid.COLOR);
    };

    Asteroid.COLOR = 'red';
    Asteroid.RADIUS = 10;

    Asteroid.inherits(AST.MovingObject);

    Asteroid.randomAsteroid = function (dimX, dimY) {
        var randomAsteroid = new Asteroid();
        randomAsteroid.pos = [Math.random() * dimX, Math.random() * dimY];
        randomAsteroid.vel = [Math.random() * 5 - 2.5, Math.random() * 5 - 2.5];
        return randomAsteroid;
    }

})(this);
