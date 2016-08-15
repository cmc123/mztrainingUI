/**
 * @license Training Project
 * (c) 2015 美众信息  http://mezeron.cn
 * @description
 * Customer Module Controller
 * @author Neo 2016/7/18
 */

app.controller("CustListCtrl", ["$scope", "$timeout", "$rootScope","CustomerService",
    function ($scope, $timeout ,$rootScope,CustomerService) {

        // var params={username:"GZ22530"};
        // $rootScope.me=params;
    if(!$rootScope.me){
        appNavigator.pushPage('app/login/login.html');
        return;
    }
        $('#drop').click(function(event) {
            alert('ff');
            $('#toggleDiv').slideToggle("slow");
        });
        $scope.listValue={
            a:"客户",
            b:"员工"
        }
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
            a:"会员级别",
            b:"姓名",
            c:"年龄"
        };
        $scope.activitiesC={
            a:"升序",
            b:"降序"
        };
        $scope.loading = true;
        $scope.page = 1;
        $scope.pageSize =10;
        $scope.custList = [];
        $scope.hasMore = true;
        $scope.search=false;
        $scope.searchValue="";

        $scope.searchC=function(){
            $scope.search=true;
        }
        $scope.searchS=function () {
            $scope.search=!$scope.search;
            $scope.searchValue=null;
            $scope.loadCustomer();
        }

        $scope.searchM=function () {
            console.log("输入值:"+$scope.searchValue);
            $scope.loadCustomerBySearch();
        }

        $scope.loadCustomer=function () {
            console.log("进入方法loadCustomer");
            $scope.params = {page:1, pageSize:$scope.pageSize,username:$rootScope.me.username,
                birthQuery:$scope.engineer.currentActivityA,
                orderSpecFieldName:$scope.engineer.currentActivityB,
                orderSpec:$scope.engineer.currentActivityC};
            CustomerService.getCustomerList($scope.params).success(function(response){
                console.log("进入getCustomerList方法");
                $scope.custList =response.data;
                for(var i=0;i<$scope.custList.length;i++){
                    console.log($scope.custList[i].id);
                    if( $scope.custList[i].level==0){
                        $scope.custList[i].level='普卡会员';
                    }else if( $scope.custList[i].level==1){
                        $scope.custList[i].level='银卡会员';
                    }else if( $scope.custList[i].level==2){
                        $scope.custList[i].level='金卡会员';
                    }else if($scope.custList[i].level==3){
                        $scope.custList[i].level='钻卡会员';
                    }
                }
                $scope.hasMore = $scope.pageSize == response.data.length;
                $scope.loading = false;
            });
        };
        $scope.loadCustomer();

        $scope.loadCustomerByPage=function () {
            console.log("进入方法1");
            $scope.params = {page:$scope.page, pageSize:$scope.pageSize,username:$rootScope.me.username,
                birthQuery:$scope.params.birthQuery,
                orderSpecFieldName:$scope.params.orderSpecFieldName,
                orderSpec:$scope.params.orderSpec};
                console.log("页码："+$scope.page);
            if($scope.engineer.currentActivityA!=$scope.params.birthQuery) {
                // params= {page:$scope.page, pageSize:$scope.pageSize,username:$rootScope.me.username
                //     ,birthQuery:$scope.engineer.currentActivityA};
                console.log($scope.engineer.currentActivityA + ":" + $scope.params.birthQuery);
                $scope.params.birthQuery = $scope.engineer.currentActivityA;
                $scope.custList = [];
                $scope.params.page = 1;
                console.log($scope.params.page);
            }
            if($scope.engineer.currentActivityB!=$scope.params.orderSpecFieldName){
                console.log($scope.engineer.currentActivityB+":"+$scope.params.orderSpecFieldName);
                $scope.params.orderSpecFieldName=$scope.engineer.currentActivityB;
                $scope.custList=[];
                $scope.params.page=1;
                console.log($scope.params.page);
            }
            if($scope.engineer.currentActivityC!=$scope.params.orderSpec){
                console.log($scope.engineer.currentActivityC+":"+$scope.params.orderSpec);
                $scope.params.orderSpec=$scope.engineer.currentActivityC;
                $scope.custList=[];
                $scope.params.page=1;
                console.log($scope.params.page);
            }
            CustomerService.getCustomerList($scope.params).success(function(response){
                console.log("进入getCustomerList方法");
                console.log($scope.params.page);
                $scope.custList =$scope.custList.concat(response.data);
                for(var i=0;i<$scope.custList.length;i++){
                    console.log($scope.custList[i].id);
                    if( $scope.custList[i].level==0){
                        $scope.custList[i].level='普卡会员';
                    }else if( $scope.custList[i].level==1){
                        $scope.custList[i].level='银卡会员';
                    }else if( $scope.custList[i].level==2){
                        $scope.custList[i].level='金卡会员';
                    }else if($scope.custList[i].level==3){
                        $scope.custList[i].level='钻卡会员';
                    }
                }
                $scope.hasMore = $scope.pageSize == response.data.length;
                console.log($scope.custList);
                console.log($scope.hasMore);
                $scope.loading = false;
            });
        };

        $scope.loadCustomerBySearch=function () {
            console.log("进入方法loadCustomerBySearch");
            $scope.params = {page:1, pageSize:$scope.pageSize,username:$rootScope.me.username,
                birthQuery:$scope.params.birthQuery,
                orderSpecFieldName:$scope.params.orderSpecFieldName,
                orderSpec:$scope.params.orderSpec};
            if($scope.searchValue!=null){
                console.log("插入loadCustomerBySearch方法："+$scope.searchValue);
                $scope.params.search=$scope.searchValue;
            }
            console.log("页码："+$scope.page);
            CustomerService.getCustomerList($scope.params).success(function(response){
                console.log("进入getCustomerList方法");
                console.log($scope.params.page);
                $scope.custList =response.data;
                for(var i=0;i<$scope.custList.length;i++){
                    console.log($scope.custList[i].id);
                    if( $scope.custList[i].level==0){
                        $scope.custList[i].level='普卡会员';
                    }else if( $scope.custList[i].level==1){
                        $scope.custList[i].level='银卡会员';
                    }else if( $scope.custList[i].level==2){
                        $scope.custList[i].level='金卡会员';
                    }else if($scope.custList[i].level==3){
                        $scope.custList[i].level='钻卡会员';
                    }
                }
                // $scope.hasMore = $scope.pageSize == response.data.length;
                console.log($scope.custList);
                console.log($scope.hasMore);
                // $scope.loading = false;
            });
        };

        $scope.loadMore = function() {
            $scope.page = $scope.params.page;
            $scope.page=$scope.page+1;
            console.log("当前页为"+$scope.page);
            $scope.loadCustomerByPage();
        };

        $scope.gotoDetail = function (customerId) {
            appNavigator.pushPage("app/customer/detail.html", {data:{
                customerId: customerId
            }});
        };

        $scope.gotoCreate = function () {
            console.log("进入创建页面");
            appNavigator.pushPage("app/newCustomer/newCustomer.html");
        };


        $scope.loadEmployee=function () {
            appNavigator.pushPage("app/employee/employee.html");
        };

    }])
    .controller("CustDetailCtrl", ["$scope", "CustomerService",
        function ($scope, CustomerService) {

            var data = appNavigator.topPage.data;
            console.log(data);
            $scope.customerId = appNavigator.topPage.data.customerId;

            CustomerService.getCustomer($scope.customerId).success(function(response){
                $scope.customer = response.data;
                if( $scope.customer.level==0){
                    $scope.customer.level='普卡会员';
                }else if( $scope.customer.level==1){
                    $scope.customer.level='银卡会员';
                }else if( $scope.customer.level==2){
                    $scope.customer.level='金卡会员';
                }else if($scope.customer.level==3){
                    $scope.customer.level='钻卡会员';
                }

                console.log($scope.customer);
            });
            $scope.createChat=function(customerId,customerName) {
                appNavigator.pushPage("app/chat/chat.html",{data:{
                    id: customerId,
                    name:customerName
                }});
            };
    }])
;