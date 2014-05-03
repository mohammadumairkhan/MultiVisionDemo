 var UserController = require('../controllers/user');
var auth 		= require('./auth');
module.exports = function(app){

	app.get('/api/users', auth.requiresRole("admin"), UserController.GetAllUsers);
	app.post('/api/users', UserController.CreateUser);


	app.get('/partials/*', function(req, res){
		res.render('../../public/app/' + req.params[0]);
	});

	app.post('/login',auth.authenticate);

	app.post('/logout', function(req, res){
		req.logout();
		res.end();
	});

	app.get('*', function(req, res){
		var loggedInUser;
		if(req.user){
			loggedInUser = {
				username: req.user.username,
				firstName: req.user.firstName,
				lastName: req.user.lastName,
				roles: req.user.roles
			}
		}

		res.render('index', {
			bootstrappedUser: loggedInUser
		});
	});
}

