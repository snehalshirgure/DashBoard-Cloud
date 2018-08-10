//form1 functions----> 
 function loadQuestions(){
        $.ajax(
                {
                url: "ajax/questionlist.php",
                success: function(result){
               // alert(result);
                var obj = JSON.parse(result);
                
            //    alert(obj.data[0]);
                $div = '<div>';
                $out='';   
                
                for(x=0;obj.data[x];x++)
                {
                $out= $out+'<form action="" method="POST" id="question'+(x+1)+'" name="question'+(x+1)+'"  >';
                $out= $out+ '<b>Question '+(x+1)+':</b> '+obj.data[x].que+'<br><br>';
                var qtype= obj.data[x].quetype;
                
                if(qtype=='text'){
                $out= $out + '<b>Answer '+(x+1)+': </b><input type="text" name= "ans'+(x+1)+'" id="ans'+(x+1)+'" value="" >';
                }
                else if(qtype=='textarea'){
                $out= $out + '<b>Answer '+(x+1)+': </b><br><textarea name= "ans'+(x+1)+'" id="ans'+(x+1)+'" value="" rows=3 columns=10 ></textarea>';
                  }
                else if(qtype=='radio'){
                    
                var ans = (obj.data[x].ans).split(",");
                $out= $out + '<b>Answer '+(x+1)+': </b><br>';
               
                for(j=0;j<ans.length;j++){
                $out= $out + '<input type="radio" name= "ans'+(x+1)+'" id="ans'+(x+1)+'.'+(j+1)+'" value="'+ans[j]+'" >'+ans[j]+'<br>';
                }
                
                }
                  
                else if(qtype=='checkbox'){
                      
                var ans = (obj.data[x].ans).split(",");
                $out= $out + '<b>Answer '+(x+1)+': </b><br>';
               
                for(j=0;j<ans.length;j++){
                $out= $out + '<input type="checkbox" name= "ans'+(x+1)+'" id="ans'+(x+1)+'.'+(j+1)+'" value="'+ans[j]+'" >'+ans[j]+'<br>';
                }
                }
                $out= $out + '<input type="hidden" name="filename" value="form1">';
                $out= $out + '<input type="hidden" name="hiddenID" value="'+obj.data[x].id+'">';
                $out= $out + '<input type="submit" name="editbutton" id= "edit'+(x+1)+'" value="*" >';
                $out= $out + '<input type="submit" name="deletebutton" id="delete'+(x+1)+'" value="X"  ><br><br>';
                
                $out= $out + '</form>';    
                    
                }
                
            $div= $div+ $out+ '</div>';
            $("#question_list").html($div);          
                
        }});
        
    }

//form2 functions---->
function changeAns() {
   
       if ($('#ans_type').val() === 'radio' || $('#ans_type').val() === 'checkbox') {
         var append = 'Answer: <input type="text" name="answer[]" value="" id="ans1"><input type="button" id="del_options1" name="del_options" value="-" onclick="delAns(1,0)"><input type="button" id="add_options1" name="add_options" value="+" onclick="addAns(0)">';
         document.getElementById('answer').innerHTML = append;
         $('#answer').show(); 
        }
        else {
        $('#answer').hide();    
         }
 }
var i = 1;
function addAns(offset) {
    
    if(offset)
         i=offset;
    
    if(document.getElementById('ans' + i).value === '')
     { alert('Please fill Answer Field');}
     
    else
         {
           $('#add_options' + i).hide();
           i++;
           $('#add_options'+(i-1)).after('<br><input type="text" name="answer[]" value=""  id="ans' + i + '"><input type="button" id="del_options' + i + '" name="del_options" value="-" onclick="delAns('+i+',0)"><input type="button" id="add_options' + i + '" name="add_options" value="+" onclick="addAns(0)">');
           
         }
}
var flag1 =0;
function delAns(id,length){
     
    if(length!==0&&!flag1&&i==1){
       i=length;
       flag1 =1;
     }

    if(id==1&&i==1){           // only element to be deleted
         document.getElementById('ans1').value= "";
        }
    else{
        if(id===i){                 //last element to be deleted
            $('#ans'+(id)).remove();
            $('#del_options'+id).remove();
            $('#add_options'+id).remove();
        
            if(length===0){
            $('#add_options'+(id-1)).show();
            }
            else{
            $('#del_options'+(id-1)).after('<input type="button" id="add_options' + (id-1) + '" name="add_options" value="+" onclick="addAns('+(i-1)+')">');
            }
            i--;
        }
                       //element to be deleted is not the last or the only one to be deleted       
        else{
            var j,nextAns;
            for(j=id+1;j<=i;j++){
              nextAns = document.getElementById('ans'+j).value;   
              //alert(nextAns);
              document.getElementById('ans'+(j-1)).value=nextAns;
              }
              j--;
            $('#ans'+(j)).remove();
            $('#del_options'+j).remove();
            $('#add_options'+j).remove();
       
            if(length===0)
            $('#add_options'+(j-1)).show();
           
            else{
             $('#del_options'+(j-1)).after('<input type="button" id="add_options' + (j-1) + '" name="add_options" value="+" onclick="addAns('+ (i-1) + ')">');
               }
            i--;
        }
         
     }
}

