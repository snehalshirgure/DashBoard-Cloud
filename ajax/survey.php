<?php
 $link = mysql_connect("localhost", "root", "") or die("Could not connect" . mysql_error());
 mysql_select_db("dashboard") or die("Could not found databasee" . mysql_error());
        
$selectquery = "select * from survey";
$selectresult = mysql_query($selectquery) or die("Could not run the query".mysql_error());
        
$output['data']=array();
        
while ($row= mysql_fetch_array($selectresult)) 
{
   $output['data'][]=array('id'=>$row['id'],'que'=>$row['question'],'ans'=>$row['ans']);
}
echo json_encode($output);
?>
