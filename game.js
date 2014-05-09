(function (root) {
    //Changed the namespace
    var AST = root.Asteroids = (root.Asteroids || {});

    var Game = AST.Game = function (canvas) {
        this.backgroundImage = new Image();
        this.backgroundImage.src = 'earth.jpg';
        // var img = this.backgroundImage;

        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.margin = "auto";

        this.ctx = canvas.getContext("2d");
        this.asteroids = this.addAsteroids(10);

        this.ship = new AST.Ship();
        this.ship.pos = [canvas.width / 2, canvas.height / 2];

        this.bullets = [];

        this.timerID;
        this.destroyedAsteroids = 0;
        this.lossCount = 0;
        this.winCount = 0;
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
        // var img = this.backgroundImage;
        // gc.drawImage(img, 0, 0);

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
        this.ship.outOfBounds([game.WIDTH(), game.HEIGHT()]);

        asteroids.forEach(function (actor) {
            actor.move();
            actor.outOfBounds([game.WIDTH(), game.HEIGHT()]);
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
                    // alert("GAME OVER!!");
                    this.lossCount += 1;
                    that.stop();
                };
                bullets.forEach(function (bullet) {
                if (bullet.isCollidedWith(asteroid)) {
                    var indexOfBullet = bullets.indexOf(bullet);
                    bullets.splice(indexOfBullet,1);
                    var indexOfAsteroid = asteroids.indexOf(asteroid);
                    asteroids.splice(indexOfAsteroid, 1);
                    that.destroyedAsteroids += 1;
                }
            })
        });
    };

    Game.prototype.checkGameOver = function () {
        var game = this;
        if (game.asteroids.length === 0) {
            // alert("You Won!!");
            this.winCount += 1;
            game.stop();
        }

        this.checkCollisions();
    }

    Game.prototype.updateCounts = function () {
        console.log(this.destroyedAsteroids)
        $('#asteroid-count').html("Destroyed asteroids: " + this.destroyedAsteroids);
        $('#win-count').html("Wins: " + this.winCount);
        $('#loss-count').html("Losses: " + this.lossCount);
    };



    Game.prototype.step = function () {
        this.handleKeys();
        this.move();
        this.draw();
        this.updateCounts();
        this.checkGameOver();
    };

    Game.prototype.handleKeys = function () {
        var ship = this.ship;
        var game = this;
        var acceleration = 0.2;
        if(key.isPressed("a")) ship.power([-1 * acceleration,0]);
        if(key.isPressed("w")) ship.power([0,-1 * acceleration]);
        if(key.isPressed("d")) ship.power([acceleration,0]);
        if(key.isPressed("s")) ship.power([0,acceleration]);
        if(key.isPressed("space")) game.fireBullet();
    }

    Game.prototype.start = function () {
        this.timerID = window.setInterval(this.step.bind(this), 30);
        this.handleKeys();
    };

    Game.prototype.stop = function () {
        window.clearInterval(this.timerID);
    }
})(this);
