var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    users = [];
users_id = [];
//specify the html we will use
app.use('/', express.static(__dirname + '/www'));
//bind the server to the 80 port
//server.listen(3000);//local
server.listen(process.env.PORT);//publish to heroku
//server.listen(process.env.OPENSHIFT_NODEJS_PORT || 3000);//publish to openshift
console.log('server started on port'/*+process.env.PORT ||*/ + 3000);
//handle the socket
//wewewewe
var amount_of_rooms = 0;
Temp = require("./www/RecodedPlayerServer");
//GameTroop = require("./www/GameTroopServer");

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
    attack_linex: [],
    attack_liney: [],
    attack_lineEx: [],
    attack_lineEy: [],
    meleeTime1: [],
    meleeTime2: [],
    archerTime1: [],
    archerTime2: [],
    tankTime1: [],
    tankTime2: [],
    simulation: 0,
    game_state: 0,
    loop: 0,
    player: 0,
    private: false

};

// for (i = 0; i<amount_of_rooms; i++) {
//     let x = new Room();
//     x.server = i;
//     x.players_names = [];
//     x.players_ids = [];
//     x.army_submit = [];
//     x.meleeX1 = [];
//     x.meleeY1 = [];
//     x.archerX1 = [];
//     x.archerY1 = [];
//     x.tankX1 = [];
//     x.tankY1 = [];
//     x.meleeX2 = [];
//     x.meleeY2 = [];
//     x.archerX2 = [];
//     x.archerY2 = [];
//     x.tankX2 = [];
//     x.tankY2 = [];
//     x.simulation = 0;
//     x.private = false;
//     rooms.push(x);
// }
function create_room(server) {
    var x = new Room();
    x.server = server;
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
    x.attack_linex1 = [];
    x.attack_liney1 = [];
    x.attack_lineEx1 = [];
    x.attack_lineEy1 = [];
    x.attack_linex2 = [];
    x.attack_liney2 = [];
    x.attack_lineEx2 = [];
    x.attack_lineEy2 = [];
    x.meleeTime1 = [];
    x.meleeTime2 = [];
    x.archerTime1 = [];
    x.archerTime2 = [];
    x.tankTime1 = [];
    x.tankTime2 = [];
    x.meleehp1 = [];
    x.archerhp1 = [];
    x.tankhp1 = [];
    x.meleehp2 = [];
    x.archerhp2 = [];
    x.tankhp2 = [];
    x.meleeId1 = [];
    x.archerId1 = [];
    x.tankId1 = [];
    x.meleeId2 = [];
    x.archerId2 = [];
    x.tankId2 = [];
    x.simulation = 0;
    x.private = false;
    rooms.push(x);
    amount_of_rooms++;
}

function startGame(room) {
    console.log("start")
    rooms[room].game = new Temp();

    let armyX = [];//TODO make the arrays easier please
    let armyY = [];
    let armyType = [];
    let armyEX = [];
    let armyEY = [];
    let armyEType = [];
    console.log("***")
    console.log(rooms[room].meleeX1,rooms[room].meleeX2)
    for(let i = 0; i < rooms[room].meleeX1.length; i++){
        console.log(rooms[room].meleeX1[i]+ " m")
        armyX.push(rooms[room].meleeX1[i])
        armyY.push(rooms[room].meleeY1[i])
        armyType.push(0);
    }
    for(let i = 0; i < rooms[room].archerX1.length; i++){
        armyX.push(rooms[room].archerX1[i])
        armyY.push(rooms[room].archerY1[i])
        armyType.push(1);
    }
    for(let i = 0; i < rooms[room].tankX1.length; i++){
        armyX.push(rooms[room].tankX1[i])
        armyY.push(rooms[room].tankX1[i])
        armyType.push(2);
    }

    for(let i = 0; i < rooms[room].meleeX2.length; i++){
        armyEX.push(rooms[room].meleeX2[i])
        armyEY.push(rooms[room].meleeY2[i])
        armyEType.push(0);
    }
    for(let i = 0; i < rooms[room].archerX2.length; i++){
        armyEX.push(rooms[room].archerX2[i])
        armyEY.push(rooms[room].archerY2[i])
        armyEType.push(1);
    }
    for(let i = 0; i < rooms[room].tankX2.length; i++){
        armyEX.push(rooms[room].tankX2[i])
        armyEY.push(rooms[room].tankX2[i])
        armyEType.push(2);
    }
    rooms[room].game.init();
    rooms[room].game.createArmy(armyX,armyY,armyType,armyEX,armyEY,armyEType);
    rooms[room].game.startGame();
    rooms[room].PLAYERS = rooms[room].game.PLAYERS;
    rooms[room].BULLETS = rooms[room].game.BULLETS;
    console.log(rooms[room].PLAYERS)
}

