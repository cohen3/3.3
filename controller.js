var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
        $scope.firstName = "Guest";
        $scope.lastName = "";
        $scope.username="";
        $scope.password="";
        $scope.City= "";
        $scope.Country= "";
        $scope.Email= "";
        $scope.Interest1= "";
        $scope.Interest2= "";
        $scope.Interests= "";
        $scope.Question= "";
        $scope.Answer= "";
        $scope.token = null;
        $scope.getName=function(){
            return  $scope.firstName+ $scope.lastName; };
        $scope.validuser = function() {
            $http.get('http://localhost:3000/login/' + $scope.username + '/' + $scope.password).then(function (res) {
                $scope.logged = res.data;
            alert(res.data)
            }).catch(function(res){alert(res.status);});
        };
});

