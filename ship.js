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

    Ship.BULLET_SPEED = 10;
    Ship.prototype.fireBullet = function () {
        var ship = this;
        var shipSpeed = Math.sqrt(ship.vel[0] * ship.vel[0] + ship.vel[1] * ship.vel[1]);
        var speedRatio = Ship.BULLET_SPEED / shipSpeed;
        var bulletVel = [ship.vel[0] * speedRatio, ship.vel[1] * speedRatio];

        return new AST.Bullet(bulletVel, ship.pos);
    }

    Ship.RADIUS = 10;
    Ship.COLOR = "blue";

})(this);