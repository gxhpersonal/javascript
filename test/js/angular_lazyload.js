var app = angular.module('myApp',['me-lazyload']);
app.controller('myAppController',['$scope','$http','$interval',function($scope, $http, $interval){
   var url = 'http://cdn.qiniu.activity.huizuche.com/route/index/H5_21.jpg?imageView2/1/q/80';
            var ary = [];
            for(var i = 0; i < 40; i++){
                ary.push(url + '&t=' + i + (+new Date()))
            }

            $scope.imgUrl = ary;
}])