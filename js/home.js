$(function () {
    /*
    * 如果是登录状态则做出相应的操作
    * */
    var user = store.get('user');
    if(user){
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
    $('.navUser').on('click','.logout',function (event) {
        $.ajax({
            url:'http://182.92.220.222:8080/logout',
            type:'get',
            success:function (str) {
                if(str == 'success'){
                    console.log(str);
                    store.remove('user');
                    var liEle =
                        '<li><a href="./login.html">登陆</a></li>'+
                        '<li><a href="#">注册</a></li>';
                    $('.navUser').children('li:nth-child(-n+2)').remove();
                    $('.navUser').prepend(liEle);
                }
            }
        })
    })

});


