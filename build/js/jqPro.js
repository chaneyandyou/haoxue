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
                        store.remove('ownMsg');
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
    * 封装cookie工具方法
    * */
    $.CookieUtil ={
        get:function (name) {
            var cookieName = encodeURIComponent(name) + "=",
                cookieStart = document.cookie.indexOf(cookieName),
                cookieValue = null;

            if(cookieStart > -1){
                var cookieEnd = document.cookie.indexOf(";",cookieStart);
                if(cookieEnd == -1){
                    cookieEnd =document.cookie.length;
                }
                cookieValue = decodeURIComponent(document.cookie.substring(cookieStart
                    + cookieName.length,cookieEnd))
            }
            return cookieValue;
        },
        set:function (name,value,expires,path,domain,secure) {
            var cookieText = encodeURIComponent(name) + "=" +
                             encodeURIComponent(value);
            if(expires instanceof Date){
                cookieText +="; expires=" + expires.toGMTString();
            }

            if(path){
                cookieText +="; path=" + path;
            }

            if(domain){
                cookieText += "; domain=" + domain;
            }

            if(secure){
                cookieText += "; secure";
            }

            document.cookie = cookieText;
        },

        unset:function (name, path, domain, secure) {
            this.set(name,"",new Date(0),path,domain,secure);
        }
    };


    /*
    * 封装myAjax
    * 1.xhr.withCredentials = true;因为跨域资源共享CORS必须将withCredentials设置为true
    * 2.接收对象参数{url,data,method,successFn,errorFn,timeout}
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

})(jQuery);