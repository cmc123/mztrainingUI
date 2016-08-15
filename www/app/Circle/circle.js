/**
 * Created by Administrator on 2016/8/5.
 */
app.controller("CircleCtrl", ["$scope", "$rootScope","employeeService","circleService",
    function ($scope, $rootScope, employeeService,circleService) {

        $scope.page = 1;
        $scope.pageSize =3;
        $scope.empList = [];
        $scope.hasMore = false;
        $scope.placeHolder="写入你的评论";

        var data = appNavigator.topPage.data;
        console.log(data);
        $scope.employeeId = data.employeeId;
        console.log("circle页面得到的employeeId"+$scope.employeeId);
        employeeService.getEmployeeById($scope.employeeId).success(function(response){
            $scope.employee = response.data;
            console.log($scope.employee);
        });

        // $scope.loadMycirclePullDown=function(){
        //     $scope.empList = [];
        //     var params={id:$scope.employeeId,page:1,pageSize:$scope.pageSize};
        //     circleService.getMyCircle(params).success(function (response) {
        //         if(response.status=='ok'){
        //             $scope.empList=response.data;
        //         }
        //         else{
        //             $scope.errorMsg=response.errorMsg;
        //         }
        //     })
        // }
        $scope.loadMyCircle=function (pulldown) {
            if(pulldown=='pulldown'){
                $scope.page=1;
            }
            var params={id:$scope.employeeId,page:$scope.page,pageSize:$scope.pageSize};
            circleService.getMyCircle(params).success(function (response) {
                console.log("进入getMyCircle方法");
                if(pulldown=='pulldown'){
                    $scope.empList=response.data;
                }else{
                    $scope.empList=$scope.empList.concat(response.data);
                }
                for(var i=($scope.page-1)*$scope.pageSize;i<$scope.empList.length;i++){
                    var dateTemp=new Date($scope.empList[i].createdTime);
                    var hour=dateTemp.getHours();
                    if(hour<10){
                        hour='0'+hour;
                    }
                    var minute=dateTemp.getMinutes();
                    if(minute<10){
                        minute='0'+minute;
                    }
                    var date=dateTemp.getDate();
                    if(new Date().getDate()-date==1){
                        $scope.empList[i].createdTime="昨天"+hour+':'+minute;
                    }
                   else if(new Date().getDate()==date){
                        $scope.empList[i].createdTime=hour+':'+minute;
                    }else{
                        $scope.empList[i].createdTime=date+'号:'+hour+':'+minute;
                    }
                    $scope.empList[i].waitingToWrite=false;
                    $scope.empList[i].showClickButton=false;
                    $scope.empList[i].myComment="";
                    console.log($scope.empList[i].createdTime);
                    if($scope.empList[i].clickLikes.length>0){
                        var clickLikesSize=$scope.empList[i].clickLikes.length;
                        $scope.empList[i].clickLikesTemp=[];
                        for(var j=0;j<clickLikesSize-1;j++){
                            $scope.empList[i].clickLikesTemp[j]=$scope.empList[i].clickLikes[j];
                        }
                        $scope.empList[i].clicklikesLast=$scope.empList[i].clickLikes[clickLikesSize-1].employee.name;
                    }
                }
                $scope.hasMore = $scope.pageSize == response.data.length;
                $scope.loading = false;
            })
        }
        $scope.loadMyCircle();

        $scope.showClick=function (circleId) {
            for(var i=0;i<$scope.empList.length;i++){
                if($scope.empList[i].id==circleId){
                    $scope.empList[i].showClickButton=!$scope.empList[i].showClickButton;
                }
            }
        }
        $scope.toWrite=function (circleId) {
            for(var i=0;i<$scope.empList.length;i++){
                if($scope.empList[i].id==circleId){
                    $scope.empList[i].waitingToWrite=true;
                    $scope.empList[i].showClickButton=false;
                }
            }
        }
        $scope.toReply=function (circleId,commentId) {
            for(var i=0;i<$scope.empList.length;i++){
                if($scope.empList[i].id==circleId){
                    $scope.empList[i].waitingToWrite=true;
                    $scope.empList[i].showClickButton=false;
                    for(var j=0;j<$scope.empList[i].comment.length;j++){
                        if($scope.empList[i].comment[j].id==commentId){
                            $scope.placeHolder="回复"+$scope.empList[i].comment[j].employee.name;
                            $scope.replyEmployeeId=$scope.empList[i].comment[j].employee.id;
                        }
                    }
                }
            }
        }

        $scope.recover=function (circleId) {
            for(var i=0;i<$scope.empList.length;i++){
                $scope.placeHolder="";
                if($scope.empList[i].id==circleId){
                    // $scope.empList[i].waitingToWrite=false;
                    $scope.empList[i].showClickButton=false;
                }
            }
        }


        $scope.addComment=function (circleId,myComment) {

            var params={circleId:circleId,id:$scope.employeeId,myComment:myComment};
            if($scope.replyEmployeeId!=null){
                params.replyEmployeeId=$scope.replyEmployeeId;
            }
            console.log(params.circleId+params.id+myComment);
            circleService.addMyComment(params).success(function (response) {
                var status=response.status;
                if(status=='ok'){
                    console.log("评论成功");
                    $scope.placeHolder="";
                    $scope.replyEmployeeId="";
                    for(var i=0;i<$scope.empList.length;i++){
                        if($scope.empList[i].id==circleId){
                            console.log("添加我的评论并在页面实时更新");
                            $scope.empList[i].comment=$scope.empList[i].comment.concat(response.data);
                            $scope.empList[i].myComment="";
                            $scope.empList[i].waitingToWrite=false;
                            $scope.empList[i].showClickButton=false;
                        }
                    }
                }
            })
        }
        $scope.addLike=function(circleId){
            var params={id:$scope.employeeId,circleId:circleId};
            circleService.addCircleLike(params).success(function (response) {
                var status=response.status;
                if(status=='ok'){
                    console.log("点赞成功:"+circleId);
                    console.log(response.data);
                    for(var i=0;i<$scope.empList.length;i++){
                        if($scope.empList[i].id==circleId){
                            $scope.empList[i].clickLikes=$scope.empList[i].clickLikes.concat(response.data);
                            var clickLikesSize= $scope.empList[i].clickLikes.length;
                            console.log(clickLikesSize);
                            console.log(clickLikesSize);
                            $scope.empList[i].clickLikesTemp=[];
                            for(var j=0;j<clickLikesSize-1;j++){
                                $scope.empList[i].clickLikesTemp[j]=$scope.empList[i].clickLikes[j];
                            }
                            $scope.empList[i].clicklikesLast=$scope.empList[i].clickLikes[clickLikesSize-1].employee.name;
                            console.log($scope.empList[i].clicklikesLast);
                            $scope.empList[i].waitingToWrite=false;
                            $scope.empList[i].showClickButton=false;
                        }
                    }
                }else{
                    $scope.errorMsg=response.errorMsg;
                }
            })
        }
        $scope.loadMore = function() {
            $scope.page=$scope.page+1;
            console.log("当前页为"+$scope.page);
            $scope.loadMyCircle();
        };

        $scope.gotocreteCircle = function (employeeId) {
            console.log("页面传值："+employeeId);
            appNavigator.pushPage("app/Circle/createCircle.html", {data:{
                employeeId: employeeId
            }});
        };
    }])
.controller("createCircleCtrl", ["$scope", "$rootScope","circleService",
    function ($scope, $rootScope,circleService) {
        console.log("进入创建员工圈页面");
        $scope.message="";
        var data = appNavigator.topPage.data;
        $scope.employeeId = data.employeeId;
        $scope.createMyCircle=function () {
                var params={message:$scope.message,id:$scope.employeeId};
                console.log(params);
            circleService.createMyCircle(params).success(function (response) {
                var status=response.status;
                if(status=='ok'){
                    console.log("233333333333");
                    appNavigator.popPage();
                }else{
                    $scope.errorMsg=response.errorMsg;
                }
            })
            }
    }])
;
