$(function () {
    /*
     * 全局变量
     * */
    var user = store.get('userInfo');

    var teacherId = $.getUrlParam('teacherId');

    /*
     * 1.显示各章节列表
     * */
    function showTeacherCourseList() {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: 'http://182.92.220.222:8080/course/readTeacherAll?page=1&teacherId=' + teacherId,
            type: "get",
            cache: false,
            processData: false,
            contentType: false,
            success: function (data) {
                if(data.content.length == 0){
                    var courseEle =
                        '<a href="#" class="courseBox">';
                    $('.teacherCourseList').append(courseEle);
                }

                for (var i = 0; i < data.content.length; i++) {
                    var courseEle =
                        '<a href="../view/showCourse.html?courseId=' + data.content[i].id + '" class="courseBox">' +
                        '<img src="' + data.content[i].cover + '" alt="课程图片">' +
                        '<p>课程名称:' + data.content[i].name + '</p>' +
                        '<span class="grade">' + data.content[i].grade + '</span>' +
                        '<span class="isFree">¥:' + data.content[i].price + '</span>' +
                        '</a>';
                    $('.teacherCourseList').append(courseEle);
                }

            },
            error: function (e) {
                alert("错误！！");
            }
        });
    }


    /*
     * 2.
     * */
    function showTeacherInfo() {

        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: 'http://182.92.220.222:8080/teacher/read/' + teacherId,
            type: "get",
            cache: false,
            processData: false,
            contentType: false,
            success: function (data) {
                if(data.realName == null){
                    data.realName = "优秀教师";
                }
                $('.teacherIcon').attr("src", data.icon);
                var infoEle =
                    '<h5>' + data.realName + '</h5>' +
                    '<p>' + data.profile+ '</p>';
                $('.teacherInfo').append(infoEle);
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
    showTeacherInfo();
});