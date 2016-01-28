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

// 回复特定id的漂流瓶
exports.reply = function(_id, reply, callback) {
	reply.time = reply.time || Date.now().toString();
	// 通过id找到要回复的漂流瓶
	bottleModel.findById(_id, function(err, _bottle) {
		if (err) {
			return callback({code: 0, msg: "回复漂流瓶失败..."});
		}
		var newBottle = {};
		newBottle.bottle = _bottle.bottle;
		newBottle.message = _bottle.message;
		// 如果捡瓶子的人第一次回复漂流瓶 则在bottle键前	添加漂流瓶主人
		// 如果已经回复过漂流瓶 则不再添加
		if (newBottle.bottle.length === 1) {
			newBottle.bottle.push(_bottle.message[0][0]);
		}
		// 在message键添加一条回复信息
		newBottle.message.push([reply.user, reply.time, reply.content]);
		// 更新数据库中该漂流瓶信息
		bottleModel.findByIdAndUpdate(_id, newBottle, function(err, bottle) {
			if (err) {
				return callback({code: 0, msg: "回复漂流瓶失败..."});
			}
			// 成功时返回更新后的漂流瓶信息
			callback({code: 1, msg: bottle});
		});
	});
}

// 删除特定id的漂流瓶
exports.delete = function(_id, callback) {
	// 通过id查找并删除漂流瓶
	bottleModel.findByIdAndRemove(_id, function(err) {
		if (err) {
			return callback({code: 0, msg: "删除漂流瓶失败..."});
		}
		callback({code: 1, msg: "删除成功!"});
	});
}
