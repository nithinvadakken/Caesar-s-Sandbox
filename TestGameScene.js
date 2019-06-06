var canvas = document.getElementById("myCanvas");
var ctx = c.getContext("2d");


class MeleeSoldier {

    height = 0;
    width = 0;

    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    drawSoldier() {
        ctx.fillRect(window.innerWidth/2, window.innerHeight/2, this.width, this.height);
    }
}

function createSoldiers() {

}


ctx.beginPath();
ctx.arc(95, 50, 40, 0, 2 * Math.PI);
ctx.stroke();