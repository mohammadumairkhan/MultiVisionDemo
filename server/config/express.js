var express 	= require("express");
var stylus 		= require("stylus");
var morgan     	= require('morgan');
var bodyParser 	= require('body-parser');
var passport 	= require('passport');
var cookieParser= require('cookie-parser');
var session		= require('express-session');

module.exports = function(app, config){
	function compile(src, path){
		return stylus(src).set('filename', path);
	}

	app.set('views', config.rootPath + '/server/views');
	app.set('view engine', 'jade');
	app.use(morgan('dev'));
	app.use(cookieParser());
	app.use(bodyParser());
	app.use(session({secret: 'Bruce Wayne'}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(stylus.middleware(
		{
			src: config.rootPath + "/public",
			compile: compile
		}
	));

	app.use(express.static(config.rootPath + "/public"));
}