var UserController     = require('../controllers/user');
var CourseController  = require('../controllers/course');
var auth 		          = require('./auth');
module.exports = function(app){

	app.get('/api/users', auth.requiresRole("admin"), UserController.GetAllUsers);
	app.post('/api/users', UserController.CreateUser);
	app.put('/api/users', UserController.UpdateUserInRequest, UserController.UpdateUser);


  app.get('/api/courses', CourseController.GetCourses);

	app.get('/partials/*', function(req, res){
		res.render('../../public/app/' + req.params[0]);
	});

	app.post('/login',auth.authenticate);

	app.post('/logout', function(req, res){
		req.logout();
		res.end();
	});

  app.all('/api/*', function(req, res){
    res.send(404);
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
