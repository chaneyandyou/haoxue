(function($){
    /*
    * 1. 扩展通过地址栏url获取某个参数的方法
    * */
    $.getUrlParam = function(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null) return unescape(r[2]); return null;
    };

    /*
     * 2. 退出登录事件监听,通过.navUser事件委托
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
                        store.remove('userInfo');
                        var liEle =
                            '<li><a href="../view/login.html">登陆</a></li>'+
                            '<li><a href="#">注册</a></li>';
                        $('.navUser').children('li:nth-child(-n+2)').remove();
                        $('.navUser').prepend(liEle);
                    }
                }
            })
        })
    };

    /*
    * 3. 封装myAjax
    *   3.1.xhr.withCredentials = true;因为跨域资源共享CORS必须将withCredentials设置为true
    *   3.2.接收对象参数{url,data,method,successFn,errorFn,timeout}
    * */
    $.myAjax = ajax;

    function json2url(json) {
        var arr = [];
        json.t = Math.random();
        for(var key in json){
            arr.push(key + "=" + encodeURIComponent(json[key]));
        }
        return arr.join("&");
    }

    function ajax(options){
        options = options || {};
        if(!options.url){
            return;
        }

        options.type = options.type || "get";
        options.data = options.data || {};
        options.timeout = options.timeout || 0;

        var str = json2url(options.data);

        //1.创建
        if(window.XMLHttpRequest){
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

        }else{
            var xhr = new ActiveXObject("Microsoft.XMLHTTP");
            xhr.withCredentials = true;
        }
        
        if(options.type == "get"){
            //2.连接
            xhr.open("get",options.url + "?" + str,true);
            //3.发送
            xhr.send();
        }else {
            //2.连接
            xhr.open("post",options.url,true);
            //3.发送
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xhr.send(str);
        }

        //4.接收
        xhr.onreadystatechange = function () {
            if(xhr.readyState == 4){
                clearTimeout(timer);
                if(xhr.status == 200 && xhr.status < 300 || xhr.status == 304){
                    options.success && options.success(xhr.responseText);
                }else{
                    options.error && options.error(xhr.status);
                }
            }
        };

        if(options.timeout){
            var timer = setTimeout(function () {
                xhr.abort();
            },options.timeout);
        }

    }

    /*
    * 4. 如果是登录状态,header则做出相应的操作
    *
    * */
    $.loginStatus = function (userInfo) {
        if (userInfo != null) {
            var liElement =
                '<li><a href=".／register.html"><i class="iconfont">&#xe603;</i>个人中心</a></li>' +
                '<li><a href="#" class="logout">退出</a></li>';

            $('.navUser').children('li:nth-child(-n+2)').remove();
            $('.navUser').prepend(liElement);
        }
    };
    
    /*
    * 5. 渲染用户icon
    * */
    $.renderIcon = function (ele, attr) {
        ele.attr('src',attr);
    }

})(jQuery);