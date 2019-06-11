//Player Class (should come in handy later for online play)
class Player {

    constructor(id) {
        this.id = id;
        this.numTroops = 20;
        this.army = [];
        this.position = createVector(width/2, height/2);
    }

    update(){
        console.log(mouseX);
        let vel = createVector(mouseX,mouseY);
        vel.sub(this.position);
        vel.setMag(4);
        this.position.add(vel);
    }

    addArmy() {
        //default number of rows and columns of troops

        let armyArray = [];

        for (let i=0; i<this.numTroops; i++) {
            if (i%2===0) {
                armyArray.push(new MeleeSoldier());
            } else {
                armyArray.push(new Archer());

            }
        }

        return armyArray;
    }

    drawArmy() {
        let armyArray = this.army;
        for (let i=0; i<armyArray.length; i++) {
            armyArray[i].drawTroop();
        }
    }

    show(){
        this.drawArmy();
    }

    init(){
        this.army = this.addArmy();
    }
}