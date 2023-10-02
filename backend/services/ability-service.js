const characterService = require('../services/character-service')

exports.updateSkill = async function(characterId, newSkill) {
  let character = await characterService.getCharacter(characterId)

  let foundSkill = character.skills.find((skill) => skill.name === newSkill.name)

  if (foundSkill) {
    foundSkill.name = newSkill.name
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

  let foundAttack = character.attacks.find((attack) => attack.name === newAttack.name)

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

  let foundSpecial = character.abilities.find((ability) => ability.name === newSpecial.name)

  if (foundSpecial) {
    foundSpecial.name = newSpecial.name
    foundSpecial.cost = newSpecial.cost
    foundSpecial.costType = newSpecial.costType
    foundSpecial.description = newSpecial.description
  }
  else {
    character.abilities.push(newSpecial)
  }

  await characterService.updateCharacter(characterId, character)
}

exports.deleteSkill = async function(characterId, skillName) {
    let character = await characterService.getCharacter(characterId)

    character.skills = character.skills.filter((skill) => skill.name !== skillName)

    await characterService.updateCharacter(characterId, character)
}

exports.deleteAttack = async function(characterId, attackName) {
  let character = await characterService.getCharacter(characterId)

  character.attacks = character.attacks.filter((attack) => attack.name !== attackName)

  await characterService.updateCharacter(characterId, character)
}

exports.deleteSpecial = async function(characterId, abilityName) {
  let character = await characterService.getCharacter(characterId)

  character.abilities = character.abilities.filter((ability) => ability.name !== abilityName)

  await characterService.updateCharacter(characterId, character)
}