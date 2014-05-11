angular.module('app').controller('courseDetailsCtrl', function($scope, courseCachedServ, $routeParams) {
  courseCachedServ.query().$promise.then(function(collection){
    collection.forEach(function(course){
      if(course._id === $routeParams.id)
        $scope.course = course;
    })
  })
});
