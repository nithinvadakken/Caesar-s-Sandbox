var c = 0;
var ctx = 0;
// var canvas = document.createElement('canvas');
// canvas.id = 'myCanvas';
// canvas.height =  window.innerHeight;
// canvas.width =  window.innerWidth;
// document.body.appendChild(canvas);
let player;

function setup() {
    noLoop();
    console.log("here");
    player = new temp();
    player.init();
}

let game_btn;
const max = 30;
let current = 0;
army_edit = false;
meleeX = [];
meleeY = [];
archerX = [];
archerY = [];
tankX = [];
tankY = [];
army = [];
let game_started = false;
let which_player;
let clear_btn;
let submit_btn;
let finished_army = false;
let indexhere;
let created_index = false;
let game_canceled = false;
let spec_mode = false;
let submited = false;
let stop_sim = false;
let custom_room_clicked = false;
let spec_btn_made = false;
let troopId = 0;
let meleeId = [];
let archerId = [];
let tankId = [];

function add_armies(x) {
    console.log(x);
    which_player = x;
    //console.log("here1");
    army_edit = true;

    clear_btn = document.createElement("BUTTON");
    clear_btn.innerHTML = "Clear";
    document.body.appendChild(clear_btn);
    clear_btn.addEventListener('click', function () {
        createCanvas(window.innerWidth, window.innerHeight);
        background(0);
        translate(window.innerWidth / 2 - player.position.x, window.innerHeight / 2 - player.position.y);
        document.body.appendChild(clear_btn);
        document.body.appendChild(submit_btn);
        current = 0;
        meleeX = [];
        meleeY = [];
        archerX = [];
        archerY = [];
        tankX = [];
        tankY = [];
        troopId = 0;
        archerId = [];
        meleeId  = [];
        tankId = [];
    });
    submit_btn = document.createElement("BUTTON");
    submit_btn.innerHTML = "Submit";
    document.body.appendChild(submit_btn);
}

function keyPressed() {
    if (army_edit === true) {
        player.draw(1);
        if (keyCode === 81) {
            console.log("mouse: " + mouseX + "  window: " + window.innerWidth + "  player:" + which_player);
            if (which_player === 0 && mouseX < window.innerWidth / 2 && current < max) {
                meleeX.push(mouseX);
                meleeY.push(mouseY);
                meleeId.push(troopId);
                troopId++;
                player.addtroop(mouseX,mouseY,0,0);
                console.log("melee");
                current++;
            }
            if (which_player === 1 && mouseX > window.innerWidth / 2 && current < max) {//TODO make a line so it splits screen
                meleeX.push(mouseX);
                meleeY.push(mouseY);
                meleeId.push(troopId);
                troopId++;
                player.addtroop(mouseX,mouseY,0,1);
                console.log("melee");
                current++;
            }

        } else if (keyCode === 87) {
            if (which_player === 0 && mouseX < window.innerWidth / 2 && current < max) {
                archerX.push(mouseX);
                archerY.push(mouseY);
                archerId.pop(troopId);
                troopId++;
                player.addtroop(mouseX,mouseY,1,0);
                console.log("archer");
                current++;
            }
            if (which_player === 1 && mouseX > window.innerWidth / 2 && current < max) {
                archerX.push(mouseX);
                archerY.push(mouseY);
                archerId.pop(troopId);
                troopId++;
                player.addtroop(mouseX,mouseY,1,1);
                console.log("archer");
                current++;
            }

        } else if (keyCode === 69) {
            if (which_player === 0 && mouseX < window.innerWidth / 2 && current < max) {
                tankX.push(mouseX);
                tankY.push(mouseY);
                tankId.push(troopId);
                troopId++;
                player.addtroop(mouseX,mouseY,2,0);
                console.log("tank");
                current++;
            }
            if (which_player === 1 && mouseX > window.innerWidth / 2 && current < max) {
                tankX.push(mouseX);
                tankY.push(mouseY);
                tankId.push(troopId);
                troopId++;
                player.addtroop(mouseX,mouseY,2,1);
                console.log("tank");
                current++;
            }
        }
    }
}

