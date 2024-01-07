// sets up the base app.
const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')
const fs = require('fs')
const constants = require('./backend/helpers/constants')

const controllerSetup = require('./backend/controllers/controller-setup')

if (require('electron-squirrel-startup')) app.quit();

app.on('ready', () => {
	win = new BrowserWindow({
		width: 1400,
		height: 900,
		autoHideMenuBar: true
	})
	win.loadURL(url.format({
		pathname: path.join(
			__dirname,
			'dist/electron-tree-cypher/index.html'),
		protocol: 'file:',
		slashes: true
	}))

	controllerSetup.setup()

  let dataFolder = `${constants.base_data_url}`
  if (!fs.existsSync(dataFolder)) {
      fs.mkdir(dataFolder, () => {
          console.log('Directory was made')
      })
  }

	let charactersFile = `${constants.base_data_url}/characters.json`
	if (!fs.existsSync(charactersFile)) {
		fs.writeFile(charactersFile, '[]', () => {
			console.log('File was created')
		})
	}

  let settingsFile = `${constants.base_data_url}/app-settings.json`
	if (!fs.existsSync(settingsFile)) {
		fs.writeFile(settingsFile, '{}', () => {
			console.log('File was created')
		})
	}
})