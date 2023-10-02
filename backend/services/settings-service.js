const characterService = require('../services/character-service')

exports.updateSettings = async function(characterId, newSettings) {
  let character = await characterService.getCharacter(characterId)

  let settings = character.settings
  settings.altSheet = newSettings.altSheet

  await characterService.updateCharacter(characterId, character)
}