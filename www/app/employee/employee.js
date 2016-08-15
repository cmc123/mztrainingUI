
app.controller("empListCtrl", ["$scope", "$timeout", "$rootScope","employeeService",
    function ($scope, $timeout ,$rootScope,employeeService) {

        $scope.engineer={
            currentActivityA:"1",
            currentActivityB:"1",
            currentActivityC:"1"
        };
        $scope.activitiesA={
            a:"所有人",
            b:"本月生日",
            c:"下月生日"
        };
        $scope.activitiesB={
            a:"所有人",
            b:"店长",
            c:"顾问",
            d:"美容师",
            e:"行政"
        };
        $scope.activitiesC={
            a:"升序",
            b:"降序"
        };
        $scope.loading = true;
        $scope.page = 1;
        $scope.pageSize =5;
        $scope.employeeList = [];
        $scope.hasMore = true;
        $scope.search=false;
        $scope.searchValue="";


        $scope.searchC=function(){
            $scope.search=true;
        }
        $scope.searchS=function () {
            $scope.search=!$scope.search;
            $scope.searchValue=null;
            $scope.loadEmployee();
        }

        $scope.searchM=function () {
            console.log("输入值:"+$scope.searchValue);
            $scope.loadEmployeeBySearch();
        }

        $scope.loadEmployee=function () {
            console.log("进入方法loadEmployee");
            $scope.params = {page:1, pageSize:$scope.pageSize,username:$rootScope.me.username,
                birthQuery:$scope.engineer.currentActivityA,
                roleName:$scope.engineer.currentActivityB,
                orderSpec:$scope.engineer.currentActivityC};
            employeeService.getEmployeeList($scope.params).success(function(response){
                console.log("进入getEmployeeList方法");
                $scope.employeeList =response.data;
                $scope.hasMore = $scope.pageSize == response.data.length;
                $scope.loading = false;
            });
        };
        $scope.loadEmployee();

        $scope.loadEmployeeByPage=function () {
            console.log("进入方法loadEmployeeByPage");
            $scope.params = {page:$scope.page, pageSize:$scope.pageSize,username:$rootScope.me.username,
                birthQuery:$scope.params.birthQuery,
                roleName:$scope.params.roleName,
                orderSpec:$scope.params.orderSpec};
            console.log("页码："+$scope.page);
            if($scope.engineer.currentActivityA!=$scope.params.birthQuery) {
                console.log($scope.engineer.currentActivityA + ":" + $scope.params.birthQuery);
                $scope.params.birthQuery = $scope.engineer.currentActivityA;
                $scope.employeeList = [];
                $scope.params.page = 1;
                console.log($scope.params.page);
            }
            if($scope.engineer.currentActivityB!=$scope.params.roleName){
                console.log($scope.engineer.currentActivityB+":"+$scope.params.roleName);
                $scope.params.roleName=$scope.engineer.currentActivityB;
                $scope.employeeList=[];
                $scope.params.page=1;
                console.log($scope.params.page);
            }
            if($scope.engineer.currentActivityC!=$scope.params.orderSpec){
                console.log($scope.engineer.currentActivityC+":"+$scope.params.orderSpec);
                $scope.params.orderSpec=$scope.engineer.currentActivityC;
                $scope.employeeList=[];
                $scope.params.page=1;
                console.log($scope.params.page);
            }
            employeeService.getEmployeeList($scope.params).success(function(response){
                console.log("进入getEmployeeList方法");
                console.log($scope.params.page);
                $scope.employeeList =$scope.employeeList.concat(response.data);
                $scope.hasMore = $scope.pageSize == response.data.length;
                console.log($scope.employeeList);
                console.log($scope.hasMore);
                $scope.loading = false;
            });
        };

        $scope.loadEmployeeBySearch=function () {
            console.log("进入方法loadEmployeeBySearch");
            $scope.params = {page:1, pageSize:$scope.pageSize,username:$rootScope.me.username,
                birthQuery:$scope.params.birthQuery,
                roleName:$scope.params.roleName,
                orderSpec:$scope.params.orderSpec};
            if($scope.searchValue!=null){
                $scope.params.search=$scope.searchValue;
            }
            console.log("页码："+$scope.page);
            employeeService.getEmployeeList($scope.params).success(function(response){
                console.log($scope.params.page);
                $scope.employeeList =response.data;
                // $scope.hasMore = $scope.pageSize == response.data.length;
                console.log($scope.hasMore);
                // $scope.loading = false;
            });
        };

        $scope.loadMore = function() {
            $scope.page = $scope.params.page;
            $scope.page=$scope.page+1;
            console.log("当前页为"+$scope.page);
            $scope.loadEmployeeByPage();
        };

        $scope.gotoDetail = function (employeeId) {
            appNavigator.pushPage("app/employee/detail.html", {data:{
                employeeId: employeeId
            }});
        };

    }])
    .controller("StoreEmpDetailCtrl", ["$scope", "employeeService",
        function ($scope, employeeService) {

            var data = appNavigator.topPage.data;
            console.log(data);
            $scope.employeeId = appNavigator.topPage.data.employeeId;

            employeeService.getEmployeeById($scope.employeeId).success(function(response){
                $scope.employee = response.data;
                console.log($scope.employee);
            });
            $scope.createChat=function(employeeId,employeeName) {
                appNavigator.pushPage("app/chat/chat.html",{data:{
                    id: employeeId,
                    name:employeeName
                }});
            };
        }])
;
