GAMETROOPNAMES = ["Melee", "Archer", "Tank"];
GAMETROOPDAMAGES = [75, 550, 150];
GAMETROOPHPS = [300, 200, 600];
GAMETROOPATTACKSPDS = [1, 1.5, 2];
GAMETROOPSPDS = [3, 2, 1];
GAMETROOPRANGE = [150, 75, 200];
GAMETROOPBULLETLEN = [5,3,7];
GAMETROOPBULLETSPD = [1,1.5,.5];
GAMETROOPBULLEWIDTH = [2,1,3];//TODO IMPLEMENT

//when u first create
PLAYERS = [];
var PLAYER = function () {
};
PLAYER.prototype = {
    id: -1,
    army: [],
    bullets: [],
    bullet_id: 0,
    init: function () {
        this.bullet_id = 0;
        this.army = [];
        for (let i = 0; i < GAMETROOPNAMES.length; i++) {
            var x = new GAMETROOP();
            x.init();
            x.name = GAMETROOPNAMES[i];
            // PLAYERS[this.id].army.push(x);
            this.army.push(x);
        }

    },
    addtroop: function (x, y, type) {
        this.army[type].addtroop(x, y, this.id);

    }
};


var GAMETROOP = function () {
};
GAMETROOP.prototype = {
    name: 0,
    xs: [],
    ys: [],
    dates: [],
    ids: [],
    id: 0,
    hps: [],
    player: 0,
    init: function () {
        this.xs = [];
        this.ys = [];
        this.dates = [];
        this.ids = [];
        this.hps = [];
    },
    addtroop: function (x, y, player) {
        this.player = player;
        this.xs.push(x);
        this.ys.push(y);

        this.ids.push(this.id);
        this.id++;
        this.dates.push(0);
        let temp = -1;
        for(let i = 0; i< GAMETROOPNAMES.length;i++){
            if(GAMETROOPNAMES[i] ===this.name)
                temp = i;
        }

        this.hps.push(GAMETROOPHPS[temp]);
    }
};


//army = GAMETROOPS[0],GAMETROOPS[1],...
//GAMETROOPS[0] = {
//     All troops of type GAMETROOP[0]
// };
//GAMETROOP[0] are done

var BULLET = function () {
};
BULLET.prototype = {
    p1: 0,
    t1: 0,
    i1: 0,
    p2: 0,
    t2: 0,
    i2: 0,
    x: 0,
    y: 0,
    Ex: 0,
    Ey: 0,//end enemy
    Ax: 0,//actual end of line(bullet)
    Ay: 0,
    spd: 0,
    id: 0,
    len: 0,
    init(p1,t1,i1,p2,t2,i2){
        this.p1 = p1;
        this.t1 = t1;
        this.i1 = i1;
        this.p2 = p2;
        this.t2 = t2;
        this.i2 = i2;
        this.len = GAMETROOPBULLETLEN[t1];
        this.spd = GAMETROOPBULLETSPD[t1];
        this.id = PLAYERS[p1].id;
        PLAYERS[p1].id ++;
        this.x = PLAYERS[p1].army[t1].xs[i1];
        this.y = PLAYERS[p1].army[t1].ys[i1];
        this.Ex  = PLAYERS[p2].army[t2].xs[i2];
        this.Ey  = PLAYERS[p2].army[t2].ys[i2];
        let temp2 = this.Ey - this.y;
        let temp3 = this.Ex - this.x;
        this.Ax = this.len/(Math.pow(Math.pow(temp2,2)+Math.pow(temp3,2),.5))*temp3+this.x;
        this.Ay = this.len/(Math.pow(Math.pow(temp2,2)+Math.pow(temp3,2),.5))*temp2+this.y;
    },
    move(){
        this.updatepos();
        //console.log("x: " +(this.Ex - this.Ax)+ " y:"+(this.Ey - this.Ay))
        if (Math.abs(this.Ex - this.Ax) < 1 && Math.abs(this.Ey - this.Ay) < 1) {
            console.log("hit");
            let temp = 0;
            for(let i = 0; i<PLAYERS[this.p1].bullets.length;i++ ){
                if(this.id === PLAYERS[this.p1].bullets[i].id){
                    PLAYERS[this.p1].bullets.splice(i,1);
                }
            }
            PLAYERS[this.p2].army[this.t2].hps[this.i2] -= GAMETROOPDAMAGES[this.t1];
        }
        else {
            //console.log(Math.abs(this.Ex - this.x) < 1 && Math.abs(this.Ey - this.y) < 1 );
            let temp2 = this.Ey - this.y;
            let temp3 = this.Ex - this.x;
              this.y += this.spd * temp2 / (Math.pow(Math.pow(temp2, 2) + Math.pow(temp3, 2), .5));
            //console.log(that.spd * temp2 / (Math.pow(Math.pow(temp2, 2) + Math.pow(temp3, 2), .5)))
            this.Ay += this.spd * temp2 / (Math.pow(Math.pow(temp2, 2) + Math.pow(temp3, 2), .5));
            // console.log(that.spd * (that.Ey - that.y) / (that.Ex - that.x));
            // console.log("really"+that.id+"  "+(that.Ey - that.y));
            this.x += this.spd * temp3 / (Math.pow(Math.pow(temp2, 2) + Math.pow(temp3, 2), .5));
            this.Ax+= this.spd * temp3 / (Math.pow(Math.pow(temp2, 2) + Math.pow(temp3, 2), .5));
        }
    },
    updatepos(){
        this.Ex  = PLAYERS[this.p2].army[this.t2].xs[this.i2];
        this.Ey  = PLAYERS[this.p2].army[this.t2].ys[this.i2];
        let temp2 = this.Ey - this.y;
        let temp3 = this.Ex - this.x;
        this.Ax = this.len/(Math.pow(Math.pow(temp2,2)+Math.pow(temp3,2),.5))*temp3+this.x;
        this.Ay = this.len/(Math.pow(Math.pow(temp2,2)+Math.pow(temp3,2),.5))*temp2+this.y;
    }

};
GAMESTATE = 0;
class temp {
    constructor() {
        this.p1 = new PLAYER();
        this.p2 = new PLAYER();
        this.p1.id = 0;
        this.p2.id = 1;
        PLAYERS.push(this.p1);
        PLAYERS.push(this.p2);
        this.p1.init();
        this.p2.init();
        //
        // console.log(PLAYERS[0].id)
        // console.log(PLAYERS[1].id)

    }

