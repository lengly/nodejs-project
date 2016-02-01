var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var User = require('./models/user.js');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cookieParser());
app.use(session({
	secret: 'technode',
	resave: true,
	saveUninitialized: false,
	cookie: {
		masAge: 60 * 1000
	}
}));

app.use(express.static(path.join(__dirname, '/static')));

var port = process.env.PORT || 3000;
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

app.get('/api/validate', function(req, res) {
	var _userId = req.session._userId;
	if (_userId) {
		User.findUserById(_userId, function(err, user) {
			if (err) {
				res.status(401).json({msg: err});
			} else {
				res.status(200).json(user);
			}
		});
	} else {
		res.status(401).json();
	}
});

app.post('/api/login', function(req, res) {
	var email = req.body.email;
	if (email) {
		User.findByEmailOrCreate(email, function(err, user) {
			if (err) {
				res.status(500).json({msg: err});
			} else {
				req.session._userId = user._id;
				res.status(200).json(user);
			}
		});
	} else {
		res.status(403).json();
	}
});

app.get('/api/logout', function(req, res) {
	req.session._userId = null;
	res.status(200).json();
});

app.use(function(req, res) {
	res.sendFile(path.join(__dirname, './static/index.html'));
});
