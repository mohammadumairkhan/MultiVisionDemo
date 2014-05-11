var Course = require('mongoose').model('Course');

exports.GetCourses = function(req, res){
  Course.find({}).exec(function(err, collection){
    res.send(collection);
  });
}

exports.GetCourseById = function(req, res){
  Course.findOne({_id: req.params.id}).exec(function(err, course){
    res.send(course);
  });
}