function updateGame(room) {
    //table(room);
    // for(let i = 0; i<rooms.length; i++)
    //     if(rooms[i].game_state === 2)
    //rooms[i].moveArmy();
    rooms[room].loop = setInterval(function () {
        rooms[room].player1 = new Player(0);
        rooms[room].player2 = new Player(1);

        if (rooms[room].game_state !== 2) {
            io.to(rooms[room].server).emit('game_ended');
            console.log("game stop");
            clearInterval(rooms[room].loop);
        }
        else {

            // rooms[room].player1.attack_linex = [];
            // rooms[room].player1.attack_liney = [];
            // rooms[room].player1.attack_lineEx = [];
            // rooms[room].player1.attack_lineEy = [];

            rooms[room].attack_linex1 = []
            rooms[room].attack_liney1 = []
            rooms[room].attack_lineEx1 =[]
            rooms[room].attack_lineEy1 = []
            //console.log("hi "+ rooms[room].attack_linex1);

            rooms[room].attack_linex2 = []
            rooms[room].attack_liney2 = []
            rooms[room].attack_lineEx2 = []
            rooms[room].attack_lineEy2 =[]

            //console.log("updating...");
            // console.log("a1: "+rooms[room].archerX1);
            // console.log("a2: "+rooms[room].archerX2);

            rooms[room].player1.army = rooms[room].player2.createArmy(rooms[room].meleeX1, rooms[room].meleeY1, rooms[room].archerX1, rooms[room].archerY1, rooms[room].tankX1, rooms[room].tankY1, rooms[room].meleeTime1, rooms[room].archerTime1, rooms[room].tankTime1, rooms[room].meleehp1, rooms[room].archerhp1, rooms[room].tankhp1,0,rooms[room].meleeId1,rooms[room].archerId1,rooms[room].tankId1,rooms[room].player1);
            rooms[room].player1.enemies = rooms[room].player2.createArmy(rooms[room].meleeX2, rooms[room].meleeY2, rooms[room].archerX2, rooms[room].archerY2, rooms[room].tankX2, rooms[room].tankY2, rooms[room].meleeTime2, rooms[room].archerTime2, rooms[room].tankTime2, rooms[room].meleehp2, rooms[room].archerhp2, rooms[room].tankhp2,1,rooms[room].meleeId2,rooms[room].archerId2,rooms[room].tankId2,rooms[room].player2);
            rooms[room].player1.moveArmy();
            rooms[room].player2.army = rooms[room].player1.enemies;
            rooms[room].player2.enemies = rooms[room].player1.army;
            rooms[room].player2.moveArmy();
            rooms[room].player1.army = rooms[room].player2.enemies;
            rooms[room].player1.enemies = rooms[room].player2.army;

            // for(let i = 0; i<rooms[room].player1.attack_linex.length; i++){
            //     if(rooms[room].player1.attack_linex[i]=== temp1[i] &&rooms[room].player1.attack_liney[i]=== temp2[i] &&rooms[room].player1.attack_lineEx[i]=== temp3[i] &&rooms[room].player1.attack_lineEy[i]=== temp4[i] ){
            //         rooms[room].player1.attack_linex.splice(i,1);
            //         rooms[room].player1.attack_liney.splice(i,1);
            //         rooms[room].player1.attack_lineEx.splice(i,1);
            //         rooms[room].player1.attack_lineEy.splice(i,1);
            //     }
            // }

            rooms[room].meleeX1 = rooms[room].player1.meleeX1;
            rooms[room].meleeY1 = rooms[room].player1.meleeY1;
            rooms[room].archerX1 = rooms[room].player1.archerX1;
            rooms[room].archerY1 = rooms[room].player1.archerY1;
            rooms[room].tankX1 = rooms[room].player1.tankX1;
            rooms[room].tankY1 = rooms[room].player1.tankY1;

            rooms[room].meleehp1 = rooms[room].player2.meleehpE;
            rooms[room].archerhp1 = rooms[room].player2.archerhpE;
            rooms[room].tankhp1 = rooms[room].player2.tankhpE;
            rooms[room].meleehp2 = rooms[room].player1.meleehpE;
            rooms[room].archerhp2 = rooms[room].player1.archerhpE;
            rooms[room].tankhp2 = rooms[room].player1.tankhpE;


            rooms[room].meleeX2 = rooms[room].player2.meleeX1;
            rooms[room].meleeY2 = rooms[room].player2.meleeY1;
            rooms[room].archerX2 = rooms[room].player2.archerX1;
            rooms[room].archerY2 = rooms[room].player2.archerY1;
            rooms[room].tankX2 = rooms[room].player2.tankX1;
            rooms[room].tankY2 = rooms[room].player2.tankY1;


            rooms[room].attack_linex1 = rooms[room].player1.attack_linex;
            rooms[room].attack_liney1 = rooms[room].player1.attack_liney;
            rooms[room].attack_lineEx1 = rooms[room].player1.attack_lineEx;
            rooms[room].attack_lineEy1 = rooms[room].player1.attack_lineEy;
            
            //console.log("hi "+ rooms[room].attack_linex1);
            
            rooms[room].attack_linex2 = rooms[room].player2.attack_linex;
            rooms[room].attack_liney2 = rooms[room].player2.attack_liney;
            rooms[room].attack_lineEx2 = rooms[room].player2.attack_lineEx;
            rooms[room].attack_lineEy2 = rooms[room].player2.attack_lineEy;

            rooms[room].meleeTime1 = rooms[room].player1.meleeTime;
            rooms[room].archerTime1 = rooms[room].player1.archerTime;
            rooms[room].tankTime1 = rooms[room].player1.tankTime;
            rooms[room].meleeTime2 = rooms[room].player2.meleeTime;
            rooms[room].archerTime2 = rooms[room].player2.archerTime;
            rooms[room].tankTime2 = rooms[room].player2.tankTime;
        }
    }, 1000 / 60);
}

