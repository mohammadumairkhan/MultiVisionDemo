var Course = require('mongoose').model('Course');

exports.GetCourses = function(req, res){
  Course.find({}).exec(function(err, collection){
    res.send(collection);
  });
}
