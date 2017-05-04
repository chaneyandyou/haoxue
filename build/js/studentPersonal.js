$(function () {
    /*
     * 全局变量
     * */
    var courseDetail = null;    //课程信息
    var courseTotalPages = null;    //该id的课程总页数
    var user = store.get('userInfo');
    var studentId = user['id'];
    /*
     * 1.如果是登录状态则做出相应的操作
     * */

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
                $('#userMain').show();
                $('#courseMain').hide();
            } else if ($(this).attr('id') == 'courseMan') //我的课程
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
            url: "http://182.92.220.222:8080//student/update?id=" + studentId,
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
            url: 'http://182.92.220.222:8080/student/read/' + studentId,
            type: 'get',
            success: function (str) {
                if (str.name != null) {
                    $('#userName').val(str.realName);
                    $('#school').val(str.school);
                    $('#classGrade').val(str.education);
                }
                $.renderIcon($(".userIcon"),str.icon);
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
            xhrFields: {
                withCredentials: true
            },
            url: "http://182.92.220.222:8080/course/readStudentAll",
            type: "GET",
            data: {
                page: "1",
                studentId: studentId
            },
            timeout: 1000,
            //成功回调
            success: function (str) {
                courseDetail = str.content;
                courseTotalPages = str.totalPages;
                //遍历数组,取出数据
                for (var i = 0; i < courseDetail.length; i++) {
                    var aElement =
                        '<a href="../view/showCourse.html?courseId=' + courseDetail[i].id + '" class="courseBox" data-index=" ' + courseDetail[i]['id'] + '">' +
                        '<img src="' + courseDetail[i]['cover'] + '" alt="" >' +
                        '<p>课程名称：' + courseDetail[i]['name'] + '</p>' +
                        '<span class="grade">' + courseDetail[i]['subject'] + '</span>' +
                        '<span class="isFree">¥：' + courseDetail[i]['price'] + '</span>' +
                        '</a>';
                    $('.con_course').append(aElement);
                }
                //根据课程总数渲染课程底部页码
                for (var i = 0; i < courseTotalPages; i++) {
                    var liElement =
                        '<li>' +
                        '<button data-index="' + (i+1) + '" class="pageBtn">' + (i + 1) + '</button>' +
                        '</li>';
                    $('.pagesUl').append(liElement);
                }
                //每个课程a的点击事件
                $(".con_course").on('click', '.courseBox', function () {
                    alert("点击了");
                    // var courseId = $.trim($(this).data('index'));
                    // var url = './createChapters.html?courseId='+courseId;
                    // console.log(url);
                    // window.open(url);
                });
            },
            //失败
            error: function () {
                alert("很抱歉，创建失败");
            }
        });
    }

    /*
     * 7.页码的点击事件
     * */
    function pageBtnClick() {
        $(".pagesUl").on("click",".pageBtn",function () {
            var index = $(this).data("index");
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                url: "http://182.92.220.222:8080/course/readStudentAll",
                type: "GET",
                data: {
                    page: index,
                    studentId: studentId
                },
                timeout: 1000,
                //成功回调
                success: function (str) {
                    courseDetail = str.content;
                    courseTotalPages = str.totalPages;
                    $('.con_course').html("");
                    //遍历数组,取出数据
                    for (var i = 0; i < courseDetail.length; i++) {
                        var aElement =
                            '<a href="../view/showCourse.html?courseId=' + courseDetail[i].id + '" class="courseBox" data-index=" ' + courseDetail[i]['id'] + '">' +
                            '<img src="' + courseDetail[i]['cover'] + '" alt="" >' +
                            '<p>课程名称：' + courseDetail[i]['name'] + '</p>' +
                            '<span class="grade">' + courseDetail[i]['subject'] + '</span>' +
                            '<span class="isFree">¥：' + courseDetail[i]['price'] + '</span>' +
                            '</a>';
                        $('.con_course').append(aElement);
                    }

                    //每个课程a的点击事件
                    $(".con_course").on('click', '.courseBox', function (event) {
                        event.stopPropagation();
                        alert("点击了");
                        /*var courseId = $.trim($(this).data('index'));
                        var url = './createChapters.html?courseId='+courseId;
                        console.log(url);
                        window.open(url);*/
                    });
                },
                //失败
                error: function () {
                    alert("很抱歉，创建失败");
                }
            });

        })
    }



    /*
     * 函数执行
     * */
    $(".lazy").lazyload();
    $.loginStatus(user);
    showManBtn();
    tabStatus();
    teaInformation();
    pageBtnClick();
    $.logout();
    $('#update').click(function () {
        updateInfo();
    });
});