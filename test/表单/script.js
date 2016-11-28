angular.module('docsTimeDirective',[])
.controller('Ctrl2', function($scope,$location,$http,$timeout,$interval,hexafy) {
    $scope.format = 'M/d/yy h:mm:ss a';

    $scope.aaa = false;
    $scope.do_something = function(){
    	alert('clicked');
    	$scope.aaa = true;
    }
    $scope.lastname = "121212";
    $scope.names = [
       {'name':'jack','country':'china','sex':'man'},
       {'name':'nick','country':'austrilear','sex':'woman'},
       {'name':'rose','country':'rouma','sex':'man'}
    ];
    $scope.myUrl = $location.absUrl();
    $scope.theTime = new Date().toLocaleTimeString();
    $scope.number = 1;
    $interval(function(){
       $scope.myUrl = "suprice!!!";
       $scope.theTime = new Date().toLocaleTimeString();
       $scope.number ++;
    },1000);
    $scope.hex = hexafy.myFunc(244);
    var nums = 255;
    $scope.scale = nums.toString(16);

     $scope.xingm = [
	    {site : "Google", url : "http://www.google.com"},
	    {site : "Runoob", url : "http://www.runoob.com"},
	    {site : "Taobao", url : "http://www.taobao.com"}
	];
    //$scope.selected='2';//id的值，区分类型
    $scope.selected=$scope.xingm[0].url;//如果想要第一个值

    $scope.counts = 0;

    $scope.showHide = true;
    $scope.toggle = function(){
    	$scope.showHide = !$scope.showHide;
    }

    $scope.user = 'joijh Yueson';
    $scope.email = 'joijh@hzc.com';



  })
   .service('hexafy',function(){
  	this.myFunc = function(x){
        return x.toString(16);
  	}
  })
  .directive('myCurrentTime', function($timeout, dateFilter) {

    function link(scope, element, attrs) {
      var format,
          timeoId;

      function updateTime() {
        element.text(dateFilter(new Date(), format));
      }

      scope.$watch(attrs.myCurrentTime, function(value) {
        format = value;
        updateTime();
      });

      function scheduleUpdate() {
        // save the timeoutId for canceling
        timeoutId = $timeout(function() {
          updateTime(); // update DOM
          scheduleUpdate(); // schedule the next update
        }, 1000);
      }

      element.on('$destroy', function() {
        $timeout.cancel(timeoutId);
      });

      // start the UI update process.
      scheduleUpdate();
    }

    return {
      // link: link,
      template:"I'm at directive creation",
    };

  })
  