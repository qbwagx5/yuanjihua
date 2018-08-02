$("#newbtn").click(function () {
    $.ajax({
        url: 'http://www.ftusix.com/static/data/topicList.php',
        type: 'POST',
        async: true,
        data: ({
            type: "1",
            page: "null",
            sort: "new",
            index: "false",
        }),

        success: function (data1) {
            console.log(data1);

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            console.log(XMLHttpRequest, textStatus, errorThrown);
        },
    });



})

$("#hotbtn").click(function () {
    $.ajax({
        url: 'http://www.ftusix.com/static/data/topicList.php',
        type: 'POST',
        async: true,
        data: ({
            type: "3",
            sort: "hot",
            page: "null",
            index: "true",
        }),

        success: function (data1) {
            console.log(data1);

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            console.log(XMLHttpRequest, textStatus, errorThrown);
        },
    });



})