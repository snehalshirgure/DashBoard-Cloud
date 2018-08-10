<head> 
    <title>FORM4</title>
    <script src="jsfolder/jquery-1.11.1.min.js" type="text/javascript"></script>
    <script src="jsfolder/common.js" type="text/javascript"></script>
    </head>
    <form action="" method="POST">
            <b>Details: </b></br></br>
            Enter your Name:<input type="text" name="name" id="name"></br></br>
            Enter age: <input type="number" id="age" name="age" min="1"></br></br>
            
    <input type="hidden" name="filename" value="form4">
    <input type="hidden" name="details" value="Submit">
    <input type="submit" name="detais" value="Submit" onclick="return validateDetails()">       
    </form>
    </body>
</html>