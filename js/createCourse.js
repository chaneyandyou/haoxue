$(function () {

    /*发布新课程功能*/
    // var name = $('#className').val();  //课程名称
    // var subject =$('#classSubject').val();    //课程科目
    // var grade =$('#classGrade').val();  //课程年级
    // var descript =$('#classDec').val();  //课程描述
    // var groupNumber = $('#discuss').val(); //讨论群号
    // var price = $('#price').val();  //课程价格
    // var teacherId = 4;  //教师id

    // var name = $('#className');  //课程名称
    // var subject =$('#classSubject');    //课程科目
    // var grade =$('#classGrade');  //课程年级
    // var descript =$('#classDec');  //课程描述
    // var groupNumber = $('#discuss'); //讨论群号
    // var price = $('#price');  //课程价格
    // var teacherId = 4;  //教师id
    //
    // $('#register').click(function () {
    //     $.ajax({
    //         url:"http://182.92.220.222:8080/course/create",
    //         type:"POST",
    //         // dataType:"jsonp",
    //         data:{
    //             name:name.val(),
    //             subject:subject.val(),
    //             grade:grade.val(),
    //             descript:descript.val(),
    //             groupNumber:groupNumber.val(),
    //             price:price.val(),
    //             teacherId:teacherId
    //         },
    //         // timeout:1000,
    //         success:function(str){
    //             alert(str);
    //
    //         },
    //         error:function () {
    //
    //         }
    //     })
    // })


    var name = $('#className');  //课程名称
    var subject = $('#classSubject');    //课程科目
    var grade = $('#classGrade');  //课程年级
    var descript = $('#classDec');  //课程描述
    var groupNumber = $('#discuss'); //讨论群号
    var price = $('#price');  //课程价格
    var teacherId = 4;  //教师id

    var bar = $('.bar');
    var percent = $('.percent');
//绑定了`submit`事件。
    /*$('#createForm').on('submit', (function (e) {
        e.preventDefault();
        // var formData = new FormData(this);
        $(this).ajaxSubmit();
    }));



    $("#register").click(function () {
        // e.preventDefault();
        $(this).parent().submit();
    })*/

    $("#createForm").submit(function(){
        $(this).ajaxSubmit({
            type: 'POST',
            url: 'http://182.92.220.222:8080/course/create',
            data: {
                name: name.val(),
                subject: subject.val(),
                grade: grade.val(),
                descript: descript.val(),
                groupNumber: groupNumber.val(),
                price: price.val(),
                teacherId: teacherId
            },
            contentType: false,
            cache: false,
            processData: false,
            // resetForm:true,
            beforeSubmit: function () {
                //上传之前的处理
            },
            uploadProgress: function (event, position, total, percentComplete) {
                //在这里控制进度条
                //position 已上传了多少
                //total 总大小
                //已上传的百分数
                var percentVal = percentComplete + '%';
                bar.width(percentVal);
                percent.html(percentVal);
            },
            success: function () {
                alert('成功');
            },
            error: function (data) {
                alert('创建课程失败');
            }

        });
        return false;   //阻止表单默认提交
    });
});
