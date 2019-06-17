//Player Class (should come in handy later for online play)
class Player {

    constructor(id, color) {
        this.id = id;
        this.numTroops = 0;
        this.army = [];
        this.position = createVector(window.innerWidth/2, window.innerHeight/2);
        this.x = window.innerWidth/2;
        this.y = window.innerHeight/2;
        this.color = color;
        this.enemies = [];
    }

    update(){
        vx = this.x - mx;
        vy = this.y - my;
        this.x += vx;
        this.y += vy; //idk if this math is right
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

    init(enemyTroopArr){
        this.enemies = enemyTroopArr;
    }
}
