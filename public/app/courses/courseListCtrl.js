angular.module('app').controller('courseListCtrl', function($scope, courseCachedServ){
    $scope.courses = courseCachedServ.query();
    $scope.sortOptions = [
      {value: 'title', text:'sort by title'},
      {value:'published', text:'sort by published date'}
    ];

    $scope.sortOrder = $scope.sortOptions[0].value;
})
