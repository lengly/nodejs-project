var express = require('express');
var app = express();
var path = require('path');

var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/static')));
app.use(function(req, res) {
	res.sendFile(path.join(__dirname, './static/index.html'));
});

var server = app.listen(port, function() {
	console.log('technode is on port ' + port + '!');
});

var io = require('socket.io').listen(server);

var messages = []

io.sockets.on('connection', function(socket) {
	socket.on('getAllMessages', function() {
		socket.emit('allMessages', messages);
	});	
	socket.on('createMessage', function(message) {
		messages.push(message);
		io.sockets.emit('messageAdded', message);
	});
});
