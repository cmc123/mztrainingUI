/**
 * @license Training Project
 * (c) 2015 美众信息  http://mezeron.cn
 * @description
 * Services
 * @author Neo 2016/7/18
 */

app.factory('CustomerService', ['$http', function ($http) {

    return {
        getCustomerList: function (params) {
            console.log("发送参数请求客户列表"+params)
            return $http.post(appConfig.baseUrl + "customer/listByEmployee", params);
        },
        getCustomer: function (id) {
            return $http.get(appConfig.baseUrl + "customer/getById/" + id);
        },
    };
}]);


app.factory('employeeService', ['$http', function ($http) {

    return {
        getEmployee: function (jobNumber) {
            console.log("加载个人信息:"+jobNumber);
            return $http.get(appConfig.baseUrl+"employee/getByJobNumber/"+jobNumber);
        },
        getEmployeeById: function (employeeId) {
            console.log("进入最后的getEmployeeById"+employeeId)
            return $http.get(appConfig.baseUrl+"employee/getById/"+employeeId);
        },
        changePassword: function (params) {
            return $http.post(appConfig.baseUrl+"employee/changePassword/",params);
        },
        getEmployeeList:function (params) {
            console.log("发出请求");
            return $http.post(appConfig.baseUrl+"employee/getEmployeeList",params);
        }
    };
}]);

app.factory('loginService', ['$http', function ($http) {

    return {
        getLoginSuccess: function (params) {
            return $http.post(appConfig.baseUrl+"employee/login/", params);
        },
    };
}]);

app.factory('createService', ['$http', function ($http) {

    return {
        createCustomer: function (customer,jobNumber) {
            return $http.post(appConfig.baseUrl+"employee/createNewCustomer/", customer,jobNumber);
        },
    };
}]);

app.factory('circleService',['$http',function($http){
    return{
        getMyCircle:function (params) {
            console.log("进入circleService方法");
            return $http.post(appConfig.baseUrl+"circle/getCircleList/",params);
        },
        createMyCircle:function (params) {
            console.log("进入createMyCircle方法");
            return $http.post(appConfig.baseUrl+"circle/createMyCircle",params);
        },
        addCircleLike:function (params) {
            console.log("进入addCircleLike方法");
            return $http.post(appConfig.baseUrl+"circle/addCircleLike",params);
        },
        addMyComment:function (params) {
            console.log("进入addMyComment方法");
            return $http.post(appConfig.baseUrl+"circle/addCircleComment",params);
        }
    };
}]);
app.factory('chatService',['$http',function($http){
    return{
        sendOneMessage:function (params) {
            console.log("进入sendOneMessage方法");
            return $http.post(appConfig.baseUrl+"chat/sendMyChat/",params);
        },
        receiveMessage:function (params) {
            console.log("请求receiveMessage方法");
            return $http.post(appConfig.baseUrl+"chat/getMyChat/",params);
        }
    };
}]);
