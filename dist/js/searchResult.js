$(function(){var r=store.get("userInfo"),e=$.getUrlParam2("keyword"),a=$.getUrlParam("grade"),t=$.getUrlParam("subject");$.loginStatus(r),function(){$.ajax({url:"http://182.92.220.222:8080/course/readSearch",type:"GET",data:{page:"1",keyword:e,grade:a,subject:t},success:function(r){var e=r.content;for(var a in e){var t='<li><a href="../view/showCourse.html?courseId='+e[a].id+'"><dl><dt><img src='+e[a].cover+" ></dt><dd><h3>课程名称:"+e[a].name+"</h3><p>课程年级:"+e[a].grade+"</p><p>课程简介:"+e[a].descript+"</p></dd></dl></a></li>";$(".courseUl").append(t)}},error:function(r){alert("错误！！")},xhrFields:{withCredentials:!0}})}()});