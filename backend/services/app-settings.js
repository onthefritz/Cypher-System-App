const fs = require('fs/promises')
const constants = require('../helpers/constants')

exports.getSettings = async function() {
  let settings = []
  await fs.readFile(`${constants.base_data_url}/app-settings.json`, 'utf-8').then((data) => {
    settings = JSON.parse(data)
  })

  return settings
}

exports.updateTheme = async function(newTheme) {
  let foundData = await this.getSettings()

  foundData.theme = newTheme.theme

  await fs.writeFile(`${constants.base_data_url}/app-settings.json`, JSON.stringify(foundData))
}