$(function(){var e="student";$(".form_title span").click(function(){$(this).addClass("current").siblings().removeClass("current"),e="student"==$(this).attr("id")?"student":"teacher"}),$(".regisBtn").click(function(t){t.preventDefault();var r=$(".userName").val(),s=$(".userPaw").val();$.myAjax({url:"http://182.92.220.222:8080/login",type:"post",data:{username:r,password:s,usertype:e},success:function(e){if("error"==e){$(".info").remove(),$(".box_right").append('<p class="info">账号或者密码错误</p>')}else{var e=JSON.parse(e);"student"==e.usertype?window.location.href="../view/home.html":"teacher"==e.usertype&&(window.location.href="../view/teacherPersonal.html"),store.set("userInfo",e)}},error:function(e){}})})});