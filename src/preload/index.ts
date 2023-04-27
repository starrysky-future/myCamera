import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// Custom APIs for renderer
const api = {
  quit: (): void => ipcRenderer.send('quit'),
  // 版本号
  version: (callback: (version: string) => void): void => {
    ipcRenderer.on('version', (_even: IpcRendererEvent, version) => callback(version));
  },
  // 下载进度条
  downloadProgress: (callback: (progress: unknown) => void): void => {
    ipcRenderer.on('downloadProgress', (_even: IpcRendererEvent, progress) => {
      callback(progress);
    });
  },
  // 改变窗口
  setWinSize: (opt: { aspectRatio: number; width?: number; height?: number }): void => {
    ipcRenderer.send('setWinSize', opt);
  }
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
