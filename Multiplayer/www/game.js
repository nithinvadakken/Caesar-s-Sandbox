let player;
function setup() {
    noLoop();
    console.log("here");
    player = new Player(0,'green');
}
const max = 20;
let current = 0;
army_edit =false;
meleeX = [];
meleeY = [];
archerX = [];
archerY = [];
tankX= [];
tankY= [];
let game_started = false;
let which_player;
let clear_btn;
let submit_btn;
let finished_army = false;
let indexhere;
let created_index = false;
function add_armies(x) {
    console.log(x);
    which_player =x;
    console.log("here1");
    army_edit = true;
    createCanvas(window.innerWidth,window.innerHeight-225);
    background(0);
    translate(window.innerWidth/2-player.position.x, window.innerHeight/2-player.position.y);

    clear_btn = document.createElement("BUTTON");
    clear_btn.innerHTML = "CLear";
    document.body.appendChild(clear_btn);
    clear_btn.addEventListener('click', function(){
        createCanvas(window.innerWidth,window.innerHeight-225);
        background(0);
        translate(window.innerWidth/2-player.position.x, window.innerHeight/2-player.position.y);
        document.body.appendChild(clear_btn);
        document.body.appendChild(submit_btn);
        player.army = [];
        current = 0;
        meleeX = [];
        meleeY = [];
        archerX = [];
        archerY = [];
        tankX= [];
        tankY= [];
    });
    submit_btn = document.createElement("BUTTON");
    submit_btn.innerHTML = "Submit";
    document.body.appendChild(submit_btn);
}
function keyPressed() {
    if(army_edit===true) {
        if (keyCode === 81) {
            console.log("mouse: "+mouseX +"  window: "+window.innerWidth+"  player:"+which_player);
            if(which_player ===0 && mouseX<window.innerWidth/2 && current<max) {
                player.addArmyOnClick(mouseX, mouseY, 0);
                meleeX.push(mouseX);
                meleeY.push(mouseY);
                player.drawArmy();
                console.log("melee");
                current++;
            }
            if(which_player ===1 && mouseX> window.innerWidth/2 && current<max) {
                player.addArmyOnClick(mouseX, mouseY, 0);
                meleeX.push(mouseX);
                meleeY.push(mouseY);
                player.drawArmy();
                console.log("melee");
                current++;
            }

        }
        else if (keyCode === 87) {
            if (which_player === 0 && mouseX < window.innerWidth / 2 && current<max) {
                player.addArmyOnClick(mouseX, mouseY, 1);
                archerX.push(mouseX);
                archerY.push(mouseY);
                player.drawArmy();
                console.log("archer");
                current++;
            }
            if (which_player === 1 && mouseX > window.innerWidth / 2 && current<max) {
                player.addArmyOnClick(mouseX, mouseY, 1);
                archerX.push(mouseX);
                archerY.push(mouseY);
                player.drawArmy();
                console.log("archer");
                current++;
            }

        }
        else if (keyCode === 69) {
            if (which_player === 0 && mouseX < window.innerWidth / 2 && current<max) {
                player.addArmyOnClick(mouseX, mouseY, 2);
                tankX.push(mouseX);
                tankY.push(mouseY);
                player.drawArmy();
                console.log("tank");
                current++;
            }
            if (which_player === 1 && mouseX > window.innerWidth / 2 && current<max) {
                player.addArmyOnClick(mouseX, mouseY, 2);
                tankX.push(mouseX);
                tankY.push(mouseY);
                player.drawArmy();
                console.log("tank");
                current++;
            }
        }
    }
}

