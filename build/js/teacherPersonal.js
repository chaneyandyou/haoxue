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
    /*function loginStatus() {
        if (user != null) {
            var liElement =
                '<li><a href=".／register.html"><i class="iconfont">&#xe603;</i>个人中心</a></li>' +
                '<li><a href="#" class="logout">退出</a></li>';

            $('.navUser').children('li:nth-child(-n+2)').remove();
            $('.navUser').prepend(liElement);
        }

    }*/

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
                location.reload();
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
                if (str.graduateSchool != null) {
                    $('#userName').val(str.realName);
                    $('#school').val(str.graduateSchool);
                    $('#classSubject').val(str.subject);
                    $('#classGrade').val(str.level);
                    $('#teacDec').val(str.profile);

                }
                // $.renderIcon("userIcon",str.icon);
                $(".userIcon").attr('src') == attr;
            }
        });
    }

    /*
     * 6.课程管理的入口函数
     * */
    function courseMan() {
        /*
         * 6.1 ajax请求该讲师所有的课程信息
         * */
        $.ajax({
            url: "http://182.92.220.222:8080/course/readTeacherAll",
            type: "GET",
            data: {
                page: "1",
                teacherId: teacherId
            },
            timeout: 1000,
            //成功回调
            success: function (str) {
                courseDetail = str.content;
                courseTotalPages = str.totalPages;
                //遍历数组,取出数据
                for (var i = 0; i < courseDetail.length; i++) {
                    var aElement =
                        '<a href="#" class="courseBox" data-index=" ' + courseDetail[i]['id'] + '">' +
                        '<img src="' + courseDetail[i]['cover'] + '" alt="" >' +
                        '<p>课程名称：' + courseDetail[i]['name'] + '</p>' +
                        '<span class="grade">' + courseDetail[i]['subject'] + '</span>' +
                        '<span class="isFree">¥：' + courseDetail[i]['price'] + '</span>' +
                        '<button class="delete"><i class="iconfont icon">&#xe61b;</i></button>' +
                        '</a>';
                    $('.con_course').append(aElement);
                }
                //根据课程总数渲染课程底部页码
                for (var i = 0; i < courseTotalPages; i++) {
                    var liElement =
                        '<li>' +
                        '<button>' + (i + 1) + '</button>' +
                        '</li>';
                    $('.pagesUl').append(liElement);
                }
                //每个课程a的点击事件
                $(".con_course").on('click', '.courseBox', function () {
                    var courseId = $(this).data('index');
                    var url = './createChapters.html?courseId=' + courseId;
                    window.open(url);
                });
            },
            //失败
            error: function () {
                alert("很抱歉，创建失败");
            }
        });

        /*
         * 6.2 管理按钮
         * 1.点击按钮后，显示删除按钮
         * */
        $('.manage').click(function () {
            $('.delete').fadeIn(100);
        });

        /*
         * 6.3 delete删除课程按钮监听事件，（删除按钮默认隐藏，点击管理按钮后显示）
         * */
        $('.con_course').on('click', '.delete', function (event) {
            event.stopPropagation();
            var courseId = $(this).parent().data('index');
            $.ajax({
                url: 'http://182.92.220.222:8080/course/delete/' + courseId,
                type: 'get',
                success: function (str) {
                    alert(str);
                }
            })

        });
    }




    /*
     * 函数执行
     * */
    $.loginStatus(user);
    showManBtn();
    tabStatus();
    teaInformation();
    $.logout();
    $('#update').click(function () {
        updateInfo();
    });
});