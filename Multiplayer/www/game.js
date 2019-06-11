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
            document.title = 'hichat | ' + document.getElementById('nicknameInput').value;
            document.getElementById('loginWrapper').style.display = 'none';
            document.getElementById('messageInput').focus();
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
            document.getElementById('status').textContent = userCount + (userCount > 1 ? ' users' : ' user') + ' online';
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
            if (e.keyCode == 13) {
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
    },
    _displayNewMsg: function(user, msg, color,server) {
            console.log(msg + " "+user+" "+server);
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
