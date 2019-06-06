var canvas = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

//----------------------------------------------------------------------------------------------------

// Troop class
function Troop(height, width, health, dmg, range) {
    this.height = height;
    this.width = width;
    this.x = window.innerWidth/2;
    this.y = window.innerHeight/2;

    this.health = health;
    this.range = range;
    this.dmg = dmg
}

Troop.prototype.teleport = function(tx, ty) {
    this.x = tx;
    this.y = ty;
};

Troop.prototype.getDistanceToTarget = function (tx, ty) {
    return Math.sqrt(Math.pow(this.x - tx, 2) + Math.pow(this.y - ty, 2));
};

Troop.prototype.attack = function (troopArray) {
    for (i=0; i<troopArray.length; i++) {
        if (this.getDistanceToTarget(troopArray[i].x, troopArray[i].y) <= this.range) {
            Troop.health -= dmg;
        }
    }
};

Troop.prototype.drawTroop = function (color) {
    ctx.fillStyle = color;
    ctx.fillRect(window.innerWidth/2, window.innerHeight/2, this.width, this.height);
};

Troop.prototype.move = function (troopArray) {
    for (i=0; i<troopArray.length; i++) {
        if (this.getDistanceToTarget(troopArray[i].x, troopArray[i].y) <= this.range) {
            //Move towards that target
            //Look at old code from first game to get enemy movement
        }
    }
};

Troop.prototype.checkBounds = function (tx, ty) {
    if ((this.x <= tx || tx <= this.x+this.width)&&(this.y <= ty || ty <= this.y+this.height)) {
        return true;
    }
};

//----------------------------------------------------------------------------------------------------

//Melee Soldier
function MeleeSoldier(height, width) {
    Troop.call(this, height, width, 300, 10, 50);
}

//----------------------------------------------------------------------------------------------------

// Archer (ranger) Class
function Archer (height, width) {
    Troop.call(this, height, width, 150, 50, 35);
}

