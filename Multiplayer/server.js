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

 rooms = {};
io.sockets.on('connection', function(socket) {
    //new user login
    socket.on('login', function(nickname, server) {
        users_id.push(socket.id);
        if(server.trim().length === 0)
            socket.join(Math.random()*100);
        else
            socket.join(server);
        if (users.indexOf(nickname) > -1) {
            socket.emit('nickExisted');
        } else {
            //socket.userIndex = users.length;
            socket.nickname = nickname;
            users.push(nickname);
            socket.emit('loginSuccess', server);
            io.sockets.in(server).emit('system', nickname, users.length, 'login');
        }
    });
    //user leaves
    socket.on('disconnect',function(){
        if (socket.nickname != null) {
            console.log(socket.nickname+" disconnected");
            //users.splice(socket.userIndex, 1);
            io.sockets.in(socket.server).emit('system', socket.nickname, users.length, 'logout');
            users.splice(users.indexOf(socket.nickname), 1);
            users_id.splice(users_id.indexOf(socket.id),1);
        }
    });
    //new message get
    socket.on('postMsg', function(msg, color,server) {
        socket.broadcast.to(server).emit('newMsg', socket.nickname, msg, color);
    });
});
