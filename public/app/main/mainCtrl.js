angular.module('app').controller('mainCtrl', function($scope, courseCachedServ){
	$scope.courses = courseCachedServ.query();
});
