var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http) {
    getRecommended();
    $scope.firstName = "";
    $scope.lastName = "";
    $scope.resp = "";
    var slideIndex = 0;
    var values = [];
    showSlides();
    $scope.foo1 = function() {
        return $scope.firstName + " " + $scope.lastName;
    };
    $scope.foo2 = function() {
        return $scope.lastName + " " + $scope.firstName;
    };
    function getRecommended()
    {
        //cat = _.sample(cat, 2)
        $http({
            method: 'GET',
            url: 'http://localhost:3001/rand3POI/0.2',
          }).then(function(response) {
              $scope.resp = response.data[0]['picture_link'];
              values = response.data;
            }).catch(function(error){
                alert(error.status);
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
});

angular.element(document).ready(function () {
    // alert("page ready");
    // var a = document.getElementById("test");
    // a.innerText = "loaded";
});