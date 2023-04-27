import { app, ipcMain, BrowserWindow, IpcMainEvent } from 'electron';

// 退出应用
ipcMain.on('quit', () => {
  app.quit();
});

// 改变窗口
const getWin = (event: IpcMainEvent): BrowserWindow => {
  // event.sender 返回发送消息的 webContents
  return BrowserWindow.fromWebContents(event.sender)!;
};

ipcMain.on(
  'setWinSize',
  (event: IpcMainEvent, opt: { aspectRatio: number; width?: number; height?: number }): void => {
    const win = getWin(event);
    win.setAspectRatio(opt.aspectRatio);
    if (opt.aspectRatio === 1) {
      win.setBounds({ width: 350, height: 350 });
    } else {
      win.setBounds({ width: 500, height: 281 });
    }
  }
);
