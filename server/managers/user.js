var mongoose 		= require('mongoose');
var User 			= mongoose.model('User');

exports.GetAllUsers = function(req, res){
	User.find({}).exec(function(err, collection){
		res.send(collection);
	});
}