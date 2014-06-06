(function (root) {
    //Changed the namespace
    var AST = root.Asteroids = (root.Asteroids || {});

    var Ship = AST.Ship = function () {
        var radius = 25;
        AST.MovingObject.call(this, radius, Ship.COLOR);
    };
    Ship.inherits(AST.MovingObject);

    Ship.prototype.draw = function (c) {
        c.beginPath();

        var vertices = this.getVertices();
        var apex = vertices[0];
        
        c.moveTo(apex[0], apex[1]);
        c.lineTo(vertices[1][0], vertices[1][1] );
        c.lineTo(vertices[2][0], vertices[2][1] );
         c.lineTo(apex[0], apex[1]);
                
        c.fillStyle = this.color;
        c.fill();

        c.lineWidth = this.strokeWidth;
        c.strokeStyle = this.strokeColor;
        c.stroke();

        c.shadowColor = 'black';
        c.shadowBlur = 2;
    };
    
    Ship.prototype.getVertices = function () {
        var xPos = this.pos[0];
        var yPos = this.pos[1];
        
        var wedgeAngle = 0.3;
        var dirAngle = Math.atan2(-this.dir[1], -this.dir[0]);
        
        var apexX = xPos - (this.radius / 2) * Math.cos(dirAngle);
        var apexY = yPos - (this.radius / 2) * Math.sin(dirAngle);
        
        var x1 = apexX + this.radius * Math.cos(dirAngle + wedgeAngle);
        var y1 = apexY + this.radius * Math.sin(dirAngle + wedgeAngle);
        
        var x2 = apexX + this.radius * Math.cos(dirAngle - wedgeAngle);
        var y2 = apexY + this.radius * Math.sin(dirAngle - wedgeAngle);
                        
        return [[apexX, apexY], 
                [x1, y1],
                [x2, y2]
            ];
    
    };
    
    Ship.prototype.isCollidedWith = function (otherObject) {
        var ship = this;
        var isCollided = false;
        this.getVertices().forEach (function (vert) {
            var dist = AST.distance(vert, otherObject.pos)
            if  (dist <= otherObject.radius + otherObject.strokeWidth + ship.strokeWidth)
            {
                isCollided = true;
            }
        });
        return isCollided;
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
    Ship.COLOR = "#006666";

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