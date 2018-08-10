<?php

$link = mysql_connect("localhost", "root", "") or die("Could not connect" . mysql_error());
mysql_select_db("dashboard") or die("Could not found databasee" . mysql_error());


//print_r($_POST);

$var = ($_POST['action']);
//echo $var;
 switch($var){
    
    case 'insert': {
        $anstype = $_POST['quetype'];
        $que=$_POST['que'];
        $ans=$_POST['ans'];
        $insertquery = "insert into que_bank(que_type,que,ans) values('$anstype','$que','$ans')";
        $insertresult = mysql_query($insertquery) or die('Could not run the query' . mysql_error());
        echo $insertresult;
    };
    break;

   case 'delete': {
          $id= $_POST['id'];
          $deletequery = " delete from que_bank where id=$id " ;
          $deleteresult = mysql_query($deletequery) or die('Could not run the query' . mysql_error());
        
       echo $deleteresult;
   };
   break;
   
   case 'update':{
       if($_POST['type']=='form'){
                         $id= $_POST['id'];
                         $qtype= $_POST['quetype'];
                         $que= $_POST['que'];
                         $ans = $_POST['ans'];
             $updatequery = "update que_bank set que_type='$qtype', que= '$que',ans = '$ans' where id= '$id'";
             $updateresult = mysql_query($updatequery) or die('Could not run the query' . mysql_error());
               
          echo $updateresult;
       }
       
       if($_POST['type']=='survey'){
                            $flag2= $_POST['flag2'];
                            $id = $_POST['hiddenID'];
                            $ans= $_POST['ans'.($id)];
           if($flag2==0){
            $updatequery = "update survey set ans='$ans' where id= '$id'";
            $updateresult = mysql_query($updatequery) or die('Could not run the query' . mysql_error());
                            
                 echo $updateresult;
           }
                        else {
                             $ans1= implode(",",$ans);
            $updatequery = "update survey set ans='$ans1' where id= '$id'";
            $updateresult = mysql_query($updatequery) or die('Could not run the query' . mysql_error());
                          echo $updateresult;
                            }
          
       }
       
   };
   break;
       
}
?>