import { app, Tray, Menu, BrowserWindow } from 'electron';
import { resolve } from 'path';

const createTray = (win: BrowserWindow): void => {
  const tray = new Tray(resolve(__dirname, '../../resources/camera.png'));

  const contextMenu = Menu.buildFromTemplate([
    {
      label: '退出应用',
      click: (): void => {
        app.quit();
      }
    }
  ]);

  tray.on('click', () => {
    win.isMinimized() ? win.restore() : win.minimize();
  });

  tray.setToolTip('落日摄像头');
  tray.setContextMenu(contextMenu);
};

export default createTray;
