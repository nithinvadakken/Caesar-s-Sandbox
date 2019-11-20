//Player Class (should come in handy later for online play)
// Troop class
Bullets = [];
let Bullet_id =0;
    class Bullet {
        constructor(x, y, Ex, Ey, spd, index, len,enemy_id,troop_id,player) {
            this.troop_id = troop_id;
            this.enemy_id = enemy_id;
            this.x = x;
            this.y = y;
            this.Ey = Ey;
            this.Ex = Ex;
            let temp2 = this.Ey - this.y;
            let temp3 = this.Ex - this.x;
            this.endx = len/(Math.pow(Math.pow(temp2,2)+Math.pow(temp3,2),.5))*temp3+x;
            this.endy = len/(Math.pow(Math.pow(temp2,2)+Math.pow(temp3,2),.5))*temp2+y;
            //console.log(this.endx,this.endy);
            this.spd = spd;
            this.index = index;// to know who shot
            //console.log("aha"+Bullet_id);
            this.bullet_id = Bullet_id;//for bullets
            //console.log(this.bullet_id);
            Bullet_id +=1;
            this.index1 = Bullets.length;
            this.len = len;
            this.player = player;

        }

        play() {//TODO make bullet follow enemy
            //console.log(this.x, this.y,this.Ex,this.Ey,this.id);
            let that = this;
           // console.log("????"+that.id+"  "+(that.Ey - that.y));
            var a = setInterval(function () {

                if ((that.Ex - that.x) < 1 && (that.Ex - that.x) > -1 && (that.Ey - that.y) < 1 && (that.Ey - that.y) > -1) {
                    console.log("HIT! id:" + that.bullet_id);
                    //console.table(Bullets);
                    that.player.damage(that.troop_id,that.enemy_id);
                    //console.log("hp"+that.enemy);
                    //console.log(that.bullet_id);
                    for(let i =0; i< Bullets.length;i++){
                        if(Bullets[i].bullet_id === that.bullet_id) {
                            Bullets.splice(i, 1);
                            //console.log("del")
                        }
                    }
                    //console.table(Bullets);
                    clearInterval(a);
                }
                else {
                    let temp2 = that.Ey - that.y;
                    let temp3 = that.Ex - that.x;
                   // console.log(temp2,temp3);
                    //console.log("???"+Math.sqrt((that.Ex - that.x)^2+(Math.abs(temp2 - temp))^2));

                    that.y += that.spd * temp2 / (Math.pow(Math.pow(temp2,2)+Math.pow(temp3,2),.5));
                    that.endy += that.spd * temp2 / (Math.pow(Math.pow(temp2,2)+Math.pow(temp3,2),.5));
                    // console.log(that.spd * (that.Ey - that.y) / (that.Ex - that.x));
                   // console.log("really"+that.id+"  "+(that.Ey - that.y));
                    that.x += that.spd * temp3 / (Math.pow(Math.pow(temp2,2)+Math.pow(temp3,2),.5));
                    that.endx+= that.spd * temp3 / (Math.pow(Math.pow(temp2,2)+Math.pow(temp3,2),.5));
                    //console.log("("+that.x+","+that.y+")");


                }
             }, 60);
            // setInterval(function () {
            //     console.log(that.id + " HELLELELE"+that.x)
            // },500)
        }

        change_e(Ex,Ey){
            this.Ex = Ex;
            this.Ey = Ey;

            let temp2 = this.Ey - this.y;
            let temp3 = this.Ex - this.x;
            this.endx = len/(Math.pow(Math.pow(temp2,2)+Math.pow(temp3,2),.5))*temp3+x;
            this.endy = len/(Math.pow(Math.pow(temp2,2)+Math.pow(temp3,2),.5))*temp2+y;
        }

    }


    class GameTroopServer {//TODO make the drawing start for the middle not the edges!!!

        constructor(x, y, health, dmg, range, speed, size, name, att_spd, time,index,id,player) {
            this.speed_multi = 10;
            this.x = x;
            this.y = y;
            this.health = health;
            this.range = range;
            this.dmg = dmg;
            this.size = size;
            this.speed = speed * 100;
            //console.log(this.speed);
            this.name = name;
            this.att_spd = att_spd;
            this.saved_time = time;
            this.killCount = 0;
            this.level = 1;
            this.attack_linex = [];
            this.attack_liney = [];
            this.attack_lineEx = [];
            this.attack_lineEy = [];
            this.temp = false;
            this.index = index;
            this.id = id;
            this.player = player;
        }

        getDistanceToTarget(tx, ty, temp) {
            if(temp ===0)
            return Math.sqrt(Math.pow(this.x - tx, 2) + Math.pow(this.y - ty, 2));
            else
                return Math.sqrt(Math.pow(this.x - tx+20, 2) + Math.pow(this.y - ty+20, 2));
        }

//     attack (enemy) {
//         enemy.health -= this.dmg + this.dmg*(this.level/2);
//         if (enemy.health <= 0) {
//             this.killCount+=1;
//             if (this.killCount >= this.level*2  ) {
//                 this.killCount = 0;
//                 this.level += 1;
//                 this.size += 5;
//             }
//         }
//         setTimeout(function(){}, 300000);
//     }
//
//     movement_heuristic(enemies, allies) {
//         let terror = 0;
//
//         if (enemies.length < 10 && allies.length < 10) {
//             return false;
//         }
//
//         for (let i=0; i<enemies.length; i++) {
//             if (this.getDistanceToTarget(enemies[i].x, enemies[i].y) < 100) {//
//                 if (this.name === "Melee" && enemies[i].name==="Archer") {
//                     terror += 2*enemies[i].level;
//                 } else if (this.name === "Archer" && enemies[i].name==="Tank") {
//                     terror += 1*enemies[i].level;
//                 } else if (this.name === "Melee" && enemies[i].name==="Tank") {
//                     terror += 0.5*enemies[i].level;
//                 }
//             }
//         }
//
//         for (let i=0; i<allies.length; i++) {
//             if (this.getDistanceToTarget(allies[i].x, allies[i].y) < 100) {
//                 if (this.name === "Melee" && allies[i].name==="Archer") {
//                     terror -= 0.5*allies[i].level;
//                 } else if (this.name === "Archer" && allies[i].name==="Tank") {
//                     terror -= 1*allies[i].level;
//                 } else if (this.name === "Melee" && allies[i].name==="Tank") {
//                     terror -= 2*allies[i].level;
//                 }
//             }
//         }
//
//         terror -= this.level;
//
//         if (terror <= 0) {
//             return false;
//         } else {
//             return true;
//         }
//     }
//
//     autoMove(enemies, allies) {
//         let ex = 1000000;
//         let ey = 1000000;
//
//         for (let i=0; i<enemies.length; i++) {
//
//             let terror = this.movement_heuristic(enemies, allies);
//
//             if (this.getDistanceToTarget(enemies[i].x, enemies[i].y) < this.range) {
//                 this.attack(enemies[i]);
//                 break;
//             } else if (this.getDistanceToTarget(enemies[i].x, enemies[i].y) < this.getDistanceToTarget(ex, ey)) {
//                 ex =  enemies[i].x;
//                 ey = enemies[i].y;
//                 let canMove = 0;
//                 if (!this.checkBounds(ex, ey)) {
//                     canMove = true;
//                 }
//                 if (canMove) {
//                     this.targetMove(ex, ey, terror);
//                 }
//             }
//         }
//     }
//
//     targetMove(tx, ty, terror) {
//         let xspeed = (tx - this.x)/this.speed;
//         let yspeed = (ty - this.y)/this.speed;
//
//         if (terror) {
//             xspeed = (this.x - tx)/this.speed;
//             yspeed = (this.y - ty)/this.speed;
//         }
//
//         if (this.x + xspeed < 0) {
//             this.x = 0;
//         // } else if (this.x + xspeed > window.innerWidth) {
//         //     this.x = window.innerWidth;
//         } else {
//             this.x += xspeed;
//         }
//
//         if (this.y + yspeed < 0) {
//             this.y = 0;
//         // } else if (this.y + yspeed > window.innerHeight) {
//         //     this.y = window.innerHeight;
//         } else {
//             this.y += yspeed;
//         }
//     }
// }



        static damage (attacker,attacked,index,player){
            PLAYER.army[0].x +=100;
            console.log("id: "+ index);
        //     console.log("****")
        // console.table(Player1_army);
        // console.table(Player2_army);

        let troop;
           // if(index ===0) {
                for (let i = 0; i < player.army.length; i++) {//TODO find attacker
                    if (player.army[i].id === attacker) {
                        troop = i;
                    }
                }
                //GameTroopServer.table(troop);
                for (let i = 0; i < player.enemies.length; i++) {
                    if (player.enemies[i].id === attacked) {
                        console.log("Bhp" + player.enemies[i].health+"  index:"+index);
                        player.enemies[i].health -= player.army[i].dmg / 2 + player.army[i].dmg * (player.army[i].level / 2 );
                        if (player.enemies[i].health <= 0) {
                            player.army[i].killCount += 1;
                            if (player.army[i].killCount >= player.army[i].level * 2) {
                                player.army[i].killCount = 0;
                                player.army[i].level += 1;
                                player.army[i].size *= 1.25;
                                player.army[i].health += 50;
                            }
                        }
                        console.log("Ahp" + player.enemies[i].health);
                    }
                }
           /* }
            if(index ===1) {
                for (let i = 0; i < Player2_army.length; i++) {//TODO find attacker
                    if (Player2_army[i].id === attacker) {
                        troop = Player2_army[i];
                    }
                }
                //GameTroopServer.table(troop);
                for (let i = 0; i < Player1_army.length; i++) {
                    if (Player1_army[i].id === attacked) {
                        console.log("Bhp" + Player1_army[i].health+"  index:"+index);
                        Player1_army[i].health -= troop.dmg / 2 + troop.dmg * (troop.level / 2 );
                        if (Player1_army[i].health <= 0) {
                            troop.killCount += 1;
                            if (troop.killCount >= troop.level * 2) {
                                troop.killCount = 0;
                                troop.level += 1;
                                troop.size *= 1.25;
                                troop.health += 50;
                            }
                        }
                        console.log("Ahp" + Player1_army[i].health);
                    }
                }
            }*/
    }


        attack(enemy) {
            let current_time = new Date();
            //console.log("IMPORTANT!!!!!!!!!!!!!!!!!!!!!!!!"+this.saved_time);
            //console.log("saved ="+this.saved_time.getTime() +"curr = "+current_time.getTime()+"\ndiff="+(this.saved_time.getTime()-current_time.getTime()))
            if (current_time.getTime() - this.saved_time > this.att_spd * 1000) {
                console.log("attacked");
                // enemy.health -= this.dmg /2 + this.dmg * (this.level / 2 );
                // if (enemy.health <= 0) {
                //     this.killCount += 1;
                //     if (this.killCount >= this.level * 2) {
                //         this.killCount = 0;
                //         this.level += 1;
                //         this.size *= 1.25;
                //         this.health += 50;
                //     }
                // }
                // line(this.x, this.y, enemy.x, enemy.y);
                //console.log("setting line val: "+this.attack_linex);
                // this.attack_linex = (this.x);
                // this.attack_liney = (this.y);
                // this.attack_lineEx = (enemy.x);
                // this.attack_lineEy = (enemy.y);
                //console.log(this.x, this.y, enemy.x, enemy.y);
                if(this.name === "Tank" && enemy.name === "Tank"){
                //x, y, Ex, Ey, spd, index, len,enemy,troop
                    var temp = new Bullet(this.x+20, this.y+20, enemy.x+20, enemy.y+20, 1,this.index,5,enemy.id,this.id,this.player);}
                else if(this.name === "Tank")
                    var temp = new Bullet(this.x+20, this.y+20, enemy.x, enemy.y, 1,this.index,5,enemy.id,this.id,this.player );
                else
                    var temp = new Bullet(this.x, this.y, enemy.x, enemy.y, 1,this.index,5,enemy.id,this.id, this.player);
                Bullets.push(temp);
                //console.log("HERE"+Bullets);
                temp.play();
                this.d = new Date();
                this.saved_time = this.d.getTime();
            }
            //setTimeout(function(){}, 3000);

        }

        movement_heuristic(enemies, allies) {

            let terror = 0;

            if (enemies.length < 10 && allies.length < 10) {
                return false;
            }

            for (let i = 0; i < enemies.length; i++) {
                if (this.getDistanceToTarget(enemies[i].x, enemies[i].y,0) < 100) {
                    if (this.name === "Melee" && enemies[i].name === "Archer") {

                        terror += 3;

                    } else if (this.name === "Archer" && enemies[i].name === "Tank") {

                        terror += 2;

                    } else if (this.name === "Melee" && enemies[i].name === "Tank") {

                        terror += 1.5;

                    }

                }

            }


            for (let i = 0; i < allies.length; i++) {

                if (this.getDistanceToTarget(allies[i].x, allies[i].y,0) < 100) {

                    if (this.name === "Melee" && allies[i].name === "Archer") {

                        terror -= 1.5;

                    } else if (this.name === "Archer" && allies[i].name === "Tank") {

                        terror -= 2;

                    } else if (this.name === "Melee" && allies[i].name === "Tank") {

                        terror -= 3;

                    }

                }

            }


            if (terror <= 5) {

                return false;

            } else {

                return true;

            }

        }


        autoMove(enemies, allies) {

            let ex = 1000000;
            let ey = 1000000;
            let terror = 0;

            let attacked = 0;
            for (let i = 0; i < enemies.length; i++) {
                let terror = this.movement_heuristic(enemies, allies);
                if (this.name === "Tank") {
                    if (this.getDistanceToTarget(enemies[i].x+20, enemies[i].y+20, 1) < this.range && attacked === 0) {//TODO attacks all enemies onstead of 1
                        this.attack(enemies[i]);
                        attacked = 1;
                        break;
                    }
                    else if (attacked === 0 && this.getDistanceToTarget(enemies[i].x, enemies[i].y,1) < this.getDistanceToTarget(ex, ey,1)) {
                        ex = enemies[i].x;
                        ey = enemies[i].y;
                        this.targetMove(ex, ey, terror);
                    }
                }
                else {
                    if (this.getDistanceToTarget(enemies[i].x, enemies[i].y,0) < this.range && attacked === 0) {//TODO attacks all enemies onstead of 1
                        this.attack(enemies[i]);
                        attacked = 1;
                        break;
                    }
                    else if (attacked === 0 && this.getDistanceToTarget(enemies[i].x, enemies[i].y,0) < this.getDistanceToTarget(ex, ey,0)) {
                        ex = enemies[i].x;
                        ey = enemies[i].y;
                        this.targetMove(ex, ey, terror);
                    }

                }
            }

        }


        targetMove(tx, ty, terror) {

            let xspeed = (tx - this.x) / this.speed;
            let yspeed = (ty - this.y) / this.speed;


            if (terror) {
                xspeed = (this.x - tx) / this.speed;
                yspeed = (this.y - ty) / this.speed;

            }


            // if (this.x + xspeed < 0) {

            //     this.x = 0;

            //     // } else if (this.x + xspeed > window.innerWidth) {
            //     //
            //     //     this.x = window.innerWidth;
            //     //
            // } else {

            //     this.x += xspeed;

            // }
            this.x += xspeed*this.speed_multi;


            // if (this.y + yspeed < 0) {

            //     this.y = 0;

            //     //} else if (this.pos.y + yspeed > window.innerHeight) {
            //     //
            //     //    this.pos.y = window.innerHeight;

            // } else {

            //     this.y += yspeed;

            // }
            this.y += yspeed*this.speed_multi;

        }
    }
