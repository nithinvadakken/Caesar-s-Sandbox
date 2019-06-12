var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    users = [];
    users_id = [];
//specify the html we will use
app.use('/', express.static(__dirname + '/www'));
//bind the server to the 80 port
//server.listen(3000);//for local test
server.listen(/*process.env.PORT */ 3000);//publish to heroku
//server.listen(process.env.OPENSHIFT_NODEJS_PORT || 3000);//publish to openshift
//console.log('server started on port'+process.env.PORT || 3000);
//handle the socket
Player = require('../Player');
const amount_of_rooms = 100;

 rooms = [];

 temp = new Player.constructor(1,'blue');


 var Room = function () {

 };

 Room.prototype = {
     server: 0,
     players_names: [0],
     players_ids: [0],
 };

 for (i = 0; i<amount_of_rooms; i++){
     let x = new Room();
     x.server = i;
     x.players_names = [];
     x.players_ids = [];
     rooms.push(x);
 }

io.sockets.on('connection', function(socket) {
    //new user login
    socket.on('login', function(nickname, server) {
        socket.players_object = new Player.constructor(socket.id,'blue');
        users_id.push(socket.id);
        if (server.trim().length === 0) {
            let x = parseInt(Math.random() * 100);
            console.log(x);
            server = x;
            socket.join(x);
        }
        else {
            socket.join(server);
        }
        socket.server = server;
        rooms[server].players_names.push(nickname);
        rooms[server].players_ids.push(socket.id);
        console.log(rooms[server].players_names);
        console.log(rooms[server].players_ids);

        if (users.indexOf(nickname) > -1) {
            socket.emit('nickExisted');
        } else {
            //socket.userIndex = users.length;
            socket.nickname = nickname;
            users.push(nickname);
            socket.emit('loginSuccess', server);
            console.log(socket.server);
            io.sockets.in(server).emit('system', nickname, rooms[socket.server].players_ids.length, 'login');
        }
    });
    //user leaves
    socket.on('disconnect',function(){
        if (socket.nickname != null) {
            console.log(socket.nickname+" disconnected");
            //users.splice(socket.userIndex, 1);
            io.sockets.in(socket.server).emit('system', socket.nickname, rooms[socket.server].players_ids.length-1, 'logout');
            users.splice(users.indexOf(socket.nickname), 1);
            console.log(rooms[socket.server].players_names);
            console.log(rooms[socket.server].players_ids);

            rooms[socket.server].players_ids.splice(rooms[socket.server].players_ids.indexOf(socket.id),1);
            rooms[socket.server].players_names.splice(rooms[socket.server].players_names.indexOf(socket.nickname),1);

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
