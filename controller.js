var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http, $window, $q) {
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
    $scope.passwordR="";
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
            var lst =["question1","question2"];
            $scope.q_num = Math.floor(Math.random() * 2);
            var q_select=lst[$scope.q_num];
            $scope.Question1 = res.data[q_select];
            document.getElementById("sec_q1").style.display = "inline";
            document.getElementById("forgot-btn2").style.display = "inline"
        }).catch(function(res){alert("question problem "+res.status);});
    };
    $scope.getpass = function() {
        $scope.Answer2 = $scope.Answer1;
        $http.get('http://localhost:3000/getpassword/' + $scope.tmpname+ '/' + $scope.Answer1+ '/' + $scope.Answer2).then(function (res) {
            $scope.passwordR=res.data;
            document.getElementById("text_per_pass").style.display = "inline"
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

    $scope.clickSliderOne = function()
    {
        clickedSlider("txt1");
    }
    $scope.clickSliderTwo = function()
    {
        clickedSlider("txt2");
    }
    $scope.clickSliderThree = function()
    {
        clickedSlider("txt3");
    }

    function clickedSlider(slider){
        var poi_name = document.getElementById(slider);
        var prom1 = $http.get('http://localhost:3000/getpoibyname/'+poi_name.innerText)
        var prom2 = $http.get('http://localhost:3000/getTopReviewsByName/'+poi_name.innerText);
        $q.all([prom1, prom2]).then(function(results){
            document.getElementById('poi_view').style.display = "block";
            document.getElementById('poi_img').src = results[0].data['picture_link'];
            document.getElementById('details').innerText = results[0].data['description'];
            document.getElementById('rev1').innerText = results[1].data[0]['review'];
            document.getElementById('rev2').innerText = results[1].data[1]['review'];
            var rank = parseFloat(results[0].data['rank']);
            rank = rank*100;
            document.getElementById('rankper').innerText = rank+"%";
        });
    }
});

angular.element(document).ready(function () {
    // alert("page ready");
    // var a = document.getElementById("test");
    // a.innerText = "loaded";
    });