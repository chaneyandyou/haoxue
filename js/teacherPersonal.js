$(function () {
    /*
    * 全局变量
    * */
    var courseDetail = null;    //课程信息
    var courseTotalPages = null;    //该id教师的课程总页数

    /*
    * 判断是否登录状态
    * */
    var user = store.get('user');
    console.log(user);

    /*
    * ajax请求该讲师所有的课程信息
    * */
    $.ajax({
        url:"http://182.92.220.222:8080/course/readTeacherAll",
        type:"GET",
        data:{
            page:"1",
            teacherId:"4"
        },
        timeout:1000,
        //成功回调
        success:function (str) {
            courseDetail = str.content;
            courseTotalPages = str.totalPages;
            //遍历数组,取出数据
            for(var i = 0; i < courseDetail.length; i++){
                var aElement =
                    '<a href="#" class="courseBox" data-index=" '+ courseDetail[i]['id'] + '">'+
                    '<img src="'+ courseDetail[i]['cover']+'" alt="" >'+
                    '<p>课程名称：'+ courseDetail[i]['name'] +'</p>'+
                    '<span class="grade">' + courseDetail[i]['subject'] + '</span>'+
                    '<span class="isFree">¥：'+ courseDetail[i]['price']+'</span>'+
                    '<button class="delete"><i class="iconfont icon">&#xe61b;</i></button>'+
                    '</a>';
                $('.con_course').append(aElement);
            }
            //根据课程总数渲染课程底部页码
            for(var i = 0; i < courseTotalPages; i++){
                var liElement =
                    '<li>'+
                    '<button>' + (i + 1) + '</button>'+
                    '</li>';
                $('.pagesUl').append(liElement);
            }
            //每个课程a的点击事件
            $(".con_course").on('click','.courseBox',function () {
                var courseId = $(this).data('index');
                var url = './createChapters.html?courseId=' + courseId;
                window.open(url);
            });
        },
        //失败
        error:function () {
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
    $('.con_course').on('click','.delete',function(event){
        event.stopPropagation();
        var courseId = $(this).parent().data('index');
        $.ajax({
            url:'http://182.92.220.222:8080/course/delete/' + courseId,
            type:'get',
            success:function(str){
                alert(str);
            }
        })

    });


});




