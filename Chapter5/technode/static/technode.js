angular.module('technodeApp', []);

angular.module('technodeApp').factory('socket', function($rootScope) {
	var socket = io.connect('/');
	return {
		on: function(eventName, callback) {
			socket.on(eventName, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					callback.apply(socket, args);
				});
			});
		},
		emit: function(eventName, data, callback) {
			socket.emit(eventName, data, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					if (callback) {
						callback.apply(socket.args);
					}
				});
			});
		}
	}
});

angular.module('technodeApp').controller('RoomCtrl', function($scope, socket) {
	$scope.messages = [];
	socket.emit('getAllMessages');

	socket.on('allMessages', function(messages) {
		$scope.messages = messages;
	});

	socket.on('messageAdded', function(message) {
		$scope.messages.push(message);
	});
});

angular.module('technodeApp').controller('MessageCreatorCtrl', function($scope, socket) {
	$scope.newMessage = '';

	$scope.createMessage = function() {
		if ($scope.newMessage == '') {
			return;
		}
		socket.emit('createMessage', $scope.newMessage);
		$scope.newMessage = '';
	}
});

angular.module('technodeApp').directive('autoScrollToBottom', function() {
	return {
		link: function(scope, element, attrs) {
			scope.$watch(function() {
				return element.children().length;
			}, function() {
				element.animate({
					scrollTop: element.prop('scrollHeight')
				}, 1000);
			});
		}
	}
});

angular.module('technodeApp').directive('ctrlEnterBreakLine', function() {
	return function(scope, element, attrs) {
		var ctrlDown = false;
		element.bind("keydown", function(evt) {
			if (evt.which === 17) {
				ctrlDown = true;
				setTimeout(function() {
					ctrlDown = false;
				}, 1000);
			}
			if (evt.which === 13) {
				if (ctrlDown) {
					element.val(element.val() + '\n');
				} else {
					scope.$apply(function() {
						scope.$eval(attrs.ctrlEnterBreakLine);
					});
					evt.preventDefault();
				}
			}
		});
	}
});
