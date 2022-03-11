const { contextBridge, ipcRenderer } = require('electron')
const electron = require('electron')

//contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer)

//contextBridge.exposeInMainWorld('electronAPI', {
//  setTitle: (title) => ipcRenderer.send('set-title', title)
//})

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
