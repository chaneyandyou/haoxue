$(function () {
    /*
     * 一些全局变量
     * */
    var userName;   //用户名
    var password;   //密码
    var passwordAgain;  //第二次密码
    var myEmail;    //邮箱

    var emailCore;  //服务器端返回的邮箱验证码
    var core;   //用户输入的邮箱验证码
    var apiUrl;    //获取邮箱验证码的API地址

    /*
     * 通过扩展的getUrlParam方法获取url带过来的isTeacher参数
     * */

    var isTeacher = $.getUrlParam('isTeacher');
    //判断是什么身份进入注册页面
    if (isTeacher == 'false')    //学生
    {
        $('.userTitle').text('学生注册');
        apiUrl = 'http://182.92.220.222:8080/student/create'
    } else   //教师
    {
        $('.userTitle').text('教师进驻');
        apiUrl = 'http://182.92.220.222:8080/teacher/create';
    }

    /*
     * 获取邮箱验证码按钮监听事件
     * */
    $('.emailGet').click(function (event) {
        event.stopPropagation();
        myEmail = $('.email').val();

        $.ajax({
            url: 'http://182.92.220.222:8080/index/code',
            type: 'get',
            dataType:'json',
            data: {
                email: myEmail
            },
            success: function (str) {
                emailCore = str;
            }
        })
    });


    /*
     * 注册按钮的事件监听
     * */
    $('.regisBtn').click(function (event) {
        event.preventDefault();
        password = $('.userPaw').val();
        passwordAgain = $('.userPawAgain').val();
        core = $('.verification').val();
        userName = $('.userName').val();
        if ((core == emailCore) && (password == passwordAgain)) {
            if ($("[type='checkbox']").attr("checked", "true")) {
                $.ajax({
                    url: apiUrl,
                    type: 'post',
                    data: {
                        name: userName,
                        password: password,
                        email: myEmail
                    },
                    success: function (str) {
                        if (str == 'The name already exists') {
                            var infoEle = '<p class="info">该邮箱已被注册</p>';
                            $('.info').remove();
                            $('.box_right').append(infoEle);
                        }
                        if (str == 'success') {
                            window.location.herf = '';
                        }
                    }
                })
            } else {
                var infoEle = '<p class="info">请仔细阅读条款并同意好学云课堂条款</p>';
                $('.info').remove();
                $('.box_right').append(infoEle);
            }
        } else {
            var infoElement = '<p class="info">邮箱验证码不正确或者两次密码不一致</p>';
            $('.info').remove();
            $('.box_right').append(infoElement);
        }
    });
});