    addtroop(x, y, type, player) {
        PLAYERS[player].addtroop(x, y, type);
    }

    moveArmies() {
        let enemy_killed;
        if(GAMESTATE !== -1)
            for (let i = 0; i < PLAYERS.length; i++) {
                for (let z = 0; z < PLAYERS[i].army.length; z++) {
                    for (let a = 0; a < PLAYERS[i].army[z].xs.length; a++) {
                        if(PLAYERS[i].army[a].hps[z]<0 )
                            this.delete(i,a,z)
                    }
                }
            }
        enemy_killed = true;
        for (let i = 0; i < PLAYERS.length; i++) {
            for (let z = 0; z < PLAYERS[i].army.length; z++) {
                if(PLAYERS[i].army[z].xs.length !== 0 && PLAYERS[i].army[z].xs.length !== undefined){
                    enemy_killed = false;
                }
            }
        }
        if(enemy_killed === false){
            for (let i = 0; i < PLAYERS.length; i++) {
                for (let z = 0; z < PLAYERS[i].army.length; z++) {
                    for (let a = 0; a < PLAYERS[i].army[z].xs.length; a++) {
                        this.getclosestE(i,z,a);
                    }
                }
            }
            for (let i = 0; i < PLAYERS[0].bullets.length; i++) {
                PLAYERS[0].bullets[i].move();
            }
            for (let i = 0; i < PLAYERS[1].bullets.length; i++) {
                PLAYERS[1].bullets[i].move();
            }
        }
        else{
            enemy_killed = true;
            GAMESTATE = -1;
        }
    }

