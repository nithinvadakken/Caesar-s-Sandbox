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


ctx.beginPath();
ctx.arc(95, 50, 40, 0, 2 * Math.PI);
ctx.stroke();