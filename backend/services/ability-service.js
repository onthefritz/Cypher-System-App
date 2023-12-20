const characterService = require('../services/character-service')

exports.updateSkill = async function(characterId, newSkill) {
  let character = await characterService.getCharacter(characterId)

  let foundSkill = character.skills.find((skill) => skill.id === newSkill.id)

  if (foundSkill) {
    foundSkill.name = newSkill.name
    foundSkill.source = newSkill.source
    foundSkill.inability = newSkill.inability
    foundSkill.trained = newSkill.trained
    foundSkill.specialized = newSkill.specialized
  }
  else {
    character.skills.push(newSkill)
  }

  await characterService.updateCharacter(characterId, character)
}

exports.updateAttack = async function(characterId, newAttack) {
  let character = await characterService.getCharacter(characterId)

  let foundAttack = character.attacks.find((attack) => attack.id === newAttack.id)

  if (foundAttack) {
    foundAttack.name = newAttack.name
    foundAttack.modifier = newAttack.modifier
    foundAttack.damage = newAttack.damage
    foundAttack.range = newAttack.range
  }
  else {
    character.attacks.push(newAttack)
  }

  await characterService.updateCharacter(characterId, character)
}

exports.updateSpecial = async function(characterId, newSpecial) {
  let character = await characterService.getCharacter(characterId)

  let foundSpecial = character.abilities.find((ability) => ability.id === newSpecial.id)

  if (foundSpecial) {
    foundSpecial.name = newSpecial.name
    foundSpecial.cost = newSpecial.cost
    foundSpecial.costType = newSpecial.costType
    foundSpecial.source = newSpecial.source
    foundSpecial.description = newSpecial.description
  }
  else {
    character.abilities.push(newSpecial)
  }

  await characterService.updateCharacter(characterId, character)
}

exports.deleteSkill = async function(characterId, skillId) {
    let character = await characterService.getCharacter(characterId)

    character.skills = character.skills.filter((skill) => skill.id !== skillId)

    await characterService.updateCharacter(characterId, character)
}

exports.deleteAttack = async function(characterId, attackId) {
  let character = await characterService.getCharacter(characterId)

  character.attacks = character.attacks.filter((attack) => attack.id !== attackId)

  await characterService.updateCharacter(characterId, character)
}

exports.deleteSpecial = async function(characterId, abilityId) {
  let character = await characterService.getCharacter(characterId)

  character.abilities = character.abilities.filter((ability) => ability.id !== abilityId)

  await characterService.updateCharacter(characterId, character)
}