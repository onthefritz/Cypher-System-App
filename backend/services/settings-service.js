const characterService = require('../services/character-service')

exports.updateSettings = async function(characterId, newSettings) {
  let character = await characterService.getCharacter(characterId)

  let settings = character.settings
  settings.altSheet = newSettings.altSheet
  settings.usingCharm = newSettings.usingCharm
  settings.usingSpeed = newSettings.usingSpeed
  settings.usingSP = newSettings.usingSP
  settings.usingRests = newSettings.usingRests
  settings.usingBreathers = newSettings.usingBreathers
  settings.usingExhaustion = newSettings.usingExhaustion
  settings.usingAC = newSettings.usingAC
  settings.usingTrees = newSettings.usingTrees

  await characterService.updateCharacter(characterId, character)
}