function validateForm(){
               var flag=0;
               var ans_type = $('#ans_type').val();
               var question = $('#question').val();
            
             if(ans_type==='Select'){
                   flag=1;
                   alert('Select a Question Type');
                 //$('#ans_type').after('Select a Question Type');  
                 return false; 
                 
             }
                  
            if(question===''){
                    flag=1;
                   alert('Enter a Question');
                //$('#question').after('Enter a Question');    
              return false;  
            } 
       
       
            if ($('#ans_type').val() === 'radio' || $('#ans_type').val() === 'checkbox') {
            
              var answer = $('#ans'+i).val();
               
                if(answer===''){
                   flag=1;
                   //$('#ans'+i).after('Please fill Answer Field');
                   
                   alert('Please fill Answer Field');
                  //wait();
                  return false;
                }
            }

            if(!flag){
                $('#form2').submit();  
                return true;
             }
            
           
 }
 
//form3 functions----> 
var flag2=0;
function show(index){
     //alert(index);
     if(!flag2)
     var answer = $('[name=ans'+(index+1)+']').val();
     else
     var answer = $('input[name="ans'+(index+1)+'[]"]:checked').length > 0;
     
    //  alert(answer);
      
        if(answer){
                index++;
                 $.ajax(
                {
                url: "ajax/run2.php",
                });
                alert("Answer submitted!");
                $('#question'+(index)).submit();
                return true;
                }
               
         else{ 
             alert("Enter answer");
         //    include('view/form3.php');
             return false;
             }
            
         
     
 }
 
function funprev(index){
  //  alert(index);
        $('#question'+(index+1)).hide();
     
        index--;
        
          $.ajax(
                {
                url: "ajax/run1.php",
                });
        
        $.ajax(
                {
                url: "ajax/questionlist.php",
        
                success: function(result){
         
                var obj = JSON.parse(result);
              
            
                $out='';
                
                $out= $out+'<form action="" method="POST" id="question'+(index+1)+'" name="question'+(index+1)+'"  >';
                $out= $out+ '<b>Question '+(index+1)+':</b> '+obj.data[index].que+'<br><br>';
                var qtype= obj.data[index].quetype;
                
                
                if(qtype==='text'){
                     flag2=0; 
                $out= $out + '<b>Answer'+(index+1)+': </b><input type="text" name= "ans'+(index+1)+'" id="ans'+(index+1)+'" value="" ><br><br>';
                }
                

                else if(qtype==='textarea'){
                     flag2=0; 
                $out= $out + '<b>Answer '+(index+1)+': </b><br><textarea name= "ans'+(index+1)+'" id="ans'+(index+1)+'" value="" rows=3 columns=10 ></textarea><br><br>';
                  }
                  
                  
                else if(qtype==='radio'){
                 flag2=1;   
                var ans = (obj.data[index].ans).split(",");
                $out= $out + '<b>Answer '+(index+1)+': </b><br>';
               
                for(j=0;j<ans.length;j++){
               
                $out= $out + '<input type="radio" name= "ans'+(index+1)+'[]" id="ans'+(index+1)+'.'+(j+1)+'" value="'+ans[j]+'" >'+ans[j]+'<br>';
                }
                
                }
                  
                else if(qtype==='checkbox'){
                 flag2=1;     
                var ans = (obj.data[index].ans).split(",");
                $out= $out + '<b>Answer '+(index+1)+': </b><br>';
               
                for(j=0;j<ans.length;j++){
                $out= $out + '<input type="checkbox" name= "ans'+(index+1)+'[]" id="ans'+(index+1)+'.'+(j+1)+'" value="'+ans[j]+'" >'+ans[j]+'<br>';
                }
                }
               $out =$out + '<input type="hidden" name="filename" value="form3">'; 
               $out= $out + '<input type="hidden" name="hiddenID" value="'+(index+1)+'">';
               $out= $out + '<input type="hidden" name="flag2" value="'+flag2+'">';
               $out= $out + '<br>';
              
               if(index!==0)
               $out= $out + '<input type="button" id="prev" value="Prev" onclick="return funprev('+index+')">';
               $out =$out + '<input type="hidden" name="addAns" value="Submit">';
               $out= $out + '<input type="submit" name="addAns" value="Submit" onclick="return show('+index+')">';
               
                
               if(index!==(obj.data.length-1))
               $out= $out + '<input type="button" id="next" value="Next" onclick="return funnext('+index+')">';
               
               if(index===(obj.data.length-1)){
                $out= $out + '<input type="hidden" name="end" value="End">';
                }
               
               $out= $out + '</form>';    
                  
               $("#here").html($out); 
                     
           }});
        
              
   }
   
