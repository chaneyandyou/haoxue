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
                for (var index in dataArr) {
                    switch (dataArr[index].level) {
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
                        '<a href="../view/showTeacher.html?teacherId=' + dataArr[index].id + '">' +
                        '<img src=' + dataArr[index].icon + ' alt="讲师">' +
                        '<h3 class="lec_type">' + level + '</h3>' +
                        '<span class="lec_name">' + dataArr[index].realName + '</span><br>' +
                        '<span class="lec_school">' + dataArr[index].graduateSchool + '毕业</span>' +
                        '<p class="lec_detail">' + dataArr[index].profile + '</p>' +
                        '</a>' +
                        '</li>';
                    $(".hotTeacList").append(teacLiEle);
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
     * 2.搜索按钮
     * */
    function searchClick() {

        $(".searchBtn").click(function () {
            var keyword = encodeURI($(".searchInp").val());
            window.location.href = "../view/searchResult.html?keyword=" + keyword;
        });
    }

    /*
     * 3.热门课程推荐
     * */
    function hotCourse() {
        $.ajax({
            url: 'http://182.92.220.222:8080/index/hotCourse',
            type: "GET",
            success: function (dataArr) {
                var hotCourseEle =
                    '<div class="main_cen_one classCenterCon">' +
                    '<a href="../view/showCourse.html?courseId=' + dataArr[0].id + '" class="cen_top">' +
                    '<img src="' + dataArr[0].cover + '" alt="">' +
                    '<p class="className">' + dataArr[0].name + '</p>' +
                    '<span class="teac_name">优秀老师</span><br>' +
                    '<strong>¥ ' + dataArr[0].price + '</strong>' +
                    '</a>' +
                    '<a href="../view/showCourse.html?courseId=' + dataArr[1].id+ '" class="cen_bottom">' +
                    '<img src="' + dataArr[1].cover + '" alt="">' +
                    '<p class="className">' + dataArr[1].name + '</p>' +
                    '<span class="teac_name">优秀老师</span><br>' +
                    '<strong>¥ ' + dataArr[1].price + '</strong>' +
                    '</a>' +
                    '</div>' +
                    '<div class="main_cen_two classCenterCon">' +
                    '<a href="../view/showCourse.html?courseId=' + dataArr[2].id+ '" class="cen_top">' +
                    '<img src="' + dataArr[2].cover + '" alt="">' +
                    '<p class="className">' + dataArr[2].name + '</p>' +
                    '<span class="teac_name">优秀老师</span><br>' +
                    '<strong>¥ ' + dataArr[2].price + '</strong>' +
                    '</a>' +
                    '<a href="../view/showCourse.html?courseId=' + dataArr[3].id+ '" class="cen_bottom">' +
                    '<img src="' + dataArr[3].cover + '" alt="">' +
                    '<p class="className">' + dataArr[3].name + '</p>' +
                    '<span class="teac_name">优秀老师</span><br>' +
                    '<strong>¥ ' + dataArr[3].price + '</strong>' +
                    '</a>' +
                    '</div>' +
                    '<div class="main_cen_three classCenterCon">' +
                    '<a href="../view/showCourse.html?courseId=' + dataArr[4].id+ '" class="cen_top">' +
                    '<img src="' + dataArr[4].cover + '" alt="">' +
                    '<p class="className">' + dataArr[4].name + '</p>' +
                    '<span class="teac_name">优秀老师</span><br>' +
                    '<strong>¥ ' + dataArr[4].price + '</strong>' +
                    '</a>' +
                    '<a href="../view/showCourse.html?courseId=' + dataArr[5].id+ '" class="cen_bottom">' +
                    '<img src="' + dataArr[5].cover + '" alt="">' +
                    '<p class="className">' + dataArr[5].name + '</p>' +
                    '<span class="teac_name">优秀老师</span><br>' +
                    '<strong>¥ ' + dataArr[5].price + '</strong>' +
                    '</a>' +
                    '</div>' +
                    '</div>';
                $(".main_center").prepend(hotCourseEle);

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
    $(".lazy").lazyload();
    $.loginStatus(userInfo);
    searchClick();
    hotTeac();
    hotCourse();
    $.logout();

});


