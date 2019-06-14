var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http, $window) {
    getRecommended();
    $scope.resp = "";
    $scope.isin = false;
    $scope.tmpname="";
    $scope.firstName = "";
    $scope.lastName = "";
    $scope.username="Guest";
    $scope.password="";
    $scope.City= "";
    $scope.Country= "";
    $scope.Email= "";
    $scope.Interest1= "";
    $scope.Interest2= "";
    $scope.Interests= "";
    $scope.Question1= "";
    $scope.Answer1= "";
    $scope.Question2= "";
    $scope.Answer2= "";
    $scope.token = null;
    var slideIndex = 0;
    var values = [];
    showSlides();
    function getRecommended()
    {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/rand3POI/0.2',
          }).then(function(response) {
              $scope.resp = response.data[0]['picture_link'];
              values = response.data;
            }).catch(function(error){
                alert("here"+error.status);
            });
    }

    function showSlides() {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("dot");
        if(values.length > 0){
            for (i = 0; i < slides.length; i++){
                slides[i].style.display = "none";
            }
            document.getElementById('txt1').innerText = values[0]['name'];
            document.getElementById('txt2').innerText = values[1]['name'];
            document.getElementById('txt3').innerText = values[2]['name'];

            document.getElementById('im1').src = values[0]['picture_link'];
            document.getElementById('im2').src = values[1]['picture_link'];
            document.getElementById('im3').src = values[2]['picture_link'];
            // $scope.txt2 = values[1]['name'];
            // $scope.txt3 = values[2]['name'];
            slideIndex++;
            if (slideIndex > slides.length) {slideIndex = 1}
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[slideIndex-1].style.display = "block";
            dots[slideIndex-1].className += " active";
        }
        setTimeout(showSlides, 4000); // Change image every 2 seconds
    }
    $scope.getName=function(){
        return  $scope.firstName+ $scope.lastName; };
        $scope.validuser = function() {
            $http.get('http://localhost:3000/login/' + $scope.tmpname + '/' + $scope.password).then(function (res) {
                $scope.isin=true;
                $scope.username=$scope.tmpname;
                alert("welcome "+$scope.username);
                $window.sessionStorage.setItem($scope.username,res.data);
            }).catch(function(res){alert("wrong username or password");});
    };
    $scope.getq = function() {
       
        $http.get('http://localhost:3000/getquestion/' + $scope.tmpname).then(function (res) {
            $scope.Question = res.data;
            document.getElementById("sec_q").style.display = "inline";
            alert(res.data)
        }).catch(function(res){alert("question problem "+res.status);});
    };
    $scope.register = function(){
        try{
        var parameter =                {type:"user",
                                        username:$scope.tmpname,
                                        password:$scope.password,
                                        first_name:$scope.firstName,
                                        last_name:$scope.lastName,
                                        question1:$scope.Question1,
                                        answer1:$scope.Answer1,
                                        question2:$scope.Question2,
                                        answer2:$scope.Answer2,
                                        city:$scope.City,
                                        country:$scope.Country,
                                        email:$scope.email,
                                        interest1:$scope.Interest1,
                                        interest2:$scope.Interest2,
                                        interests:$scope.Interests
                                        };
                                    }
                                    catch(error)
                                    {
                                        alert(error);
                                    }
        $http.post('http://localhost:3000/adduser', parameter).then(function successCallback(response) {
            alert(response.data);
        }, function errorCallback(response) {
            alert(response.status);
        });
    }
});

angular.element(document).ready(function () {
    // alert("page ready");
    // var a = document.getElementById("test");
    // a.innerText = "loaded";
    });