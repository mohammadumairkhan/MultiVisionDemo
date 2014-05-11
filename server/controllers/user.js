var User 	= require('mongoose').model('User');
var encrypt = require('../utilities/encryption');

exports.GetAllUsers = function(req, res){
	User.find({}).exec(function(err, collection){
		res.send(collection);
	});
}

exports.CreateUser = function(req, res, next){
	var userData = req.body;
	userData.username = userData.username.toLowerCase();
	userData.salt = encrypt.createSalt();
	userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
	User.create(userData, function(err, user){
		if(err){
			if(err.toString().indexOf('E11000') > -1)
				err = new Error("Duplicate Username");
			res.status(400);
			return res.send({reason: err.toString()});
		}
		else{
				req.login(user, function(err){
				if(err) {return next(err);}
				res.send(user);
			});

		}
	})
}

exports.UpdateUser = function(req, res, next){
	var userData = req.body;
	console.log(JSON.stringify(userData));
	if(req.user._id != userData._id && !req.user.hasRole('admin')){
		res.status(403);
		return res.end();
	}

	req.user.firstName = userData.firstName;
	req.user.lastName = userData.lastName;
	req.user.username = userData.username;

	if(userData.password && userData.password.length > 0){
		req.user.salt = encrypt.createSalt();
		req.user.hashed_pwd = encrypt.hashPwd(req.user.salt, userData.password);
	}

	req.user.save(function(err){
		if(err){
			if(err.toString().indexOf('E11000') > -1)
				err = new Error("Duplicate Username");
			res.status(400);
			return res.send({reason: err.toString()});
		}
		else
			res.send(req.user);
		});
	}

GetUserByUsername = function(username){
	console.log('Getting username from database');
	return User.find({username: username});
}

exports.UpdateUserInRequest = function(req, res, next){
	console.log('requesting user in request');
	GetUserByUsername(req.body.username).exec(function(err, collection){
		console.log('database query complete');
		if(err){
			console.log('user not found');
			res.status(403);
			res.end();
		}
		else{
			console.log('User found');
			req.body._id = collection[0]._id;
			console.log('user id : ' + req.body._id);
			next();
		}

	})
}
