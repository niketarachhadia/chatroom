var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);
var online = 0;
io.on('connection', function (socket) {
    online++;	
    socket.broadcast.emit('message', online +'Clients are online');	
    console.log(online+'Client/s are online');
    socket.on('message', function(message) {
        console.log('Received message:', message);
        socket.broadcast.emit('message', message);
	socket.on('disconnect',function(){
		console.log('client disconnected');
		online--;
		console.log(online +'Clients are online');
		socket.broadcast.emit('message', online+'Clients are online');
	});
    });

});

server.listen(process.env.PORT || 8089);