function funnext(index){
  //  alert(index);
    $('#question'+(index+1)).hide();
    index++;
    $.ajax(
                {
                url: "ajax/run2.php",
                 success: function(result){
                 }
    });

    $.ajax(
                {
                url: "ajax/questionlist.php",
        
                success: function(result){
         
                var obj = JSON.parse(result);
              
               
                $out='';
                
                $out= $out+'<form action="" method="POST" id="question'+(index+1)+'" name="question'+(index+1)+'"  >';
                $out= $out+ '<b>Question '+(index+1)+':</b> '+obj.data[index].que+'<br><br>';
                var qtype= obj.data[index].quetype;
                
                
                if(qtype==='text'){
                     flag2=0; 
                $out= $out + '<b>Answer'+(index+1)+': </b><input type="text" name= "ans'+(index+1)+'" id="ans'+(index+1)+'" value="" ><br><br>';
                }
                

                else if(qtype==='textarea'){
                     flag2=0; 
                $out= $out + '<b>Answer '+(index+1)+': </b><br><textarea name= "ans'+(index+1)+'" id="ans'+(index+1)+'" value="" rows=3 columns=10 ></textarea><br><br>';
                  }
                  
                  
                else if(qtype==='radio'){
                 flag2=1;   
                var ans = (obj.data[index].ans).split(",");
                $out= $out + '<b>Answer '+(index+1)+': </b><br>';
               
                for(j=0;j<ans.length;j++){
               
                $out= $out + '<input type="radio" name= "ans'+(index+1)+'[]" id="ans'+(index+1)+'.'+(j+1)+'" value="'+ans[j]+'" >'+ans[j]+'<br>';
                }
                
                }
                  
                else if(qtype==='checkbox'){
                 flag2=1;     
                var ans = (obj.data[index].ans).split(",");
                $out= $out + '<b>Answer '+(index+1)+': </b><br>';
               
                for(j=0;j<ans.length;j++){
                $out= $out + '<input type="checkbox" name= "ans'+(index+1)+'[]" id="ans'+(index+1)+'.'+(j+1)+'" value="'+ans[j]+'" >'+ans[j]+'<br>';
                }
                }
               $out =$out + '<input type="hidden" name="filename" value="form3">'; 
               $out= $out + '<input type="hidden" name="hiddenID" value="'+(index+1)+'">';
               $out= $out + '<input type="hidden" name="flag2" value="'+flag2+'">';
               $out= $out + '<br>';
              
               if(index!==0)
               $out= $out + '<input type="button" id="prev" value="Prev" onclick="return funprev('+index+')">';
               $out =$out + '<input type="hidden" name="addAns" value="Submit">';
               $out= $out + '<input type="submit" name="addAns" value="Submit" onclick="return show('+index+')">';
               
                
               if(index!==(obj.data.length-1))
               $out= $out + '<input type="button" id="next" value="Next" onclick="return funnext('+index+')">';
               
               if(index===(obj.data.length-1)){
                $out= $out + '<input type="hidden" name="end" value="End">';
                }
               $out= $out + '</form>';    
                  
               $("#here").html($out); 
                     
           }});
        
    
}
   
