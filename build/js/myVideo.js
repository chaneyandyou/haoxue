$(function () {
    /*
     * 全局变量
     * */
    var user = store.get('userInfo');
    var userId = user['id'];
    var coursedetailsId = $.getUrlParam('coursedetailsId');

    /*
    * 鉴权成功后获取视频地址
    * */
    function getVideoLink() {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: 'http://182.92.220.222:8080/student/play',
            type: "get",
            data:{
                "coursedetailsId":coursedetailsId,
                "studentId":userId
            },
            cache: false,
            processData: false,
            contentType: false,
            success: function (data) {
                console.log(data);
                console.log(typeof data);
                if(data != "error"){
                    $('.videoSrc').attr("src",data);
                }else{

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
    getVideoLink();
});