var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    users = [];
users_id = [];
//specify the html we will use
app.use('/', express.static(__dirname + '/www'));
//bind the server to the 80 port
server.listen(/*process.env.PORT*/3000);//publish to heroku
//server.listen(process.env.OPENSHIFT_NODEJS_PORT || 3000);//publish to openshift
//console.log('server started on port'+process.env.PORT || 3000);
//handle the socket
const amount_of_rooms = 100;
Player  = require("./www/PlayerServer");
GameTroop = require("./www/GameTroopServer");

rooms = [];


var Room = function () {

};

Room.prototype = {
    server: 0,
    players_names: [0],
    players_ids: [0],
    army_submit: [0],
    meleeX1: [],
    meleeY1: [],
    archerX1: [],
    archerY1: [],
    tankX1: [],
    tankY1: [],
    meleeX2: [],
    meleeY2: [],
    archerX2: [],
    archerY2: [],
    tankX2: [],
    tankY2: [],
    simulation: 0,
    game_state: 0,
    loop: 0,
    player: 0,
    private: false,
};

for (i = 0; i<amount_of_rooms; i++) {
    let x = new Room();
    x.server = i;
    x.players_names = [];
    x.players_ids = [];
    x.army_submit = [];
    x.meleeX1 = [];
    x.meleeY1 = [];
    x.archerX1 = [];
    x.archerY1 = [];
    x.tankX1 = [];
    x.tankY1 = [];
    x.meleeX2 = [];
    x.meleeY2 = [];
    x.archerX2 = [];
    x.archerY2 = [];
    x.tankX2 = [];
    x.tankY2 = [];
    x.simulation = 0;
    x.private = false;
    rooms.push(x);
}
function updateGame(room) {
    // for(let i = 0; i<rooms.length; i++)
    //     if(rooms[i].game_state === 2)
    //rooms[i].moveArmy();
    rooms[room].loop = setInterval(function () {
        if(rooms[room].game_state !== 2){
            console.log("game stop");
          clearInterval(rooms[room].loop);
        }
        else {
            console.log("updating...");
            console.log("m1: "+rooms[room].meleeX1);
            console.log("m2: "+rooms[room].meleeX2);

            rooms[room].player = new Player();
            rooms[room].player.army = rooms[room].player.createArmy( rooms[room].meleeX1,  rooms[room].meleeY1,  rooms[room].archerX1,  rooms[room].archerY1,  rooms[room].tankX1,  rooms[room].tankY1);
            rooms[room].player.enemies = rooms[room].player.createArmy( rooms[room].meleeX2,  rooms[room].meleeY2,  rooms[room].archerX2,  rooms[room].archerY2,  rooms[room].tankX2,  rooms[room].tankY2);
            rooms[room].player.moveArmy();
            rooms[room].meleeX1 = rooms[room].player.meleeX1;
            rooms[room].meleeY1 = rooms[room].player.meleeY1;
            rooms[room].archerX1 = rooms[room].player.archerX1;
            rooms[room].archerY1 = rooms[room].player.archerY1;
            rooms[room].tankX1 = rooms[room].player.tankX1;
            rooms[room].tankY1 = rooms[room].player.tankY1;
            rooms[room].meleeX2 = rooms[room].player.meleeX2;
            rooms[room].meleeY2 = rooms[room].player.meleeY2;
            rooms[room].archerX2 = rooms[room].player.archerX2;
            rooms[room].archerY2 = rooms[room].player.archerY2;
            rooms[room].tankX2 = rooms[room].player.tankX2;
            rooms[room].tankY2 = rooms[room].player.tankY2;
        }
    }, 1000 / 60);
}

