'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
var path = require('path')
const fs = require('fs')
const utils = require('util')
const hb = require('handlebars')
const readFile = utils.promisify(fs.readFile)
const puppeteer = require("puppeteer");
require('dotenv').config()
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function getTemplateHtml() {
  console.log("Loading template file in memory")
  try {
  const invoicePath = path.resolve("E:/Programma's/Documents/A-factuur/template2.html");
      return await readFile(invoicePath, 'utf8');
  } catch (err) {
      return Promise.reject("Could not load html template");
  }
}
ipcMain.on('renderPDF', async () => {
  let data = {};
  getTemplateHtml().then(async (res) => {
  // Now we have the html code of our template in res object
  // you can check by logging it on console
  // console.log(res)
  console.log("Compiing the template with handlebars")
  const template = hb.compile(res, { strict: true });
  // we have compile our code with handlebars
  const result = template(data);
  // We can use this to add dyamic data to our handlebas template at run time from database or API as per need. you can read the official doc to learn more https://handlebarsjs.com/
  const html = result;
  // we are using headless mode
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe" });
  // const browser = await puppeteer.launch({ executablePath: "/Users/tymenvis/Documents/codeprojects/Pompeji_pdf_editor/node_modules/puppeteer/.local-chromium/mac-818858/chrome-mac/Chromium.app/Contents/MacOS/Chromium" });
  const page = await browser.newPage();
  // We set the page content as the generated html by handlebars
  await page.setContent(html)
  // We use pdf function to generate the pdf in the same folder as this file.
  await page.pdf({ path: "E:/Programma's/Documents/A-factuur/invoice.pdf", format: 'A4' })
  await browser.close();
      console.log("PDF Generated")
  }).catch(err => {
      console.error(err)
  });
})

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 900,
    minHeight: 800,
    icon: path.join(__dirname, 'assets/Logo.png'),
    webPreferences: {
      // webSecurity: false,
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true
    }
  })
  win.removeMenu()
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
