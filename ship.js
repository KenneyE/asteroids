(function (root) {
  //Changed the namespace
  var AST = root.Asteroids = (root.Asteroids || {});

  var Ship = AST.Ship = function () {
      var radius = 10;
      AST.MovingObject.call(this, radius, Ship.COLOR);
  };
  Ship.inherits(AST.MovingObject);

  Ship.prototype.power = function (impulse) {
    if (AST.getSpeed([this.vel[0] + impulse[0], this.vel[1] + impulse[1]]) < Ship.MAX_SPEED) {
      this.vel = [this.vel[0] + impulse[0], this.vel[1] + impulse[1]];
    };
  };
  
  Ship.prototype.steer = function (steerSpeed) {
      this.dir = AST.normalize([this.dir[0] + steerSpeed[0], this.dir[1] + steerSpeed[1]], 1);
  };

  Ship.BULLET_SPEED = 30;
  Ship.MAX_SPEED = 15;
  Ship.COLOR = "#33b";

  Ship.prototype.fireBullet = function () {
    var ship = this;

    var bulletVel = AST.normalize(ship.dir, Ship.BULLET_SPEED);

    var bulletVel = [ship.dir[0] * Ship.BULLET_SPEED, ship.dir[1] * Ship.BULLET_SPEED];
    return new AST.Bullet(bulletVel, ship.pos);
  }

  Ship.prototype.outOfBounds = function (bounds) {
      var pos = this.pos;
      pos[0] > bounds[0] ? pos[0] -= bounds[0] : pos[0];
      pos[0] < 0 ? pos[0] += bounds[0] : pos[0];

      pos[1] > bounds[1] ? pos[1] -= bounds[1] : pos[1];
      pos[1] < 0 ? pos[1] += bounds[1] : pos[1];
  };

  Ship.prototype.increaseRadius = function () {
      this.radius += 1
  };

})(this);