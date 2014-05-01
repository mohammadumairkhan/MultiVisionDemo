angular.module('app').controller('userListCtrl', function($scope, UserServ){
	$scope.users = UserServ.query();
});