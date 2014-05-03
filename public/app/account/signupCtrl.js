angular.module('app').controller('signupCtrl', function($scope, AuthServ, NotifierServ, $location){
	$scope.signup = function(){
		AuthServ.createUser($scope.User).then(function(){
			NotifierServ.success("User acconut created !");
			$location.path('/');
		}, function(reason){
			NotifierServ.failure(reason);
		})
	}
});