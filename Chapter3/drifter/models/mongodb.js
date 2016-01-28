var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/drifter');

// 定义漂流瓶模型 并设置数据存储到bottles集合
var bottleModel = mongoose.model('Bottle', new mongoose.Schema({
	bottle: Array,
	message: Array
}, {
	collection: 'bottles'
}));

// 将用户捡到漂流瓶改变格式存储
exports.save = function(picker, _bottle, callback) {
	var bottle = {bottle: [], message: []};
	bottle.bottle.push(picker);
	bottle.message.push([_bottle.owner, _bottle.time, _bottle.content]);
	bottle = new bottleModel(bottle);
	bottle.save(function(err) {
		callback(err);
	});
}

// 获取用户捡到的所有漂流瓶
exports.getAll = function(user, callback) {
	bottleModel.find({"bottle": user}, function(err, bottles) {
		if (err) {
			return callback({code: 0, msg: '获取漂流瓶列表失败...'});
		}
		callback({code: 1, msg: bottles});
	});
}

// 获取特定id的漂流瓶
exports.getOne = function(_id, callback) {
	// 通过id获取特定的漂流瓶
	bottleModel.findById(_id, function(err, bottle) {
		if (err) {
			return callback({code: 0, msg: "读取漂流瓶失败"});
		}
		// 成功时返回找到的漂流瓶
		callback({code: 1, msg: bottle});
	});
}
