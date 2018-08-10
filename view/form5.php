<?php
session_start();
?>

<html>
<head> 
    <title>FORM5</title>
    <script src="jsfolder/jquery-1.11.1.min.js" type="text/javascript"></script>
    <script src="jsfolder/common.js" type="text/javascript"></script>
    <script>loadSurvey();</script>
    </head>
    <body>
    <form action="" method="POST">
    
    <b>NAME:</b> <?php echo $_SESSION['name']; ?>  </br>    
    <b>AGE:</b> <?php echo $_SESSION['age']; ?>    </br></br>  
    
    <div id="survey"> </div>
    
    <input type="hidden" name="filename" value="form5">
    <input type="hidden" name="final" value="Submit">
    <input type="submit" name="final" value="Go To Form1">       
    </form>
    </body>
</html>