$(function(){var l=store.get("user");if(null!=l){console.log(l);$(".navUser").children("li:nth-child(-n+2)").remove(),$(".navUser").prepend('<li><a href="#"><i class="iconfont">&#xe603;</i>个人中心</a></li><li><a href="#" class="logout">退出</a></li>')}$.logout()});