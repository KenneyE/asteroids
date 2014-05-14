(function (root) {
    var AST = root.Asteroids = (root.Asteroids || {});

    var Bullet = AST.Bullet = function (vel, pos) {
        AST.MovingObject.call(this, 2, '#8f3');
        this.vel = vel;
        this.pos = pos;
    };

    Bullet.inherits(AST.MovingObject);
})(this);