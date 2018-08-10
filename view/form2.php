
<?php
        
      
        $id="";
        $qtype = "";
        $que=  "";
        $ans= "";
        $flag=0;
        
        if(isset($_POST['editbutton'])){
        $id = $_POST['hiddenID'];
        $selectquery = " select * from que_bank where id=$id " ;
        $selectresult = mysql_query($selectquery) or die('Could not run the query' . mysql_error());
        
            $row= mysql_fetch_array($selectresult);
            $qtype = $row['que_type'];
            $que= $row['que'];
            $ans= $row['ans'];
            $flag=1;
       }
         
       
?>      

<html>
    <head>
        <title>FORM2</title>
        <script src="jsfolder/jquery-1.11.1.min.js" type="text/javascript"></script>
        <script src="jsfolder/common.js" type="text/javascript"></script>
 
    </head>
    <body>
        <form action="" method="POST" id="form2" name="form2">
            <div id="popup"> 
               Answer Type: 
				<select name="ans_type" id="ans_type" onChange="changeAns()" >
                    <option <?php if($qtype=="Select"){echo "selected"; }?> value='Select'>Select</option>
                    <option <?php if($qtype=="text"){echo "selected";}?> value='text' >Text</option>
                    <option <?php if($qtype=="textarea"){echo "selected"; }?> value='textarea'>Textarea</option>
                    <option <?php if($qtype=="radio"){echo "selected"; }?> value='radio'>Radio Button</option>
                    <option <?php if($qtype=="checkbox"){echo "selected"; }?> value='checkbox'>Check Box</option>
                </select><br>

               Question: 
				<input type="text" name="question" id="question" value="<?php echo $que; ?>"  ><br>

                <div id="answer" > 

                <?php
                if($ans!= ""){
                $ans1= explode(",",$ans);
                
                echo "Answer: ";
                $length = count($ans1);
                
                for($i=0;$i<count($ans1)-1;$i++){
                echo  '<input type="text" name="answer[]" value="'.$ans1[$i].'" id="ans'.($i+1).'">' ;
                echo '<input type="button" id="del_options'.($i+1).'" name="del_options" value="-" onclick="delAns('.($i+1).','.$length.')"><br>';

                }
                echo '<input type="text" name="answer[]" value="'.$ans1[$i].'" id="ans'.($i+1).'">' ;      
                echo '<input type="button" id="del_options'.($i+1).'" name="del_options" value="-" onclick="delAns('.($i+1).','.($length).')">';
                echo '<input type="button" id="add_options'.($i+1).'" name="add_options" value="+" onclick="addAns('.($i+1).')">';
                }
                ?>
  
                </div>
                
                
                <?php
                if($flag==0){
              //  echo '<input type="hidden"  name= "insertsubmit" value="Submit">';
                echo '<input type="submit" name="insertsubmit" value="Submit" onclick="return validateForm()">';
                }
                else {
            //     echo '<input type="hidden"  name= "editsubmit" value="Submit">';
                 echo '<input type="submit" name="editsubmit" value="Submit" onclick="return validateForm()" >';
                }   
                
                ?>
                <input type="hidden" name="filename" value="form2">
                <input type="hidden" name="id" value="<?php echo $id ;?>">
                
              <!--  <input type="hidden" name="reset" value="Submit" > -->
                <input type="submit" name="reset" value="Reset" >

            </div>
        </form>
    </body>
</html>

