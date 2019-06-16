    var logged = false;
    var firstTimeInPage = true;
    $(document).ready(function(){

        //setTimeout(function(){ Pop();},1000);
        setTimeout(Pop, 1);
        // When the user clicks on <span> (x), close the modal
         $("#close").click(function(){
            $("#myModal").css("display", "none");
        });
        
        $("#reg").click(function(){
            $("#myModal").css("display", "none");
        });

        $("#log").click(function() {
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
        document.getElementById("myModal").style.display = "block";
        setTimeout(Pop, 60000);
    }