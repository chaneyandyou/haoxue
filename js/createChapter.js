$(function () {
    //通过url获取带过来的courseId参数
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");                 //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    }
    var courseId = getUrlParam('courseId');

    //增加新章节按钮点击事件
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


    //通过事件委托，监听发布新章节按钮
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
                    window.location.href="./createChapters.html";
                },
                error: function (data) {
                    alert('创建章节失败');
                }

            });
            return false;   //阻止表单默认提交
        });
    })
});





