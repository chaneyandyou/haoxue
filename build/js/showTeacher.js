$(function () {
    /*
     * 全局变量
     * */
    var user = store.get('userInfo');
    var userId = user['id'];
    var courseId = $.getUrlParam('courseId');

    /*
     * 1.显示各章节列表
     * */
    function showTeacherCourseList() {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: 'http://182.92.220.222:8080/coursedetails/readCourseAll/' + courseId,
            type: "get",
            cache: false,
            processData: false,
            contentType: false,
            success: function (data) {


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