let temp321 = false;

function write(x){
    setInterval(function () {
        x.army[0].x +=1;
    },1000/2)
}

//Melee Class
    class MeleeSoldierServer extends GameTroopServer {

        constructor(x, y, name, time, hp = MELEEHP,index,id,player) {
            //x, y, health, dmg, range, speed, size, name, att_spd
            super(x, y, hp, 75, 30, 10, 7, "Melee", 1.5, time,index,id,player);
        }

        checkBounds(tx, ty) {
            if (this.getDistanceToTarget(tx, ty,0) <= this.size / 2) {
                return true;
            }
            return false;
        }

    }
    TANKHP = 600;
    MELEEHP = 300;
    ARCHERHP = 200;

// Archer (ranger) Class

    class ArcherServer extends GameTroopServer {

        constructor(x, y, name, time, hp = ARCHERHP,index,id,player) {
            //x, y, health, dmg, range, speed, size, name, att_spd
            super(x, y, hp, 50, 70, 30, 20, "Archer", 1.5, time,index,id,player);
        }

        checkBounds(tx, ty) {
            if (this.getDistanceToTarget(tx, ty,0) <= this.size / 2) {
                return true;
            }
            return false;
        }

    }

// Tank Class
    class TankServer extends GameTroopServer {

        constructor(x, y, name, time, hp = TANKHP,index, id,player) {
            //x, y, health, dmg, range, speed, size, name, acc
            super(x, y, hp, 150, 50, 50, 40, "Tank", 5, time,index,id,player);
        }

        checkBounds(tx, ty) {
            if (tx >= this.x || tx <= this.x + this.size) {
                return true;
            }
            if (ty >= this.y || ty <= this.y + this.size) {
                return true;
            }
            return false;
        }

    }
