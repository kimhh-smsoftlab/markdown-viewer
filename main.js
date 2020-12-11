const { app, BrowserWindow, ipcMain, dialog } = require("electron");
let fs = require("fs");
let path = require("path");

let mainWindow;

function createWindow() {
    //Browser 생성 옵션 설정
    mainWindow = new BrowserWindow({
        width: 1281,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        },
    });

    //브라우저에 띄울 html 파일 로드
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    //브라우저 closed 발생 시 window를 null값으로 설정
    mainWindow.on("closed", function () {
        mainWindow = null;
    });
}

// electron이 준비 완료되면 createWindow 실행
app.on("ready", createWindow);

//모든 윈도우가 닫히면 종료
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

ipcMain.on("show-open-dialog", (event, arg) => {
    const options = {
        properties: ["openDirectory"],
    };
    const result = dialog.showOpenDialogSync(options);

    event.sender.send("open-dialog-paths-selected", result);
});
