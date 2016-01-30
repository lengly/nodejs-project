Template.container.helpers({
	currentUrl : function() {
		return Session.get("currentUrl");
	}
});

Template.nav.helpers({
	active : function() {
		return Session.get("currentUrl");
	}
});

var urlRouter = Backbone.Router.extend({
	routes: {
		"": "index",
		"login": "login",
		"reg": "reg"
	},
	index: function() {
		Session.set("currentUrl", {index: "active", login: "", reg: ""});
	},
	login: function() {
		Session.set("currentUrl", {index: "", login: "active", reg: ""});
	},
	reg: function() {
		Session.set("currentUrl", {index: "", login: "", reg: "active"});
	},
	redirect: function(url) {
		this.navigate(url, true);
	}
});


Router = new urlRouter;

Meteor.startup(function() {
	Backbone.history.start({pushState: true});
});
