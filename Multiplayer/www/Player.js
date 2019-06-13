//Player Class (should come in handy later for online play)
class Player {

    constructor(id, color,name) {
        this.id = id;
        this.numTroops = 40;
        this.position = createVector(500/2, 700/2);
        this.color = color;
        this.enemies = [];
        this.name = name;
    }

    update(){
        let vel = createVector(mouseX,mouseY);
        vel.sub(this.position);
        this.position.add(vel);
    }

    moveArmy() {
        for (let i = this.numTroops - 1; i >= 0; i--) {
            if (this.army[i].health <= 0) {
                this.army.splice(i, 1);
                this.numTroops -= 1;
            }
        }

        for (let i=0; i<this.numTroops; i++) {
            this.army[i].autoMove(this.enemies, this.army);
        }
    }


    createArmy(meleeX, meleeY, archerX, archerY, tankX, tankY){
        let armyArray =[];
        for(let i = 0; i<meleeX.length; i++){
            armyArray.push(new MeleeSoldier(meleeX[i],meleeY[i],this.id,this.color));
        }
        for(let i = 0; i<archerX.length; i++){
            armyArray.push(new Archer(archerX[i],archerY[i],this.id,this.color));
        }
        for(let i = 0; i<tankX.length; i++){
            armyArray.push(new Tank(tankX[i],tankX[i],this.id,this.color));
        }
        return armyArray;

    }

    // addArmy() {
    //     //default number of rows and columns of troops

    //     let armyArray = [];
    //     let meleeX;
    //     let meleeY;

    //     let archerX;
    //     let archerY;

    //     let tankX;
    //     let tankY;

    //     for (let i=0; i<this.numTroops; i++) {
    //         let space = (this.id === 1)? random(width/2): random(width/2, random(width));
    //         if (i%2===0) {
    //             armyArray.push(new MeleeSoldier(space, random(height), this.id, this.color));
    //         } else {
    //             armyArray.push(new Archer(space, random(height), this.id, this.color));
    //         }
    //     }

    //     return armyArray;
    // }

    drawArmy() {
        let armyArray = this.army;
        for (let i=0; i<armyArray.length; i++) {
            armyArray[i].drawTroop(this.color);
        }
    }

    show(){
        this.drawArmy();
    }

    init(enemyTroopArr){
        this.enemies = enemyTroopArr;
    }

    clicked(){
        console.log("Object");
    }

}