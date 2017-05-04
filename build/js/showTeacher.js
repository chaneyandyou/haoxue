$(function () {
    /*
     * 全局变量
     * */
    var user = store.get('userInfo');
    var userId = user['id'];
    var teacherId = $.getUrlParam('teacherId');

    /*
     * 1.显示各章节列表
     * */
    function showTeacherCourseList() {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: 'http://182.92.220.222:8080/course/readTeacherAll?teacherId=' + teacherId,
            data: {
                "page": 1
            },
            type: "get",
            cache: false,
            processData: false,
            contentType: false,
            success: function (data) {
                console.log(data);
                console.log(typeof data);
                // $('.teacherIcon').attr("src",data.content.cover);
                // var infoEle =
                //     '<h5>' + data.content.name + '</h5>'+
                //     '<p></p>';
                var courseEle =
                    '<a href="#" class="courseBox">' +
                    '<img src="' + data.content.cover + '" alt="课程图片">' +
                    '<p>课程名称:' + data.content.name+ '</p>' +
                    '<span class="grade">' + data.content.grade + '</span>' +
                    '<span class="isFree">¥:' + data.content.price + '</span>' +
                    '</a>';
                $('.teacherCourseList').html("").append(courseEle);
            },
            error: function (e) {
                alert("错误！！");
            }
        });
    }


    /*
     * 函数执行
     * */
    $.loginStatus(user);
    $.logout();
    showTeacherCourseList();
});