$(function () {



    $('#update').click(function () {
        $("#createForm").ajaxSubmit({
            type: 'post',
            url: 'http://182.92.220.222:8080/teacher/update?id=8',
            contentType: false,
            cache: false,
            processData: false,
            // resetForm:true,
            data:{
                realName:$('#userName').val(),
                graduateSchool:$('#school').val(),
                subject:$('#classSubject').val(),
                level:$('#classGrade').val(),
                profile:$('#teacDec').val(),
            },
            beforeSubmit: function () {
                //上传之前的处理

            },
            uploadProgress: function (event, position, total, percentComplete) {
                //在这里控制进度条
                //position 已上传了多少
                //total 总大小
                //已上传的百分数

            },
            xhrFields: {
                withCredentials: true
            },
            success: function (str) {
                console.log(str);
                alert(str);
            },
            error: function (data) {
                alert('创建失败');
            }
        });
        $("#createForm").ajaxSubmit(function (data) {
            alert(data);
        })
    })


});







