$(function () {
    /*
     * 公共变量
     * */
    var userInfo = store.get('userInfo');
    var keyword = encodeURI($.getUrlParam("keyword"));
    var grade = encodeURI($.getUrlParam("grade"));
    var subject = encodeURI($.getUrlParam("subject"));

    function courseRender() {
        $.ajax({
            url: 'http://182.92.220.222:8080/course/readSearch',
            type: "GET",
            data: {
                page: "1",
                keyword: keyword,
                grade: grade,
                subject: subject,
            },
            success: function (str) {
                console.log(keyword);
                console.log(str);
                var data = str.content;
                console.log(data);
                console.log(typeof data);
                for(var index in data){
                    var searCourseEle =
                        '<li>' +
                        '<dl>' +
                        '<dt>' +
                        '<img src=' + data[index].icon + ' >'+
                        '</dt>' +
                        '<dd>' +
                        '<h3>课程名称:' + data[index].name + '</h3>' +
                        '<p>课程年级:' + data[index].grade + '</p>' +
                        '<p>课程简介:' + data[index].descript + '</p>' +
                        '</dd>' +
                        '</dl>' +
                        '</li>';
                    $('.courseUl').append(searCourseEle);
                }


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
     * 函数执行
     * */
    $.loginStatus(userInfo);
    courseRender();

});