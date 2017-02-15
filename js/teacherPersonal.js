$(function () {
    $.ajax({
        url:"http://182.92.220.222:8080/course/readTeacherAll",
        type:"GET",
        dataType:"jsonp",
        data:{
            page:"1",
            teacherId:"4"
        },
        // timeout:1000,
        success:function(str){
            console.log(str);
        },
        error:function () {

        }
    })
});




