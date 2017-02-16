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
            var dataArr = str.content;
            //遍历数组,取出数据
            for(var i = 0; i < dataArr.length; i++){
                var aElement =
                    '<a href="#" class="courseBox" data-index=" '+ dataArr[i]['id'] + '">'+
                    '<img src="'+ dataArr[i]['cover']+'" alt="" >'+
                    '<p>课程名称：'+ dataArr[i]['name'] +'</p>'+
                    '<span class="grade">' + dataArr[i]['subject'] + '</span>'+
                    '<span class="isFree">¥：'+ dataArr[i]['price']+'</span>'+
                    '</a>';
                $('.con_course').append(aElement);
            }

            //每个课程a的点击事件
            $(".con_course").on('click','.courseBox',function () {
                var courseId = $(this).data('index');
                var url = './createChapters.html?courseId=' + courseId;
                window.open(url);
            })
        },
        //失败
        error:function () {
            alert("很抱歉，创建失败");
        }
    })


});




