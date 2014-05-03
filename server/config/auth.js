var passport 		= require('passport');
exports.authenticate =  function(req, res, next){
	req.body.username = req.body.username.toLowerCase();
	var auth = passport.authenticate('local', function(err, user){
		if(err) {return next(err);}
		if(!user){res.status(401).send({success: false});}
		req.login(user, function(err){
			if(err){return next(err);}
			var loggedInUser = {
				username: user.username,
				firstName: user.firstName,
				lastName: user.lastName,
				roles: user.roles
			}
			res.send({success:true, user: loggedInUser});
		})
	});
	auth(req, res, next);
}

exports.requiresApiLogin = function(req, res, next){
	if(!req.isAuthenticated()){
		res.status(403).send();
	}
	else{
		next();
	}
}

exports.requiresRole = function(role){
	return function(req, res, next){
		if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1)
			res.status(401).end();
		else
			next();
	}
}