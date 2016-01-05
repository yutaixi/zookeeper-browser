$(document).ready(function(){
	/*------ Dropzone Init ------*/
 

	$("#dropzone").dropzone({
        url:'/file/upload',
	     maxFilesize:999  

    });
   initFileList();
    function initFileList(index){
        var fileBody=$('#fileTBody').empty();
        
        $.get('/file/find',{},function(data){
             if(data)
             {
                 for(var i=0;i<data.length;i++)
                 {
                     fileBody.append(
                         '<tr>'+//
                         '<td>'+data[i].name+'</td>'+//
                         '<td>dste</td>'+//
                         '<td>'+data[i].name+'</td>'+//
                         '<td>'+data[i].path+'</td>'+//
                         '<td> </td>'+//
                         '</tr>'
                     );
                 }
             }
        });
    };
    
 
});

