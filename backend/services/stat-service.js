const fs = require('fs/promises')
const constants = require('../helpers/constants')
const characterService = require('../services/character-service')

exports.setPoolStats = async function(id, baseInfo) {
  let character = await characterService.getCharacter(id)

  character.baseInfo = baseInfo
  
  await fs.writeFile(`${constants.base_data_url}/${id}.json`, JSON.stringify(character))
}