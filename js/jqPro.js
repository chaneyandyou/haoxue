(function($){
    /*
    * 扩展通过地址栏url获取某个参数的方法
    * */
    $.getUrlParam = function(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null) return unescape(r[2]); return null;
    };

    /*
     * 退出登录事件监听,通过.navUser事件委托
     * */
    $.logout = function () {
        $('.navUser').on('click','.logout',function (event) {
            $.ajax({
                url:'http://182.92.220.222:8080/logout',
                type:'get',
                success:function (str) {
                    if(str == 'success'){
                        window.location.href = './home.html';
                        store.clear();
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
    };


})(jQuery);