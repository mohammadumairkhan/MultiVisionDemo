angular.module('app').controller('profileCtrl', ['$scope', 'NotifierServ', 'AuthServ', 'IdentityServ', function ($scope, NotifierServ, AuthServ, IdentityServ) {
	$scope.User = {};
	$scope.User.firstName = IdentityServ.currentUser.firstName;
	$scope.User.lastName = IdentityServ.currentUser.lastName;
	$scope.User.username = IdentityServ.currentUser.username;

	$scope.update = function(){
		AuthServ.updateCurrentUser($scope.User).then(function(res){
			NotifierServ.success("User profile updated!")
		}, function(res){
			NotifierServ.failure(res);
		});
	}
}]);