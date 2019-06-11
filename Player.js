//Player Class (should come in handy later for online play)
class Player {

    constructor(id) {
        this.id = id;
        this.numTroops = 40;
        this.army = [];
        this.position = createVector(window.innerWidth/2, window.innerHeight/2);
    }

    update(){
        console.log(mouseX);
        let vel = createVector(mouseX,mouseY);
        vel.sub(this.position);
        this.position.add(vel);
    }

    addArmy() {
        //default number of rows and columns of troops

        let armyArray = [];
        let meleeX;
        let meleeY;

        let archerX;
        let archerY;

        for (let i=0; i<this.numTroops; i++) {
            if (i%2===0) {
                armyArray.push(new MeleeSoldier(random(width), random(height)));
            } else {
                armyArray.push(new Archer(random(width), random(height)));
            }
        }

        return armyArray;
    }

    drawArmy() {
        let armyArray = this.army;
        for (let i=0; i<armyArray.length; i++) {
            armyArray[i].drawTroop(color(255,0,0));
        }
    }

    show(){
        this.drawArmy();
    }

    init(){
        this.army = this.addArmy();
    }
}