<?php

session_start();

?>

<html>
    <head>
    <title>FORM3</title>
       <script src="jsfolder/jquery-1.11.1.min.js" type="text/javascript"></script>
       <script src="jsfolder/common.js" type="text/javascript"></script>
        <script>
        //  var index=0;
          var index= parseInt('<?php echo $_SESSION['index']; ?>');  
        //  alert(index);
          previewQuestions(index);
        </script>     
    </head>
    <body> 
        <form action="" method="POST">
         <div id="here"> </div>
    <input type="hidden" name="filename" value="form3">
    </form>
    </body>
    
</html>