// Enemies our player must avoid
var Enemy = function(row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = 0;
    // sets the y value, based on specified row
    this.y = row * 75;
    this.speed = speed;

    // the width and height will be used for collision detection
    this.width = 100;
    this.height = 60;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multipling  movement by the dt parameter
    // to ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // retrieve player variables to create a player rectangle
    // these values are used for collision detection
    // x, y coordinates needed to be adjusted for proper use in rectangle
    var playerX = player.getX() + 20;
    var playerY = player.getY() + 60;
    var playerWidth = player.getWidth();
    var playerHeight = player.getHeight();

    //detect whether player and enemy rectangles overlap
    if (this.x < playerX + playerWidth &&
        this.x + this.width > playerX &&
        this.y + 80 < playerY + playerHeight &&
        this.height + this.y + 80 > playerY) {
        
        // if so, trigger a loss and move Player to starting position
        player.reset("loss");
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player that is controlled by the site visitor
var Player = function() {
    this.sprite = 'images/char-boy.png';

    // initial x, y coordinates
    this.x = 200;
    this.y = 400;

    // width & height for use in collision detection
    this.width = 60;
    this.height = 80;

    // without any commands given, direction will start without a value
    this.direction = "none";

    // start the player with no wins or losses
    // these will increment as the game continues
    this.wins = 0;
    this.losses = 0;
};

Player.prototype.update = function(dt) {
    // use the direction to move the player
    switch (this.direction) {

        // if the direction is left, move Player to the left one slot
        // unless Player is too far to the left
        case 'left':
            if (this.x >= 20) {
                this.x -= 100;
            }
            break;

        // if the direction is up, move Player up one slot
        case 'up':
            this.y -= 80;
            break;

        // if the direction is right, move Player right one slot
        // unless player is too far to the right already
        case 'right':
            if (this.x <= 350) {
                this.x += 100;
            }
            break;

        // if direction is down, move Player down one slot
        // unless player is too far down already
        case 'down':
            if (this.y <= 360) {
                this.y += 80;
            }
            break;
    }
    // reset the direction to none
    this.direction = "none";

    // if the player has reached the water,
    // call the reset function, and trigger a win
    if (this.y <= 70) {
        this.reset("win");
    }
};

// renders the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// sets the player's direction based on the key that was pressed
Player.prototype.handleInput = function(keyCode) {
    this.direction = keyCode;
};

// returns player's x coordinate
// for use in collision detection by Enemy instances
Player.prototype.getX = function() {
    return this.x;
};

// returns player's y coordinate
// for use in collision detection by Enemy instances
Player.prototype.getY = function() {
    return this.y;
};

// returns player's width property,
// for use in collision detection by Enemy instances
Player.prototype.getWidth = function() {
    return this.width;
};

// returns plater's height property,
// for use in collision detection by Enemy instances
Player.prototype.getHeight = function() {
    return this.height;
};

// Returns player to starting location
// Input: outcomt - "loss" or "win"
Player.prototype.reset = function(outcome) {
    // starting x,y coordinates
    this.x = 200;
    this.y = 400;

    // if outcome is loss, subtract 1 from the loss count
    if (outcome == "loss") {
        this.losses -= 1;
    // if the outcome is a win, add 1 to the win count
    } else if (outcome == "win") {
        this.wins += 1;
    }
};

// displays the player's current scores
Player.prototype.renderScores = function() {

    // create a white circle in the top left corner
    ctx.fillStyle = "white";
    ctx.arc(50,91,20,0*Math.PI,2*Math.PI);
    ctx.fill();

    // create a white circle in the top right corner
    ctx.fillStyle = "white";
    ctx.arc(460,91,20,0*Math.PI,2*Math.PI);
    ctx.fill();

    // set font properties
    ctx.font = "24px Arial";
    ctx.textAlign = "center";

    // display player losses in red in the upper left corner
    ctx.fillStyle = "red";
    ctx.fillText(player.losses,50,100);

    // display player wins in black in the upper right corner
    ctx.fillStyle = "black";
    ctx.fillText(player.wins,460,100);
};

// ---------- instantiate player and enemy objects ------------------




// All enemy objects are added to an array called allEnemies
var allEnemies = [];

// spawn enemies at a regular interval
var myVar;
function spawnEnemies() {
    myVar = setInterval(enemySpawner, 1000);
}

// function for creating a random number within a range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function for spawning enemies in a random row and at a random speed (within accepted speeds)
function enemySpawner() {
    var row = getRandomInt(1,3);
    var speed = getRandomInt(150,250);
    allEnemies.push(new Enemy(row, speed));
}

// Begin spawning enemies every interval
spawnEnemies();


// player object saved in a variable called player
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
