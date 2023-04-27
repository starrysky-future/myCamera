import { is } from '@electron-toolkit/utils';
import { BrowserWindow, dialog, shell } from 'electron';
import { autoUpdater } from 'electron-updater';

// 自动下载更新
autoUpdater.autoDownload = false;
// 退出时自动安装更新
autoUpdater.autoInstallOnAppQuit = false;

export default (win: BrowserWindow): void => {
  // 检查是否有更新
  if (!is.dev) autoUpdater.checkForUpdates();

  // 有新版本
  autoUpdater.on('update-available', (_info) => {
    dialog
      .showMessageBox({
        type: 'info',
        title: '更新信息',
        message: '发现新版本',
        buttons: ['现在更新', '下次一定'],
        cancelId: 1
      })
      .then((res) => {
        if (res.response == 0) {
          // 更新
          autoUpdater.downloadUpdate();
        }
      });
  });

  // 没有新版本
  autoUpdater.on('update-not-available', (_info: any) => {
    win.webContents.send('version', _info.tag);
  });

  // 更新完毕
  autoUpdater.on('update-downloaded', (_info) => {
    // 退出并安装更新
    autoUpdater.quitAndInstall();
  });

  // 更新出错
  autoUpdater.on('error', (_info) => {
    dialog
      .showMessageBox({
        type: 'error',
        title: '更新失败',
        message: '软件更新失败',
        buttons: ['发布页面下载', '取消更新'],
        cancelId: 1
      })
      .then((res) => {
        if (res.response == 0) {
          shell.openExternal('https://starrysky-future.github.io/blog/');
        }
      });
  });

  // 监听下载进度
  autoUpdater.on('download-progress', (progress) => {
    win.webContents.send('downloadProgress', progress);
  });
};
