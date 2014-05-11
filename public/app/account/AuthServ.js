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
		},
		createUser: function(newUserData){
			var newUser = new UserServ(newUserData);

			return newUser.$save().then(function(res){
				IdentityServ.currentUser = newUser;
				return true;
			}, function(res){
				throw res.data.reason;
			})
		},
		authorizeAuthenticatedUserForRoute: function(){
			if(IdentityServ.isAuthenticated())
				return true;
			else
				return $q.reject("not authenticated");
		},
		updateCurrentUser: function(updatedUserData){
			var userClone = angular.copy(IdentityServ.currentUser);
			angular.extend(userClone, updatedUserData);
			return userClone.$update(function(res){
				IdentityServ.currentUser = userClone;
				return true;
			}, function(res){
				throw res.data.reason;
			});
		}

	}
})