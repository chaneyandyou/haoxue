$(function () {
    /*
     * 全局变量
     * */
    var user = store.get('userInfo');
    var courseId = $.getUrlParam('courseId');

    /*
    * 1.显示各章节列表
    * */
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
                if(dataArr.length == 0){
                    var liElement = '<li>暂无章节视频信息</li>';
                    $('.ulElement').append(liElement)
                }
                for(var i = 0; i < dataArr.length; i++){
                    var liElement = '<li><a href="../view/video.html?coursedetailsId=' + dataArr[i].id + '">' + dataArr[i].name + '</a></li>';
                    $('.ulElement').append(liElement);
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
    showChapterList();
});