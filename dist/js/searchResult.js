$(function(){var e=store.get("userInfo"),o=encodeURI($.getUrlParam("keyword"));console.log(o),console.log($.getUrlParam("keyword"));var r=encodeURI($.getUrlParam("grade")),a=encodeURI($.getUrlParam("subject"));$.loginStatus(e),function(){$.ajax({url:"http://182.92.220.222:8080/course/readSearch",type:"GET",data:{page:"1",keyword:o,grade:r,subject:a},success:function(e){console.log(o),console.log(e);var r=e.content;console.log(r),console.log(typeof r);for(var a in r){var t="<li><dl><dt><img src="+r[a].icon+" ></dt><dd><h3>课程名称:"+r[a].name+"</h3><p>课程年级:"+r[a].grade+"</p><p>课程简介:"+r[a].descript+"</p></dd></dl></li>";$(".courseUl").append(t)}},error:function(e){alert("错误！！")},xhrFields:{withCredentials:!0}})}()});