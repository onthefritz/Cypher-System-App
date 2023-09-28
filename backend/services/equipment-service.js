const fs = require('fs/promises')
const constants = require('../helpers/constants')
const characterService = require('../services/character-service')

exports.saveEquipment = async function(id, equipment) {
    let character = await characterService.getCharacter(id)
  
    character.equipment = equipment
    
    await fs.writeFile(`${constants.base_data_url}/${id}.json`, JSON.stringify(character))
}