(function (root) {
    var AST = root.Asteroids = (root.Asteroids || {});

    var Bullet = AST.Bullet = function (vel, pos) {
        AST.MovingObject.call(this, 1, '#6f1');
        this.vel = vel;
        this.pos = pos;
    };

    Bullet.inherits(AST.MovingObject);


})(this);