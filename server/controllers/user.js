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