setInterval(function () {
    if(army_edit === 1) {
        c = document.getElementById("defaultCanvas0");
        ctx = c.getContext("2d");
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, c.width, c.height);
            for (let z = 0; z < PLAYERS[i].army.length; z++) {
                ctx.strokeStyle = '#ffffff'
                if (z === 0) {//TODO HERE
                    for (let a = 0; a < PLAYERS[i].army[z].xs.length; a++) {
                        ctx.beginPath();
                        let temp;
                        Game.socket.emit('colors');
                        temp = PLAYERS[i].color;
                        ctx.fillStyle = temp;
                        ctx.arc(PLAYERS[i].army[z].xs[a], PLAYERS[i].army[z].ys[a], 10, 0, 2 * Math.PI);
                        //ctx.strokeStyle = temp;
                        ctx.fill();
                        ctx.closePath();
                        ctx.stroke();
                    }
                }
                else if (z === 1) {
                    for (let a = 0; a < PLAYERS[i].army[z].xs.length; a++) {
                        let temp = PLAYERS[i].color;
                        ctx.beginPath();
                        ctx.fillStyle = temp;
                        ctx.moveTo(PLAYERS[i].army[z].xs[a], PLAYERS[i].army[z].ys[a] - 10);
                        ctx.lineTo(PLAYERS[i].army[z].xs[a] + 10, PLAYERS[i].army[z].ys[a] + 10);
                        ctx.lineTo(PLAYERS[i].army[z].xs[a] - 10, PLAYERS[i].army[z].ys[a] + 10);
                        // ctx.arc(PLAYERS[i].army[z].xs[a], PLAYERS[i].army[z].ys[a], 10, 0, 2 * Math.PI);
                        ctx.fill();
                        ctx.closePath();
                        ctx.stroke();
                        
                    }
                }
                else if (z === 2) {
                    for (let a = 0; a < PLAYERS[i].army[z].xs.length; a++) {
                        let temp = PLAYERS[i].color;
                        ctx.beginPath();
                        ctx.fillStyle = temp;
                        ctx.fillRect(PLAYERS[i].army[z].xs[a] - 10, PLAYERS[i].army[z].ys[a] - 10, 20, 20) ;
                        ctx.arc(PLAYERS[i].army[z].xs[a], PLAYERS[i].army[z].ys[a], 10, 0, 2 * Math.PI);
                        ctx.fill();
                        ctx.closePath();;
                        ctx.strokeStyle = '#000000'
                        ctx.strokeStyle = '#ffffff'
                        ctx.rect(PLAYERS[i].army[z].xs[a] - 10, PLAYERS[i].army[z].ys[a] - 10, 20, 20);

                        //
                        ctx.stroke();
                    }
                }
            }
        
    }
},1000/60);

function clear_canvas() {
    clear();
}

let thisname;

