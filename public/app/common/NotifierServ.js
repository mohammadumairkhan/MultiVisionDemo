angular.module('app').value('ToastrServ', toastr);

angular.module('app').factory('NotifierServ', function(ToastrServ){
	return {
		success: function(msg){
			ToastrServ.success(msg);
			console.log(msg);
		},
		failure: function(msg){
			ToastrServ.error(msg);
			console.log(msg);
		}
	}
})