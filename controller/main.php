<?php

$link = mysql_connect("localhost", "root", "") or die("Could not connect" . mysql_error());
mysql_select_db("dashboard") or die("Could not found databasee" . mysql_error());

if(isset($_POST['filename'])){
$switchVar = $_POST['filename'];
}
 else {
    $switchVar="";
}
switch($switchVar){
    case 'form1' : {    
                        if((($_POST['add'])=="Add Question")&&(($_POST['save'])=="Submit")){
                           include('view/form2.php');
                        } 
                        
                        if(isset($_POST['editbutton'])){
                            include('view/form2.php');
                        }
                        
                        if(isset($_POST['deletebutton'])){
                        $id = $_POST['hiddenID'];
                        $query=array('action'=>'delete','id'=>$id);
                        $json = json_encode($query);
                        
echo '<script src="jsfolder/jquery-1.11.1.min.js" type="text/javascript"></script>
<script>
$.ajax(
    {
   type: "POST",
   url: "controller/webservices.php",
   data : '.$json.',
    success: function(response) {
        if(response){
        alert("Deleted Successfully");    
        }
        
    }
}); 
</script>' ;

                         //$deletequery = " delete from que_bank where id=$id " ;
                        //$deleteresult = mysql_query($deletequery) or die('Could not run the query' . mysql_error());
        
                             include('view/form1.php');
                        }
                                 
                        if((($_POST['save'])=="Preview Form")&&(($_POST['add'])=="Submit")){    
                        session_start();
                          $_SESSION['index']=0;

                        $qry1= mysql_query('select * from que_bank');
                        $qry = mysql_query('truncate table survey');


                         while($row=mysql_fetch_array($qry1)){
                         $question= $row['que']; 
                         $qry2= mysql_query("insert into survey(question) values('$question')");
                         }
                   
                         include('view/form4.php');
                            
                        }
                   };
    break;
    
    case 'form2' : {
                       if(isset($_POST['insertsubmit'])=="Submit"&&$_POST['ans_type']!='Select'){
      
                        if (isset($_POST['ans_type'])) {
                         $anstype = $_POST['ans_type'];
                         } else { $anstype = "";}
                        if (isset($_POST['question'])) {
                          $que = $_POST['question'];
                          } else {$que = "";}
                         if($anstype == 'text' || $anstype == 'textarea')
                          {$ans = "";}
                         else 
                                          {
                          if(isset($_POST['answer'])) {
                              $ans1=$_POST['answer'];
                              $ans= implode(",",$ans1);
          
                                                 } 
                                              }
                        if(!empty($anstype)&& !empty($que) ){
                    
                         $query=array('action'=>'insert','quetype'=>$anstype,'que'=>$que,'ans'=>$ans);
                         $json = json_encode($query);
                         
echo '<script src="jsfolder/jquery-1.11.1.min.js" type="text/javascript"></script>
<script>

$.ajax(
    {
   type: "POST",
   url: "controller/webservices.php",
   data : '.$json.',
    success: function(response) {
        if(response){
        alert("Inserted Successfully");    
        }
        
    }
}); 

</script>' ;

                          //    $insertquery = " insert into que_bank(que_type,que,ans) values('$anstype','$que','$ans')";
                          //    $insertresult = mysql_query($insertquery) or die('Could not run the query' . mysql_error());
                            }
                                
                            include('view/form1.php');
                            
                        }  
        
                        if(isset($_POST['editsubmit'])=="Submit"){
                         $id= $_POST['id'];
                         $qtype= $_POST['ans_type'];
                         $que= $_POST['question'];
                         $ans1 = $_POST['answer'];
                         $ans= implode(",",$ans1);
         
                       
                         $query=array('action'=>'update','id'=>$id,'quetype'=>$qtype,'que'=>$que,'ans'=>$ans,'type'=>'form');
                         $json = json_encode($query);
                         
echo '<script src="jsfolder/jquery-1.11.1.min.js" type="text/javascript"></script>
<script>

$.ajax(
    {
   type: "POST",
   url: "controller/webservices.php",
   data : '.$json.',
    success: function(response) {
        if(response){
        alert("Updated Successfully");    
        }
        
    }
}); 

</script>' ;                           
                                
                                
                                //$updatequery = "update que_bank set que_type='$qtype', que= '$que',ans = '$ans' where id= '$id'";
                                //$updateresult = mysql_query($updatequery) or die('Could not run the query' . mysql_error());
        
                                         include('view/form1.php');   
                        }
    
    
                         if(isset($_POST['reset'])=="Reset"){
                                              include('view/form2.php');    
                        }
        
                    };
    break;
    
    case 'form3':{
    
                        if(isset($_POST['addAns'])=="Submit"){
                            $flag2= $_POST['flag2'];
                            $id = $_POST['hiddenID'];
                            $ans= $_POST['ans'.($id)];
    
                      
                         $query=array('action'=>'update','id'=>$id,'ans'=>$ans,'flag2'=>$flag2,'type'=>'survey');
                         $json = json_encode($query);
                         
echo '<script src="jsfolder/jquery-1.11.1.min.js" type="text/javascript"></script>
<script>

$.ajax(
    {
   type: "POST",
   url: "controller/webservices.php",
   data : '.$json.',
    success: function(response) {
        if(response){
        alert("Added Successfully");    
        }
        
    }
}); 
</script>' ;
                       /* if($flag2==0){
                                $updatequery = "update survey set ans='$ans' where id= '$id'";
                                $updateresult = mysql_query($updatequery) or die('Could not run the query' . mysql_error());
                            }
                        else {
                             $ans1= implode(",",$ans);
                             $updatequery = "update survey set ans='$ans1' where id= '$id'";
                             $updateresult = mysql_query($updatequery) or die('Could not run the query' . mysql_error());
                            }
                            
                            */
                            
                            
                        if(isset($_POST['end'])=="End")
                        include('view/form5.php');
                        
                        else 
                         include('view/form3.php');
                        
                        }    
        
                };
    break; 
        
    case 'form4':{
        
                if(isset($_POST['details'])=="Submit"){
                
                session_start();
                    
                $_SESSION['name']=$_POST['name']; 
                $_SESSION['age']=$_POST['age'];
                
                include('view/form3.php');
                
                }
                    
                };
    break;
    
    case 'form5':{
        
                if(isset($_POST['final'])=="Submit"){
                  include('view/form1.php');
                }
                    
                }; 
    break;
    
    default: include('view/form1.php');
    
}


?>

<!--<script src="jsfolder/jquery-1.11.1.min.js" type="text/javascript"></script>
//<script src="jsfolder/common.js" type="text/javascript"></script>
//<script> query('<?php //echo $json; ?>'); </script>
 