function draw_please(PLAYERS,BULLETS) {

    //console.log("tank " + tankX2);
   // console.log("first");
   //  var c = 0;
   //  var ctx = 0;
   //  var canvas = document.createElement('canvas');
   //  canvas.id = 'myCanvas';
   //  canvas.height =  window.innerHeight;
   //  canvas.width =  window.innerWidth;


    c = document.getElementById("defaultCanvas0");
    ctx = c.getContext("2d");
    ctx.fillStyle = '#000000'
    ctx.fillRect(0,0, c.width,c.height);
    for (let i = 0; i < PLAYERS.length; i++) {
        for (let z = 0; z < PLAYERS[i].army.length; z++) {
            ctx.strokeStyle = '#ffffff'
            if (z === 0) {//TODO HERE
                for (let a = 0; a < PLAYERS[i].army[z].xs.length; a++) {
                    let temp = PLAYERS[i].color;
                    ctx.beginPath();

                    ctx.fillStyle = temp;
                    ctx.arc(PLAYERS[i].army[z].xs[a], PLAYERS[i].army[z].ys[a], 10, 0, 2 * Math.PI);
                    //ctx.strokeStyle = temp;
                    ctx.fill();
                    ctx.closePath();
                    ctx.stroke();
                }
                if(BULLETS !== undefined) {
                    console.log("not undefined")
                    for (let z = 0; z < BULLETS.length; z++) {
                        ctx.beginPath();
                        ctx.strokeStyle = '#800080'
                        ctx.lineWidth = 5;
                        ctx.moveTo(BULLETS[z].x, BULLETS[z].y);
                        ctx.lineTo(BULLETS[z].Ax, BULLETS[z].Ay);
                        ctx.stroke();//TODO MAKE BULLETS KOOL
                    }
                }
                else{
                    console.log("undefined ")
                }
            }
            else if (z === 1) {
                for (let a = 0; a < PLAYERS[i].army[z].xs.length; a++) {
                    let temp = PLAYERS[i].color;
                    ctx.beginPath();
                    ctx.fillStyle = temp;
                    ctx.moveTo(PLAYERS[i].army[z].xs[a], PLAYERS[i].army[z].ys[a] - 10);
                    ctx.lineTo(PLAYERS[i].army[z].xs[a] + 10, PLAYERS[i].army[z].ys[a] + 10);
                    ctx.lineTo(PLAYERS[i].army[z].xs[a] - 10, PLAYERS[i].army[z].ys[a] + 10);
                    // ctx.arc(PLAYERS[i].army[z].xs[a], PLAYERS[i].army[z].ys[a], 10, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.closePath();
                    ctx.stroke();
                }
                if(BULLETS !== undefined) {
                    for (let z = 0; z < BULLETS.length; z++) {
                        ctx.beginPath();

                        ctx.strokeStyle = '#0000ff'
                        ctx.lineWidth = 5;
                        ctx.moveTo(BULLETS[z].x, BULLETS[z].y);
                        ctx.lineTo(BULLETS[z].Ax, BULLETS[z].Ay);
                        ctx.stroke();
                    }
                }
            }
            else if (z === 2) {
                for (let a = 0; a < PLAYERS[i].army[z].xs.length; a++) {
                    let temp = PLAYERS[i].color;
                    ctx.beginPath();
                    ctx.fillStyle = temp;
                    ctx.fillRect(PLAYERS[i].army[z].xs[a] - 10, PLAYERS[i].army[z].ys[a] - 10, 20, 20);
                    ctx.strokeStyle = '#000000'
                    ctx.strokeStyle = '#ffffff'
                    ctx.rect(PLAYERS[i].army[z].xs[a] - 10, PLAYERS[i].army[z].ys[a] - 10, 20, 20);

                    // ctx.arc(PLAYERS[i].army[z].xs[a], PLAYERS[i].army[z].ys[a], 10, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.closePath();
                    ctx.stroke();
                }
                if(BULLETS !== undefined) {
                    for (let z = 0; z < BULLETS.length; z++) {
                        ctx.beginPath();
                        ctx.strokeStyle = '#0000ff'
                        ctx.lineWidth = 5;
                        ctx.moveTo(BULLETS[z].x, BULLETS[z].y);
                        ctx.lineTo(BULLETS[z].Ax, BULLETS[z].Ay);
                        ctx.stroke();
                    }
                }
            }
            else {
                console.log("what")
            }
        }
    }
}

