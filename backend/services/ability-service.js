const fs = require('fs/promises')
const constants = require('../helpers/constants')
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
    if (character.skills.length > 0) {
      newSkill.sortOrder = character.skills.at(-1).sortOrder + 1
    }
    else {
      newSkill.sortOrder = 0
    }
    character.skills.push(newSkill)
  }

  await characterService.updateCharacter(characterId, character)
}

exports.updateSkillSort = async function(characterId, skillId, sortInfo) {
  let character = await characterService.getCharacter(characterId)

  let foundSkill = character.skills.find((skill) => skill.id === skillId)
  let otherSkill = character.skills.find((skill) => skill.sortOrder === sortInfo.sortOrder)

  let currentSkillSort = foundSkill.sortOrder
  foundSkill.sortOrder = otherSkill.sortOrder
  otherSkill.sortOrder = currentSkillSort

  character.skills.sort((a, b) => a.sortOrder - b.sortOrder)

  await characterService.updateCharacter(character.id, character)
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
    if (character.attacks.length > 0) {
      newAttack.sortOrder = character.attacks.at(-1).sortOrder + 1
    }
    else {
      newAttack.sortOrder = 0
    }
    character.attacks.push(newAttack)
  }

  await characterService.updateCharacter(characterId, character)
}

exports.updateAttackSort = async function(characterId, attackId, sortInfo) {
  let character = await characterService.getCharacter(characterId)

  let foundAttack = character.attacks.find((attack) => attack.id === attackId)
  let otherAttack = character.attacks.find((attack) => attack.sortOrder === sortInfo.sortOrder)

  let currentSkillSort = foundAttack.sortOrder
  foundAttack.sortOrder = otherAttack.sortOrder
  otherAttack.sortOrder = currentSkillSort

  character.attacks.sort((a, b) => a.sortOrder - b.sortOrder)

  await characterService.updateCharacter(character.id, character)
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
    if (character.abilities.length > 0) {
      newSpecial.sortOrder = character.abilities.at(-1).sortOrder + 1
    }
    else {
      newSpecial.sortOrder = 0
    }
    character.abilities.push(newSpecial)
  }

  await characterService.updateCharacter(characterId, character)

  await this.addToAllAbilities(newSpecial)
}

exports.updateSpecialSort = async function(characterId, specialId, sortInfo) {
  let character = await characterService.getCharacter(characterId)

  let foundAbility = character.abilities.find((ability) => ability.id === specialId)
  let otherAbility = character.abilities.find((ability) => ability.sortOrder === sortInfo.sortOrder)

  let currentSkillSort = foundAbility.sortOrder
  foundAbility.sortOrder = otherAbility.sortOrder
  otherAbility.sortOrder = currentSkillSort

  character.abilities.sort((a, b) => a.sortOrder - b.sortOrder)

  await characterService.updateCharacter(character.id, character)
}

exports.deleteSkill = async function(characterId, skillId) {
    let character = await characterService.getCharacter(characterId)

    let skillBeingDeletedSort = character.skills.find((skill) => skill.id === skillId).sortOrder

    let skillsAboveDeletedSkill = character.skills.filter((skill) => skill.sortOrder > skillBeingDeletedSort)
    for (let i = 0; i < skillsAboveDeletedSkill.length; i++) {
      let skill = skillsAboveDeletedSkill[i]
      skill.sortOrder = skill.sortOrder - 1
    }

    character.skills = character.skills.filter((skill) => skill.id !== skillId)

    await characterService.updateCharacter(characterId, character)
}

exports.deleteAttack = async function(characterId, attackId) {
  let character = await characterService.getCharacter(characterId)

  let attackBeingDeletedSort = character.attacks.find((attack) => attack.id === attackId).sortOrder

  let attacksAboveDeletedAttack = character.attacks.filter((attack) => attack.sortOrder > attackBeingDeletedSort)
  for (let i = 0; i < attacksAboveDeletedAttack.length; i++) {
    let attack = attacksAboveDeletedAttack[i]
    attack.sortOrder = attack.sortOrder - 1
  }

  character.attacks = character.attacks.filter((attack) => attack.id !== attackId)

  await characterService.updateCharacter(characterId, character)
}

exports.deleteSpecial = async function(characterId, abilityId) {
  let character = await characterService.getCharacter(characterId)

  let abilityBeingDeletedSort = character.abilities.find((ability) => ability.id === abilityId).sortOrder

  let abilitiesAboveDeletedAbility = character.abilities.filter((ability) => ability.sortOrder > abilityBeingDeletedSort)
  for (let i = 0; i < abilitiesAboveDeletedAbility.length; i++) {
    let ability = abilitiesAboveDeletedAbility[i]
    ability.sortOrder = ability.sortOrder - 1
  }

  character.abilities = character.abilities.filter((ability) => ability.id !== abilityId)

  await characterService.updateCharacter(characterId, character)
}

exports.getAllAbilities = async function() {
  let ability_data
  
  await fs.readFile(`${constants.base_data_url}/abilities.json`, 'utf-8').then((data) => {
    ability_data = JSON.parse(data)
  })

  return ability_data
}

exports.addToAllAbilities = async function(ability) {
  let abilities = await this.getAllAbilities()

  let newAbility = {
    name: ability.name,
    description: ability.description,
    cost: ability.cost.toString(),
    costType: ability.costType,
    tier: ability.tier,
    costTime: ability.costTime
  }

  if (abilities.filter(x => x.name === newAbility.name).length === 0) {
    abilities.push(newAbility)

    await fs.writeFile(`${constants.base_data_url}/abilities.json`, JSON.stringify(abilities))
  }
}

exports.upsertBaseAbility = async function(oldAbilityName, newAbility) {
  let abilities = await this.getAllAbilities()

  let foundSpecial = abilities.find((ability) => ability.name.toLowerCase() === oldAbilityName.toLowerCase())

  if (oldAbilityName !== 'empty_string' && foundSpecial) {
    foundSpecial.name = newAbility.name
    foundSpecial.description = newAbility.description
    foundSpecial.cost = newAbility.cost
    foundSpecial.costType = newAbility.costType
    foundSpecial.tier = newAbility.tier
    foundSpecial.costTime = newAbility.costTime

    await fs.writeFile(`${constants.base_data_url}/abilities.json`, JSON.stringify(abilities))
  }
  else {
    this.addToAllAbilities(newAbility)
  }
}

exports.deleteBaseAbility = async function(name) {
  let abilities = await this.getAllAbilities()

  abilities = abilities.filter((ability) => ability.name !== name)

  await fs.writeFile(`${constants.base_data_url}/abilities.json`, JSON.stringify(abilities))
}