angular.module('app').factory('IdentityServ', function($window, UserServ){
	var currentUser;
	if($window.bootstrappedUser){
		currentUser = new UserServ();
		angular.extend(currentUser, $window.bootstrappedUser); 
	}
	return{
		currentUser: currentUser,
		isAuthenticated: function(){
			return !!this.currentUser;
		},
		isAuthorized: function(role){
			return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
		}
	}
})