function table(room) {
    var temp = setInterval(function () {
        if (rooms[room].game_state !== 2) {
            console.log("game stop");
            clearInterval(temp);
        }
        else {
            //     console.table(rooms[room].player1.army);
            //     console.table(rooms[room].player2.army);
            console.log("***");
            // console.log(rooms[room].attack_linex1);
            // console.log(rooms[room].attack_linex2);
            console.log(rooms[room].archerhp1);
            console.log(rooms[room].archerhp2);

            //console.log(rooms[room].attack_lineEx1[0]+"  "+rooms[room].attack_linex2[0]);
            //console.log(rooms[room].attack_lineEx2[0]+"  "+rooms[room].attack_linex1[0]);
           // console.log(rooms[room].attack_linex1[1])
            //console.log(rooms[room].attack_liney1[1])

           // console.assert(rooms[room].attack_linex1[0],rooms[room].attack_liney1[0],rooms[room].attack_lineEx1[0],rooms[room].attack_lineEy1[0])
           // console.assert(rooms[room].attack_linex2[0],rooms[room].attack_liney2[0],rooms[room].attack_lineEx2[0],rooms[room].attack_lineEy2[0])
        }
    }, 1000 / 1);
}

setInterval(function () {
    for (i = 0; i < amount_of_rooms; i++) {
        if (rooms[i].players_ids.length === 0) {
            console.log("deleted room" + rooms[i].server + "  " + rooms.length);
            rooms.slice(i - 1, 1);//FIX this TODO
            console.log(rooms.length)
        }
    }
}, 1000);

