const characterService = require('../services/character-service')

exports.updateSettings = async function(characterId, newSettings) {
  let character = await characterService.getCharacter(characterId)

  let settings = character.settings
  settings.altSheet = newSettings.altSheet
  settings.cypherSystem = newSettings.cypherSystem

  await characterService.updateCharacter(characterId, character)
}