var canvas = document.getElementById("myCanvas");
var ctx = c.getContext("2d");


function MeleeSoldier(height, width) {
    this.height = height;
    this.width = width;
}

MeleeSoldier.prototype.drawSoldier = function () {
    ctx.fillStyle = "#355afa";
    ctx.fillRect(window.innerWidth/2, window.innerHeight/2, this.width, this.height);
};


// Archer (ranger) Class
function Archer (height, width) {
    this.height = height;
    this.width = width;
    health = 150;
}

Archer.prototype.drawArcher = function() {
    ctx.fillStyle = "#ffdd35";
    ctx.fillRect(window.innerWidth/2, window.innerHeight/2, this.width, this.height);
};

Archer.prototype.getDistance = function(){

};

