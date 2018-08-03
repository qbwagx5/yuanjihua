var strObj = sessionStorage.getItem('userinf');
var str = JSON.parse(strObj);
var user_id = str.data[0].user_id;
console.log(str.data[0]);
//取出ajax中的数据并赋值给变量
var imgsrc = str.data[0].avatar;
var usernames = str.data[0].nick_name;
var usersex = str.data[0].sex;
var status = str.status;
var mobile = str.data[0].mobile;
var oldpwd = str.data[0].pwd;


//把相应的值赋值给相应的标签
$(".el-input__inner").val(usernames);
//实现前端路由单页面跳转。
class Router {
    constructor() {
        this.routes = {};
        this.currentUrl = '';
    }
    //实现不同路由所对应的回调函数。
    route(path, callback) {
        this.routes[path] = callback || function () { };
    }
    updateView() {
        this.currentUrl = location.hash.slice(1) || '/persion';
        this.routes[this.currentUrl] && this.routes[this.currentUrl]();
    }
    //实现初始化路由，绑定hashchange,当 hash 值改变时触发对应回调函数,也就是监听url hash的更新事件。
    init() {
        window.addEventListener('load', this.updateView.bind(this), false);
        window.addEventListener('hashchange', this.updateView.bind(this), false);
    }
}
const router = new Router();
router.init();

//  router.route('/resetpwd', function () {
//     document.getElementById('personal').style.display = "none";
//     document.getElementById('resetpwd').style.display = "block";
//     document.getElementById('mynote').style.display = "none";

// });
router.route('/', function () {
    document.getElementById('personal').style.display = "block";
    document.getElementById('resetpwd').style.display = "none";
    document.getElementById('mynote').style.display = "none";
    $("#submit-userInfo").click(function () {


    })

});
router.route('/resetpwd', function () {
    document.getElementById('personal').style.display = "none";
    document.getElementById('resetpwd').style.display = "block";
    document.getElementById('mynote').style.display = "none";
    console.log(mobile)
    $("#user-mobile").html(mobile)
    $("#update-btn").click(function () {
        
        var pwd = $("#newpwd").val()
        console.log(pwd)
      
        var pwd2= $("#againpwd").val()
        console.log(pwd2)
        if (pwd == pwd2) {
            $.ajax({
        url: "http://www.ftusix.com/static/data/reset.php",
        type: "POST",
        async: true,
        // dataType:'json',
        data: JSON.stringify({
            mobile:mobile,
            pwd:pwd,
            pwd2:pwd2,
            sms_code:"123456"
        }),
        success: function (data2) {
            console.log(data2)
            // alert("修改成功")  
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest, textStatus, errorThrown);
        },
    });           
        } else {
            alert("两次提交密码不一致")
            return
        }
    })



});
//实现点击我的帖子，与后端接口交互数据
router.route('/mynote', function () {
    document.getElementById('personal').style.display = "none";
    document.getElementById('resetpwd').style.display = "none";
    document.getElementById('mynote').style.display = "block";
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
            var queryinfobj = sessionStorage.getItem("queryinf");
            var queryinf = JSON.parse(queryinfobj);
            var queryinfq = queryinf.data;
            var linehtml = document.querySelector("#linehtml");

            function createEle(num) {
                for (var i = 0; i <= num; i++) {
                    var div = document.createElement("div");
                    div.className = "line"
                    linehtml.appendChild(div);
                    var p1 = document.createElement("p");
                    p1.id = "linep"
                    p1.className = "linepp"
                    p1.innerHTML = queryinfq[i].title;
                    div.appendChild(p1);
                    var span = document.createElement("span");
                    span.className = "linespan";
                    span.innerHTML = queryinfq[i].topic_id;
                    div.appendChild(span);
                    var li = document.createElement("li");
                    li.className = "linelitype"
                    li.innerHTML = queryinfq[i].type;
                    div.appendChild(li);
                    var li = document.createElement("li");
                    li.className = "lineli"
                    //   li.innerHTML="";
                    div.appendChild(li);
                    var li = document.createElement("li");
                    li.className = "linelibrowser_num";
                    li.innerHTML = queryinfq[i].browser_num;
                    div.appendChild(li);
                    var li = document.createElement("li");
                    li.className = "linelimodify_time";
                    li.innerHTML = queryinfq[i].modify_time;
                    div.appendChild(li);
                    var img = document.createElement("img");
                    img.src = "../img/edit.png"
                    img.className = "editimg";
                    div.appendChild(img);
                    var hr = document.createElement("hr");
                    hr.className = "linehr"
                    hr.size = "20"
                    hr.width = "1"
                    hr.color = "#000000"
                    div.appendChild(hr);
                    var img = document.createElement("img");
                    img.src = "../img/delect.png"
                    img.className = "delectimg";
                    div.appendChild(img);

                }
            }
            createEle(queryinfq.length);
            //console.log(query);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest, textStatus, errorThrown);
        },
    });


});

