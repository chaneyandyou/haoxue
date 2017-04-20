$(function () {
    /*
     * 全局变量
     * */
    var courseDetail = null;    //课程信息
    var courseTotalPages = null;    //该id教师的课程总页数
    // var user = store.get('ownMsg');
    // var teacherId = user['id'];
    // var teacherId = $.CookieUtil.get("userId");

    /*
     * 如果是登录状态则做出相应的操作
     * */
    // if (user != null) {
    //     var liElement =
    //         '<li><a href=".／register.html"><i class="iconfont">&#xe603;</i>个人中心</a></li>' +
    //         '<li><a href="#" class="logout">退出</a></li>';
    //
    //     $('.navUser').children('li:nth-child(-n+2)').remove();
    //     $('.navUser').prepend(liElement);
    // }
    /*
     * 如果有教师信息，先把信息渲染
     * */
    /*function teaInformation() {
     $.ajax({
     url:'http://182.92.220.222:8080/teacher/read/' + teacherId,
     type:'get',
     success:function (str) {
     console.log(str);
     if(str.graduateSchool != null){
     $('#userName').val(str.realName);
     $('#school').val(str.graduateSchool);
     $('#classSubject').val(str.subject);
     $('#classGrade').val(str.level);
     $('#teacDec').val(str.profile);

     }
     }
     });
     }
     teaInformation();*/




    /*
     * 更新按钮监听
     * */
    function updateInfo() {
        /*$('#update').click(function (event) {
         event.preventDefault();
         var name = $('#userName').val();
         var school = $('#school').val();
         var subject = $('#classSubject').val();
         var grade = $('#classGrade').val();
         var dec =  $('#teacDec').val();
         $.ajax({
         url: 'http://182.92.220.222:8080/teacher/update',
         type: 'post',
         data: {
         'id': teacherId,
         'realName': name,
         'graduateSchool': school,
         'subject':subject,
         'level': grade,
         'profile':dec
         },
         success: function (str) {
         console.log(str);
         if (str = 'success') {

         // teaInformation();
         }
         }

         })
         })*/

        $('#update').click(function () {
            // var name = $('#userName').val();
            // var school = $('#school').val();
            // var subject = $('#classSubject').val();
            // var grade = $('#classGrade').val();
            // var dec = $('#teacDec').val();
            var serializeData = $('#createForm').serialize();
            $('#createForm').ajaxSubmit({
                type: 'post',
                url: 'http://182.92.220.222:8080/teacher/update?id=8',
                dataType: 'json',
                data: serializeData,
                contentType: false,
                cache: false,
                processData: false,
                // resetForm:true,
                beforeSubmit: function () {
                    //上传之前的处理

                },
                uploadProgress: function (event, position, total, percentComplete) {

                },
                success: function (str) {
                    if (str == "success") {
                        window.href = '../view/teacherPersonal.html';
                    }
                },
                error: function (data) {
                    alert(data);
                    if (data == "success") {
                        window.href = '../view/teacherPersonal.html';
                    }
                }

            });
        })

    }

    updateInfo();
    /*
     * 左边tab栏切换状态
     * */
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


    /*
     * 课程管理的入口函数
     * */
    function courseMan() {
        /*
         * ajax请求该讲师所有的课程信息
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
         * 管理按钮
         * 1.点击按钮后，显示删除按钮
         * */
        $('.manage').click(function () {
            $('.delete').fadeIn(100);
        });

        /*
         * delete删除课程按钮监听事件，（删除按钮默认隐藏，点击管理按钮后显示）
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
     * 退出登录事件监听,通过.navUser事件委托
     * */
    $.logout();

    /*
     * 个人中心的入口函数
     * */
    function userCenter() {
        //如果有教师信息，先把信息渲染

    }

    /*
     * 个人中心状态点击管理按钮显示更新按钮
     * */
    function showManBtn() {
        $('#managerBtn').click(function () {
            $('#update').show();
            $('.disInput').removeAttr('disabled');
        })
    }

    showManBtn();
});

