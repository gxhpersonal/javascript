

hzc.controller('ChooseFight', ['$scope', '$http', function ($scope, $http) {
    //初始化

    $scope.goBack = function () {
        window.history.back();
    }
    $scope.showHeader = true;
    if (hzc.helper.notBrowser()) {
        $scope.showHeader = false;
    }
    $scope.ifByFlight = true;
    $scope.ifByCity = false;
    $scope.fight = {}
    $scope.city = {}

    var route = hzc.helper.getRouteParam();
    var type = route[2];
    var id = route[3];

    var ChooseFightInfo = $http({
        method: 'GET',
        url: hzc.helper.format("/api/FlightApi/ChooseFightInfo/{0}/{1}", type, id)
    });

    ChooseFightInfo.success(function (data, status, headers, config) {
        hzc.helper.hideloading();

        $scope.vm = data;

        $scope.getFlightCityByCity = function (city) {
            console.log(city);
            if (city == null) {
                return null;
            }
            return {
                CityCode: city.cc,
                Name: city.cn,
                IsFixed: false
            }
        }

        $scope.vm.TakeOffCity = $scope.getFlightCityByCity(JSON.parse(window.localStorage.getItem("ChooseFight_TakeOffCity")));
        $scope.vm.FallCity = $scope.getFlightCityByCity(JSON.parse(window.localStorage.getItem("ChooseFight_FallCity")));


        console.log($scope.vm);

        if (data.TakeOffCity) $scope.city.departCity = data.TakeOffCity.Name || ''
        if (data.FallCity) $scope.city.arriveCity = data.FallCity.Name || '';


        $scope.GetSelectedDate = function () {
            if ($scope.vm.DepartureDate) {
                return $scope.vm.DepartureDate.SelectedDate || '';
            }
            return '';
        }
        $scope.city.departTimeC = $scope.GetSelectedDate();
        $scope.fight.departTimeF = $scope.GetSelectedDate();




        $scope.navClick = function (index) {

            var checkedBottom = document.querySelector('#checked-bottom');
            var checkedBottomWidth = checkedBottom.offsetWidth;
            if (index === 0) {
                $scope.navChecked = true;
                $scope.ifByFlight = true;
                $scope.ifByCity = false;
                $scope.hideflightHis = false;
                $scope.hideCityHis = true;
                data.SelectedTabIsByFlightNumber = true;
                anime({
                    targets: checkedBottom,
                    translateX: 0,
                    easing: 'easeOutQuad',
                    duration: 300
                })
            } else if (index === 1) {
                $scope.navChecked = false;
                $scope.ifByFlight = false;
                $scope.ifByCity = true;
                $scope.hideflightHis = true;
                $scope.hideCityHis = false;
                data.SelectedTabIsByFlightNumber = false;
                anime({
                    targets: checkedBottom,
                    translateX: checkedBottomWidth,
                    easing: 'easeOutQuad',
                    duration: 300
                })
            }

        }

        if (data.SelectedTabIsByFlightNumber) {
            $scope.navClick(0)
        } else {
            $scope.navClick(1)
        }

        $scope.chooseCity = function (type) {
            window.location.href = hzc.helper.format("/Flight/ChooseCity/{0}/{1}", $scope.vm.Key, type);
        }

        $scope.submitFlightForm = function (form) {

            if (!$scope.fight.flightNumber || !$scope.fight.departTimeF) {
                hzc.helper.alertShow("请填写完整");
                return;
            }
            if (!/^([a-zA-Z0-9]){0,7}$/.test($scope.fight.flightNumber)) {
                hzc.helper.alertShow("请检查航班号");
                return;
            }

            setFlightHistory()
            window.location.href = hzc.helper.format("/Flight/FightList/{0}/{1}/{2}/{3}", type, id, $scope.fight.flightNumber, $scope.fight.departTimeF);
        }

        $scope.submitCityForm = function (form) {
            if (!data.TakeOffCity.CityCode || !data.FallCity.CityCode || !$scope.city.departTimeC) {
                hzc.helper.alertShow("请填写完整");
                return;
            }

            setCityHistory(data)
            window.location.href = hzc.helper.format("/Flight/FightList/{0}/{1}/{2}/{3}/{4}", type, id, data.TakeOffCity.CityCode, data.FallCity.CityCode, $scope.city.departTimeC);
        }

    })


    ChooseFightInfo.error(function (data, status, headers, config) {

        hzc.helper.hideloading();
        hzc.helper.alertShow("系统错误");
    })

    /***搜索历史******/
    $scope.byFlightSearchHistory = JSON.parse(window.localStorage.getItem('byFlightSearchHis')) || [];

    if ($scope.byFlightSearchHistory.length === 0) {
        $scope.hideflightHis = true
    } else {
        $scope.hideflightHis = false
    }
    $scope.byCitySearchHistory = JSON.parse(window.localStorage.getItem('byCitySearchHistory')) || [];
    if ($scope.byCitySearchHistory.length === 0) {
        $scope.hideCityHis = true
    } else {
        $scope.hideCityHis = false
    }

    function setFlightHistory() {
        $scope.hideflightHis = false
        $scope.byFlightSearchHistory.unshift({
            flightNumber: $scope.fight.flightNumber, departTimeF: $scope.fight.departTimeF
        });
        if ($scope.byFlightSearchHistory.length > 3) {
            $scope.byFlightSearchHistory.pop();
        }
        window.localStorage.setItem('byFlightSearchHis', JSON.stringify($scope.byFlightSearchHistory))
    }
    function setCityHistory(data) {
        $scope.hideCityHis = false
        $scope.byCitySearchHistory.unshift({
            departCityName: $scope.city.departCity,
            departCityCode: data.TakeOffCity.CityCode,
            arriveCityName: $scope.city.arriveCity,
            arriveCityCode: data.FallCity.CityCode,
            departTimeC: $scope.city.departTimeC
        });
        if ($scope.byCitySearchHistory.length > 3) {
            $scope.byCitySearchHistory.pop();
        }
        window.localStorage.setItem('byCitySearchHistory', JSON.stringify($scope.byCitySearchHistory))
    }
    $scope.deFlSeHi = function () {
        $scope.byFlightSearchHistory = []
        window.localStorage.setItem('byFlightSearchHis', JSON.stringify([]))
        $scope.hideflightHis = true;
    }
    $scope.hideCityHis = true;
    $scope.deCiSeHi = function () {
        $scope.byCitySearchHistory = []
        window.localStorage.setItem('byCitySearchHistory', JSON.stringify([]))
        $scope.hideCityHis = true;
    }
    /***搜索历史 end******/


    /****点击搜索历史**/
    $scope.reSearchF = function (flightNumber, departTimeF) {
        window.location.href = hzc.helper.format("/Flight/FightList/{0}/{1}/{2}/{3}", type, id, flightNumber, departTimeF);
    }
    $scope.reSearchC = function (departCityCode, arriveCityCode, departTimeC) {
        window.location.href = hzc.helper.format("/Flight/FightList/{0}/{1}/{2}/{3}/{4}", type, id, departCityCode, arriveCityCode, departTimeC);
    }

    /****点击搜索历史 end**/


}]);