// let Player1_army = null;
// let Player2_army = null;
// setInterval(function () {
//     if(Player1_army !== null){
//         console.log(Player1_army[0].x);
//         Player1_army[0].x+=100;
//     }
//
// },1000/2);


    class PlayerServer {
        constructor(index, color) {//TODO recode entire code so i dont have to add this shit everytime ARRAYSSSSSSSSSSSSSSSSSS
            PLAYER = this;
            this.TANKHP = TANKHP;
            this.MELEEHP = MELEEHP;
            this.ARCHERHP = ARCHERHP;
            this.index = index;
            this.numTroops = 0;
            this.army = [];
            this.color = color;
            this.enemies = [];
            this.meleeX1 = [];
            this.meleeY1 = [];
            this.archerX1 = [];
            this.archerY1 = [];
            this.tankX1 = [];
            this.tankY1 = [];
            this.meleeX2 = [];
            this.meleeY2 = [];
            this.archerX2 = [];
            this.archerY2 = [];
            this.tankX2 = [];
            this.tankY2 = [];
            this.meleehpE = [];
            this.archerhpE = [];
            this.tankhpE = [];
            this.attack_linex = [];
            this.attack_liney = [];
            this.attack_lineEx = [];
            this.attack_lineEy = [];
            this.meleeTime = [];
            this.archerTime = [];
            this.tankTime = [];
            this.bullets = [];
            this.meleeId = [];
            this.meleeIdE = [];
            this.archerId = [];
            this.archerIdE  = [];
            this.tankId = [];
            this.tankIdE = [];
        }

        damage(attacker,attacked){
            console.log("x1: "+ this.army[0].x);
            this.army[0].x +=100;
            console.log("x2: "+ this.army[0].x);
            //     console.log("****")
            // console.table(Player1_army);
            // console.table(Player2_army);

            let troop;
            let tname;
            // if(index ===0) {
            for (let i = 0; i < this.army.length; i++) {//TODO find attacker
                if (this.army[i].id === attacker) {

                    // for(let z = 0; z <GAMETROOPS.length; z++){
                    //     if(this.army[i].name ===GAMETROOPS[z] ){
                    //
                    //     }
                    // }

                    if(this.army[i].name ===("Melee") ){//TODO put everything in arrays for ez life(hierarchy )
                        tname = "Melee";
                        for (let i = 0; i < this.meleeX1.length; i++) {
                            if(this.meleeId[i].id === attacker){
                                troop = i;
                            }
                        }
                    }

                    if(this.army[i].name ===("Archer") ){//TODO put everything in arrays for ez life(hierarchy )
                        tname = "Archer";
                        for (let i = 0; i < this.archerX1.length; i++) {
                            if(this.archerId[i].id === attacker){
                                troop = i;
                            }
                        }
                    }

                    if(this.army[i].name ===("Tank") ){//TODO put everything in arrays for ez life(hierarchy )
                        tname = "Tank";
                        for (let i = 0; i < this.tankX1.length; i++) {
                            if(this.tankId[i].id === attacker){
                                troop = i;
                            }
                        }
                    }
                }
            }
            //GameTroopServer.table(troop);
            for (let i = 0; i < this.enemies.length; i++) {
                if (this.enemies[i].id === attacked) {
                    console.log("Bhp" + this.enemies[i].health);
                    if(this.enemies[i].name ===("Melee") ){//TODO put everything in arrays for ez life(hierarchy )\
                        let enemy = 0;
                        for (let i = 0; i < this.meleeX2.length; i++) {
                            if(this.meleeIdE[i] === attacker){
                                enemy = i;
                            }
                        }
                        this.meleehpE[enemy]-= this.army[i].dmg / 2 + this.army[i].dmg * (this.army[i].level / 2 );
                        if (this.meleehpE[enemy] <= 0) {
                            this.army[i].killCount += 1;//TODO nothing after works xd
                            if (this.army[i].killCount >= this.army[i].level * 2) {
                                this.army[i].killCount = 0;
                                this.army[i].level += 1;
                                this.army[i].size *= 1.25;
                                this.army[i].health += 50;
                            }
                        }
                    }
                    if(this.army[i].name ===("Archer") ){//TODO put everything in arrays for ez life(hierarchy )
                        let enemy = 0;
                        for (let i = 0; i < this.archerX2.length; i++) {
                            if(this.archerIdE[i] === attacker){
                                enemy = i;
                            }
                        }
                        this.archerhpE[enemy]-= this.army[i].dmg / 2 + this.army[i].dmg * (this.army[i].level / 2 );
                        if (this.archerhpE[enemy] <= 0) {
                            this.army[i].killCount += 1;//TODO nothing after works xd
                            if (this.army[i].killCount >= this.army[i].level * 2) {
                                this.army[i].killCount = 0;
                                this.army[i].level += 1;
                                this.army[i].size *= 1.25;
                                this.army[i].health += 50;
                            }
                        }
                    }
                    if(this.army[i].name ===("Tank") ){//TODO put everything in arrays for ez life(hierarchy )
                        let enemy = 0;
                        for (let i = 0; i < this.tankX2.length; i++) {
                            if(this.tankId[i] === attacker){
                                enemy = i;
                            }
                        }
                        this.tankhpE[enemy]-= this.army[i].dmg / 2 + this.army[i].dmg * (this.army[i].level / 2 );
                        if (this.tankhpE[enemy] <= 0) {
                            this.army[i].killCount += 1;//TODO nothing after works xd
                            if (this.army[i].killCount >= this.army[i].level * 2) {
                                this.army[i].killCount = 0;
                                this.army[i].level += 1;
                                this.army[i].size *= 1.25;
                                this.army[i].health += 50;
                            }
                        }
                    }
                    // this.enemies[i].health -= this.army[i].dmg / 2 + this.army[i].dmg * (this.army[i].level / 2 );
                    // if (this.enemies[i].health <= 0) {
                    //     this.army[i].killCount += 1;
                    //     if (this.army[i].killCount >= this.army[i].level * 2) {
                    //         this.army[i].killCount = 0;
                    //         this.army[i].level += 1;
                    //         this.army[i].size *= 1.25;
                    //         this.army[i].health += 50;
                    //     }
                    // }
                    console.log("Ahp" + this.enemies[i].health);
                }
            }
            /* }
             if(index ===1) {
             for (let i = 0; i < Player2_army.length; i++) {//TODO find attacker
             if (Player2_army[i].id === attacker) {
             troop = Player2_army[i];
             }
             }
             //GameTroopServer.table(troop);
             for (let i = 0; i < Player1_army.length; i++) {
             if (Player1_army[i].id === attacked) {
             console.log("Bhp" + Player1_army[i].health+"  index:"+index);
             Player1_army[i].health -= troop.dmg / 2 + troop.dmg * (troop.level / 2 );
             if (Player1_army[i].health <= 0) {
             troop.killCount += 1;
             if (troop.killCount >= troop.level * 2) {
             troop.killCount = 0;
             troop.level += 1;
             troop.size *= 1.25;
             troop.health += 50;
             }
             }
             console.log("Ahp" + Player1_army[i].health);
             }
             }
             }*/
        }

        update() {
            vx = this.x - mx;
            vy = this.y - my;
            this.x += vx;
            this.y += vy; //idk if this math is right
        }

        moveArmy() {
            // if(this.index === 0){
            //     Player1_army = this.army;
            // }
            // if(this.index === 1){
            //     Player2_army = this.army;
            // }
            for (let i = 0; i < this.army.length; i++) {
                if (this.army[i].health <= 0) {
                    this.army.splice(i, 1);
                    this.numTroops -= 1;
                }
            }

            for (let i = 0; i < this.army.length; i++) {
                this.army[i].autoMove(this.enemies, this.army);
            }

            for (let i = 0; i < this.army.length; i++) {
                this.army[i].autoMove(this.enemies, this.army);
                this.meleeX1 = [];
                this.meleeY1 = [];
                this.archerX1 = [];
                this.archerY1 = [];
                this.tankX1 = [];
                this.tankY1 = [];
                for (let x = 0; x < this.army.length; x++) {
                    if (this.army[x].name === ("Melee")) {
                        this.meleeX1.push(this.army[x].x);
                        this.meleeY1.push(this.army[x].y);
                        this.meleeTime.push(this.army[x].saved_time);
                        this.meleeId.push(this.army[x].id)
                    }
                    if (this.army[x].name === ("Tank")) {
                        this.tankX1.push(this.army[x].x);
                        this.tankY1.push(this.army[x].y);
                        this.tankTime.push(this.army[x].saved_time);
                        this.tankId.push(this.army[x].id)
                    }
                    if (this.army[x].name === ("Archer")) {
                        this.archerX1.push(this.army[x].x);
                        this.archerY1.push(this.army[x].y);
                        this.archerTime.push(this.army[x].saved_time);
                        this.archerId.push(this.army[x].id)
                    }

                }
                this.meleeX2 = [];
                this.meleeY2 = [];
                this.archerX2 = [];
                this.archerY2 = [];
                this.tankX2 = [];
                this.tankY2 = [];
                this.meleehpE = [];
                this.archerhpE = [];
                this.tankhpE = [];
                for (let x = 0; x < this.enemies.length; x++) {
                    if (this.enemies[x].name === ("Melee")) {
                        this.meleeX2.push(this.enemies[x].x);
                        this.meleeY2.push(this.enemies[x].y);
                        this.meleehpE.push(this.enemies[x].health);
                        this.meleeIdE.push(this.enemies[x].id)
                    }
                    if (this.enemies[x].name === ("Tank")) {
                        this.tankX2.push(this.enemies[x].x);
                        this.tankY2.push(this.enemies[x].y);
                        this.tankhpE.push(this.enemies[x].health);
                        this.tankIdE.push(this.enemies[x].id)
                    }
                    if (this.enemies[x].name === ("Archer")) {
                        this.archerX2.push(this.enemies[x].x);
                        this.archerY2.push(this.enemies[x].y);
                        this.archerhpE.push(this.enemies[x].health);
                        this.archerIdE.push(this.enemies[x].id)
                    }

                }

            }
            //console.log(this.id+"   "+this.meleehpE.length);
            // for (let i = 0; i < this.army.length; i++) {
            //     //if (this.army[i].attack_linex !== undefined)
            //       //  console.log("player line array: " + this.army[i].attack_linex);
            //     this.attack_linex.push(this.army[i].attack_linex);
            //     this.attack_liney.push(this.army[i].attack_liney);
            //     this.attack_lineEx.push(this.army[i].attack_lineEx);
            //     this.attack_lineEy.push(this.army[i].attack_lineEy);
            // }
            this.attack_linex = [];
            this.attack_liney = [];
            this.attack_lineEx = [];
            this.attack_lineEy = [];

            for (let i = 0; i < Bullets.length; i++) {
                // console.log("*****");
                // console.log(Bullets.length);
                // console.log(this.attack_linex);
                //console.table(Bullets);

                if(this.index === Bullets[i].index) {
                    this.attack_linex.push(Bullets[i].x);
                    this.attack_liney.push(Bullets[i].y);
                    this.attack_lineEx.push(Bullets[i].endx);
                    this.attack_lineEy.push(Bullets[i].endy);
                }
            }
        }

        createArmy(meleeX2, meleeY2, archerX2, archerY2, tankX2, tankY2, meleeTime, archerTime, tankTime, meleehp1, archerhp1, tankhp1,index,meleeId,archerId,tankId, player) {
            let temp = [];
            for (let i = 0; i < meleeX2.length; i++) {
                temp.push(new MeleeSoldierServer(meleeX2[i], meleeY2[i], i, meleeTime[i], meleehp1[i],index,meleeId[i],player));

            }
            for (let i = 0; i < archerX2.length; i++) {
                temp.push(new ArcherServer(archerX2[i], archerY2[i], i, archerTime[i], archerhp1[i],index,archerId[i],player));
            }
            for (let i = 0; i < tankX2.length; i++) {

                temp.push(new TankServer(tankX2[i], tankY2[i], i, tankTime[i], tankhp1[i],index, tankId[i],player
                ));
            }
            return temp;
        }

        addArmyOnClick(x1, y1, id) {//id = index
            this.numTroops++;
            let armyArray = this.army;
            //armyArray.push(new Archer(space, random(height), this.id, this.color));
            if (id === 0) {
                armyArray.push(new MeleeSoldierServer(x1, y1, this.id, this.color));
            }
            else if (id === 1) {
                armyArray.push(new ArcherServer(x1, y1, this.id, this.color));
            }
            else if (id === 2) {
                armyArray.push(new TankServer(x1, y1, this.id, this.color));
            }
            //armyArray.push(new Archer(x1, y1, this.id, this.color));
            this.army = armyArray;
        }



        init(enemyTroopArr) {
            this.enemies = enemyTroopArr;
        }
    }

module.exports = PlayerServer;