//    });
//给编辑文章图标进行事件绑定
$("#linehtml").on("click", ".editimg", function (event) {
    // var queryinfobj=sessionStorage.getItem("queryinf");
    //    var queryinf=JSON.parse(queryinfobj);
    //    var queryinfq=queryinfobj.data; 
    var topic_id = this.parentNode.childNodes[1].innerHTML;
    console.log(topic_id);
    $.ajax({
        url: "http://www.ftusix.com/static/data/content.php",
        type: "get",
        async: true,
        // dataType:'json',
        data: ({
            user_id: user_id,
            topic_id: topic_id
        }),
        success: function (data2) {
            var ariticleredactq = data2;
            // console.log(ariticleredact);
            var ariticleredact = JSON.stringify(ariticleredactq);
            sessionStorage.setItem("ariticleredact", ariticleredact);
            var ariticleredactar = sessionStorage.getItem("ariticleredact");
            window.location.href = "ariticleredact.html";
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest, textStatus, errorThrown);
        },
    });
});


//点击标题获得文章信息
$("#linehtml").on("click", ".linepp", function (event) {
    // var queryinfobj=sessionStorage.getItem("queryinf");
    //    var queryinf=JSON.parse(queryinfobj);
    //    var queryinfq=queryinfobj.data; 
    var topic_id = this.parentNode.childNodes[1].innerHTML;
    console.log(topic_id);
    $.ajax({
        url: "http://www.ftusix.com/static/data/content.php",
        type: "get",
        async: true,
        // dataType:'json',
        data: ({
            user_id: user_id,
            topic_id: topic_id
        }),
        success: function (data2) {
            var ariticleredactq = data2;
            // console.log(ariticleredact);
            var ariticleredact = JSON.stringify(ariticleredactq);
            sessionStorage.setItem("ariticleredact", ariticleredact);
            var ariticleredactar = sessionStorage.getItem("ariticleredact");
            window.location.href = "Details of the article.html";
            console.log(ariticleredactar);

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest, textStatus, errorThrown);
        },
    });
});

//给删除文章图标进行事件绑定
$("#linehtml").on("click", ".delectimg", function (event) {
    // var queryinfobj=sessionStorage.getItem("queryinf");
    //    var queryinf=JSON.parse(queryinfobj);
    //    var queryinfq=queryinfobj.data; 
    console.log(user_id);

    if (confirm("你确定删除吗？")) {
        var topic_id = this.parentNode.childNodes[1].innerHTML;
        console.log(topic_id);
        $.ajax({
            url: "http://www.ftusix.com/static/data/delete.php",
            type: "post",
            async: true,
            // dataType:'json',
            data: JSON.stringify({
                "user_id": user_id,
                "topic_id": topic_id
            }),
            success: function (data2) {
                console.log(data2);
                alert("删除成功");
                location.reload();

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest, textStatus, errorThrown);
            },

        });


    }
    else {
        return false;
    }
}

)



