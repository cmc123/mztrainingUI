/**
 * Created by Administrator on 2016/8/1.
 */
app.controller("createCtrl",["$scope","$rootScope","createService",
    function($scope,$rootScope,createService){
        console.log("进入createCtrl方法");
        $scope.newCustomer={
            sex:"",
            customerName:"",
            phoneNumber:"",
            birthYear:'',
            birthMonth:'',
            birthDay:''
        };
        // $scope.customer;
        $scope.birthYears={
            1:1970,2:1971,3:1972,4:1973,5:1974,6:1975,7:1976,8:1977,9:1978,10:1979,
            11:1980,12:1981,13:1982,14:1983,15:1984,16:1985,17:1986,18:1987,19:1988,20:1989,
            21:1990,22:1991,23:1992,24:1993,25:1994,26:1995,27:1996,28:1997,29:1998,30:1999,
            31:2000,32:2001,33:2002,34:2003,35:2004

        };
        $scope.birthMonths={
            1:1,2:2,3:3, 4:4,5:5,6:6,7:7,8:8,9:9,10:10,11:11,l2:12
        };
        $scope.birthDays={
            1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:10,
            11:11,12:12,13:13,14:14,15:15,16:16,17:17,18:18,19:19,20:20,
            21:21,22:22,23:23,24:24,25:25,26:26,27:27,28:28,29:29,30:30,31:31
        };
        $scope.createMyCustomer = function() {
            console.log("进入createMyCustomer方法");
            var params = {birthYear:$scope.newCustomer.birthYear, birthMonth:$scope.newCustomer.birthMonth,
                birthDay:$scope.newCustomer.birthDay,
                sex:$scope.newCustomer.sex,
                name:$scope.newCustomer.customerName,
                phoneNumber:$scope.newCustomer.phoneNumber,
                jobNumber:$scope.me.username};
            // var customer=$scope.customer;
            // var jobNumber=$scope.me.username;

                console.log(params.birthDay);
            createService.createCustomer(params).success(function(response){
                $scope.status=response.status;
                if($scope.status=="ok"){
                    console.log("新建客户成功");
                            appNavigator.pushPage('index.html');
                }
                else{
                    $scope.errorMsg=response.errMsg;
                }
            })
        };
    }]);
