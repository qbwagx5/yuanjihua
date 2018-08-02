
 const tipShow = function () {
    //     $.css( tip, {'background-color': 'rgba(94, 213, 209, 1)', 'transform': 'translateY(5px)'} );
    // };
} 
    $("#resgisternow").click(function () {
        window.location.href = "zhece.html";
    });

    $("#logo-btn").click(function () {
        var mobile = $("#mobile").val();
        var pwd = $("#pwd").val();
        $.ajax({
            url: 'http://www.ftusix.com/static/data/login.php',
            type: 'POST',
            async: true,
            dataType: 'json',
            data: JSON.stringify({
                "mobile": mobile,
                "pwd": pwd
            }),

            success: function (data1) {
                console.log(data1);
                if (data1.status == "1") {
                    /*submit();*/
                    var str = JSON.stringify(data1);
                    sessionStorage.setItem('userinf', str);
                    var sex = sessionStorage.getItem('userinf');
                    window.location.href = "personal.html";
                }
                else (
                    alert("用户名密码不正确")
                )
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

                console.log(XMLHttpRequest, textStatus, errorThrown);
            },
        });

    
    });

