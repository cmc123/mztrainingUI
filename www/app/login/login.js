/**
 * Created by Administrator on 2016/7/28.
 */
app.controller("loginCtrl",["$scope","$rootScope","loginService",
    function($scope,$rootScope,loginService){
        $scope.username="";
        $scope.password="";
       $scope.submitLoginForm = function() {
            var params = {username:$scope.username, password:$scope.password};
            loginService.getLoginSuccess(params).success(function (response) {
                $scope.loginInfo=response.status;
                $rootScope.me=params;
                // console.log("登录返回的信息"+$scope.loginInfo);
                if($scope.loginInfo=="ok"){
                    console.log("成功跳转登录成功");
                    appNavigator.pushPage('index.html');
                }
                else{
                    $scope.errorMsg=response.errMsg;
                }
            })
        };
}]);
