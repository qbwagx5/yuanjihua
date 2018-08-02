$(function () {
    editormd("test-editormd", {
        width: "90%",
        height: 640,
        syncScrolling: "single",
        path: " ../js/lib/"
        //这个配置在simple.html中并没有，但是为了能够提交表单，使用这个配置可以让构造出来的HTML代码直接在第二个隐藏的textarea域中，方便post提交表单。
        // saveHTMLToTextarea : true
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


var ariticleredactar = sessionStorage.getItem("ariticleredact");
var ariticleredactarobj = JSON.parse(ariticleredactar);
console.log(ariticleredactarobj);
var edithtmledit = ariticleredactarobj.data.content;
var edittitle = ariticleredactarobj.data.title;
$("#edithtml").html(edithtmledit);
$("#title").val(edittitle);


//拿出本地存储的数据
var strObj = sessionStorage.getItem('userinf');
var str = JSON.parse(strObj);
// console.log(str.data[0]); 
//对发布文章获取对应的值





$("#logo-btn").click(function () {
    var title1 = $("#title").val();
    var type = $myselect.val();
    var tech_type = $myselect1.val();
    var content = $("#edithtml").val();
    var md_content = $("#editmd").val();
    var nickname = str.data[0].nickname;
    var user_id = str.data[0].user_id;
    var topic_id = ariticleredactarobj.data.topic_id;
    console.log(topic_id);
    console.log(title1);
    console.log(type);
    console.log(content);
    console.log(md_content);
    console.log(user_id);
    console.log(topic_id);

    $.ajax({
        url: "http://www.ftusix.com/static/data/writeArticle.php",
        type: "POST",
        async: true,
        data: JSON.stringify({
            content: content,
            md_content: md_content,
            tech_type: tech_type,
            type: type,
            nickname: nickname,
            user_id: user_id,
            title: title1,
            isEdit: true,
            topic_id: topic_id
        }),
        success: function (data) {
            console.log(data);
            alert("修改成功");
            window.location.href = "personal.html#/mynote";
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            console.log(XMLHttpRequest, textStatus, errorThrown);
        },
    });
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

            var query = data1;
            var queryin = JSON.stringify(query);
            // console.log(typeof(data1.data));
            console.log(query);

            sessionStorage.setItem("queryinf", queryin);
            //console.log(query);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest, textStatus, errorThrown);
        },
    });


});
