(function (root) {
  //Changed the namespace
  var AST = root.Asteroids = (root.Asteroids || {});

  var Ship = AST.Ship = function () {
      var radius = 10;
      AST.MovingObject.call(this, radius, Ship.COLOR);
  };
  Ship.inherits(AST.MovingObject);

  Ship.prototype.power = function (impulse) {
    if (getSpeed([this.vel[0] + impulse[0], this.vel[1] + impulse[1]]) < Ship.MAX_SPEED) {
      this.vel = [this.vel[0] + impulse[0], this.vel[1] + impulse[1]];
    };
  };

  Ship.BULLET_SPEED = 10;
  Ship.MAX_SPEED = 8;
  Ship.COLOR = "blue";

  Ship.prototype.fireBullet = function () {
    var ship = this;
    var shipSpeed = getSpeed(ship.vel);
    var speedRatio = Ship.BULLET_SPEED / shipSpeed;
    var bulletVel = [ship.vel[0] * speedRatio, ship.vel[1] * speedRatio];

    return new AST.Bullet(bulletVel, ship.pos);
  }

  Ship.prototype.outOfBounds = function (bounds) {
      var pos = this.pos;
      pos[0] > bounds[0] ? pos[0] -= bounds[0] : pos[0];
      pos[0] < 0 ? pos[0] += bounds[0] : pos[0];

      pos[1] > bounds[1] ? pos[1] -= bounds[1] : pos[1];
      pos[1] < 0 ? pos[1] += bounds[1] : pos[1];
  };

  var getSpeed = function (vel) {
    return Math.sqrt(vel[0] * vel[0] + vel[1] * vel[1])
  };

  Ship.prototype.increaseRadius = function () {
      this.radius += 1
  };

})(this);