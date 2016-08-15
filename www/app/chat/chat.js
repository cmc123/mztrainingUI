/**
 * Created by Administrator on 2016/8/3.
 */
app.controller("chatListCtrl", ["$scope", "$rootScope","employeeService",
    function($scope,$timeout, employeeService){
        $scope.loadEmployee = function() {
            var jobNumber=$scope.me.username;
            employeeService.getEmployee(jobNumber).success(function(response){
                $scope.emplyeeInfo =  response.data;
            });
        };

        $scope.gotoChat=function (customerId,customerName) {
            console.log("23333333333");
            appNavigator.pushPage("app/chat/chat.html",{data:{
                customerId: customerId,
                customerName:customerName
            }});
        }
    }
]);

app.controller("chatCtrl", ["$scope", "$rootScope","employeeService","chatService",
    function($scope,$timeout, employeeService,chatService){
        var hour=new Date().getHours();
        var minutes=new Date().getMinutes();
        $scope.messageList=[];
        $scope.currentMessage='';
        if(hour<10){
            hour='0'+hour;
        }
        if(minutes<10){
            minutes='0'+minutes;
        }
        $scope.currenttime=hour+':'+minutes;
        var data = appNavigator.topPage.data;
        $scope.id = appNavigator.topPage.data.id;
        $scope.name = appNavigator.topPage.data.name;
        $scope.sendMessage=function () {
            $scope.messageList=$scope.messageList.concat($scope.currentMessage);
            var params={receiverId:$scope.id,senderName:$scope.me.username,message:$scope.currentMessage};
            chatService.sendOneMessage(params).success(function (response) {
                if(response.status=='ok'){
                    $scope.messageList=$scope.messageList.concat($scope.currentMessage);
                }
                else {
                    $scope.errorMsg=response.errorMsg;
                }
            })
            console.log($scope.messageList);
        }
        $scope.receiverMessageList=[];
        //每隔5秒刷新
//         setInterval(function(){
//              $scope.$apply($scope.receiverMessage('123'));
// }       ,5000,5);
        // $scope.askForMessage();
        $scope.receiverMessage=function (id) {
            console.log("请求聊天记录");
            var params={receiverId:id};
            chatService.receiveMessage(params).success(function (response) {
                if(response.status=='ok'){
                    $scope.receiverMessageList=$scope.receiverMessageList.concat(response.data.message);
                }else{
                    $scope.errorMsg=response.errorMsg;
                }
            })
        }
    }
]);