function previewQuestions(index){
        
        $.ajax(
                {
                url: "ajax/questionlist.php",
        
                success: function(result){
         
                var obj = JSON.parse(result);
              
                
                $out='';
                
                $out= $out+'<form action="" method="POST" id="question'+(index+1)+'" name="question'+(index+1)+'"  >';
                $out= $out+ '<b>Question '+(index+1)+':</b> '+obj.data[index].que+'<br><br>';
                var qtype= obj.data[index].quetype;
                
                
                if(qtype==='text'){
                     flag2=0; 
                $out= $out + '<b>Answer'+(index+1)+': </b><input type="text" name= "ans'+(index+1)+'" id="ans'+(index+1)+'" value="" ><br><br>';
                }
                

                else if(qtype==='textarea'){
                     flag2=0; 
                $out= $out + '<b>Answer '+(index+1)+': </b><br><textarea name= "ans'+(index+1)+'" id="ans'+(index+1)+'" value="" rows=3 columns=10 ></textarea><br><br>';
                  }
                  
                  
                else if(qtype==='radio'){
                 flag2=1;   
                var ans = (obj.data[index].ans).split(",");
                $out= $out + '<b>Answer '+(index+1)+': </b><br>';
               
                for(j=0;j<ans.length;j++){
               
                $out= $out + '<input type="radio" name= "ans'+(index+1)+'[]" id="ans'+(index+1)+'.'+(j+1)+'" value="'+ans[j]+'" >'+ans[j]+'<br>';
                }
                
                }
                  
                else if(qtype==='checkbox'){
                 flag2=1;     
                var ans = (obj.data[index].ans).split(",");
                $out= $out + '<b>Answer '+(index+1)+': </b><br>';
               
                for(j=0;j<ans.length;j++){
                $out= $out + '<input type="checkbox" name= "ans'+(index+1)+'[]" id="ans'+(index+1)+'.'+(j+1)+'" value="'+ans[j]+'" >'+ans[j]+'<br>';
                }
                }
            //     $out =$out + '<input type="hidden" name="end" value="notEnd">'; 
               $out =$out + '<input type="hidden" name="filename" value="form3">'; 
               $out= $out + '<input type="hidden" name="hiddenID" value="'+(index+1)+'">';
               $out= $out + '<input type="hidden" name="flag2" value="'+flag2+'">';
               $out= $out + '<br>';
              
               if(index!==0)
               $out= $out + '<input type="button" id="prev" value="Prev" onclick="return funprev('+index+')">';
              $out =$out + '<input type="hidden" name="addAns" value="Submit">';
               $out= $out + '<input type="submit" name="addAns" value="Submit" onclick="return show('+index+')">';
               
                
               if(index!==(obj.data.length-1))
               $out= $out + '<input type="button" id="next" value="Next" onclick="return funnext('+index+')">';
               
               if(index===(obj.data.length-1)){
                $out= $out + '<input type="hidden" name="end" value="End">';
                }
               
               $out= $out + '</form>';    
                  
               $("#here").html($out); 
                     
           }});
        
    }

//form4 functions-->
function validateDetails(){
         var flag=0;
               var name = $('#name').val();
               var age = $('#age').val();
               
        if(name==""){
            flag=1;
                   alert('Name is required!');
                return false; 
        }
         
        if(age==""){
            flag=1;
                   alert('Age is required!');
                return false; 
        }   
        
        if(!flag){
            $('#details').submit();
            return true;
            
        }
        
    }
    
//form5 functions-->    
function loadSurvey(){
        $.ajax(
                {
                url: "ajax/survey.php",
                success: function(result){
                
                var obj = JSON.parse(result);
              
                $out='';   
                
                for(x=0;obj.data[x];x++)
                {
                
                $out= $out+ '<b>Question '+(x+1)+':</b> '+obj.data[x].que+'<br>';
                $out= $out + '<b>Answer '+(x+1)+':</b> '+ obj.data[x].ans +'<br><br>';
                
                }
                  
              
            $("#survey").html($out);          
                
        }});
        
    }
 