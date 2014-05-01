angular.module('app').controller('loginCtrl', function($scope, AuthServ, IdentityServ, NotifierServ, $location){
	$scope.identity = IdentityServ;
	$scope.signin = function(){
		AuthServ.authenticateUser($scope.username, $scope.password).then(function(res){
			NotifierServ.success("Successfully logged in !");
		}, function(res){
			NotifierServ.failure("Username/Password is incorrect");	
		})
	}

	$scope.signout = function(){
		AuthServ.logoutUser().then(function(){
			$scope.username = "";
			$scope.password	= "";
			NotifierServ.success("You have successfully logged out!");
			$location.path('/');
		})
	}
});

