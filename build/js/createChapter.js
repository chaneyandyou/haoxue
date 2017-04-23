$(function () {

    var userInfo = store.get("userInfo");

    /*
     * 通过url获取带过来的courseId参数
     * */
    var courseId = $.getUrlParam('courseId');

    /*
     * 1.增加新章节按钮点击事件
     * */
    function addNewChapter() {
        $('.addNew').click(function () {
            $('.con_rig_con').fadeOut(100);
            var createEle =
                '<div class="con_rig_con clearfix">' +
                '<p><span>发布新章节</span>严禁发布违反国家法律法规的视频内容</p>' +
                '<div class="con_left_dec">' +
                '<label for="chapterName">章节名称</label>' +
                '<label for="chapterFile">章节视频</label>' +
                '<label for="chapterDec">章节视频</label>' +
                '</div>' +
                '<div class="con_right_inp">' +
                '<form id="chapterForm" enctype="multipart/form-data">' +
                '<input type="text" class="myInput" id="chapterName" placeholder="请输入章节名称" name="name">' +
                '<input type="file" id="chapterFile" name="file">' +
                '<textarea id="chapterDec" class="myInput" rows="10" autofocus="autofocus" name="descript"></textarea>' +
                '<input type="button" value="发布" id="registerChapter">' +
                '</form>' +
                '<div class="progress">' +
                '<div class="bar"></div >' +
                '<div class="percent">0%</div >' +
                '</div>' +
                '</div>' +
                '</div>';
            $('.con_right').append(createEle);
        });
    }

    /*
     * 2.通过事件委托，监听发布新章节按钮
     * */
    function newChaterClick() {
        $('.con_right').on('click', '#registerChapter', function () {
            var bar = $('.bar');
            var percent = $('.percent');

            var formData = new FormData($('#chapterForm')[0]);
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                url: 'http://182.92.220.222:8080/coursedetails/create?courseId=' + courseId,
                type: "post",
                data: formData,
                cache: false,
                processData: false,
                contentType: false,
                success: function (data) {

                    alert(data);
                    if(data == "success"){
                    window.location.href = '../view/teacherPersonal.html';
                    }
                },
                error: function (e) {
                    alert("错误！！");
                    alert(e);
                    window.location.href = '../view/teacherPersonal.html';
                }
            });
        });
    }

    /*
     * 3.通过课程id查询所有章节,
     * */
    function chapterInfo() {
        $.ajax({
            url: 'http://182.92.220.222:8080/coursedetails/readCourseAll/' + courseId,
            success: function (str) {
                var chaptersArr = str || [];
                var nullEle =
                    '<li>暂无章节视频 <button class="del">删除</button></li>';
                if (chaptersArr.length == 0) {
                    $('.chapters').append(nullEle);
                }
                for (var i = 0; i < chaptersArr.length; i++) {
                    var chaptersEle =
                        '<li>' + chaptersArr[i].name + '<button class="del" data-chapterId="' + chaptersArr[i].id +'">删除</button></li>';
                    $('.chapters').append(chaptersEle);
                }
            }
        });
    }


    /*
    * 4. 根据章节id，删除章节
    * */
    function delChapter() {
        $(".chapters").on("click",".del",function () {
            var chapterId = $(this).data("chapterId");
            $.ajax({
                url: 'http://182.92.220.222:8080/coursedetails/delete/' + chapterId,
                success: function (str) {
                    alert(str);
                    window.location.href = "../view/createCourse.html?courseId=" + courseId;
                },
                error:function (str) {
                    alert(str);
                    window.location.href = "../view/createCourse.html?courseId=" + courseId;
                }
            });
        })
    }


    /*
     * 函数执行
     * */
    addNewChapter();
    newChaterClick();
    chapterInfo();
    delChapter();
    $.logout();
    $.loginStatus(userInfo);

});





