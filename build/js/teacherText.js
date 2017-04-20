$(function () {

    function test() {
        var formData = new FormData($('#createForm')[0]);
        formData.append("name", "value");
        formData.append("a", 1);
        formData.append("b", 2);
        console.log(formData);

        $.ajax({
            url:"http://182.92.220.222:8080/teacher/update?id=8",
            type: "post",
            data: formData,
            cache:false,
            processData: false,
            contentType: false,
            success: function (data) {

                alert(data);
            },
            error: function (e) {
                alert("错误！！");

            },
            xhrFields: {
                withCredentials: true
            }
        });

        /*$.ajax({
            url: "http://182.92.220.222:8080/teacher/update?id=8",
            type: "post",
            data: form,
            cache:false,
            processData: false,
            contentType: false,
            success: function (data) {

                alert(data);
            },
            error: function (e) {
                alert("错误！！");

            }
        });*/
    }

    $('#update').click(function () {
        test();
    })


});







