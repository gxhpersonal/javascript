var hzc = angular.module('app',[])
.controller('appcontroller',['$scope','$http',function($scope,$http){
	$scope.aaa = 123;

}])
.directive('memberTip',function(){
	return{
       restrict: 'A',
       scope: false,
        templateUrl: 'template/membertip.html',
        replace: true
	}
})
// template/membertip.html