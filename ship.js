(function (root) {
    //Changed the namespace
    var AST = root.Asteroids = (root.Asteroids || {});

    var Ship = AST.Ship = function () {
        AST.MovingObject.call(this, Ship.RADIUS, Ship.COLOR);
    };
    Ship.inherits(AST.MovingObject);

    Ship.prototype.power = function (impulse) {
        this.vel = [this.vel[0] + impulse[0],
                    this.vel[1] + impulse[1]];
    }

    Ship.RADIUS = 10;
    Ship.COLOR = "blue";
})(this);