angular.module('app').factory('UserServ', function($resource){
	var UserResource = $resource('/api/users/:id', {_id: "@id"});

	UserResource.prototype.isAdmin = function() {
		return this.roles && this.roles.indexOf('admin') > -1;
	};

	return UserResource;
});