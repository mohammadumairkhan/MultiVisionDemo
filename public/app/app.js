var app = angular.module('app', ['ngResource', 'ngRoute']);
app.config(function($routeProvider, $locationProvider){
	//$locationProvider.html5Mode(true);
	var routeRuleChecks = {
		admin:{
			auth: function(AuthServ){
				return AuthServ.authorizeCurrentUserForRoute('admin');
			}
		},
		user:{
			auth: function(AuthServ){
				return AuthServ.authorizeAuthenticatedUserForRoute();
			}
		}
	}

	$routeProvider
		.when('/',{
			templateUrl: 'partials/main/main',
			controller: 'mainCtrl'
		})
		.when('/admin/users',{
			templateUrl: 'partials/admin/user-list',
			controller: 'userListCtrl',
			resolve: routeRuleChecks.admin
		})
		.when('/signup',{
			templateUrl: 'partials/account/signup',
			controller: 'signupCtrl'
		})
		.when('/profile',{
			templateUrl: 'partials/account/profile',
			controller: 'profileCtrl',
			resolve: routeRuleChecks.user
		})
		.when('/courses',{
			templateUrl: 'partials/courses/course-list',
			controller: 'courseListCtrl'
		})
});

app.run(function ($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
		if(rejection === "not authorized")
			$location.path('/');

	})
})
