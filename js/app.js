// Enemies our player must avoid
var Enemy = function(row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = row * 75;
    this.speed = speed;
    this.width = 100;
    this.height = 60;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //retrieve player variables to create a player rectangle
    //these values are then used for collision detection
    var playerX = player.getX() + 20;
    var playerY = player.getY() + 60;
    var playerWidth = player.getWidth();
    var playerHeight = player.getHeight();

    //detect whether player and enemy rectangles overlap
    if (this.x < playerX + playerWidth &&
        this.x + this.width > playerX &&
        this.y + 80 < playerY + playerHeight &&
        this.height + this.y + 80 > playerY) {
        player.reset("loss");
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.width = 60;
    this.height = 80;

    this.direction = "none"
    this.wins = 0;
    this.losses = 0;
};

Player.prototype.update = function(dt) {
    switch (this.direction) {
        case 'left':
            if (this.x >= 20) {
                this.x -= 100;
            }
            break;
        case 'up':
            this.y -= 80;
            break;
        case 'right':
            if (this.x <= 350) {
                this.x += 100;
            }
            break;
        case 'down':
            if (this.y <= 360) {
                this.y += 80;
            }
            break;
    }
    this.direction = "none";
    if (this.y <= 70) {
        this.reset("win");
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
    this.direction = keyCode;
};

Player.prototype.getX = function() {
// returns an array containing y coordinate of player
    return this.x;
}

Player.prototype.getY = function() {
// returns an array containing y coordinate of player
    return this.y;
}

Player.prototype.getWidth = function() {
    return this.width;
}

Player.prototype.getHeight = function() {
    return this.height;
}

Player.prototype.reset = function(outcome) {
    this.x = 200;
    this.y = 400;
    if (outcome == "loss") {
        this.losses -= 1;
    } else if (outcome == "win") {
        this.wins += 1;
    }
};

Player.prototype.renderScores = function() {
    ctx.fillStyle = "white";
    ctx.arc(50,91,20,0*Math.PI,2*Math.PI)
    ctx.fill();


    ctx.fillStyle = "white";
    ctx.arc(460,91,20,0*Math.PI,2*Math.PI)
    ctx.fill();

    ctx.font = "24px Arial";
    ctx.textAlign = "center"
    ctx.fillStyle = "red";
    ctx.fillText(player.losses,50,100);
    ctx.fillStyle = "black";
    ctx.fillText(player.wins,460,100);
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var allEnemies = [];

var myVar;

function spawnEnemies() {
    myVar = setInterval(enemySpawner, 1000);
}

function enemySpawner() {
    var row = getRandomInt(1,3);
    var speed = getRandomInt(150,250);
    allEnemies.push(new Enemy(row, speed));
};

spawnEnemies();

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
