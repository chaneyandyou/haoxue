$(function () {
    $.ajax({
        url:"http://182.92.220.222:8080/course/readTeacherAll",
        type:"GET",
        data:{
            page:"1",
            teacherId:"4"
        },
        timeout:1000,
        //成功回调
        success:function (str) {
            console.log(typeof str);
            var dataArr = str.content;
            console.log(dataArr);
            //遍历数组
            for(var i = 0; i < dataArr.length; i++){
                var aElement =
                    '<a href="#" class="courseBox">'+
                    '<img src="'+ dataArr[i]['cover']+'" alt="" >'+
                    '<p>课程名称：'+ dataArr[i]['name'] +'</p>'+
                    '<span class="grade">' + dataArr[i]['subject'] + '</span>'+
                    '<span class="isFree">¥：'+ dataArr[i]['price']+'</span>'+
                    '</a>';
                $('.con_course').append(aElement);

            }
        },
        error:function () {

        }
    })


});




