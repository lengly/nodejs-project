var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/technode');
var garvatar = require('gravatar');

var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	avatarUrl: String
}, {
	collection: 'users'
});

var userModel = mongoose.model('User', userSchema);

exports.findUserById = function(_userId, callback) {
	userModel.findOne({
		_id: _userId
	}, callback);
}

exports.findByEmailOrCreate = function(email, callback) {
	userModel.findOne({
		email: email
	}, function(err, user) {
		if (user) {
			callback(null, user);
		} else {
			var user = {name: email.split('@')[0], email: email, avatarUrl: garvatar.url(email)}
			user = new userModel(user);
			user.save(callback);
		}
	});
}
