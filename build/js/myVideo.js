$(function () {
    /*
     * 全局变量
     * */
    var user = store.get('userInfo');
    if(user == undefined){
        alert("您还没有登录");
        window.location.href = "../view/login.html"
    }
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
            url: 'http://182.92.220.222:8080/student/play?coursedetailsId=' + coursedetailsId + '&studentId='+userId,
            type: "get",
            cache: false,
            processData: false,
            contentType: false,
            success: function (data) {
                console.log(data);
                console.log(typeof data);
                if (data != "error") {
                    var videoEle =
                        '<video id="my-video" class="video-js vjs-big-play-centered" controls preload="auto" data-setup="{}" width="990px" height="600px">' +
                        '<source src="' + data + '" type="video/mp4" class="videoSrc">' +
                        '</video>';
                    $('.videoMain').prepend(videoEle);
                } else {
                    alert("你还没有购买该视频");
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