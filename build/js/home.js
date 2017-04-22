$(function () {
    /*
     * 公共变量
     * */
    var userInfo = store.get('userInfo');

    /*
     * 1. 热门讲师介绍
     * */
    function hotTeac() {
        $.ajax({
            url: 'http://182.92.220.222:8080/index/hotTeacher',
            type: "GET",
            success: function (dataArr) {
                console.log(dataArr);
                console.log(typeof dataArr);
                for(var name in dataArr){
                    console.log(name);
                    console.log(dataArr);
                }
                /*for (var i = 0; i < dataArr; i++) {
                    switch (dataArr[i].level)
                    {
                        case 0:
                            var level = "小学老师";
                            break;
                        case 1:
                            var level = "初中老师";
                            break;
                        case 2:
                            var level = "高中老师";
                            break;
                    }
                    var teacLiEle =
                        '<li>' +
                        '<a href="#">' +
                        '<img src='+ dataArr[i].icon+' alt="讲师">' +
                        '<h3 class="lec_type">' + level + '</h3>' +
                        '<span class="lec_name">' + dataArr[i].name + '</span><br>' +
                        '<span class="lec_school">' + dataArr[i].graduateSchool + '毕业</span>' +
                        '<p class="lec_detail">' + dataArr[i].profile + '</p>' +
                        '</a>' +
                        '</li>';
                    $(".hotTeacList").append(teacLiEle);


                }*/
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
    hotTeac();
    $.logout();

});


