$(function () {
    /*
     * 全局变量
     * */
    var userType = 'student';   //用户类型(默认为student)

    /*
     * 通过用户切换tab栏获取是学生登录还是教师登录
     * */
    $('.form_title span').click(function () {
        $(this).addClass('current').siblings().removeClass('current');
        if ($(this).attr('id') == 'student') {
            userType = 'student';
        } else {
            userType = 'teacher';
        }
    });

    /*
     * 登录按钮事件监听
     * */
    $('.regisBtn').click(function (event) {
        // var a = $.CookieUtil.get('JSESSIONID');


        event.preventDefault();
        var userName = $('.userName').val();
        var passWord = $('.userPaw').val();
        $.myAjax({
            url: 'http://182.92.220.222:8080/login',
            type: 'post',
            data: {
                'username': userName,
                'password': passWord,
                'usertype': userType
            },
            success: function (str) {
                // if (str != null) {
                //     var str = JSON.parse(str);
                // }
                var str2 = JSON.parse(str);
                var str = eval("("+str+")");
                console.log(str2);
                console.log(str);

                if (str.usertype == 'student') {
                    window.location.href = '../view/home.html';
                } else if (str.usertype == 'teacher') {
                    window.location.href = '../view/teacherPersonal.html';
                }


                if (str == null) {
                    var infoEle = '<p class="info">账号或者密码错误</p>';
                    $('.info').remove();
                    $('.box_right').append(infoEle);
                } else if (str.usertype == 'student') {
                    window.location.href = '../view/home.html';
                }
                else if (str.usertype == 'teacher') {
                    window.location.href = '../view/teacherPersonal.html';
                }
            },
            error: function (data) {

            }
        });

    });
});