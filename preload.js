const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('electron', {
  setPostion: (position) => {
    console.log('send')
    ipcRenderer.send('set-position', position)
  }
});
