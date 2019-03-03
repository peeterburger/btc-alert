const electron = require('electron')
const path = require('path')

const remote = electron.remote
const ipcRenderer = electron.ipcRenderer

const closeBtn = document.getElementById('closeBtn')

closeBtn.addEventListener('click', function (event) {
  remote.getCurrentWindow().close()
})

const updateBtn = document.getElementById('updateBtn')

updateBtn.addEventListener('click', function () {
  ipcRenderer.send('update-notify-value', document.getElementById('notifyVal').value)
  remote.getCurrentWindow().close()
})