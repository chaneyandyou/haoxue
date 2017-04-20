$(function () {
    /*
     * 全局变量
     * */
    var courseDetail = null;    //课程信息
    var courseTotalPages = null;    //该id教师的课程总页数
    var user = store.get('userInfo');
    var teacherId = user['id'];
    /*
     * 1.如果是登录状态则做出相应的操作
     * */
    function loginStatus() {
        if (user != null) {
            var liElement =
                '<li><a href=".／register.html"><i class="iconfont">&#xe603;</i>个人中心</a></li>' +
                '<li><a href="#" class="logout">退出</a></li>';

            $('.navUser').children('li:nth-child(-n+2)').remove();
            $('.navUser').prepend(liElement);
        }

    }

    /*
     * 2.个人中心状态点击管理按钮显示更新按钮
     * */
    function showManBtn() {
        $('#managerBtn').click(function () {
            $('#update').show();
            $('.disInput').removeAttr('disabled');
        })
    }

    /*
     * 3.左边tab栏切换状态
     * */
    function tabStatus() {
        $('.teaPerNav li').click(function () {
            $(this).addClass('cur').siblings().removeClass('cur');
            if ($(this).attr('id') == 'center')  //个人中心
            {
                // userCenter();
                $('#userMain').show();
                $('#courseMain').hide();
            } else if ($(this).attr('id') == 'courseMan') //课程管理
            {

                $('.con_course').html('');
                $('.pagesUl').html('');
                $('.footer').hide();
                $('#courseMain').show();
                $('#userMain').hide();
                $('.footer').show();
                courseMan();
            }
        });
    }

    /*
     * 4.更新按钮监听
     * */
    function updateInfo() {
        var formData = new FormData($('#createForm')[0]);
        $.ajax({
            url: "http://182.92.220.222:8080/teacher/update?id=" + user.id,
            type: "post",
            data: formData,
            cache: false,
            processData: false,
            contentType: false,
            success: function (data) {

                alert(data);
            },
            error: function (e) {
                alert("错误！！");

            },
            xhrFields: {
                withCredentials: true
            }
        });
    }

    /*
     * 5.如果有教师信息，先把信息渲染
     * */
    function teaInformation() {
        $.ajax({
            url: 'http://182.92.220.222:8080/teacher/read/' + teacherId,
            type: 'get',
            success: function (str) {
                console.log(str);
                if (str.graduateSchool != null) {
                    $('#userName').val(str.realName);
                    $('#school').val(str.graduateSchool);
                    $('#classSubject').val(str.subject);
                    $('#classGrade').val(str.level);
                    $('#teacDec').val(str.profile);

                }
            }
        });
    }


    /*
     * 函数执行
     * */
    loginStatus();
    showManBtn();
    tabStatus();
    teaInformation();
    $.logout();
    $('#update').click(function () {
        updateInfo();
    });


});