//菜单部分指令
hzc.directive('nav', [function () {
    return {
        restrict: 'A',
        scope: false,
        compile: function (tElem, Attr) {
            return {
                pre: function (scope, iElem, iAttr) {
                    scope.navChecked = true;
                },
                post: function (scope, iElem, iAttr) {

                }
            }
        }
    }
}]);

//表单部分指令
hzc.directive('formWrap', [function () {
    return {
        restrict: 'A',
        compile: function (tElem, Attr) {
            return {
                pre: function (scope, iElem, iAttr) {
                    scope.showTimeBg = false;
                    scope.showTimeCon = false;
                },
                post: function (scope, iElem, iAttr) {

                    //初始化时间空间

                    var whichFormTime;

                    var picker = new Pikaday({
                        field: document.getElementById('field'),
                        minDate: new Date(),
                        firstDay: 0,
                        showMonthAfterYear: true,
                        yearSuffix: '年',
                        bound: false,
                        onSelect: function (date) {

                        },
                        container: document.getElementById('time-container'),
                        i18n: {
                            previousMonth: '上个月',
                            nextMonth: '下个月',
                            months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                            weekdays: ['日', '一', '二', '三', '四', '五', '六'],
                            weekdaysShort: ['日', '一', '二', '三', '四', '五', '六']
                        }
                    });
                    picker.hide()

                    //时间控件的显示隐藏效果
                    scope.chooseTimeF = function (whichForm) {
                        whichFormTime = whichForm;
                        scope.showTimeBg = true;
                        scope.showTimeCon = true;
                        picker.show()

                        anime({
                            targets: '#time-container',
                            translateY: [200, 0],

                        })
                    }
                    //点击确定
                    scope.sureTime = function () {

                        var date = picker.getDate();

                        var getFullYear = date.getFullYear();
                        var getMonth = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
                        var getDate = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
                        var timeString = getFullYear + '-' + getMonth + '-' + getDate;

                        if (whichFormTime === 'byFlight') {
                            scope.fight.departTimeF = timeString;
                        } else if (whichFormTime === 'byCity') {
                            scope.city.departTimeC = timeString;
                        }
                        scope.vm.DepartureDate.SelectedDate = timeString;
                        console.log(scope.vm)
                        scope.showTimeBg = false;
                        anime({
                            targets: '#time-container',
                            translateY: [0, 200],
                            easing: 'easeOutQuad',
                            duration: 300,
                            complete: function (animation) {
                                scope.$apply(function () {
                                    scope.showTimeCon = false;
                                    picker.hide()
                                })
                            }
                        })
                    }
                    //点击取消
                    scope.cancelTime = function () {
                        scope.showTimeBg = false;
                        anime({
                            targets: '#time-container',
                            translateY: [0, 200],
                            easing: 'easeOutQuad',
                            duration: 300,
                            complete: function (animation) {
                                scope.$apply(function () {
                                    scope.showTimeCon = false;
                                    picker.hide()
                                })
                            }
                        })
                    }
                }
            }
        }
    }
}])


