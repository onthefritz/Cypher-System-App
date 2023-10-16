const characterService = require('../services/character-service')

exports.updateCypherCount = async function(characterId, request) {
  let character = await characterService.getCharacter(characterId)

  character.equipment.cypherCount = request.cypherCount

  await characterService.updateCharacter(characterId, character)
}

exports.upsertItem = async function(characterId, newItem) {
  let character = await characterService.getCharacter(characterId)

  let foundItem = character.equipment.items.find((item) => item.id === newItem.id)

  if (foundItem) {
    foundItem.name = newItem.name
    foundItem.count = newItem.count
    foundItem.description = newItem.description
  }
  else {
    character.equipment.items.push(newItem)
  }

  await characterService.updateCharacter(characterId, character)
}

exports.upsertWeapon = async function(characterId, newWeapon) {
  let character = await characterService.getCharacter(characterId)

  let foundWeapon = character.equipment.weapons.find((weapon) => weapon.id === newWeapon.id)

  if (foundWeapon) {
    foundWeapon.name = newWeapon.name
    foundWeapon.count = newWeapon.count
    foundWeapon.type = newWeapon.type
    foundWeapon.description = newWeapon.description
  }
  else {
    character.equipment.weapons.push(newWeapon)
  }

  await characterService.updateCharacter(characterId, character)
}

exports.upsertOddity = async function(characterId, newOddity) {
  let character = await characterService.getCharacter(characterId)

  let foundOddity = character.equipment.oddities.find((oddity) => oddity.id === newOddity.id)

  if (foundOddity) {
    foundOddity.name = newOddity.name
    foundOddity.count = newOddity.count
    foundOddity.description = newOddity.description
  }
  else {
    character.equipment.oddities.push(newOddity)
  }

  await characterService.updateCharacter(characterId, character)
}

exports.upsertCypher = async function(characterId, newCypher) {
  let character = await characterService.getCharacter(characterId)

  let foundCypher = character.equipment.cyphers.find((cypher) => cypher.id === newCypher.id)

  if (foundCypher) {
    foundCypher.name = newCypher.name
    foundCypher.tier = newCypher.tier
    foundCypher.description = newCypher.description
  }
  else {
    character.equipment.cyphers.push(newCypher)
  }

  await characterService.updateCharacter(characterId, character)
}

exports.upsertMoney = async function(characterId, newMoney) {
  let character = await characterService.getCharacter(characterId)

  let foundMoney = character.equipment.money.find((money) => money.id === newMoney.id)

  if (foundMoney) {
    foundMoney.name = newMoney.name
    foundMoney.amount = newMoney.amount
  }
  else {
    character.equipment.money.push(newMoney)
  }

  await characterService.updateCharacter(characterId, character)
}

exports.deleteItem = async function(characterId, itemId) {
    let character = await characterService.getCharacter(characterId)

    character.equipment.items = character.equipment.items.filter((item) => item.id !== itemId)

    await characterService.updateCharacter(characterId, character)
}

exports.deleteWeapon = async function(characterId, weaponId) {
    let character = await characterService.getCharacter(characterId)

    character.equipment.weapons = character.equipment.weapons.filter((weapon) => weapon.id !== weaponId)

    await characterService.updateCharacter(characterId, character)
}

exports.deleteOddity = async function(characterId, oddityId) {
    let character = await characterService.getCharacter(characterId)

    character.equipment.oddities = character.equipment.oddities.filter((oddity) => oddity.id !== oddityId)

    await characterService.updateCharacter(characterId, character)
}

exports.deleteCypher = async function(characterId, cypherId) {
    let character = await characterService.getCharacter(characterId)

    character.equipment.cyphers = character.equipment.cyphers.filter((cypher) => cypher.id !== cypherId)

    await characterService.updateCharacter(characterId, character)
}

exports.deleteMoney = async function(characterId, moneyId) {
    let character = await characterService.getCharacter(characterId)

    character.equipment.money = character.equipment.money.filter((money) => money.id !== moneyId)

    await characterService.updateCharacter(characterId, character)
}