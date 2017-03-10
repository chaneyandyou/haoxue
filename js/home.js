$(function () {
    /*
    * 如果是登录状态则做出相应的操作
    * */
    var user = store.get('user');
    if(user != null){
        console.log(user);
        var liElement =
                '<li><a href="#"><i class="iconfont">&#xe603;</i>个人中心</a></li>'+
                '<li><a href="#" class="logout">退出</a></li>';

        $('.navUser').children('li:nth-child(-n+2)').remove();
        $('.navUser').prepend(liElement);
    }

    /*
    * 退出登录事件监听,通过.navUser事件委托
    * */
    $.logout();

});


