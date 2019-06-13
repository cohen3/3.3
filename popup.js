var logged = false;
    var firstTimeInPage = true;
    $(document).ready(function(){

        //setTimeout(function(){ Pop();},1000);
        Pop();
        // When the user clicks on <span> (x), close the modal
         $("#close").click(function(){
            $("#myModal").css("display", "none");
        });
        
        $("#reg").click(function(){
            $("#myModal").css("display", "none");
        });

        // When the user clicks anywhere outside of the modal, close it
        $.onclick = function(event) {
          if (event.target == modal) {
            $$("#myModal").css("display", "none");
          }
        }
    });
    function Pop()
    {
        if(logged == true) return;
        if(firstTimeInPage == false) return;
        firstTimeInPage = false;
        document.getElementById("myModal").style.display = "block";
    }