(function () {
    let MarkdownIt = require("markdown-it");
    let showdown = require("showdown"),
        path = require("path"),
        fs = require("fs"),
        filelist,
        testFolder = path.join(__dirname, "md_folder/");

    /* testFolder의 파일 이름을 모두 가져온다. */
    filelist = fs.readdirSync(testFolder);

    /* filelist를 가지고 sidebar를 생성해야 함 */
    filelist.forEach(function (filename) {
        let newDiv = document.createElement("div");
        newDiv.textContent = filename;
        $(".sidebar").append(newDiv);
    });
    /* sidebar 클릭 이벤트 */
    $(".sidebar").on("click", function (e) {
        let title = $(e.target).text();
        /* 클릭 파일의 내용을 가져온다. */
        let fileContent = fs.readFileSync(testFolder + title, "utf8");

        /* 내용을 왼쪽 div에 삽입 */
        $("#tarea").text(fileContent);

        /* 오른쪽에 markdown을 변환 */
        let md = new MarkdownIt(),
            html = md.render(fileContent);
        $(".right").html(html);
    });
})();