    delete(player,troop, index){
        PLAYERS[player].army[troop].hps.splice(index,1);
        PLAYERS[player].army[troop].xs.splice(index,1);
        PLAYERS[player].army[troop].ys.splice(index,1);
        PLAYERS[player].army[troop].ids.splice(index,1);
        PLAYERS[player].army[troop].dates.splice(index,1);
    }
    //player,troop,index
    getclosestE(player, troop, index) {
        if(PLAYERS[player].army[troop].hps[index]<0 ){
            this.delete(player,troop,index)

        }
        else {
            let x = PLAYERS[player].army[troop].xs[index];
            let y = PLAYERS[player].army[troop].ys[index];

            let closest_enemyV = Number.MAX_VALUE;//value
            let closest_enemy = 0;//actual enemy

            for (let b = 0; b < PLAYERS.length; b++) {

                if (b != player) {
                    for (let c = 0; c < PLAYERS[b].army.length; c++) {
                        for (let d = 0; d < PLAYERS[b].army[c].xs.length; d++) {
                            if (closest_enemyV > getDistanceToTarget(x, y, PLAYERS[b].army[c].xs[d], PLAYERS[b].army[c].ys[d])) {
                                closest_enemyV = getDistanceToTarget(x, y, PLAYERS[b].army[c].xs[d], PLAYERS[b].army[c].ys[d]);
                                closest_enemy = [b, c, d];

                            }
                        }
                    }
                }
            }
            // console.log("****");
            // console.log(player);
            // console.log(closest_enemy);
            // console.log(closest_enemyV);
            if (closest_enemyV < GAMETROOPRANGE[index]) {
                this.attack(player, troop, index, closest_enemy[0], closest_enemy[1], closest_enemy[2]);
            }
            else {
                try {
                    let temp1 = GAMETROOPSPDS[troop] * (PLAYERS[player].army[troop].xs[index] - PLAYERS[closest_enemy[0]].army[closest_enemy[1]].xs[closest_enemy[2]]) / closest_enemyV;
                    PLAYERS[player].army[troop].xs[index] -= temp1;
                    let temp2 = GAMETROOPSPDS[troop] * (PLAYERS[player].army[troop].ys[index] - PLAYERS[closest_enemy[0]].army[closest_enemy[1]].ys[closest_enemy[2]]) / closest_enemyV;
                    PLAYERS[player].army[troop].ys[index] -= temp2;
                }
                catch (ex){

                }
            }
        }
    }
    //player,troop,index
    attack(player, troop, index,Eplayer,Etroop,Eindex){
        let d = new Date();
        if(PLAYERS[player].army[troop].dates[index] + GAMETROOPATTACKSPDS[troop]*1000<d.getTime()){
            //PLAYERS[Eplayer].army[Etroop].hps[Eindex] -=GAMETROOPDAMAGES[index]; <-in bullets
            PLAYERS[player].army[troop].dates[index] = d.getTime();
            let bullet = new BULLET();
            bullet.init(player, troop, index,Eplayer,Etroop,Eindex);
            PLAYERS[player].bullets.push(bullet);
            //create a bullet
            //TODO level here
        }
    }

}
function getDistanceToTarget(x, y, tx, ty) {
    return Math.sqrt(Math.pow(x - tx, 2) + Math.pow(y - ty, 2));

}
var z = new temp();
// z.addtroop(Math.floor(Math.random() * 1000), , 1, 1);
// z.addtroop(400, 300, 1, 0);
// z.addtroop(50, 120, 2, 1);
// z.addtroop(400, 300, 2, 0);
// z.addtroop(50, 230, 0, 1);
// z.addtroop(400, 520, 0, 0);
//z.addtroop(5, 12, 2, 0);
for(let a = 0; a<3;a++) {
    for (let i = 0; i < 3; i++) {
        z.addtroop(Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), i, 0)
        z.addtroop(Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), i, 1)

    }
}

console.log(PLAYERS[1].army[2].xs);
console.log(PLAYERS[1].army[2].ys);
console.log(PLAYERS[1].army[2].ids);
console.log(PLAYERS[0].army[2].xs);
console.log(PLAYERS[0].army[2].ys);
console.log(PLAYERS[0].army[2].ids);

/*
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.arc(100,100,10, 0, 2 * Math.PI);
ctx.stroke();
*/
var c = 0;
var ctx = 0;
let draw = setInterval(function () {
    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    for (let i = 0; i < PLAYERS.length; i++) {

        for (let z = 0; z < PLAYERS[i].army.length; z++) {
            for (let a = 0; a < PLAYERS[i].army[z].xs.length; a++) {
                ctx.beginPath();
                ctx.arc(PLAYERS[i].army[z].xs[a], PLAYERS[i].army[z].ys[a],10, 0, 2 * Math.PI);
                ctx.stroke();
            }
            for(let z =0; z<PLAYERS[i].bullets.length;z++){
                ctx.beginPath();
                ctx.moveTo(PLAYERS[i].bullets[z].x, PLAYERS[i].bullets[z].y);
                ctx.lineTo(PLAYERS[i].bullets[z].Ax, PLAYERS[i].bullets[z].Ay);
                ctx.stroke();
            }
        }
    }
},1000/60);

//line(PLAYERS[i].bullets[z].x,PLAYERS[i].bullets[z].y,PLAYERS[i].bullets[z].Ax,PLAYERS[i].bullets[z].Ay )
let update = setInterval(function () {
    if(GAMESTATE ===-1){
        clearInterval(update);
    }
    else
        z.moveArmies();
},1000/60);

let table= setInterval(function () {
    console.log("table")
    console.table(PLAYERS[0].army[2])
    console.table(PLAYERS[1].army[2])




},1000/2);





//ctx.clearRect(0, 0, canvas.width, canvas.height);