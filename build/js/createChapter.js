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
                '<div class="con_rig_con clearfix">'+
                '<p><span>发布新章节</span>严禁发布违反国家法律法规的视频内容</p>'+
                '<div class="con_left_dec">'+
                '<label for="chapterName">章节名称</label>'+
                '<label for="chapterFile">章节视频</label>'+
                '<label for="chapterDec">章节视频</label>'+
                '</div>'+
                '<div class="con_right_inp">'+
                '<form id="chapterForm">'+
                '<input type="text" class="myInput" id="chapterName" placeholder="请输入章节名称">'+
                '<input type="file" id="chapterFile" name="file">'+
                '<textarea id="chapterDec" class="myInput" rows="10" autofocus="autofocus"></textarea>'+
                '<input type="submit" value="发布" id="registerChapter">'+
                '</form>'+
                '<div class="progress">'+
                '<div class="bar"></div >'+
                '<div class="percent">0%</div >'+
                '</div>'+
                '</div>'+
                '</div>';
            $('.con_right').append(createEle);
        });
    }

    /*
    * 2.通过事件委托，监听发布新章节按钮
    * */
    function newChaterClick() {
        $('.con_right').on('click','#registerChapter',function () {
            var bar = $('.bar');
            var percent = $('.percent');
            $("#chapterForm").submit(function(){
                $(this).ajaxSubmit({
                    type: 'POST',
                    url: 'http://182.92.220.222:8080/coursedetails/create',
                    data: {
                        name: $('#chapterName').val(),
                        descript:$('#chapterDec').val(),
                        courseId:courseId
                    },
                    contentType: false,
                    cache: false,
                    processData: false,
                    // resetForm:true,
                    beforeSubmit: function () {
                        //上传之前的处理

                    },
                    uploadProgress: function (event, position, total, percentComplete) {
                        //在这里控制进度条
                        //position 已上传了多少
                        //total 总大小
                        //已上传的百分数
                        var percentVal = percentComplete + '%';
                        bar.width(percentVal);
                        percent.html(percentVal);
                    },
                    success: function (str) {
                        alert(str);
                        window.location.href="./createChapters.html?courseId="+ courseId;
                    },
                    error: function (data) {
                        alert('创建章节失败');
                    }

                });
                return false;   //阻止表单默认提交
            });
        });
    }

    /*
    * 3.通过课程id查询所有章节,
    * */
    function chapterInfo() {
        $.ajax({
            url:'http://182.92.220.222:8080/coursedetails/readCourseAll/'+courseId,
            success:function (str) {
                var chaptersArr = str || [];
                console.log(chaptersArr);
                var nullEle =
                    '<li>暂无章节视频 <button class="del">删除</button></li>';
                if(chaptersArr.length == 0){
                    $('.chapters').append(nullEle);
                }
                for(var i = 0; i < chaptersArr.length; i++){
                    var chaptersEle =
                        '<li>' + chaptersArr[i].name + '<button class="del">删除</button></li>';
                    $('.chapters').append(chaptersEle);
                }
            }
        });
    }



    /*
     * 函数执行
     * */
    addNewChapter();
    newChaterClick();
    chapterInfo();
    $.logout();
    $.loginStatus(userInfo);

});





