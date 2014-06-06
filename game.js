(function (root) {
    var AST = root.Asteroids = (root.Asteroids || {});

    var Game = AST.Game = function (canvas) {
        this.backgroundImage = new Image();
        this.backgroundImage.src = 'earth.jpg';
        // var img = this.backgroundImage;

        this.canvas = canvas;
        this.canvas.width = window.innerWidth - 20;
        this.canvas.height = window.innerHeight - 30;
        this.canvas.margin = "auto";
        this.ship = new AST.Ship();
        this.ship.pos = [canvas.width / 2, canvas.height / 2];

        this.ctx = canvas.getContext("2d");
        this.stars = this.addStars(250)

        this.highScore = 0;
        this.hitShots = 1;
        this.totalShots = 1;
        this.lossCount = 0;
        this.winCount = 0;
        this.setupGame();
        this.frameCount = 0;  
    };


    Game.BULLET_TIME = 5;
    
    Game.prototype.WIDTH = function () {
        return this.canvas.width;
    }

    Game.prototype.HEIGHT = function () {
        return this.canvas.height;
    }

    Game.prototype.setupGame = function () {
        // debugger
        this.asteroids = this.addAsteroids(15, this.ship.pos);

        this.bulletTime = Game.BULLET_TIME;
        this.isPaused = false;

        this.ship.vel = [0, 0];
        this.bullets = [];

        this.timerID = null;
        this.destroyedAsteroids = 0;
        this.start();
    };

    Game.prototype.addAsteroids = function (numAsteroids, pos) {
        var asteroids = [];
        for (var i = 0; i < numAsteroids; i++) {
            asteroids.push(AST.Asteroid.randomAsteroid(this.WIDTH(),
            this.HEIGHT(), pos));
        }
        return asteroids;
    };

    Game.prototype.addStars = function (numStars) {
        var stars = [];
        for (var i = 0; i < numStars; i++) {
            stars.push(AST.Star.randomStar(this.WIDTH(), this.HEIGHT()));
        }
        return stars;
    };

    Game.prototype.fireBullet = function () {
        if (this.bulletTime <= 0)  {
            this.bullets.push(this.ship.fireBullet());
            this.bulletTime = Game.BULLET_TIME;
            this.totalShots += 1;
        }
    };

    Game.prototype.draw = function () {
        var gc = this.ctx;
        gc.clearRect(0, 0, this.WIDTH(), this.HEIGHT());

        this.stars.forEach(function (star) {
            star.draw(gc);
        });

        this.bullets.forEach(function (bullet) {
            bullet.draw(gc);
        });

        this.asteroids.forEach(function (asteroid) {
            asteroid.draw(gc);
        });

        this.ship.draw(gc);

    };

    Game.prototype.move = function () {
        var asteroids = this.asteroids;
        var stars = this.stars;
        var bullets = this.bullets;
        var game = this;

        this.ship.move();
        this.ship.outOfBounds([game.WIDTH(), game.HEIGHT()]);

        asteroids.forEach(function (asteroid) {
            asteroid.setSpeed(game.ship.vel);

            asteroid.move();
            asteroid.outOfBounds([game.WIDTH(), game.HEIGHT()]);
        });

        stars.forEach(function (star) {
            star.setSpeed(game.ship.vel);

            star.move();
            star.outOfBounds([game.WIDTH(), game.HEIGHT()])
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
        var game = this;
        var bullets = this.bullets;
        var asteroids = this.asteroids;
        var isCollided = false;

        asteroids.forEach(function (asteroid) {
            bullets.forEach(function (bullet) {
                if (bullet.isCollidedWith(asteroid)) {
                    var indexOfBullet = bullets.indexOf(bullet);
                    bullets.splice(indexOfBullet,1);
                    var indexOfAsteroid = asteroids.indexOf(asteroid);
                    asteroids.splice(indexOfAsteroid, 1);
                    game.destroyedAsteroids += 1;
                    ship.increaseRadius();
                    game.hitShots += 1;
                }
            })
            if (ship.isCollidedWith(asteroid)) {
                if (game.highScore < Math.floor(game.ship.radius / 2) ) {
                    game.highScore = Math.floor(game.ship.radius / 2);
                }
                game.ship.radius = 10;

                game.lossCount += 1;
                game.stop();
                isCollided = true;


            } else if (game.asteroids.length === 0) {
                game.winCount += 1;
                game.stop();
                isCollided = true;
            }
        });
        return isCollided;
    };

    Game.prototype.checkGameOver = function () {
        var isCollided = this.checkCollisions();
        if (isCollided) { this.restartGame(); };
    };

    Game.prototype.restartGame = function () {
        this.frameCount = 0;     
        window.clearInterval(this.timerID);
        this.timerID = window.setInterval(this.transitionSequence.bind(this), 30);
        // this.setupGame();
        // this.start();
    };

    Game.prototype.updateCounts = function () {
        $('#asteroid-count').html("Destroyed asteroids: " + this.destroyedAsteroids);
        $('#win-count').html("  |  Wins: " + this.winCount);
        $('#loss-count').html("  |  Losses: " + this.lossCount);
        $('#accuracy').html("  |  Accuracy: " + Math.ceil(100 * this.hitShots / this.totalShots) + "%");
        $('#ship-size').html("  |  Ship Size: " + Math.floor(this.ship.radius / 2) + " parsecs");
        $('#high-score').html(" Your Best: " + this.highScore + " parsecs");
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

        game.bulletTime -= 1;

        var acceleration = 0.3;
        var steerSpeed = 0.2;

        if(key.isPressed("a")) ship.power([-1 * acceleration,0]);
        if(key.isPressed("w")) ship.power([0,-1 * acceleration]);
        if(key.isPressed("d")) ship.power([acceleration,0]);
        if(key.isPressed("s")) ship.power([0,acceleration]);
 
        if(key.isPressed("left")) ship.steer([-1 * steerSpeed, 0]);
        if(key.isPressed("up"))   ship.steer([0, -1 * steerSpeed]);
        if(key.isPressed("right"))ship.steer([steerSpeed, 0]);
        if(key.isPressed("down")) ship.steer([0, steerSpeed]);
      
        if(key.isPressed("space")) game.fireBullet();

        key("p", game.stop.bind(this));
    }

    Game.prototype.start = function () {
        this.timerID = window.setInterval(this.step.bind(this), 30);
    };

    Game.prototype.stop = function () {
        if(!this.paused) {
            window.clearInterval(this.timerID);
        } else {
            window.clearInterval(this.timerID);
            this.timerID = window.setInterval(this.step.bind(this), 30);
        }
        this.paused = !this.paused;
    };
    
    Game.prototype.transitionSequence = function () {
        var stars = this.stars;
        var game = this;
        game.bullets = [];
        var speed;
        game.frameCount++;
        
        if (this.frameCount > 60) { 
            window.clearInterval(game.timerID);
            this.setupGame();
            return;
        } else if (this.frameCount >= 50) {
            speed = 5 * 3 * (60 - this.frameCount); 
        } else {
            speed = 3 * this.frameCount;
        }
        
        stars.forEach(function (star) {
            star.setSpeed([ speed, 0]);
            
            star.move();
            star.outOfBounds([game.WIDTH(), game.HEIGHT()])
        });
        game.draw();
    };
})(this);
