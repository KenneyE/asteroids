(function (root) {
    //Changed the namespace
    var AST = root.Asteroids = (root.Asteroids || {});

    Function.prototype.inherits = function (SuperClass) {
        function Surrogate() {};
        Surrogate.prototype = SuperClass.prototype;
        this.prototype = new Surrogate();
    }

    var MovingObject = AST.MovingObject = function (radius, color) {
        this.pos = [0, 0];
        this.vel = [0, 0];
        this.dir = [1, 0];

        this.radius = radius;
        this.color = color;

        this.strokeColor = color;
        this.strokeWidth = 1;
    };

    MovingObject.prototype.move = function () {
        this.pos = [this.pos[0] + this.vel[0],
        this.pos[1] + this.vel[1]];
    };

    MovingObject.prototype.draw = function (c) {
        c.beginPath();

        c.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);

        c.fillStyle = this.color;
        c.fill();

        c.lineWidth = this.strokeWidth;
        c.strokeStyle = this.strokeColor;
        c.stroke();

        c.shadowColor = 'black';
        c.shadowBlur = 2;
    };

    MovingObject.prototype.isCollidedWith = function (otherObject) {
        var distance = AST.distance(this.pos, otherObject.pos);
        var collideDistance = (this.radius + this.strokeWidth +
            otherObject.radius + otherObject.strokeWidth);
            return (distance <= collideDistance)
        };

<<<<<<< HEAD
    var distance = AST.distance = function (pos1, pos2) {
        xDiff = Math.abs(pos1[0] - pos2[0]);
        yDiff = Math.abs(pos1[1] - pos2[1]);
        return Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
    }
    
    var normalize = AST.normalize =  function (vector, normalizeTo) {
        var ratio = normalizeTo / getSpeed(vector);
        return ([vector[0] * ratio, vector[1] * ratio]);
    };
    
    var getSpeed = AST.getSpeed = function (vel) {
      return Math.sqrt(vel[0] * vel[0] + vel[1] * vel[1])
    };
    
})(this);
=======
        var distance = AST.distance = function (pos1, pos2) {
            xDiff = Math.abs(pos1[0] - pos2[0]);
            yDiff = Math.abs(pos1[1] - pos2[1]);
            return Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
        }
    
        var getSpeed = AST.getSpeed = function (vel) {
            return Math.sqrt(vel[0] * vel[0] + vel[1] * vel[1])
        };
    
        var normalize = AST.normalize = function (vector, normalizeTo) {
            var speed = getSpeed(vector)
            return [vector[0] * normalizeTo / speed, vector[1] * normalizeTo / speed];
        };
    
    })(this);
>>>>>>> Decoupled movement and shooting. But laggy
