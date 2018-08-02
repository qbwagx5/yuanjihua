$(function () {
    editormd("test-editormd", {
        width: "90%",
        height: 640,
        syncScrolling: "single",
        path: " ../js/lib/"

    });
});
var $select = $("#select");
var $myselect = $("#myselect");
var $myselect1 = $("#myselect1");

/**
 * 初始化插件
 */
$myselect.goSelectInput({
    height: 30,
    width: 250
});
$myselect1.goSelectInput({
    height: 30,
    width: 250,
});

/**
 * 获取两者的值
 */
// $("#get").click(function () {
//     alert("插件效果的select的值为" + $myselect.val() + ",选中文本为'" + $myselect.find("option:selected").text() + "'");
// });


//拿出本地存储的数据
var strObj = sessionStorage.getItem('userinf');
var str = JSON.parse(strObj);
console.log(str.data[0]);
//对发布文章获取对应的值
var title = $("#titles").val();
var user_id = str.data[0].user_id;
console.log(user_id);
console.log(title);

var nickname = str.data[0].nickname;
var type = $myselect.val();
var tech_type = $myselect1.val();

$("#logo-btn").click(function () {
    var title = $("#titles").val();
    var content = $("#edithtml").val();
    var md_content = $("#editmd").val();
    var type = $myselect.val();
    var tech_type = $myselect1.val();
    console.log(user_id);
    $.ajax({
        url: "http://www.ftusix.com/static/data/writeArticle.php",
        type: "POST",
        async: true,
        dataType: "json",
        data: JSON.stringify({
            content: content,
            md_content: md_content,
            tech_type: tech_type,
            type: type,
            nickname: nickname,
            user_id: user_id,
            title: title,
            isEdit: false,
            topic_id: ""
        }),
        success: function (data) {
            console.log(data);
            window.location.href = "personal.html#/mynote"

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            console.log(XMLHttpRequest, textStatus, errorThrown);
        },
    });


});

$("#logo-btn1").click(function () {
    console.log(user_id);
    $.ajax({
        url: "http://www.ftusix.com/static/data/myNote.php",
        type: "get",
        async: true,
        // dataType:'json',
        data: ({
            user_id: user_id,
            page: "1"
        }),
        success: function (data1) {
            console.log(data1);
            var query = JSON.stringify(data1);
            sessionStorage.setItem('queryinf', query);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            console.log(XMLHttpRequest, textStatus, errorThrown);
        },
    });
});