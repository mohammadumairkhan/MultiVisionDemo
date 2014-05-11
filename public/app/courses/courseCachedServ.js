angular.module('app').factory('courseCachedServ', function(courseServ){
  var courseList;

  return {
    query : function(){
      if(!courseList)
        courseList = courseServ.query();
      return courseList
    }
  }
})
