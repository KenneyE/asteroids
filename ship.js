(function (root) {
    //Changed the namespace
    var AST = root.Asteroids = (root.Asteroids || {});

    var Ship = AST.Ship = function () {
        var radius = 10;
        AST.MovingObject.call(this, radius, Ship.COLOR);
    };
    Ship.inherits(AST.MovingObject);

    Ship.prototype.draw = function (c) {
        c.beginPath();
        var xPos = this.pos[0];
        var yPos = this.pos[1];
        var wedgeAngle = 0.4;
        var dirAngle = Math.atan2(this.dir[1], -this.dir[0]);
        var xLength = this.radius * Math.cos(dirAngle + wedgeAngle)
        var yLength = this.radius * Math.sin(dirAngle + wedgeAngle)

        apex = [xPos - xLength / 2, yPos + yLength / 2];
        c.moveTo(apex[0], apex[1]);
        c.lineTo(apex[0] + xLength, 
                 apex[1] - yLength
             );
        c.arc(apex[0], apex[1], this.radius, 
             -dirAngle + wedgeAngle, 
             -dirAngle + wedgeAngle,
             false
         );
         
         c.lineTo(apex[0], apex[1]);
        
        // c.lineTo(xPos - aspectRatio * this.radius, yPos + this.radius);
        
        c.fillStyle = this.color;
        c.fill();

        c.lineWidth = this.strokeWidth;
        c.strokeStyle = this.strokeColor;
        c.stroke();

        c.shadowColor = 'black';
        c.shadowBlur = 2;
    };
    
    Ship.prototype.power = function (impulse) {
        var speed = AST.getSpeed([this.vel[0] + impulse[0], 
                        this.vel[1] + impulse[1]]);
        if ( speed < Ship.MAX_SPEED) {
            this.vel = [this.vel[0] + impulse[0], this.vel[1] + impulse[1]];
        }
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