io.sockets.on('connection', function (socket) {
    //new user login
    socket.on('login', function (nickname, choice) {
        socket.nickname = nickname;
        users_id.push(socket.id);
        if (choice === -2) {
            console.log("-2");
            //let i = 0;
            //exit = false;
            // while(/*rooms[i] !== undefined && */exit=== false &&(rooms[i].players_ids.length>=2 || rooms[i].private===true )) {
            //     console.log(i);
            //     i++;
            //     if(i>amount_of_rooms) {
            //         //expand servers TODO
            //         exit = true;
            //     }
            // }
            var joined = false;
            for (i = 0; i < rooms.length; i++) {
                if (rooms[i].players_ids.length === 1 && rooms[i].private === false) {
                    socket.server = rooms[i].server;
                    socket.room = i;
                    console.log(socket.server);
                    socket.join(rooms[i].server);
                    joined = true;
                }
            }
            if (joined === false) {
                var x = 1;
                another_room = true;
                while (another_room === true) {
                    another_room = false;
                    for (i = 0; i < rooms.length; i++) {
                        if (rooms[i].server === x)
                            another_room = true;
                    }
                    x = Math.floor(Math.random() * 10000);
                    console.log(x);
                }
                create_room(x);
                socket.server = x;
                socket.room = rooms.length - 1;
                console.log(socket.server);
                console.log("r" + socket.room);
                socket.join(x);
            }

        }
        else if (choice === -1) {

            // let i = 0;
            // while(rooms[i].players_ids.length!==0) {
            //     console.log(i);
            //     i++;
            // }
            // socket.server = i;
            // console.log("server: "+socket.server);
            // socket.join(i);
            // rooms[i].private = true;
            var x = 1;
            another_room = true;
            while (another_room === true) {
                another_room = false;
                for (i = 0; i < rooms.length; i++) {
                    if (rooms[i].server === x)
                        another_room = true;
                }
                x = Math.floor(Math.random() * 10000);//TODO
                console.log(x);
            }
            create_room(x);
            rooms[rooms.length - 1].private = true;
            socket.server = x;
            socket.room = rooms.length - 1;
            console.log(socket.server);
            console.log("r" + socket.room);
            socket.join(x);

        }
        else {
            //TODO IF PRIVATE MAKE A PASS
            socket.server = choice;
            console.log("joined manually " + choice);
            socket.join(choice);
            joined = false;
            console.log("size" + rooms.length)
            for (let i = 0; i < rooms.length; i++) {
                console.log(i + " " + rooms[i].server);
            }
            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i].server === parseInt(choice)) {
                    socket.room = i;
                    console.log(socket.server);
                    console.log("r" + socket.room);
                    joined = true;
                    console.log("found")
                }
            }
            if (joined === false) {
                console.log("didnt find room");
                create_room(choice);
                socket.server = choice;
                socket.room = rooms.length - 1;
                console.log(socket.server);
                console.log("r" + socket.room);
                socket.join(choice);
            }
            else
                console.log("found room")
            console.log("size" + rooms.length)
        }
        console.log("***\nServer:" + socket.server + "\nRoom:" + socket.room + "\nName:" + socket.nickname);
        rooms[socket.room].players_names.push(nickname);
        rooms[socket.room].players_ids.push(socket.id);
        rooms[socket.room].army_submit.push(false);
        console.log(rooms[socket.room].army_submit);

        console.log(rooms[socket.room].players_names);
        console.log(rooms[socket.room].players_ids);

        rooms[socket.room].attack_linex = [];
        rooms[socket.room].attack_liney = [];
        rooms[socket.room].attack_lineEx = [];
        rooms[socket.room].attack_lineEy = [];


        //socket.userIndex = users.length;
        socket.nickname = nickname;
        users.push(nickname);
        socket.emit('loginSuccess', socket.server, socket.room);//TODO important client
        console.log(socket.server);
        console.log("me" + rooms[socket.room].players_ids.indexOf(socket.id));
        console.log("socket server: " + socket.server);
        io.sockets.in(socket.server).emit('system', nickname, rooms[socket.room].players_ids.length, 'login', rooms[socket.room].players_ids.indexOf(socket.id), rooms[socket.room].game_state, rooms[socket.room].server);
        if (rooms[socket.room].players_ids.length === 2) {
            io.sockets.in(socket.server).emit("gamer_time");
        }


    });
    socket.on('start_game', function () {
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
        console.log("this " + rooms[socket.room].players_ids.indexOf(socket.id));
        io.to(rooms[socket.room].players_ids[0]).emit("make army", 0);
        io.to(rooms[socket.room].players_ids[1]).emit("make army", 1);
        rooms[socket.room].game_state = 1;

        // io.sockets.in(socket.server).emit("make army",rooms[socket.server].players_ids.indexOf(socket.id));
    });
    socket.on("army_submitted", function (meleeX, meleeY, archerX, archerY, tankX, tankY, meleeId,archerId, tankId) {
        console.log("army_submitted");
        //console.log(rooms[socket.server].players_ids.indexOf(socket.id));
        rooms[socket.room].army_submit[rooms[socket.room].players_ids.indexOf(socket.id)] = true;
        // socket.meleeX = meleeX;
        // socket.meleeY = meleeY;
        // socket.archerX = archerX;
        // socket.archerY = archerY;
        // socket.tankX = tankX;
        // socket.tankY = tankY;

        if (rooms[socket.room].players_ids.indexOf(socket.id) === 0) {

            if (rooms[socket.room].army_submit[1] === true) {
                // io.to(rooms[socket.server].players_ids[0]).emit("enemy army", rooms[socket.server].players_ids[0], rooms[socket.server].players_ids[1], rooms[socket.server].players_names[0], rooms[socket.server].players_names[1], rooms[socket.server].meleeX, rooms[socket.server].meleeY, rooms[socket.server].archerX, rooms[socket.server].archerY, rooms[socket.server].tankX, rooms[socket.server].tankY);
                // io.to(rooms[socket.server].players_ids[1]).emit("enemy army", rooms[socket.server].players_ids[0], rooms[socket.server].players_ids[1], rooms[socket.server].players_names[0], rooms[socket.server].players_names[1], meleeX, meleeY, archerX, archerY, tankX, tankY);
                // rooms[socket.server].simulation = [rooms[socket.server].players_ids[0], rooms[socket.server].players_ids[1], rooms[socket.server].players_names[0], rooms[socket.server].players_names[1],rooms[socket.server].meleeX, rooms[socket.server].meleeY, rooms[socket.server].archerX, rooms[socket.server].archerY, rooms[socket.server].tankX, rooms[socket.server].tankY, meleeX, meleeY, archerX, archerY, tankX, tankY];
                // socket.broadcast.to(socket.server).emit("start_spec");//for spectating
                rooms[socket.room].meleeId2 = meleeId;
                rooms[socket.room].archerId2 = archerId;
                rooms[socket.room].tankId2= tankId;

                rooms[socket.room].meleeX2 = meleeX;
                rooms[socket.room].meleeY2 = meleeY;
                rooms[socket.room].archerX2 = archerX;
                rooms[socket.room].archerY2 = archerY;
                rooms[socket.room].tankX2 = tankX;
                rooms[socket.room].tankY2 = tankY;
                // socket.emit("request max");
                // socket.on("max", function (max) {
                //     let temp_player = new Player();
                //     let meleehp = temp_player.MELEEHP;
                //     let archerhp = temp_player.ARCHERHP;
                //     let tankhp = temp_player.TANKHP;
                //     for (let i = 0; i < rooms[socket.room].meleeX2.length; i++) {
                //         rooms[socket.room].meleehp2.push(meleehp);
                //     }
                //     for (let i = 0; i < rooms[socket.room].archerX2.length; i++) {
                //         rooms[socket.room].archerhp2.push(archerhp);
                //     }
                //     for (let i = 0; i < rooms[socket.room].tankX2.length; i++) {
                //         rooms[socket.room].tankhp2.push(tankhp);
                //     }
                //
                //     for (let i = 0; i < rooms[socket.room].meleeX1.length; i++) {
                //         rooms[socket.room].meleehp1.push(meleehp);
                //     }
                //     for (let i = 0; i < rooms[socket.room].archerX1.length; i++) {
                //         rooms[socket.room].archerhp1.push(archerhp);
                //     }
                //     for (let i = 0; i < rooms[socket.room].tankX1.length; i++) {
                //         rooms[socket.room].tankhp1.push(tankhp);
                //     }
                //     console.log(  "!!!!!!!!!!!!!!!"+rooms[socket.room].meleehp1.length+"  "+rooms[socket.room].meleehp2.length)
                //
                //     rooms[socket.room].max = max;
                //     let i;
                //     for (i = 0; i < max; i++) {
                //         rooms[socket.room].meleeTime1.push(0);
                //         rooms[socket.room].archerTime1.push(0);
                //         rooms[socket.room].tankTime1.push(0);
                //         rooms[socket.room].meleeTime2.push(0);
                //         rooms[socket.room].archerTime2.push(0);
                //         rooms[socket.room].tankTime2.push(0);
                //     }
                //
                //
                // });


                rooms[socket.room].game_state = 2;
                console.log("a11: " + rooms[socket.room].archerX1);
                console.log("a12: " + rooms[socket.room].archerX2);
                socket.broadcast.to(socket.server).emit("start_spec");//for spectating
                startGame(socket.room);
                //updateGame(socket.room);
                //console.log("sim "+rooms[socket.server].simulation);
                io.to(socket.server).emit("game_ready", rooms[socket.room].players_ids.indexOf(socket.id));
            }
            else {
                rooms[socket.room].meleeId2 = meleeId;
                rooms[socket.room].archerId2 = archerId;
                rooms[socket.room].tankId2= tankId;
                rooms[socket.room].meleeX2 = meleeX;
                rooms[socket.room].meleeY2 = meleeY;
                rooms[socket.room].archerX2 = archerX;
                rooms[socket.room].archerY2 = archerY;
                rooms[socket.room].tankX2 = tankX;
                rooms[socket.room].tankY2 = tankY;

            }
        }
        else if (rooms[socket.room].players_ids.indexOf(socket.id) === 1) {

            if (rooms[socket.room].army_submit[0] === true) {
                // io.to(rooms[socket.server].players_ids[1]).emit("enemy army", rooms[socket.server].players_ids[0], rooms[socket.server].players_ids[1], rooms[socket.server].players_names[0], rooms[socket.server].players_names[1], rooms[socket.server].meleeX, rooms[socket.server].meleeY, rooms[socket.server].archerX, rooms[socket.server].archerY, rooms[socket.server].tankX, rooms[socket.server].tankY);
                // io.to(rooms[socket.server].players_ids[0]).emit("enemy army", rooms[socket.server].players_ids[0], rooms[socket.server].players_ids[1], rooms[socket.server].players_names[0], rooms[socket.server].players_names[1], meleeX, meleeY, archerX, archerY, tankX, tankY);
                // rooms[socket.server].simulation = [rooms[socket.server].players_ids[0], rooms[socket.server].players_ids[1], rooms[socket.server].players_names[0], rooms[socket.server].players_names[1], rooms[socket.server].meleeX, rooms[socket.server].meleeY, rooms[socket.server].archerX, rooms[socket.server].archerY, rooms[socket.server].tankX, rooms[socket.server].tankY,meleeX, meleeY, archerX, archerY, tankX, tankY];

                rooms[socket.room].meleeId1 = meleeId;
                rooms[socket.room].archerId1 = archerId;
                rooms[socket.room].tankId1= tankId;

                rooms[socket.room].meleeX1 = meleeX;
                rooms[socket.room].meleeY1 = meleeY;
                rooms[socket.room].archerX1 = archerX;
                rooms[socket.room].archerY1 = archerY;
                rooms[socket.room].tankX1 = tankX;
                rooms[socket.room].tankY1 = tankY;
                // socket.emit("request max");
                // socket.on("max", function (max) {
                //     let temp_player = new Player();
                //
                //     for (let i = 0; i < rooms[socket.room].meleeX2.length; i++) {
                //         rooms[socket.room].meleehp2.push(meleehp);
                //     }
                //     for (let i = 0; i < rooms[socket.room].archerX2.length; i++) {
                //         rooms[socket.room].archerhp2.push(archerhp);
                //     }
                //     for (let i = 0; i < rooms[socket.room].tankX2.length; i++) {
                //         rooms[socket.room].tankhp2.push(tankhp);
                //     }
                //     for (let i = 0; i < rooms[socket.room].meleeX1.length; i++) {
                //         rooms[socket.room].meleehp1.push(meleehp);
                //     }
                //     for (let i = 0; i < rooms[socket.room].archerX1.length; i++) {
                //         rooms[socket.room].archerhp1.push(archerhp);
                //     }
                //     for (let i = 0; i < rooms[socket.room].tankX1.length; i++) {
                //         rooms[socket.room].tankhp1.push(tankhp);
                //     }
                //     console.log(  "!!!!!!!!!!!!!!!"+rooms[socket.room].meleehp1.length+"  "+rooms[socket.room].meleehp2.length)
                //     rooms[socket.room].max = max;
                //     let i;
                //     for (i = 0; i < max; i++) {
                //         rooms[socket.room].meleeTime1.push(0);
                //         rooms[socket.room].archerTime1.push(0);
                //         rooms[socket.room].tankTime1.push(0);
                //         rooms[socket.room].meleeTime2.push(0);
                //         rooms[socket.room].archerTime2.push(0);
                //         rooms[socket.room].tankTime2.push(0);
                //     }
                //});

                socket.broadcast.to(socket.server).emit("start_spec");//for spectating
                rooms[socket.room].game_state = 2;
                startGame(socket.room);
                //updateGame(socket.room);
                //console.log("s "+rooms[socket.room].simulation);
                io.to(socket.server).emit("game_ready", rooms[socket.room].players_ids.indexOf(socket.id));
            }
            else {
                rooms[socket.room].meleeId1 = meleeId;
                rooms[socket.room].archerId1 = archerId;
                rooms[socket.room].tankId1= tankId;
                
                rooms[socket.room].meleeX1 = meleeX;
                rooms[socket.room].meleeY1 = meleeY;
                rooms[socket.room].archerX1 = archerX;
                rooms[socket.room].archerY1 = archerY;
                rooms[socket.room].tankX1 = tankX;
                rooms[socket.room].tankY1 = tankY;
            }
        }

    });
    socket.on("request_update", function () {
        //console.log("update request");
        socket.emit("updated_draw", rooms[socket.room].PLAYERS,rooms[socket.room].BULLETS);
    });
    socket.on("request_spec", function () {
        console.log("maybe " + rooms[socket.room].simulation);
        socket.emit("replay", rooms[socket.room].simulation);
    });
    //user leaves

    socket.on("request index", function () {
        console.log(socket.nickname + " has requested their index");
        io.to(socket.id).emit("update_index", rooms[socket.room].players_ids.indexOf(socket.id), rooms[socket.room].players_ids.length);
    });

    socket.on('disconnect', function () {
        if (socket.nickname != null) {
            console.log(socket.nickname + " disconnected");
            //users.splice(socket.userIndex, 1);
            if (rooms[socket.room].players_ids.indexOf(socket.id) < 2 && (rooms[socket.room].game_state === 1 || rooms[socket.room].game_state === 2)) {
                io.sockets.in(socket.server).emit("cancel_game", rooms[socket.room].players_ids.length - 1, rooms[socket.room].game_state);
                rooms[socket.room].game_state = 0;
            }
            io.sockets.in(socket.server).emit('system', socket.nickname, rooms[socket.room].players_ids.length - 1, 'logout', rooms[socket.room].players_ids.indexOf(socket.id));
            // io.sockets.in(socket.server).on("ready",function () {
            //     console.log("the h is going on");
            //     io.sockets.in(socket.server).emit('system', socket.nickname, rooms[socket.server].players_ids.length-1, 'logout', rooms[socket.server].players_ids.indexOf(socket.id));
            // });
            rooms[socket.room].players_ids.splice(rooms[socket.room].players_ids.indexOf(socket.id), 1);
            console.log(socket.server);
            // io.sockets.in(socket.server).emit("update_index", rooms[socket.server].players_ids.indexOf(socket.id), rooms[socket.server].players_ids.length);
            io.sockets.in(socket.server).emit("new index ready");
            users.splice(users.indexOf(socket.nickname), 1);
            console.log(rooms[socket.room].players_names);
            console.log(rooms[socket.room].players_ids);

            if (rooms[socket.room].players_names.length - 1 === 0) {
                rooms[socket.room].private = false;
            }

            rooms[socket.room].army_submit[0] = false;
            rooms[socket.room].army_submit[1] = false;
            rooms[socket.room].players_names.splice(rooms[socket.room].players_names.indexOf(socket.nickname), 1);
            rooms[socket.room].army_submit.splice(rooms[socket.room].players_names.indexOf(socket.nickname), 1);
            rooms[socket.room].meleeX = [];
            rooms[socket.room].meleeY = [];
            rooms[socket.room].archerX = [];
            rooms[socket.room].archerY = [];
            rooms[socket.room].tankX = [];
            rooms[socket.room].tankY = [];//TODO  RESET ERVERYTHING
            let x = rooms[socket.room];
            x.attack_linex1 = [];
            x.attack_liney1 = [];
            x.attack_lineEx1 = [];
            x.attack_lineEy1 = [];
            x.attack_linex2 = [];
            x.attack_liney2 = [];
            x.attack_lineEx2 = [];
            x.attack_lineEy2 = [];

            console.log("after");
            console.log(rooms[socket.room].players_names);
            console.log(rooms[socket.room].players_ids);


        }
    });

    //new message get
    socket.on('postMsg', function (msg, color, server) {
        console.log(msg);
        socket.broadcast.to(socket.server).emit('newMsg', socket.nickname, msg, color);
    });
});

