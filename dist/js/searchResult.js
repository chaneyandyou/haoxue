$(function(){var e=store.get("userInfo"),r=$.getUrlParam("keyword"),t=$.getUrlParam("grade"),a=$.getUrlParam("subject");$.loginStatus(e),function(){$.ajax({url:"http://182.92.220.222:8080/course/readSearch",type:"GET",data:{page:1,keyword:r,grade:t,subject:a},success:function(e){console.log(e+"------"+typeof e);var r=e.content;for(var t in r){var a="<li><dl><dt><img src="+r[t].icon+" ></dt><dd><h3>课程名称:"+r[t].name+"</h3><p>课程年级:"+r[t].grade+"</p><p>课程简介:"+r[t].descript+"</p></dd></dl></li>";$(".courseUl").append(a)}},error:function(e){alert("错误！！")},xhrFields:{withCredentials:!0}})}()});