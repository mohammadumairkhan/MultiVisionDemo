angular.module('app').controller('mainCtrl', function($scope){
	$scope.courses = [
		{name: 'Knight Riders', featured: true, published: new Date()},
		{name: 'Death Dealers', featured: false, published: new Date()},
		{name: 'Storm Bringers', featured: false, published: new Date()},
		{name: 'Crome Masters', featured: true, published: new Date()},
		{name: 'Steel Warriors', featured: true, published: new Date()},
		{name: 'Soul Stealers', featured: false, published: new Date()},
	]
});