//
// function draw() {
//         if(game_started===true ) {
//             if((indexhere<2||spec_mode === true && stop_sim === false)) {
//                 console.log("loop");
//                 background(0);
//                 translate(window.innerWidth / 2 - player1.position.x, window.innerHeight / 2 - player1.position.y);
//                 player1.show();
//                 player2.show();
//                 player1.update();
//                 player2.update();
//                 player1.moveArmy();
//                 player2.moveArmy();
//                 if (indexhere === 1 && player1.army.length === 0) {
//                     window.alert(player1.name + " has won!");
//                     game_started = false;
//                     console.log("p1: " + player1.name + " p2:" + player2.name + " this id " + indexhere);
//                 }
//                 if (indexhere === 0 && player1.army.length === 0) {
//                     window.alert(player2.name + " has won!");
//                     game_started = false;
//                     console.log("p1: " + player1.name + " p2:" + player2.name + " this id " + indexhere);
//                 }
//
//                 if (indexhere === 0 && player2.army.length === 0) {
//                     window.alert(player1.name + " has won!");
//                     game_started = false;
//                     console.log("p1: " + player1.name + " p2:" + player2.name + " this id " + indexhere);
//                 }
//                 if (indexhere === 1 && player2.army.length === 0) {
//                     window.alert(player2.name + " has won!");
//                     game_started = false;
//                     console.log("p1: " + player1.name + " p2:" + player2.name + " this id " + indexhere);
//                 }
//             }
//             // if(player1.army.length ===0){
//             //         window.alert(player2.name+" has won!");
//             //         game_started=false;
//             // }
//             // if(player2.army.length ===0) {
//             //         window.alert(player1.name+" has won!");
//             //         game_started=false;
//             // }
//
//             }
//
//
//
//
//
// }
let server;
var game;
window.onload = function () {
    game = new Game();
    game.init();
};
var Game = function () {
    this.socket = null;
};
Game.prototype = {
    server: 0,
    init: function () {
        var that = this;
        this.socket = io.connect();
        this.socket.on('connect', function () {

            document.getElementById('info').textContent = 'give yourself a nickname :)';
            document.getElementById('nickWrapper').style.display = 'block';
            document.getElementById('nicknameInput').focus();
        });
        this.socket.on('loginSuccess', function (server, room) {
            console.log("loginSuc sever changed to " + server);
            this.server = server;
            this.room = room;
            document.title = 'Caesar\'s Sandbox | ' + document.getElementById('nicknameInput').value;
            document.getElementById('loginWrapper').style.display = 'none';
            document.getElementById('messageInput').focus();
            document.getElementById('server_name').textContent = "server: " + server;
        });
        this.socket.on('error', function (err) {
            if (document.getElementById('loginWrapper').style.display == 'none') {
                document.getElementById('status').textContent = '!fail to connect :(';
            } else {
                document.getElementById('info').textContent = '!fail to connect :(';
            }
        });
        this.socket.on('system', function (nickName, userCount, type, index, game_state, server1) {
            console.log("system server changed " + server);
            if (server1 !== undefined)
                server = server1;
            console.log("u: " + userCount);
            thisname = nickName;
            if (created_index === false) {
                indexhere = index;
                past_index = index;
                created_index = true;
            }
            if (game_state === 2) {
                if (indexhere > 1) {
                    console.log("where1");
                    if (spec_btn_made === false) {
                        spec_btn = document.createElement("BUTTON");
                        spec_btn.innerHTML = "Spectate";
                        document.body.appendChild(spec_btn);
                        spec_btn_made = true;
                    }
                    spec_btn.addEventListener('click', function () {

                        spec_mode = true;
                        spec_btn.parentNode.removeChild(spec_btn);
                        var x = document.getElementById("messageInput");
                        x.parentNode.removeChild(x);
                        x = document.getElementById("historyMsg");
                        x.parentNode.removeChild(x);
                        that.socket.emit("request_spec");
                        that.socket.on("replay", function (simulation) {
                            console.log(simulation.length);
                            draw_please(simulation[0], simulation[1], simulation[2], simulation[3], max, 'green', 'red', simulation[4], simulation[5], simulation[6], simulation[7], simulation[8], simulation[9], simulation[10], simulation[11], simulation[12], simulation[13], simulation[14], simulation[15]);
                        })
                    });
                }
            }

            console.log("index" + indexhere);
            var msg = nickName + (type == 'login' ? ' joined' : ' left');
            that._displayNewMsg('system ', msg, 'red');
            document.getElementById('status').textContent = userCount + (userCount > 1 ? ' users' : ' user') + ' in this room';
        });
        this.socket.on("new index ready", function () {
            that.socket.emit("request index");
        });
        this.socket.on("update_index", function (newindex, newlength) {
            console.log("update index");
            let past_index = indexhere;
            indexhere = newindex;
            console.log("old index: " + past_index + "  new index: " + indexhere + "  len:" + newlength);
            if (indexhere < 2 && past_index >= 2) {
                console.log("update index game btn");
                game_btn = document.createElement("BUTTON");
                game_btn.innerHTML = "Start Game";
                var x = document.getElementById("controls");
                x.appendChild(game_btn);
                game_btn.addEventListener('click', function () {
                    game_canceled = false;
                    console.log("game started");
                    that.socket.emit('start_game');
                }, false);
            }
            if (newlength < 2) {
                console.log("new length");
                game_btn.parentNode.removeChild(game_btn);
            }
        });
        this.socket.on("gamer_time", function () {
            console.log("the f" + indexhere);
            console.log("gamer time");
            if (indexhere < 2) {
                game_btn = document.createElement("BUTTON");
                game_btn.innerHTML = "Start Game";
                var x = document.getElementById("controls");
                x.appendChild(game_btn);
                game_btn.addEventListener('click', function () {
                    game_canceled = false;
                    console.log("game started");
                    that.socket.emit('start_game');
                }, false);
            }
        });
        this.socket.on('newMsg', function (user, msg, color) {
            console.log("IDFK");
            that._displayNewMsg(user, msg, color, this.server);
        });
        this.socket.on("start_spec", function () {
            if (indexhere > 1) {
                console.log("here?");
                if (spec_btn_made === false) {
                    spec_btn = document.createElement("BUTTON");
                    spec_btn.innerHTML = "Spectate";
                    document.body.appendChild(spec_btn);
                    spec_btn_made = true;
                }
                spec_btn.addEventListener('click', function () {
                    spec_mode = true;
                    spec_btn.parentNode.removeChild(spec_btn);
                    var x = document.getElementById("messageInput");
                    x.parentNode.removeChild(x);
                    x = document.getElementById("historyMsg");
                    x.parentNode.removeChild(x);
                    that.socket.emit("request_spec");
                    that.socket.on("replay", function (simulation) {
                        console.log(simulation.length);
                        draw_please(simulation[0], simulation[1], simulation[2], simulation[3], max, 'green', 'red', simulation[4], simulation[5], simulation[6], simulation[7], simulation[8], simulation[9], simulation[10], simulation[11], simulation[12], simulation[13], simulation[14], simulation[15]);
                    })
                });
            }
        });

        function return_to_chat_place(game_state) {
            var x = document.getElementById('controls');
            x.parentNode.removeChild(x);
            clear_canvas();
            document.getElementById('server_name').textContent = "server: " + server;
            var message_input = document.createElement("textarea");
            message_input.placeholder = "enter to send";
            message_input.id = "messageInput";
            var element = document.getElementById("controls");
            historyMsg = document.createElement("div");
            historyMsg.id = 'historyMsg';
            x = document.getElementById("wrapper");
            x.appendChild(historyMsg);
            var c = document.createElement("div");
            c.class = "controls";
            c.id = "controls";
            c.appendChild(message_input);
            var x = document.getElementById("wrapper");
            x.appendChild(c);
            document.getElementById('messageInput').focus();
            if (game_state === 1 && submited === false) {
                clear_btn.parentNode.removeChild(clear_btn);
                submit_btn.parentNode.removeChild(submit_btn);
            }
            submited = false;

        }

        this.socket.on("cancel_game", function (players_left, game_state) {
            if (indexhere < 2) {
                player.army = [];
                current = 0;
                meleeX = [];
                meleeY = [];
                archerX = [];
                archerY = [];
                tankX = [];
                tankY = [];
                army_edit = false;
                game_started = false;
                // var x = document.getElementById("messageInput");
                // x.parentNode.removeChild(x);
                // game_btn.parentNode.removeChild(game_btn);
                // x = document.getElementById("historyMsg");
                // x.parentNode.removeChild(x);
                return_to_chat_place(game_state);
                console.log("p left: " + players_left);
                if (players_left > 1) {
                    console.log("cancel game");
                    game_btn = document.createElement("BUTTON");
                    game_btn.innerHTML = "Start Game";
                    var x = document.getElementById("controls");
                    x.appendChild(game_btn);
                    game_btn.addEventListener('click', function () {
                        game_canceled = false;
                        console.log("game started");
                        that.socket.emit('start_game');
                    }, false);
                }
                document.getElementById('messageInput').addEventListener('keyup', function (e) {
                    var messageInput = document.getElementById('messageInput'),
                        msg = messageInput.value,
                        color = 'blue';
                    if (e.keyCode === 13 && msg.trim().length !== 0) {
                        messageInput.value = '';
                        that.socket.emit('postMsg', msg, color, (that.socket.server));
                        that._displayNewMsg('me', msg, color);
                    }
                    ;
                }, false);


                // var x = document.getElementById("messageInput");
                // x.parentNode.removeChild(x);
                //game_btn.parentNode.removeChild(game_btn);
                //x = document.getElementById("historyMsg");
            } else {
                console.log("nice");
                if (spec_mode === true) {
                    return_to_chat_place(-1);
                    console.log("spec mode");
                    spec_mode = false;
                    game_started = false;
                    //stop_sim=true;
                    clear_canvas();
                } else if (game_state === 2) {
                    spec_btn.parentNode.removeChild(spec_btn);
                }
                spec_btn_made = false;
            }


        });
        document.getElementById('random_room').addEventListener('click', function () {
            var nickName = document.getElementById('nicknameInput').value;
            if (nickName.trim().length != 0) {
                that.socket.emit('login', nickName, -2);
            } else {
                document.getElementById('nicknameInput').focus();
            }
            ;
        }, false);
        document.getElementById('create_custom_room').addEventListener('click', function () {
            var nickName = document.getElementById('nicknameInput').value;
            if (nickName.trim().length != 0) {
                that.socket.emit('login', nickName, -1);
            } else {
                document.getElementById('nicknameInput').focus();
            }
            ;
        }, false);
        document.getElementById('join_custom_room').addEventListener('click', function () {
            console.log("join cust room clicked");
            if (custom_room_clicked === false) {
                var nickName = document.getElementById('nicknameInput').value;
                var server_id = document.createElement('input');
                server_id.placeholder = "enter the server code";
                document.getElementById("nickWrapper").appendChild(server_id);
                custom_room_clicked = true;
            }
            server_id.addEventListener('keyup', function (e) {
                console.log("typed server id isNaN:" + isNaN(server_id.value) + " id:" + server_id.value);
                if (e.keyCode == 13 && !isNaN(server_id.value) && parseInt(server_id.value) >= 0) {
                    server = server_id.value;
                    if (nickName.trim().length != 0) {
                        console.log("what is going on");
                        that.socket.emit('login', nickName, server);
                    } else {
                        document.getElementById('nicknameInput').focus();
                    }
                    ;
                }
            });
        }, false);
        // document.getElementById('nicknameInput').addEventListener('keyup', function(e) {
        //     if (e.keyCode == 13 && parseInt(server)>=0 && parseInt(server)<100) {
        //         var nickName = document.getElementById('nicknameInput').value;
        //         server = document.getElementById('server_id').value;
        //         if (nickName.trim().length != 0) {
        //             that.socket.emit('login', nickName, server);
        //         };
        //     };
        // }, false);

        // document.getElementById('server_id').addEventListener('keyup', function(e) {
        //     if (e.keyCode == 13 && parseInt(server)>=0 && parseInt(server)<100) {
        //         var nickName = document.getElementById('nicknameInput').value;
        //         server = document.getElementById('server_id').value;
        //         if (nickName.trim().length != 0) {
        //             that.socket.emit('login', nickName, server);
        //         };
        //     };
        // }, false);

        document.getElementById('messageInput').addEventListener('keyup', function (e) {
            var messageInput = document.getElementById('messageInput'),
                msg = messageInput.value,
                color = 'blue';
            if (e.keyCode == 13 && msg.trim().length != 0) {
                messageInput.value = '';
                that.socket.emit('postMsg', msg, color, (that.socket.server));
                that._displayNewMsg('me', msg, color);
            }
            ;

        }, false);


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

            console.log("make army " + index);
            var x = document.getElementById("messageInput");
            x.parentNode.removeChild(x);
            game_btn.parentNode.removeChild(game_btn);
            x = document.getElementById("historyMsg");
            x.parentNode.removeChild(x);
            add_armies(index);
            submit_btn.addEventListener('click', function () {
                submited = true;
                clear_btn.parentNode.removeChild(clear_btn);
                submit_btn.parentNode.removeChild(submit_btn);
                finished_army = true;
                that.socket.emit("army_submitted", meleeX, meleeY, archerX, archerY, tankX, tankY, meleeId,archerId,tankId);
                // that.socket.on("enemy army", function ( id1,id2,name1,name2,meleeXE,meleeYE,archerXE,archerYE,tankXE,tankYE) {
                //     console.log("enemy+army");
                //     draw_please(id1,id2,name1,name2,max,'green','red',meleeX,meleeY,archerX,archerY,tankX,tankY,meleeXE,meleeYE,archerXE,archerYE,tankXE,tankYE);
                // });
            });

        });
        that.socket.on("request max", function(){
            that.socket.emit("max", max);
        });
        that.socket.on("game_ready", function (index) {
           // console.log("start1")
            let keep_drawing = true;
            if (index < 2) {
                player.reset();
                army_edit = false;
                //console.log("start2")
                draw_loop();
                function draw_loop() {
                    that.socket.emit("request_update");
                    //console.log("start3")
                    //x,y,type,Ex,Ey,Etype,bullet
                    that.socket.on("updated_draw", function (players,bullets) {
                        //console.log(linex1+" "+liney1+" "+lineEx1+" "+lineEy1);
                        draw_please(players,bullets);
                        if(keep_drawing===true){
                            let a = requestAnimationFrame(draw_loop());
                            console.log(a);
                            // requestAnimFrame(() => { draw_loop(); });
                        }
                    });
                    that.socket.on("game_ended", function () {
                        keep_drawing = false;
                    })
                }
            } else {
                //TODO spec_btn
            }
        });

    }
    ,
    _displayNewMsg: function (user, msg, color) {
        console.log("ahaha");
        var container = document.getElementById('historyMsg'),
            msgToDisplay = document.createElement('p'),
            date = new Date().toTimeString().substr(0, 8);
        msgToDisplay.style.color = color || '#000';
        msgToDisplay.innerHTML = user + '<span class="timespan">(' + date + '): </span>' + msg;
        container.appendChild(msgToDisplay);
        container.scrollTop = container.scrollHeight;
    }

};
