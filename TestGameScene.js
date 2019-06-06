var canvas = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

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

Troop.prototype.attack = function (Troop) {
    if (this.getDistanceToTarget(Troop.x, Troop.y) <= this.range) {
        Troop.health -= dmg;
    }
};


//Melee Soldier
function MeleeSoldier(height, width) {
    Troop.call(this, height, width, 300, 10, 50);
}

MeleeSoldier.prototype.drawSoldier = function () {
    ctx.fillStyle = "#355afa";
    ctx.fillRect(window.innerWidth/2, window.innerHeight/2, this.width, this.height);
};


// Archer (ranger) Class
function Archer (height, width) {
    Troop.call(this, height, width, 150, 50, 35);
}

Archer.prototype.drawArcher = function() {
    ctx.fillStyle = "#ffdd35";
    ctx.fillRect(window.innerWidth/2, window.innerHeight/2, this.width, this.height);
};

