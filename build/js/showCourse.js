$(function () {
    /*
     * 全局变量
     * */
    var user = store.get('userInfo');
    var userId = user['id'];
    var courseId = $.getUrlParam('courseId');
    
    function showChapterList() {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: 'http://182.92.220.222:8080/coursedetails/readCourseAll/' + courseId,
            type: "get",
            cache: false,
            processData: false,
            contentType: false,
            success: function (dataArr) {
                for(var i = 0; i < dataArr.length; i++){
                    var liElement = '<li><a href="../view/video.html?coursedetailsId=" ' + dataArr[i].id + '>' + dataArr[i].name + '</a></li>';
                    $('.ulElement').append(liElement)
                }

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
});