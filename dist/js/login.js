$(function(){var e="student";$(".form_title span").click(function(){$(this).addClass("current").siblings().removeClass("current"),e="student"==$(this).attr("id")?"student":"teacher"}),$(".regisBtn").click(function(t){t.preventDefault();var o=$(".userName").val(),s=$(".userPaw").val();$.myAjax({url:"http://182.92.220.222:8080/login",type:"post",data:{username:o,password:s,usertype:e},success:function(e){console.log(e),console.log(typeof e);var e=JSON.parse(e);if(console.log(e.usertype),console.log(typeof e.usertype),null==e){$(".info").remove(),$(".box_right").append('<p class="info">账号或者密码错误</p>')}else"student"==e.usertype?(console.log(e),window.location.href="../view/home.html"):"teacher"==e.usertype&&(console.log(e),window.location.href="../view/teacherPersonal.html")},error:function(e){}})})});