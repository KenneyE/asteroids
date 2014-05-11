(function (root) {
    //Changed the namespace
    var AST = root.Asteroids = (root.Asteroids || {});

    var Ship = AST.Ship = function () {
        var radius = 10;
        AST.MovingObject.call(this, radius, Ship.COLOR);
    };
    Ship.inherits(AST.MovingObject);

    Ship.BULLET_SPEED = 30;
    Ship.MAX_SPEED = 15;
    Ship.COLOR = "#33b";
    Ship.IMPULSE = -1 * 0.3;

    Ship.prototype.steer = function (steering) {
        this.dir = AST.normalize([this.dir[0] + steering[0], this.dir[1] + steering[1]], 1);
    };
  
  
    Ship.prototype.power = function () {
        var impulse = [Ship.IMPULSE * this.dir[0], Ship.IMPULSE * this.dir[1]];
        if (AST.getSpeed([this.vel[0] + impulse[0], this.vel[1] + impulse[1]]) < Ship.MAX_SPEED) {
            this.vel = [this.vel[0] + impulse[0], this.vel[1] + impulse[1]];
        }   
    };

    Ship.prototype.fireBullet = function () {
        var ship = this;
        // var shipSpeed = AST.getSpeed(ship.vel);
        // var speedRatio = Ship.BULLET_SPEED / shipSpeed;
        // var bulletVel = [ship.vel[0] * speedRatio, ship.vel[1] * speedRatio];

        var bulletVel = AST.normalize(ship.dir, Ship.BULLET_SPEED);
        this.power();
    
        return new AST.Bullet(bulletVel, ship.pos);
    };

    Ship.prototype.outOfBounds = function (bounds) {
        var pos = this.pos;
        pos[0] > bounds[0] ? pos[0] -= bounds[0] : pos[0];
        pos[0] < 0 ? pos[0] += bounds[0] : pos[0];

        pos[1] > bounds[1] ? pos[1] -= bounds[1] : pos[1];
        pos[1] < 0 ? pos[1] += bounds[1] : pos[1];
    };

    Ship.prototype.increaseRadius = function () {
        this.radius += 1;
    };

})(this);