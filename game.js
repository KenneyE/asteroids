(function (root) {
    //Changed the namespace
    var AST = root.Asteroids = (root.Asteroids || {});

    var Game = AST.Game = function (canvas) {
        this.canvas = canvas;
        this.canvas.width = Asteroids.Game.DIM_X;
        this.canvas.height = Asteroids.Game.DIM_Y;

        this.ctx = canvas.getContext("2d");
        this.actors = this.addAsteroids(10);

        this.ship = new AST.Ship();
        this.ship.pos = [Game.DIM_X / 2, Game.DIM_Y / 2];
        this.actors.push(this.ship);

        this.timerID;
        console.log(this.actors[0].constructor == AST.Asteroid);

    };

    Game.DIM_X = 500;
    Game.DIM_Y = 500;

    Game.prototype.addAsteroids = function (numAsteroids) {
        var asteroids = [];
        for (var i = 0; i < numAsteroids; i++) {
            asteroids.push(AST.Asteroid.randomAsteroid(500, 500));
        }
        return asteroids;
    };

    Game.prototype.draw = function () {
        var gc = this.ctx;
        gc.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
        gc.fillStyle = "black";
        gc.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

        this.actors.forEach(function (actor) {
            actor.draw(gc);
        });
    };

    Game.prototype.move = function () {
        var actors = this.actors
        actors.forEach(function (actor) {
            actor.move();
            if (!Game.inWindow(actor.pos)) {
                var index = actors.indexOf(actor);
                actors.splice(index,1);
            }
        });
    };

    Game.inWindow = function (pos) {
        if (pos[0] > Game.DIM_X || pos[0] < 0) {
            return false;
        } else if (pos[1] > Game.DIM_Y || pos[1] < 0) {
            return false;
        }
        return true;
    }


    Game.prototype.checkCollisions = function () {
        var ship = this.ship;
        this.actors.forEach(function (actor) {
            // console.log(actor.constructor.name);
            if (typeof actor === "Asteroid") {
                if (ship.isCollidedWith(actor)) {
                    alert("GAME OVER!!");

                };
            }
        });
    };

    Game.prototype.step = function () {
        this.move();
        this.checkCollisions();
        this.draw();
    };

    Game.prototype.bindKeyHandlers = function () {
        var ship = this.ship;
        key("a", function () { ship.power([-1,0]) });
        key("w", function () { ship.power([0,-1]) });
        key("d", function () { ship.power([1,0]) });
        key("s", function () { ship.power([0,1]) });
    }

    Game.prototype.start = function () {
        this.timerID = window.setInterval(this.step.bind(this), 30);
        this.bindKeyHandlers();
    };

    Game.prototype.stop = function () {
        window.clearInteval(this.timerID);
    }
})(this);
