var app = angular.module('myApp', ['ngSanitize']);

app.controller('myCtrl', function($scope, $http, $window, $q, $timeout) {
    checkKeys();
    getRecommended();
    getcountries();
    getcategories();
    $scope.resp = "";
    $scope.isin = false;
    $scope.tmpname="";
    $scope.firstName = "";
    $scope.lastName = "";
    $scope.username="";
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
    checkLoggedUserOnStartUp();
    var time = 6;
    var slideIndex = 0;
    var values = [];
    showSlides();
    setWelcomeDiv();
    function checkKeys()
    {
        if($window.sessionStorage.getItem("lastuser") === null)
            $window.sessionStorage.setItem("lastuser", '');
        if($window.sessionStorage.getItem("token") === null)
            $window.sessionStorage.setItem("token", '');
    }

    function setWelcomeDiv()
    {
        if($window.sessionStorage.getItem("lastuser") != '')
        {
            GetLoggedUserInfo();
            document.getElementById('reg_up').style.display = 'none';
            document.getElementById('log_up').style.display = 'none';
            document.getElementById('menubtn').style.display = "block";
        }
        else
        {
            $scope.firstName = "Guest";
            document.getElementById('reg_up').style.display = 'inline';
            document.getElementById('log_up').style.display = 'inline';
        }
    }

    function GetLoggedUserInfo()
    {
        var currectUser = $window.sessionStorage.getItem("lastuser");
        var req = {
            method: 'GET',
            url: 'http://localhost:3000/logged/getuser/'+currectUser,
            headers: {
                'x-auth-token': $window.sessionStorage.getItem("token")
            }
        };
        $http(req)
        .then(function(response){
            $scope.firstName = response.data[0]['first_name'];
        }).catch(function(error){
            alert(error.data);
        });
    }

    function checkLoggedUserOnStartUp(){
        if($window.sessionStorage.getItem("lastuser") != '')
        {
            var name = $window.sessionStorage.getItem("lastuser");
            logged = true;
            $scope.loginstatus = "Disconnect";
            $scope.username = name;
            document.getElementById('reg_up').style.display = 'none';
            document.getElementById('log_up').style.display = 'none';
            document.getElementById('menubtn').style.display = "block";
        }
        else
        {
            logged = false;  
            $scope.username = "Guest";
            $scope.loginstatus = "Login";
            $window.sessionStorage.setItem("lastuser", '');
            $window.sessionStorage.setItem("token", '');
            document.getElementById('reg_up').style.display = 'inline';
            document.getElementById('log_up').style.display = 'inline';
        }
    }
    
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
            document.getElementById('title_rec').innerText = "Recommended Place: \n"+values[slideIndex-1]['name'];
        }
        setTimeout(showSlides, 4000); // Change image every 2 seconds
    }

    $scope.getName=function(){
        return  $scope.firstName + $scope.lastName; 
    };

    /**
     * login method 
     */    
    $scope.validuser = function() {
        if(logged == false){
            $http.get('http://localhost:3000/login/' + $scope.tmpname + '/' + $scope.password).then(function (res) {
                $scope.isin=true;
                $scope.username=$scope.tmpname;
                $scope.firstName = ' ';
                // alert("welcome "+$scope.username);
                $window.sessionStorage.setItem("token",res.data);
                $window.sessionStorage.setItem("lastuser",$scope.username);
                $scope.loginstatus = "Disconnect";
                logged = true;
                closeDivs(false, true, true, true,true, true,true, true);
                document.getElementById('welcome').style.display = "block";
                document.getElementById('menubtn').style.display = "block";
                setWelcomeDiv();

            }).catch(function(res){alert("wrong username or password");});
        }
        else
        {
            $scope.loginstatus = "Login";
            $window.sessionStorage.setItem("token",null);
            $window.sessionStorage.setItem("lastuser",null);
            $scope.username = "Guest";
            logged = false;
            setWelcomeDiv();
        }
        
    };


    $scope.disconnect = function(){
        if(logged)
        {
            $scope.loginstatus = "Login";
            $window.sessionStorage.setItem("token",'');
            $window.sessionStorage.setItem("lastuser",'');
            $scope.username = "Guest";
            logged = false;
            document.getElementById('menubtn').style.display = "none";
            setWelcomeDiv();
        }
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
        var a1 = "__";
        var a2 = "__";
        if($scope.q_num == 0) a1 = $scope.Answer1;
        else a2 = $scope.Answer1; 
        $http.get('http://localhost:3000/getpassword/' + $scope.tmpname+ '/' + a1+ '/' + a2).then(function (res) {
            $scope.passwordR=res.data;
            document.getElementById("text_per_pass").style.display = "inline"
            document.getElementById('timer').style.display = "block";
            try{
                time = 6;
                $timeout(timer, 1);
            }
            catch(error){alert(error);}
        }).catch(function(res){alert("Wrong answer "+res.status);});
    };
    

    var timer = function() {
        if( time > 0 ) {
            time -= 1;
            document.getElementById('timer').innerText = "Disappear after: "+time+" seconds.";
            $timeout(timer, 1000);
        }
        else
        {
            $scope.passwordR='';
            $scope.Question1 = '';
            $scope.Answer1 = '';
            document.getElementById("text_per_pass").style.display = "none"
            document.getElementById('timer').style.display = "none";
            document.getElementById("sec_q1").style.display = "none";
            document.getElementById("forgot-btn2").style.display = "none"
        }
    }

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
            var r1 = '1) No Reviews Posted.';
            var r2 = '2) No Reviews Posted.';
            if(results[1].data.length > 0){
                r1 = '1) '+results[1].data[0]['review'];
                if(results[1].data.length > 1)
                    r2 = '2) '+results[1].data[1]['review'];
            }
            document.getElementById('rev1').innerText = r1;
            document.getElementById('rev2').innerText = r2;
            var rank = parseFloat(results[0].data['rank']);
            rank = rank*100;
            document.getElementById('rankper').innerText = rank+"%";
        }).catch(function(error){
            alert(error);
        });
    }

    function getcountries(){
        $http.get('http://localhost:3000/getcountries').then(function (res) {
            $scope.countries=res.data;
        }).catch(function(res){});
    };

    function getcategories(){
        $http.get('http://localhost:3000/categories').then(function (res) {
            $scope.categories=[];
            for(var i=0;i<res.data.length;i++){
                $scope.categories.push(res.data[i].category)
            }
        }).catch(function(res){});
    };

    /**
     * get poi by category
     */
    $scope.getpoicat=function(){
        var poicat = document.getElementById('cats').value;
        $http({
            url: 'http://localhost:3000/getAllPOIsbyCat/', 
            method: "GET",
            params: {category:poicat}
         }).then(function (res) {
            $scope.poisbycat=res.data;
            buildPOITable();
            if(document.getElementById("myCheck").checked){
                sortTable();
            }
        }).catch(function(res){alert(res.status+" here");});
    };

    /**
     * get poi by its name
     */
    $scope.getpoiname=function(){
        var poiname = document.getElementById('poiname').value;
        $http.get('http://localhost:3000/getpoibyname/'+poiname).then(function (res) {
            $scope.pois=res.data;
            alert(res.data.ID);
        }).catch(function(res){alert(res.status);});
    };

    function getUser(){
        var currectUser = $window.sessionStorage.getItem("lastuser");
        if(currectUser === '') return null;
        var req = {
            method: 'GET',
            url: 'http://localhost:3000/logged/getuser/'+currectUser,
            headers: {
                'x-auth-token': $window.sessionStorage.getItem("token")
            }
        };
        return $http(req);
    }

    $scope.sidebarClickPOIs = function()
    {
        document.getElementById('splittedDiv').style.display = "none";
        document.getElementById('loggedUserDiv').style.display = "block";
        $scope.loggedUser = "<h1> here are your current POIs: </h1>";
        var params = {
            username:$window.sessionStorage.getItem('lastuser')
        };
        var req = {
            method: 'GET',
            url: 'http://localhost:3000/logged/usergetPOI',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem("token")
            },
            params: {
                username:$window.sessionStorage.getItem('lastuser')
            }
        };
        alert("ok");
        var userdata = $http(req);
        userdata.then(function(response){
            var promises = [];
            for(var i = 0; i < response.data.length; i = i+1)
            {
                promises.push($http.get('http://localhost:3000/getpoibyID/'+response.data[i]));
            }
            $q.all(promises).then(function(response2){
                alert("ok2");
            });
        }).catch(function(res){alert(res.status);});
    };

    $scope.sidebarInterests = function()
    {
        document.getElementById('splittedDiv').style.display = "none";
        document.getElementById('loggedUserDiv').style.display = "block";
        $scope.loggedUser = "<h1> here are your Interests: </h1>";
    };

    $scope.sidebarSettings = function()
    {
        document.getElementById('splittedDiv').style.display = "none";
        document.getElementById('loggedUserDiv').style.display = "block";
        $scope.loggedUser = "<h1> Settings: </h1>";
        var userdata = getUser();
        userdata.then(function(response){
            $scope.loggedUser += "<table border=\"1\" id=\"datatable\" style=\"background-color: #f1f1c1;\">";
            $scope.loggedUser += "<tr style=\"padding: 15px;text-align: left;\">";
            $scope.loggedUser += "<th>Settings</th>";
            $scope.loggedUser += "<th>Value</th>";
            $scope.loggedUser += "</tr>";
            angular.forEach(response.data[0], function(value, key){
                $scope.loggedUser += "<tr style=\"padding: 15px;text-align: left;\">";
                $scope.loggedUser += "<td>"+key+"</td>";
                $scope.loggedUser += "<td>"+value+"</td>";
                $scope.loggedUser += "</tr>";
           });
           $scope.loggedUser += "</table>";
        }).catch(function(res){});

    };

    $scope.sidebarhome = function()
    {
        document.getElementById('loggedUserDiv').style.display = "none";
        $scope.loggedUser = "";
        document.getElementById('splittedDiv').style.display = "block";
    }

    function buildPOITable() {
        document.getElementById('excelDataTable').innerHTML = "";
        var columns = addAllColumnHeaders($scope.poisbycat);
        for (var i = 0 ; i <$scope.poisbycat.length ; i++) {
            var row$ = $('<tr/>');
            for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
                var cellValue = $scope.poisbycat[i][columns[colIndex]];
                //alert("cellValue is "+cellValue+" type is "+typeof(cellValue));
                if (cellValue == null) { cellValue = ""; }
                else if(colIndex==columns.length-1){
                    row$.append($('<td/>').html("<img src=\""+cellValue+"\" width=\"300\" height=\"300\"></img>"));
                }
                else{row$.append($('<td/>').html(cellValue));}
            }
            $("#excelDataTable").append(row$);
        }
        document.getElementById('excelDataTable').style.display = "block";
    }

    function addAllColumnHeaders(myList)
    {
        var columnSet = [];
        var headerTr$ = $('<tr/>');
        for (var i = 0 ; i < myList.length ; i++) {
            var rowHash = myList[i];
            for (var key in rowHash) {
                if ($.inArray(key, columnSet) == -1){
                    columnSet.push(key);
                    headerTr$.append($('<th/>').html(key));
                }
            }
        }
        $("#excelDataTable").append(headerTr$);
    
        return columnSet;
    }

});

// app.controller('loggedController', function($scope, $http, $window, $q, $timeout) {
//     $scope.logged_controller = "hello from logged controller";
// });

angular.element(document).ready(function () {
    // alert("page ready");
    // var a = document.getElementById("test");
    // a.innerText = "loaded";
    });