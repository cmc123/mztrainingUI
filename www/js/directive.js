/**
 * @license Training Project
 * (c) 2015 美众信息  http://mezeron.cn
 * @description
 * Directives
 * @author Neo 2016/7/18
 */

/**
 * 加载中指令
 */
app.directive('trLoading', function () {
    return {
        scope: {
            loadingIndicator: "=",
        },
        restrict: 'E',
        replace: true,
        template: '<div class="tr-loading" ng-show ="loadingIndicator"><ons-icon  icon="ion-load-c" spin="true"></ons-icon></div>',
    };
});