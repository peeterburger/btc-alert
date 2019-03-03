const electron = require('electron')
const path = require('path')
const axios = require('axios')

const BrowserWindow = electron.remote.BrowserWindow
const ipcRenderer = electron.ipcRenderer

var notifyBtn = document.getElementById('notifyBtn')
var price = document.querySelector('h1')
var targetPrice = document.getElementById('targetPrice')
var targetPriceVal

const notification = {
  title: 'BTC Alert',
  body: 'BTC just beat your targer price!',
  icon: path.join(__dirname, '../assets/images/btc.png')
}

function getBTC() {
  axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
    .then(res => {
      const cryptos = res.data.BTC.USD
      price.innerHTML = '$' + cryptos.toLocaleString('en')

      if (targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.USD) {
        const myNotification = new window.Notification(notification.title, notification)
      }
    })
}

getBTC()
setInterval(getBTC, 3000)

notifyBtn.addEventListener('click', function (event) {
  const modalPath = path.join('file://', __dirname, 'add.html')
  win = new BrowserWindow({
    width: 400,
    height: 200,
    frame: false,
    transparent: true,
    alwaysOnTo: true
  })
  win.on('close', function () {
    win = null
  })
  win.loadURL(modalPath)
  win.show()
})

ipcRenderer.on('targetPriceVal', function (event, arg) {
  targetPriceVal = Number(arg)
  targetPrice.innerHTML = '$' + targetPriceVal.toLocaleString('en')
})