io.sockets.on('connection', function(socket) {
    //new user login
    socket.on('login', function(nickname, choice) {
        users_id.push(socket.id);
        if (choice===-2) {
            console.log("-2");
            let i = 0;
          while(/*rooms[i] !== undefined && */rooms[i].players_ids.length>=2 || rooms[i].private===true) {
              console.log(i);
              i++;
          }
          socket.server = i;
            console.log(socket.server);
          socket.join(i);
        }
        else if(choice ===-1){

            let i = 0;
            while(rooms[i].players_ids.length!==0) {
                console.log(i);
                i++;
            }
            socket.server = i;
            console.log("server: "+socket.server);
            socket.join(i);
            rooms[i].private = true;
        }
        else {
            socket.server = choice;
            console.log(socket.server);
            socket.join(choice);
        }

        rooms[socket.server].players_names.push(nickname);
        rooms[socket.server].players_ids.push(socket.id);
        rooms[socket.server].army_submit.push(false);
        console.log(rooms[socket.server].army_submit);

        console.log(rooms[socket.server].players_names);
        console.log(rooms[socket.server].players_ids);


            //socket.userIndex = users.length;
            socket.nickname = nickname;
            users.push(nickname);
            socket.emit('loginSuccess', socket.server);
            console.log(socket.server);
            console.log( "me"+rooms[socket.server].players_ids.indexOf(socket.id));
            console.log("socket server: "+socket.server);
            io.sockets.in(socket.server).emit('system', nickname, rooms[socket.server].players_ids.length, 'login', rooms[socket.server].players_ids.indexOf(socket.id),rooms[socket.server].game_state, rooms[socket.server].server);
            if(rooms[socket.server].players_ids.length===2){
                io.sockets.in(socket.server).emit("gamer_time");
            }


    });
    socket.on('start_game',function () {
        // meleeX1 = [];
        // meleeY1 = [];
        // archerX1 = [];
        // archerY1 = [];
        // tankX1 = [];
        // tankY1 = [];
        // meleeX2 = [];
        // meleeY2 = [];
        // archerX2 = [];
        // archerY2 = [];
        // tankX2 = [];
        // tankY2 = [];
        // for (let i=0; i<40; i++) {
        //     if (i%2===0) {
        //         meleeX1.push(Math.random()*(1000));
        //         meleeY1.push(Math.random()*(700));
        //         meleeX2.push(Math.random()*(1000));
        //         meleeY2.push(Math.random()*(700));
        //     } else {
        //         archerX1.push(Math.random()*(1000));
        //         archerY1.push(Math.random()*(700));
        //         archerX2.push(Math.random()*(1000));
        //         archerY2.push(Math.random()*(700));
        //
        //     }
        // }
        // console.log(rooms[socket.server].players_names[0]+"  !  "+rooms[socket.server].players_names[1]);
        // io.sockets.in(socket.server).emit("draw_game", rooms[socket.server].players_ids[0],rooms[socket.server].players_ids[1],rooms[socket.server].players_names[0],rooms[socket.server].players_names[1],40,'blue','red',meleeX1,meleeY1,archerX1,archerY1,meleeX2,meleeY2,archerX2,archerY2 );
        console.log("this "+rooms[socket.server].players_ids.indexOf(socket.id));
        io.to(rooms[socket.server].players_ids[0]).emit("make army", 0);
        io.to(rooms[socket.server].players_ids[1]).emit("make army", 1);
        rooms[socket.server].game_state=1;

        // io.sockets.in(socket.server).emit("make army",rooms[socket.server].players_ids.indexOf(socket.id));
    });
    socket.on("army_submitted", function (meleeX,meleeY,archerX,archerY,tankX,tankY) {
        //console.log(rooms[socket.server].players_ids.indexOf(socket.id));
        rooms[socket.server].army_submit[rooms[socket.server].players_ids.indexOf(socket.id)] = true;
        // socket.meleeX = meleeX;
        // socket.meleeY = meleeY;
        // socket.archerX = archerX;
        // socket.archerY = archerY;
        // socket.tankX = tankX;
        // socket.tankY = tankY;
        console.log("army_submitted");
        if(rooms[socket.server].players_ids.indexOf(socket.id)===0){

            if(rooms[socket.server].army_submit[1]===true) {
                // io.to(rooms[socket.server].players_ids[0]).emit("enemy army", rooms[socket.server].players_ids[0], rooms[socket.server].players_ids[1], rooms[socket.server].players_names[0], rooms[socket.server].players_names[1], rooms[socket.server].meleeX, rooms[socket.server].meleeY, rooms[socket.server].archerX, rooms[socket.server].archerY, rooms[socket.server].tankX, rooms[socket.server].tankY);
                // io.to(rooms[socket.server].players_ids[1]).emit("enemy army", rooms[socket.server].players_ids[0], rooms[socket.server].players_ids[1], rooms[socket.server].players_names[0], rooms[socket.server].players_names[1], meleeX, meleeY, archerX, archerY, tankX, tankY);
                // rooms[socket.server].simulation = [rooms[socket.server].players_ids[0], rooms[socket.server].players_ids[1], rooms[socket.server].players_names[0], rooms[socket.server].players_names[1],rooms[socket.server].meleeX, rooms[socket.server].meleeY, rooms[socket.server].archerX, rooms[socket.server].archerY, rooms[socket.server].tankX, rooms[socket.server].tankY, meleeX, meleeY, archerX, archerY, tankX, tankY];
                // socket.broadcast.to(socket.server).emit("start_spec");//for spectating

                rooms[socket.server].meleeX2 = meleeX;
                rooms[socket.server].meleeY2 = meleeY;
                rooms[socket.server].archerX2 = archerX;
                rooms[socket.server].archerY2= archerY;
                rooms[socket.server].tankX2 = tankX;
                rooms[socket.server].tankY2 = tankY;
                rooms[socket.server].game_state = 2;
                console.log("a11: "+ rooms[socket.server].archerX1 );
                console.log("a12: "+ rooms[socket.server].archerX2 );
                updateGame(socket.server);
                console.log("sim "+rooms[socket.server].simulation);
                io.to(socket.server).emit("game_ready", rooms[socket.server].players_ids.indexOf(socket.id));
            }
            else{
                rooms[socket.server].meleeX = meleeX;
                rooms[socket.server].meleeY2 = meleeY;
                rooms[socket.server].archerX2 = archerX;
                rooms[socket.server].archerY2= archerY;
                rooms[socket.server].tankX2 = tankX;
                rooms[socket.server].tankY2 = tankY;

            }
        }
        else if(rooms[socket.server].players_ids.indexOf(socket.id)===1){

            if(rooms[socket.server].army_submit[0]===true) {
                // io.to(rooms[socket.server].players_ids[1]).emit("enemy army", rooms[socket.server].players_ids[0], rooms[socket.server].players_ids[1], rooms[socket.server].players_names[0], rooms[socket.server].players_names[1], rooms[socket.server].meleeX, rooms[socket.server].meleeY, rooms[socket.server].archerX, rooms[socket.server].archerY, rooms[socket.server].tankX, rooms[socket.server].tankY);
                // io.to(rooms[socket.server].players_ids[0]).emit("enemy army", rooms[socket.server].players_ids[0], rooms[socket.server].players_ids[1], rooms[socket.server].players_names[0], rooms[socket.server].players_names[1], meleeX, meleeY, archerX, archerY, tankX, tankY);
                // rooms[socket.server].simulation = [rooms[socket.server].players_ids[0], rooms[socket.server].players_ids[1], rooms[socket.server].players_names[0], rooms[socket.server].players_names[1], rooms[socket.server].meleeX, rooms[socket.server].meleeY, rooms[socket.server].archerX, rooms[socket.server].archerY, rooms[socket.server].tankX, rooms[socket.server].tankY,meleeX, meleeY, archerX, archerY, tankX, tankY];

                rooms[socket.server].meleeX1 = meleeX;
                rooms[socket.server].meleeY1 = meleeY;
                rooms[socket.server].archerX1 = archerX;
                rooms[socket.server].archerY1= archerY;
                rooms[socket.server].tankX1 = tankX;
                rooms[socket.server].tankY1 = tankY;
                console.log("a21: "+ rooms[socket.server].archerX1 );
                console.log("a22: "+ rooms[socket.server].archerX2 );
                socket.broadcast.to(socket.server).emit("start_spec");//for spectating
                rooms[socket.server].game_state = 2;
                updateGame(socket.server);
                console.log("s "+rooms[socket.server].simulation);
                io.to(socket.server).emit("game_ready");
            }
            else{
                rooms[socket.server].meleeX1 = meleeX;
                rooms[socket.server].meleeY1 = meleeY;
                rooms[socket.server].archerX1 = archerX;
                rooms[socket.server].archerY1= archerY;
                rooms[socket.server].tankX1 = tankX;
                rooms[socket.server].tankY1 = tankY;
            }
        }

    });
    socket.on("request_update", function () {
        console.log("update request");
       socket.emit("updated_draw",rooms[socket.server].meleeX1, rooms[socket.server].meleeY1, rooms[socket.server].archerX1, rooms[socket.server].archerY1, rooms[socket.server].tankX1, rooms[socket.server].tankY1, rooms[socket.server].meleeX2, rooms[socket.server].meleeY2, rooms[socket.server].archerX2, rooms[socket.server].archerY2, rooms[socket.server].tankX2, rooms[socket.server].tankY2,rooms[socket.server].players_ids.indexOf(socket.id),rooms[socket.server].players_names[0],rooms[socket.server].players_names[1]);
    });
    socket.on("request_spec", function () {
        console.log("maybe "+rooms[socket.server].simulation);
        socket.emit("replay",rooms[socket.server].simulation);
    });
    //user leaves

    socket.on("request index", function () {
        console.log(socket.nickname+" has requested their index");
        io.to(socket.id).emit("update_index", rooms[socket.server].players_ids.indexOf(socket.id), rooms[socket.server].players_ids.length);
    });

    socket.on('disconnect',function(){
        if (socket.nickname != null) {
            console.log(socket.nickname+" disconnected");
            //users.splice(socket.userIndex, 1);
            if(rooms[socket.server].players_ids.indexOf(socket.id)<2 && (rooms[socket.server].game_state===1||rooms[socket.server].game_state===2)){
                io.sockets.in(socket.server).emit("cancel_game", rooms[socket.server].players_ids.length-1,rooms[socket.server].game_state);
                rooms[socket.server].game_state=0;
                }
                io.sockets.in(socket.server).emit('system', socket.nickname, rooms[socket.server].players_ids.length-1, 'logout', rooms[socket.server].players_ids.indexOf(socket.id));
            // io.sockets.in(socket.server).on("ready",function () {
            //     console.log("the h is going on");
            //     io.sockets.in(socket.server).emit('system', socket.nickname, rooms[socket.server].players_ids.length-1, 'logout', rooms[socket.server].players_ids.indexOf(socket.id));
            // });
            rooms[socket.server].players_ids.splice(rooms[socket.server].players_ids.indexOf(socket.id),1);
            console.log(socket.server);
            // io.sockets.in(socket.server).emit("update_index", rooms[socket.server].players_ids.indexOf(socket.id), rooms[socket.server].players_ids.length);
            io.sockets.in(socket.server).emit("new index ready");
            users.splice(users.indexOf(socket.nickname), 1);
            console.log(rooms[socket.server].players_names);
            console.log(rooms[socket.server].players_ids);

            if(rooms[socket.server].players_names.length-1 === 0){
                rooms[socket.server].private = false;
            }

            rooms[socket.server].army_submit[0] = false;
            rooms[socket.server].army_submit[1] = false;
            rooms[socket.server].players_names.splice(rooms[socket.server].players_names.indexOf(socket.nickname),1);
            rooms[socket.server].army_submit.splice(rooms[socket.server].players_names.indexOf(socket.nickname),1);
            rooms[socket.server].meleeX = [];
            rooms[socket.server].meleeY = [];
            rooms[socket.server].archerX = [];
            rooms[socket.server].archerY = [];
            rooms[socket.server].tankX = [];
            rooms[socket.server].tankY = [];

            console.log("after");
            console.log(rooms[socket.server].players_names);
            console.log(rooms[socket.server].players_ids);


        }
    });

    //new message get
    socket.on('postMsg', function(msg, color,server) {
        socket.broadcast.to(server).emit('newMsg', socket.nickname, msg, color);
    });
});
