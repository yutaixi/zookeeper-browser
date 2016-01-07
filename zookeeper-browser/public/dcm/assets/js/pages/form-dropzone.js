$(document).ready(function () {
    /*------ Dropzone Init ------*/
    $(".dropzone").dropzone({
        url: '/file/upload',
        maxFilesize: 999,
        afterUploaded:function(){
            refreshFileList();
        }
    });
     
    refreshFileList();
});

function refreshFileList(index) {
    var fileBody = $('#fileTBody').empty();

    $.get('/file/find', {}, function (data) {
        if (data) {
            for (var i = 0; i < data.length; i++) {
                fileBody.append(
                    '<tr>' +//
                    '<td>' + data[i]._id + '</td>' +//
                    '<td>dste</td>' +//
                    '<td>' + data[i].name + '</td>' +//
                    '<td>' + data[i].path + '</td>' +//
                    '<td> <button type="reset" onclick="remove(\''+data[i]._id+'\');" class="btn btn-sm btn-danger"><i class="fa fa-trash-o"></i> Del</button></td>' +//
                    '</tr>'
                    );
            }
        }
    });
};

function remove(id){
 
    var condition={id:id};
    $.post('/file/remove',condition,function(data){ 
         refreshFileList();
    });
};