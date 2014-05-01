angular.module('app').factory('AuthServ', function($http, IdentityServ, UserServ, $q){
	return{
		authenticateUser: function(username, password){
			return $http.post('/login', {username: username, password: password})
				.then(function(res){
					if(res.data.success){
						var user  = new UserServ();
						angular.extend(user, res.data.user);
						IdentityServ.currentUser = user;
						return true
					}
					else{
						return false;
					}
				})
		},
		logoutUser: function(){
			return $http.post('/logout', {logout: true}).then(function(res){
				IdentityServ.currentUser = undefined;
				return true;
			});
		},
		authorizeCurrentUserForRoute: function(role){
			if(IdentityServ.isAuthorized(role))
				return true;
			else
				return $q.reject("not authorized");
		}

	}
})