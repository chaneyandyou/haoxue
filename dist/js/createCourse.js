$(function(){function e(){var e=new FormData($("#createForm")[0]);console.log($("#createForm")[0]),console.log(o),console.log(t),$.ajax({xhrFields:{withCredentials:!0},url:"http://182.92.220.222:8080/course/create?teacherId="+o,type:"post",data:e,cache:!1,processData:!1,contentType:!1,success:function(e){alert(e),"success"==e&&(window.location.href="../view/teacherPersonal.html")},error:function(e){alert("错误！！")}})}var t=store.get("userInfo"),o=t.id;$(".bar"),$(".percent");$("#register").click(function(){e()}),$.loginStatus(t),$.logout()});