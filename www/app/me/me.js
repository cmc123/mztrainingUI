/**
 * @license Training Project
 * (c) 2015 美众信息  http://mezeron.cn
 * @description
 * Me Module Controller
 * @author Neo 2016/7/18
 */

app.controller("MeCtrl", ["$scope", "$rootScope","employeeService",
    function($scope,$timeout, employeeService){

        $scope.page=1;
        $scope.pageSize=10;
        $scope.hasMore=true;

        $scope.loadEmployee = function() {
                var jobNumber=$scope.me.username;
                employeeService.getEmployee(jobNumber).success(function(response){
                $scope.emplyeeInfo =  response.data;
            });
        };
        $scope.loadEmployee();
        $scope.gotoDetailEmp = function (emplyeeId) {
            console.log("页面传值："+emplyeeId);
            appNavigator.pushPage("app/me/detail.html", {data:{
                emplyeeId: emplyeeId
            }});
        };
        $scope.me.newPassword="";
        $scope.me.newPassword1="";
        $scope.me.oldPassword="";
        $scope.changePassword=function(){
            console.log("修改密码");
            appNavigator.pushPage("app/me/changePassword.html");
        }
        $scope.gotoEmployeeCircle=function(employeeId) {
            appNavigator.pushPage("app/Circle/employeeCircle.html", {data:{
                employeeId:employeeId
        }});
        };
        $scope.exit=function(){
            console.log("退出登录");
            $scope.me=null;
            naviDialog.hide();
            appNavigator.resetToPage("app/login/login.html");
        }
        $scope.saveNewPassword=function () {
            console.log("保存新密码");
            if( $scope.me.newPassword!= $scope.me.newPassword1){
                $scope.errorMsg="重复新密码不一致，重新输入";
                return;
            }
            var params={jobNumber:$scope.me.username,password:$scope.me.newPassword,oldPassword:$scope.me.oldPassword};
            employeeService.changePassword(params).success(function(response){
                $scope.status = response.status;
                if($scope.status=='ok'){
                    console.log("更改成功");
                    appNavigator.popPage();
                }
                else{
                    $scope.errorMsg=response.errorMsg;
                }
            });
        }
        $scope.dialogs = {};

        $scope.show = function(dlg) {
            if (!$scope.dialogs[dlg]) {
                ons.createDialog(dlg).then(function(dialog) {
                    $scope.dialogs[dlg] = dialog;
                    dialog.show();
                });
            } else {
                $scope.dialogs[dlg].show();
            }
        }

        $scope.showEmployeeList=function () {
            var params={id:$scope.emplyeeInfo.id,page:$scope.page,pageSize:$scope.pageSize};
            console.log(params.id,params.page,params.pageSize);
            employeeService.getEmployeeList(params).success(function(response){
                if(response.status=='ok'){
                    console.log("返回得到员工数据的信息");
                    $scope.empList=$scope.concat(response.data);
                    $scope.hasMore=$scope.pageSize==response.data.length;
                }
                else{
                    $scope.errorMsg=response.errorMsg;
                }
            });
        }
        $scope.loadMore=function () {
            $scope.page=$scope.page+1;
            $scope.showEmployeeList();
        }
}
])
    .controller("EmptDetailCtrl", ["$scope", "employeeService",
    function ($scope, employeeService) {

        var data = appNavigator.topPage.data;
        console.log(data);
        $scope.emplyeeId = appNavigator.topPage.data.emplyeeId;
        console.log("id:"+$scope.emplyeeId);

        employeeService.getEmployeeById($scope.emplyeeId).success(function(response){
            $scope.employee = response.data;
            console.log($scope.employee);
        });

    }])
;


