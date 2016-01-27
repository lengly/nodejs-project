var redis = require('redis');
var client = redis.createClient();

// 扔一个漂流瓶
exports.throw = function(bottle, callback) {
	bottle.time = bottle.time || Date.now();
	// 为每个漂流瓶随机生成一个id
	var bottleId = Math.random().toString(16);
	var type = {male: 0, female: 1};
	// 根据漂流瓶类型的不同将漂流瓶保存到不同的数据库
	client.SELECT(type[bottle.type], function() {
		// 以hash类型保存漂流瓶对象
		client.HMSET(bottleId, bottle, function(err, result) {
			if (err) {
				return callback({code: 0, msg: "过会再扔吧"});
			}
			// 返回结果 成功时返回OK
			callback({code: 1, msg: result});
			// 设置漂流瓶生存期为1天
			client.EXPIRE(bottleId, 86400);
		});
	});
}

// 捡一个漂流瓶
exports.pick = function(info, callback) {
	var type = {all: Math.round(Math.random()), male: 0, female: 1};
	info.type = info.type || "all";
	// 根据请求的瓶子类型到不同的数据库中取
	client.SELECT(type[info.type], function() {
		// 随机返回一个漂流瓶id
		client.RANDOMKEY(function(err, bottleId) {
			if (!bottleId) {
				return callback({code: 0, msg: "大海空空如也..."});
			}
			// 根据漂流瓶id取到漂流瓶完整信息
			client.HGETALL(bottleId, function(err, bottle) {
				if (err) {
					return callback({code: 0, msg: "漂流瓶破损了..."});
				}
				// 返回结果 成功时包含捡到的漂流瓶信息
				callback({code: 1, msg: bottle});
				// 从Redis中删除该漂流瓶
				client.DEL(bottleId);
			});
		});
	});
}
