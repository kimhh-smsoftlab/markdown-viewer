(function () {
    // /* html input 기반 */
    // const $input = $("input"),
    //     sidebar = document.querySelector(".sidebar");
    // $input.on("change", showTextFile);
    // function showTextFile(e) {
    //     const selectedFiles = e.target.files;
    //     const list = document.createElement("ul");
    //     sidebar.appendChild(list);
    //     for (const file of selectedFiles) {
    //         const listItem = document.createElement("li");
    //         const summary = document.createElement("div");
    //         summary.textContent = file.name;
    //         summary.value = file;
    //         listItem.appendChild(summary);
    //         list.appendChild(listItem);
    //     }
    // }
    // /* sidebar 클릭 이벤트 */
    // $(".sidebar").on("click", function (e) {
    //     let MarkdownIt = require("markdown-it");
    //     let blobFile = e.target.value;
    //     /* filereader 생성 */
    //     const reader = new FileReader();
    //     /* 읽은 후 오른쪽에 markdown을 변환 */
    //     reader.onload = function () {
    //         let md = new MarkdownIt(),
    //             html = md.render(reader.result);
    //         $(".right-content").html(html);
    //     };
    //     reader.readAsText(blobFile, "utf8");
    // });

    /* node.js 사용 */
    const { ipcRenderer } = require("electron");

    let MarkdownIt = require("markdown-it"),
        fs = require("fs");

    ipcRenderer.on("open-dialog-paths-selected", (event, arg) => {
        const selectedFiles = fs.readdirSync(arg[0]);
        const list = document.createElement("ul");
        $(".sidebar").append(list);
        for (const file of selectedFiles) {
            const listItem = document.createElement("li");
            const summary = document.createElement("div");
            summary.textContent = file;
            summary.value = arg[0];
            listItem.appendChild(summary);
            list.appendChild(listItem);
        }
    });

    /* 버튼 이벤트 발생 */
    $(".open-dialog-btn").on("click", function () {
        /* 메인으로 dialog 생성 메시지 전송 */
        ipcRenderer.send("show-open-dialog");
    });

    /* sidebar 클릭 이벤트 */
    $(".sidebar").on("click", function (e) {
        let title = e.target.textContent,
            path = e.target.value;
        /* 클릭 파일의 내용을 가져온다. */
        let fileContent = fs.readFileSync(path + "/" + title, "utf8");
        /* 오른쪽에 markdown을 변환 */
        let md = new MarkdownIt(),
            html = md.render(fileContent);
        $(".right-content").html(html);
    });
})();