let player1;
let player2;
let thisname;
function draw_please(id1,id2,name1,name2,troops,color1,color2,meleeX1,meleeY1,archerX1,archerY1,tankX1,tankY1,meleeX2,meleeY2,archerX2,archerY2,tankX2,tankY2) {
    console.log("tank "+tankX2);
    console.log("first");
    createCanvas(window.innerWidth,window.innerHeight-225);
    player1 = new Player(id1,color1);
    player2 = new Player(id2,color2);
    background(0);
    translate(window.innerWidth/2-player1.position.x, window.innerHeight/2-player1.position.y);
    army1 = player1.createArmy(meleeX1,meleeY1,archerX1,archerY1,tankX1,tankY1);
    army2 = player1.createArmy(meleeX2,meleeY2,archerX2,archerY2,tankX2,tankY2);
    console.log("army1 "+ army1);
    console.log("army2 "+army2);
    player1.name = name1;
    player2.name = name2;
    player1.numTroops = troops;
    player1.army = army1;
    player1.enemies = army2;
    player2.numTroops = troops;
    player2.army = army2;
    player2.enemies = army1;
    game_started = true;
    loop();
}

function draw() {
        if(game_started===true) {
            console.log("loop");
            background(0);
            translate(window.innerWidth / 2 - player1.position.x, window.innerHeight / 2 - player1.position.y);
            player1.show();
            player2.show();
            player1.update();
            player2.update();
            player1.moveArmy();
            player2.moveArmy();
            if( indexhere === 1&& player1.army.length === 0) {
                window.alert(player1.name + " has won!");
                game_started=false;
                console.log("p1: "+player1.name+" p2:"+player2.name+" this id "+indexhere);
            }
            if(indexhere === 0 && player1.army.length === 0) {
                window.alert(player2.name + " has won!");
                game_started=false;
                console.log("p1: "+player1.name+" p2:"+player2.name+" this id "+indexhere);
            }

            if(indexhere ===0 && player2.army.length === 0){
                window.alert(player2.name+" has won!");
                game_started=false;
                console.log("p1: "+player1.name+" p2:"+player2.name+" this id "+indexhere);
            }
            if(indexhere === 1&& player2.army.length === 0){
                window.alert(player1.name+" has won!");
                game_started=false;
                console.log("p1: "+player1.name+" p2:"+player2.name+" this id "+indexhere);
            }
            // if(player1.army.length ===0){
            //         window.alert(player2.name+" has won!");
            //         game_started=false;
            // }
            // if(player2.army.length ===0) {
            //         window.alert(player1.name+" has won!");
            //         game_started=false;
            // }

            }





}
var game;
window.onload = function() {
    game = new Game();
    game.init();
};
var Game = function() {
    this.socket = null;
};
Game.prototype = {
    server: 0,
    init: function() {
        var that = this;
        this.socket = io.connect();
        this.socket.on('connect', function() {

            document.getElementById('info').textContent = 'get yourself a nickname :)';
            document.getElementById('nickWrapper').style.display = 'block';
            document.getElementById('nicknameInput').focus();
        });
        this.socket.on('nickExisted', function() {
            document.getElementById('info').textContent = '!nickname is taken, choose another pls';
        });
        this.socket.on('loginSuccess', function(server) {
            this.server= server;
            document.title = 'Caesar\'s Sandbox | ' + document.getElementById('nicknameInput').value;
            document.getElementById('loginWrapper').style.display = 'none';
            document.getElementById('messageInput').focus();
            document.getElementById('server_name').textContent = "server: "+server;
        });
        this.socket.on('error', function(err) {
            if (document.getElementById('loginWrapper').style.display == 'none') {
                document.getElementById('status').textContent = '!fail to connect :(';
            } else {
                document.getElementById('info').textContent = '!fail to connect :(';
            }
        });
        this.socket.on('system', function(nickName, userCount, type, index) {
            thisname = nickName;
            if(created_index===false){
            indexhere = index;
            created_index =true;
                }
            console.log("index"+indexhere);
            var msg = nickName + (type == 'login' ? ' joined' : ' left');
            that._displayNewMsg('system ', msg, 'red');
            document.getElementById('status').textContent = userCount + (userCount > 1 ? ' users' : ' user') + ' in this room';
        });
        this.socket.on('newMsg', function(user, msg, color) {
            that._displayNewMsg(user, msg, color,this.server);
        });
        document.getElementById('loginBtn').addEventListener('click', function() {
            var nickName = document.getElementById('nicknameInput').value;
            server = document.getElementById('server_id').value;
            if (nickName.trim().length != 0) {
                that.socket.emit('login', nickName,server);
            } else {
                document.getElementById('nicknameInput').focus();
            };
        }, false);
        document.getElementById('nicknameInput').addEventListener('keyup', function(e) {
            if (e.keyCode == 13 && parseInt(server)>=0 && parseInt(server)<100) {
                var nickName = document.getElementById('nicknameInput').value;
                server = document.getElementById('server_id').value;
                if (nickName.trim().length != 0) {
                    that.socket.emit('login', nickName, server);
                };
            };
        }, false);

        document.getElementById('server_id').addEventListener('keyup', function(e) {
            if (e.keyCode == 13 && parseInt(server)>=0 && parseInt(server)<100) {
                var nickName = document.getElementById('nicknameInput').value;
                server = document.getElementById('server_id').value;
                if (nickName.trim().length != 0) {
                    that.socket.emit('login', nickName, server);
                };
            };
        }, false);

        document.getElementById('messageInput').addEventListener('keyup', function(e) {

            var messageInput = document.getElementById('messageInput'),
                msg = messageInput.value,
                color = 'blue';
            if (e.keyCode == 13 && msg.trim().length != 0) {
                messageInput.value = '';
                that.socket.emit('postMsg', msg, color,(that.socket.server));
                that._displayNewMsg('me', msg, color);
            };

        }, false);
        if(indexhere>1){
            var x = document.getElementById("game_btn");
            x.parentNode.removeChild(x);
        }
        else {
            document.getElementById('game_btn').addEventListener('click', function () {
                console.log("game started");
                that.socket.emit('start_game');
            }, false);
        }

        // that.socket.on('draw_game', function (id1,id2,name1,name2,troops,color1,color2,meleeX1,meleeY1,archerX1,archerY1,meleeX2,meleeY2,archerX2,archerY2/*id1,numtroops1,army1, color1,enemies1,id2,numtroops2,army2, color2,enemies2*/) {
        //     console.log("drawing started");
        //     var x = document.getElementById("messageInput");
        //     x.parentNode.removeChild(x);
        //     x = document.getElementById("game_btn");
        //     x.parentNode.removeChild(x);
        //     x = document.getElementById("historyMsg");
        //     x.parentNode.removeChild(x);
        //     draw_please(id1,id2,name1,name2,troops,color1,color2,meleeX1,meleeY1,archerX1,archerY1,meleeX2,meleeY2,archerX2,archerY2);
        //
        // });
        that.socket.on("make army", function (index) {

                console.log("make army "+index);
                var x = document.getElementById("messageInput");
                x.parentNode.removeChild(x);
                x = document.getElementById("game_btn");
                x.parentNode.removeChild(x);
                x = document.getElementById("historyMsg");
            x.parentNode.removeChild(x);
               add_armies(index);
                submit_btn.addEventListener('click',function () {
                clear_btn.parentNode.removeChild(clear_btn);
                submit_btn.parentNode.removeChild(submit_btn);
                finished_army = true;
                that.socket.emit("army_submitted",meleeX,meleeY,archerX,archerY,tankX,tankY);
                that.socket.on("enemy army", function ( id1,id2,name1,name2,meleeXE,meleeYE,archerXE,archerYE,tankXE,tankYE) {
                    console.log("enemy+army");
                    draw_please(id1,id2,name1,name2,max,'green','red',meleeX,meleeY,archerX,archerY,tankX,tankY,meleeXE,meleeYE,archerXE,archerYE,tankXE,tankYE);
                });
            });

        })
    },
    _displayNewMsg: function(user, msg, color) {

            var container = document.getElementById('historyMsg'),
                msgToDisplay = document.createElement('p'),
                date = new Date().toTimeString().substr(0, 8),
                //determine whether the msg contains emoji
                msg = (msg);
            msgToDisplay.style.color = color || '#000';
            msgToDisplay.innerHTML = user + '<span class="timespan">(' + date + '): </span>' + msg;
            container.appendChild(msgToDisplay);
            container.scrollTop = container.scrollHeight;
        }

};
