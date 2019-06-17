//Player Class (should come in handy later for online play)
class Player {

    constructor(id, color) {
        this.id = id;
        this.numTroops = 0;
        this.army = [];
        this.position = createVector(window.innerWidth/2, window.innerHeight/2);
        this.color = color;
        this.enemies = [];
    }

    update(){
        let vel = createVector(mouseX,mouseY);
        vel.sub(this.position);
        this.position.add(vel);
    }

    moveArmy() {
        for(let i = 0; i < this.army.length; i++){
            if (this.army[i].health <= 0) {
                this.army.splice(i, 1);
                this.numTroops -= 1;
            }
        }

        for (let i=0; i<this.army.length; i++) {
            this.army[i].autoMove(this.enemies, this.army);
        }
    }

    addArmy() {
        //default number of rows and columns of troops

        let armyArray = [];
        let meleeX;
        let meleeY;

        let archerX;
        let archerY;

        for (let i=0; i<this.numTroops-4; i++) {
            if (i%2===0) {
                armyArray.push(new MeleeSoldier(random(width), random(height)));
            } else {
                armyArray.push(new Archer(random(width), random(height)));
            }
        }

        for (let i=0; i<4; i++) {
            armyArray.push(new Tank(random(width), random(height)));
        }

        return armyArray;
    }

    createArmy(meleeX2,meleeY2,archerX2,archerY2,tankX2,tankY2){
        let temp = [];
        for(let i = 0; i< meleeX2.length;i++){
            temp.push(new MeleeSoldier(meleeX2[i],meleeY2[i]));

        }
        for(let i = 0; i< archerX2.length;i++){
            temp.push(new Archer(archerX2[i],archerY2[i]));
            console.log("made archer x:"+archerX2+"  y:"+archerY2);
        }
        for(let i = 0; i< tankX2.length;i++){
            console.log(tankX2);
            temp.push(new Tank(tankX2[i],tankY2[i]));
        }
        return temp;
    }

    addArmyOnClick(x1,y1,id){
        this.numTroops++;
        let armyArray = this.army;
        let space = (this.id === 1)? random(width/2): random(width/2, random(width));
        //armyArray.push(new Archer(space, random(height), this.id, this.color));
        if (id === 0){
            armyArray.push(new MeleeSoldier(x1, y1, this.id, this.color));
        }
        else if (id === 1){
            armyArray.push(new Archer(x1, y1, this.id, this.color));
        }
        else if (id === 2){
            armyArray.push(new Tank(x1, y1, this.id, this.color));
        }
        //armyArray.push(new Archer(x1, y1, this.id, this.color));
        this.army = armyArray;
    }

    drawArmy() {
        let armyArray = this.army;
        for (let i=0; i<armyArray.length; i++) {
            armyArray[i].drawTroop(this.color);
            armyArray[i].drawHealth();
        }
    }

    show(){
        this.drawArmy();
    }

    init(enemyTroopArr){
        this.enemies = enemyTroopArr;
    }
}
