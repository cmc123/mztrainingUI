/**
 * @license Training Project
 * (c) 2015 美众信息  http://mezeron.cn
 * @description
 * App Initialization
 * @author Neo 2016/7/18
 */

'use strict';

//定义App & 声明其依赖的模块和组件
var app = ons.bootstrap('mzTraining', ['onsen']);

//App加载完毕后执行的初始化操作
app.run(["$rootScope", function ($rootScope) {

    $rootScope.me=null;
    $rootScope.isEmpty = isEmpty;
    $rootScope.allOfMe=null;

}]);
//
// app.factory('sessionInjector', ['SessionService', function(SessionService) {
//     var sessionInjector = {
//         request: function(config) {
//             if (!SessionService.isAnonymus) {
//                 config.headers['x-session-token'] = SessionService.token;
//             }
//             return config;
//         }
//     };
//     return sessionInjector;
// }]);
// app.config(['$httpProvider', function($httpProvider) {
//     $httpProvider.interceptors.push('sessionInjector');
// }]);


