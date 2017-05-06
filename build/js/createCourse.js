$(function () {
    var userInfo = store.get("userInfo");
    if(userInfo == undefined){
        alert("您还没有登录");
        window.location.href = "../view/login.html"
    }else{
        var teacherId = userInfo['id'];
    }


    var bar = $('.bar');
    var percent = $('.percent');

    function createCourse() {
        var formData = new FormData($('#createForm')[0]);
        console.log($('#createForm')[0]);
        console.log(teacherId);
        console.log(userInfo);
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: 'http://182.92.220.222:8080/course/create?teacherId=' + teacherId,
            type: "post",
            data: formData,
            cache: false,
            processData: false,
            contentType: false,
            success: function (data) {

                alert(data);
                if(data == "success"){
                    window.location.href = "../view/teacherPersonal.html"
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
    $(".lazy").lazyload();
    $("#register").click(function () {
        createCourse();
    });
    $.loginStatus(userInfo);
    $.logout();
});
