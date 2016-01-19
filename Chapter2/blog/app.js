var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var multer = require('multer');

var routes = require('./routes/index');
var settings = require('./settings');

var fs = require('fs');
var accessLog = fs.createWriteStream('access.log', {flags: 'a'});
var errorLog = fs.createWriteStream('error.log', {flags: 'a'});
var app = express();

var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;

app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(logger({stream: accessLog}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(err, req, res, next) {
  var meta = '[' + new Date() + ']' + req.url + '\n';
  errorLog.write(meta + err.stack + '\n');
  next();
});
app.use(session({
  secret: settings.cookieSecret,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}, //30 days 
  url: settings.url
}));
app.use(flash());
app.use(multer({
  dest: './public/images',
  rename: function(fieldname, filename) {
    return filename;
  }
}));
app.use(passport.initialize());

if (app.get('env') == 'development') {
  passport.use(new GithubStrategy({
    clientID: "xxx",
    clientSecret: "xxx",
    callbackURL: "http://localhost:3000/login/github/callback"
  }, function(accessToken, refreshToken, profile, done) {
    done(null, profile);
  }));
}

routes(app);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
