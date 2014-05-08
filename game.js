(function (root) {
    //Changed the namespace
    var AST = root.Asteroids = (root.Asteroids || {});

    var Game = AST.Game = function (canvas) {
        this.backgroundImage = new Image();
        this.backgroundImage.src = 'earth.jpg';
        var img = this.backgroundImage;
        this.canvas = canvas;
        this.canvas.width = 800;
        this.canvas.height = 511;

        this.ctx = canvas.getContext("2d");
        this.asteroids = this.addAsteroids(10);

        this.ship = new AST.Ship();
        this.ship.pos = [canvas.width / 2, canvas.height / 2];

        this.bullets = [];

        this.timerID;

        // console.log(this.asteroids[0].constructor == AST.Asteroid);
    };

    Game.prototype.WIDTH = function () {
        return this.canvas.width;
    }

    Game.prototype.HEIGHT = function () {
        return this.canvas.height;
    }

    Game.prototype.addAsteroids = function (numAsteroids) {
        var asteroids = [];
        for (var i = 0; i < numAsteroids; i++) {
            console.log(this.WIDTH);
            asteroids.push(AST.Asteroid.randomAsteroid(this.WIDTH(),
                 this.HEIGHT()));
        }
        return asteroids;
    };

    Game.prototype.fireBullet = function () {
        if (this.ship.vel[0] !== 0 || this.ship.vel[1] !== 0) {
            this.bullets.push(this.ship.fireBullet());
        }
    };

    Game.prototype.draw = function () {
        var gc = this.ctx;
        gc.clearRect(0, 0, this.WIDTH(), this.HEIGHT());
        var img = this.backgroundImage;
          gc.drawImage(img, 0, 0);

        this.ship.draw(gc);

        this.asteroids.forEach(function (asteroid) {
            asteroid.draw(gc);
        });

        this.bullets.forEach(function (bullet) {
            bullet.draw(gc);
        });
    };

    Game.prototype.move = function () {
        var asteroids = this.asteroids;
        var bullets = this.bullets;
        var game = this;

        this.ship.move();
        asteroids.forEach(function (actor) {
            actor.move();
            if (!game.inWindow(actor.pos)) {
                actor.outOfBounds([game.WIDTH(), game.HEIGHT()]);
            }
        });

        bullets.forEach(function (bullet) {
            bullet.move();
            if (!game.inWindow(bullet.pos)) {
                var index = bullets.indexOf(bullet);
                bullets.splice(index,1);
            }
        });
    };

    Game.prototype.inWindow = function (pos) {
        if (pos[0] > this.WIDTH() || pos[0] < 0) {
            return false;
        } else if (pos[1] > this.HEIGHT() || pos[1] < 0) {
            return false;
        }
        return true;
    }


    Game.prototype.checkCollisions = function () {
        var ship = this.ship;
        var that = this;
        var bullets = this.bullets;
        var asteroids = this.asteroids;
        asteroids.forEach(function (asteroid) {
            // console.log(actor.constructor.name);
            // if (typeof actor === "Asteroid") {
            // }
                if (ship.isCollidedWith(asteroid)) {
                    alert("GAME OVER!!");
                    that.stop();
                };
                bullets.forEach(function (bullet) {
                    if (bullet.isCollidedWith(asteroid)) {
                        var indexOfBullet = bullets.indexOf(bullet);
                        bullets.splice(indexOfBullet,1);
                        var indexOfAsteroid = asteroids.indexOf(asteroid);
                        asteroids.splice(indexOfAsteroid, 1);
                    }
                })
            });
        };

        Game.prototype.step = function () {
            this.move();
            this.checkCollisions();
            this.draw();
        };

        Game.prototype.bindKeyHandlers = function () {
            var ship = this.ship;
            var game = this;
            key("a", function () { ship.power([-1,0]) });
            key("w", function () { ship.power([0,-1]) });
            key("d", function () { ship.power([1,0]) });
            key("s", function () { ship.power([0,1]) });
            key("space", function () { game.fireBullet() });
        }

        Game.prototype.start = function () {
            this.timerID = window.setInterval(this.step.bind(this), 30);
            this.bindKeyHandlers();
        };

        Game.prototype.stop = function () {
            window.clearInterval(this.timerID);
        }
    })(this);
