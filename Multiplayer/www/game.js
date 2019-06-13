
function setup() {
    noLoop();
    console.log("here");


}
let player1;
let player2;
let game_started = false;
function draw_please(id1,id2,name1,name2,troops,color1,color2,meleeX1,meleeY1,archerX1,archerY1,meleeX2,meleeY2,archerX2,archerY2) {
    console.log("first");
    createCanvas(1000, 700);
    player1 = new Player(id1,color1);
    player2 = new Player(id2,color2);
    background(0);
    translate(window.innerWidth/2-player1.position.x, window.innerHeight/2-player1.position.y);
    army1 = player1.createArmy(meleeX1,meleeY1,archerX1,archerY1);
    army2 = player1.createArmy(meleeX2,meleeY2,archerX2,archerY2);
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
            if(player1.army.length === 0) {
                window.alert(player2.name + " has won!");
                game_started=false;
            }
            if(player2.army.length === 0){
                window.alert(player1.name+" has won!");
                game_started=false;
            }

        }



}

window.onload = function() {
    var game = new Game();
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
        this.socket.on('system', function(nickName, userCount, type) {
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
        document.getElementById('game_btn').addEventListener('click', function() {
            console.log("game started");
            that.socket.emit('start_game');
        }, false);
        that.socket.on('draw_game', function (id1,id2,name1,name2,troops,color1,color2,meleeX1,meleeY1,archerX1,archerY1,meleeX2,meleeY2,archerX2,archerY2/*id1,numtroops1,army1, color1,enemies1,id2,numtroops2,army2, color2,enemies2*/) {
            console.log("drawing started");
            draw_please(id1,id2,name1,name2,troops,color1,color2,meleeX1,meleeY1,archerX1,archerY1,meleeX2,meleeY2,archerX2,archerY2);

        });
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
